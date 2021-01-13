import { GetStaticProps } from 'next'
import Link from 'next/link'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'


type DetailProps = {
  title: string
}

const Detail = ({ title }: DetailProps) => {
  const key = title.toLowerCase()
  const subtitle = t(`about_${key}_title`)
  return (
    <div className={langStyle('detail')}>
      <Grad><h3>Whatever</h3></Grad>
      <Grad><h1>{title}</h1></Grad>
      {subtitle != '-' ? <Grad><h2>{subtitle}</h2></Grad> : null}
      <Grad><p dangerouslySetInnerHTML={{ __html: t(`about_${key}_description`)?.replace('\n', '<br />') || '' }}></p></Grad>
      <div className="more"><Grad><Link href="/about/genres"><a>Learn more</a></Link></Grad></div>
      <style jsx>{`
        vwpx(px)
          'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
        .detail
          font-size 0
        h3
          display inline-block
          overflow hidden
          font-size vwpx(28)
          margin 0
          margin-left vwpx(-1)
        h1
          display inline-block
          overflow hidden
          font-size vwpx(84)
          margin 0
          margin-top vwpx(9)
          margin-bottom vwpx(19)
          margin-left vwpx(-3)
        h2
          display inline-block
          overflow hidden
          font-size vwpx(24)
          margin 0
          margin-top vwpx(7)
        p
          margin-top vwpx(21)
          {/* margin-right vwpx(77) */}
          font-size 1.5rem
          line-height 3.0rem
        .more
          a
            display inline-block
            font-weight bold
            font-size 2rem
            border none
            border-bottom 1px solid
            background none
            margin-top vwpx(24)
            padding-bottom 6px
          h1
            margin-bottom vwpx(5)
          p
            font-size 1.6rem
            line-height 3.0rem
          .more a
            margin-top vwpx(23)
        .en
          h1
            margin-bottom vwpx(6)
          p
            font-size 1.6rem
      `}</style>
    </div>
  )
}

const Genres = () => (
  <div className={langStyle('genres')}>
    <div className="inner">
      <div className="image"><GradImg><img src="/about/pict01.svg" /></GradImg></div>
      <div className="detail"><Detail title="Genres" /></div>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .genres
        width 100%
        margin-bottom vwpx(59)
      .inner
        display flex
        justify-content space-between
        align-items center
      .image img
        width vwpx(483)
        margin-left vwpx(80)
      .detail
        width vwpx(563)
        padding-right vwpx(80)
      .en
        .detail
          padding-top vwpx(4)
    `}</style>
  </div>
)

const Workstyle = () => (
  <div className={langStyle('workstyle')}>
    <hr />
    <div className="inner">
      <div className="content"><Detail title="Workstyle" /></div>
      <div className="image"><GradImg><img src="/about/pict02.svg" /></GradImg></div>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .workstyle
        width 100%
        margin-bottom vwpx(51)
      hr
        margin 0
        margin-left vwpx(80)
        margin-right vwpx(643)
        padding 0
        border none
        border-top 1px solid #999999
      .inner
        display flex
        justify-content space-between
        align-items center
        margin-top vwpx(63)
        margin-left vwpx(80)
      .image img
        width vwpx(484)
        margin-right vwpx(79)
      .content
        width vwpx(564)
        padding-bottom vwpx(15)
      .en
        .content
          padding-bottom vwpx(2)
        p
          margin-top vwpx(8)
          font-size 1.6rem
    `}</style>
  </div>
)

const Location = () => (
  <div className={langStyle('location')}>
    <hr />
    <div className="inner">
      <div className="image"><GradImg><img src="/about/pict03.svg" /></GradImg></div>
      <div className="content"><Detail title="Location" /></div>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .location
        width 100%
        margin-bottom vwpx(165)
      hr
        margin 0
        margin-left vwpx(643)
        padding 0
        border none
        border-top 1px solid #999999
      .inner
        display flex
        justify-content space-between
        align-items center
        margin-top vwpx(59)
      .image img
        width vwpx(484)
        margin-left vwpx(80)
      .content
        width vwpx(563)
        padding-right vwpx(80)
        padding-bottom vwpx(18)
        font-size 0
      .en
        .content
          padding-bottom vwpx(2)
        p
          margin-top vwpx(4)
          font-size 1.6rem
    `}</style>
  </div>
)

const AboutPage = () => (
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

    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .about
        margin-top vwpx(93)
        margin-bottom vwpx(126)
      .head
        margin-bottom vwpx(57)
        margin-left vwpx(40)
        font-size 0
        h1
          margin 0
          display inline-block
          font-size vwpx(140)
          line-height vwpx(152)
          overflow hidden
          .q
            font-family 'Noto Sans JP'
      .text
        margin-left vwpx(80)
        font-size vwpx(28)
        font-weight bold
        line-height vwpx(37)
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
  </Layout>
)

export default AboutPage

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
