import { DateTime } from 'luxon'

const WPAPI = require('wpapi')
const wp = new WPAPI({ endpoint: process.env.WORDPRESS_API_URL })

// console.log(process.env.WORDPRESS_URL, process.env.CDN_URL)

const re = new RegExp(`${process.env.WORDPRESS_URL}/wp-content/`, 'g')
const replaceToCDN = (url: string): string => {
  const result = url.replace(re, process.env.CDN_URL + '/wp-content/')
  // console.log(url, '->', result)
  return result
}


export type Tag = {
  id: number,
  type: string,
  name: string,
  slug: string,
}


export async function getAllTags(): Promise<Tag[]> {
  const tags = await wp.tags().perPage(100)
  return tags.map((tag: any): Tag => ({
    id: tag.id,
    type: tag.description || 'work',
    name: tag.name,
    slug: tag.slug,
  }))
}


export async function getWorkTags(): Promise<Tag[]> {
  return (await getAllTags()).filter((t: any) => t.type == 'work')
}


const getAll = (request: any) => {
  return request.then((response: any) => {
    if (!response._paging || !response._paging.next) {
      return response
    }
    return Promise.all([
      response,
      getAll(response._paging.next)
    ]).then((responses: any) => responses.flat(Infinity))
  })
}


export type Entry = {
  slug: string
  title: string
  date?: string
  content?: string
  image?: string
  tags?: Tag[]
}


export type Member = {
  slug: string,
  name: string,
  title: string,
  content?: string,
  image: string,
  region: string[],
  links: any,
  coCreator: boolean,
}


const parseLinks = (data: string) => {
  return data.split('\r\n').map((line: string) => {
    const [name, url] = line.split(',')
    return { name: name ? name.trim() : null, url: url ? url.trim() : null }
  })
}


export async function getAllMembers(): Promise<Member[]> {
  const data = await wp.pages().order('asc').perPage(100).embed().param({ categories: 187, __fields: 'slug,title,tags,_embedded' })
  return data?.map((e: any): Member => ({
    slug: e.slug,
    name: e.title.rendered,
    title: e.acf.title,
    image: e._embedded['wp:featuredmedia'][0].source_url,
    region: e.acf.region,
    links: parseLinks(e.acf.rel_links),
    coCreator: e.acf['co-creator'],
  }))
}


export async function getMemberDetail(slug: string): Promise<Member> {
  const data = (await wp.pages().slug(slug).embed())[0]
  return {
    slug,
    name: data.title.rendered,
    title: data.acf.title,
    content: replaceToCDN(data.content.rendered),
    image: data._embedded['wp:featuredmedia'][0].source_url,
    region: data.acf.region,
    links: parseLinks(data.acf.rel_links),
    coCreator: data.acf['co-creator'],
  }
}


export async function getAllWorks(): Promise<Entry[]> {
  const data = await (wp.posts().perPage(100).embed().param({ categories: 4, _fields: 'slug,title,date,tags,_links,_embedded' }))
  // const data = await getAll(wp.posts().perPage(100).embed().param({ categories: 4, _fields: 'slug,title,date,_links,_embedded' }))
  const tags: { [id: number]: Tag } = {};
  (await getWorkTags()).forEach(t => tags[t.id] = t)
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: DateTime.fromISO(e.date).toFormat(`LLL dd, yyyy`),
    image: replaceToCDN(e._embedded['wp:featuredmedia'][0].source_url),
    tags: e.tags.map((t: number) => tags[t]).filter((t: Tag) => t)
  }))
}


export async function getWorksByTag(tagSlug: string): Promise<Entry[]> {
  const tag = await wp.tags().slug(tagSlug)
  const data = await (wp.posts().tags(tag[0].id).perPage(100).embed().param({ categories: 4, _fields: 'slug,title,date,tags,_links,_embedded' }))
  const tags: { [id: number]: Tag } = {};
  (await getWorkTags()).forEach(t => tags[t.id] = t)
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: DateTime.fromISO(e.date).toFormat(`LLL dd, yyyy`),
    image: replaceToCDN(e._embedded['wp:featuredmedia'][0].source_url),
    tags: e.tags.map((t: number) => tags[t]).filter((t: Tag) => t)
  }))
}


export async function getFeaturedWork(): Promise<Entry[]> {
  const data = await wp.posts().perPage(3).embed().param({ tags: 185, _fields: 'slug,title,date,_links,_embedded' })
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: DateTime.fromISO(e.date).toFormat(`LLL dd, yyyy`),
    image: replaceToCDN(e._embedded['wp:featuredmedia'][0].source_url),
  }))
}


export async function getAllNews(): Promise<Entry[]> {
  const data = await wp.posts().perPage(20).embed().param({ categories: 5, _fields: 'slug,title,date,content,_links,_embedded' })
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: DateTime.fromISO(e.date).toFormat(`LLL dd, yyyy`),
    content: replaceToCDN(e.content.rendered),
    image: replaceToCDN(e._embedded['wp:featuredmedia'][0].source_url),
  }))
}


export async function getLatestNews(): Promise<Entry[]> {
  const data = await wp.posts().perPage(3).embed().param({ categories: 5, _fields: 'slug,title,date,_links,_embedded' })
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: DateTime.fromISO(e.date).toFormat(`LLL dd, yyyy`),
    image: replaceToCDN(e._embedded['wp:featuredmedia'][0].source_url),
  }))
}


export async function getPostDetails(slug: string): Promise<Entry> {
  const data = await wp.posts().slug(slug).embed().param({ _fields: 'slug,title,content,date,_links,_embedded' })
  return {
    slug: data[0].slug,
    title: data[0].title.rendered,
    content: replaceToCDN(data[0].content.rendered),
    date: data[0].date,
    image: replaceToCDN(data[0]._embedded['wp:featuredmedia'][0].source_url),
  }
}


export async function getPageDetails(slug: string): Promise<Entry> {
  const data = await wp.pages().slug(slug).embed()
  const media = data[0]._embedded['wp:featuredmedia']
  return {
    slug,
    title: data[0].title.rendered,
    content: replaceToCDN(data[0].content.rendered),
    image: media ? replaceToCDN(media[0].source_url) : ''
  }
}
