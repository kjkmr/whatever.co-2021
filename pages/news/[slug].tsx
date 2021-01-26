import { GetStaticProps, GetStaticPaths } from 'next'
import { Entry, getNews, getPostDetails } from 'lib/api'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'

const NewsDetail = ({ entry }: { entry: Entry }) => (
  <Layout title={entry.title} side="News" backto="/news">
    <div className="news">
      <div className="image"><GradImg><img src={entry.hero_image} alt="" /></GradImg></div>
      <div className="white">
        <div><Grad className="date">{entry.date}</Grad></div>
        <div><Grad className="title"><div dangerouslySetInnerHTML={{ __html: entry.title }} /></Grad></div>
      </div>
      <div className="body" dangerouslySetInnerHTML={{ __html: entry.content! }}></div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .news
        {/* opacity 0.5 */}
        margin 0 80px 140px
        font-size 0
      .image img
        width vwpx2(1126, 240)
        height vwpx2(633, 240)
        object-fit cover
      .white
        position relative
        display inline-block
        margin-top -70px
        margin-right 80px
        padding-right 100px
        background-color white
        :global(.date)
          font-size 1.6rem
          font-weight 300
          margin-top 88px
        :global(.title)
          font-size 3.0rem
          font-weight bold
          line-height 4.0rem
          margin-top 18px
      .body
        font-size 1.5rem
        line-height 3.0rem
        max-width 900px
        margin 65px auto 95px
    `}</style>
  </Layout >
)

export default NewsDetail

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const entries = await Promise.all(locales!.map(async (locale) => {
    const entries = await getNews(100, locale)
    return { locale, entries }
  }))
  const paths = entries.map(({ entries, locale }) => {
    return entries.map((entry) => ({ params: { slug: entry.slug }, locale }))
  }).flat()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const entry = await getPostDetails(params?.slug as string, locale)
  return { props: { entry } }
}
