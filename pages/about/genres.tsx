import { GetStaticProps } from 'next'
import Link from 'next/link'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionHeader } from 'components/About'
import { Grad } from 'components/Grad'
import React from 'react'

const Section1 = () => (
  <div className={langStyle('section1')}>
    <hr />
    <SectionHeader num="01" title={t('genres_1_title')!} body={t('genres_1_body')!} />
    <div className="images">
      <img src="/about/genres/01_1@2x.jpg" alt="" className="i1" />
      <img src="/about/genres/01_2@2x.jpg" alt="" className="i2" />
      <img src="/about/genres/01_3@2x.jpg" alt="" className="i3" />
      <img src="/about/genres/01_4@2x.jpg" alt="" className="i4" />
    </div>
    <Grad><h2>{t('genres_1_example_title')}</h2></Grad>
    <div className="example-items">
      {t('genres_1_example_items')!.split('\n\n').map((item, index) => {
        const [title, ...desc] = item.split('\n')
        return (
          <div className="item" key={index}>
            <div className="title">- {title}</div>
            <ul>
              {desc.map((d, i) => (<li key={i}>{d}</li>))}
            </ul>
            <div>など</div>
          </div>
        )
      })}
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .section1
        margin-top vwpx(106)
        margin-left vwpx(80)
        margin-right vwpx(80)
        margin-bottom vwpx(238)
      hr
        margin 0
        border 0
        border-top 1px solid #B4B4B4
        width vwpx_min(252)
        margin-bottom vwpx(105)
      .images
        position relative
        height vwpx2(1230, 160)
        margin-bottom vwpx2(94, 160)
        img
          position absolute
          &.i1
            top 0
            left 0
            width vwpx2(912, 160)
          &.i2
            top vwpx2(435, 160)
            right vwpx2(-80, 160)
            width vwpx2(502, 160)
          &.i3
            top vwpx2(641, 160)
            left vwpx2(140, 160)
            width vwpx2(418, 160)
          &.i4
            top vwpx2(829, 160)
            right vwpx2(85, 160)
            width vwpx2(433, 160)
      h2
        font-size vwpx_min(20)
        font-weight bold
        margin 0
        margin-bottom vwpx(43)
        padding 0
        display inline-block
        overflow hidden
      .example-items
        display flex
        flex-wrap wrap
        align-items flex-start
        .item
          border-left 1px solid #B4B4B4
          padding-top 1.7rem
          padding-bottom 1.7rem
          padding-left 38px
          width 375px
          box-sizing border-box
          .title
            font-weight bold
            margin-bottom 2.0rem
          ul
            margin 0
            padding 0
            li
              list-style '・' inside
              margin-bottom 0.9rem
    `}</style>
  </div>
)

const Section2 = () => (
  <div className={langStyle('section2')}>
    <SectionHeader num="02" title={t('genres_2_title')!} body={t('genres_2_body')!} />
    <style jsx>{`
      @import 'lib/vw.styl'
      .section2
        margin-left vwpx(80)
        margin-right vwpx(80)
        margin-bottom vwpx(226)
    `}</style>
  </div>
)

const WorkLink = ({ name, link, desc }: { name: string, link: string, desc: string }) => {
  let image = link
  let target = ''
  if (link?.startsWith('http')) {
    image = link.split('/')[2].replace(/[^\w]+/g, '-')
    target = '_blank'
  } else {
    link = `/work/${link}`
  }
  return (
    <div className={langStyle('work-link')}>
      <Link href={link}>
        <a target={target} rel="noopener noreferrer">
          <img src={`/about/genres/${image}@2x.jpg`} alt="" />
          <div className="name">{name}</div>
          <div className="desc">{desc}</div>
        </a>
      </Link>
      <style jsx>{`
        @import 'lib/vw.styl'
        .work-link
          font-size 0
        a
          border none
          display block
        img
          width vwpx2(335, 160)
          height vwpx2(189, 160)
          object-fit cover
        .name
          font-size 1.8rem
          font-weight bold
          line-height 1.8rem
          margin-top 2.6rem
        .desc
          margin-top 1.7rem
          margin-right 2rem
          font-size 1.2rem
          line-height 2.4rem
      `}</style>
    </div>
  )
}

const WorkList = ({ title, body, items }: { title: string, body: string, items: string }) => (
  <div className={langStyle('work-list')}>
    <div className="text">
      <h2>{title}</h2>
      <div className="t">{body}</div>
      <div className="items">
        {items.split('\n\n').map(item => {
          const [name, link, desc] = item.split('\n')
          return <WorkLink key={link} name={name} link={link} desc={desc} />
        })}
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .work-list
        position relative
        margin-bottom vwpx(100)
      h2
        font-size vwpx_min(20)
        font-weight bold
        margin 0
        margin-bottom vwpx_min(30)
      .t
        margin-bottom 5.0rem
        font-size 1.5rem
        line-height 3.0rem
      .items
        display grid
        grid-template-columns repeat(3, 1fr)
        grid-gap vwpx2(38, 160) vwpx2(60, 160)
    `}</style>
  </div>
)

const Section3 = () => (
  <div className={langStyle('section3')}>
    <SectionHeader num="03" title={t('genres_3_title')!} body={t('genres_3_body')!} />
    <div className="images">
      <img src="/about/genres/03_1@2x.jpg" alt="" className="i1" />
      <img src="/about/genres/03_2@2x.jpg" alt="" className="i2" />
      <img src="/about/genres/03_3@2x.jpg" alt="" className="i3" />
    </div>
    <WorkList title={t('genres_3_inhouse_title')!} body={t('genres_3_inhouse_body')!} items={t('genres_3_inhouse_items')!} />
    <WorkList title={t('genres_3_brands_title')!} body={t('genres_3_brands_body')!} items={t('genres_3_brands_items')!} />
    <WorkList title={t('genres_3_investment_title')!} body={t('genres_3_investment_body')!} items={t('genres_3_investment_items')!} />
    {/* <Brands />
    <Investment /> */}
    <style jsx>{`
      @import 'lib/vw.styl'
      .section3
        position relative
        margin-left vwpx(80)
        margin-right vwpx(80)
        margin-bottom vwpx(190)
      .images
        position relative
        height vwpx2(1113, 160)
        margin-bottom vwpx2(75, 160)
        img
          position absolute
        .i1
          width vwpx2(1206, 160)
        .i2
          width vwpx2(470, 160)
          top vwpx2(694, 160)
          left vwpx2(113, 160)
        .i3
          width vwpx2(388, 160)
          top vwpx2(485, 160)
          left vwpx2(640, 160)
    `}</style>
  </div>
)

const GenrePage = () => (
  <Layout title="About" side="About" backto="/about" footer={<Footer left="Location" right="Workstyle" />}>
    <div className="container">
      <Header title="Genres" subtitle={t('genres_title')!} desc={t('genres_description')!} image="/about/pict01.svg" />
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
