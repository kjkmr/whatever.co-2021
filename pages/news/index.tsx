import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Entry, getNews } from 'lib/api'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'

const NewsItem = ({ entry }: { entry: Entry }) => (
  <div className="news-item">
    <Link href={`/news/${entry.slug}`}>
      <a>
        <div className="image"><GradImg><img src={entry.hero_image} alt="" /></GradImg></div>
        <div className="info">
          <Grad><div className="date">{entry.date}</div></Grad>
          <Grad><div className="title">{entry.title}</div></Grad>
          <Grad><div className="desc" dangerouslySetInnerHTML={{ __html: entry.content?.split('<!--more-->')[0] || '' }} /></Grad>
        </div>
      </a>
    </Link>
    <style jsx>{`
      @import 'lib/vw.styl'
      .news-item
        font-size 0
        width vwpx(593)
      .image
        img
          width vwpx(593)
          height vwpx(334)
          object-fit cover
      .date
        display inline-block
        font-size 1.2rem
        font-weight 300
        margin-top 3.0rem
      .title
        display inline-block
        font-size 2.0rem
        font-weight bold
        line-height 3.0rem
        margin-top 1.3rem
      .desc
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 4
        overflow hidden
        text-overflow ellipsis
        font-size 1.5rem
        font-weight 300
        line-height 3.0rem
        margin-top 0.0rem
        width vwpx(561)
    `}</style>
  </div>
)

const NewsIndex = ({ entries }: { entries: Entry[] }) => (
  <Layout title="News" side="News">
    <div className="news-index">
      {entries.map(entry => <NewsItem key={entry.slug} entry={entry} />)}
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .news-index
        margin-top 88px
        margin-bottom 150px
        display grid
        grid-template-columns 1fr 1fr
        grid-gap vwpx(92) vwpx(100)
    `}</style>
  </Layout >
)

export default NewsIndex

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const entries = await getNews(100, locale)
  return { props: { entries } }
}
