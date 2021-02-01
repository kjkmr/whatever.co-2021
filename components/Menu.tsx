import React, { useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames/bind'
import BlackButton from 'components/BlackButton'
import LanguageSelector from 'components/LanguageSelector'
import ContactForm from 'components/ContactForm'
import SNSButtons from 'components/SNSButtons'
import { Grad, GradLink } from 'components/Grad'

const MenuButton = ({ opened, onClick }: { opened: boolean, onClick: (() => void) }) => (
  <>
    <div className={classNames('button', { close: opened })}>
      <BlackButton className="button-inner" backgroundColor="transparent" onClick={onClick}>
        <div className="black" style={{ display: opened ? 'none' : 'block' }}></div>
        <div className="l1"></div>
        <div className="l2"></div>
      </BlackButton>
    </div>
    <style jsx>{`
      .button
        position fixed
        top 0
        left 0
        z-index 101
        width 80px
        height 80px
        margin 0
        padding 0
        border none
        background transparent
        :global(.button-inner)
          width 80px
          height 80px
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
        @import 'lib/vw-mobile.styl'
        .button
          width 50px
          height 50px
          :global(.button-inner)
            width 50px
            height 50px
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
        .close
          .l1
            top 24.5px
          .l2
            top 24.5px
    `}</style>
  </>
)

const Menu = () => {
  const [opened, setOpened] = useState(false)
  const onClick = () => { setOpened(!opened) }
  const menuItems = [
    ['Top', '/'],
    ['Work', '/work/category/all'],
    ['About', '/about'],
    ['Team', '/team'],
    ['News', '/news'],
    ['Contact', '/contact'],
  ]
  return (
    <>
      {opened ?
        <div className="menu">
          <div className="menu-full">
            <Grad className="menu-bg" inline={false} startImmediately />
            <ul>
              {menuItems.map((item) => (
                <li key={item[1]}>
                  <Grad whiteText inline>
                    <Link href={item[1]}>
                      <GradLink className="menu-link" border={false} onClick={onClick}>{item[0]}</GradLink>
                    </Link>
                  </Grad>
                </li>
              ))}
            </ul>
            <div className="contact">
              <div><Grad className="langselect" whiteText inline><LanguageSelector className="inner" activeColor="white" inactiveColor="#666666" separator="  /  " onSelected={onClick} /></Grad></div>
              <ContactForm />
              <hr className="line" />
              <div><Grad className="sns" whiteText inline><SNSButtons /></Grad></div>
            </div>
          </div>
        </div> : null}
      <MenuButton opened={opened} onClick={onClick} />
      <style jsx>{`
        @import 'lib/vw.styl'
        .menu
          position fixed
          z-index 100
          width 100%
          height 100%
          overflow-y auto
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
          .contact
            position relative
            .line
              display none
          :global(.langselect)
            font-size 1.4rem
            margin-top 5px
            letter-spacing 0.06rem
            margin-bottom 117px
            mix-blend-mode lighten
          :global(.sns)
            position absolute
            right 0
            bottom 4px
            mix-blend-mode lighten
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .menu-full
            display block
            width 100%
            height auto
            min-height 100%
            box-sizing border-box
            padding vwpx(30) vwpx(30) vwpx(75)
            ul
              align-self auto
              margin 0
              margin-top vwpx(101)
              margin-left vwpx(20)
            li
              margin-bottom vwpx(41)
              &:first-child
                margin-bottom vwpx(51)
              :global(.menu-link)
                font-size vwpx(30)
                :global(a)
                  border none
            .contact
              border-top 1px solid #707070
              margin-top 70px
              padding-top 72px
              .line
                display block
                margin 0
                margin-top 73px
                padding 0
                border none
                border-top 1px solid #707070
            :global(.langselect)
              margin-bottom 70px
              :global(.inner)
                font-size 1.4rem
            :global(.sns)
              position relative
              right auto
              bottom auto
              margin-top 75px
      `}</style>
    </>
  )
}

export default Menu
