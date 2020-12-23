import Link from 'next/link'
import { t, LangStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionTitle } from 'components/About'


const Section1 = () => (
  <div className="container">
    <SectionTitle num="01" nx={-5} tx={-4} title={t('about.genres.1.title')} />
    <div className="t">
      {t('about.genres.1.body').split('\n').map((line, index) => (<p key={index}>{line}</p>))}
    </div>
    <h2>{t('about.genres.1.example.title')}</h2>
    <ul>
      {[1, 2, 3, 4, 5].map(n => (
        <li key={n}><span>{t(`about.genres.1.example.${n}.name`)}</span><br />{t(`about.genres.1.example.${n}.content`)}</li>
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
      .container
        position relative
        min-height vwpx(1293)
        margin-top vwpx(159)
        margin-left vwpx(80)
        margin-bottom vwpx(88)
      .t
        width vwpx(522.7)
        line-height 2em
        margin-top vwpx(43)
        margin-bottom vwpx(87)
        p
          margin-top vwpx(30)
      h2
        font-size vwpx(20)
        font-weight bold
        margin-bottom vwpx(40)
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
          line-height 2.15em
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
    `}</style>
  </div>
)

const Section2 = () => (
  <div className="container">
    <SectionTitle num="02" title={t('about.genres.2.title')} nx={-4} tx={-14} ty={28} />
    <div className="t">{t('about.genres.2.body')}</div>
    <div className="g">
      {[1, 2, 3, 4].map(n => (
        <div>
          <div className="title" dangerouslySetInnerHTML={{ __html: t(`about.genres.2.roles.${n}.category`).replace(/\n/g, '<br />') }}></div>
          <ul>
            {t(`about.genres.2.roles.${n}.roles`).split(',').map(role => <li>{role}</li>)}
          </ul>
        </div>
      ))}
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .container
        margin-left vwpx(80)
        margin-right vwpx(80)
        margin-bottom vwpx(136)
      .t
        margin-top vwpx(42)
        font-size 1.5rem
        line-height 2em
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
          line-height 1.55em
          margin-bottom 21px
        ul
          margin 0
          margin-left -1px
          padding 0
          list-style inside '- '
          li
            font-size 1.2rem
            line-height 2.7em
    `}</style>
  </div>
)

const WorkLink = ({ name, link, desc, mb }: { name: string, link: string, desc: string, mb?: number }) => (
  <div>
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
        line-height 2em
    `}</style>
  </div>
)

const Products = () => (
  <div className="products">
    <div className="text">
      <h2>{t('about.genres.3.inhouse.title')}</h2>
      <div className="t">{t('about.genres.3.inhouse.body')}</div>
      <div className="items">
        {[1, 2, 3, 4, 5, 6].map(n => (
          <WorkLink name={t(`about.genres.3.inhouse.items.${n}.title`)} link={t(`about.genres.3.inhouse.items.${n}.link`)} desc={t(`about.genres.3.inhouse.items.${n}.description`)} />
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
        margin-bottom vwpx(34)
        font-size 1.5rem
        line-height 2em
      .items
        margin-top 30px
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
    `}</style>
  </div>
)

const Brands = () => (
  <div className="brands">
    <div className="text">
      <h2>{t('about.genres.3.brands.title')}</h2>
      <div className="t">{t('about.genres.3.brands.body')}</div>
      <div className="items">
        {[1, 2, 3].map(n => (
          <WorkLink name={t(`about.genres.3.brands.items.${n}.title`)} link={t(`about.genres.3.brands.items.${n}.link`)} desc={t(`about.genres.3.brands.items.${n}.description`)} />
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
        line-height 2em
      .items
        margin-top 44px
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
    `}</style>
  </div>
)

const Investment = () => (
  <div className="investment">
    <div className="text">
      <h2>{t('about.genres.3.investment.title')}</h2>
      <div className="t">{t('about.genres.3.investment.body')}</div>
      <div className="items">
        {[1, 2, 3].map(n => (
          <WorkLink name={t(`about.genres.3.investment.items.${n}.title`)} link={t(`about.genres.3.investment.items.${n}.link`)} desc={t(`about.genres.3.investment.items.${n}.description`)} />
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
          line-height 2em
      .items
        margin-top 38px
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
    `}</style>
  </div>
)

const Section3 = () => (
  <div className="section3">
    <SectionTitle num="03" nx={-5} title={t('about.genres.3.title')} tx={1} ty={24} />
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
        line-height 2em
      img
        position absolute
        top vwpx(196)
        right 0
        width vwpx(604)
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
