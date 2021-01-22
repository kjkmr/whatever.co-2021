import { GetStaticProps } from 'next'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'
import BlackButton from 'components/BlackButton'
import React from 'react'

const Detail = ({ title }: { title: string }) => {
  const key = title.toLowerCase()
  const subtitle = t(`about_${key}_title`)
  return (
    <>
      <div className={langStyle('detail')}>
        <Grad><h3>Whatever</h3></Grad>
        <Grad><h1>{title}</h1></Grad>
        {subtitle != '-' ? <Grad><h2>{subtitle}</h2></Grad> : null}
        <Grad><p dangerouslySetInnerHTML={{ __html: t(`about_${key}_description`)?.replace('\n', '<br />') || '' }}></p></Grad>
        <div className="more"><BlackButton link={`/about/${key}`} >Learn more</BlackButton></div>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .detail
          font-size 0
        h3
          display inline-block
          overflow hidden
          font-size 3.6rem
          margin 0
        h1
          display inline-block
          overflow hidden
          font-size vwpx_min(102)
          margin 0
          margin-top vwpx_min(14)
          margin-bottom vwpx_min(16)
          margin-left vwpx_min(-3)
        h2
          display inline-block
          overflow hidden
          font-size vwpx_min(24)
          margin 0
          margin-top vwpx_min(7)
        p
          margin 0
          margin-top vwpx_min(21)
          font-size 1.5rem
          line-height 3.0rem
        .more
          display inline-block
          margin-top 4.8rem
        .en
          h1
            margin-bottom vwpx(6)
          p
            font-size 1.6rem
      `}</style>
    </>
  )
}

const Genres = () => (
  <>
    <div className={langStyle('genres')}>
      <div className="inner">
        <div className="image"><GradImg><img src="/about/pict01.svg" /></GradImg></div>
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
        margin-left vwpx(40)
        margin-right vwpx(80)
      .image img
        width vwpx(603)
      .detail
        margin-left vwpx(80)
      .en
        .detail
          padding-top vwpx(4)
    `}</style>
  </>
)

const Workstyle = () => (
  <>
    <div className={langStyle('workstyle')}>
      <div className="inner">
        <div className="detail"><Detail title="Workstyle" /></div>
        <div className="image"><GradImg><img src="/about/pict02.svg" /></GradImg></div>
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
      .en
        .detail
          padding-bottom vwpx(2)
        p
          margin-top vwpx(8)
          font-size 1.6rem
    `}</style>
  </>
)

const Location = () => (
  <>
    <div className={langStyle('location')}>
      <div className="inner">
        <div className="image"><GradImg><img src="/about/pict03.svg" /></GradImg></div>
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
      .detail
        font-size 0
        margin-left vwpx(120)
      .en
        .detail
          padding-bottom vwpx(2)
        p
          margin-top vwpx(4)
          font-size 1.6rem
    `}</style>
  </>
)

const AboutPage = () => (
  <>
    <Layout title="About" side="About">
      <div className={langStyle('about')}>
        <div className="head">
          <Grad><h1>What’s Whatever<span className="q">?</span></h1></Grad>
        </div>
        <div className="text">
          {t('about_statement')?.split('\n\n').map((p, i) => (
            <div key={i} className="p">
              {p.split('\n').map((line, index) => (
                <Grad key={index}><span>{line}</span></Grad>
              ))}
            </div>
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
        margin-top vwpx(94)
        margin-bottom vwpx(150)
      .head
        margin-bottom vwpx(66)
        margin-left vwpx(81)
        font-size 0
        h1
          margin 0
          display inline-block
          font-size vwpx(129)
          overflow hidden
          .q
            font-family 'Noto Sans JP'
      .text
        margin-left vwpx(118)
        font-size vwpx(26)
        font-weight bold
        line-height vwpx(36)
        >div.p
          margin 0
          margin-bottom vwpx(42)
        span
          display inline-block
          overflow hidden
          margin-bottom vwpx(13)
      .en
        &.about
          margin-bottom vwpx(131)
        .head
          margin-bottom vwpx(54)
        .text
          font-size vwpx(30)
    `}</style>
  </>
)

export default AboutPage

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
