import React from 'react'
import { GetStaticProps } from 'next'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionHeader } from 'components/About'

const Section1 = () => (
  <div className={langStyle('section1')}>
    <SectionHeader num="01" nx={-5} title={t('workstyle_1_title')!} tx={{ ja: -5, en: -4 }} ty={{ ja: 26, en: 26 }} />
    <div className="t">{t('workstyle_1_body')}</div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .section1
        margin-top vwpx(85)
        margin-left vwpx(80)
      .t
        margin-top vwpx(43)
        margin-right vwpx(80)
        font-size 1.5rem
        line-height 3.0rem
      .en
        &.section1
          margin-top vwpx(110)
        .t
          margin-top vwpx(41)
          font-size 1.6rem
    `}</style>
  </div>
)

type AllianceData = {
  width: number
  height: number
  mt?: number
  mb?: number
}

const AllianceData: { [key: string]: AllianceData } = {
  bassdrum: {
    width: 178,
    height: 37,
  },
  wtfc: {
    width: 113,
    height: 32,
  },
  cotodama: {
    width: 229,
    height: 49,
    mb: 8,
  },
  yummysake: {
    width: 228,
    height: 35,
    mb: 8,
  },
  kasa: {
    width: 123,
    height: 39,
    mt: -2,
    mb: 8,
  },
  cradle: {
    width: 127,
    height: 46,
    mt: -1,
    mb: 7,
  },
  newstand: {
    width: 209,
    height: 22,
    mt: -6,
    mb: -6,
  },
}

const Alliance = ({ logo, data, desc }: { logo: string, data: AllianceData, desc: string }) => {
  const imageStyle = {
    width: `calc((100vw - 80px) * ${data.width / (1366 - 80)})`,
    height: `calc((100vw - 80px) * ${data.height / (1366 - 80)})`,
  }
  return (
    <div className="container">
      <div className="image" style={{
        // marginTop: `calc((100vw - 80px) * ${(data.mt || 0) / (1366 - 80)}`,
        // marginBottom: `calc((100vw - 80px) * ${(data.mb || 0) / (1366 - 80)}`,
      }}><img src={`/about/workstyle/${logo}@2x.png`} alt="" style={imageStyle} /></div>
      <div className="t" dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br />') }}></div>
      <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .t
        line-height 3.0rem
      .image
        display flex
        justify-content center
        align-items center
        width 100%
        height vwpx(120)
    `}</style>
    </div>
  )
}

const Section2 = () => (
  <div className={langStyle('section2')}>
    <SectionHeader num="02" nx={-5} title={t('workstyle_2_title')!} tx={{ ja: -3, en: -3 }} ty={{ ja: 28, en: 28 }} />
    <div className="t">{t('workstyle_2_body')}</div>
    <div className="alliance">
      {Object.keys(AllianceData).map(key => <Alliance key={key} logo={key} data={AllianceData[key]} desc={t(`workstyle_2_${key}`)!} />)}
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .section2
        margin-top vwpx(118)
        margin-left vwpx(80)
      .t
        line-height 3.0rem
        margin-top vwpx(39)
        margin-right vwpx(80)
      .alliance
        display grid
        grid-template-columns repeat(2, 1fr)
        grid-gap vwpx(57) vwpx(120)
        margin-top vwpx(47)
        margin-right vwpx(80)
      .en
        .t
          font-size 1.6rem
        .alliance
          margin-top vwpx(18)
          font-size 1.6rem
    `}</style>
  </div >
)

const Features = () => (
  <div className={langStyle('features')}>
    <h2>FEATURES：</h2>
    <div className="images">
      <img src="/about/workstyle/image@2x.jpg" alt="" className="i1" />
      <img src="/about/workstyle/Image 3@2x.jpg" alt="" className="i2" />
      <img src="/about/workstyle/image-1@2x.jpg" alt="" className="i3" />
    </div>
    <div className="items">
      {t('workstyle_3_features')?.split('\n\n').map(item => {
        const [n, desc] = item.split('\n')
        return (<div>
          <div className="name">- {n}</div>
          <div className="desc">{desc}</div>
        </div>)
      })}
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .features
        position relative
        margin-top vwpx(161)
        min-height vwpx(750)
      .images img
        position absolute
        &.i1
          width vwpx(546)
          top vwpx(-106)
          right 0
        &.i2
          width vwpx(427)
          top vwpx(250)
          right vwpx(80)
        &.i3
          width vwpx(288)
          top vwpx(461)
          right 0
      h2
        margin 0
        font-size vwpx(24)
      .items
        margin-top vwpx(46)
        width vwpx(525)
      .name
        font-size 1.5rem
        font-weight bold
      .desc
        margin-top 1.1rem
        margin-bottom 3.3rem
        margin-left 1.0rem
        line-height 3.0rem
      .en
        &.features
          margin-top vwpx(172)
        .items
          margin-top vwpx(45)
        .name
          font-size 1.6rem
        .desc
          font-size 1.6rem
          margin-top 1.0rem
    `}</style>
  </div>
)

const About = () => (
  <div className={langStyle('about')}>
    <div className="images">
      <img src="/about/workstyle/image 4@2x.jpg" alt="" />
    </div>
    <div className="text">
      <h2>ABOUT：</h2>
      <div className="items">
        {t('workstyle_3_about')?.split('\n\n').map(item => {
          const [n, desc] = item.split('\n')
          return (<div>
            <div className="name">- {n}</div>
            <div className="desc">{desc}</div>
          </div>)
        })}
      </div>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .about
        margin-top vwpx(105)
        display flex
      .images img
        width vwpx(523)
      .text
        margin-left vwpx(80)
        margin-top vwpx(-8)
      h2
        margin 0
        font-size vwpx(24)
      .items
        margin-top vwpx(46)
        width vwpx(525)
      .name
        font-size 1.5rem
        font-weight bold
      .desc
        margin-top 1.1rem
        margin-bottom 3.3rem
        margin-left 1.0rem
        line-height 3.0rem
      .en
        .items
          margin-top vwpx(45)
        .name
          font-size 1.6rem
        .desc
          font-size 1.6rem
          margin-top 1.0rem
    `}</style>
  </div>
)

const Section3 = () => (
  <div className={langStyle('section3')}>
    <SectionHeader num="03" nx={-5} title={t('workstyle_3_title')!} tx={{ ja: -3, en: -3 }} ty={{ ja: 24, en: 24 }} />
    <div className="t">{t('workstyle_3_body')}</div>
    <Features />
    <About />
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .section3
        position relative
        margin-top vwpx(117)
        margin-left vwpx(80)
        margin-bottom vwpx(110)
        >img
          position absolute
      .t
        font-size 1.5rem
        line-height 3.0rem
        margin-top vwpx(33)
        margin-right vwpx(80)
      .en
        &.section3
          margin-top vwpx(87)
        .t
          font-size 1.6rem
          margin-top vwpx(32)
    `}</style>
  </div>
)

const Workstyle = () => (
  <Layout title="About" side="About" backto="/about" footer={<Footer left="Genres" right="Location" />}>
    <Header title="Workstyle" subtitle={t('workstyle_title')!} desc={t('workstyle_description')!} image="/about/pict02.svg" ty={{ ja: -19, en: -19 }} iy={{ en: -21 }} />
    <Section1 />
    <Section2 />
    <Section3 />
  </Layout>
)

export default Workstyle

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
