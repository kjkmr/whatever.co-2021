import { GetStaticProps } from 'next'
import { Entry, getAllWorks, getWorkTags, Tag } from '../../lib/api'
import Layout from '../../components/Layout'
import { TagSelector } from '../../components/TagSelector'
import { WorkList } from '../../components/WorkList'

type WorkIndexProps = {
  tags: Tag[],
  works: Entry[],
}

const WorkIndex = ({ tags, works }: WorkIndexProps) => {
  return (
    <Layout title="WORK">
      <TagSelector tags={tags} active="all" />
      <WorkList works={works} filter="all" />
    </Layout >
  )
}

export default WorkIndex

export const getStaticProps: GetStaticProps = async () => {
  const tags = await getWorkTags()
  const works = await getAllWorks()
  return { props: { tags, works } }
}
