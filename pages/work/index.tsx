import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllWorks } from '../../lib/api'

type Props = {
  items: {
    slug: string
    title: string
    date: string
    image: string
  }[]
}

const WorkIndex = ({ items }: Props) => (
  <Layout title="WORK">
    <div className="list">
      {items.map(item => (
        <Link href={`/work/${item.slug}`} key={item.slug}>
          <div className="item" style={{ backgroundImage: `url(${item.image})` }}>
            <div className="inner">
              <div className="title">{item.title}</div>
              <div className="date">{item.date}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
    <style jsx>{`
      .list
        margin 98px -30px 0
      .item
        width: 280px
        height: 202px
        margin: 0 30px 34px
        float: left
        text-align: center
        background-repeat: no-repeat
        background-size: 280px 125px
      .inner
        position: relative
        margin: 10px
        padding: 125px 10px 18px
        border: 4px solid transparent
        cursor: pointer
      .title
        margin-bottom: 5px
        font-size: 15px
        line-height: 1.5em
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
      .date
        font: normal 300 12px acumin-pro, sans-serif
    `}</style>
  </Layout >
)

export default WorkIndex

export const getStaticProps: GetStaticProps = async () => {
  const items = await getAllWorks()
  return { props: { items } }
}
