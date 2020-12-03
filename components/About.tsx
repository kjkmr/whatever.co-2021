import Link from 'next/link'
import { Grad } from './Grad'

export const Header = ({ title, desc }: { title: string, desc: string }) => (
  <div className="header">
    <Grad><div className="t1">Crossing the border of</div></Grad>
    <Grad><div className="t2">{title}</div></Grad>
    <div className="t3"><Grad><div dangerouslySetInnerHTML={{ __html: desc }} /></Grad></div>
    <style jsx>{`
      .header
        font-size 0
        margin 40px
        margin-top 48px
      .t1
        display inline-block
        margin-bottom 8px
        font-size 32px
        font-weight bold
      .t2
        display inline-block
        margin-bottom 71px
        font-size 108px
        font-weight bold
      .t3
        width 534px
        font-size 24px
        font-weight bold
        line-height 1.75em
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
    <div className="num" style={{ marginLeft: nx }}>{num}</div>
    <div className="title" style={{ marginTop: (ty || 0), marginLeft: 45 + (tx || 0) }} dangerouslySetInnerHTML={{ __html: title }} />
    <style jsx>{`
      .head
        position relative
        z-index 1
        display flex
        padding-top 50px
        width 752px
      .num
        font-size 108px
        font-weight bold
        -webkit-text-stroke 1px black
        -webkit-text-fill-color transparent
        margin-top 5px
      .title
        font-size 36px
        font-weight bold
        margin-top 1px
        line-height 1.5em
    `}</style>
  </div>
)
