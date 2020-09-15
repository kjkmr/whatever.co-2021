import * as React from 'react'
import Link from 'next/link'


const Header = () => (
  <div className="header">
    <div className="logo">
      <Link href="/"><img src="/assets/logo.svg" /></Link>
    </div>
    <ul className="menu">
      <li>
        <Link href="/about"><a>ABOUT</a></Link>
      </li>
      <li>
        <Link href="/team"><a>TEAM</a></Link>
      </li>
      <li>
        <Link href="/work"><a>WORK</a></Link>
      </li>
      <li>
        <Link href="/news"><a>NEWS</a></Link>
      </li>
      <li>
        <Link href="/contact"><a>CONTACT</a></Link>
      </li>
    </ul>
    <style jsx>{`
      .header
        margin 20px 0 105px
        display flex
        justify-content space-between
      .logo
        width 180px
        margin-top 5px
      .menu
        padding 9px 2px 0
        margin 0 -30px
      li
        display inline-block
        list-style none
        margin 0 19px
        user-select none
      a
        color #333
        text-decoration none
        border none
    `}</style>
  </div>
)

export default Header
