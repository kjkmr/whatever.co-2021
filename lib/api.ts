const API_URL = process.env.WORDPRESS_API_URL || ''
const WPAPI = require('wpapi')
const wp = new WPAPI({ endpoint: 'http://localhost:8888/wp-json' })

async function fetchAPI(query: any, { variables }: any = {}) {
  const headers = {
    'Content-Type': 'application/json'
  }

  // if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
  //   headers[
  //     'Authorization'
  //   ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  // }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}


type Node = {
  slug: string,
  title: string,
};

export async function getAllMembers(): Promise<Node[] | undefined> {
  const data = await wp.pages().perPage(100).param({ _fields: 'slug,title', categories: 235 })
  return data.map((e: any): Node => ({ slug: e.slug, title: e.title.rendered }))
}


export async function getMemberDetails(slug: string) {
  const data = await wp.pages().slug(slug).embed()
  return {
    title: data[0].title.rendered,
    content: data[0].content.rendered,
    image: data[0]._embedded['wp:featuredmedia'][0].source_url
  }
}


export async function getPageDetails(slug: string) {
  const data = await fetchAPI(
    `query ($slug: ID!) {
        page(id: $slug, idType: URI) {
          title
          content
        }
      }`,
    { variables: { slug } })
  return data?.page
}


export async function getAllWorks() {
  const data = await fetchAPI(`
    {
      posts(first: 1000, where: {categoryName: "WORK"}) {
        nodes {
          slug
          title
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `)
  return data?.posts?.nodes
}


export async function getPostDetails(slug: string) {
  const data = await fetchAPI(
    `query ($slug: ID!) {
        post(id: $slug, idType: URI) {
          title
          content
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }`,
    { variables: { slug } })
  return data?.post
}


export async function getFeaturedWork() {
  const data = await fetchAPI(`
    {
      posts(first: 3, where: {tag: "featured"}) {
        nodes {
          slug
          title
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `)
  return data?.posts?.nodes
}


export async function getAllNews() {
  const data = await fetchAPI(`
    {
      posts(first: 20, where: {categoryName: "NEWS"}) {
        nodes {
          slug
          title
          date
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `)
  return data?.posts?.nodes
}


export async function getLatestNews() {
  const data = await fetchAPI(`
    {
      posts(first: 3, where: {categoryName: "news"}) {
        nodes {
          slug
          title
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `)
  return data?.posts?.nodes
}