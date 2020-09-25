import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { Entry, getAllMembers } from '../../lib/api'

type Props = {
  members: Entry[]
}

const TeamIndex = ({ members }: Props) => (
  <Layout title="TEAM">
    <ul>
      {members.map(m => (
        <li key={m.slug}>
          <Link href={`/team/` + m.slug}>{m.title}</Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default TeamIndex

export const getStaticProps: GetStaticProps = async () => {
  const members = await getAllMembers()
  return { props: { members } }
}
