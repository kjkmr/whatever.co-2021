import Link from 'next/link'
import { t, LangStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'

const Genres = () => (
  <div className={LangStyle('container')}>
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
      vwp(p)
        'calc((100vw - 80px) * %s)' % p
      .container
        width 100%
        margin-bottom vwp(0.0465)
      .inner
        display flex
        justify-content space-between
      .image img
        width vwp(0.3755)
        margin-left vwp(0.062)
        margin-top vwp(0.0465)
      .content
        border-top 1px solid #D0D0D0
        width vwp(0.5)
        padding-top vwp(0.081)
      h3
        display inline-block
        overflow hidden
        font-size vwp(0.0217)
        margin 0
      h1
        display inline-block
        overflow hidden
        font-size vwp(0.0653)
        margin 0
        margin-top vwp(0.0045)
        margin-bottom 17px
        margin-left vwp(-0.002)
      h2
        display inline-block
        overflow hidden
        font-size vwp(0.0187)
        margin 0
        margin-top vwp(0.0045)
      p
        margin-top vwp(0.014)
        margin-right vwp(0.06)
        line-height 2em
      .more
        a
          display inline-block
          font-weight bold
          font-size 2rem
          border none
          border-bottom 1px solid
          background none
          margin-top vwp(0.019)
          margin-right 20px
          padding-bottom 11px
          padding-right 30px
          padding-left 0
      .en
        h1
          margin-bottom vwp(0.005)
        p
          font-size 1.6rem
          line-height 1.9em
        .more a
          margin-top vwp(0.018)
    `}</style>
  </div>
)

const Cultures = () => (
  <div className={LangStyle('container')}>
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
      vwp(p)
        'calc((100vw - 80px) * %s)' % p
      .container
        width 100%
        margin-bottom vwp(0.0455)
      .inner
        display flex
        justify-content space-between
        margin-left vwp(0.062)
      .image img
        width vwp(0.3755)
        margin-right vwp(0.062)
        margin-top vwp(0.049)
      .content
        border-top 1px solid #D0D0D0
        width vwp(0.439)
        padding-top vwp(0.071)
      h3
        display inline-block
        overflow hidden
        font-size vwp(0.0217)
        margin 0
      h1
        display inline-block
        overflow hidden
        font-size vwp(0.0653)
        margin 0
        margin-top vwp(0.0045)
        margin-bottom 17px
        margin-left vwp(-0.002)
      h2
        display inline-block
        overflow hidden
        font-size vwp(0.0187)
        margin 0
        margin-top vwp(0.0045)
      p
        margin-top vwp(0.014)
        line-height 2em
      .more
        a
          display inline-block
          font-weight bold
          font-size 2rem
          border none
          border-bottom 1px solid
          background none
          margin-top vwp(0.019)
          margin-right 20px
          padding-bottom 11px
          padding-right 30px
          padding-left 0
      .en
        .content
          padding-top vwp(0.0805)
        p
          margin-top vwp(0.006)
          font-size 1.6rem
          line-height 1.9em
    `}</style>
  </div>
)

const Workstyle = () => (
  <div className={LangStyle('container')}>
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
      vwp(p)
        'calc((100vw - 80px) * %s)' % p
      .container
        width 100%
        margin-bottom vwp(0.1245)
      .inner
        display flex
        justify-content space-between
      .image img
        width calc((100vw - 80px) * 0.3755)
        margin-left vwp(0.062)
        margin-top vwp(0.047)
      .content
        border-top 1px solid #D0D0D0
        width vwp(0.5)
        padding-top vwp(0.07)
      h3
        display inline-block
        overflow hidden
        font-size vwp(0.0217)
        margin 0
      h1
        display inline-block
        overflow hidden
        font-size vwp(0.0653)
        margin 0
        margin-top vwp(0.0045)
        margin-bottom 17px
      h2
        display inline-block
        overflow hidden
        font-size vwp(0.0187)
        margin 0
        margin-top vwp(0.0045)
      p
        margin-top vwp(0.014)
        margin-right vwp(0.0625)
        line-height 2em
      .more
        a
          display inline-block
          font-weight bold
          font-size 2rem
          border none
          border-bottom 1px solid
          background none
          margin-top vwp(0.019)
          margin-right 20px
          padding-bottom 11px
          padding-right 30px
          padding-left 0
      .en
        .content
          padding-top vwp(0.1185)
        p
          margin-top vwp(0.002)
          font-size 1.6rem
          line-height 1.9em
    `}</style>
  </div>
)

const AboutPage = () => (
  <Layout title="ABOUT">
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
      vwp(p)
        'calc((100vw - 80px) * %s)' % p
      .head
        margin-top vwp(0.049)
        margin-bottom vwp(0.068)
        margin-left vwp(-0.005)
        font-size 0
        h1
          margin 0
          display inline-block
          font-size vwp(0.1089)
          line-height 1.09em
          overflow hidden
      .text
        margin-left vwp(0.062)
        margin-bottom vwp(0.0915)
        font-size vwp(0.01557)
        font-weight bold
        line-height vwp(0.018)
        >div.p
          margin 0
          margin-bottom vwp(0.0325)
        span
          display inline-block
          overflow hidden
          margin-bottom vwp(0.0101)
      .en
        .text
          font-size vwp(0.0171)
          margin-bottom vwp(0.085)
    `}</style>
  </Layout>
)

export default AboutPage
