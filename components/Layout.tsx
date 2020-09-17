import React, { ReactNode } from 'react'
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
    </Head>
    <div id="container">
      <Header />
      {children}
    </div>
  </div >
)

export default Layout
