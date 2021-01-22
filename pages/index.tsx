import React, { useEffect, useState, useRef } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Entry, Tag, getNews, getWorksByTag } from 'lib/api'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import BlackButton from 'components/BlackButton'
import WorkTag from 'components/WorkTag'
import { Grad, GradImg } from 'components/Grad'

const Player = ({ onClick }: { onClick?: any }) => (
  <>
    <div className="player">
      <div className="aspect-ratio">
        <iframe src="https://www.youtube.com/embed/rsBTSWTbH4I?autoplay=1;controls=0;rel=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
      <div className="close-button">
        <BlackButton width="80px" height="80px" backgroundColor="transparent" onClick={onClick}>
          <div className="l1"></div>
          <div className="l2"></div>
        </BlackButton>
      </div>
    </div>
    <style jsx>{`
      .player
        position fixed
        top 0
        left 0
        box-sizing border-box
        width 100vw
        height 100vh
        padding 80px
        background-color #222222
        z-index 20000
        display flex
        justify-content center
        align-items center
        .aspect-ratio
          position relative
          width 'min(100%, calc((100vh - 160px) / 9 * 16))' % null
          height 'min(100%, calc((100vw - 160px) / 16 * 9))' % null
          iframe
            position absolute
            top 0
            left 0
            width 100%
            height 100%
        .close-button
          position absolute
          top 0
          left 0
          .l1,.l2
            position absolute
            width 20px
            height 2px
            background-color white
          .l1
            top 39px
            left 30px
            transform rotate(45deg)
          .l2
            top 39px
            left 30px
            transform rotate(-45deg)
    `}</style>
  </>
)

const Showreel = () => {
  const [scrollY, setScrollY] = useState(0)
  const onScroll = () => setScrollY(window.pageYOffset)
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  })
  const video = useRef<HTMLVideoElement>(null)
  const [showPlayer, setShowPlayer] = useState(false)
  const onClickWatch = () => {
    setShowPlayer(true)
    video.current?.pause()
  }
  const onClose = () => {
    video.current?.play()
    setShowPlayer(false)
  }
  return (
    <>
      <div className="showreel">
        <div className="video" style={{ height: `calc((100vh - 40px) - ${scrollY}px)` }}>
          <video ref={video} src="/index/reel-preview.mp4" autoPlay={true} loop muted></video>
        </div>
        <div className="button">
          <BlackButton height="80px" onClick={onClickWatch} >Watch Reel</BlackButton>
        </div>
      </div>
      {showPlayer ? <Player onClick={onClose} /> : null}
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
        .button
          position absolute
          right 0
          bottom -40px
      `}</style>
    </>
  )
}

const Tagline = () => (
  <>
    <div className={langStyle('tagline')}>
      <div className="title">
        <Grad><h1>Make whatever.</h1></Grad>
        <Grad><h1 className="line2">Rules, whatever.</h1></Grad>
      </div>
      <div className="desc">
        {t('top_whatever')?.split('\n').map((line, index) => <Grad key={index}><h2>{line}</h2></Grad>)}
      </div>
      <div className="link">
        <BlackButton link="/about" >Learn more</BlackButton>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .tagline
        position relative
        margin-top vwpx(198)
        img
          display block
      .title
        font-size 0
        margin-left vwpx(69)
        h1
          display inline-block
          font-size vwpx(143)
          font-weight bold
          margin 0
          margin-bottom vwpx(13)
          &.line2
            margin-left vwpx(71)
      .desc
        position relative
        margin-top vwpx(72)
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
        margin-top vwpx(81)
      .en
        .desc
          margin-top vwpx(66)
          margin-left vwpx(80)
          h2
            font-size vwpx(26)
        .link
          margin-top vwpx(154)
    `}</style>
  </>
)

const FeaturedWorkItem = ({ work }: { work: Entry }) => (
  <>
    <div className="work">
      <Link href={`/work/${work.slug}`}>
        <a>
          <div className="image"><GradImg><img src={work.hero_image} /></GradImg></div>
          <div className="white">
            <Grad><div className="date">{work.date}</div></Grad>
            <Grad><div className="title">{work.title}</div></Grad>
          </div>
          <Grad><div className="subtitle">{work.subtitle}</div></Grad>
          <Grad><div className="overview">{work.overview}</div></Grad>
          <Grad><div className="tags">
            {work.tags?.map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}
          </div></Grad>
        </a>
      </Link>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .work
        position relative
        a
          border none
          padding 0
      .image
        img
          width vwpx(594)
          height vwpx(334)
          object-fit cover
      .white
        position relative
        display inline-block
        background-color white
        margin-top -40px
        margin-right 40px
        padding-top 40px
        padding-right 50px
      .date
        display inline-block
        overflow hidden
        font-size 1.2rem
        font-weight 300
      .title
        display inline-block
        overflow hidden
        margin-top 1.7rem
        font-size 2.8rem
        font-weight bold
        line-height 1.2em
      .subtitle
        display inline-block
        overflow hidden
        margin-top 2.1rem
        font-size 1.5rem
        font-weight bold
        line-height 1.4em
      .overview
        display inline-block
        overflow hidden
        margin-top 0.7rem
        margin-right vwpx(30)
        line-height 2em
        font-size 1.5rem
        font-weight 300
      .tags
        display inline-block
        overflow hidden
        margin-top 2.0rem
    `}</style>
  </>
)

const FeaturedWorks = ({ works }: { works: Entry[] }) => (
  <>
    <div className="container">
      <Grad><h1>Featured Works</h1></Grad>
      <div className="items">
        {works.map(work => <FeaturedWorkItem key={work.slug} work={work} />)}
      </div>
      <div className="link">
        <BlackButton link="/work" >All Works</BlackButton>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .container
        margin-top vwpx(92)
        font-size 0
      h1
        display inline-block
        margin-left vwpx(-3)
        margin-bottom vwpx(73)
      .items
        display grid
        grid-template-columns repeat(2, 1fr)
        grid-gap vwpx(98)
      .link
        display flex
        justify-content flex-end
        margin-top 80px
    `}</style>
  </>
)

const NewsItem = ({ data }: { data: Entry }) => (
  <>
    <div className="news-item">
      <Link href={`/news/${data.slug}`}>
        <a>
          <GradImg><img src={data.hero_image} width="256" height="144" /></GradImg>
          <Grad><div className="date">{data.date}</div></Grad>
          <Grad><div className="title">{data.title}</div></Grad>
        </a>
      </Link>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .news-item
        font-size 0
      img
        width vwpx2(256, 160)
        height vwpx2(144, 160)
        object-fit cover
        display block
      .date
        display inline-block
        overflow hidden
        font-size 1.2rem
        font-weight 300
        margin-top 2.3rem
      .title
        display inline-block
        overflow hidden
        font-size 1.5rem
        font-weight bold
        margin-top 1.1rem
        line-height 2.4rem
    `}</style>
  </>
)

const LatestNews = ({ news }: { news: Entry[] }) => (
  <>
    <div className="latest-news">
      <Grad><h1>Latest News</h1></Grad>
      <div className="items">
        {news.map(item => <NewsItem key={item.slug} data={item} />)}
      </div>
      <div className="link">
        <BlackButton link="/news" >All News</BlackButton>
      </div>
    </div >
    <style jsx>{`
      @import 'lib/vw.styl'
      .latest-news
        margin-top vwpx(80)
        padding vwpx2(80, 160) 80px
        font-size 0
        background-color #F4F4F4
      h1
        display inline-block
        overflow hidden
        margin-left vwpx_min(-3)
      .items
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap vwpx2(60, 160)
        margin-top vwpx(52)
      .link
        display flex
        justify-content flex-end
        margin-top 78px
        margin-right -80px
    `}</style>
  </>
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
