import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllMembers } from '../../lib/api'

type Props = {
  items: {
    slug: string,
    title: string
  }[]
}

const TeamIndex = ({ items }: Props) => (
  <Layout title="TEAM">
    <ul>
      {items.map(item => (
        <li key={item.slug}>
          <Link href={`/team/` + item.slug}>{item.title}</Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default TeamIndex

export const getStaticProps: GetStaticProps = async () => {
  const items = await getAllMembers()
  return { props: { items } }
}
