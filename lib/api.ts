const API_URL = process.env.WORDPRESS_API_URL || ''

async function fetchAPI(query: any, {variables}: any = {}) {
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

export async function getAllMembers(): Promise<Node[]|undefined> {
  const data = await fetchAPI(`
    {
      pages(first: 10000, where: {categoryName: "MEMBERS"}) {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `)
  return data?.pages?.edges?.map((edge: any): Node => edge.node)
}


export async function getMemberDetails(slug: string) {
  const data = await fetchAPI(
      `query ($slug: ID!) {
        page(id: $slug, idType: URI) {
          title
          content
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }`,
      {variables: {slug: `team/${slug}`}})
  return data?.page
}


export async function getPageDetails(slug: string) {
  const data = await fetchAPI(
      `query ($slug: ID!) {
        page(id: $slug, idType: URI) {
          title
          content
        }
      }`,
      {variables: {slug}})
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


export async function getWorkDetails(slug: string) {
  const data = await fetchAPI(
      `query ($slug: ID!) {
        post(id: $slug, idType: URI) {
          title
          content
          date
        }
      }`,
      {variables: {slug}})
  return data?.post
}
