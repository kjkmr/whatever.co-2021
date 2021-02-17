import Head from 'next/head'
import { decode } from 'html-entities'

export type OGPProps = {
  title: string
  type?: string
  url: string
  image: string
  desc: string
  locale: string
}

const htmlToText = (html: string) => {
  const tagRemoved = html.replace(/<\/?[^>]+(>|$)/g, "")
  const multiSpaceRemoved = tagRemoved.replace(/\s+/gm, ' ')
  const entityDecoded = decode(multiSpaceRemoved)
  return entityDecoded
}

export const OGPInfo = ({ title, type = "article", url, image, desc, locale }: OGPProps) => (
  <Head>
    <meta property="og:title" content={title} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />
    <meta property="og:site_name" content="Whatever Inc." />
    <meta property="og:description" content={htmlToText(desc)} />
    <meta property="og:locale" content={locale} />
    <meta property="fb:app_id" content="3742059709197110" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@whtevr_co" />
    <meta name="twitter:creator" content="@whtevr_co" />
  </Head >
)
