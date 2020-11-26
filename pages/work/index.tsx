// import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
// import { Entry, getAllWorks } from '../../lib/api'
import WorkTag from '../../components/WorkTag'
import { Grad, GradImg } from '../../components/Grad'

// type Props = {
//   works: Entry[]
// }

const CATEGORIES = [
  ['All', 'Brand Consulting', 'Experiential', 'Featured', 'Film'],
  ['Games', 'Permanent Installation', 'Product / Service', 'Prototype', 'TV Shows']
]

const CategorySelector = () => (
  <div className="container">
    {CATEGORIES.map(cats => <table><tr >{
      cats.map(cat => <td>{cat}</td>)}</tr></table>)}
    <style jsx>{`
      .container
        margin-top 40px
      table
        border-collapse collapse
        margin-bottom 28px
      tr
        padding 0
        margin 0
        height 41px
      td
        padding 0
        margin 0
        list-style-type none
        border-left 1px solid black
        border-right 1px solid black
        border-collapse 0
        width 240px
        height 40px
        text-align center
        vertical-align middle
        font-size 14px
        letter-spacing 0.02em
    `}</style>
  </div>
)

const LargeWork = (props: any) => (
  <div className="container">
    <div className="image"><GradImg><img src={props.image} width="100%" /></GradImg></div>
    <div className="text">
      <Grad><div className="date">{props.date}</div></Grad>
      <Grad><div className="title">{props.title}</div></Grad>
      <Grad><div className="head">{props.head}</div></Grad>
      <Grad><div className="tags">
        {props.tags.map((tag: any) => <WorkTag key={tag}>{tag}</WorkTag>)}
      </div></Grad>
    </div>
    <style jsx>{`
      .container
        grid-column span 2
        grid-row span 2
        {/* opacity 0.5 */}
      .image
        font-size 0
      .text
        margin-top 25px
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size 12px
        letter-spacing -0.01em
      .title
        display inline-block
        overflow hidden
        font-size 48px
        font-weight bold
        margin-top 18px
        letter-spacing 0.0001em
      .tags
        display inline-block
        overflow hidden
        margin-top 20px
      .head
        display inline-block
        overflow hidden
        margin-top 13px
        font-size 24px
        font-weight bold
        letter-spacing 0.001em
    `}</style>
  </div>
)

const SmallWork = (props: any) => (
  <div className="container">
    <div className="image"><GradImg><img src={props.image} width="100%" /></GradImg></div>
    <div className="text">
      <Grad><div className="date">{props.date}</div></Grad>
      <Grad><div className="title">{props.title}</div></Grad>
      <Grad><div className="tags">
        {props.tags.map((tag: any) => <WorkTag key={tag}>{tag}</WorkTag>)}
      </div></Grad>
    </div>
    <style jsx>{`
      .container
        position relative
        {/* opacity 0.5 */}
      .image
        font-size 0
      .text
        position relative
        margin-top 20px
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size 12px
        letter-spacing -0.01em
      .title
        display inline-block
        overflow hidden
        font-size 24px
        font-weight bold
        margin-top 7px
        letter-spacing 0.0001em
      .tags
        display inline-block
        overflow hidden
        margin-top 14px
    `}</style>
  </div>
)

const WorkIndex = () => (
  <Layout title="WORK">
    <CategorySelector />

    <div className="works">
      <LargeWork date="July 28, 2020" title="New Stand Tokyo" tags={["Brand Consulting", "Permanent Installation", "Featured"]} head="General store of the future." image="/_/work1.png" />
      <SmallWork date="July 28, 2020" title="Future Box Seatβ" tags={["Prototype"]} image="/_/work2.png" />
      <SmallWork date="July 28, 2020" title="NHK “Hand Wash Dance”" tags={["Film"]} image="/_/work3.png" />
      <div className="item">D</div>
      <div className="item large">E</div>
      <div className="item">F</div>
      <div className="item">G</div>
    </div>

    <style jsx>{`
      .works
        display grid
        grid-template-columns repeat(3, 1fr)
        column-gap 77px
        grid-auto-rows 400px
        margin-top 100px
        margin-bottom 300px
      .item
        opacity 0.5
        background-color green
        font-size 100px
      .large
        grid-column span 2
        grid-row span 2
    `}</style>
  </Layout >
)

export default WorkIndex

// export const getStaticProps: GetStaticProps = async () => {
//   const works = await getAllWorks()
//   return { props: { works } }
// }
