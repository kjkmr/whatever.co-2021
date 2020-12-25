import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames/bind'
import ContactForm from 'components/ContactForm'
import SNSButtons from 'components/SNSButtons'

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
      `}</style>
    </span>
  )
}


type MenuProps = {
  title?: string
  backto?: {
    name: string,
    href: string
  }
}

const Menu = ({ title, backto }: MenuProps) => {
  const [opened, setOpened] = useState(false)
  const onclick = () => { setOpened(!opened) }
  return (
    <div className="container">
      <div className="vertical">
        <div className="title">{title}</div>
        {backto ? <div className="back"><Link href={backto.href}><a>Back to {backto.name}</a></Link><div className="line"></div></div> : null}
        <div className="langselect"><LangLink lang="ja" label="JA" /> / <LangLink lang="en" label="EN" /> / <LangLink lang="zh-hans" label="ZH" /></div>
      </div>
      <div className="black"></div>
      <div className="menu" style={{ display: opened ? 'flex' : 'none' }}>
        <ul>
          <li><Link href="/"><a>Top</a></Link></li>
          <li><Link href="/work/category/all"><a>Work</a></Link></li>
          <li><Link href="/about"><a>About</a></Link></li>
          <li><Link href="/team"><a>Team</a></Link></li>
          <li><Link href="/news"><a>News</a></Link></li>
          <li><Link href="/contact"><a>Contact</a></Link></li>
        </ul>
        <div className="contact">
          <ContactForm />
          <div className="sns"><SNSButtons /></div>
        </div>
      </div>
      <button className={classNames('button', { close: opened })} onClick={onclick}>
        <div className="l1"></div>
        <div className="l2"></div>
      </button>

      <style jsx>{`
        .container
          position relative
          z-index 10000
          width 80px
          height 100vh
        .vertical
          position absolute
          display flex
          justify-content space-between
          {/* background-color rgba(0, 0, 255, 0.1) */}
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
        .black
          position absolute
          top 0
          left 0
          width 80px
          height 80px      
          background-color #000
        .menu
          display none
          justify-content space-between
          position absolute
          top 0
          left 0
          width calc(100vw - 205px * 2)
          height calc(100vh - 152px * 2)
          padding 152px 205px
          {/* background-image url(/_/menu_en.png)
          background-repeat no-repeat */}
          background-color #333333
          ul
            margin 0
            margin-top 4px
            padding 0
          li
            list-style-type none
            margin 0
            margin-bottom 47px
            padding 0
            font-size 36px
            font-weight bold
            &:first-child
              margin-bottom 57px
            a
              color white
          .sns
            position absolute
            right 205px
            bottom 156px
        .button
          position relative
          z-index 1
          width 80px
          height 80px
          margin 0
          padding 0
          border none
          background transparent
        .l1,.l2
          position absolute
          width 20px
          height 2px
          background-color white
          transition all 0.1s
        .l1
          top 33px
          left 30px
        .l2
          bottom 33px
          left 30px
        .close
          .l1
            top 39px
            transform rotate(45deg)
          .l2
            top 39px
            transform rotate(-45deg)
      `}</style>
    </div>
  )
}

export default Menu
