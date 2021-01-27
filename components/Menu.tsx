import React, { useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames/bind'
import BlackButton from 'components/BlackButton'
import LanguageSelector from 'components/LanguageSelector'
import ContactForm from 'components/ContactForm'
import SNSButtons from 'components/SNSButtons'
import { Grad, GradImg } from 'components/Grad'

const Menu = () => {
  const [opened, setOpened] = useState(false)
  const onclick = () => { setOpened(!opened) }
  return (
    <>
      <div className="menu">
        {opened ? <>
          <Grad className="menu-bg" inline={false} startImmediately />
          <div className="menu-full">
            <ul>
              <li><Grad whiteText={true}><Link href="/"><a onClick={onclick}>Top</a></Link></Grad></li>
              <li><Grad whiteText={true}><Link href="/work/category/all"><a onClick={onclick}>Work</a></Link></Grad></li>
              <li><Grad whiteText={true}><Link href="/about"><a onClick={onclick}>About</a></Link></Grad></li>
              <li><Grad whiteText={true}><Link href="/team"><a onClick={onclick}>Team</a></Link></Grad></li>
              <li><Grad whiteText={true}><Link href="/news"><a onClick={onclick}>News</a></Link></Grad></li>
              <li><Grad whiteText={true}><Link href="/contact"><a onClick={onclick}>Contact</a></Link></Grad></li>
            </ul>
            <div className="contact">
              <div><Grad className="langselect" whiteText={true}><LanguageSelector activeColor="white" inactiveColor="#666666" separator="  /  " onSelected={onclick} /></Grad></div>
              <ContactForm />
              <div><Grad className="sns" whiteText={true}><SNSButtons /></Grad></div>
            </div>
          </div>
        </> : null}
        <div className={classNames('button', { close: opened })}>
          <BlackButton width="80px" height="80px" backgroundColor="transparent" onClick={onclick}>
            <div className="black" style={{ display: opened ? 'none' : 'block' }}></div>
            <div className="l1"></div>
            <div className="l2"></div>
          </BlackButton>
        </div>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .menu
          position fixed
          z-index 10000
          font-size 0
        :global(.menu-bg)
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          {/* background-image url(/_/menu_ja.png)
          background-repeat no-repeat */}
          background-color #333333
        .menu-full
          position relative
          display flex
          justify-content space-between
          width calc(100vw - 205px * 2)
          height calc(100vh - 152px * 2)
          padding 152px 205px
          ul
            margin 0
            margin-top 4px
            padding 0
            align-self center
          li
            list-style-type none
            margin 0
            margin-bottom vwpx_min(47)
            padding 0
            mix-blend-mode lighten
            &:first-child
              margin-bottom vwpx_min(57)
            &:last-child
              margin-bottom 0
            a
              font-size vwpx_min(36)
              font-weight bold
              color white
              border none
          :global(.langselect)
            font-size 1.4rem
            margin-top 5px
            letter-spacing 0.06rem
            margin-bottom 115px
            mix-blend-mode lighten
          :global(.sns)
            position absolute
            right 205px
            bottom 156px
            mix-blend-mode lighten
        .button
          position absolute
          top 0
          left 0
          z-index 1
          width 80px
          height 80px
          margin 0
          padding 0
          border none
          background transparent
        .black
          position absolute
          top 0
          left 0
          width 80px
          height 80px      
          background-color #000
          z-index -2
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
    </>
  )
}

export default Menu
