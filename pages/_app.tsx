import App from 'next/app'
import type { AppProps, AppContext } from 'next/app'
import Head from 'next/head'
import { loadResources } from 'lib/i18n'
import { FaviconAnimator } from 'lib/FaviconAnimator'
import { useLayoutEffect } from 'lib/useLayoutEffect'
import 'styles/global.sass'

let animator: FaviconAnimator

const MyApp = ({ Component, pageProps }: AppProps) => {
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
