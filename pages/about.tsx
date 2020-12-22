import Link from 'next/link'
import { t, LangStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'

const Genres = () => (
  <div className="genres">
    <div className="inner">
      <div className="image"><GradImg><img src="/about/genres@2x.png" /></GradImg></div>
      <div className="content">
        <Grad><h3>Crossborder :</h3></Grad>
        <Grad><h1>Genres</h1></Grad>
        <Grad><h2>{t('about.index.genres.title')}</h2></Grad>
        <Grad><p dangerouslySetInnerHTML={{ __html: t('about.index.genres.description').replace('\n', '<br />') }}></p></Grad>
        <div className="more"><Grad><Link href="/about/genres"><a>Show more</a></Link></Grad></div>
      </div>
    </div>
    <style jsx>{`
      .genres
        width 100%
      .inner
        display flex
        justify-content space-between
      .image img
        width calc((100vw - 80px) * 0.3755)
        margin-left calc((100vw - 80px) * 0.062)
        margin-top calc((100vw - 80px) * 0.0465)
      .content
        border-top 1px solid #D0D0D0
        width calc((100vw - 80px) * 0.5)
        padding-top calc((100vw - 80px) * 0.081)
      h3
        display inline-block
        overflow hidden
        font-size calc((100vw - 80px) * 0.0217)
        margin 0
      h1
        display inline-block
        overflow hidden
        font-size calc((100vw - 80px) * 0.0653)
        margin 0
        margin-top calc((100vw - 80px) * 0.0045)
        margin-bottom 17px
        margin-left calc((100vw - 80px) * -0.002)
      h2
        display inline-block
        overflow hidden
        font-size calc((100vw - 80px) * 0.0187)
        margin 0
        margin-top calc((100vw - 80px) * 0.0045)
      p
        margin-top calc((100vw - 80px) * 0.014)
        margin-right calc((100vw - 80px) * 0.06)
        line-height 2em
      .more
        a
          display inline-block
          font-weight bold
          font-size 2rem
          border none
          border-bottom 1px solid
          background none
          margin-top calc((100vw - 80px) * 0.019)
          margin-right 20px
          padding-bottom 11px
          padding-right 30px
          padding-left 0
    `}</style>
  </div>
)

const Cultures = () => (
  <div className="cultures">
    <div className="image"><GradImg><img src="/about/image2.jpg" width="1028" height="578" /></GradImg></div>
    <div className="inner">
      <Grad><h2>Crossing the border of</h2></Grad>
      <Grad><h1>cultures</h1></Grad>
      <Grad><p>At Whatever, we have a proven track record of working with brands around the world, which enables us to support branding and content development across borders and cultures.<br />With four offices in Tokyo, New York, Taiwan and Berlin, and a world-class staff, Whatever can plan and produce world-class brand communications and products.</p></Grad>
      <div className="learn"><Grad><Link href="/about/cultures"><a>Learn more</a></Link></Grad></div>
    </div>
    <style jsx>{`
      .cultures
        position relative
        padding-top 289px
        padding-right 599px
        margin-bottom 89px
      .image
        position absolute
        top 0
        right 0
      .inner
        position relative
        background-color white
        padding-top 43px
        padding-left 81px
        padding-right 60px
      h2
        overflow hidden
        font-size 36px
        margin-bottom 0
        margin-left -2px
      h1
        overflow hidden
        font-size 72px
        margin-top 13px
        margin-bottom 37px
        margin-left -4px
      p
        line-height 2.0em
        margin-left -1px
        letter-spacing -0.01em
      .learn
        display flex
        justify-content flex-end
        a
          display block
          font-weight bold
          font-size 18px
          border none
          border-bottom 1px solid
          background none
          margin-top 11px
          padding-bottom 5px
          padding-right 55px
          padding-left 0
    `}</style>
  </div>
)

const Profession = () => (
  <div className="profession">
    <div className="image"><GradImg><img src="/about/image3.jpg" width="1028" height="578" /></GradImg></div>
    <div className="inner">
      <Grad><h2>Crossing the border of</h2></Grad>
      <Grad><h1>profession</h1></Grad>
      <Grad><p>Whatever is also actively involved in in-house product and business development.<br />We also provide product development and R&amp;D support for a variety of brands, as well as branding and investment support for startups.</p></Grad>
      <div className="learn"><Grad><Link href="/about/profession"><a>Learn more</a></Link></Grad></div>
    </div>
    <style jsx>{`
      .profession
        position relative
        {/* opacity 0.5 */}
        padding-top 289px
        padding-left 603px
        padding-right 70px
        margin-bottom 139px
      .image
        position absolute
        top 0
        left 0
      .inner
        position relative
        background-color white
        padding-top 29px
        padding-left 60px
      h2
        overflow hidden
        font-size 36px
        margin-bottom 0
        margin-left -2px
      h1
        overflow hidden
        font-size 72px
        margin-top 12px
        margin-bottom 37px
        margin-left -3px
      p
        line-height 2.0em
        margin-left -2px
        letter-spacing -0.01em
      .learn
        display flex
        justify-content flex-end
        a
          display block
          font-weight bold
          font-size 18px
          border none
          border-bottom 1px solid
          background none
          margin-top 29px
          margin-right 10px
          padding-bottom 5px
          padding-right 55px
          padding-left 0
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
    {/* <Cultures />
    <Profession /> */}

    <style jsx>{`
      .head
        margin-top calc((100vw - 80px) * 0.049)
        margin-bottom calc((100vw - 80px) * 0.068)
        margin-left calc((100vw - 80px) * -0.005)
        font-size 0
        h1
          margin 0
          display inline-block
          font-size calc((100vw - 80px) * 0.1089)
          line-height 1.09em
          overflow hidden
      .text
        margin-left calc((100vw - 80px) * 0.062)
        margin-bottom calc((100vw - 80px) * 0.0915)
        font-size calc((100vw - 80px) * 0.01557)
        font-weight bold
        line-height calc((100vw - 80px) * 0.018)
        >div.p
          margin 0
          margin-bottom calc((100vw - 80px) * 0.0325)
        span
          display inline-block
          overflow hidden
          margin-bottom calc((100vw - 80px) * 0.0101)
      .en
        .head
          margin-bottom calc((100vw - 80px) * 0.0675)
        .text
          font-size calc((100vw - 80px) * 0.0171)
    `}</style>
  </Layout>
)

export default AboutPage
