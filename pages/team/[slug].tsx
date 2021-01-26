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
    <>
      <div className="member-info">
        <div className="image" style={{ height: `calc((100vw - 80px) * ${688 / (1366 - 80)} - ${scrollY}px)` }}><GradImg><img src={member.image} alt="" /></GradImg></div>
        <div className="info">
          <div className="inner">
            <div><Grad className="region">{member.region.join(' / ')}</Grad></div>
            <div><Grad className="title">{member.title}</Grad></div>
            <div><Grad className="name">{member.name}</Grad></div>
            <div><Grad className="description" inline={false}><div className="desc-inner" dangerouslySetInnerHTML={{ __html: member.content || '' }}></div></Grad></div>
            <div className="links">
              {member.links.filter((l: any) => l.url).map((link: any) => <div key={link.url}><Grad className="link-item">- <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a></Grad></div>)}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .member-info
          position relative
          margin 0
          margin-bottom vwpx(30)
          font-size 0
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
          :global(.region)
            font-size 1.2rem
          :global(.title)
            font-size 1.8rem
            font-weight 500
            margin-top 2.7rem
          :global(.name)
            font-size vwpx_min(42)
            font-weight bold
            margin-top vwpx_min(12)
            margin-bottom 0.4rem
          :global(.description)
            margin-top 3.0rem
            margin-bottom 3.0rem
          .desc-inner
            :global(p)
              margin 0
              font-size var(--font-size-ja)
              line-height 3.0rem
            :global(p + p)
              margin-top 2.0rem
        .links
          :global(.link-item)
            font-size var(--font-size-ja)
            margin-bottom 0.9rem
            a
              display inline-block
      `}</style>
    </>
  )
}


const RelatedWork = ({ works }: { works: Entry[] }) => (
  <>
    <div className="related-work">
      <div><Grad className="related-work-title">Related Work</Grad></div>
      <WorkList works={works} />
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .related-work
        margin-bottom vwpx(73)
        font-size 0
        :global(.related-work-title)
          font-size vwpx_min(24)
          font-weight 700
          margin 0
          margin-bottom vwpx(50)
    `}</style>
  </>
)


const RelatedLinkItem = ({ entry }: { entry: Entry }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <Link href={`/news/${entry.slug}`}>
        <a className="related-link-item" onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
          <GradImg mouseEntered={entered}><img src={entry.hero_image} alt="" /></GradImg>
          <div><Grad className="item-date">{entry.date}</Grad></div>
          <div><Grad className="item-title"><div dangerouslySetInnerHTML={{ __html: entry.title }} /></Grad></div>
        </a>
      </Link>
      <style jsx>{`
        @import 'lib/vw.styl'
        .related-link-item
          display block
          border none
          padding 0
          font-size 0
          img
            width vwpx2(256, 160)
            height vwpx2(144, 160)
            object-fit cover
          :global(.item-date)
            font-size 1.2rem
            font-weight 300
            margin-top 2.2rem
          :global(.item-title)
            font-size 1.5rem
            font-weight 500
            line-height 2.4rem
            margin-top 1.2rem
      `}</style>
    </>
  )
}


const RelatedLinks = ({ news }: { news: Entry[] }) => (
  <>
    <div className="related-links">
      <div><Grad className="title">Related Links</Grad></div>
      <div className="list">
        {news.map(entry => (<RelatedLinkItem key={entry.slug} entry={entry} />))}
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .related-links
        margin-right 80px
        margin-bottom vwpx(175)
        font-size 0
        :global(.title)
          font-size vwpx_min(24)
          font-weight 700
          margin 0
          margin-bottom vwpx(50)
      .list
        margin-right vwpx(90)
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap vwpx(60)
        align-items start
    `}</style>
  </>
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
