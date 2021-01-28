import React, { useState, useRef } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Entry, Tag, getNews, getWorksByTag } from 'lib/api'
import { useLayoutEffect } from 'lib/useLayoutEffect'
import { t, langStyle } from 'lib/i18n'
import { isMobile } from 'lib/isMobile'
import Layout from 'components/Layout'
import BlackButton from 'components/BlackButton'
import WorkTag from 'components/WorkTag'
import { Grad, GradImg } from 'components/Grad'
import { Desktop, Mobile } from 'components/Responsive'

const Player = ({ onClick }: { onClick?: any }) => (
  <>
    <div className="player">
      <Grad className="player-bg" inline={false} startImmediately />
      <div className="padding">
        <Grad className="aspect-ratio" inline={false}>
          <iframe src="https://www.youtube.com/embed/rsBTSWTbH4I?autoplay=1;controls=0;rel=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Grad>
      </div>
      <div className="close-button">
        <BlackButton width="80px" height="80px" backgroundColor="transparent" onClick={onClick} skipIn>
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
        z-index 20000
        :global(.player-bg)
          position absolute
          top 0
          height 0
          width 100%
          height 100%
          background-color #222222
        .padding
          display flex
          justify-content center
          align-items center
          position relative
          padding 80px
          box-sizing border-box
          width 100vw
          height 100vh
        :global(.aspect-ratio)
          width 'min(100%, calc((100vh - 160px) / 9 * 16))' % null
          height 'min(100%, calc((100vw - 160px) / 16 * 9))' % null
          background-color black
          iframe
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
  const [videoHeight, setVideoHeight] = useState('')
  const videoMarginBottom = isMobile() ? 35 : 40
  const onScroll = () => setVideoHeight(`calc((100vh - ${videoMarginBottom}px) - ${window.pageYOffset}px)`)
  useLayoutEffect(() => {
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
        <div className="video" style={{ height: videoHeight }}>
          <GradImg>
            <video ref={video} src="/index/reel-preview.mp4" autoPlay={true} loop muted></video>
          </GradImg>
        </div>
        <div className="button">
          <Desktop><BlackButton height="80px" onClick={onClickWatch} >Watch Reel</BlackButton></Desktop>
          <Mobile><BlackButton width="187px" height="70px" onClick={onClickWatch} >Watch Reel</BlackButton></Mobile>
        </div>
      </div>
      {showPlayer ? <Player onClick={onClose} /> : null}
      <style jsx>{`
        .showreel
          position relative
          width 100%
          height calc(100vh - 40px)
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
        @media (--mobile)
          .showreel
            height calc(100vh - 35px)
          .video
            left: 0
          video
            width: 100vw
            height calc(100vh - 35px)
          .button
            width: 187px
            bottom -35px
      `}</style>
    </>
  )
}

const Tagline = () => (
  <>
    <div className={langStyle('tagline')}>
      {isMobile()
        ? <div className="title">
          <Grad className="line1" inline={false}>Make</Grad>
          <Grad className="line2" inline={false}>whatever.</Grad>
          <Grad className="line1" inline={false}>Rules,</Grad>
          <Grad className="line2" inline={false}>whatever.</Grad>
        </div>
        : <div className="title">
          <Grad className="line1" inline={false}>Make whatever.</Grad>
          <Grad className="line2" inline={false}>Rules, whatever.</Grad>
        </div>}
      <div className="desc">
        {t('top_whatever')?.split('\n').map((line, index) => <Grad key={index} className="line">{line}</Grad>)}
      </div>
      <div className="link">
        {isMobile()
          ? <BlackButton link="/about" width="187px" height="50px" >Learn more</BlackButton>
          : <BlackButton link="/about" >Learn more</BlackButton>}
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .tagline
        position relative
        margin-top vwpx(211)
        img
          display block
      .title
        font-size 0
        margin-left vwpx(69)
        :global(.line1, .line2)
          font-size vwpx(143)
          font-weight bold
          margin 0
          margin-bottom vwpx(13)
        :global(.line2)
          margin-left vwpx(71)
      .desc
        position relative
        margin vwpx(72) vwpx(80) 0
        font-size 0
        :global(.line)
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
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .tagline
          margin-top vwpx(137)
          .title
            :global(.line1,.line2)
              font-size vwpx(65.5)
              margin-left vwpx(9)
              margin-bottom vwpx(4.5)
            :global(.line2)
              margin-left vwpx(41)
          .desc
            margin vwpx(37) vwpx(50) 0
            :global(.line)
              font-size vwpx(15)
              line-height vwpx(32)
          .link
            margin-top vwpx(50)
    `}</style>
  </>
)

const FeaturedWorkItem = ({ work }: { work: Entry }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <div className={langStyle('fetured-work-item')}>
        <Link href={`/work/${work.slug}`}>
          <a onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
            <div className="image"><GradImg mouseEntered={entered}><img src={work.hero_image} /></GradImg></div>
            <div className="white">
              <div><Grad className="date">{work.date}</Grad></div>
              <div><Grad className="title">{work.title}</Grad></div>
            </div>
            <div><Grad className="subtitle">{work.subtitle}</Grad></div>
            <div><Grad className="overview">{work.overview}</Grad></div>
            <div><Grad className="tags">
              <div>{work.tags?.filter(tag => tag.slug != 'featured').map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}</div>
            </Grad></div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .fetured-work-item
          position relative
          font-size 0
          a
            display block
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
            :global(.date)
              font-size 1.2rem
              font-weight 300
            :global(.title)
              margin-top 2.0rem
              font-size 2.8rem
              font-weight 700
              line-height 1.2em
          :global(.subtitle)
            margin-top 1.8rem
            font-size var(--font-size-ja)
            font-weight 700
            line-height 1.4em
          :global(.overview)
            margin-top 0.7rem
            margin-right vwpx(30)
            font-size var(--font-size-ja)
            font-weight 300
            line-height 2em
          :global(.tags)
            margin-top 2.0rem
        .en
          :global(.overview)
            font-weight 400
      `}</style>
    </>
  )
}

const FeaturedWorks = ({ works }: { works: Entry[] }) => (
  <>
    <div className="featured-works">
      <Grad className="featured-works-title" inline={false}>Featured Works</Grad>
      <div className="items">
        {works.map(work => <FeaturedWorkItem key={work.slug} work={work} />)}
      </div>
      <div className="link">
        <BlackButton link="/work" >All Works</BlackButton>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .featured-works
        margin-top vwpx(92)
        font-size 0
        :global(.featured-works-title)
          margin-left vwpx(-3)
          font-size vwpx_min(36)
          font-weight 700
        .items
          display grid
          grid-template-columns repeat(2, 1fr)
          grid-gap vwpx(100) vwpx(98)
          margin-top vwpx(73)
        .link
          display flex
          justify-content flex-end
          margin-top 80px
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .featured-works
          margin vwpx(117) vwpx(50) 0
          :global(.featured-works-title)
            font-size vwpx_min(38)
          .items
            grid-template-columns 1fr
    `}</style>
  </>
)

const NewsItem = ({ data }: { data: Entry }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <div className="news-item">
        <Link href={`/news/${data.slug}`}>
          <a onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
            <GradImg mouseEntered={entered}><img src={data.hero_image} width="256" height="144" /></GradImg>
            <div><Grad className="date">{data.date}</Grad></div>
            <div><Grad className="title">{data.title}</Grad></div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .news-item
          font-size 0
          a
            display block
            padding 0
            border none
          img
            width vwpx0(256)
            height vwpx0(144)
            object-fit cover
          :global(.date)
            font-size 1.2rem
            font-weight 300
            margin-top 2.3rem
            mix-blend-mode multiply
          :global(.title)
            margin-top 1.1rem
            font-size var(--font-size-ja)
            font-weight bold
            line-height 2.4rem
            mix-blend-mode multiply
      `}</style>
    </>
  )
}

const LatestNews = ({ news }: { news: Entry[] }) => (
  <>
    <div className="latest-news">
      <h1><Grad className="latest-news-title">Latest News</Grad></h1>
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
        padding vwpx0(80)
        font-size 0
        background-color #f4f4f4
        h1
          font-size 0
        :global(.latest-news-title)
          margin-left vwpx0_min(-3)
          font-size vwpx0_min(36)
          mix-blend-mode multiply
      .items
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap vwpx0(60)
        margin-top vwpx0(52)
      .link
        display flex
        justify-content flex-end
        margin-top 78px
        margin-right vwpx0(-80)
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
