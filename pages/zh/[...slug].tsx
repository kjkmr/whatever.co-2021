import { GetServerSideProps } from 'next'
import { findRedirectDest } from 'lib/redirect'

const Post = () => <></>
export default Post

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let destination: string = '/'
  if (params && Array.isArray(params.slug)) {
    if (params.slug[0] == 'post') {
      const destPath = findRedirectDest(params.slug[1])
      if (destPath) {
        destination = `/zh-hant${destPath}`
      }
    } else {
      destination = `/zh-hant/${params.slug.join('/')}`
    }
  }
  return {
    redirect: {
      permanent: false,
      destination: destination
    }
  }
}
