import { useState, useRef } from 'react'
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
import { getOptimized } from 'lib/image'

const Player = ({ onClick }: { onClick?: any }) => (
  <>
    <div className="player">
      <Grad className="player-bg" startImmediately />
      <div className="padding">
        <Grad className="aspect-ratio">
          <iframe src="https://www.youtube.com/embed/rsBTSWTbH4I?autoplay=1;controls=0;rel=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Grad>
      </div>
      <div className="close-button">
        <BlackButton className="button" backgroundColor="transparent" onClick={onClick} skipIn>
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
          width 80px
          height 80px
          :global(.button)
            width 80px
            height 80px
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
  const showreel = useRef<HTMLDivElement>(null)
  const videoContainer = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  let windowHeight = 0
  const mobile = isMobile()
  const onScroll = mobile
    ? () => {
      if (!videoContainer.current) return
      const height = Math.max(0, windowHeight - 35 - window.pageYOffset)
      videoContainer.current.style.setProperty('--video-height', `${height}px`)
    }
    : () => {
      if (!videoContainer.current) return
      videoContainer.current.style.setProperty('--video-height', `calc((100vh - 40px) - ${window.pageYOffset}px)`)
    }
  useLayoutEffect(() => {
    if (mobile) {
      windowHeight = window.innerHeight
      const height = windowHeight - 35
      if (showreel.current && video.current) {
        showreel.current.style.height = `${height}px`
        video.current.style.height = `${height}px`
      }
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

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
      <div ref={showreel} className="showreel">
        <div ref={videoContainer} className="video">
          <GradImg>
            <video ref={video} src="/index/reel-preview.mp4" autoPlay playsInline loop muted></video>
          </GradImg>
        </div>
        <div className="watch-reel">
          <Desktop><BlackButton className="button" onClick={onClickWatch}>Watch Reel</BlackButton></Desktop>
          <Mobile><BlackButton className="button" link="https://www.youtube.com/watch?v=rsBTSWTbH4I">Watch Reel</BlackButton></Mobile>
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
            height var(--video-height, calc(100vh - 40px))
            overflow hidden
          video
            width calc(100vw - 80px)
            height calc(100vh - 40px)
            object-fit cover
          .watch-reel
            position absolute
            width 256px
            height 80px
            right 0
            bottom -40px
            :global(.button)
              width 256px
              height 80px
        @media (--mobile)
          .showreel
            height fill
            padding-bottom 35px
            box-sizing border-box
            .video
              left 0
              height var(--video-height, 100vh)
              :global(>div)
                height 100%
            video
              width 100vw
              height fill
            .watch-reel
              width 187px
              height 70px
              bottom -35px
              :global(.button)
                width 187px
                height 70px
      `}</style>
    </>
  )
}

const Tagline = () => (
  <>
    <div className={langStyle('tagline')}>
      <Desktop>
        <div className="title-desktop">
          <Grad className="line1">Make whatever.</Grad>
          <Grad className="line2">Rules, whatever.</Grad>
        </div>
        <div className="desc">
          {t('top_whatever')?.split('\n').map((line, index) => <Grad key={index} className="line">{line}</Grad>)}
        </div>
      </Desktop>
      <Mobile>
        <div className="title-mobile">
          <Grad className="line1">Make</Grad>
          <Grad className="line2">whatever.</Grad>
          <Grad className="line1">Rules,</Grad>
          <Grad className="line2">whatever.</Grad>
        </div>
        <div className="desc">
          {t('top_whatever_sp')?.split('\n').map((line, index) => <Grad key={index} className="line">{line}</Grad>)}
        </div>
      </Mobile>
      <div className="link">
        <BlackButton link="/about" >Learn more</BlackButton>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .tagline
        position relative
        margin-top vwpx(211)
        img
          display block
      .title-desktop
        font-size 0
        margin-left vwpx(69)
        :global(.line1, .line2)
          font-size vwpx(143)
          font-weight 700
          margin 0
          margin-bottom vwpx(13)
        :global(.line2)
          margin-left vwpx(71)
      .desc
        position relative
        margin vwpx(85) vwpx(80) 0
        font-size 0
        :global(.line)
          font-size vwpx(26)
          font-weight 700
          line-height vwpx(60)
          margin 0
      .link
        display flex
        justify-content flex-end
        margin-top vwpx(81)
      .en
        .desc
          margin-top vwpx(83)
          margin-left vwpx(80)
        .link
          margin-top vwpx(81)
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .tagline
          margin-top vwpx(137)
          .title-mobile
            display block
            margin-left vwpx(-20)
            letter-spacing -0.02em
            :global(.line1, .line2)
              font-size vwpx(65.5)
              font-weight 700
              margin-left vwpx(-5)
              margin-bottom vwpx(4.5)
            :global(.line2)
              margin-left vwpx(28)
          .desc
            margin vwpx(37) vwpx(50) 0 0
            :global(.line)
              font-size vwpx(15)
              line-height vwpx(32)
          .link
            margin-top vwpx(50)
        .en.tagline
          .desc
            :global(.line)
              font-size vwpx(18)
          .link
            margin-top vwpx(58)
    `}</style>
  </>
)

const removeHtmlTags = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, "")

const FeaturedWorkItem = ({ work }: { work: Entry }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <div className={langStyle('featured-work-item')}>
        <Link href={`/work/${work.slug}`}>
          <a onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
            <div className="image"><GradImg mouseEntered={entered}><img src={getOptimized(work.hero_image!, 1200)} alt="" loading="lazy" /></GradImg></div>
            <div className="white">
              <div><Grad className="date" inline>{work.date}</Grad></div>
              <div><Grad className="title" inline><span dangerouslySetInnerHTML={{ __html: work.title }}></span></Grad></div>
            </div>
            <div><Grad className="subtitle" inline>{work.subtitle}</Grad></div>
            <div><Grad className="overview" inline><div className="inner">{removeHtmlTags(work.overview || '')}</div></Grad></div>
            <div><Grad className="tags" inline>
              <div>{work.tags?.filter(tag => tag.slug != 'featured').map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}</div>
            </Grad></div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .featured-work-item
          position relative
          font-size 0
          a
            display block
            border none
            padding 0
          .image img
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
              line-height 1.2
          :global(.subtitle)
            margin-top 1.8rem
            font-size var(--font-size-ja)
            font-weight 500
            line-height 1.4
          :global(.overview) .inner
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 2
            overflow hidden
            text-overflow ellipsis
            margin-top 0.7rem
            margin-right vwpx(30)
            font-size var(--font-size-ja)
            font-weight 300
            line-height 2.0
          :global(.tags)
            margin-top 2.0rem
        .en
          :global(.subtitle)
            margin-top 1.6rem
            font-size var(--font-size-en)
          :global(.overview) .inner
            font-size var(--font-size-en)
            font-weight 200
            line-height 1.8
            margin-top 0.7rem
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .featured-work-item
            margin-top vwpx(36)
            .image
              margin 0 vwpx(-30) 0 vwpx(-50)
              img
                width 100vw
                height calc(100vw / 16 * 9)
            .white
              background-color transparent
              padding 0
              margin 0
              :global(.date)
                font-size 1.0rem
                margin-top 2.5rem
              :global(.title)
                font-size 2.4rem
                margin-top 1.05rem
            :global(.subtitle)
              font-size 1.3rem
              margin-top 1.1rem
            :global(.overview)
              overflow hidden
            :global(.overview) .inner
              -webkit-line-clamp 4
              font-size 1.3rem
              line-height calc(52 / 26)
              max-height calc(1.2rem * (52 / 26) * 4)
              margin-top 1.55rem
            :global(.tags)
              margin-top 1.8rem
          .en.featured-work-item
            :global(.subtitle)
              font-size 1.4rem
              font-weight 500
              margin-top 0.4rem
            :global(.overview) .inner
              font-size 1.4rem
              font-weight 300
              line-height 1.75
              margin-top 1.45rem
            :global(.tags)
              margin-top 1.5rem
      `}</style>
    </>
  )
}

const FeaturedWorks = ({ works }: { works: Entry[] }) => (
  <>
    <div className="featured-works">
      <Grad className="featured-works-title" inline>Featured Works</Grad>
      <div className="items">
        {works.map(work => <FeaturedWorkItem key={work.slug} work={work} />)}
      </div>
      <div className="link">
        <BlackButton link="/work">All Works</BlackButton>
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
          margin vwpx(116) vwpx(30) 0 0
          :global(.featured-works-title)
            font-size vwpx_min(38)
          .items
            grid-template-columns 1fr
          .link
            margin-top 60px
            margin-right vwpx(-30)
    `}</style>
  </>
)

const NewsItem = ({ data }: { data: Entry }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <div className={langStyle('news-item')}>
        <Link href={`/news/${data.slug}`}>
          <a onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
            <GradImg mouseEntered={entered}><img src={getOptimized(data.hero_image!, 640)} width="256" height="144" alt="" loading="lazy" /></GradImg>
            <div><Grad className="date" inline>{data.date}</Grad></div>
            <div><Grad className="title" inline><span dangerouslySetInnerHTML={{ __html: data.title }}></span></Grad></div>
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
            font-weight 500
            line-height 1.6
            mix-blend-mode multiply
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .news-item
            img
              width vwpx(150)
              height 'calc(%s / 16 * 9)' % (vwpx(150))
            :global(.date)
              font-size 1.0rem
              margin-top 1.5rem
            :global(.title)
              font-size 1.3rem
              line-height calc(42 / 26)
              margin-top 0.6rem
          .en.news-item
            :global(.title)
              font-size 1.4rem
              line-height calc(42 / 28)
              margin-top 0.5rem
      `}</style>
    </>
  )
}

const LatestNews = ({ news }: { news: Entry[] }) => (
  <>
    <div className="latest-news">
      <h1><Grad className="latest-news-title" inline>Latest News</Grad></h1>
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
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .latest-news
          margin-top vwpx(75)
          padding vwpx(75) 0 vwpx(75) vwpx(50)
          :global(.latest-news-title)
            font-size vwpx(18)
        .items
          grid-template-columns repeat(2, 1fr)
          grid-gap vwpx(35) vwpx(25)
          margin-top vwpx(36)
        .link
          margin vwpx(56) 0 0 0
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const works = await getWorksByTag('featured', 4, locale)
  const news = await getNews(4, locale)
  return {
    props: { works, news },
    revalidate: 60 * 10,
  }
}
