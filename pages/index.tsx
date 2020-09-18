import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getFeaturedWork, getLatestNews } from '../lib/api'


type Post = {
  slug: string
  title: string
  date: string
  featuredImage: {
    node: {
      sourceUrl: string
    }
  }
}

type Props = {
  work: Post[]
  news: Post[]
}


const IndexPage = ({ work, news }: Props) => (
  <Layout>
    <div className="statement">
      <div className="showreel">
        <video muted autoPlay playsInline loop src="/assets/reel-preview.mp4" />
        <img src="/assets/showreel-button.png" />
      </div>
      <img className="makewe" src="/assets/makewhatever.png" />
      <div className="about"><Link href="/about">ABOUT</Link></div>
      <div className="vline"></div>
      <div className="featured-work">
        <img src="/assets/featured-work.png" width="251" />
        <div className="items">
          {work.map(entry => (
            <Link href={`/work/${entry.slug}`} key={entry.slug}>
              <div className="work" style={{ backgroundImage: `url(${entry.featuredImage.node.sourceUrl})` }}>
                <div className="title" dangerouslySetInnerHTML={{ __html: entry.title }}></div>
                <img src="/assets/learnmore.png" width="160"></img>
              </div>
            </Link>
          ))}
        </div>
        <div className="allwork"><Link href="/work">ALL WORK</Link></div>
      </div>
      <div className="latest-news">
        <img src="/assets/news.png" width="84" />
        <div className="items">
          {news.map(entry => (
            <Link href={`/post/${entry.slug}`} key={entry.slug}>
              <div className="news" style={{ backgroundImage: `url(${entry.featuredImage.node.sourceUrl})` }}>
                <div className="date">{entry.date}</div>
                <div className="title" dangerouslySetInnerHTML={{ __html: entry.title }}></div>
              </div>
            </Link>
          ))}
        </div>
        <div className="allnews"><Link href="/news">ALL NEWS</Link></div>
      </div>
    </div>

    <style jsx>{`
      .statement
        width: 960px
        margin: auto
        margin-top: -50px
        text-align: center
        img
          display: block
      .showreel
        background-color: #000
        width: 1280px
        height: 720px
        margin-left: -160px
        margin-bottom: 96px
        position: relative
        cursor: pointer
        img
          position: absolute
          width: 1280px
          height: 720px
          top: 0
          left: 0

      .makewe
        display: block
        width: 100%
        margin-bottom: 30px
      .about
        text-align: right
        font-size: 18px
        font-weight: bold
      .vline
        border-left: 2px solid black
        height: 110px
        width: 0px
        margin: 0 auto 0 auto

      .featured-work
        margin-top: 56px
        >img
          margin: auto
          margin-bottom: 60px
        .items
          display: flex
          justify-content: space-between
          .work
            width: 300px
            height: 320px
            background-color: #d7d7d7
            background-blend-mode: multiply
            background-size: cover
            background-position: center
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            color: white
            font-size: 19px
            font-weight: bold
            cursor: pointer
            .title
              min-height: 72px
              display: flex
              justify-content: center
              align-items: center
              margin: 14px 0
              user-select: none
        .allwork
            text-align: right
            margin-top: 30px
            font-size: 18px
            font-weight: bold
      .latest-news
        margin-top: 113px
        >img
          margin: auto
          margin-bottom: 54px
        .items
          .news
            text-align: left
            margin-bottom: 20px
            padding-left: 221px
            height: 86px
            background-size: contain
            background-repeat: no-repeat
            background-position: left
            display: flex
            flex-direction: column
            justify-content: flex-end
            cursor: pointer
            .date
              font: normal 300 15px acumin-pro, sans-serif
              margin-bottom: 2px
            .title
              font-size: 18px
              font-weight: bold
        .allnews
          text-align: right
          margin-top: 30px
          font-size: 18px
          font-weight: bold

    `}</style>
  </Layout>
)

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const work = await getFeaturedWork()
  const news = await getLatestNews()
  return { props: { work, news } }
}
