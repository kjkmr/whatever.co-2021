import { DateTime } from 'luxon'
import Baby from 'babyparse'

const WPAPI = require('wpapi')
const wp = new WPAPI({ endpoint: process.env.WORDPRESS_API_URL })

const CATEGORY_ID_WORK = 5
const CATEGORY_ID_NEWS = 56
const TAG_ID_FEATURED = 43

const re = new RegExp(`(https:\/\/whatever\.co|${process.env.WORDPRESS_URL})/wp-content/`, 'g')
const replaceToCDN = (url: string | undefined): string => {
  const result = url?.replace(re, process.env.CDN_URL + '/wp-content/')
  // console.log(url, '->', result)
  return result || '/common/noimage.png'
}


export type Tag = {
  id: number,
  type: string,
  name: string,
  slug: string,
}


export async function getAllTags(locale: string): Promise<Tag[]> {
  const tags = await wp.tags().perPage(100).param({ lang: locale })
  return tags.map((tag: any): Tag => ({
    id: tag.id,
    type: tag.description,
    name: tag.name,
    slug: tag.slug,
  }))
}


export async function getWorkTags(locale: string): Promise<Tag[]> {
  return (await getAllTags(locale)).filter((t: any) => t.type == 'work')
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
  date?: string
  title: string
  subtitle?: string
  overview?: string
  side_image?: string
  hero_image?: string
  hero_image_mobile?: string
  content?: string
  tags?: Tag[]
  credit?: Credit[] | null
  next?: { slug: string, title: string } | null
  prev?: { slug: string, title: string } | null
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
  next?: { slug: string, title: string } | null
  prev?: { slug: string, title: string } | null
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
  let prevRole: string = ''
  Baby.parse(data).data.forEach((tokens: string[]) => {
    let n = tokens.filter(t => t.length).length
    if (n != 0 && !tokens[0]) {
      tokens[0] = prevRole
      n++
    }
    if (n == 0) {
      credits.push(group)
      group = { members: [] }
      prevRole = ''
    } else if (n == 1) {
      if (group.members.length) {
        credits.push(group)
      }
      group = {
        name: tokens[0],
        members: []
      }
      prevRole = ''
    } else {
      const p: Person = {
        role: tokens[0],
        name: tokens[1],
        company: tokens[2] || null,
        url: tokens[3] || null,
      }
      group.members.push(p)
      prevRole = p.role
    }
  })
  if (group.members.length) {
    credits.push(group)
  }
  return credits.length ? credits : undefined
}


const findFeaturedMedia = (e: any, size: string = 'full'): string => {
  if (!e._embedded['wp:featuredmedia']) return ''
  const media = e._embedded['wp:featuredmedia'][0]
  const defaultSource = media.source_url || ''
  if (media.media_details?.sizes?.hasOwnProperty(size)) {
    return media.media_details.sizes[size].source_url || defaultSource
  }
  return defaultSource
}

export async function getAllMembers(maxCount: number = 100, locale: string = 'ja'): Promise<Member[]> {
  const data = await wp.pages().order('asc').perPage(maxCount).embed().param({ __fields: 'slug,title,tags,_embedded', lang: locale })
  return data?.map((e: any): Member => ({
    slug: e.slug,
    name: e.title.rendered,
    title: e.acf.title,
    image: replaceToCDN(findFeaturedMedia(e)),
    region: Array.isArray(e.acf.region) ? e.acf.region : [],
    links: parseLinks(e.acf.rel_links || ''),
    coCreator: e.acf['co-creator'],
  }))
}


export async function getMemberDetail(slug: string, locale: string = 'ja'): Promise<Member | null> {
  const data = (await wp.pages().slug(slug).embed().param({ lang: locale }))[0]
  return data ? {
    slug,
    name: data.title.rendered,
    title: data.acf.title,
    content: replaceToCDN(data.content.rendered),
    image: replaceToCDN(findFeaturedMedia(data)),
    region: data.acf.region,
    links: parseLinks(data.acf.rel_links),
    coCreator: data.acf['co-creator'],
    next: getRelPost(data.next),
    prev: getRelPost(data.prev),
  } : null
}


export async function getAllWorks(locale: string = 'ja'): Promise<Entry[]> {
  const data = await getAll(wp.posts().perPage(100).embed().param({ categories: CATEGORY_ID_WORK, _fields: 'slug,title,date,tags,_links,_embedded,acf', lang: locale }))
  const tags: { [id: number]: Tag } = {};
  (await getWorkTags(locale)).forEach(t => tags[t.id] = t)
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    subtitle: e.acf?.subtitle || '',
    overview: e.acf?.overview || '',
    date: DateTime.fromISO(e.date).toFormat(`LLL dd, yyyy`),
    hero_image: replaceToCDN(findFeaturedMedia(e)),
    tags: e.tags.map((t: number) => tags[t]).filter((t: Tag) => t)
  }))
}


export async function getWorksByTag(tagSlug: string, numEntries: number = 100, locale: string = 'ja'): Promise<Entry[]> {
  const tag = await wp.tags().slug(tagSlug)
  if (tag.length == 0) return []
  const data = await (wp.posts().tags(tag[0].id).perPage(numEntries).embed().param({ categories: CATEGORY_ID_WORK, _fields: 'slug,title,date,tags,_links,_embedded,acf', lang: locale }))
  const tags: { [id: number]: Tag } = {};
  (await getWorkTags(locale)).forEach(t => tags[t.id] = t)
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    subtitle: e.acf?.subtitle || '',
    overview: e.acf?.overview || '',
    date: DateTime.fromISO(e.date).toFormat(`LLL dd, yyyy`),
    hero_image: replaceToCDN(findFeaturedMedia(e)),
    tags: e.tags.map((t: number) => tags[t]).filter((t: Tag) => t)
  }))
}


export async function getFeaturedWork(): Promise<Entry[]> {
  const data = await wp.posts().perPage(3).embed().param({ tags: TAG_ID_FEATURED, _fields: 'slug,title,date,_links,_embedded' })
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: DateTime.fromISO(e.date).toFormat(`LLL dd, yyyy`),
    hero_image: replaceToCDN(findFeaturedMedia(e)),
  }))
}


export async function getNews(maxEntries = 100, locale: string = 'ja'): Promise<Entry[]> {
  const data = await wp.posts().perPage(maxEntries).embed().param({ categories: CATEGORY_ID_NEWS, _fields: 'slug,title,date,content,_links,_embedded', lang: locale })
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: DateTime.fromISO(e.date).toFormat(`LLL dd, yyyy`),
    content: replaceToCDN(e.content.rendered),
    hero_image: replaceToCDN(findFeaturedMedia(e)),
  }))
}


export async function getNewsByTag(tagSlug: string, maxEntries: number = 100, locale: string = 'ja'): Promise<Entry[]> {
  const tag = await wp.tags().slug(tagSlug)
  if (tag.length == 0) return []
  const data = await (wp.posts().tags(tag[0].id).perPage(maxEntries).embed().param({ categories: CATEGORY_ID_NEWS, _fields: 'slug,title,date,content,_links,_embedded', lang: locale }))
  const tags: { [id: number]: Tag } = {};
  (await getWorkTags(locale)).forEach(t => tags[t.id] = t)
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: DateTime.fromISO(e.date).toFormat(`LLL dd, yyyy`),
    content: replaceToCDN(e.content.rendered),
    hero_image: replaceToCDN(findFeaturedMedia(e)),
  }))
}


const getRelPost = (data: any) => {
  if (data) {
    return {
      slug: data.slug,
      title: data.title,
    }
  }
  return null
}


export async function getPostDetails(slug: string, locale: string = 'ja'): Promise<Entry | null> {
  const data = (await wp.posts().slug(slug).embed().param({ _fields: 'slug,title,content,date,tags,acf,_links,_embedded,next,prev', lang: locale }))[0]
  if (!data) return null
  const tags: { [id: number]: Tag } = {};
  (await getWorkTags(locale)).forEach(t => tags[t.id] = t)
  return {
    slug: data.slug,
    title: data.title.rendered,
    subtitle: data.acf?.subtitle || null,
    overview: data.acf?.overview || null,
    side_image: replaceToCDN(data.acf?.side_image?.url) || '',
    content: replaceToCDN(data.content.rendered),
    date: DateTime.fromISO(data.date).toFormat(`LLL dd, yyyy`),
    hero_image: replaceToCDN(findFeaturedMedia(data)),
    hero_image_mobile: replaceToCDN(findFeaturedMedia(data, 'hero_image_mobile')),
    tags: data.tags.map((t: number) => tags[t]).filter((t: Tag) => t),
    credit: data.acf?.credit ? parseCredit(data.acf.credit) : null,
    next: getRelPost(data.next),
    prev: getRelPost(data.prev),
  }
}


export async function getPageDetails(slug: string): Promise<Entry> {
  const data = await wp.pages().slug(slug).embed()
  return {
    slug,
    title: data[0].title.rendered,
    content: replaceToCDN(data[0].content.rendered),
    hero_image: replaceToCDN(findFeaturedMedia(data[0])),
  }
}
