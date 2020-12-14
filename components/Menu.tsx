import { useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames/bind'

const Menu = () => {
  const [opened, setOpened] = useState(false)
  const onclick = () => { setOpened(!opened) }
  return (
    <div className="container">
      <div className="black"></div>
      <div className="menu" style={{ display: opened ? 'block' : 'none' }}>
        <ul>
          <li><Link href="/"><a>Top</a></Link></li>
          <li><Link href="/work/category/all"><a>Work</a></Link></li>
          <li><Link href="/about"><a>About</a></Link></li>
          <li><Link href="/team"><a>Team</a></Link></li>
          <li><Link href="/news"><a>News</a></Link></li>
          <li><Link href="/contact"><a>Contact</a></Link></li>
        </ul>
        <div className="contact"></div>
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
          height 768px
          background-image url(/scroll.png)
          background-repeat no-repeat
          background-position 33px 552px
        .black
          position absolute
          top 0
          left 0
          width 80px
          height 80px      
          background-color #000
          {/* background-image url(/_/menu-button.png)
          opacity 0.5 */}
        .menu
          display none
          position absolute
          top 0
          left 0
          width calc(1366px - 205px * 2)
          height calc(768px - 156px * 2)
          padding 156px 205px
          {/* background-image url(/_/menu.png) */}
          background-repeat no-repeat
          background-color #333333
          ul
            margin 0
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
