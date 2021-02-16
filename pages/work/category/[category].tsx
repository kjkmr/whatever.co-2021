import { GetStaticProps, GetStaticPaths } from 'next'
import { Tag, Entry, getAllWorks, getWorksByTag, getWorkTags } from '../../../lib/api'
import Layout from 'components/Layout'
import { TagSelector } from 'components/TagSelector'
import { WorkList, WorkListSingleCulumn } from 'components/WorkList'
import { Desktop, Mobile } from 'components/Responsive'

type WorkIndexProps = {
  tags: Tag[],
  active: string,
  works: Entry[],
}

const WorkIndex = ({ tags, active, works }: WorkIndexProps) => (
  <Layout key={active} title="Work" side="Work">
    <TagSelector tags={tags.filter(tag => tag.slug != 'featured')} active={active} />
    <Desktop><WorkList works={works} filter={active} /></Desktop>
    <Mobile><WorkListSingleCulumn works={works} /> </Mobile>
  </Layout >
)

export default WorkIndex

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = await Promise.all((locales || ['en']).map(async (locale) => {
  //   const tags = await getWorkTags(locale)
  //   const paths = tags.map((t: Tag) => ({ params: { category: t.slug }, locale }))
  //   paths.unshift({ params: { category: 'all' }, locale })
  //   return paths
  // }))
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const active = params?.category as string
  const tags = await getWorkTags(locale!)
  const works = active == 'all' ? (await getAllWorks(locale)) : (await getWorksByTag(active, 100, locale))
  return {
    props: { tags, active, works },
    revalidate: 60 * 10,
  }
}
