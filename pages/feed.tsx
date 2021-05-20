// https://zenn.dev/catnose99/articles/c7754ba6e4adac

import { GetServerSidePropsContext } from 'next'
import RSS from 'rss'
import { getAllPosts } from 'lib/api'


async function generateFeedXml(locale: string = 'ja') {
  const feed = new RSS({
    title: "Whatever Inc. News",
    site_url: "https://whatever.co/",
    feed_url: "https://whatever.co/feed/",
    language: locale,
  })

  const entries = await getAllPosts(5, locale)
  entries?.forEach((entry) => {
    feed.item({
      title: entry.title,
      description: entry.content || '',
      date: new Date(entry.date || ''),
      url: `https://whatever.co/`,
    })
  })

  return feed.xml()
}


export const getServerSideProps = async ({ res, locale }: GetServerSidePropsContext) => {
  const xml = await generateFeedXml(locale)

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return { props: {} }
}


const Page = () => null
export default Page
