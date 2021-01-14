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
      <div className="text" style={{ marginTop: `calc((100vw - 80px) * ${(ty && ty[locale] ? ty[locale] : 0) / (1366 - 80)})` }}>
        <Grad><div className="t1">Whatever</div></Grad>
        <Grad><div className="t2">{title}</div></Grad>
        {subtitle != '-' ? <Grad><div className="t3" >{subtitle}</div></Grad> : null}
        <div className="t4"><Grad><div dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br />') }} /></Grad></div>
      </div>
      <div className="image" style={{ marginTop: `calc((100vw - 80px) * ${(iy && iy[locale] ? iy[locale] : 0) / (1366 - 80)})` }}>
        <img src={image} alt="" />
      </div>
      <style jsx>{`
        vwpx(px)
          'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
        .header
          display flex
          justify-content space-between
          font-size 0
          margin 0
          margin-top vwpx(22)
          margin-left vwpx(40)
        .text
          width vwpx(562)
        .t1
          display inline-block
          margin-bottom vwpx(12)
          font-size vwpx(32)
          font-weight bold
        .t2
          display inline-block
          margin-left vwpx(-5)
          margin-bottom vwpx(42)
          font-size vwpx(140)
          font-weight bold
        .t3
          display inline-block
          margin-bottom vwpx(40)
          font-size vwpx(30)
          font-weight bold
        .t4
          font-size vwpx(18)
          font-weight bold
          line-height 2.15em
        .image
          img
            width vwpx(564)
            margin-right vwpx(80)
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
  nx?: number
  tx?: { [locale: string]: number }
  ty?: { [locale: string]: number }
}

export const SectionTitle = ({ num, title, nx, tx, ty }: SectionTitleProps) => {
  const router = useRouter()
  const locale = router.locale || router.defaultLocale!
  const numStyle = {
    marginLeft: `calc((100vw - 80px) * ${(nx || 0) / (1366 - 80)})`
  }
  const titleStyle = {
    marginTop: `calc((100vw - 80px) * ${(ty && ty[locale] ? ty[locale] : 0) / (1366 - 80)})`,
    marginLeft: `calc((100vw - 80px) * ${(45 + (tx && tx[locale] ? tx[locale] : 0)) / (1366 - 80)})`
  }
  return (
    <div className={langStyle('head')}>
      <div className="num" style={numStyle}>{num}</div>
      <div className="title" style={titleStyle} dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
      <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .head
        position relative
        z-index 1
        display flex
        padding-top vwpx(50)
      .num
        font-size vwpx(108)
        font-weight bold
        -webkit-text-stroke 1px black
        -webkit-text-fill-color transparent
        margin-top vwpx(5)
      .title
        font-size vwpx(30)
        font-weight bold
        line-height 1.81em
      .en
        .title
          font-size vwpx(34)
          line-height 1.6em
    `}</style>
    </div>
  )
}
