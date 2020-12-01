import { GetStaticProps, GetStaticPaths } from 'next'
import { Tag, Entry, getAllWorks, getWorksByTag, getWorkTags } from '../../../lib/api'
import Layout from '../../../components/Layout'
import { TagSelector } from '../../../components/TagSelector'
import { WorkList } from '../../../components/WorkList'

type WorkIndexProps = {
  tags: Tag[],
  active: string,
  works: Entry[],
}

const WorkIndex = ({ tags, active, works }: WorkIndexProps) => (
  <Layout title="WORK">
    <TagSelector tags={tags} active={active} />
    <WorkList works={works} filter={active} />
  </Layout >
)

export default WorkIndex

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getWorkTags()
  const paths = tags.map((t: Tag) => ({ params: { category: t.slug } }))
  paths.unshift({ params: { category: 'all' } })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const active = params?.category as string
  const tags = await getWorkTags()
  const works = active == 'all' ? (await getAllWorks()) : (await getWorksByTag(active))
  return { props: { tags, active, works } }
}
