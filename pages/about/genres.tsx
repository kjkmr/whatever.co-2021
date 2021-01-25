import { useRef, useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionHeader } from 'components/About'
import { Grad, GradImg } from 'components/Grad'
import React from 'react'

const Section1 = () => (
  <>
    <div className={langStyle('section1')}>
      <hr />
      <SectionHeader num="01" title={t('genres_1_title')!} body={t('genres_1_body')!} />
      <div className="images">
        <div className="i1"><GradImg><img src="/about/genres/01_1@2x.jpg" alt="" /></GradImg></div>
        <div className="i2"><GradImg><img src="/about/genres/01_2@2x.jpg" alt="" /></GradImg></div>
        <div className="i3"><GradImg><img src="/about/genres/01_3@2x.jpg" alt="" /></GradImg></div>
        <div className="i4"><GradImg><img src="/about/genres/01_4@2x.jpg" alt="" /></GradImg></div>
      </div>
      <h2><Grad className="example-title">{t('genres_1_example_title')}</Grad></h2>
      <div className="example-items">
        {t('genres_1_example_items')!.split('\n\n').map((item, index) => {
          const [title, ...desc] = item.split('\n')
          const etc = desc.pop()
          return (
            <div key={index}>
              <Grad>
                <div className="item">
                  <div className="title">- {title}</div>
                  <ul>
                    {desc.map((d, i) => (<li key={i}>{d}</li>))}
                  </ul>
                  <div>{etc}</div>
                </div>
              </Grad>
            </div>
          )
        })}
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .section1
        margin vwpx(106) vwpx(80) vwpx(238)
        font-size 0
      hr
        margin 0
        border 0
        border-top 1px solid #B4B4B4
        width vwpx_min(252)
        margin-bottom vwpx(105)
      .images
        position relative
        height vwpx2(1230, 160)
        margin-top vwpx2(60, 160)
        margin-bottom vwpx2(94, 160)
        >div
          position absolute
        img
          width 100%
        .i1
          top 0
          left 0
          width vwpx2(912, 160)
        .i2
          top vwpx2(435, 160)
          right vwpx2(-80, 160)
          width vwpx2(502, 160)
        .i3
          top vwpx2(641, 160)
          left vwpx2(140, 160)
          width vwpx2(418, 160)
        .i4
          top vwpx2(829, 160)
          right vwpx2(85, 160)
          width vwpx2(433, 160)
      h2
        margin 0
        margin-bottom vwpx(46)
        padding 0
        font-size 0
        :global(.example-title)
          font-size vwpx_min(20)
          font-weight 700
      .example-items
        display grid
        grid-template-columns repeat(3, 1fr)
        grid-gap 0
        align-items start
        .item
          display inline-block
          border-left 1px solid #B4B4B4
          padding-top 1.7rem
          padding-bottom 1.7rem
          padding-left 3.8rem
          box-sizing border-box
          font-size var(--font-size-ja)
          .title
            font-weight 700
            margin-bottom 2.0rem
          ul
            margin 0
            padding 0
            display inline-block
            li
              list-style '・' inside
              margin-bottom 0.9rem
      .en
        h2
          :global(.example-title)
            font-size vwpx_min(24)
        .example-items
          .item
            padding-top 2.0rem
            padding-left 3.9rem
            padding-bottom 1.1rem
            font-size var(--font-size-en)
            font-weight 200
            .title
              margin-bottom 2.4rem
            ul
              margin-bottom 1.1rem
              li
                line-height 1.25em
    `}</style>
  </>
)

const Section2 = () => (
  <>
    <div className={langStyle('section2')}>
      <SectionHeader num="02" title={t('genres_2_title')!} body={t('genres_2_body')!} />
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .section2
        margin-left vwpx(80)
        margin-right vwpx(80)
        margin-bottom vwpx(195)
    `}</style>
  </>
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
  const ref = useRef<HTMLAnchorElement>(null)
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const node = ref.current!
    const onMouseEnter = () => setEntered(true)
    const onMouseLeave = () => setEntered(false)
    node.addEventListener('mouseenter', onMouseEnter)
    node.addEventListener('mouseleave', onMouseLeave)
    return () => {
      node.removeEventListener('mouseenter', onMouseEnter)
      node.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])
  return (
    <>
      <div className={langStyle('work-link')}>
        <Link href={link}>
          <a ref={ref} target={target} rel="noopener noreferrer">
            <GradImg mouseEntered={entered}><img src={`/about/genres/${image}@2x.jpg`} alt="" /></GradImg>
            <div><Grad className="work-link-name">{name}</Grad></div>
            <div><Grad className="work-link-desc">{desc}</Grad></div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .work-link
          font-size 0
          a
            display inline-block
            border none
            padding 0
          img
            width vwpx2(335, 160)
            height vwpx2(189, 160)
            object-fit cover
          :global(.work-link-name)
            font-size 1.8rem
            font-weight 700
            line-height 1.8rem
            margin-top 2.5rem
          :global(.work-link-desc)
            display inline-block
            margin-top 1.7rem
            font-size 1.2rem
            line-height 2.4rem
        .en
          :global(.work-link-desc)
            font-size 1.4rem
            font-weight 400
      `}</style>
    </>
  )
}

const WorkList = ({ title, body, items }: { title: string, body: string, items: string }) => (
  <>
    <div className={langStyle('work-list')}>
      <div className="text">
        <div><Grad className="work-list-title">{title}</Grad></div>
        <div><Grad className="work-list-desc">{body}</Grad></div>
        <div className="items">
          {items.split('\n\n').map(item => {
            const [name, link, desc] = item.split('\n')
            return <WorkLink key={link} name={name} link={link} desc={desc} />
          })}
        </div>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .work-list
        position relative
        margin-bottom vwpx(110)
        font-size 0
        :global(.work-list-title)
          font-size vwpx_min(20)
          font-weight 700
          margin 0
          margin-bottom vwpx_min(30)
        :global(.work-list-desc)
          margin-bottom 5.2rem
          font-size var(--font-size-ja)
          line-height 3.0rem
      .items
        display grid
        grid-template-columns repeat(3, 1fr)
        grid-gap vwpx2(52, 160) vwpx2(60, 160)
      .en
        :global(.work-list-title)
          font-size vwpx_min(24)
        :global(.work-list-desc)
          font-size var(--font-size-en)
          font-weight 400
    `}</style>
  </>
)

const Section3 = () => (
  <>
    <div className={langStyle('section3')}>
      <SectionHeader num="03" title={t('genres_3_title')!} body={t('genres_3_body')!} />
      <div className="images">
        <div className="i1"><GradImg><img src="/about/genres/03_1@2x.jpg" alt="" /></GradImg></div>
        <div className="i2"><GradImg><img src="/about/genres/03_2@2x.jpg" alt="" /></GradImg></div>
        <div className="i3"><GradImg><img src="/about/genres/03_3@2x.jpg" alt="" /></GradImg></div>
      </div>
      <WorkList title={t('genres_3_inhouse_title')!} body={t('genres_3_inhouse_body')!} items={t('genres_3_inhouse_items')!} />
      <WorkList title={t('genres_3_brands_title')!} body={t('genres_3_brands_body')!} items={t('genres_3_brands_items')!} />
      <WorkList title={t('genres_3_investment_title')!} body={t('genres_3_investment_body')!} items={t('genres_3_investment_items')!} />
    </div>
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
        margin-top vwpx2(60, 160)
        margin-bottom vwpx2(100, 160)
        >div
          position absolute
        img
          width 100%
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
  </>
)

const GenrePage = () => (
  <>
    <Layout title="About" side="About" backto="/about" footer={<Footer left="Location" right="Workstyle" />}>
      <div className="container">
        <Header title="Genres" subtitle={t('genres_title')!} desc={t('genres_description')!} image="/about/pict01.svg" />
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </Layout>
    <style jsx>{`
      .container
        min-height 5000px
        margin-bottom 110px
    `}</style>
  </>
)

export default GenrePage

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
