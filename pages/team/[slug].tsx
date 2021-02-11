import { useState, useRef } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { useLayoutEffect } from 'lib/useLayoutEffect'
import { Member, Entry, getMemberDetail, getWorksByTag, getNewsByTag } from 'lib/api'
import Layout from 'components/Layout'
import { Grad, GradImg, GradLink, setupLink, GradLinkedTextBox } from 'components/Grad'
import { WorkList } from 'components/WorkList'
import { Desktop, Mobile } from 'components/Responsive'
import { langStyle, t } from 'lib/i18n'
import { getOptimized } from 'lib/image'

const PhotoDesktop = ({ src }: { src: string }) => {
  const [scrollY, setScrollY] = useState(0)
  const onScroll = () => setScrollY(window.pageYOffset)
  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  })
  return (<>
    <div className="image" style={{
      height: `calc((100vw - 80px) * ${688 / (1366 - 80)} - ${scrollY}px)`
    }}><GradImg><img src={src} alt="" /></GradImg></div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .image
        position fixed
        top 80px
        left 80px
        overflow hidden
        img
          width vwpx(643)
          height vwpx(688)
          object-fit cover
`}</style>
  </>)
}

const PhotoMobile = ({ src }: { src: string }) => {
  const [scrollY, setScrollY] = useState(0)
  const onScroll = () => setScrollY(window.pageYOffset)
  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  })
  return (<>
    <div className="image" style={{
      height: `calc(100vw * ${325 / 375} - ${scrollY}px)`
    }}><GradImg><img src={src} alt="" /></GradImg></div>
    <style jsx>{`
      @import 'lib/vw-mobile.styl'
      .image
        display block
        position fixed
        top 50px
        left 50px
        overflow hidden
        img
          width vwpx(325)
          height vwpx(325)
          object-fit cover
`}</style>
  </>)
}

const MemberInfo = ({ member }: { member: Member }) => {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const cleanups: (() => void)[] = []
    ref.current?.querySelectorAll('a').forEach(a => {
      a.target = '_blank'
      cleanups.push(setupLink(a))
    })
    return () => { cleanups.forEach(c => c()) }
  })
  return (
    <>
      <div className={langStyle('member-info')}>
        <Desktop><PhotoDesktop src={getOptimized(member.image!, 1200)} /></Desktop>
        <Mobile><PhotoMobile src={getOptimized(member.image!, 1200)} /></Mobile>
        <div className="info">
          <div className="inner">
            <div><Grad className="region" inline>{member.region.join(' / ')}</Grad></div>
            <div><Grad className="title" inline>{member.title + (member.coCreator ? ' (Co-creator)' : '')}</Grad></div>
            <div><Grad className="name" inline>{member.name}</Grad></div>
            <div><Grad className="description"><div ref={ref} className="desc-inner" dangerouslySetInnerHTML={{ __html: member.content || '' }}></div></Grad></div>
            <div className="links">
              {member.links.filter((l: any) => l.url).map((link: any) => <div key={link.url}><Grad className="link-item" inline>- <GradLink href={link.url} target="_blank" rel="noopener noreferrer" inlineBlock={true}>{link.name}</GradLink></Grad></div>)}
            </div>
            <div className="co-creator">
              <div className="title">{t('team_cocreator_title')}</div>
              <GradLinkedTextBox className="text" html={t('team_cocreator_text')} />
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
                line-height 2.0
              :global(p + p)
                margin-top 2.0rem
            .co-creator
              .title
                font-size var(--font-size-ja)
                font-weight 500
                margin-top 5.5rem
              :global(.text)
                font-size 1.2rem
                font-weight 300
                line-height 2.0
                margin-top 1.8rem
          .links
            :global(.link-item)
              font-size var(--font-size-ja)
              margin-bottom 1.1rem
        .en.member-info
          .inner
            :global(.name)
              font-size vwpx_min(46)
              margin-top vwpx_min(25)
            :global(.description)
              margin-top 3.2rem
            .desc-inner
              :global(p)
                font-size var(--font-size-en)
                font-weight 200
                line-height 1.8
          .links
            :global(.link-item)
              font-weight 500
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .member-info
            margin 0
            .info
              padding vwpx(295) 0 0 0
            .inner
              padding 3.0rem 0 0 0
              margin-right vwpx(30)
              :global(.title)
                font-size 1.2rem
                font-weight 300
                margin-top 1.3rem
              :global(.name)
                font-size 2.7rem
                margin 0.4rem 0 0 0
              :global(.description)
                margin 2.0rem 0 3.1rem 0
              .desc-inner
                :global(p)
                  line-height 2.0
              .links
                :global(.link-item)
                  font-size var(--font-size-ja)
                  font-weight 700
                  margin-bottom 0.9rem
              .co-creator
                .title
                  margin-top 2.5rem
                .text
                  font-size 1.1rem
                  line-height (38 / 22)
                  margin-top 0.8rem
          .en.member-info
            .inner
              :global(.name)
                font-size 3.0rem
                line-height (64 / 60)
                margin-top 1.1rem
              :global(.description)
                margin-top 2.4rem
                {/* margin-bottom 3.3rem */}
              .desc-inner
                margin 0
                :global(p)
                  font-size 1.4rem
                  font-weight 300
                  line-height (50 / 28)
              .links
                :global(.link-item)
                  font-size 1.4rem
                  font-weight 700
                  margin 0
                  margin-bottom 0.7rem
      `}</style>
    </>
  )
}


const RelatedWork = ({ works }: { works: Entry[] }) => (
  <>
    <div className="related-work">
      <div><Grad className="related-work-title" inline>Related Work</Grad></div>
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
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .related-work
          margin 8.5rem 0 0 -0.1rem
          :global(.related-work-title)
            font-size 1.8rem
            margin 0 0 3.6rem 0
    `}</style>
  </>
)


const RelatedLinkItem = ({ entry }: { entry: Entry }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <Link href={`/news/${entry.slug}`}>
        <a className={langStyle('related-link-item')} onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
          <GradImg mouseEntered={entered}><img src={getOptimized(entry.hero_image!, 640)} alt="" loading="lazy" /></GradImg>
          <div><Grad className="item-date" inline>{entry.date}</Grad></div>
          <div><Grad className="item-title" inline><div dangerouslySetInnerHTML={{ __html: entry.title }} /></Grad></div>
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
            line-height 1.6
            margin-top 1.2rem
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .related-link-item
            img
              width vwpx(150)
              height vwpx(84)
            :global(.item-date)
              font-size 1.0rem
              margin-top 1.45rem
            :global(.item-title)
              font-size 1.3rem
              line-height (42 / 26)
              margin 0.5rem vwpx(10) 0 0
          .en.related-link-item
            :global(.item-title)
              font-size 1.4rem
              line-height (42 / 28)
      `}</style>
    </>
  )
}


const RelatedLinks = ({ news }: { news: Entry[] }) => (
  <>
    <div className="related-links">
      <div><Grad className="title" inline>Related News</Grad></div>
      <div className="list">
        {news.map(entry => (<RelatedLinkItem key={entry.slug} entry={entry} />))}
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .related-links
        margin-right 80px
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
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .related-links
          margin 7.4rem 0 0 -0.1rem
          :global(.title)
            font-size 1.8rem
            margin 0 0 3.6rem 0
        .list
          margin 0
          grid-template-columns repeat(2, 1fr)
          grid-gap vwpx(35) vwpx(25)
    `}</style>
  </>
)


const MemberDetail = ({ member, works, news }: { member: Member, works: Entry[], news: Entry[] }) => (
  <>
    <Layout title={member.name} side="Team" backto="/team">
      <div className="details">
        <MemberInfo member={member} />
        {works.length ? <RelatedWork works={works} /> : null}
        {news.length ? <RelatedLinks news={news} /> : null}
      </div>
    </Layout >
    <style jsx>{`
      @media (--mobile)
        .details
          margin-bottom 6.8rem
    `}</style>
  </>
)

export default MemberDetail

export const getStaticPaths: GetStaticPaths = async () => {
  // const members = await getAllMembers()
  // const paths = (locales || ['ja']).map(locale => members.map((m) => ({ params: { slug: m.slug }, locale }))).flat()
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug: string = params?.slug as string
  const member = await getMemberDetail(slug, locale)
  const works = await getWorksByTag(slug, 100, locale)
  const news = await getNewsByTag(slug, 100, locale)
  return {
    props: { member, works, news },
    revalidate: 60 * 10,
  }
}
