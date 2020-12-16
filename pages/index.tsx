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

const Crossborder = () => (
  <div className="container">
    <div className="title">
      <Grad><h1>Crossborder</h1></Grad>
      <Grad><h1>Creative Studio</h1></Grad>
    </div>
    <div className="desc">
      <Grad><h2>Whateverは様々な領域を越えて活動する</h2></Grad>
      <Grad><h2 style={{ marginLeft: 180 }}>クロスボーダー・クリエイティブ・スタジオです。</h2></Grad>
    </div>
    <div className="link">
      <Link href="/about">
        <a>Learn more</a>
      </Link>
    </div>
    <style jsx>{`
      .container
        position relative
        margin-top 159px
        img
          display block
      .title
        font-size 0
        margin-left -6px
        h1
          display inline-block
          font-size 174px
          font-weight bold
          line-height 174px
          margin 0
          margin-bottom 16px
      .desc
        position relative
        margin-top 67px
        margin-left 81px
        font-size 0
        h2
          display inline-block
          font-size 36px
          font-weight bold
          line-height 41px
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
        display flex
        justify-content flex-end
        margin-top 124px
        border-top 1px solid #D0D0D0
        a
          display flex
          justify-content center
          align-items center
          color white
          font-size 18px
          font-weight bold
          letter-spacing 0.04em
          width 256px
          height 60px
          background-color black
          margin-top -31px
    `}</style>
  </div>
)

const FeaturedWorkItem = ({ work }: { work: Entry }) => (
  <div className="container">
    <Link href={`/work/${work.slug}`}>
      <a>
        <div className="image"><GradImg><img src={work.image} width="673" height="379" /></GradImg></div>
        <div className="text">
          <Grad><div className="date">{work.date}</div></Grad>
          <Grad><div className="title">{work.title.substring(0, 5)}</div></Grad>
          <Grad><div className="head">Lorem ipsum dolor sit amet</div></Grad>
          <Grad><div className="desc">Morbi imperdiet placerat magna, et faucibus quam molestie eget. Nam faucibus nunc et dui aliquam scelerisque. In laoreet nisl sed tellus tincidunt, et scelerisque dolor fermentum. Duis enim nisi, vehicula in lorem eget, consectetur sagittis neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at suscipit urna.</div></Grad>
          <Grad><div className="tags">
            {work.tags?.map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}
          </div></Grad>
        </div>
      </a>
    </Link>
    <style jsx>{`
      .container
        position relative
        background-repeat no-repeat
        padding-top 60px
        padding-left 613px
        margin-bottom 50px
      .image
        position absolute
        top 0
        left 0
        img
          object-fit cover
      .text
        position relative
        background-color white
        min-height 298px
        padding-top 50px
        padding-left 60px
        padding-right 80px
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size 14px
        font-weight 200
      .title
        display inline-block
        overflow hidden
        font-size 48px
        font-weight bold
        line-height 1.2em
        margin-top 19px
      .head
        display inline-block
        overflow hidden
        margin-top 11px
        font-size 24px
        font-weight bold
        line-height 1.3em
      .desc
        display inline-block
        overflow hidden
        margin-top 15px
        line-height 1.7em
        font-size 18px
        font-weight light
        height 3em
        overflow hidden
        text-overflow ellipsis
      .tags
        display inline-block
        overflow hidden
        margin-top 37px
    `}</style>
  </div>
)

const FeaturedWorks = ({ works }: { works: Entry[] }) => (
  <div className="container">
    <Grad><h1>Featured Works</h1></Grad>
    {works.map(work => <FeaturedWorkItem key={work.slug} work={work} />)}
    <div className="link">
      <Link href="/work">
        <a>All Works</a>
      </Link>
    </div>
    <style jsx>{`
      .container
        opacity 0.5
        margin-top 84px
      h1
        display inline-block
        font-size 36px
        font-weight bold
        margin 0
        margin-left -3px
        margin-bottom 70px
      .link
        display flex
        justify-content flex-end
        margin-top 83px
        a
          display flex
          justify-content center
          align-items center
          color white
          font-size 18px
          font-weight bold
          letter-spacing 0.04em
          width 256px
          height 60px
          background-color black
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
        font-size 14px
        font-weight 200
        margin-top 20px
      .title
        display inline-block
        overflow hidden
        font-size 15px
        font-weight bold
        margin-top 9px
        line-height 2em
    `}</style>
  </div>
)

const LatestNews = ({ news }: { news: Entry[] }) => (
  <div className="container">
    <div className="center">
      <Grad><h1>Latest News</h1></Grad>
      <div className="items">
        {news.map(item => <NewsItem key={item.slug} data={item} />)}
      </div>
      <div className="link">
          <Link href="/news">
            <a>All News</a>
          </Link>
      </div>
    </div>

    <style jsx>{`
      .container
        opacity 0.5
        margin-top 80px
        padding 80px 80px 130px
        background-color #F4F4F4
        height 415px
      .center
        max-width 1366px
        margin auto
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
        display flex
        justify-content flex-end
        margin-top 69px
        margin-right -80px
        a
          display flex
          justify-content center
          align-items center
          color white
          font-size 18px
          font-weight bold
          letter-spacing 0.04em
          width 256px
          height 60px
          background-color black
    `}</style>
  </div>
)

const IndexPage = ({ works, news }: { works: Entry[], news: Entry[] }) => (
  <Layout showHeader={false} footer={<LatestNews news={news} />}>
    <Showreel />
    <Crossborder />
    <FeaturedWorks works={works} />
  </Layout>
)

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const works = await getWorksByTag('featured', 4)
  const news = await getLatestNews()
  return { props: { works, news } }
}
