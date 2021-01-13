import { GetStaticProps } from 'next'
import Link from 'next/link'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionTitle } from 'components/About'

const Section1 = () => (
  <div className={langStyle('section1')}>
    <SectionTitle num="01" nx={-5} tx={{ ja: -4 }} ty={{ ja: 26 }} title={t('cultures_1_title')!} />
    <div className="t">{t('cultures_1_body')}</div>
    <h2>{t('cultures_1_inhouse')}<hr /></h2>
    <img className="logos1" src="/about/cultures/logos1@2x.png" alt="" />
    <h2>{t('cultures_1_overseas')}<hr /></h2>
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
      .en
        .t
          font-size 1.6rem
          line-height 3.2rem
          margin-top vwpx(41)
        h2
          font-size vwpx(24)
          hr
            margin-bottom 2px
        .logos1
          margin-top vwpx(38)
          margin-bottom vwpx(48)
        .logos2
          margin-top vwpx(69)
    `}</style>
  </div>
)

const Member = ({ image, title, name, slug }: { image: string, title: string, name: string, slug: string }) => (
  <Link href={`/team/${slug}`}>
    <a className={langStyle('member')}>
      <img src={`/about/cultures/${image}@2x.jpg`} alt="" />
      <div className="title">{title}</div>
      <div className="name">{name}</div>
      <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .member
        font-size 0
        display block
        border none
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
      .en
        .name
          font-size vwpx(24)
    `}</style>
    </a>
  </Link>
)

const Section2 = () => (
  <div className={langStyle('section2')}>
    <SectionTitle num="02" nx={-4} title={t('cultures_2_title')!} tx={{ ja: -3, en: 5 }} ty={{ ja: 27, en: 26 }} />
    <div className="t">{t('cultures_2_body')}</div>
    <div className="members">
      {t('cultures_2_members')?.split('\n\n').map(member => {
        const [title, name, link] = member.split('\n')
        return <Member key={link} image={link} title={title} name={name} slug={link} />
      })}
    </div>
    <div className="link"><Link href="/team"><a>All Members</a></Link></div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .section2
        margin-top vwpx(71)
        margin-left vwpx(80)
        margin-bottom vwpx(120)
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
        display flex
        justify-content flex-end
        margin-top vwpx(78)
        a
          display flex
          justify-content center
          align-items center
          width vwpx(256)
          height vwpx(60)
          font-size vwpx(18)
          font-weight bold
          letter-spacing 0.04em
          color white
          background-color black
          border none
      .en
        .t
          font-size 1.6rem
          line-height 3.2rem
          margin-top vwpx(41)
        .members
          margin-top vwpx(56)
    `}</style>
  </div>
)

const Cultures = () => (
  <Layout title="About" side="About" backto="/about" footer={<Footer left="Genres" right="Workstyle" />}>
    <div className="container">
      <Header title="Cultures" subtitle={t('cultures_title')!} desc={t('cultures_description')!} image="/about/cultures/head@2x.png" ty={{ en: 19 }} iy={{ ja: -15, en: -38 }} />
      <Section1 />
      <Section2 />
    </div>
  </Layout>
)

export default Cultures

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
