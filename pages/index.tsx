import React from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Entry, Tag, getLatestNews, getWorksByTag } from '../lib/api'
import Layout from '../components/Layout'
import WorkTag from '../components/WorkTag'
import { Grad, GradImg } from '../components/Grad'

const Showreel = () => (
  <div className="reel">
    <video src="/index/reel-preview.mp4" autoPlay={true} ></video>
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

const AboutLink = ({ title, desc, image, ix }: { title: string, desc: string, image: string, ix?: number }) => (
  <div className="container">
    <Link href={`/about/${title}`}>
      <a>
        <div className="image" style={{ marginLeft: ix || 0 }}> <GradImg><img src={image} alt="" width="340" height="340" /></GradImg></div>
        <div className="titles">
          <Grad><div className="pre">Crossing the border of</div></Grad>
          <Grad><div className="what">{title}</div></Grad>
        </div>
        <Grad><div className="desc">{desc}</div></Grad>
        <div className="more">Show more</div>
      </a>
    </Link>
    <style jsx>{`
      .container
        position relative
        width 416px
        font-size 0
      .image
        img
          object-fit contain
      .titles
        position relative
        margin-top 9px
        margin-right 64px
        padding-top 39px
        padding-left 1px
        height 98px
        .pre
          display inline-block
          font-size 20px
          font-weight 700
        .what
          display inline-block
          margin-top 8px
          font-size 70px
          font-weight bold
      .desc
        font-size 18px
        font-weight 200
        line-height 1.8em
        margin-top 24px
        width 335px
        min-height 186px
      .more
        font-size 20px
        font-weight 700
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
    </div>
    <div className="cats">
      <AboutLink title="genres" desc="At Whatever, as our name implies, we create anything.We plan, develop and implement experiences that no one has ever seen before." image="/index/genres@2x.png" ix={-10} />
      <AboutLink title="cultures" desc="At Whatever, we have a proven track record of working with brands around the world and can support branding and content development across borders and cultures." image="/index/cultures@2x.png" />
      <AboutLink title="profession" desc="The “diversity of people” at Whatever is the greatest value we have." image="/index/profession@2x.png" />
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
        margin-top 136px
        img
          display block
      .title
        font-size 0
        margin-left -7px
        h1
          display inline-block
          font-size 175px
          font-weight bold
          line-height 176px
          margin 0
          margin-bottom 16px
      .desc
        position relative
        margin-top 66px
        margin-left 80px
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
        justify-content space-between
        margin-top 63px
      .link
        text-align right
        font-size 24px
        font-weight 700
        margin-top 75px
        a
          display inline-block
          padding-right 115px
          padding-left 3px
          padding-bottom 10px
          border-bottom 1px solid red
          font-weight bold
    `}</style>
  </div>
)

const FeaturedWorkItem = ({ work }: { work: Entry }) => (
  <div className="container">
    <div className="image"><GradImg><img src={work.image} width="677" height="381" /></GradImg></div>
    <div className="text">
      <Grad><div className="date">{work.date}</div></Grad>
      <Grad><div className="title">{work.title}</div></Grad>
      <Grad><div className="head">Lorem ipsum dolor sit amet</div></Grad>
      <Grad><div className="desc">Morbi imperdiet placerat magna, et faucibus quam molestie eget. Nam faucibus nunc et dui aliquam scelerisque. In laoreet nisl sed tellus tincidunt, et scelerisque dolor fermentum. Duis enim nisi, vehicula in lorem eget, consectetur sagittis neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at suscipit urna.</div></Grad>
      <Grad><div className="tags">
        {work.tags?.map((tag: Tag) => <WorkTag key={tag.slug}>{tag.name}</WorkTag>)}
      </div></Grad>
    </div>
    <style jsx>{`
      .container
        position relative
        background-repeat no-repeat
        background-position-x 5px
        padding-top 23px
        padding-left 584px
        margin-bottom 100px
      .image
        position absolute
        top 0
        left 5px
        img
          object-fit cover
      .text
        position relative
        background-color white
        min-height 298px
        padding-top 60px
        padding-left 62px
        padding-right 80px
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size 12px
        font-weight 200
      .title
        display inline-block
        overflow hidden
        font-size 48px
        font-weight bold
        margin-top 25px
        letter-spacing 0.0001em
      .head
        display inline-block
        overflow hidden
        margin-top 19px
        font-size 24px
        font-weight bold
      .desc
        display inline-block
        overflow hidden
        margin-top 13px
        letter-spacing -0.01em
        line-height 2em
        font-size 16px
        height 96px
        overflow hidden
        text-overflow ellipsis
      .tags
        display inline-block
        overflow hidden
        margin-top 31px
    `}</style>
  </div>
)

const FeaturedWorks = ({ works }: { works: Entry[] }) => (
  <div className="container">
    <Grad><h1>Featured Works</h1></Grad>
    {works.map(work => <FeaturedWorkItem key={work.slug} work={work} />)}
    <div className="link">
      <Grad>
        <Link href="/work">
          <a>All Works</a>
        </Link>
      </Grad>
    </div>
    <style jsx>{`
      .container
        margin-top 89px
        margin-left -5px
      h1
        display inline-block
        font-size 70px
        margin 0
        margin-bottom 52px
      .link
        text-align right
        font-size 24px
        font-weight 700
        margin-top 75px
        a
          display inline-block
          padding-right 195px
          padding-left 3px
          padding-bottom 10px
          border-bottom 1px solid red
          font-weight bold
    `}</style>
  </div>
)

const NewsItem = ({ data }: { data: Entry }) => (
  <div className="container">
    <GradImg><img src={data.image} width="256" height="144" /></GradImg>
    <Grad><div className="date">{data.date}</div></Grad>
    <Grad><div className="title">{data.title}</div></Grad>
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
        font-weight 200
        margin-top 20px
      .title
        display inline-block
        overflow hidden
        font-size 18px
        font-weight bold
        margin-top 9px
        line-height 1.6em
    `}</style>
  </div>
)

const FeaturedNews = ({ news }: { news: Entry[] }) => (
  <div className="container">
    <Grad><h1>Featured News</h1></Grad>
    <div className="items">
      {news.map(item => <NewsItem key={item.slug} data={item} />)}
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
        font-size 24px
        font-weight 700
        margin-top 60px
        margin-right -80px
        a
          display inline-block
          padding-right 204px
          padding-left 3px
          padding-bottom 10px
          border-bottom 1px solid red
          font-weight bold
    `}</style>
  </div>
)

const IndexPage = ({ works, news }: { works: Entry[], news: Entry[] }) => (
  <Layout showHeader={false} footer={<FeaturedNews news={news} />}>
    <Showreel />
    <Crossborder />
    <FeaturedWorks works={works} />
  </Layout>
)

export default IndexPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const works = await getWorksByTag('featured', 3)
  const news = await getLatestNews()
  return { props: { works, news } }
}
