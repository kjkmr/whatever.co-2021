import { GetServerSideProps } from 'next'
import parser from 'accept-language-parser'
import { findRedirectDest } from 'lib/redirect'

const Post = () => <></>
export default Post

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const destPath = findRedirectDest(params?.slug as string)
  if (destPath) {
    const selected = parser.pick(['en', 'ja', 'zh'], req.headers['accept-language'] || '', { loose: true })
    const newLocale = selected == 'zh' ? 'zh-hant' : selected
    return {
      redirect: {
        permanent: false,
        destination: `/${newLocale}${destPath}`
      }
    }
  }
  return { notFound: true }
}
