import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllMembers } from '../../lib/api'

type Props = {
  items: {
    node: {
      slug: string,
      title: string
    }
  }[]
}

const TeamIndex = ({ items }: Props) => (
  <Layout>
    <ul>
      {items.map(item => (
        <li key={item.node.slug}>
          <Link href={`/team/` + item.node.slug}>{item.node.title}</Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default TeamIndex

export const getStaticProps: GetStaticProps = async () => {
  const items = await getAllMembers()
  console.log(items.edges)
  return { props: { items: items.edges } }
}
