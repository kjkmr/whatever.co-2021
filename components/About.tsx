import Link from 'next/link'
import { t, LangStyle } from 'lib/i18n'
import { Grad } from './Grad'

export const Header = ({ title, subtitle, desc }: { title: string, subtitle: string, desc: string }) => (
  <div className={LangStyle('header')}>
    <div className="text">
      <Grad><div className="t1">Crossborder :</div></Grad>
      <Grad><div className="t2">{title}</div></Grad>
      {subtitle ? <Grad><div className="t3" >{subtitle}</div></Grad> : null}
      <div className="t4"><Grad><div dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br />') }} /></Grad></div>
    </div>
    <div className="image">
      <img src="/about/genres/head@2x.png" alt="" />
    </div>
    <style jsx>{`
      vwp(p)
        'calc((100vw - 80px) * %s)' % p
      .header
        display flex
        justify-content space-between
        font-size 0
        margin 0
        margin-top vwp(0.031)
        margin-left vwp(0.031)
      .text
        width vwp(0.44)
      .t1
        display inline-block
        margin-bottom vwp(0.0095)
        font-size vwp(0.0249)
        font-weight bold
      .t2
        display inline-block
        margin-left vwp(-0.004)
        margin-bottom vwp(0.0325)
        font-size vwp(0.109)
        font-weight bold
      .t3
        display inline-block
        margin-bottom vwp(0.031)
        font-size vwp(0.0234)
        font-weight bold
      .t4
        font-size vwp(0.014)
        font-weight bold
        line-height 2.15em
      .image
        img
          width vwp(0.438)
          margin-top vwp(-0.0165)
          margin-right vwp(0.062)
    `}</style>
  </div>
)

export const Footer = ({ left, right }: { left: string, right: string }) => (
  <div className="footer">
    <Link href={`/about/${left}`}>
      <a style={{ borderRight: '1px solid #333' }}>
        <div className="line"></div>
        <div style={{ marginLeft: 40 }}>
          <div className="cb">Crossborder :</div>
          <div className="title">{left}</div>
        </div>
      </a>
    </Link>
    <Link href={`/about/${right}`}>
      <a style={{ justifyContent: 'flex-end' }}>
        <div style={{ marginRight: 40 }}>
          <div className="cb">Crossborder :</div>
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
        .line
          border-top 1px solid #fff
          width 40px
        .cb
          font-size 12px
          font-weight 400
          letter-spacing 0.1em
          margin-top 2px
        .title
          font-size 24px
          font-weight 700
          margin-top 7px
    `}</style>
  </div>
)

export const SectionTitle = ({ num, title, nx, tx, ty }: { num: string, title: string, nx?: number, tx?: number, ty?: number }) => (
  <div className="head">
    <div className="num" style={{ marginLeft: `calc((100vw - 80px) * ${(nx || 0) / (1366 - 80)})` }}>{num}</div>
    <div className="title" style={{ marginTop: (ty || 0), marginLeft: `calc((100vw - 80px) * ${(45 + (tx || 0)) / (1366 - 80)})` }} dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
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
    `}</style>
  </div>
)
