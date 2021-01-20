import Link from 'next/link'
import { useRouter } from 'next/router'
import { langStyle } from 'lib/i18n'
import { Grad } from './Grad'

type HeaderProps = {
  title: string
  subtitle: string
  desc: string
  image: string
  ty?: { [locale: string]: number }
  iy?: { [locale: string]: number }
}

export const Header = ({ title, subtitle, desc, image, ty, iy }: HeaderProps) => {
  const router = useRouter()
  const locale = router.locale || router.defaultLocale!
  return (
    <div className={langStyle('header')}>
      <div className="upper">
        <div className="text" style={{ marginTop: `calc((100vw - 80px) * ${(ty && ty[locale] ? ty[locale] : 0) / (1366 - 80)})` }}>
          <Grad><div className="t1">Whatever</div></Grad>
          <Grad><div className="t2">{title}</div></Grad>
          {subtitle != '-' ? <Grad><div className="t3" ><span className="hr" />{subtitle}</div></Grad> : null}
        </div>
        <div className="image" style={{ marginTop: `calc((100vw - 80px) * ${(iy && iy[locale] ? iy[locale] : 0) / (1366 - 80)})` }}>
          <img src={image} alt="" />
        </div>
      </div>
      <div className="desc" dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br />') }} />
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
          margin-bottom vwpx(8)
        .t2
          display inline-block
          font-size vwpx(124)
          font-weight bold
          margin 0
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
          img
            width vwpx(607)
            margin-right vwpx(34)
        .desc
          font-size vwpx_min(18)
          font-weight 700
          line-height 4.0rem
        .en
          &.header
            margin-top vwpx(44)
          .t4
            font-size vwpx(20)
            font-weight normal
            line-height 1.9em
      `}</style>
    </div>
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
  nx?: number
  tx?: { [locale: string]: number }
  ty?: { [locale: string]: number }
}

export const SectionHeader = ({ num, title, body, nx, tx, ty }: SectionTitleProps) => {
  const router = useRouter()
  const locale = router.locale || router.defaultLocale!
  const numStyle = {
    transform: `translateX(calc((100vw - 80px) * ${(nx || -7) / (1366 - 80)}))`
  }
  const titleStyle = {
    marginTop: `calc((100vw - 80px) * ${(4 + (ty && ty[locale] ? ty[locale] : 0)) / (1366 - 80)})`,
    // marginLeft: `calc((100vw - 80px) * ${(7 + (tx && tx[locale] ? tx[locale] : 0)) / (1366 - 80)})`,
  }
  return (
    <div className={langStyle('header')}>
      <div className="row">
        <div className="num" style={numStyle}>{num}</div>
        <div className="title" style={titleStyle} dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
      </div>
      <div className="body">
        {body?.split('\n').map((line, index) => <Grad key={index}><p key={index}>{line}</p></Grad>)}
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .row
          display flex
        .num
          width vwpx_min(252)
          font-size vwpx_min(180)
          font-weight bold
          -webkit-text-stroke 1px black
          -webkit-text-fill-color transparent
        .title
          font-size vwpx_min(30)
          font-weight bold
          line-height 1.81em
        .body
          margin-top vwpx(-94)
          margin-left vwpx_min(252)
          margin-bottom vwpx(90)
          line-height 3.0rem
          p
            margin-top 2.0rem
        .en
          .title
            font-size vwpx(34)
            line-height 1.6em
      `}</style>
    </div>
  )
}
