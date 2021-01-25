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
        <div><Grad className="whatever">Whatever</Grad></div>
        <div><Grad className="title">{title}</Grad></div>
        {subtitle != '-' ? <div><Grad className="subtitle">{subtitle}</Grad></div> : null}
        <div><Grad className="desc"><div dangerouslySetInnerHTML={{ __html: t(`about_${key}_description`)?.replace('\n', '<br />') || '' }}></div></Grad></div>
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
            margin 0
            margin-top vwpx_min(14)
            margin-bottom vwpx_min(16)
            margin-left vwpx_min(-3)
          :global(.subtitle)
            font-size vwpx_min(24)
            font-weight 700
            margin 0
            margin-top vwpx_min(7)
          :global(.desc)
            margin 0
            margin-top vwpx_min(21)
            margin-left 0.3rem
            font-size 1.5rem
            line-height 3.0rem
        .more
          display inline-block
          margin-top 4.9rem
        .en
          h1
            margin-bottom 0
          p
            font-size 1.7rem
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
        margin-left vwpx(40)
        margin-right vwpx(80)
      .image img
        width vwpx(603)
        background-color white
      .detail
        margin-left vwpx(80)
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
    `}</style>
  </>
)

const AboutPage = () => (
  <>
    <Layout title="About" side="About">
      <div className={langStyle('about')}>
        <div><Grad className="head">What’s Whatever<span className="q">?</span></Grad></div>
        <div className="text">
          {t('about_statement')?.split('\n\n').map((p, i) => (
            <div key={i}>
              {p.split('\n').map((line, index) => (
                <Grad key={index} className="p">{line}</Grad>
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
        font-size 0
        :global(.head)
          margin-bottom vwpx(66)
          margin-left vwpx(81)
          font-size vwpx(129)
          font-weight 700
          .q
            font-family 'Noto Sans JP'
      .text
        margin-left vwpx(118)
        :global(.p)
          margin 0
          margin-bottom vwpx(24)
          font-size vwpx(26)
          font-weight bold
          line-height vwpx(36)
      .en
        .text
          font-size vwpx(30)
          line-height vwpx(37)
    `}</style>
  </>
)

export default AboutPage

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
