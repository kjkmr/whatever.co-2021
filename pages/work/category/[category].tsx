import { GetStaticProps, GetStaticPaths } from 'next'
import { Tag, Entry, getAllWorks, getWorksByTag, getWorkTags } from '../../../lib/api'
import Layout from 'components/Layout'
import { TagSelector } from 'components/TagSelector'
import { WorkList } from 'components/WorkList'

type WorkIndexProps = {
  tags: Tag[],
  active: string,
  works: Entry[],
}

const WorkIndex = ({ tags, active, works }: WorkIndexProps) => (
  <Layout title="Work">
    <TagSelector tags={tags} active={active} />
    <WorkList works={works} filter={active} />
  </Layout >
)

export default WorkIndex

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = await Promise.all((locales || ['en']).map(async (locale) => {
    const tags = await getWorkTags(locale)
    const paths = tags.map((t: Tag) => ({ params: { category: t.slug }, locale }))
    paths.unshift({ params: { category: 'all' }, locale })
    return paths
  }))
  return {
    paths: paths.flat(),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const active = params?.category as string
  const tags = await getWorkTags(locale!)
  const works = active == 'all' ? (await getAllWorks(100, locale)) : (await getWorksByTag(active, 100, locale))
  return { props: { tags, active, works } }
}
