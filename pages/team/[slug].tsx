import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../components/Layout'
import { Entry, getAllMembers, getPageDetails } from '../../lib/api'

type Props = {
  entry?: Entry
}

const MemberDetail = ({ entry }: Props) => {
  if (entry) {
    return (
      <Layout title={entry.title}>
        <img src={entry.image} />
        <div className="title">{entry.title}</div>
        <div dangerouslySetInnerHTML={{ __html: entry.content || '' }}></div>
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
    return (<Layout title="404" />)
  }
}

export default MemberDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const members = await getAllMembers()
  const paths = members.map((m) => ({ params: { slug: m.slug } }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.slug || Array.isArray(params.slug)) return { props: {} };
  const entry = await getPageDetails(params.slug)
  return { props: { entry } }
}
