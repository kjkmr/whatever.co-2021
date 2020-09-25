const WPAPI = require('wpapi')
const wp = new WPAPI({ endpoint: process.env.WORDPRESS_API_URL })


const re = new RegExp(`${process.env.WORDPRESS_URL}/wp-content/`, 'g')
const replaceToCDN = (url: string): string => {
  return url.replace(re, process.env.CDN_URL + '/wp-content/')
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
}


export async function getAllMembers(): Promise<Entry[]> {
  const data = await wp.pages().perPage(100).param({ categories: 235, _fields: 'slug,title' })
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered
  }))
}


export async function getAllWorks(): Promise<Entry[]> {
  const data = await getAll(wp.posts().perPage(100).embed().param({ categories: 4, _fields: 'slug,title,date,_links,_embedded' }))
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: e.date,
    image: replaceToCDN(e._embedded['wp:featuredmedia'][0].source_url),
  }))
}


export async function getFeaturedWork(): Promise<Entry[]> {
  const data = await wp.posts().perPage(3).embed().param({ tags: 185, _fields: 'slug,title,date,_links,_embedded' })
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: e.date,
    image: replaceToCDN(e._embedded['wp:featuredmedia'][0].source_url),
  }))
}


export async function getAllNews(): Promise<Entry[]> {
  const data = await wp.posts().perPage(20).embed().param({ categories: 5, _fields: 'slug,title,date,content,_links,_embedded' })
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: e.date,
    content: e.content.rendered,
    image: replaceToCDN(e._embedded['wp:featuredmedia'][0].source_url),
  }))
}


export async function getLatestNews(): Promise<Entry[]> {
  const data = await wp.posts().perPage(3).embed().param({ categories: 5, _fields: 'slug,title,date,_links,_embedded' })
  return data?.map((e: any): Entry => ({
    slug: e.slug,
    title: e.title.rendered,
    date: e.date,
    image: replaceToCDN(e._embedded['wp:featuredmedia'][0].source_url),
  }))
}


export async function getPostDetails(slug: string): Promise<Entry> {
  const data = await wp.posts().slug(slug).embed().param({ _fields: 'slug,title,content,date,_links,_embedded' })
  console.log(data)
  return {
    slug: data[0].slug,
    title: data[0].title.rendered,
    content: data[0].content.rendered,
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
    content: data[0].content.rendered,
    image: media ? replaceToCDN(media[0].source_url) : ''
  }
}
