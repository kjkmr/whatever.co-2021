import React from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
// import { Entry, getFeaturedWork, getLatestNews } from '../lib/api'
import Layout from '../components/Layout'
import { Grad, GradImg } from '../components/Grad'

// type Props = {
//   work: Entry[]
//   news: Entry[]
// }

const Showreel = () => (
  <div className="reel">
    <video src="/assets/reel-preview.mp4" autoPlay={true} ></video>
    <button >Watch Reel</button>
    <style jsx>{`
      .reel
        position relative
        width 100%
        background-color black
        font-size 0
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
        font-size 17.5px
        font-weight bold
        letter-spacing 0.03em
    `}</style>
  </div>
)

const AboutLink = (props: any) => (
  <div className="container">
    <div className="image"><GradImg><img src={props.image} alt="" width="330" height="330" /></GradImg></div>
    <div className="titles">
      <Grad><div className="pre">Crossing the border of</div></Grad>
      <Grad><div className="what">{props.about}</div></Grad>
    </div>
    <Grad><div className="desc">{props.desc}</div></Grad>
    <style jsx>{`
      .container
        position relative
        width 330px
        height 500px
        margin-left 72px
      .image
        position absolute
        top 0
        left 0
      .titles
        position relative
        background-color #F4F4F4
        margin-top 258px
        margin-right 64px
        padding-top 39px
        padding-left 1px
        height 98px
        font-size 0
        .pre
          display inline-block
          font-size 19px
          letter-spacing 0.04em
        .what
          display inline-block
          margin-top 8px
          font-size 35px
          font-weight bold
      .desc
        line-height 1.7em
    `}</style>
  </div>
)

const Crossborder = () => (
  <div className="container">
    <div className="title">
      <Grad><h1>Crossborder</h1></Grad>
      <Grad><h1>Creative Studio.</h1></Grad>
    </div>
    <div className="desc">
      <Grad><h2>Whatever is a cross-border creative studio.</h2></Grad>
      <Grad><h2>We transcend boundaries.</h2></Grad>
    </div>
    <div className="cats">
      <AboutLink about="genres" desc="At Whatever, as the name implies, we create anything." image="/index/genres.jpg" />
      <AboutLink about="cultures" desc="Whatever can help you develop branding and content across borders and cultures." image="/index/cultures.jpg" />
      <AboutLink about="profession" desc="The people who come to Whatever are our greatest value." image="/index/profession.jpg" />
    </div>
    <div className="link">
      <Grad>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </Grad>
    </div>
    <style jsx>{`
      .container
        position relative
        margin-top 299px
        margin-left 80px
        margin-bottom 0
        padding-top 240px
        padding-bottom 68px
        background-color #F4F4F4
        img
          display block
      .title
        position absolute
        top -160px
        left -88px
        font-size 0
        h1
          display inline-block
          font-size 164px
          line-height auto
          margin 0
          margin-bottom 16px
      .desc
        position relative
        margin-top 1px
        margin-left 74px
        font-size 0
        h2
          display inline-block
          font-size 46px
          margin 0
          margin-bottom 24px
      .c1
        position absolute
        top -161px
        left -87px
      .c2
        margin-left 74px
      .cats
        display flex
        margin-top 56px
      .link
        text-align right
        font-size 18.5px
        margin-top 21px
        padding-right 80px
        a
          display inline-block
          padding-right 59px
          padding-left 3px
          padding-bottom 6px
          border-bottom 1px solid red
          font-weight bold
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
  <div className="container">
    <div className="image"><GradImg><img src={props.image} width="677" height="381" /></GradImg></div>
    <div className="text">
      <Grad><div className="date">{props.date}</div></Grad>
      <Grad><div className="title">{props.title}</div></Grad>
      <Grad><div className="tags">
        {props.tags.map((tag: any) => <WorkTag key={tag}>{tag}</WorkTag>)}
      </div></Grad>
      <Grad><div className="head">{props.head}</div></Grad>
      <Grad><div className="desc">{props.desc}</div></Grad>
    </div>
    <style jsx>{`
      .container
        position relative
        {/* opacity 0.5 */}
        height 400px
        background-repeat no-repeat
        background-position-x 5px
        padding-top 50px
        padding-left 584px
        margin-bottom 30px
      .image
        position absolute
        top 0
        left 5px
      .text
        position relative
        background-color white
        padding-top 63px
        padding-left 62px
        padding-right 80px
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size 12.2px
      .title
        display inline-block
        overflow hidden
        font-size 48px
        font-weight bold
        margin-top 33px
        letter-spacing 0.0001em
      .tags
        display inline-block
        overflow hidden
        margin-top 20px
      .head
        display inline-block
        overflow hidden
        margin-top 39px
        font-size 24px
        font-weight bold
        letter-spacing 0.001em
      .desc
        display inline-block
        overflow hidden
        margin-top 12px
        letter-spacing -0.01em
        line-height 1.95em
        font-size 16px
    `}</style>
  </div>
)

const FeaturedWorks = () => (
  <div className="container">
    <Grad><h1>Featured Works</h1></Grad>
    <FeaturedWorkItem date="July 28, 2020" title="New Stand Tokyo" tags={["Brand Consulting", "Permanent Installation", "Featured"]} head="General store of the future." desc="We opened New Stand Tokyo, a “general store of the future,” on the ground floor of the co-working building WHEREVER which we co-operate with…" image="/_/fw1.jpg" />
    <FeaturedWorkItem date="July 28, 2020" title="WFH Jammies" tags={["Product / Service", "Featured"]} head="Loungewear for remote workers." desc="Half business, half relaxation. We planned and produced new kind of jammies for remote workers “WFH (Work From Home) Jammies”." image="/_/fw2.jpg" />
    <FeaturedWorkItem date="July 28, 2020" title="Superfly “Flare”" tags={["Film", "Featured"]} head="Fingertat’s hand-washing dance." desc="We planned and produced the music video for Superfly’s “Flare”, are hired from the opening of NHK’s morning TV drama “Scarlet”." image="/_/fw3.jpg" />
    <div className="link">
      <Grad>
        <Link href="/work">
          <a>All Works</a>
        </Link>
      </Grad>
    </div>
    <style jsx>{`
      .container
        margin-top 92px
        margin-left -5px
      h1
        display inline-block
        font-size 70px
        margin 0
        margin-bottom 51px
      .link
        text-align right
        margin-top -8px
        padding-right 78px
        a
          display inline-block
          padding-right 62px
          padding-bottom 6px
          border-bottom 1px solid red
          font-size 18.5px
          font-weight bold
          letter-spacing -0.01em
    `}</style>
  </div>
)

const NewsItem = (props: any) => (
  <div className="container">
    <GradImg><img src={props.image} width="256" height="144" /></GradImg>
    <Grad><div className="date">{props.date}</div></Grad>
    <Grad><div className="title">{props.title}</div></Grad>
    <style jsx>{`
      .container
        width 256px
        margin-right 60px
        font-size 0
      img
        width 256px
        height 144px
        object-fit cover
        display block
      .date
        display inline-block
        overflow hidden
        font-size 12px
        margin-top 20px
      .title
        display inline-block
        overflow hidden
        font-size 16px
        font-weight bold
        margin-top 9px
        letter-spacing 0.001em
        line-height 1.7em
    `}</style>
  </div>
)

const FeaturedNews = () => (
  <div className="container">
    <Grad><h1>Featured News</h1></Grad>
    <div className="items">
      <NewsItem date="July 28, 2020" title="Rakugaki AR featured in Suimoku channel" image="/_/news1.jpg" />
      <NewsItem date="July 28, 2020" title="Masashi Kawamura will appeared in Zee melt 2020" image="/_/news2.jpg" />
      <NewsItem date="July 28, 2020" title="WFH Jammies featured in NIKKEI DESIGN" image="/_/news3.jpg" />
      <NewsItem date="July 28, 2020" title="Masashi Kawamura’s interview featured in Kokuyo Design Award" image="/_/news4.jpg" />
    </div>
    <div className="link">
      <Grad>
        <Link href="/news">
          <a>All News</a>
        </Link>
      </Grad>
    </div>

    <style jsx>{`
      .container
        margin-top 72px
        padding 80px 80px
        background-color #F4F4F4
        height 415px
      h1
        display inline-block
        overflow hidden
        font-size 35px
        letter-spacing 0.012em
        margin 0
        margin-left -2px
      .items
        display flex
        margin-top 50px
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
  <Layout showHeader={false} footer={<FeaturedNews />}>
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
