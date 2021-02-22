import { GetServerSideProps } from 'next'

const Post = () => <></>
export default Post

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  res.writeHead(302, { Location: `/zh-hant/${(params!.slug as string[]).join('/')}` })
  res.end()
  return { props: {} }
}
