import React from 'react'
import { t, LangStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionTitle } from 'components/About'

const Section1 = () => (
  <div className={LangStyle('section1')}>
    <SectionTitle num="01" nx={-5} title={t('about.workstyle.1.title')} tx={{ ja: -5, en: -4 }} ty={{ ja: 26, en: 26 }} />
    <div className="t">{t('about.workstyle.1.body')}</div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .section1
        margin-top vwpx(120)
        margin-left vwpx(80)
      .t
        margin-top vwpx(43)
        margin-right vwpx(80)
        font-size 1.5rem
        line-height 3.0rem
      .en .t
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
  <div className={LangStyle('section2')}>
    <SectionTitle num="02" nx={-5} title={t('about.workstyle.2.title')} tx={{ ja: -3, en: -3 }} ty={{ ja: 28, en: 28 }} />
    <div className="t">{t('about.workstyle.2.body')}</div>
    <div className="alliance">
      {Object.keys(AllianceData).map(key => <Alliance key={key} logo={key} data={AllianceData[key]} desc={t(`about.workstyle.2.alliances.${key}`)} />)}
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

const Section3 = () => (
  <div className="container">
    <SectionTitle num="03" nx={-5} title="Management of the<br/>Creative Commune" tx={{ ja: -16 }} />
    <div className="t">As a place for these rich members to meet, we are jointly managing the creative commune WHEREVER with WTFC. In addition to serving as a base for Whatever, WTFC and Bassdrum, WHEREVER also functions as a place for cross-pollination of various creative staff through the shared office space on the 5th floor and New Stand Tokyo on the 1st floor.</div>
    <style jsx>{`
      .container
        position relative
        margin-top 117px
        margin-left 80px
        margin-bottom 295px
        >img
          position absolute
      .t
        font-size 1.6rem
        line-height 3.0rem
        margin-top 31px
        margin-right 80px
    `}</style>
  </div>
)

const Profession = () => (
  <Layout title="About" footer={<Footer left="Cultures" right="Genres" />}>
    <Header title="Workstyle" subtitle={t('about.workstyle.title')} desc={t('about.workstyle.description')} image="/about/workstyle/head@2x.png" ty={{ ja: 1 }} iy={{ ja: -22, en: -44 }} />
    <Section1 />
    <Section2 />
    <Section3 />
    <style jsx>{`
    `}</style>
  </Layout>
)

export default Profession
