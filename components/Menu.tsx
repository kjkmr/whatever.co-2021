import { useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames/bind'
import ContactForm from 'components/ContactForm'
import SNSButtons from 'components/SNSButtons'

const Menu = () => {
  const [opened, setOpened] = useState(false)
  const onclick = () => { setOpened(!opened) }
  return (
    <div className="container">
      <div className="black"></div>
      <div className="menu" style={{ display: opened ? 'flex' : 'none' }}>
        <ul>
          <li><Link href="/"><a onClick={onclick}>Top</a></Link></li>
          <li><Link href="/work/category/all"><a onClick={onclick}>Work</a></Link></li>
          <li><Link href="/about"><a onClick={onclick}>About</a></Link></li>
          <li><Link href="/team"><a onClick={onclick}>Team</a></Link></li>
          <li><Link href="/news"><a onClick={onclick}>News</a></Link></li>
          <li><Link href="/contact"><a onClick={onclick}>Contact</a></Link></li>
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
          position fixed
          z-index 10000
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
              border none
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
