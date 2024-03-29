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
// templateName = 'Work_02'
// templateName = 'News_index'
// templateName = 'News_detail'
// templateName = 'Team_index'
// templateName = 'Team_detail'
// templateName = 'Team_detail_2'
// templateName = 'Contact'
// templateName = 'menu'
// templateName = 'top_sp'
// templateName = 'about_index_sp'
// templateName = 'about_01_sp'
// templateName = 'about_02_sp'
// templateName = 'about_03_sp'
// templateName = 'works_index_sp'
// templateName = 'works_detail_sp'
// templateName = 'news_index_sp'
// templateName = 'news_detail_sp'
// templateName = 'team_index_sp'
// templateName = 'team_detail_sp'
// templateName = 'team_detail_2_sp'
// templateName = 'contact_sp'
// templateName = 'page_not_found_sp'

type Props = {
  showHeader?: boolean
  title?: string
  side?: string
  backto?: string
  children?: ReactNode
  footer?: ReactNode
}

const decodeTitle = (rawhtml: string): string => {
  if (!global.document) {
    return rawhtml
  }
  const div = document.createElement('div')
  div.innerHTML = rawhtml
  return `${div.textContent ? div.textContent + " ― " : ""}Whatever Inc.`
}

const Layout = ({ children, footer, title = '', side = '', backto = '', showHeader = true }: Props) => {
  const templateStyle: { [prop: string]: string } = {}
  if (templateName) {
    templateStyle.backgroundImage = `url(/_/${templateName}_${useRouter().locale!}.png)`
    // templateStyle.backgroundPosition = 'top -20px left'
  }
  const router = useRouter()
  const locale = router.locale || router.defaultLocale!
  const feedPath = (locale == 'en' ? '' : `/${locale}`) + '/feed/'
  return (
    <>
      <Head>
        <title>{decodeTitle(title)}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.2/web-animations.min.js" integrity="sha512-oAY57i8MXmaOP7pAylNLnULAM4QLV3uGnvnXVY4zF229/zFzTvG2/5YIgH8iN8oZR2hnbkiDPd4JCJGaH4oG6g==" crossOrigin="anonymous"></script>
        <link rel="alternate" type="application/rss+xml" title="Whatever Inc. News" href={feedPath} />
      </Head>
      <div>
        <div className="container" key={locale} style={templateStyle}>
          <div className="contents">
            <div className="main">
              {showHeader ? <Header /> : <div />}
              {children}
            </div>
            <Menu />
            <Sidebar title={side} backto={backto ? { name: side, href: backto } : undefined} />
          </div>
          {footer}
          <Footer addMargin={!footer} />
        </div>
      </div >
      <style jsx>{`
        .container
          position relative
          width 100%
          background-repeat no-repeat
          background-position left top
          overflow hidden
        .contents
          display flex
          align-items flex-start
        .main
          width calc(100vw - 80px)
          margin-left 80px
        @media (--mobile)
          .container
            background-size 375px auto
          .main
            width calc(100vw - 50px)
            margin-left 50px
      `}</style>
    </>
  )
}

export default Layout
