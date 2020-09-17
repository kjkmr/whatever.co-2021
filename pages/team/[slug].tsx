import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../components/Layout'
import { getAllMembers, getMemberDetails } from '../../lib/api'

type Props = {
  item?: any
  errors?: string
}

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }

  return (
    <Layout title={item ? item.title : ''}>
      <div>{item.title}</div>
      <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
    </Layout>
  )
}

export default StaticPropsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllMembers()
  const paths = pages ? pages.map((e: any) => ({ params: { slug: e.slug } })) : []
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || Array.isArray(params.slug)) return { props: {} };
  const page = await getMemberDetails(params.slug)
  return { props: { item: page } }
}
