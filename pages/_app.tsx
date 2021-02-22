import { useEffect } from 'react'
import App from 'next/app'
import type { AppProps, AppContext } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { loadResources } from 'lib/i18n'
import { FaviconAnimator } from 'lib/FaviconAnimator'
import { useLayoutEffect } from 'lib/useLayoutEffect'
import * as gtag from 'lib/gtag'
import 'styles/global.sass'

let animator: FaviconAnimator

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  useLayoutEffect(() => {
    if (!animator) {
      animator = new FaviconAnimator()
    }
  })
  return <>
    <Head><link rel="shortcut icon" href="/favicon.ico" type="image/vnd.microsoft.ico" /></Head>
    <Component {...pageProps} />
  </>
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  loadResources()
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
}

export default MyApp
