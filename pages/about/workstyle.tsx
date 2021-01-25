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
      <SectionHeader num="01" title={t('workstyle_1_title')!} body={t('workstyle_1_body')!} />
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .section1
        margin-top vwpx(96)
        margin-left vwpx(80)
        margin-right vwpx(80)
      hr
        margin 0
        border 0
        border-top 1px solid #B4B4B4
        width vwpx_min(252)
        margin-bottom vwpx(105)
    `}</style>
  </>
)

type AllianceData = {
  name: string,
  link: string,
}

const AllianceData: { [key: string]: AllianceData } = {
  bassdrum: {
    name: 'Bassdrum',
    link: 'https://bassdrum.org/',
  },
  wtfc: {
    name: 'WTFC',
    link: 'https://wtfc.jp/',
  },
  cotodama: {
    name: 'Cotodama',
    link: 'https://lyric-speaker.com/company.html',
  },
  yummysake: {
    name: 'Yummy Sake',
    link: 'https://yummysake.jp/',
  },
  kasa: {
    name: 'KASA',
    link: 'https://kasa-made.com/',
  },
  newstand: {
    name: 'New Stand',
    link: 'https://www.newstand.com/',
  },
}

const Alliance = ({ slug }: { slug: string }) => {
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
      <div className="alliance">
        <Link href={AllianceData[slug].link}>
          <a ref={ref} target="_blank" rel="noopener noreferrer">
            <GradImg mouseEntered={entered}><img src={`/about/workstyle/${slug}@2x.png`} alt="" /></GradImg>
            <div><Grad className="name">{AllianceData[slug].name}</Grad></div>
            <div><Grad className="desc"><div dangerouslySetInnerHTML={{ __html: t(`workstyle_2_${slug}`)!.replace(/\n/g, '<br />') }}></div></Grad></div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .alliance
          font-size 0
          a
            display block
            border none
            padding 0
          img
            width vwpx(335)
            height vwpx(189)
            box-sizing border-box
            border 1px solid #cccccc
            object-fit cover
          :global(.name)
            font-size 1.8rem
            font-weight 500
            margin-top 2.5rem
            margin-bottom 1.6rem
          :global(.desc)
            font-size 1.2rem
            line-height 2.4rem
      `}</style>
    </>
  )
}


const Section2 = () => (
  <>
    <div className={langStyle('section2')}>
      <SectionHeader num="02" title={t('workstyle_2_title')!} body={t('workstyle_2_body')!} />
      <div className="alliance">
        {Object.keys(AllianceData).map(key => <Alliance key={key} slug={key} />)}
      </div>
    </div >
    <style jsx>{`
      @import 'lib/vw.styl'
      .section2
        margin vwpx(196) vwpx(80) vwpx(226)
      .alliance
        display grid
        grid-template-columns repeat(3, 1fr)
        grid-gap vwpx(54) vwpx(60)
        margin-top 3.9rem
    `}</style>
  </>
)

const ItemList = ({ title, items }: { title: string, items: string }) => (
  <>
    <div className={langStyle('about')}>
      <div><Grad className="title">{title}</Grad></div>
      <div className="items">
        {items.split('\n\n').map(item => {
          const [n, desc] = item.split('\n')
          return (<>
            <div><Grad className="name">- {n}</Grad></div>
            <div><Grad className="desc">{desc}</Grad></div>
          </>)
        })}
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .about
        font-size 0
        :global(.title)
          font-size vwpx_min(24)
          font-weight 700
        .items
          margin-top vwpx(37)
          display grid
          grid-template-columns 70px auto
          grid-gap 3.4rem 0
          :global(.name)
            font-size 1.8rem
            font-weight 500
            line-height 3.0rem
          :global(.desc)
            font-size var(--font-size-ja)
            line-height 3.0rem
    `}</style>
  </>
)

const Section3 = () => (
  <>
    <div className={langStyle('section3')}>
      <SectionHeader num="03" title={t('workstyle_3_title')!} body={t('workstyle_3_body')!} />
      <div className="images">
        <div className="i1"><GradImg><img src="/about/workstyle/03_1@2x.jpg" alt="" /></GradImg></div>
        <div className="i2"><GradImg><img src="/about/workstyle/03_2@2x.jpg" alt="" /></GradImg></div>
        <div className="i3"><GradImg><img src="/about/workstyle/03_3@2x.jpg" alt="" /></GradImg></div>
      </div>
      <div className="columns">
        <ItemList title="ABOUT：" items={t('workstyle_3_about')!} />
        <ItemList title="FEATURES：" items={t('workstyle_3_features')!} />
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .section3
        margin vwpx(117) vwpx(80) vwpx(190)
      .images
        position relative
        height vwpx2(1030, 160)
        margin-top vwpx2(60, 160)
        margin-bottom vwpx2(92, 160)
        >div
          position absolute
        img
          width 100%
        .i1
          width vwpx2(1206, 160)
        .i2
          width vwpx2(684, 160)
          top vwpx2(566, 160)
          right 0
        .i3
          width vwpx2(498, 160)
          top vwpx2(747, 160)
      .columns
        display grid
        grid-template-columns repeat(2, 1fr)
        grid-gap 80px
    `}</style>
  </>
)

const Workstyle = () => (
  <Layout title="About" side="About" backto="/about" footer={<Footer left="Genres" right="Location" />}>
    <Header headerMargin={65} title="Workstyle" titleSize={112} titleMargin={18} subtitle={t('workstyle_title')!} desc={t('workstyle_description')!} image="/about/pict02.svg" imageWidth={586} />
    <Section1 />
    <Section2 />
    <Section3 />
  </Layout>
)

export default Workstyle

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
