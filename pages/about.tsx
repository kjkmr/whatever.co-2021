import Link from 'next/link'
import { t, LangStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'

const Genres = () => (
  <div className={LangStyle('genres')}>
    <div className="inner">
      <div className="image"><GradImg><img src="/about/genres@2x.png" /></GradImg></div>
      <div className="content">
        <Grad><h3>Crossborder :</h3></Grad>
        <Grad><h1>Genres</h1></Grad>
        {t('about.index.genres.title') ? <Grad><h2>{t('about.index.genres.title')}</h2></Grad> : null}
        <Grad><p dangerouslySetInnerHTML={{ __html: t('about.index.genres.description').replace('\n', '<br />') }}></p></Grad>
        <div className="more"><Grad><Link href="/about/genres"><a>Show more</a></Link></Grad></div>
      </div>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .genres
        width 100%
        margin-bottom vwpx(59)
        min-height vwpx(544)
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
          margin-right 20px
          padding-bottom 11px
          padding-right 30px
          padding-left 0
      .en
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

const Cultures = () => (
  <div className={LangStyle('cultures')}>
    <div className="inner">
      <div className="content">
        <Grad><h3>Crossborder :</h3></Grad>
        <Grad><h1>Cultures</h1></Grad>
        {t('about.index.cultures.title') ? <Grad><h2>{t('about.index.cultures.title')}</h2></Grad> : null}
        <Grad><p dangerouslySetInnerHTML={{ __html: t('about.index.cultures.description').replace('\n', '<br />') }}></p></Grad>
        <div className="more"><Grad><Link href="/about/cultures"><a>Show more</a></Link></Grad></div>
      </div>
      <div className="image"><GradImg><img src="/about/cultures@2x.png" /></GradImg></div>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .cultures
        width 100%
        margin-bottom vwpx(58)
        min-height vwpx(546)
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
        padding-top vwpx(91)
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
          padding-bottom 11px
          padding-right 30px
          padding-left 0
      .en
        .content
          padding-top vwpx(103)
        p
          margin-top vwpx(8)
          font-size 1.6rem
    `}</style>
  </div>
)

const Workstyle = () => (
  <div className={LangStyle('workstyle')}>
    <div className="inner">
      <div className="image"><GradImg><img src="/about/workstyle@2x.png" /></GradImg></div>
      <div className="content">
        <Grad><h3>Crossborder :</h3></Grad>
        <Grad><h1>Workstyle</h1></Grad>
        {t('about.index.workstyle.title') ? <Grad><h2>{t('about.index.workstyle.title')}</h2></Grad> : null}
        <Grad><p dangerouslySetInnerHTML={{ __html: t('about.index.workstyle.description').replace('\n', '<br />') }}></p></Grad>
        <div className="more"><Grad><Link href="/about/workstyle"><a>Show more</a></Link></Grad></div>
      </div>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .workstyle
        width 100%
        margin-bottom vwpx(159)
        min-height vwpx(550)
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
        padding-top vwpx(90)
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
          padding-bottom 11px
          padding-right 30px
          padding-left 0
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
    <div className={LangStyle()}>
      <div className="head">
        <Grad><h1>Crossborder</h1></Grad>
        <Grad><h1>Creative Studio</h1></Grad>
      </div>
      <div className="text">
        {[1, 2, 3, 4].map(n => (
          <div key={n} className="p">
            {t(`about.index.statement${n}`).split('\n').map((line, index) => (
              <Grad key={index}><span>{line}</span></Grad>
            ))}
          </div>
        ))}
      </div>
    </div>

    <Genres />
    <Cultures />
    <Workstyle />

    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .head
        margin-top vwpx(63)
        margin-bottom vwpx(87)
        margin-left vwpx(-6)
        font-size 0
        h1
          margin 0
          display inline-block
          font-size vwpx(140)
          line-height vwpx(152)
          overflow hidden
      .text
        margin-left vwpx(80)
        margin-bottom vwpx(117)
        font-size vwpx(20)
        font-weight bold
        line-height vwpx(23)
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
