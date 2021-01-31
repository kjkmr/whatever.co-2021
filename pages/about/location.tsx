import { useRef, useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionHeader } from 'components/About'
import BlackButton from 'components/BlackButton'
import { Grad, GradImg } from 'components/Grad'


const LogoGridDesktop = ({ list, className = '' }: { list: string[], className?: string }) => (
  <>
    <div className={`logo-grid ${className}`}>
      {list.map((name) => (
        <div key={name} className="inner"><Grad className="image" inline><img src={`/about/location/${name.replace(/[^\w+]/g, '').toLowerCase()}.png`} alt={name} /></Grad></div>
      ))}
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .logo-grid
        display grid
        grid-template-columns repeat(5, 1fr)
        grid-gap 0
        border 1px solid #cccccc
        box-sizing border-box
        width 100%
        .inner
          display flex
          justify-content center
          margin vwpx(49) 0
          padding vwpx(25) 0
          border-right 1px solid #cccccc
          &:last-child
            border none
        :global(.image)
          width calc(100% * (175 / 225))
          img
            box-sizing border-box
            margin auto
            width 100%
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .logo-grid
          display none
          margin-right vwpx(50)
          grid-template-columns repeat(2, 1fr)
          width vwpx(275)
          .inner
            margin vwpx(25) 0
            padding vwpx(14) 0
            box-sizing border-box
          :global(.image)
            width 100%
    `}</style>
  </>
)

const LogoGridMobile = ({ list, className = '' }: { list: string[], className?: string }) => {
  if (list.length % 2 == 1) {
    list.push('')
  }
  return (
    <>
      <div className={`logo-grid ${className}`}>
        {list.map((name) => (
          <div key={name} className="inner">
            <Grad className="image" inline>
              <img src={`/about/location/${name.replace(/[^\w+]/g, '').toLowerCase()}.png`} alt={name} />
            </Grad>
            <div className="line"></div>
          </div>
        ))}
      </div>
      <style jsx>{`
      @import 'lib/vw.styl'
      .logo-grid
        display none
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .logo-grid
          display grid
          grid-template-columns repeat(2, 1fr)
          grid-gap 0
          border 1px solid #cccccc
          box-sizing border-box
          width vwpx(275)
          .inner
            position relative
            display flex
            justify-content center
            align-items center
            width vwpx(137.5)
            height vwpx(136.5)
            border-bottom 1px solid #cccccc
            &:nth-last-child(-n+2)
              border none
            .line
              position absolute
              top vwpx(25)
              right 0
              height vwpx(87.5)
              border-left 1px solid #cccccc
            &:nth-child(even) .line
              display none
          :global(.image)
            box-sizing border-box
            width 100%
            padding 0 vwpx(5)
            margin-right 2px
            img
              width 100%
    `}</style>
    </>
  )
}

const Section1 = () => (
  <>
    <div className={langStyle('section1')}>
      <hr />
      <SectionHeader num="01" title={t('location_1_title')!} body={t('location_1_body')!} />
      <div><Grad className="subtitle" inline>{t('location_1_inhouse')}</Grad></div>
      <LogoGridDesktop className="logo1" list={['WHILL', 'MUJI', 'SONY', 'Cotodama', 'avex group']} />
      <LogoGridMobile className="logo1" list={['WHILL', 'MUJI', 'SONY', 'Cotodama', 'avex group']} />
      <div><Grad className="subtitle" inline>{t('location_1_overseas')}</Grad></div>
      <LogoGridDesktop className="logo2" list={['Slack', 'Shopify', 'Airbnb', 'Google', 'HERMES']} />
      <LogoGridDesktop className="logo3" list={['intel', 'NEW STAND']} />
      <LogoGridMobile list={['Slack', 'Shopify', 'Airbnb', 'Google', 'HERMES', 'intel', 'NEW STAND']} />
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .section1
        margin vwpx(108) vwpx(80) vwpx(128)
        font-size 0
        hr
          margin 0
          border 0
          border-top 1px solid #b4b4b4
          width vwpx_min(252)
          margin-bottom vwpx(105)
        :global(.subtitle)
          margin 5.6rem 0
          font-size vwpx_min(20)
          font-weight 700
        :global(.logo1)
          margin-bottom 4.0rem
        :global(.logo2)
          margin-bottom -1px
        :global(.logo3)
          grid-template-columns repeat(2, 1fr)
          width vwpx(450.5)
      .en
        :global(.subtitle)
          font-size vwpx_min(24)
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .section1
          margin 4.1rem 0 0 0
          hr
            width vwpx(125)
            margin-bottom vwpx(40)
          :global(.subtitle)
            margin 2.15rem vwpx(50) 2.2rem 0
            font-size 1.5rem
            line-height 1.7
          :global(.logo1)
            margin-bottom 2.55rem
    `}</style>
  </>
)

const Member = ({ image, title, name, slug }: { image: string, title: string, name: string, slug: string }) => {
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
      <Link href={`/team/${slug}`}>
        <a ref={ref} className={langStyle('member')}>
          <div><GradImg mouseEntered={entered}><img src={`/about/location/${image}@2x.jpg`} alt="" /></GradImg></div>
          <div><Grad className="title" inline>{title}</Grad></div>
          <div><Grad className="name" inline>{name}</Grad></div>
        </a>
      </Link>
      <style jsx>{`
        @import 'lib/vw.styl'
        .member
          display block
          padding 0
          border none
          font-size 0
          img
            width vwpx(245)
          :global(.title)
            font-size 1.4rem
            font-weight 300
            line-height 1.0
            margin-top 1.9rem
          :global(.name)
            font-size 1.8rem
            font-weight 500
            line-height 1.0
            margin-top 1.2rem
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .member
            img
              width vwpx(150)
            :global(.title)
              font-size 1.2rem
              font-weight 300
              margin-top 1.25rem
              line-height 1.4
            :global(.name)
              font-size 1.4rem
              font-weight 500
              margin-top 0.5rem
      `}</style>
    </>
  )
}

const Section2 = () => (
  <>
    <div className={langStyle('section2')}>
      <SectionHeader num="02" title={t('location_2_title')!} body={t('location_2_body')!} />
      <div className="members">
        {t('location_2_members')?.split('\n\n').map(member => {
          const [title, name, link] = member.split('\n')
          return <Member key={link} image={link} title={title} name={name} slug={link} />
        })}
      </div>
      <div className="link"><BlackButton link="/team" >All Members</BlackButton></div>
    </div>
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
        grid-gap vwpx(75)
        margin-top vwpx(60)
      .link
        display flex
        justify-content flex-end
        margin-top vwpx(78)
        margin-right vwpx(-80)
      .en
        .t
          font-size 1.6rem
          margin-top vwpx(42)
        .members
          margin-top vwpx(61)
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .section2
          margin 9.1rem 0 0 0
        .members
          grid-template-columns repeat(2, 1fr)
          grid-gap vwpx(48) vwpx(25)
          margin-top 2.55rem
        .link
          margin vwpx(42) 0 0 0
    `}</style>
  </>
)

const Location = () => (
  <>
    <Layout title="About" side="About" backto="/about" footer={<Footer left="Workstyle" right="Genres" />}>
      <div className="location">
        <Header headerMargin={79} title="Location" subtitle={t('location_title')!} desc={t('location_description')!} image="/about/pict03.svg" imageWidth={554} imageMargin={5} />
        <Section1 />
        <Section2 />
      </div>
    </Layout>
    <style jsx>{`
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .location
          margin vwpx(75) 0 76px vwpx(50)
    `}</style>
  </>
)

export default Location

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
