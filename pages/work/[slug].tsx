import { useEffect, useRef } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../components/Layout'
import { Entry, getAllWorks, getPostDetails } from '../../lib/api'


const Body = ({ content }: any) => {
  const body = useRef<HTMLDivElement>(null)

  useEffect(() => {
    body.current?.querySelectorAll('iframe').forEach(iframe => {
      const wrapper = document.createElement('div')
      wrapper.classList.add('aspect-ratio')
      iframe.parentNode?.insertBefore(wrapper, iframe)
      wrapper.appendChild(iframe)
    })
  })

  return (
    <div>
      <div ref={body} className="body" dangerouslySetInnerHTML={{ __html: content || '' }} />
      <style jsx>{`
        .body
          margin: 0 auto
          padding: 0
          font-weight: 300
      `}</style>
      <style jsx global>{`
        .body
          img
            width: 100%
            height: auto
          p, table
            margin: 20px 0
            word-wrap: break-word
          .aspect-ratio
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
          .aspect-ratio iframe
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
      `}</style>
    </div>
  )
}


type Props = {
  entry?: Entry
}

const WorkDetail = ({ entry }: Props) => {
  if (entry) {
    return (
      <Layout title={entry.title}>
        <div className="entry with-image" style={{ backgroundImage: `url(${entry.image})` }}>
          <div className="inner">
            <h1 dangerouslySetInnerHTML={{ __html: entry.title }} />
            <span className="date">{entry.date}</span>
            <Body content={entry.content} />
          </div>
        </div>
        <style jsx>{`
          .entry
            padding: 0 30px
            background-repeat: no-repeat
            background-position: center top
            background-size: 960px 430px
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
        `}</style>
      </Layout >
    )
  } else {
    return (<Layout title="404" />)
  }
}

export default WorkDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const works = await getAllWorks()
  const paths = works.map((w: any) => ({ params: { slug: w.slug } }))
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
