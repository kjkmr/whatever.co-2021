import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Entry, Tag, getLatestNews, getWorksByTag } from 'lib/api'
import { t, LangStyle } from 'lib/i18n'
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

const Crossborder = () => (
  <div className={LangStyle('container')}>
    <div className="title">
      <Grad><h1>Crossborder</h1></Grad>
      <Grad><h1>Creative Studio</h1></Grad>
    </div>
    <div className="desc">
      <Grad><h2>{t('index.whateveris1')}</h2></Grad>
      {t('index.whateveris2') ? <Grad><h2 style={{ marginLeft: 'calc((100vw - 80px) * 0.14)' }}>{t('index.whateveris2')}</h2></Grad> : null}
    </div>
    <div className="link">
      <Link href="/about">
        <a>Learn more</a>
      </Link>
    </div>
    <style jsx>{`
      .container
        position relative
        margin-top calc((100vw - 80px) * 0.125)
        img
          display block
      .title
        font-size 0
        margin-left calc((100vw - 80px) * -0.005)
        h1
          display inline-block
          font-size calc((100vw - 80px) * 0.1353)
          font-weight bold
          line-height calc((100vw - 80px) * 0.1353)
          margin 0
          margin-bottom calc((100vw - 80px) * 0.013)
      .desc
        position relative
        margin-top calc((100vw - 80px) * 0.051)
        margin-left calc((100vw - 80px) * 0.063)
        font-size 0
        h2
          display inline-block
          font-size calc((100vw - 80px) * 0.028)
          font-weight bold
          line-height calc((100vw - 80px) * 0.032)
          margin 0
          margin-bottom calc((100vw - 80px) * 0.019)
      .link
        display flex
        justify-content flex-end
        margin-top calc((100vw - 80px) * 0.096)
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
      .en
        .desc
          margin-top calc((100vw - 80px) * 0.0505)
          margin-left calc((100vw - 80px) * 0.0615)
          h2
            font-size calc((100vw - 80px) * 0.0358)
    `}</style>
  </div>
)

const FeaturedWorkItem = ({ work }: { work: Entry }) => (
  <div className="container">
    <Link href={`/work/${work.slug}`}>
      <a>
        <div className="image"><GradImg><img src={work.image} /></GradImg></div>
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
      .container
        position relative
        background-repeat no-repeat
        padding-top calc((100vw - 80px) * 0.047)
        padding-left calc((100vw - 80px) * 0.477)
        margin-bottom calc((100vw - 80px) * 0.062)
      .image
        position absolute
        top 0
        left 0
        img
          width calc((100vw - 80px) * 0.523328149)
          height calc((100vw - 80px) * 0.294712286)
          object-fit cover
      .text
        position relative
        background-color white
        padding-top calc((100vw - 80px) * 0.039)
        padding-left calc((100vw - 80px) * 0.046)
        padding-right calc((100vw - 80px) * 0.0613)
        min-height calc((100vw - 80px) * (0.294712286 - 0.047 - 0.039))
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size 1.4rem
        font-weight 200
      .title
        display inline-block
        overflow hidden
        margin-top 1.9rem
        font-size calc((100vw - 80px) * 0.0373)
        font-weight bold
        line-height 1.2em
      .subtitle
        display inline-block
        overflow hidden
        margin-top 1.2rem
        font-size calc((100vw - 80px) * 0.0173)
        font-weight bold
        line-height 1.4em
      .overview
        display inline-block
        overflow hidden
        margin-top 1.5rem
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
      .container
        margin-top calc((100vw - 80px) * 0.065)
      h1
        display inline-block
        font-size calc((100vw - 80px) * 0.028)
        font-weight bold
        margin 0
        margin-left -0.3rem
        margin-bottom 7rem
      .link
        display flex
        justify-content flex-end
        margin-top calc((100vw - 80px) * 0.06)
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
