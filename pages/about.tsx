import { GetStaticProps } from 'next'
import Link from 'next/link'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'

const Genres = () => (
  <div className={langStyle('genres')}>
    <div className="inner">
      <div className="image"><GradImg><img src="/about/genres@2x.png" /></GradImg></div>
      <div className="content">
        <Grad><h3>Whatever</h3></Grad>
        <Grad><h1>Genres</h1></Grad>
        {t('about_genres_title') != '-' ? <Grad><h2>{t('about_genres_title')}</h2></Grad> : null}
        <Grad><p dangerouslySetInnerHTML={{ __html: t('about_genres_description')?.replace('\n', '<br />') || '' }}></p></Grad>
        <div className="more"><Grad><Link href="/about/genres"><a>Learn more</a></Link></Grad></div>
      </div>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .genres
        width 100%
        margin-bottom vwpx(60)
      .inner
        display flex
        justify-content space-between
      .image img
        width vwpx(484)
        margin-left vwpx(80)
        margin-top vwpx(43)
      .content
        width vwpx(643)
        padding-top vwpx(104)
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
        margin-top vwpx(6)
        margin-bottom vwpx(16)
        margin-left vwpx(-3)
      h2
        display inline-block
        overflow hidden
        font-size vwpx(24)
        margin 0
        margin-top vwpx(6)
      p
        margin-top vwpx(19)
        margin-right vwpx(77)
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
    `}</style>
  </div>
)

const Workstyle = () => (
  <div className={langStyle('workstyle')}>
    <div className="inner">
      <div className="content">
        <Grad><h3>Whatever</h3></Grad>
        <Grad><h1>Workstyle</h1></Grad>
        {t('about_workstyle_title') != '-' ? <Grad><h2>{t('about_workstyle_title')}</h2></Grad> : null}
        <Grad><p dangerouslySetInnerHTML={{ __html: t('about_workstyle_description')?.replace('\n', '<br />') || '' }}></p></Grad>
        <div className="more"><Grad><Link href="/about/workstyle"><a>Learn more</a></Link></Grad></div>
      </div>
      <div className="image"><GradImg><img src="/about/workstyle@2x.png" /></GradImg></div>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .workstyle
        width 100%
        margin-bottom vwpx(52)
      .inner
        display flex
        justify-content space-between
        margin-left vwpx(80)
      .image img
        width vwpx(484)
        margin-right vwpx(79)
        margin-top vwpx(62)
      .content
        border-top 1px solid #D0D0D0
        width vwpx(564)
        padding-top vwpx(135)
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
        margin-top vwpx(6)
        margin-bottom vwpx(16)
        margin-left vwpx(-3)
      h2
        display inline-block
        overflow hidden
        font-size vwpx(24)
        margin 0
        margin-top vwpx(6)
        margin-left vwpx(-1)
      p
        margin-top vwpx(19)
        line-height 3.0rem
      .more
        a
          display inline-block
          font-weight bold
          font-size 2rem
          border none
          border-bottom 1px solid
          background none
          margin-top vwpx(25)
          margin-right 20px
          padding-bottom 6px
      .en
        .content
          padding-top vwpx(103)
        p
          margin-top vwpx(8)
          font-size 1.6rem
    `}</style>
  </div>
)

const Location = () => (
  <div className={langStyle('location')}>
    <div className="inner">
      <div className="image"><GradImg><img src="/about/cultures@2x.png" /></GradImg></div>
      <div className="content">
        <Grad><h3>Whatever</h3></Grad>
        <Grad><h1>Location</h1></Grad>
        {t('about_location_title') != '-' ? <Grad><h2>{t('about_location_title')}</h2></Grad> : null}
        <Grad><p dangerouslySetInnerHTML={{ __html: t('about_location_description')?.replace('\n', '<br />') || '' }}></p></Grad>
        <div className="more"><Grad><Link href="/about/location"><a>Learn more</a></Link></Grad></div>
      </div>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .location
        width 100%
        margin-bottom vwpx(165)
      .inner
        display flex
        justify-content space-between
      .image img
        width vwpx(484)
        margin-left vwpx(80)
        margin-top vwpx(60)
      .content
        border-top 1px solid #D0D0D0
        width vwpx(643)
        padding-top vwpx(128)
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
        margin-top vwpx(6)
        margin-bottom vwpx(16)
      h2
        display inline-block
        overflow hidden
        font-size vwpx(24)
        margin 0
        margin-top vwpx(6)
      p
        margin-top vwpx(19)
        margin-right vwpx(80)
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
          margin-right 20px
          padding-bottom 7px
      .en
        .content
          padding-top vwpx(152)
        p
          margin-top vwpx(4)
          font-size 1.6rem
    `}</style>
  </div>
)

const AboutPage = () => (
  <Layout title="About" side="About">
    <div className={langStyle()}>
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
      .head
        margin-top vwpx(93)
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
        margin-bottom vwpx(87)
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
        .text
          font-size vwpx(22)
          margin-bottom vwpx(109)
    `}</style>
  </Layout>
)

export default AboutPage

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
