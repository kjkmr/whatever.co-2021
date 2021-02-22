import { GetServerSideProps } from 'next'
import parser from 'accept-language-parser'

type RedirectInfo = {
  source: string
  destination: string
}
const data: RedirectInfo[] = require('redirects.json').filter((p: RedirectInfo) => p.source.startsWith('/post/'))

const Post = () => <></>
export default Post

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const key = `/post/${params?.slug}/`
  const redirectInfo = data.find(p => p.source == key)
  if (redirectInfo) {
    const selected = parser.pick(['en', 'ja', 'zh'], req.headers['accept-language'] || '', { loose: true })
    const newLocale = selected == 'zh' ? 'zh-hant' : selected
    res.writeHead(302, { Location: `/${newLocale}${redirectInfo.destination}` })
    res.end()
  } else {
    res.writeHead(404)
    res.end()
  }
  return { props: {} }
}
