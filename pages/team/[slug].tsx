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
            {member.links.filter((l: any) => l.url).map((link: any) => <Grad><div>- <a href={link.href} target="_blank" rel="noopener noreferrer">{link.name}</a></div></Grad>)}
          </div>
        </div>
      </div>
      <style jsx>{`
        vwpx(px)
          'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
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
          font-size 1.5rem
          line-height 3.0rem
          margin-top vwpx(34)
          margin-bottom 30px
          p
            margin 0
        .links
          div
            display inline-block
            font-size 1.5rem
            margin-bottom 9px
          a
            padding-bottom 5px
            border-bottom 1px solid red
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
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .related-work
        {/* opacity 0.5
        min-height 1000px */}
        margin-bottom vwpx(74)
      h2
        font-size vwpx(36)
        margin 0
        margin-bottom vwpx(72)
    `}</style>
  </div>
)


const RelatedNews = ({ news }: { news: Entry[] }) => (
  <div className="related-news">
    <h2>Related News</h2>
    <div className="news-list">
      {news.map(entry => (
        <Link href="/news">
          <a className="news-item">
            <img src={entry.image} alt="" />
            <div className="text">
              <div className="date">{entry.date}</div>
              <div className="title" dangerouslySetInnerHTML={{ __html: entry.title }}></div>
            </div>
          </a>
        </Link>
      ))}
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .related-news
        {/* opacity 0.7 */}
        margin-bottom vwpx(132)
      h2
        font-size vwpx(36)
        margin 0
        margin-bottom vwpx(72)
      .news-list
        margin-right vwpx(90)
        display grid
        grid-template-columns repeat(2, 1fr)
        grid-gap vwpx(60) vwpx(70)
      .news-item
        display grid
        grid-template-columns vwpx(271) auto
        column-gap vwpx(30)
        img
          width vwpx(271)
          height vwpx(152)
          object-fit cover
      .date
        font-size vwpx(14)
        margin-top vwpx(-2)
      .title
        font-size vwpx(15)
        font-weight bold
        line-height vwpx(30)
        margin-top vwpx(14)
  `}</style>
  </div>
)


const MemberDetail = ({ member, works, news }: { member: Member, works: Entry[], news: Entry[] }) => (
  <Layout title={member.name} side="Team" backto="/team">
    <MemberInfo member={member} />
    {works.length ? <RelatedWork works={works} /> : null}
    {news.length ? <RelatedNews news={news} /> : null}
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
