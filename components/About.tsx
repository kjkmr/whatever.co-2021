import Link from 'next/link'
import { useRouter } from 'next/router'
import { langStyle } from 'lib/i18n'
import { Grad, GradImg } from './Grad'
import React from 'react'

type HeaderProps = {
  headerMargin?: number
  title: string
  titleSize?: number
  titleMargin?: number
  subtitle: string
  desc: string
  image: string
  imageWidth?: number
  ty?: { [locale: string]: number }
  iy?: { [locale: string]: number }
}

export const Header = (props: HeaderProps) => {
  const { ty, iy } = props
  const router = useRouter()
  const locale = router.locale || router.defaultLocale!
  const headerStyle = {
    marginTop: `calc((100vw - 80px) * ${(props.headerMargin || 55) / (1366 - 80)})`,
    marginBottom: `calc((100vw - 80px) * ${(props.headerMargin || 55) / (1366 - 80)})`,
  }
  const textStyle = {
    marginTop: `calc((100vw - 80px) * ${(ty && ty[locale] ? ty[locale] : 0) / (1366 - 80)})`,
  }
  const titleStyle = {
    fontSize: `calc((100vw - 80px) * ${(props.titleSize || 124) / (1366 - 80)})`,
    marginTop: `calc((100vw - 80px) * ${(props.titleMargin || 8) / (1366 - 80)})`,
  }
  const imageStyle = {
    marginTop: `calc((100vw - 80px) * ${(iy && iy[locale] ? iy[locale] : 0) / (1366 - 80)})`,
    width: `calc((100vw - 80px) * ${(props.imageWidth || 607) / (1366 - 80)})`,
  }
  return (
    <>
      <div className={langStyle('header')} style={headerStyle}>
        <div className="upper">
          <div className="text" style={textStyle}>
            <Grad><div className="t1">Whatever</div></Grad>
            <Grad><div className="t2" style={titleStyle}>{props.title}</div></Grad>
            {props.subtitle != '-' ? <Grad><div className="t3" ><span className="hr" />{props.subtitle}</div></Grad> : null}
          </div>
          <div className="image" >
            <GradImg lighten={true}>
              <img src={props.image} alt="" style={imageStyle} />
            </GradImg>
          </div>
        </div>
        <div className="desc">
          {props.desc.split('\n').map((line, index) => <Grad key={index}><div className="desc-line">{line}</div></Grad>)}
        </div>
      </div >
      <style jsx>{`
        @import 'lib/vw.styl'
        .header
          font-size 0
          margin vwpx(55) vwpx(80) 0
        .upper
          display flex
          justify-content space-between
          align-items center
          margin-bottom vwpx(101)
        .text
          width vwpx(562)
          margin-bottom 9px
        .t1
          display inline-block
          font-size vwpx(62)
          font-weight bold
          margin 0
          margin-left vwpx(2)
        .t2
          display inline-block
          {/* font-size vwpx(124) */}
          font-weight bold
          margin 0
          margin-top vwpx(8)
          margin-left vwpx(-4)
          margin-bottom vwpx(56)
        .t3
          display inline-block
          font-size vwpx(30)
          font-weight bold
          margin 0
          .hr
            display inline-block
            border-top 1px solid #707070
            width vwpx(70)
            margin-right vwpx(27)
            margin-bottom vwpx(9)
        .image
          font-size 0
          margin-right vwpx(34)
          img
            width vwpx(607)
            background-color white
        .desc-line
          display inline-block
          font-size vwpx_min(18)
          font-weight 700
          line-height vwpx_min(40)
        .en
          .upper
            margin-bottom vwpx(103)
          .t1
            font-size vwpx(64)
          .t2
            margin-bottom vwpx(16)
          .desc
            font-weight 400
      `}</style>
    </>
  )
}

export const Footer = ({ left, right }: { left: string, right: string }) => (
  <div className="footer">
    <Link href={`/about/${left.toLowerCase()}`}>
      <a style={{ borderRight: '1px solid #333' }}>
        <div className="line"></div>
        <div style={{ marginLeft: 40 }}>
          <div className="whatever">Whatever</div>
          <div className="title">{left}</div>
        </div>
      </a>
    </Link>
    <Link href={`/about/${right.toLowerCase()}`}>
      <a style={{ justifyContent: 'flex-end' }}>
        <div style={{ marginRight: 40, textAlign: 'right' }}>
          <div className="whatever">Whatever</div>
          <div className="title">{right}</div>
        </div>
        <div className="line"></div>
      </a>
    </Link>
    <style jsx>{`
      .footer
        height 160px
        color white
        background-color black
        display grid
        grid-template-columns repeat(2, 1fr)
        grid-gap 0
        a
          display flex
          align-items center
          color white
          border none
        .line
          border-top 1px solid #fff
          width 40px
        .whatever
          font-size 1.2rem
          font-weight normal
          letter-spacing 0.1em
          margin-top 9px
        .title
          font-size 2.4rem
          font-weight bold
          margin-top 7px
    `}</style>
  </div>
)

type SectionTitleProps = {
  num: string
  title: string
  body: string
}

export const SectionHeader = ({ num, title, body }: SectionTitleProps) => (
  <div className={langStyle('header')}>
    <div className="row">
      <div className="num-column">
        <Grad className="num">{num}</Grad>
      </div>
      <div>
        <div>
          {title.split('\n').map((line, index) => (
            <Grad key={index} className="title">{line}</Grad>
          ))}
        </div>
        <div className="body">
          {body?.split('\n').map((line, index) => <Grad key={index} className="body-line" inline={false}><div key={index}>{line}</div></Grad>)}
        </div>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .header
        font-size 0
        .row
          display grid
          grid-template-columns vwpx_min(252) auto
          grid-gap 0
          align-items start
        .num-column
          width vwpx_min(252)
        :global(.num)
          font-size vwpx_min(180)
          font-weight bold
          -webkit-text-stroke 1px black
          -webkit-text-fill-color transparent
          transform translateX(vwpx(-7))
        :global(.title)
          font-size vwpx_min(30)
          font-weight bold
          line-height 1.81em
          margin-top vwpx(4)
        .body
          margin-top vwpx(48)
          line-height 3.0rem
          :global(.body-line)
            font-size var(--font-size-ja)
            margin 3.0rem 0
      .en
        .title
          font-size vwpx(34)
          line-height 1.6em
          margin-top vwpx(5)
        .body
          :global(.body-line)
            font-size var(--font-size-en)
            font-weight 300
    `}</style>
  </div>
)
