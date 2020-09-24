const WPAPI = require('wpapi')
const wp = new WPAPI({ endpoint: process.env.WORDPRESS_API_URL })


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


type Node = {
  slug: string,
  title: string,
};

export async function getAllMembers(): Promise<Node[] | undefined> {
  const data = await wp.pages().perPage(100).param({ _fields: 'slug,title', categories: 235 })
  return data.map((e: any): Node => ({ slug: e.slug, title: e.title.rendered }))
}


export async function getPageDetails(slug: string) {
  const data = await wp.pages().slug(slug).embed()
  const media = data[0]._embedded['wp:featuredmedia']
  return {
    title: data[0].title.rendered,
    content: data[0].content.rendered,
    image: media ? media[0].source_url : ''
  }
}


export async function getAllWorks() {
  const data = await getAll(wp.posts().perPage(100).embed().param({ categories: 4, _fields: 'slug,title,date,_links,_embedded' }))
  return data?.map((e: any) => ({
    slug: e.slug,
    title: e.title.rendered,
    date: e.date,
    image: e._embedded['wp:featuredmedia'][0].source_url,
  }))
}


export async function getPostDetails(slug: string) {
  const data = await wp.posts().slug(slug).embed().param({ _fields: 'title,content,date,_links,_embedded' })
  return {
    title: data[0].title.rendered,
    content: data[0].content.rendered,
    date: data[0].date,
    image: data[0]._embedded['wp:featuredmedia'][0].source_url,
  }
}


export async function getFeaturedWork() {
  const data = await wp.posts().perPage(3).embed().param({ tags: 185, _fields: 'slug,title,date,_links,_embedded' })
  return data?.map((e: any) => ({
    slug: e.slug,
    title: e.title.rendered,
    date: e.date,
    image: e._embedded['wp:featuredmedia'][0].source_url,
  }))
}


export async function getAllNews() {
  const data = await wp.posts().perPage(20).embed().param({ categories: 5, _fields: 'slug,title,date,content,_links,_embedded' })
  return data?.map((e: any) => ({
    slug: e.slug,
    title: e.title.rendered,
    date: e.date,
    content: e.content.rendered,
    image: e._embedded['wp:featuredmedia'][0].source_url,
  }))
}


export async function getLatestNews() {
  const data = await wp.posts().perPage(3).embed().param({ categories: 5, _fields: 'slug,title,date,_links,_embedded' })
  return data?.map((e: any) => ({
    slug: e.slug,
    title: e.title.rendered,
    date: e.date,
    image: e._embedded['wp:featuredmedia'][0].source_url,
  }))
}
