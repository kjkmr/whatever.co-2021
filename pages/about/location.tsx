import { GetStaticProps } from 'next'
import Link from 'next/link'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionHeader } from 'components/About'
import BlackButton from 'components/BlackButton'
import React from 'react'

const Section1 = () => (
  <>
    <div className={langStyle('section1')}>
      <hr />
      <SectionHeader num="01" title={t('location_1_title')!} body={t('location_1_body')!} />
      <h2>{t('location_1_inhouse')}</h2>
      <div className="logos">
        <img src="/about/location/whill.png" alt="WILL" />
        <img src="/about/location/muji.png" alt="MIJI" />
        <img src="/about/location/sony.png" alt="SONY" />
        <img src="/about/location/cotodama.png" alt="Cotodama" />
        <img src="/about/location/avex.png" alt="avex group" />
      </div>
      <h2>{t('location_1_overseas')}</h2>
      <div className="logos" style={{ marginBottom: -1 }}>
        <img src="/about/location/slack.png" alt="Slack" />
        <img src="/about/location/shopify.png" alt="Shopify" />
        <img src="/about/location/airbnb.png" alt="Airbnb" />
        <img src="/about/location/google.png" alt="Google" />
        <img src="/about/location/hermes.png" alt="HERMES" /></div>
      <div className="logos2">
        <img src="/about/location/intel.png" alt="intel" />
        <img src="/about/location/newstand.png" alt="NEW STAND" />
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .section1
        margin-top vwpx(108)
        margin-bottom vwpx(128)
        margin-left vwpx(80)
        width vwpx(1126)
      hr
        margin 0
        border 0
        border-top 1px solid #B4B4B4
        width vwpx_min(252)
        margin-bottom vwpx(105)
      h2
        margin 5.6rem 0
        font-size vwpx_min(20)
      .logos, .logos2
        display grid
        grid-template-columns repeat(5, 1fr)
        grid-gap 0
        border 1px solid #CCCCCC
        margin-bottom 94px
        box-sizing border-box
        width vwpx2(1126, 240)
        img
          width 100%
          height vwpx2(124, 240)
          margin vwpx2(50, 240) 0
          object-fit cover
          border-right 1px solid #CCCCCC
          mix-blend-mode multiply
          &:last-child
            border none
      .logos2
        grid-template-columns repeat(2, 1fr)
        width vwpx2(452, 240)
      .en
        h2
          font-size vwpx_min(24)
    `}</style>
  </>
)

const Member = ({ image, title, name, slug }: { image: string, title: string, name: string, slug: string }) => (
  <>
    <Link href={`/team/${slug}`}>
      <a className={langStyle('member')}>
        <img src={`/about/location/${image}@2x.jpg`} alt="" />
        <div className="title">{title}</div>
        <div className="name">{name}</div>
      </a>
    </Link>
    <style jsx>{`
      @import 'lib/vw.styl'
      .member
        font-size 0
        display block
        border none
      img
        width vwpx(245)
      .title
        font-size 1.4rem
        font-weight 300
        line-height 1.4rem
        margin-top 1.9rem
      .name
        font-size 1.8rem
        font-weight 500
        line-height 1.8rem
        margin-top 1.2rem
    `}</style>
  </>
)

const Section2 = () => (
  <div className={langStyle('section2')}>
    <SectionHeader num="02" title={t('location_2_title')!} body={t('location_2_body')!} />
    <div className="members">
      {t('location_2_members')?.split('\n\n').map(member => {
        const [title, name, link] = member.split('\n')
        return <Member key={link} image={link} title={title} name={name} slug={link} />
      })}
    </div>
    <div className="link"><BlackButton link="/team" >All Members</BlackButton></div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .section2
        margin vwpx(236) vwpx(80) vwpx(150)
      .t
        line-height 3.0rem
        margin-top vwpx(43)
        width vwpx(1126)
      .members
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap vwpx(70) vwpx(75)
        margin-top vwpx(60)
      .link
        display flex
        justify-content flex-end
        margin-top vwpx(73)
        margin-right vwpx(-80)
      .en
        .t
          font-size 1.6rem
          margin-top vwpx(42)
        .members
          margin-top vwpx(61)
    `}</style>
  </div>
)

const Location = () => (
  <Layout title="About" side="About" backto="/about" footer={<Footer left="Workstyle" right="Genres" />}>
    <div className="container">
      <Header headerMargin={79} title="Location" subtitle={t('location_title')!} desc={t('location_description')!} image="/about/pict03.svg" imageWidth={554} />
      <Section1 />
      <Section2 />
    </div>
  </Layout>
)

export default Location

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
