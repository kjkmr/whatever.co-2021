import { useEffect, useRef } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { Tag, Entry, Credit, Person, getAllWorks, getPostDetails } from '../../lib/api'
import Layout from '../../components/Layout'
import { Grad, GradImg } from '../../components/Grad'
import WorkTag from '../../components/WorkTag'


const Header = ({ work }: { work: Entry }) => (
  <div className="header">
    <div className="image"><GradImg><img src={work.image} width="1286" height="688" /></GradImg></div>
    <div className="info">
      <div className="inner">
        <Grad><div className="date">{work.date}</div></Grad>
        <Grad><div className="title" dangerouslySetInnerHTML={{ __html: work.title }}></div></Grad>
        <Grad><div className="tags">
          {work.tags?.map((tag: Tag) => <WorkTag key={tag.slug}>{tag.name}</WorkTag>)}
        </div></Grad>
      </div>
    </div>
    <style jsx>{`
      .header
        {/* opacity 0.5 */}
        position relative
        font-size 0
      .image
        position absolute
        top 0
        left 0
        img
          object-fit cover
      .info
        position relative
        padding-top 459px
        padding-right 486px
      .inner
        background-color white
        padding-top 52px
        padding-bottom 60px
        padding-left 80px
      .date
        display inline-block
        font-size 16px
      .title
        display inline-block
        font-size 84px
        font-weight bold
        margin-top 37px
        margin-left -6px
      .tags
        display inline-block
        margin-top 41px
    `}</style>
  </div>
)

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
          width 900px
          padding 0
          margin 0 auto 130px
      `}</style>
      <style jsx global>{`
        .body
          img
            width 100%
            height auto
          p, table
            margin 20px 0
            font-size 18px
            line-height 2em
            word-wrap break-word
          .aspect-ratio
            position relative
            width 100%
            height 0
            padding-bottom 56.25%
          .aspect-ratio iframe
            position absolute
            width 100%
            height 100%
            left 0
            top 0
      `}</style>
    </div>
  )
}

const CreditMember = ({ member }: { member: Person }) => {
  let name = <>{member.name}</>
  if (!member.company) {
    if (member.url?.match(/^[a-z\-]+$/)) {
      name = <Link href={`/team/${member.url}`}><a className="credit-name-link">{member.name}</a></Link>
    } else if (member.url) {
      name = <a href={member.url} className="credit-name-link">{member.name}</a>
    }
  }
  return (
    <div className="container">
      <Grad><div className="role">{member.role}</div></Grad>
      <Grad><div className="name">
        {name}
        {member.company ? <span className="company">&nbsp;{member.url ? <a href={member.url} target="_blank" rel="noopener noreferrer">({member.company})</a> : `(${member.company})`}</span> : null}
      </div></Grad>
      <style jsx>{`
      .container
        margin-bottom 40px
        font-size 0
      .role
        display inline-block
        font-size 12px
        font-weight light
      .name
        display inline-block
        font-size 16px
        font-weight normal
        margin-top 7px
      .company
        display inline-block
      a, :global(.credit-name-link)
        display inline-block
        padding-bottom 1px
        border-bottom 1px solid red
    `}</style>
    </div>
  )
}

const CreditGroup = ({ credit }: { credit: Credit }) => (
  <div className="container">
    {credit.members.map(member => <CreditMember key={member.name} member={member} />)}
    <style jsx>{`
      .container
        display grid
        grid-template-columns repeat(4, 1fr)
    `}</style>
  </div>
)

const Credits = ({ credit }: { credit: Credit[] }) => (
  <div className="container">
    <Grad><h2>Credit</h2></Grad>
    {credit.map((credit, index) => <CreditGroup key={index} credit={credit} />)}
    <style jsx>{`
      .container
        width 980px
        margin auto
        margin-top -5px
        margin-left 192px
        margin-bottom 120px
        font-size 0
      h2
        display inline-block
        font-size 24px
        font-weight bold
        margin-bottom 77px
      .credits
        display grid
        grid-template-columns repeat(4, 1fr)
    `}</style>
  </div>
)

const WorkDetail = ({ work }: { work?: Entry }) => (
  <Layout title={work?.title}>
    {work ? <>
      <Header work={work} />
      <Body content={work.content} />
      <Credits credit={work.credit || []} />
    </> : null}
  </Layout >
)


export default WorkDetail

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const works = await getAllWorks(1)
  const paths = (locales || []).map(locale => works.map((w: any) => ({ params: { slug: w.slug }, locale }))).flat()
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const work = await getPostDetails(params?.slug as string, locale)
  return { props: { work } }
}
