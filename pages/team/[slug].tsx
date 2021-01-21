import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { Member, Entry, getAllMembers, getMemberDetail, getWorksByTag, getNewsByTag } from 'lib/api'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'
import { WorkList } from 'components/WorkList'


const MemberInfo = ({ member }: { member: Member }) => {
  const [scrollY, setScrollY] = useState(0)
  const onScroll = () => setScrollY(window.pageYOffset)
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  })
  return (
    <div className="member-info">
      <div className="image" style={{ height: `calc((100vw - 80px) * ${688 / (1366 - 80)} - ${scrollY}px)` }}><GradImg><img src={member.image} alt="" /></GradImg></div>
      <div className="info">
        <div className="inner">
          <Grad><div className="region">{member.region.join(' / ')}</div></Grad>
          <Grad><div className="title">{member.title}</div></Grad>
          <Grad><div className="name">{member.name}</div></Grad>
          <div className="description" ><Grad><div dangerouslySetInnerHTML={{ __html: member.content || '' }}></div></Grad></div>
          <div className="links">
            {member.links.filter((l: any) => l.url).map((link: any) => <Grad key={link.url}><div>- <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a></div></Grad>)}
          </div>
        </div>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .member-info
          position relative
          margin 0
          margin-bottom vwpx(30)
        .image
          position fixed
          top 80px
          left 80px
          overflow hidden
          img
            width vwpx(643)
            height vwpx(688)
            object-fit cover
        .info
          position relative
          padding-top vwpx(156)
          padding-left vwpx(563)
        .inner
          background-color white
          padding vwpx(80)
          font-size 0
          min-height vwpx(500)
        .region
          display inline-block
          overflow hidden
          font-size vwpx(12)
        .title
          display inline-block
          overflow hidden
          font-size vwpx(18)
          margin-top vwpx(27)
        .name
          display inline-block
          overflow hidden
          font-size vwpx(42)
          font-weight bold
          margin-top vwpx(12)
        .description
          display inline-block
          font-size 1.5rem
          line-height 3.0rem
          margin-top vwpx(19)
          margin-bottom 15px
        .links
          div
            display inline-block
            font-size 1.5rem
            margin-bottom 9px
          a
            display inline-block
      `}</style>
    </div>
  )
}


const RelatedWork = ({ works }: { works: Entry[] }) => (
  <div className="related-work">
    <h2>Related Work</h2>
    <WorkList works={works} />
    <style jsx>{`
      @import 'lib/vw.styl'
      .related-work
        margin-bottom vwpx(73)
      h2
        margin 0
        margin-bottom vwpx(50)
    `}</style>
  </div>
)


const RelatedLinks = ({ news }: { news: Entry[] }) => (
  <div className="related-links">
    <h2>Related Links</h2>
    <div className="list">
      {news.map(entry => (
        <Link key={entry.slug} href="/news">
          <a className="item">
            <img src={entry.hero_image} alt="" />
            <div className="text">
              <div className="date">{entry.date}</div>
              <div className="title" dangerouslySetInnerHTML={{ __html: entry.title }}></div>
            </div>
          </a>
        </Link>
      ))}
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .related-links
        margin-bottom vwpx(132)
      h2
        margin 0
        margin-bottom vwpx(50)
      .list
        margin-right vwpx(90)
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap vwpx(60)
      .item
        border none
        img
          width vwpx(256)
          height vwpx(144)
          object-fit cover
      .date
        font-size 1.4rem
        margin-top 1.6rem
      .title
        font-size 1.5rem
        font-weight bold
        line-height 2.4rem
        margin-top 1.2rem
  `}</style>
  </div>
)


const MemberDetail = ({ member, works, news }: { member: Member, works: Entry[], news: Entry[] }) => (
  <Layout title={member.name} side="Team" backto="/team">
    <MemberInfo member={member} />
    {works.length ? <RelatedWork works={works} /> : null}
    {news.length ? <RelatedLinks news={news} /> : null}
  </Layout >
)

export default MemberDetail

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const members = await getAllMembers()
  const paths = (locales || ['ja']).map(locale => members.map((m) => ({ params: { slug: m.slug }, locale }))).flat()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug: string = params?.slug as string
  const member = await getMemberDetail(slug, locale)
  const works = await getWorksByTag(slug, 100, locale)
  const news = await getNewsByTag(slug, 100, locale)
  return { props: { member, works, news } }
}
