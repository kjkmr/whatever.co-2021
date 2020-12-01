import { useState } from 'react'
import { GetStaticProps } from 'next'
import classNames from 'classnames/bind'
import { Entry, getAllWorks, getWorkTags, Tag } from '../../lib/api'
import Layout from '../../components/Layout'
import WorkTag from '../../components/WorkTag'
import { Grad, GradImg } from '../../components/Grad'


const TagItem = ({ name, focused, onclick }: any) => {
  return (
    <li className={classNames('container', { focused })}>
      <button onClick={() => onclick(name)}>
        <Grad><div className="inner">{name}</div></Grad>
      </button>
      <style jsx>{`
        .container
          position relative
          z-index 0
          display inline-block
          padding 0
          margin 0
          margin-right -1px
          margin-bottom 28px
          list-style-type none
          border 1px solid transparent
          border-left 1px solid black
          border-right 1px solid black
          width 240px
          height 39px
          text-align center
          vertical-align middle
        button
          margin 0
          padding 0
          padding-bottom 3px
          padding-left 2px
          border none
          background-color transparent
          width 100%
          height calc(100%)
        .focused
          border 1px solid red
          z-index 100
        .inner
          display inline-block
          font-size 14px
          letter-spacing 0.02em
      `}</style>
    </li>
  )
}


type TagSelectorProp = {
  tags: Tag[],
  onchange: (name: string) => void,
}

const TagSelector = ({ tags, onchange }: TagSelectorProp) => {
  const [current, setCurrent] = useState(tags[0].name)
  const onclick = (tag: string) => {
    setCurrent(tag)
    onchange(tag)
  }
  return (
    <ol className="container">
      {tags.map(tag => <TagItem key={tag.slug} name={tag.name} focused={tag.name == current} onclick={onclick} />)}
      <style jsx>{`
        .container
          padding 0
          margin 0
          margin-top 40px
      `}</style>
    </ol>
  )
}

const LargeWork = (props: any) => (
  <div className="container">
    <div className="image"><GradImg><img src={props.image} width="832" height="467" /></GradImg></div>
    <div className="text">
      <Grad><div className="date">{props.date}</div></Grad>
      <Grad><div className="title">{props.title}</div></Grad>
      <Grad><div className="head">{props.head}</div></Grad>
      <Grad><div className="tags">
        {props.tags.map((tag: Tag) => <WorkTag key={tag.slug}>{tag.name}</WorkTag>)}
      </div></Grad>
    </div>
    <style jsx>{`
      .container
        grid-column span 2
        grid-row span 2
      .image
        font-size 0
        img
          object-fit cover
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
    <div className="image"><GradImg><img src={props.image} width="377" height="212" /></GradImg></div>
    <div className="text">
      <Grad><div className="date">{props.date}</div></Grad>
      <Grad><div className="title" dangerouslySetInnerHTML={{ __html: props.title }} /></Grad>
      <Grad><div className="tags">
        {props.tags.map((tag: Tag) => <WorkTag key={tag.slug}>{tag.name}</WorkTag>)}
      </div></Grad>
    </div>
    <style jsx>{`
      .container
        position relative
      .image
        font-size 0
        img
          object-fit cover
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
        margin-top 10px
      .tags
        display inline-block
        overflow hidden
        margin-top 14px
    `}</style>
  </div>
)


type WorkIndexProps = {
  tags: Tag[],
  works: Entry[],
}

const WorkIndex = ({ tags, works }: WorkIndexProps) => {
  const [tag, setTag] = useState(tags[0].name)
  const onchangetag = (tag: string) => {
    setTag(tag)
  }
  return (
    <Layout title="WORK">
      <TagSelector tags={tags} onchange={onchangetag} />

      <div className="works">
        {works.map(w => {
          const tags = w.tags?.map(t => t.name)
          if (tag == "All") {
            if (tags?.includes('Featured')) {
              return <LargeWork key={w.slug} date={w.date} title={w.title} tags={w.tags} image={w.image} />
            } else {
              return <SmallWork key={w.slug} date={w.date} title={w.title} tags={w.tags} image={w.image} />
            }
          } else if (tags?.includes(tag)) {
            return <SmallWork key={w.slug} date={w.date} title={w.title} tags={w.tags} image={w.image} />
          }
        })}
      </div>

      <style jsx>{`
        .works
          display grid
          grid-template-columns repeat(3, 1fr)
          column-gap 77px
          grid-auto-rows 400px
          margin-top 72px
          margin-bottom 100px
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
}

export default WorkIndex

export const getStaticProps: GetStaticProps = async () => {
  const tags = await getWorkTags()
  tags.unshift({ id: 0, name: 'All', slug: 'all', type: 'work' })
  const works = await getAllWorks()
  return { props: { tags, works } }
}
