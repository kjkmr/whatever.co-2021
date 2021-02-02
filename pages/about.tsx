import { GetStaticProps } from 'next'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'
import BlackButton from 'components/BlackButton'
import React from 'react'
import { Desktop, Mobile } from 'components/Responsive'

const Detail = ({ title }: { title: string }) => {
  const key = title.toLowerCase()
  const subtitle = t(`about_${key}_title`)
  return (
    <>
      <div className={langStyle('detail')}>
        <div><Grad className="whatever" inline>Whatever</Grad></div>
        <div><Grad className="title" inline>{title}</Grad></div>
        {subtitle != '-' ? <div><Grad className="subtitle" inline>{subtitle}</Grad></div> : null}
        <div><Grad className="desc" inline><div dangerouslySetInnerHTML={{ __html: t(`about_${key}_description`)?.replace('\n', '<br />') || '' }}></div></Grad></div>
        <div className="more"><BlackButton link={`/about/${key}`} >Learn more</BlackButton></div>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .detail
          font-size 0
          :global(.whatever)
            font-size 3.6rem
            font-weight 700
            margin 0
          :global(.title)
            font-size vwpx_min(102)
            font-weight 700
            margin vwpx_min(14) 0 vwpx_min(16) vwpx_min(-3)
          :global(.subtitle)
            font-size vwpx_min(24)
            font-weight 700
            margin vwpx_min(7) 0 0 0
          :global(.desc)
            margin vwpx_min(21) 0 0 0.3rem
            font-size var(--font-size-ja)
            line-height 2.0
        .more
          display inline-block
          margin-top 4.9rem
        .en
          :global(.desc)
            font-size var(--font-size-en)
            font-weight 200
            line-height 1.8
            margin vwpx_min(5) 0 0 0
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .detail
            :global(.whatever)
              font-size vwpx(18)
            :global(.title)
              font-size vwpx(51)
              margin vwpx(8) 0 0 vwpx(-2)
            :global(.subtitle)
              font-size vwpx(17)
              margin-top vwpx(10)
            :global(.desc)
              margin vwpx(16) 0 0 0
              line-height 2.1
          .more
            display flex
            justify-content flex-end
            margin 3.1rem vwpx(-30) 0 0
      `}</style>
    </>
  )
}

const Genres = () => (
  <>
    <div className={langStyle('genres')}>
      <div className="inner">
        <div className="image"><GradImg lighten={true}><img src="/about/pict01.svg" /></GradImg></div>
        <div className="detail"><Detail title="Genres" /></div>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .genres
        width 100%
        margin-bottom vwpx(80)
      .inner
        display flex
        justify-content space-between
        align-items center
        margin 0 vwpx(80) 0 vwpx(40)
      .image img
        width vwpx(603)
        background-color white
      .detail
        margin-left vwpx(80)
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .genres
          margin vwpx(60) 0 0 0
        .inner
          flex-direction column
          margin 0 vwpx(50) 0 0
        .image
          img
            width 100%
        .detail
          margin vwpx(30) vwpx(-20) 0 0
    `}</style>
  </>
)

const Workstyle = () => (
  <>
    <div className={langStyle('workstyle')}>
      <div className="inner">
        <div className="detail"><Detail title="Workstyle" /></div>
        <div className="image"><GradImg lighten={true}><img src="/about/pict02.svg" /></GradImg></div>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .workstyle
        width 100%
        margin-bottom vwpx(110)
      .inner
        display flex
        justify-content space-between
        align-items center
        margin-left vwpx(43)
        margin-right vwpx(80)
      .detail
        margin-right vwpx(80)
      .image img
        width vwpx(603)
        background-color white
      .en
        .detail
          padding-bottom vwpx(2)
        p
          margin-top vwpx(8)
          font-size 1.6rem
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .workstyle
          margin 9.0rem 0 0 0
        .inner
          flex-direction column-reverse
          margin 0 vwpx(50) 0 0
        .image
          img
            width 100%
        .detail
          margin vwpx(28) vwpx(-20) 0 0
    `}</style>
  </>
)

const Location = () => (
  <>
    <div className={langStyle('location')}>
      <div className="inner">
        <div className="image"><GradImg lighten={true}><img src="/about/pict03.svg" /></GradImg></div>
        <div className="detail"><Detail title="Location" /></div>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .location
        width 100%
        margin-bottom vwpx(170)
      .inner
        display flex
        justify-content space-between
        align-items center
        margin-left vwpx(40)
        margin-right vwpx(80)
      .image img
        width vwpx(563)
        background-color white
      .detail
        font-size 0
        margin-left vwpx(120)
      .en
        .detail
          padding-bottom vwpx(2)
        p
          margin-top vwpx(4)
          font-size 1.6rem
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .location
          margin 9.0rem 0 7.5rem 0
        .inner
          flex-direction column
          margin 0 vwpx(50) 0 0
        .image
          margin 0 vwpx(15)
          img
            width 100%
        .detail
          margin vwpx(30) vwpx(-20) 0 0
    `}</style>
  </>
)

const AboutPage = () => (
  <>
    <Layout title="About" side="About">
      <div className={langStyle('about')}>
        <Desktop>
          <div>
            <Grad className="whats" inline>What’s Whatever<span className="q">?</span></Grad>
          </div>
        </Desktop>
        <Mobile>
          <div className="whats-mobile">
            <Grad className="whats">What’s</Grad>
            <Grad className="whatever">Whatever<span className="q">?</span></Grad>
          </div>
        </Mobile>
        <div className="text">
          {t('about_statement')?.split('\n').map((line, i) => (
            <div key={i}><Grad className="p" inline>{line}</Grad></div>
          ))}
        </div>
      </div>
      <Genres />
      <Workstyle />
      <Location />
    </Layout>
    <style jsx>{`
      @import 'lib/vw.styl'
      .about
        margin vwpx(94) 0 vwpx(170) 0
        font-size 0
      :global(.whats)
        font-size vwpx(129)
        font-weight 700
        margin 0 0 0 vwpx(81)
        .q
          font-family 'Noto Sans JP'
      .text
        margin vwpx(43) 0 0 vwpx(118)
        :global(.p)
          margin 0
          padding 0
          margin-top vwpx(23)
          font-size vwpx(26)
          font-weight bold
          line-height calc(37 / 26)
      .en
        .text
          :global(.p)
            font-size vwpx(30)
            margin-top vwpx(20)
            line-height calc(41 / 30)
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .about
          margin vwpx(90) vwpx(30) 0 0
        .whats-mobile
          font-size vwpx(57)
          font-weight 700
          :global(.whats)
            margin 0
            mix-blend-mode darken
          :global(.whatever)
            margin-top vwpx(-16)
            mix-blend-mode darken
            .q
              font-family 'Noto Sans JP'
        .text
          margin 0
          margin-top vwpx(28)
          :global(.p)
            margin 0
            font-size vwpx(15)
            line-height 2.0
    `}</style>
  </>
)

export default AboutPage

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
