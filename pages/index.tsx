import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Entry, Tag, getNews, getWorksByTag } from 'lib/api'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import WorkTag from 'components/WorkTag'
import { Grad, GradImg } from 'components/Grad'

const Showreel = () => {
  const [scrollY, setScrollY] = useState(0)
  const onScroll = () => setScrollY(window.pageYOffset)
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  })
  return (
    <div className="showreel">
      <div className="video" style={{ height: `calc((100vh - 40px) - ${scrollY}px)` }}>
        <video src="/index/reel-preview.mp4" autoPlay={true} loop></video>
      </div>
      <button >Watch Reel</button>
      <style jsx>{`
        .showreel
          position relative
          width 100%
          height calc(100vh - 40px)
          background-color black
          font-size 0
        .video
          position fixed
          top 0
          left 80px
          overflow hidden
        video
          width calc(100vw - 80px)
          height calc(100vh - 40px)
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
          font-size 1.8rem
          font-weight bold
          letter-spacing 0.04em
      `}</style>
    </div>
  )
}

const Tagline = () => (
  <div className={langStyle('tagline')}>
    <div className="title">
      <Grad><h1>Make whatever.</h1></Grad>
      <Grad><h1 className="line2">Rules, whatever.</h1></Grad>
    </div>
    <div className="desc">
      {t('top_whatever')?.split('\n').map(line => <Grad><h2>{line}</h2></Grad>)}
    </div>
    <div className="link">
      <Link href="/about">
        <a>Learn more</a>
      </Link>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .tagline
        position relative
        margin-top vwpx(160)
        img
          display block
      .title
        font-size 0
        margin-left vwpx(-11)
        h1
          display inline-block
          font-size vwpx(154)
          font-weight bold
          margin 0
          margin-bottom vwpx(14)
          &.line2
            margin-left vwpx(77)
      .desc
        position relative
        margin-top vwpx(69)
        margin-left vwpx(80)
        font-size 0
        h2
          display inline-block
          font-size vwpx(26)
          font-weight bold
          line-height vwpx(60)
          margin 0
      .link
        display flex
        justify-content flex-end
        margin-top vwpx(151)
        border-top 1px solid #D0D0D0
        a
          display flex
          justify-content center
          align-items center
          color white
          font-size 1.8rem
          font-weight bold
          letter-spacing 0.04em
          width 256px
          height 60px
          background-color black
          margin-top -31px
          border none
      .en
        .desc
          margin-top vwpx(66)
          margin-left vwpx(80)
          h2
            font-size vwpx(26)
        .link
          margin-top vwpx(154)
    `}</style>
  </div>
)

const FeaturedWorkItem = ({ work }: { work: Entry }) => (
  <div className="work">
    <Link href={`/work/${work.slug}`}>
      <a>
        <div className="image"><GradImg><img src={work.hero_image} /></GradImg></div>
        <div className="text">
          <Grad><div className="date">{work.date}</div></Grad>
          <Grad><div className="title">{work.title}</div></Grad>
          <Grad><div className="subtitle">{work.subtitle}</div></Grad>
          <Grad><div className="overview">{work.overview}</div></Grad>
          <Grad><div className="tags">
            {work.tags?.map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}
          </div></Grad>
        </div>
      </a>
    </Link>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .work
        position relative
        background-repeat no-repeat
        padding-top vwpx(61)
        padding-left vwpx(613)
        margin-bottom vwpx(80)
      .image
        position absolute
        top 0
        left 0
        img
          width vwpx(673)
          height vwpx(379)
          object-fit cover
      .text
        position relative
        background-color white
        padding-top vwpx(50)
        padding-left vwpx(59)
        padding-right vwpx(79)
        min-height vwpx(268)
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size 1.4rem
        font-weight 200
      .title
        display inline-block
        overflow hidden
        margin-top vwpx(19)
        font-size vwpx(48)
        font-weight bold
        line-height 1.2em
      .subtitle
        display inline-block
        overflow hidden
        margin-top vwpx(12)
        font-size vwpx(22)
        font-weight bold
        line-height 1.4em
      .overview
        display inline-block
        overflow hidden
        margin-top vwpx(16)
        line-height 2em
        font-size 1.5rem
        font-weight light
      .tags
        display inline-block
        overflow hidden
        margin-top 3rem
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
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .container
        margin-top vwpx(107)
      h1
        display inline-block
        font-size vwpx(36)
        font-weight bold
        margin 0
        margin-left vwpx(-3)
        margin-bottom vwpx(72)
      .link
        display flex
        justify-content flex-end
        a
          display flex
          justify-content center
          align-items center
          color white
          font-size 1.8rem
          font-weight bold
          letter-spacing 0.04em
          width 256px
          height 60px
          background-color black
          border none
          padding 0
    `}</style>
  </div>
)

const NewsItem = ({ data }: { data: Entry }) => (
  <div className="container">
    <GradImg><img src={data.hero_image} width="256" height="144" /></GradImg>
    <Grad><div className="date">{data.date}</div></Grad>
    <Grad><div className="title">{data.title}</div></Grad>
    <style jsx>{`
      .container
        width 18.740849195vw
        margin-right 4.39238653vw
        font-size 0
      img
        width 18.740849195vw
        height 10.541727672vw
        object-fit cover
        display block
      .date
        display inline-block
        overflow hidden
        font-size 1.4rem
        font-weight 200
        margin-top 1.45em
      .title
        display inline-block
        overflow hidden
        font-size 1.5rem
        font-weight bold
        margin-top 0.6em
        line-height 2em
    `}</style>
  </div>
)

const LatestNews = ({ news }: { news: Entry[] }) => (
  <div className="container">
    <Grad><h1>Latest News</h1></Grad>
    <div className="items">
      {news.map(item => <NewsItem key={item.slug} data={item} />)}
    </div>
    <div className="link">
      <Link href="/news">
        <a>All News</a>
      </Link>
    </div>

    <style jsx>{`
      .container
        margin-top 5.85vw
        padding 5.85vw
        background-color #F4F4F4
      h1
        display inline-block
        overflow hidden
        font-size 2.56vw
        letter-spacing 0.012em
        margin 0
        margin-left -0.18vw
      .items
        display flex
        margin-top 3.65vw
      .link
        display flex
        justify-content flex-end
        margin-top 5.05vw
        margin-right -5.85vw
        a
          display flex
          justify-content center
          align-items center
          color white
          font-size 1.8rem
          font-weight bold
          letter-spacing 0.04em
          width 256px
          height 60px
          background-color black
          border none
    `}</style>
  </div>
)

const IndexPage = ({ works, news }: { works: Entry[], news: Entry[] }) => (
  <Layout showHeader={false} footer={<LatestNews news={news} />}>
    <Showreel />
    <Tagline />
    <FeaturedWorks works={works} />
  </Layout>
)

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const works = await getWorksByTag('featured', 4)
  const news = await getNews(4)
  return { props: { works, news } }
}
