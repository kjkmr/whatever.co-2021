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

const Layout = ({ children, footer, title = "", showHeader = true }: Props) => (
  <div>
    <Head>
      <title>{title ? title + " ― " : ""}Whatever Inc.</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.2/web-animations.min.js" integrity="sha512-oAY57i8MXmaOP7pAylNLnULAM4QLV3uGnvnXVY4zF229/zFzTvG2/5YIgH8iN8oZR2hnbkiDPd4JCJGaH4oG6g==" crossOrigin="anonymous"></script>
    </Head>

    <div className="container">
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
        width 1366px
        margin 0 auto
      .contents
        display flex
        align-items flex-start
      .main
        width calc(100% - 80px)
    `}</style>

    <style jsx global>{`
      @font-face
        font-family Apercu
        src url('/common/fonts/apercu-medium.eot')
        src url('/common/fonts/apercu-medium.eot?#iefix') format('embedded-opentype'),
            url('/common/fonts/apercu-medium.woff') format('woff'),
            url('/common/fonts/apercu-medium.woff2') format('woff2'),
            url('/common/fonts/apercu-medium.ttf') format('truetype')
        font-weight normal
        font-style normal
      @font-face
        font-family Apercu
        src url('/common/fonts/apercu-light.eot')
        src url('/common/fonts/apercu-light.eot?#iefix') format('embedded-opentype'),
            url('/common/fonts/apercu-light.woff') format('woff'),
            url('/common/fonts/apercu-light.woff2') format('woff2'),
            url('/common/fonts/apercu-light.ttf') format('truetype')
        font-weight light
        font-style normal
      @font-face
        font-family Apercu
        src url('/common/fonts/apercu-bold.eot')
        src url('/common/fonts/apercu-bold.eot?#iefix') format('embedded-opentype'),
            url('/common/fonts/apercu-bold.woff') format('woff'),
            url('/common/fonts/apercu-bold.woff2') format('woff2'),
            url('/common/fonts/apercu-bold.ttf') format('truetype')
        font-weight bold
        font-style normal
      html, body
        margin 0
        padding 0
      body
        {/* background-image: url('/_/Work_detail.png') */}
        background-repeat no-repeat
        background-position center top
        font-family Apercu
        font-size 16px
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
    `}</style>
  </div >
)

export default Layout
