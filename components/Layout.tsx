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
        max-width 1366px
        margin 0 auto
      .contents
        display flex
        align-items flex-start
      .main
        width calc(100% - 80px)
    `}</style>

    <style jsx global>{`
      html, body
        margin 0
        padding 0
      body
        background-repeat no-repeat
        background-position top center
        font-family Apercu
        font-size 16px
        letter-spacing -0.01em
      a
        text-decoration none
        color black
      button
        cursor pointer
      *:focus
        outline none
    `}</style>
  </div >
)

export default Layout
