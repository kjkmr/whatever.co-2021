import App from 'next/app'
import type { AppProps, AppContext } from 'next/app'
import { loadResources } from 'lib/i18n'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  loadResources()
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
}

export default MyApp
