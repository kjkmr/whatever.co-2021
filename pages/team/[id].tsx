import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../components/Layout'
import { getAllMembers } from '../../lib/api'

type Props = {
  item?: any
  errors?: string
}

const StaticPropsDetail = ({ item, errors }: Props) => {
  console.log(item, errors)
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
  const paths = pages.edges.map((e: any) => ({ params: { id: e.node.slug } }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params)

  const response = await fetch('http://localhost:8888/wordpress/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
      query PageById($id: ID!) {
        page(id: $id, idType: URI) {
          title
          content
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    `, variables: {
        id: params?.id
      }
    })
  })
  const data = await response.json()
  console.log(data)
  return { props: { item: data.data.page } }
}
