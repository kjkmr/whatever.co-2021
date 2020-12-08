import { DateTime } from 'luxon'
import Baby from 'babyparse'

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



export type Person = {
  role: string
  name: string
  company: string | null
  url: string | null
}


export type Credit = {
  name?: string
  members: Person[]
}


export type Entry = {
  slug: string
  title: string
  date?: string
  content?: string
  image?: string
  tags?: Tag[]
  credit?: Credit[] | null
}


export type Member = {
  slug: string
  name: string
  title: string
  content?: string
  image: string
  region: string[]
  links: any
  coCreator: boolean
}


const parseLinks = (data: string) => {
  return data.split('\r\n').map((line: string) => {
    const [name, url] = line.split(',')
    return { name: name ? name.trim() : null, url: url ? url.trim() : null }
  })
}


const parseCredit = (data: string): Credit[] | undefined => {
  const credits: Credit[] = []
  let group: Credit = { members: [] }
  Baby.parse(data).data.forEach((tokens: string[]) => {
    const n = tokens.filter(t => t.length).length
    if (n == 0) {
      credits.push(group)
      group = { members: [] }
    } else if (n == 1) {
      if (group.members.length) {
        credits.push(group)
      }
      group = {
        name: tokens[0],
        members: []
      }
    } else {
      const p: Person = {
        role: tokens[0],
        name: tokens[1],
        company: tokens[2] || null,
        url: tokens[3] || null,
      }
      group.members.push(p)
    }
  })
  if (group.members.length) {
    credits.push(group)
  }
  return credits.length ? credits : undefined
}


export async function getAllMembers(maxCount: number = 100, locale: string = 'ja'): Promise<Member[]> {
  const data = await wp.pages().order('asc').perPage(maxCount).embed().param({ categories: 187, __fields: 'slug,title,tags,_embedded', lang: locale })
  return data?.map((e: any): Member => ({
    slug: e.slug,
    name: e.title.rendered,
    title: e.acf.title,
    image: replaceToCDN(e._embedded['wp:featuredmedia'][0].source_url),
    region: Array.isArray(e.acf.region) ? e.acf.region : [],
    links: parseLinks(e.acf.rel_links || ''),
    coCreator: e.acf['co-creator'],
  }))
}


export async function getMemberDetail(slug: string, locale: string = 'ja'): Promise<Member> {
  const data = (await wp.pages().slug(slug).embed().param({ lang: locale }))[0]
  return {
    slug,
    name: data.title.rendered,
    title: data.acf.title,
    content: replaceToCDN(data.content.rendered),
    image: replaceToCDN(data._embedded['wp:featuredmedia'][0].source_url),
    region: data.acf.region,
    links: parseLinks(data.acf.rel_links),
    coCreator: data.acf['co-creator'],
  }
}


export async function getAllWorks(maxCount: number = 100, locale: string = 'ja'): Promise<Entry[]> {
  const data = await (wp.posts().perPage(maxCount).embed().param({ categories: 4, _fields: 'slug,title,date,tags,_links,_embedded', lang: locale }))
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


export async function getWorksByTag(tagSlug: string, numEntries: number = 100, locale: string = 'ja'): Promise<Entry[]> {
  const tag = await wp.tags().slug(tagSlug)
  const data = await (wp.posts().tags(tag[0].id).perPage(numEntries).embed().param({ categories: 4, _fields: 'slug,title,date,tags,_links,_embedded', lang: locale }))
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
  const data = await wp.posts().perPage(4).embed().param({ categories: 5, _fields: 'slug,title,date,_links,_embedded' })
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: DateTime.fromISO(e.date).toFormat(`LLL dd, yyyy`),
    image: replaceToCDN(e._embedded['wp:featuredmedia'][0].source_url),
  }))
}


export async function getPostDetails(slug: string, locale: string = 'ja'): Promise<Entry> {
  const data = (await wp.posts().slug(slug).embed().param({ _fields: 'slug,title,content,date,tags,acf,_links,_embedded', lang: locale }))[0]
  const tags: { [id: number]: Tag } = {};
  (await getWorkTags()).forEach(t => tags[t.id] = t)
  return {
    slug: data.slug,
    title: data.title.rendered,
    content: replaceToCDN(data.content.rendered),
    date: DateTime.fromISO(data.date).toFormat(`LLL dd, yyyy`),
    image: replaceToCDN(data._embedded['wp:featuredmedia'][0].source_url),
    tags: data.tags.map((t: number) => tags[t]).filter((t: Tag) => t),
    credit: data.acf?.credit ? parseCredit(data.acf.credit) : null,
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
