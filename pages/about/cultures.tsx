import Link from 'next/link'
import { t, ta, LangStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionTitle } from 'components/About'

const Section1 = () => (
  <div className="section1">
    <SectionTitle num="01" nx={-5} tx={{ ja: -4 }} ty={{ ja: 26 }} title={t('about.cultures.1.title')} />
    <div className="t">{t('about.cultures.1.body')}</div>
    <h2>{t('about.cultures.1.inhouse')}<hr /></h2>
    <img className="logos1" src="/about/cultures/logos1@2x.png" alt="" />
    <h2>{t('about.cultures.1.overseas')}<hr /></h2>
    <img className="logos2" src="/about/cultures/logos2@2x.png" alt="" />
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .section1
        margin-top vwpx(113)
        margin-bottom vwpx(128)
        margin-left vwpx(80)
        width vwpx(1126)
      .t
        line-height 3.0rem
        margin-top vwpx(43)
        margin-bottom vwpx(56)
      h2
        margin 0
        font-size vwpx(20)
        display flex
        justify-content space-between
        align-items center
        white-space nowrap
        hr
          margin 0
          border none
          border-top 1px solid black
          width 100%
          margin-left vwpx(50)
      .logos1
        display block
        width vwpx(1027)
        margin-left vwpx(70)
        margin-top vwpx(37)
        margin-bottom vwpx(44)
      .logos2
        display block
        width vwpx(1004)
        margin-left vwpx(61)
        margin-top vwpx(68)
    `}</style>
  </div>
)

const Member = ({ image, title, name }: { image: string, title: string, name: string }) => (
  <div className="member">
    <img src={`/about/cultures/${image}@2x.jpg`} alt="" />
    <div className="title">{title}</div>
    <div className="name">{name}</div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .member
        font-size 0
      img
        width vwpx(245)
      .title
        font-size vwpx(14)
        font-weight light
        line-height vwpx(14)
        margin-top vwpx(20)
      .name
        font-size vwpx(20)
        font-weight bold
        line-height vwpx(20)
        margin-top vwpx(12)
    `}</style>
  </div>
)

const Section2 = () => (
  <div className="section2">
    <SectionTitle num="02" nx={-4} title={t('about.cultures.2.title')} tx={{ ja: -3 }} ty={{ ja: 27 }} />
    <div className="t">{t('about.cultures.2.body')}</div>
    <div className="members">
      {ta('about.cultures.2.members').map(m => <Member key={m.slug} image={m.slug} title={m.title} name={m.name} />)}
    </div>
    <div className="link"><Link href="/team"><a>All Members</a></Link></div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .section2
        margin-top vwpx(71)
        margin-left vwpx(80)
        margin-bottom vwpx(137)
      .t
        line-height 3.0rem
        margin-top vwpx(43)
        width vwpx(1126)
      .members
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap vwpx(71) vwpx(75)
        margin-top vwpx(60)
      .link
        margin-top 85px
        padding-right 79px
        text-align right
        a
          font-size 18px
          font-weight 700
          padding-bottom 6px
          padding-right 60px
          border-bottom 1px solid red
    `}</style>
  </div>
)

const Cultures = () => (
  <Layout title="About" footer={<Footer left="Genres" right="Workstyle" />}>
    <div className="container">
      <Header title="Cultures" subtitle={t('about.cultures.title')} desc={t('about.cultures.description')} image="/about/cultures/head@2x.png" iy={-15} />
      <Section1 />
      <Section2 />
    </div>
  </Layout>
)

export default Cultures
