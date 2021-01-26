import { ReactNode } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Menu from 'components/Menu'
import Sidebar from 'components/Sidebar'
import Header from 'components/Header'
import Footer from 'components/Footer'

let templateName: string
// templateName = 'Top_1366'
// templateName = 'About_index'
// templateName = 'About_detail_01'
// templateName = 'About_detail_02'
// templateName = 'About_detail_03'
// templateName = 'Work_index'
// templateName = 'Work_detail'
// templateName = 'News_index'
// templateName = 'News_detail'
// templateName = 'Team_index'
// templateName = 'Team_detail'
// templateName = 'Contact'
// templateName = 'menu'

type Props = {
  showHeader?: boolean
  title?: string
  side?: string
  backto?: string
  children?: ReactNode
  footer?: ReactNode
}

const Layout = ({ children, footer, title = '', side = '', backto = '', showHeader = true }: Props) => {
  const templateStyle: { [prop: string]: string } = {}
  if (templateName) {
    templateStyle.backgroundImage = `url(/_/${templateName}_${useRouter().locale!}.png)`
    // templateStyle.backgroundPosition = 'top 2526px left'
  }
  return (
    <>
      <div>
        <Head>
          <title>{title ? title + " ― " : ""}Whatever Inc.</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.2/web-animations.min.js" integrity="sha512-oAY57i8MXmaOP7pAylNLnULAM4QLV3uGnvnXVY4zF229/zFzTvG2/5YIgH8iN8oZR2hnbkiDPd4JCJGaH4oG6g==" crossOrigin="anonymous"></script>
        </Head>
        <div className="container" style={templateStyle}>
          <div className="contents">
            <Menu />
            <Sidebar title={side} backto={backto ? { name: side, href: backto } : undefined} />
            <div className="main">
              {showHeader ? <Header /> : <div />}
              {children}
            </div>
          </div>
          {footer}
          <Footer />
        </div>
      </div >

      <style jsx>{`
        .container
          position relative
          width 100%
          background-repeat no-repeat
          background-position left top
        .contents
          display flex
          align-items flex-start
        .main
          width calc(100vw - 80px)
          margin-left 80px
      `}</style>

      <style jsx global>{`
        @import 'lib/vw.styl'

        {/*
        Noto Sans JP
        https://fonts.google.com/specimen/Noto+Sans+JP
        Thin 100
        Light 300
        Regular 400
        Medium 500
        Bold 700
        Black 900
        */}
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500;700&display=swap')

        {/*
        200 apercu-extralight.ttf
        300 apercu-light.ttf
        400 apercu-regular.ttf
        500 apercu-medium.ttf
        700 apercu-bold.ttf
        900 apercu-black.ttf
        */}
        @font-face
          font-family Apercu
          src url('/common/fonts/apercu-extralight.eot')
          src url('/common/fonts/apercu-extralight.eot?#iefix') format('embedded-opentype'),
              url('/common/fonts/apercu-extralight.woff') format('woff'),
              url('/common/fonts/apercu-extralight.woff2') format('woff2'),
              url('/common/fonts/apercu-extralight.ttf') format('truetype')
          font-weight 200
          font-style normal
        @font-face
          font-family Apercu
          src url('/common/fonts/apercu-light.eot')
          src url('/common/fonts/apercu-light.eot?#iefix') format('embedded-opentype'),
              url('/common/fonts/apercu-light.woff') format('woff'),
              url('/common/fonts/apercu-light.woff2') format('woff2'),
              url('/common/fonts/apercu-light.ttf') format('truetype')
          font-weight 300
          font-style normal
        @font-face
          font-family Apercu
          src url('/common/fonts/apercu-regular.eot')
          src url('/common/fonts/apercu-regular.eot?#iefix') format('embedded-opentype'),
              url('/common/fonts/apercu-regular.woff') format('woff'),
              url('/common/fonts/apercu-regular.woff2') format('woff2'),
              url('/common/fonts/apercu-regular.ttf') format('truetype')
          font-weight 400
          font-style normal
        @font-face
          font-family Apercu
          src url('/common/fonts/apercu-medium.eot')
          src url('/common/fonts/apercu-medium.eot?#iefix') format('embedded-opentype'),
              url('/common/fonts/apercu-medium.woff') format('woff'),
              url('/common/fonts/apercu-medium.woff2') format('woff2'),
              url('/common/fonts/apercu-medium.ttf') format('truetype')
          font-weight 500
          font-style normal
        @font-face
          font-family Apercu
          src url('/common/fonts/apercu-bold.eot')
          src url('/common/fonts/apercu-bold.eot?#iefix') format('embedded-opentype'),
              url('/common/fonts/apercu-bold.woff') format('woff'),
              url('/common/fonts/apercu-bold.woff2') format('woff2'),
              url('/common/fonts/apercu-bold.ttf') format('truetype')
          font-weight 700
          font-style normal

        :root
          --font-size-ja 1.5rem
          --font-size-en 1.7rem

        html
          margin 0
          padding 0
          font-size 10px
        body
          margin 0
          padding 0
          background-color white
          font-family Apercu, 'Noto Sans JP', sans-serif
          font-size 1.5rem
          font-weight 300
          color black
        h1
          font-size vwpx_min(36)
          font-weight 700
          margin 0
        h2
          font-size vwpx_min(24)
          font-weight 700
          margin 0
        p
          margin 2em 0
          img
            width 100%
            height auto
            margin auto
        a
          text-decoration none
          color black
          padding-bottom 0.5rem
          border-bottom 1px solid red
        button
          cursor pointer
        img
          pointer-events none
          user-select none
        *:focus
          outline none
        figure
          margin 1em 0
          font-size 0
        figcaption
          font-size 1.3em
          font-style italic
          margin-top 0.5em
          margin-bottom 1.5em
          text-align left
      `}</style>
    </>
  )
}

export default Layout
