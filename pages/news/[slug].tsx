import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../components/Layout'
import { Entry, getAllNews, getPostDetails } from '../../lib/api'

type Props = {
  entry?: Entry
}

const WorkDetail = ({ entry }: Props) => {
  if (entry) {
    return (
      <Layout title={entry.title}>
        <div className="entry with-image" style={{ backgroundImage: `url(${entry.image})` }}>
          <div className="inner">
            <h1>{entry.title}</h1>
            <span className="date">{entry.date}</span>
            <div className="body">
              <div dangerouslySetInnerHTML={{ __html: entry.content || '' }}></div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .entry
            padding: 0 30px
            background-repeat: no-repeat
            background-position: center top
            &.with-image
              padding-top: 30px
          .inner
            position: relative
            z-index: auto
            padding: 40px 62px
            padding-top: 396px
            background-repeat: no-repeat
            background-position: -34px -34px
            background-color: transparent
            border: 4px solid transparent
            border-radius: 10px
            overflow: hidden
            transform: translateZ(0)
          h1
            margin: 32px auto 12px
            font-weight: 400
            font-size: 22px
            text-align: center
          .date
            display: block
            margin-bottom: 82px
            font: normal 300 15px acumin-pro, sans-serif
            text-align: center
          .body
            margin: 0 auto
            padding: 0
            font-weight: 300
            img, iframe
              width: 100%
            p, table
              margin: 20px 0
              word-wrap: break-word
        `}</style>
      </Layout >
    )
  } else {
    return (<Layout title="404" />)
  }
}

export default WorkDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getAllNews()
  const paths = entries.map((e: any) => ({ params: { slug: e.slug } }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.slug || Array.isArray(params.slug)) return { props: {} };
  const entry = await getPostDetails(params.slug)
  return { props: { entry } }
}
