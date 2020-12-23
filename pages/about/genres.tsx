import Link from 'next/link'
import { t, LangStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionTitle } from 'components/About'
import { Grad, GradImg } from 'components/Grad'

const Section1 = () => (
  <div className={LangStyle('section1')}>
    <SectionTitle num="01" nx={-5} tx={{ ja: -4, en: -4 }} ty={{ en: -3 }} title={t('about.genres.1.title')} />
    <div className="t">
      {t('about.genres.1.body').split('\n').map((line, index) => <Grad key={index}><p key={index}>{line}</p></Grad>)}
    </div>
    <Grad><h2>{t('about.genres.1.example.title')}</h2></Grad>
    <ul>
      {[1, 2, 3, 4, 5].map(n => (
        <Grad key={n}><li key={n}><span>{t(`about.genres.1.example.${n}.name`)}</span><br />{t(`about.genres.1.example.${n}.content`)}</li></Grad>
      ))}
    </ul>
    <div className="images">
      <img src="/about/genres/image@2x.jpg" alt="" className="i1" />
      <img src="/about/genres/image-1@2x.jpg" alt="" className="i2" />
      <img src="/about/genres/image-2@2x.jpg" alt="" className="i3" />
      <img src="/about/genres/image-3@2x.jpg" alt="" className="i4" />
      <img src="/about/genres/image-4@2x.jpg" alt="" className="i5" />
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .section1
        position relative
        min-height vwpx(1293)
        margin-top vwpx(159)
        margin-left vwpx(80)
        margin-bottom vwpx(88)
      .t
        width vwpx(523)
        line-height 3.0rem
        margin-top vwpx(43)
        margin-bottom vwpx(87)
        p
          margin-top vwpx(30)
      h2
        font-size vwpx(20)
        font-weight bold
        margin 0
        margin-bottom vwpx(36)
        padding 0
        display inline-block
        overflow hidden
      ul
        margin 0
        margin-left 10px
        padding 0
        width 510px
        list-style-type '- '
        li
          margin 0
          margin-bottom 24px
          padding 0
          font-size 1.5rem
          line-height 3.2rem
          >span
            font-weight bold
      .images img
        position absolute
        &.i1
          top 0
          right 0
          width vwpx(523)
        &.i2
          top vwpx(366)
          right vwpx(208)
          width vwpx(231)
        &.i3
          top vwpx(531)
          right vwpx(80)
          width vwpx(185)
        &.i4
          top vwpx(842)
          right vwpx(142)
          width vwpx(461)
        &.i5
          top vwpx(1062)
          right 0
          width vwpx(231)
      .en
        .t
          margin-top vwpx(52)
          margin-bottom vwpx(88)
          font-size 1.6rem
        h2
          font-size vwpx(24)
        ul li
          font-size 1.6rem
          line-height 2em
    `}</style>
  </div>
)

const Section2 = () => (
  <div className={LangStyle('section2')}>
    <SectionTitle num="02" title={t('about.genres.2.title')} nx={-4} tx={{ ja: -14 }} ty={{ ja: 28 }} />
    <div className="t">{t('about.genres.2.body')}</div>
    <div className="g">
      {[1, 2, 3, 4].map(n => (
        <div key={n}>
          <div className="title" dangerouslySetInnerHTML={{ __html: t(`about.genres.2.roles.${n}.category`).replace(/\n/g, '<br />') }}></div>
          <ul>
            {t(`about.genres.2.roles.${n}.roles`).split(',').map(role => <li key={role}>{role}</li>)}
          </ul>
        </div>
      ))}
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .section2
        margin-left vwpx(80)
        margin-right vwpx(80)
        margin-bottom vwpx(136)
      .t
        margin-top vwpx(42)
        font-size 1.5rem
        line-height 3.0rem
      .g
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap 0
        margin-top 76px
        >div
          margin-left -2px
          border-left 2px solid #E0E0E0
          border-right 2px solid #E0E0E0
          padding 0 vwpx(40)
        .title
          font-size vwpx(18)
          font-weight bold
          line-height 2.7rem
          margin-bottom 21px
        ul
          margin 0
          margin-left -1px
          padding 0
          list-style inside '- '
          li
            font-size 1.2rem
            line-height 3.2rem
      .en
        .t
          font-size 1.6rem
          line-height 1.9em
        ul li
          font-size 1.4rem
    `}</style>
  </div>
)

const WorkLink = ({ name, link, desc, mb }: { name: string, link: string, desc: string, mb?: number }) => (
  <div className={LangStyle()}>
    <div className="name"><Link href={`/work/${link}`}><a>- {name}</a></Link></div>
    <div className="desc">{desc}</div>
    <style jsx>{`
      .name
        font-size 1.5rem
        font-weight bold
        a
          display inline-block
          padding-bottom 6px
          padding-right 4px
          border-bottom 1px solid red
      .desc
        margin-top 3px
        margin-bottom 32px
        margin-left 10px
        line-height 3.0rem
      .en
        .name
          font-size 1.6rem
        .desc
          font-size 1.6rem
          margin-bottom 31px
    `}</style>
  </div>
)

const Products = () => (
  <div className={LangStyle('products')}>
    <div className="text">
      <h2>{t('about.genres.3.inhouse.title')}</h2>
      <div className="t">{t('about.genres.3.inhouse.body')}</div>
      <div className="items">
        {[1, 2, 3, 4, 5, 6].map(n => (
          <WorkLink key={n} name={t(`about.genres.3.inhouse.items.${n}.title`)} link={t(`about.genres.3.inhouse.items.${n}.link`)} desc={t(`about.genres.3.inhouse.items.${n}.description`)} />
        ))}
      </div>
    </div>
    <div className="images">
      <img src="/about/genres/3/image@2x.jpg" alt="" className="i1" />
      <img src="/about/genres/3/image-1@2x.jpg" alt="" className="i2" />
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .products
        position relative
        min-height vwpx(730)
        margin-bottom vwpx(98)
      .text
        width vwpx(520)
      h2
        font-size vwpx(20)
        font-weight bold
        margin 0
        margin-bottom vwpx(21)
      .t
        margin-bottom 34px
        font-size 1.5rem
        line-height 3.0rem
      .images img
        position absolute
        &.i1
          width vwpx(523)
          top vwpx(36)
          right 0
        &.i2
          width vwpx(213)
          top vwpx(371)
          right vwpx(80)
      .en
        &.products
          margin-bottom vwpx(115)
          min-height vwpx(786)
        h2
          font-size vwpx(24)
        .t
          font-size 1.6rem
          margin-bottom 40px
    `}</style>
  </div>
)

const Brands = () => (
  <div className={LangStyle('brands')}>
    <div className="text">
      <h2>{t('about.genres.3.brands.title')}</h2>
      <div className="t">{t('about.genres.3.brands.body')}</div>
      <div className="items">
        {[1, 2, 3].map(n => (
          <WorkLink key={n} name={t(`about.genres.3.brands.items.${n}.title`)} link={t(`about.genres.3.brands.items.${n}.link`)} desc={t(`about.genres.3.brands.items.${n}.description`)} />
        ))}
      </div>
    </div>
    <div className="images">
      <img src="/about/genres/3/toio@2x.jpg" alt="" className="i1" />
      <img src="/about/genres/3/F_IH_6210@2x.jpg" alt="" className="i2" />
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .brands
        position relative
        min-height vwpx(473)
        margin-bottom vwpx(110)
        >img
          position absolute
      .text
        width vwpx(513)
      h2
        font-size vwpx(20)
        margin 0
        margin-bottom vwpx(21)
      .t
        line-height 3.0rem
        margin-bottom 44px
      .images img
        position absolute
        &.i1
          width vwpx(604)
          top vwpx(-132)
          right 0
        &.i2
          width vwpx(337)
          top vwpx(180)
          right 0
      .en
        &.brands
          margin-bottom vwpx(114)
          min-height vwpx(525)
        h2
          font-size vwpx(24)
        .t
          font-size 1.6rem
          margin-bottom 40px
    `}</style>
  </div>
)

const Investment = () => (
  <div className={LangStyle('investment')}>
    <div className="text">
      <h2>{t('about.genres.3.investment.title')}</h2>
      <div className="t">{t('about.genres.3.investment.body')}</div>
      <div className="items">
        {[1, 2, 3].map(n => (
          <WorkLink key={n} name={t(`about.genres.3.investment.items.${n}.title`)} link={t(`about.genres.3.investment.items.${n}.link`)} desc={t(`about.genres.3.investment.items.${n}.description`)} />
        ))}
      </div>
    </div>
    <div className="images">
      <img src="/about/genres/3/image-2@2x.jpg" alt="" className="i1" />
      <img src="/about/genres/3/image-3@2x.jpg" alt="" className="i2" />
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .investment
        position relative
        min-height vwpx(503)
        margin-bottom vwpx(190)
        >img
          position absolute
      .text
        width vwpx(513)
      h2
        font-size vwpx(20)
        margin 0
        margin-bottom vwpx(21)
      .t
        line-height 3.0rem
        margin-bottom 38px
      .images img
        position absolute
        &.i1
          width vwpx(443)
          top vwpx(-50)
          right vwpx(80)
        &.i2
          width vwpx(375)
          top vwpx(363)
          right 0
      .en
        &.investment
          min-height vwpx(503)
        h2
          font-size vwpx(24)
        .t
          font-size 1.6rem
    `}</style>
  </div>
)

const Section3 = () => (
  <div className={LangStyle('section3')}>
    <SectionTitle num="03" nx={-5} title={t('about.genres.3.title')} tx={{ ja: 1, en: 1 }} ty={{ ja: 24, en: -1 }} />
    <div className="content">
      <div className="t">{t('about.genres.3.body')}</div>
      <img src="/about/genres/3/0474_B_1005@2x.jpg" alt="" />
    </div>
    <Products />
    <Brands />
    <Investment />
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .section3
        position relative
        margin-left vwpx(80)
      .content
        margin-top vwpx(43)
        margin-bottom vwpx(106)
        min-height vwpx(240)
        overflow hidden
      .t
        width vwpx(523)
        font-size 1.5rem
        line-height 3.0rem
      img
        position absolute
        top vwpx(196)
        right 0
        width vwpx(604)
      .en
        .t
          font-size 1.6rem
        .content
          margin-bottom vwpx(79)
    `}</style>
  </div>
)

const GenrePage = () => (
  <Layout title="About" footer={<Footer left="Workstyle" right="Cultures" />}>
    <div className="container">
      <Header title="Genres" subtitle={t('about.genres.title')} desc={t('about.genres.description')} />
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
    <style jsx>{`
      .container
        min-height 5000px
        margin-bottom 110px
    `}</style>
  </Layout>
)

export default GenrePage
