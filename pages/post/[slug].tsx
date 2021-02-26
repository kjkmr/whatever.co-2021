import { GetServerSideProps } from 'next'
import { findRedirectDest } from 'lib/redirect'

const Post = () => <></>
export default Post

const getLocalePath = (locale: string): string => {
  switch (locale) {
    case 'en': return ''
    case 'zh': return '/zh-hant'
  }
  return `/${locale}`
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, params, locale } = context
  const destPath = findRedirectDest(params?.slug as string)
  if (destPath) {
    // @ts-ignore
    const newLocalePath = req['__nextStrippedLocale']
      ? getLocalePath(locale!)
      : '/ja'
    return {
      redirect: {
        permanent: true,
        destination: `${newLocalePath}${destPath}`
      }
    }
  }
  return { notFound: true }
}
