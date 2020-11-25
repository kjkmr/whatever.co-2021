import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
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


const Showreel = () => (
  <div className="reel">
    <video src="/assets/reel-preview.mp4" autoPlay={true} ></video>
    <button >Watch Reel</button>
    <style jsx>{`
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
        bottom -37px
        font-size 17.5px
        font-weight bold
        letter-spacing 0.03em
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

const Crossborder = () => (
  <div className="container">
    <img className="c1" src="/CrossborderCreative Studio..png" />
    <img className="c2" src="/Whatever is..png" />
    <div className="cats">
      <AboutLink about="genres" desc="At Whatever, as the name implies, we create anything." image="/image.jpg" />
      <AboutLink about="cultures" desc="Whatever can help you develop branding and content across borders and cultures." image="/image-1.jpg" />
      <AboutLink about="profession" desc="The people who come to Whatever are our greatest value." image="/image-2.jpg" />
    </div>
    <div className="link">
      <a href="#">About Us</a>
    </div>
    <style jsx>{`
      .container
        position relative
        margin-top 296px
        margin-left 80px
        padding-top 240px
        padding-bottom 68px
        background-color #F4F4F4
        img
          display block
      .c1
        position absolute
        top -161px
        left -87px
      .c2
        margin-left 74px
      .cats
        display flex
        margin-top 81px
      .link
        text-align right
        font-size 18.5px
        margin-top 21px
        padding-right 80px
        a
          display inline-block
          padding-right 62px
          padding-bottom 6px
          border-bottom 1px solid red
    `}</style>
  </div>
)

const WorkTag = (props: any) => (
  <a href="#">{props.children}
    <style jsx>{`
      a
        display inline-block
        border 1px solid black
        font-size 12px
        letter-spacing 0.02em
        padding 8px 10px
        margin-right 10px
    `}</style>
  </a>
)

const FeaturedWorkItem = (props: any) => (
  <div className="container" style={{ backgroundImage: `url(${props.image})` }}>
    <div className="text">
      <div className="date">{props.date}</div>
      <div className="title">{props.title}</div>
      <div className="tags">
        {props.tags.map((tag: any) => <WorkTag key={tag}>{tag}</WorkTag>)}
      </div>
      <div className="head">{props.head}</div>
      <div className="desc">{props.desc}</div>
    </div>
    <style jsx>{`
      .container
        {/* opacity 0.5 */}
        height 400px
        {/* background-image url(/fw1.jpg) */}
        background-repeat no-repeat
        background-position-x 5px
        padding-top 50px
        padding-left 584px
        margin-bottom 30px
      .text
        background-color white
        padding-top 63px
        padding-left 62px
        padding-right 80px
      .date
        font-size 12.2px
      .title
        font-size 48px
        font-weight bold
        margin-top 33px
        letter-spacing 0.0001em
      .tags
        margin-top 20px
      .head
        margin-top 39px
        font-size 24px
        font-weight bold
        letter-spacing 0.001em
      .desc
        margin-top 12px
        line-height 1.95em
    `}</style>
  </div>
)

const FeaturedWorks = () => (
  <div className="container">
    <h1>Featured Works</h1>
    <FeaturedWorkItem date="July 28, 2020" title="New Stand Tokyo" tags={["Brand Consulting", "Permanent Installation", "Featured"]} head="General store of the future." desc="We opened New Stand Tokyo, a “general store of the future,” on the ground floor of the co-working building WHEREVER which we co-operate with…" image="/fw1.jpg" />
    <FeaturedWorkItem date="July 28, 2020" title="WFH Jammies" tags={["Product / Service", "Featured"]} head="Loungewear for remote workers." desc="Half business, half relaxation. We planned and produced new kind of jammies for remote workers “WFH (Work From Home) Jammies”." image="/fw2.jpg" />
    <FeaturedWorkItem date="July 28, 2020" title="Superfly “Flare”" tags={["Film", "Featured"]} head="Fingertat’s hand-washing dance." desc="We planned and produced the music video for Superfly’s “Flare”, are hired from the opening of NHK’s morning TV drama “Scarlet”." image="/fw3.jpg" />
    <div className="link">
      <a href="#">All Works</a>
    </div>
    <style jsx>{`
      .container
        margin-top 97px
        margin-left -5px
      h1
        font-size 70px
        letter-spacing 0.001em
        margin-bottom 54px
      .link
        text-align right
        font-size 18.5px
        margin-top -8px
        padding-right 80px
        a
          display inline-block
          padding-right 62px
          padding-bottom 6px
          border-bottom 1px solid red
    `}</style>
  </div>
)

const NewsItem = (props: any) => (
  <div className="container">
    <img src={props.image} />
    <div className="date">{props.date}</div>
    <div className="title">{props.title}</div>
    <style jsx>{`
      .container
        width 256px
        margin-right 60px
      img
        width 256px
        height 144px
        object-fit cover
        display block
      .date
        font-size 12px
        margin-top 20px
      .title
        font-weight bold
        margin-top 9px
        letter-spacing 0.001em
        line-height 1.7em
    `}</style>
  </div>
)

const FeaturedNews = () => (
  <div className="container">
    <h1>Featured News</h1>
    <div className="items">
      <NewsItem date="July 28, 2020" title="Rakugaki AR featured in Suimoku channel" image="/news1.jpg" />
      <NewsItem date="July 28, 2020" title="Masashi Kawamura will appeared in Zee melt 2020" image="/news2.jpg" />
      <NewsItem date="July 28, 2020" title="WFH Jammies featured in NIKKEI DESIGN" image="/news3.jpg" />
      <NewsItem date="July 28, 2020" title="Masashi Kawamura’s interview featured in Kokuyo Design Award" image="/news4.jpg" />
    </div>
    <div className="link">
      <a href="#">All News</a>
    </div>
    <style jsx>{`
      .container
        margin-top 72px
        padding 57px 80px
        background-color #F4F4F4
        height 461px
      h1
        font-size 35px
        letter-spacing 0.012em
      .items
        display flex
        margin-top 53px
      .link
        text-align right
        font-size 18.5px
        font-weight bold
        margin-top 73px
        a
          display inline-block
          padding-right 62px
          padding-bottom 6px
          border-bottom 1px solid red
    `}</style>
  </div>
)

const IndexPage = () => (
  <Layout footer={<FeaturedNews />}>
    <Showreel />
    <Crossborder />
    <FeaturedWorks />
  </Layout>
)

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  // const work = await getFeaturedWork()
  // const news = await getLatestNews()
  return { props: { work: [], news: [] } }
}
