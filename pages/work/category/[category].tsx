import { GetStaticProps, GetStaticPaths } from 'next'
import { Tag, Entry, getAllWorks, getWorksByTag, getWorkTags } from '../../../lib/api'
import Layout from '../../../components/Layout'
import { TagSelector } from '../../../components/TagSelector'
import { WorkList } from '../../../components/WorkList'

type WorkIndexProps = {
  tags?: Tag[],
  active: string,
  works?: Entry[],
}

const WorkIndex = ({ tags, active, works }: WorkIndexProps) => (
  <Layout title="WORK">
    <TagSelector tags={tags} active={active} />
    <WorkList works={works} filter={active} />
  </Layout >
)

export default WorkIndex

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  return {
    paths: (locales || ['en']).map(locale => ({ params: { category: 'all' }, locale })),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const active = params?.category ? params.category as string : 'all'
  const tags = await getWorkTags()
  const works = active == 'all' ? (await getAllWorks(100, locale)) : (await getWorksByTag(active, 100, locale))
  return { props: { tags, active, works } }
}
