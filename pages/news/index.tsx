import { GetStaticProps } from 'next'
import { Entry, getNews } from 'lib/api'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'

const NewsItem = ({ entry }: { entry: Entry }) => (
  <div className="news-item">
    <div className="image"><GradImg><img src={entry.image} alt="" /></GradImg></div>
    <div className="info">
      <Grad><div className="date">{entry.date}</div></Grad>
      <Grad><div className="title">{entry.title}</div></Grad>
      <Grad><div className="desc" dangerouslySetInnerHTML={{ __html: entry.content || '' }} /></Grad>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .news-item
        display grid
        grid-template-columns vwpx(611) auto
        grid-gap vwpx(64)
        font-size 0
        margin-bottom vwpx(100)
        margin-right vwpx(80)
      .image
        img
          width vwpx(611)
          height vwpx(345)
          object-fit cover
      .date
        display inline-block
        font-size 1.4rem
        font-weight light
      .title
        display inline-block
        font-size vwpx(30)
        font-weight bold
        line-height vwpx(48)
        margin-top vwpx(13)
      .desc
        display inline-block
        font-size 1.5rem
        font-weight light
        line-height 3.0rem
        margin-top vwpx(18)
    `}</style>
  </div>
)

const NewsIndex = ({ entries }: { entries: Entry[] }) => (
  <Layout title="News" side="News">
    <div className="news-index">
      {entries.map(entry => <NewsItem key={entry.slug} entry={entry} />)}
    </div>
    <style jsx>{`
      .news-index
        margin-top 40px
    `}</style>
  </Layout >
)

export default NewsIndex

export const getStaticProps: GetStaticProps = async () => {
  const entries = await getNews()
  return { props: { entries } }
}
