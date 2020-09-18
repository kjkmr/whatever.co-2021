import { ReactNode } from 'react'
import Head from 'next/head'
import Header from '../components/Header'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = "" }: Props) => (
  <div>
    <Head>
      <title>{title ? title + " ― " : ""}Whatever Inc.</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://use.typekit.net/nyo4ebz.css" />
      <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,500&amp;subset=japanese" rel="stylesheet" />
    </Head>
    <div className="container">
      <Header />
      {children}
    </div>

    <style jsx>{`
      .container
        position: relative
        max-width: 960px
        margin: 0 auto
    `}</style>

    <style jsx global>{`
      $black = #333
      $white = rgba(255, 255, 255, 0.97)

      *
        box-sizing: border-box
        outline: none

      html
        margin: 0
        padding: 0

      body
        margin: 0
        padding: 40px 40px 100px
        color: $black
        font: normal 300 17px/1.76 "Noto Sans JP",sans-serif
        letter-spacing: 0.053em
        // background: url(/assets/_/pc/about.png) top center / 1280px auto no-repeat

      a
        color: $black
        text-decoration: none
        // padding: 3px 0
        border-bottom: 1px solid $black
        &:hover, &:visited, &:link, &:active
          color: $black

      a[href^="http"], a[href^="skype"]
        padding-right: 14px
        background-image: url(/assets/link.png)
        background-repeat: no-repeat
        background-position: right center
        background-size: 12px 7px

      iframe
        border: none

      hr.line
        margin: 30px 0
        border: none
        width: 100%
        height: 2px
        background-image: url(/assets/line.png)

      .notfound
        display: block
        text-align: center
        margin: 200px 0

      .clearfix:before,
      .clearfix:after
        content: ' '
        display: table
      .clearfix:after
        clear: both
    `}</style>

  </div >
)

export default Layout
