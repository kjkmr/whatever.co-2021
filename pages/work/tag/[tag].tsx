import { GetStaticProps, GetStaticPaths } from 'next'
import { Tag, Entry, getWorksByTag, getWorkTags } from '../../../lib/api'
import Layout from '../../../components/Layout'
import { TagSelector } from '../../../components/TagSelector'
import { WorkList } from '../../../components/WorkList'

type WorkIndexProps = {
  tags: Tag[],
  active: string,
  works: Entry[],
}

const WorkIndex = ({ tags, active, works }: WorkIndexProps) => {
  return (
    <Layout title="WORK">
      <TagSelector tags={tags} active={active} />
      <WorkList works={works} filter={active} />
    </Layout >
  )
}

export default WorkIndex

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getWorkTags()
  const paths = tags.map((t: Tag) => ({ params: { tag: t.slug } }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const active = params?.tag as string
  const tags = await getWorkTags()
  const works = await getWorksByTag(active)
  return { props: { tags, active, works } }
}
