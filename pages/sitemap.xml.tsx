import { GetServerSideProps } from 'next'
import { SitemapStream } from 'sitemap'
import { createGzip } from 'zlib'
import { getAllMembers, getAllNews, getAllWorks, getWorkTags } from 'lib/api'

const LOCALE_PATHS = ['', '/ja', '/zh-hant']

const STATIC_PATHS = [
  '/',
  '/about/',
  '/about/genres/',
  '/about/workstyle/',
  '/about/location/',
  '/contact/',
  '/team/',
  '/news/',
]

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Content-Encoding', 'gzip')

  const sitemap = new SitemapStream({ hostname: 'https://whatever.co/' })
  sitemap.pipe(createGzip()).pipe(res)

  STATIC_PATHS.forEach(path => {
    LOCALE_PATHS.forEach(locale => {
      sitemap.write({ url: `${locale}${path}`, changefreq: 'monthly', priority: 1.0 })
    })
  })

  const members = await getAllMembers()
  members.forEach(member => {
    LOCALE_PATHS.forEach(locale => {
      sitemap.write({ url: `${locale}/team/${member.slug}/`, changefreq: 'monthly' })
    })
  })
  const tags = await getWorkTags('en')
  tags.forEach(tag => {
    if (tag.slug == 'featured') return
    LOCALE_PATHS.forEach(locale => {
      sitemap.write({ url: `${locale}/work/category/${tag.slug}/`, changefreq: 'monthly' })
    })
  })
  const works = await getAllWorks()
  works.forEach(work => {
    LOCALE_PATHS.forEach(locale => {
      sitemap.write({ url: `${locale}/work/${work.slug}/`, changefreq: 'monthly' })
    })
  })
  const news = await getAllNews()
  news.forEach(news => {
    LOCALE_PATHS.forEach(locale => {
      sitemap.write({ url: `${locale}/news/${news.slug}/`, changefreq: 'monthly' })
    })
  })

  sitemap.end()
  return { props: {} }
}

const Page = () => null
export default Page
