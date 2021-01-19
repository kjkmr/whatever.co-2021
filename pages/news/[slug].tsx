import { GetStaticProps, GetStaticPaths } from 'next'
import { Entry, getNews, getPostDetails } from 'lib/api'
import Layout from 'components/Layout'
// import { Grad, GradImg } from 'components/Grad'

const NewsDetail = ({ entry }: { entry: Entry }) => (
  <Layout title={entry.title} side="News" backto="/news">
    <div className="news">
      <div className="image"><img src={entry.hero_image} alt="" /></div>
      <div className="white">
        <div className="date">{entry.date}</div>
        <div className="title" dangerouslySetInnerHTML={{ __html: entry.title }}></div>
      </div>
      <div className="body" dangerouslySetInnerHTML={{ __html: entry.content! }}></div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .news
        {/* opacity 0.7 */}
        margin 0 80px 160px
        font-size 0
        position relative
      .image
        position absolute
        img
          width vwpx2(1126, 240)
          height vwpx2(633, 240)
          object-fit cover
      .white
        background-color white
        margin-top vwpx2(562, 240)
        display inline-block
        padding-right 30px
      .date
        font-size 1.6rem
        font-weight 300
        margin-top 89px
      .title
        font-size 3.0rem
        font-weight bold
        line-height 4.0rem
        margin-top 18px
      .body
        font-size 1.5rem
        line-height 3.0rem
        max-width 900px
        margin 95px auto
    `}</style>
  </Layout >
)

export default NewsDetail

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const entries = await getNews()
  const paths = (locales || ['ja']).map(locale => entries.map((m) => ({ params: { slug: m.slug }, locale }))).flat()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const entry = await getPostDetails(params?.slug as string, locale)
  return { props: { entry } }
}
