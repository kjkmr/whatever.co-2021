import { GetStaticProps } from 'next'
import Layout from 'components/Layout'

const NotFoundPage = () => (
  <Layout title="Contact">
    Page not found
  </Layout >
)

export default NotFoundPage

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
