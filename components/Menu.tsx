import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames/bind'
import ContactForm from 'components/ContactForm'
import SNSButtons from 'components/SNSButtons'

const LangLink = ({ lang, label }: { lang: string, label: string }) => {
  const { locale, route } = useRouter()
  return (
    <span>
      { locale != lang
        ? <Link href={route} locale={lang}><a>{label}</a></Link>
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

const Menu = ({ title }: { title?: string }) => {
  const [opened, setOpened] = useState(false)
  const onclick = () => { setOpened(!opened) }
  return (
    <div className="container">
      <div className="title">{title}</div>
      <div className="langselect"><LangLink lang="ja" label="JA" /> / <LangLink lang="en" label="EN" /> / <LangLink lang="zh-hans" label="ZH" /></div>
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
        .black
          position absolute
          top 0
          left 0
          width 80px
          height 80px      
          background-color #000
        .title
          position absolute
          top 120px
          left 49px
          width 200px
          font-size 2rem
          font-weight bold
          transform-origin top left
          transform rotate(90deg)
          user-select none
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
        .langselect
          position absolute
          font-size 1.2rem
          letter-spacing 0.12em
          left 44px
          bottom 110px
          transform rotate(90deg)
          transform-origin top left
          white-space pre
          color #cccccc
          user-select none
      `}</style>
    </div>
  )
}

export default Menu
