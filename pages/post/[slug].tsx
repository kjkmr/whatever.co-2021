import { GetServerSideProps } from 'next'
import { findRedirectDest } from 'lib/redirect'

const Post = () => <></>
export default Post

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, params, locale } = context
  const destPath = findRedirectDest(params?.slug as string)
  if (destPath) {
    // @ts-ignore
    const newLocale = req['__nextStrippedLocale']
      ? (locale == 'zh' ? 'zh-hant' : locale)
      : 'ja'
    return {
      redirect: {
        permanent: true,
        destination: `/${newLocale}${destPath}`
      }
    }
  }
  return { notFound: true }
}
