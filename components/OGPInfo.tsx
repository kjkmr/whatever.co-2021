import Head from 'next/head'
import { decode } from 'html-entities'
import { useRouter } from 'next/router'

export type OGPProps = {
  title: string
  type?: string
  image: string
  desc: string
}

const htmlToText = (html: string) => {
  const tagRemoved = html.replace(/<\/?[^>]+(>|$)/g, "")
  const multiSpaceRemoved = tagRemoved.replace(/\s+/gm, ' ')
  const entityDecoded = decode(multiSpaceRemoved)
  return entityDecoded
}

const LOCALES: { [locale: string]: string } = { 'ja': 'ja_JP', 'en': 'en_US', 'zh-hant': 'zh_TW' }

export const OGPInfo = ({ title, type = "article", image, desc }: OGPProps) => {
  const router = useRouter()
  let locale = router.locale || router.defaultLocale!
  locale = LOCALES[locale] || locale
  const fullpath = image.match(/^https?:\/\//) ? image : 'https://whatever.co' + image
  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={`https://whatever.co${router.asPath}`} />
      <meta property="og:image" content={fullpath} />
      <meta property="og:site_name" content="Whatever Inc." />
      <meta property="og:description" content={htmlToText(desc)} />
      <meta property="og:locale" content={locale} />
      <meta property="fb:app_id" content="3742059709197110" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@whtevr_co" />
      <meta name="twitter:creator" content="@whtevr_co" />
    </Head >
  )
}
