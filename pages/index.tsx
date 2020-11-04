import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Entry, getFeaturedWork, getLatestNews } from '../lib/api'


type Props = {
  work: Entry[]
  news: Entry[]
}


const IndexPage0 = ({ work, news }: Props) => (
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
              <div className="work" style={{ backgroundImage: `url(${entry.image})` }}>
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
              <div className="news" style={{ backgroundImage: `url(${entry.image})` }}>
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

const Menu = () => (
  <div className="menu">
    <div>=</div>
    <style jsx>{`
      .menu
        width 80px
        height 80px
        background-color black
        color white
    `}</style>
  </div>
)

const AboutLink = (props: any) => (
  <div className="container" style={{ backgroundImage: `url(${props.image})` }}>
    <div className="titles">
      <div className="pre">Crossing the border of</div>
      <div className="what">{props.about}</div>
    </div>
    <div className="desc">{props.desc}</div>
    <style jsx>{`
      .container
        width 330px
        height 500px
        margin-left 72px
        background-image url(/image.jpg)
        background-repeat no-repeat
        .titles
          background-color #F4F4F4
          margin-top 258px
          margin-right 64px
          padding-top 39px
          padding-left 1px
          height 98px
          .pre
            font-size 19px
            letter-spacing 0.04em
          .what
            margin-top 8px
            font-size 35px
            letter-spacing 0.03em
        .desc
          line-height 1.7em
    `}</style>
  </div>
)

const IndexPage = () => (
  <div className="container">
    <div className="contents">
      <Menu />
      <div className="main">
        <div className="reel">
          <video src="/assets/reel-preview.mp4" ></video>
          <button >Watch Reel</button>
        </div>
        <div className="about-us">
          <img className="crossborder" src="/CrossborderCreative Studio..png" />
          <img className="whatever-is" src="/Whatever is..png" />
          <div className="about-links">
            <AboutLink about="genres" desc="At Whatever, as the name implies, we create anything." image="/image.jpg" />
            <AboutLink about="cultures" desc="Whatever can help you develop branding and content across borders and cultures." image="/image-1.jpg" />
            <AboutLink about="profession" desc="The people who come to Whatever are our greatest value." image="/image-2.jpg" />
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .container
        position relative
        max-width 1366px
        margin 0 auto

      .contents
        display flex
        align-items flex-start

      .main
        width calc(100% - 80px)

      .reel
        position relative
        width 100%
        video
          width 1286px
          height 728px
          object-fit cover
        button
          width 256px
          height 80px
          border none
          background-color black
          color white
          position absolute
          right 0
          bottom -40px

      .about-us
        position relative
        margin-top 296px
        margin-left 80px
        padding-top 240px
        background-color #F4F4F4
        img
          display block
        .crossborder
          position absolute
          top -161px
          left -87px
        .whatever-is
          margin-left 74px
        .about-links
          display flex
          margin-top 81px

    `}</style>

    <style jsx global>{`
      html, body
        margin 0
        padding 0
      body
        background-image url('/_/Top.png')
        background-repeat no-repeat
        background-position top center
        font-family Apercu
        font-size 16px
        letter-spacing -0.01em
    `}</style>
  </div>
)

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  // const work = await getFeaturedWork()
  // const news = await getLatestNews()
  return { props: { work: [], news: [] } }
}
