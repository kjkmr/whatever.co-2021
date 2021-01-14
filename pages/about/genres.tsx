import { GetStaticProps } from 'next'
import Link from 'next/link'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionTitle } from 'components/About'
import { Grad } from 'components/Grad'

const Section1 = () => (
  <div className={langStyle('section1')}>
    <SectionTitle num="01" nx={-5} tx={{ ja: -4, en: -4 }} ty={{ en: -3 }} title={t('genres_1_title')!} />
    <div className="t">
      {t('genres_1_body')!.split('\n').map((line, index) => <Grad key={index}><p key={index}>{line}</p></Grad>)}
    </div>
    <Grad><h2>{t('genres_1_example_title')}</h2></Grad>
    <ul>
      {t('genres_1_example_items')!.split('\n\n').map((item, index) => {
        const [title, desc] = item.split('\n')
        return <Grad key={index}><li key={index}><span>{title}</span><br />{desc}</li></Grad>
      })}
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
        margin-top vwpx(143)
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
          top vwpx(-21)
          right 0
          width vwpx(523)
        &.i2
          top vwpx(345)
          right vwpx(208)
          width vwpx(231)
        &.i3
          top vwpx(510)
          right vwpx(80)
          width vwpx(185)
        &.i4
          top vwpx(762)
          right vwpx(142)
          width vwpx(461)
        &.i5
          top vwpx(982)
          right 0
          width vwpx(231)
      .en
        &.section1
          margin-top vwpx(147)
        .t
          margin-top vwpx(52)
          margin-bottom vwpx(88)
          font-size 1.6rem
        h2
          font-size vwpx(24)
        ul li
          font-size 1.6rem
          line-height 2em
        .images img
          &.i1
            top vwpx(24)
          &.i2
            top vwpx(390)
          &.i3
            top vwpx(555)
          &.i4
            top vwpx(810)
          &.i5
            top vwpx(1030)
    `}</style>
  </div>
)

const Section2 = () => (
  <div className={langStyle('section2')}>
    <SectionTitle num="02" title={t('genres_2_title')!} nx={-4} tx={{ ja: -14 }} ty={{ ja: 28 }} />
    <div className="t">{t('genres_2_body')}</div>
    <div className="g">
      {['project', 'creative', 'tech', 'business'].map(key => {
        const [title, roles] = t(`genres_2_${key}`)!.split('\n\n')
        return (
          <div key={key}>
            <div className="title" dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }}></div>
            <ul>
              {roles?.split('\n').map(role => <li key={role}>{role}</li>)}
            </ul>
          </div>
        )
      })}
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

const WorkLink = ({ name, link, desc }: { name: string, link: string, desc: string }) => (
  <div className={langStyle()}>
    <div className="name"><Link href={`/work/${link}`}><a>- {name}</a></Link></div>
    <div className="desc">{desc}</div>
    <style jsx>{`
      .name
        font-size 1.5rem
        font-weight bold
        a
          display inline-block
          padding-right 4px
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
  <div className={langStyle('products')}>
    <div className="text">
      <h2>{t('genres_3_inhouse_title')}</h2>
      <div className="t">{t('genres_3_inhouse_body')}</div>
      <div className="items">
        {t('genres_3_inhouse_items')?.split('\n\n').map(item => {
          const [name, link, desc] = item.split('\n')
          return <WorkLink key={link} name={name} link={link} desc={desc} />
        })}
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
          top vwpx(86)
          right 0
        &.i2
          width vwpx(213)
          top vwpx(421)
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
        .images img
          &.i1
            top vwpx(117)
          &.i2
            top vwpx(452)
    `}</style>
  </div>
)

const Brands = () => (
  <div className={langStyle('brands')}>
    <div className="text">
      <h2>{t('genres_3_brands_title')}</h2>
      <div className="t">{t('genres_3_brands_body')}</div>
      <div className="items">
        {t('genres_3_brands_items')?.split('\n\n').map(item => {
          const [name, link, desc] = item.split('\n')
          return <WorkLink key={link} name={name} link={link} desc={desc} />
        })}
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
          top vwpx(7)
          right 0
        &.i2
          width vwpx(337)
          top vwpx(253)
          right vwpx(38)
      .en
        &.brands
          margin-bottom vwpx(114)
          min-height vwpx(525)
        h2
          font-size vwpx(24)
        .t
          font-size 1.6rem
          margin-bottom 40px
        .images img
          &.i1
            top vwpx(25)
          &.i2
            top vwpx(272)
    `}</style>
  </div>
)

const Investment = () => (
  <div className={langStyle('investment')}>
    <div className="text">
      <h2>{t('genres_3_investment_title')}</h2>
      <div className="t">{t('genres_3_investment_body')}</div>
      <div className="items">
        {t('genres_3_investment_items')?.split('\n\n').map(item => {
          const [name, link, desc] = item.split('\n')
          return <WorkLink key={link} name={name} link={link} desc={desc} />
        })}
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
        margin-bottom vwpx(170)
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
          width vwpx(363)
          top vwpx(-20)
          right vwpx(160)
        &.i2
          width vwpx(375)
          top vwpx(313)
          right 0
      .en
        &.investment
          min-height vwpx(503)
          margin-bottom vwpx(153)
        h2
          font-size vwpx(24)
        .t
          font-size 1.6rem
        .images img
          &.i1
            top vwpx(-12)
          &.i2
            top vwpx(321)
    `}</style>
  </div>
)

const Section3 = () => (
  <div className={langStyle('section3')}>
    <SectionTitle num="03" nx={-5} title={t('genres_3_title')!} tx={{ ja: 1, en: 1 }} ty={{ ja: 24, en: -1 }} />
    <div className="content">
      <div className="t">{t('genres_3_body')}</div>
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
  <Layout title="About" side="About" backto="/about" footer={<Footer left="Location" right="Workstyle" />}>
    <div className="container">
      <Header title="Genres" subtitle={t('genres_title')!} desc={t('genres_description')!} image="/about/pict01.svg" iy={{ en: -21 }} />
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

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
