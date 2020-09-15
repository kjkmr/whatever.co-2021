import { AppProps } from 'next/app'
import '../styles/global.sass'

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App
