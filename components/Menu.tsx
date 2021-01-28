import React, { useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames/bind'
import BlackButton from 'components/BlackButton'
import LanguageSelector from 'components/LanguageSelector'
import ContactForm from 'components/ContactForm'
import SNSButtons from 'components/SNSButtons'
import { Grad, GradLink } from 'components/Grad'
import { Desktop, Mobile } from 'components/Responsive'

const Menu = () => {
  const [opened, setOpened] = useState(false)
  const onClick = () => { setOpened(!opened) }
  return (
    <>
      <div className="menu">
        {opened ? <>
          <Grad className="menu-bg" inline={false} startImmediately />
          <div className="menu-full">
            <ul>
              <li><Grad whiteText inline><Link href="/"><GradLink className="menu-link" onClick={onClick}>Top</GradLink></Link></Grad></li>
              <li><Grad whiteText inline><Link href="/work/category/all"><GradLink className="menu-link" onClick={onClick}>Work</GradLink></Link></Grad></li>
              <li><Grad whiteText inline><Link href="/about"><GradLink className="menu-link" onClick={onClick}>About</GradLink></Link></Grad></li>
              <li><Grad whiteText inline><Link href="/team"><GradLink className="menu-link" onClick={onClick}>Team</GradLink></Link></Grad></li>
              <li><Grad whiteText inline><Link href="/news"><GradLink className="menu-link" onClick={onClick}>News</GradLink></Link></Grad></li>
              <li><Grad whiteText inline><Link href="/contact"><GradLink className="menu-link" onClick={onClick}>Contact</GradLink></Link></Grad></li>
            </ul>
            <div className="contact">
              <div><Grad className="langselect" whiteText inline><LanguageSelector activeColor="white" inactiveColor="#666666" separator="  /  " onSelected={onClick} /></Grad></div>
              <ContactForm />
              <div><Grad className="sns" whiteText inline><SNSButtons /></Grad></div>
            </div>
          </div>
        </> : null}
        <div className={classNames('button', { close: opened })}>
          <Desktop>
            <BlackButton width="80px" height="80px" backgroundColor="transparent" onClick={onClick}>
              <div className="black" style={{ display: opened ? 'none' : 'block' }}></div>
              <div className="l1"></div>
              <div className="l2"></div>
            </BlackButton>
          </Desktop>
          <Mobile>
            <BlackButton width="50px" height="50px" backgroundColor="transparent" onClick={onClick}>
              <div className="black" style={{ display: opened ? 'none' : 'block' }}></div>
              <div className="l1"></div>
              <div className="l2"></div>
            </BlackButton>
          </Mobile>
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
            :global(.menu-link)
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
        @media (--mobile)
          .black
            width 50px
            height 50px
          .l1,.l2
            width 10px
            height 1px
          .l1
            top 21px
            left 20px
          .l2
            bottom 21px
            left 20px
      `}</style>
    </>
  )
}

export default Menu
