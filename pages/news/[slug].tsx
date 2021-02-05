import { GetStaticProps, GetStaticPaths } from 'next'
import { Entry, getPostDetails } from 'lib/api'
import Layout from 'components/Layout'
import EntryBody from 'components/EntryBody'
import { Grad, GradImg } from 'components/Grad'

const NewsDetail = ({ entry }: { entry: Entry }) => (
  <Layout title={entry.title} side="News" backto="/news">
    <div className="news">
      <div className="image"><GradImg><img src={entry.hero_image} alt="" /></GradImg></div>
      <div className="white">
        <div><Grad className="date" inline>{entry.date}</Grad></div>
        <div><Grad className="title" inline><div dangerouslySetInnerHTML={{ __html: entry.title }} /></Grad></div>
      </div>
      <div className="body"><EntryBody content={entry.content!} /></div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .news
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
          white-space pre
        :global(.title)
          font-size 3.0rem
          font-weight 700
          line-height 4.0rem
          margin-top 18px
      .body
        margin 65px auto 95px
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .news
          margin 0
        .image img
          width vwpx(325)
          height vwpx(325 / 16 * 9)
        .white
          background-color transparent
          display block
          margin 0 30px 0 0
          padding 0
          :global(.date)
            font-size 1.0rem
            margin-top 4.0rem
          :global(.title)
            font-size 1.7rem
            line-height 1.6
            margin-top 1.5rem
        .body
          margin 2.8rem 30px 10.0rem 0
    `}</style>
  </Layout >
)

export default NewsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  // const entries = await Promise.all(locales!.map(async (locale) => {
  //   const entries = await getNews(100, locale)
  //   return { locale, entries }
  // }))
  // const paths = entries.map(({ entries, locale }) => {
  //   return entries.map((entry) => ({ params: { slug: entry.slug }, locale }))
  // }).flat()
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const entry = await getPostDetails(params?.slug as string, locale)
  return {
    props: { entry },
    revalidate: 60 * 10,
  }
}
