import { useRef, useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionHeader } from 'components/About'
import { Grad, GradImg } from 'components/Grad'

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
      <h2><Grad className="example-title" inline>{t('genres_1_example_title')}</Grad></h2>
      <div className="example-items">
        {t('genres_1_example_items')!.split('\n\n').map((item, index) => {
          const [title, ...desc] = item.split('\n')
          const etc = desc.pop()
          return (
            <div key={index}>
              <Grad inline>
                <div className="item">
                  <div className="title">- {title}</div>
                  <ul>
                    {desc.map((d, i) => (<li key={i}>・{d}</li>))}
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
        height vwpx(1230)
        margin-top vwpx(60)
        margin-bottom vwpx(94)
        >div
          position absolute
        img
          width 100%
        .i1
          top 0
          left 0
          width vwpx(912)
        .i2
          top vwpx(435)
          right vwpx(-80)
          width vwpx(502)
        .i3
          top vwpx(641)
          left vwpx(140)
          width vwpx(418)
        .i4
          top vwpx(829)
          right vwpx(85)
          width vwpx(433)
      h2
        margin 0
        margin-bottom vwpx_min(46)
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
              list-style-position inside
              list-style-type none
              margin-bottom 0.9rem
      .en
        h2
          margin-top vwpx_min(100)
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
                &:last-child
                  margin 0
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .section1
          margin 4.1rem 0 0 0
        hr
          width vwpx(125)
          margin-bottom vwpx(40)
        .images
          height vwpx(702)
          margin 2.6rem 0 0 0
          .i1
            top 0
            left 0
            width vwpx(325)
          .i2
            top vwpx(205)
            right vwpx(30)
            width vwpx(195)
          .i3
            top vwpx(362)
            left vwpx(25)
            width vwpx(184)
          .i4
            top vwpx(610)
            right vwpx(50)
            width vwpx(162.5)
        h2
          margin 0
          margin-top 5.6rem
          :global(.example-title)
            font-size vwpx(14)
        .example-items
          margin-top 2.8rem
          display flex
          flex-direction column
          .item
            padding-top 1.2rem
            padding-bottom 0.2rem
            padding-left 1.8rem
            margin-bottom 1.9rem
            .title
              margin-bottom 1.35rem
            ul li
              margin-left 0.1rem
              margin-bottom 0.8rem
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
      @media (--mobile)
        .section2
          margin 7.2rem 0 0 0
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
            <div><Grad className="work-link-name" inline>{name}</Grad></div>
            <div><Grad className="work-link-desc" inline>{desc}</Grad></div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .work-link
          font-size 0
          a
            display block
            border none
            padding 0
          img
            width vwpx(335)
            height vwpx(189)
            object-fit cover
          :global(.work-link-name)
            font-size 1.8rem
            font-weight 700
            line-height 1.0
            margin-top 2.5rem
          :global(.work-link-desc)
            margin-top 1.7rem
            font-size 1.2rem
            line-height 2.0
        .en
          :global(.work-link-name)
            font-weight 500
          :global(.work-link-desc)
            font-size 1.4rem
            font-weight 200
            line-height 1.75
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .work-link
            img
              width vwpx(150)
              height vwpx(150 / 16 * 9)
            :global(.work-link-name)
              font-size 1.4rem
              margin-top 1.55rem
            :global(.work-link-desc)
              font-size 1.0rem
              line-height 1.8
              margin-top 0.6rem
              margin-right vwpx(12.5)
      `}</style>
    </>
  )
}

const WorkList = ({ title, body, items }: { title: string, body: string, items: string }) => (
  <>
    <div className={langStyle('work-list')}>
      <div className="text">
        <div><Grad className="work-list-title" inline>{title}</Grad></div>
        <div><Grad className="work-list-desc" inline>{body}</Grad></div>
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
          line-height 2.0
      .items
        display grid
        grid-template-columns repeat(3, 1fr)
        grid-gap vwpx(52) vwpx(60)
      .en
        :global(.work-list-title)
          font-size vwpx_min(24)
        :global(.work-list-desc)
          font-size var(--font-size-en)
          font-weight 200
          line-height 1.8
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .work-list
          margin 5.6rem 0 0 0
          font-size 0
          .text
            margin-right vwpx(30)
          :global(.work-list-title)
            margin 0
            font-size 1.4rem
          :global(.work-list-desc)
            margin 2.35rem 0 0 0
            line-height 2.1
        .items
          grid-template-columns repeat(2, 1fr)
          grid-gap vwpx(24.5) vwpx(25)
          margin 3.0rem 0 0 0
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
        margin 0 vwpx(80) vwpx(170)
      .images
        position relative
        height vwpx(1113)
        margin-top vwpx(60)
        margin-bottom vwpx(100)
        >div
          position absolute
        img
          width 100%
        .i1
          width vwpx(1206)
        .i2
          width vwpx(470)
          top vwpx(694)
          left vwpx(113)
        .i3
          width vwpx(388)
          top vwpx(485)
          left vwpx(640)
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .section3
          margin 5.7rem 0 0 0
        .images
          height vwpx(464)
          margin 2.6rem 0 0 0
          .i1
            width vwpx(325)
          .i2
            width vwpx(173)
            top vwpx(366)
            left auto
            right vwpx(0)
            z-index 3
          .i3
            width vwpx(157.5)
            top vwpx(170)
            left vwpx(37)
    `}</style>
  </>
)

const GenrePage = () => (
  <>
    <Layout title="About" side="About" backto="/about" footer={<Footer left="Location" right="Workstyle" />}>
      <div className="genre">
        <Header title="Genres" subtitle={t('genres_title')!} desc={t('genres_description')!} image="pict01" />
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </Layout>
    <style jsx>{`
      .genre
        margin-bottom 110px
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .genre
          margin vwpx(75) 0 70px 0
    `}</style>
  </>
)

export default GenrePage

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
