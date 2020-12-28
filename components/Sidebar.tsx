import { useRouter } from 'next/router'
import Link from 'next/link'

const LangLink = ({ lang, label }: { lang: string, label: string }) => {
  const { locale, pathname, query } = useRouter()
  return (
    <span>
      { locale != lang
        ? <Link href={{ pathname, query }} locale={lang}><a>{label}</a></Link>
        : <>{label}</>}
      <style jsx>{`
        span
          color black
        a
          color #cccccc
          border none
      `}</style>
    </span>
  )
}

type SidebarProps = {
  title?: string
  backto?: {
    name: string,
    href: string
  }
}

const Sidebar = ({ title, backto }: SidebarProps) => (
  <div className="sidebar">
    <div className="vertical">
      <div className="title">{title}</div>
      {backto ? <div className="back"><Link href={backto.href}><a>Back to {backto.name}</a></Link><div className="line"></div></div> : null}
      <div className="langselect"><LangLink lang="ja" label="JA" /> / <LangLink lang="en" label="EN" /> / <LangLink lang="zh-hans" label="ZH" /></div>
    </div>
    <style jsx>{`
      .sidebar
        position relative
        width 80px
        height 100vh
      .vertical
        position absolute
        display flex
        justify-content space-between
        width calc(100vh - 80px)
        height 80px
        top 80px
        left 80px
        transform-origin top left
        transform rotate(90deg)
      .title
        font-size 2rem
        font-weight bold
        user-select none
        margin-left 40px
        margin-top 31px
      .back
        position relative
        font-size 1.0rem
        letter-spacing 0.08rem
        margin-left 34px
        margin-top 35px
        text-align center
        a
          border none
        .line
          position absolute
          left 33px
          bottom 0
          height 15px
          border-left 1px solid #333333
      .langselect
        font-size 1.2rem
        letter-spacing 0.12em
        color #cccccc
        user-select none
        margin-right 38px
        margin-top 36px
    `}</style>
  </div>
)

export default Sidebar
