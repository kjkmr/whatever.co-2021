import { ReactNode } from 'react'
import Head from 'next/head'
import Menu from './Menu'
import Header from '../components/Header'
import Footer from '../components/Footer'

type Props = {
  showHeader?: boolean
  title?: string
  children?: ReactNode
  footer?: ReactNode
}

const Layout = ({ children, footer, title = "", showHeader = true }: Props) => {
  return (
    <div>
      <Head>
        <title>{title ? title + " ― " : ""}Whatever Inc.</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;700&display=swap" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.2/web-animations.min.js" integrity="sha512-oAY57i8MXmaOP7pAylNLnULAM4QLV3uGnvnXVY4zF229/zFzTvG2/5YIgH8iN8oZR2hnbkiDPd4JCJGaH4oG6g==" crossOrigin="anonymous"></script>
      </Head>

      <div className="container" >
        <div className="contents">
          <Menu />
          <div className="main">
            {showHeader ? <Header /> : <div />}
            {children}
          </div>
        </div>
        {footer}
        <Footer />
      </div>

      <style jsx>{`
        .container
          position relative
          width 100%
        .contents
          display flex
          align-items flex-start
        .main
          margin auto
      `}</style>

      <style jsx global>{`
        @font-face
          font-family Apercu
          src url('/common/fonts/apercu-medium.eot')
          src url('/common/fonts/apercu-medium.eot?#iefix') format('embedded-opentype'),
              url('/common/fonts/apercu-medium.woff') format('woff'),
              url('/common/fonts/apercu-medium.woff2') format('woff2'),
              url('/common/fonts/apercu-medium.ttf') format('truetype')
          font-weight 400
          font-style normal
        @font-face
          font-family Apercu
          src url('/common/fonts/apercu-light.eot')
          src url('/common/fonts/apercu-light.eot?#iefix') format('embedded-opentype'),
              url('/common/fonts/apercu-light.woff') format('woff'),
              url('/common/fonts/apercu-light.woff2') format('woff2'),
              url('/common/fonts/apercu-light.ttf') format('truetype')
          font-weight 200
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
        
        html
          margin 0
          padding 0
          font-size 10px
        body
          margin 0
          padding 0
          {/* background-image: url('/_/Top_1366.png') */}
          background-repeat no-repeat
          background-position left top
          font-family Apercu, 'Noto Sans JP', sans-serif
          font-size 1.5em
          font-weight 200
        a
          text-decoration none
          color black
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
    </div >
  )
}

export default Layout
