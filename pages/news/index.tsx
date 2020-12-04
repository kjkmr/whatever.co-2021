import { GetStaticProps } from 'next'
import { Entry, getAllNews } from '../../lib/api'
import Layout from '../../components/Layout'
import { Grad, GradImg } from '../../components/Grad'

const NewsItem = ({ entry }: { entry: Entry }) => (
  <div className="container">
    <div className="image"><GradImg><img src={entry.image} alt="" /></GradImg></div>
    <div className="info">
      <Grad><div className="date">{entry.date}</div></Grad>
      <Grad><div className="title">{entry.title}</div></Grad>
      <Grad><div className="desc" dangerouslySetInnerHTML={{ __html: entry.content || '' }} /></Grad>
    </div>
    <style jsx>{`
      .container
        display grid
        grid-template-columns 611px 531px
        grid-gap 65px
        font-size 0
        margin-bottom 100px
      .image
        img
          width 611px
          height 345px
          object-fit cover
      .date
        display inline-block
        font-size 12px
        font-weight light
      .title
        display inline-block
        font-size 36px
        font-weight bold
        margin-top 8px
      .desc
        display inline-block
        font-size 16px
        font-weight light
        margin-top 30px
    `}</style>
  </div>
)

const NewsIndex = ({ entries }: { entries: Entry[] }) => (
  <Layout title="WORK">
    <div className="container">
      {entries.map(entry => <NewsItem key={entry.slug} entry={entry} />)}
    </div>
    <style jsx>{`
      .container
        margin-top 40px
    `}</style>
  </Layout >
)

export default NewsIndex

export const getStaticProps: GetStaticProps = async () => {
  const entries = await getAllNews()
  return { props: { entries } }
}
