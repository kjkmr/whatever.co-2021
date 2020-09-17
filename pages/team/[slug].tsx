import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../components/Layout'
import { getAllMembers, getMemberDetails } from '../../lib/api'

type Props = {
  item?: {
    title: string
    content: string
    featuredImage: {
      node: {
        mediaItemUrl: string
      }
    }
  }
}

const MemberDetail = ({ item }: Props) => {
  if (item) {
    return (
      <Layout title={item.title}>
        <img src={item.featuredImage.node.mediaItemUrl} />
        <div className="title">{item.title}</div>
        <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
        <style jsx>{`
          img
            width 200px
          .title
            font-size 20px
            font-weight bold
            margin-top 20px
        `}</style>
      </Layout >
    )
  } else {
    return (<div />)
  }
}

export default MemberDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllMembers()
  const paths = pages ? pages.map((e: any) => ({ params: { slug: e.slug } })) : []
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.slug || Array.isArray(params.slug)) return { props: {} };
  const page = await getMemberDetails(params.slug)
  return { props: { item: page } }
}
