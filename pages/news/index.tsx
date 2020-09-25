import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { Entry, getAllNews } from '../../lib/api'

type Props = {
  entries: Entry[]
}

const NewsIndex = ({ entries }: Props) => (
  <Layout title="WORK">
    <div>
      {entries.map(e => (
        <div className="wrapper" key={e.slug}>
          <div className="entry with-image" style={{ backgroundImage: `url(${e.image})` }}>
            <div className="inner">
              <h1 className="title"><Link href={`/news/${e.slug}/`}><a dangerouslySetInnerHTML={{ __html: e.title }} /></Link></h1>
              <span className="date"><Link href={`/news/${e.slug}/`}><a>{e.date}</a></Link></span>
              <div className="body">
                <div dangerouslySetInnerHTML={{ __html: e.content || '' }} />
              </div>
            </div>
          </div></div>
      ))}
    </div>
    <style jsx>{`
      .wrapper + .wrapper
        border-top: 1px solid #f2f2f2
        margin-top: 30px
        padding-top: 100px
      .entry
        padding: 0 30px
        background-repeat: no-repeat
        background-position: center top
        &.with-image
          padding-top: 30px

        .featured-image
          height: (430px - 34)

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

          h1.title
            margin: 32px auto 12px
            font-weight: 400
            font-size: 22px
            text-align: center
            a
              border: none

          .date
            display: block
            margin-bottom: 82px
            font: normal 300 15px acumin-pro, sans-serif
            text-align: center
            a
              border: none

          .body
            margin: 0 auto
            padding: 0
            font-weight: 300

            img, iframe
              width: 100%
    `}</style>
  </Layout >
)

export default NewsIndex

export const getStaticProps: GetStaticProps = async () => {
  const entries = await getAllNews()
  return { props: { entries } }
}