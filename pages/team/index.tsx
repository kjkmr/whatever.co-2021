import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Member, getAllMembers } from 'lib/api'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'
import { langStyle } from 'lib/i18n'
import { getOptimized } from 'lib/image'
import LazyLoad from 'react-lazyload'

function shuffle<T>(array: T[]) {
  const out = Array.from(array);
  for (let i = out.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[r];
    out[r] = tmp;
  }
  return out;
}

const SingleMember = ({ member: m }: { member: Member }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <Link href={`/team/${m.slug}`}>
        <a className={langStyle()} onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
          <div>
            <GradImg mouseEntered={entered}><LazyLoad><img src={getOptimized(m.image, 640)} alt="" loading="lazy" /></LazyLoad></GradImg>
            <div className="text">
              <div><Grad className="region" inline>{m.region.join(' / ')}</Grad></div>
              <div><Grad className="title" inline>{m.title}</Grad></div>
              <div><Grad className="name" inline>{m.name}</Grad></div>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        @import 'lib/vw.styl'
        a
          display block
          border none
          padding 0
          font-size 0
          background-color white
          img
            width vwpx(260)
            height vwpx(260)
            object-fit cover
          :global(.region)
            font-size 1.0rem
            letter-spacing 0.01em
            margin-top 1.9rem
          :global(.title)
            font-size 1.4rem
            font-weight 300
            margin-top 1.2rem
          :global(.name)
            font-size 1.8rem
            font-weight 500
            line-height 2.0
            margin-top 0.4rem
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          a
            img
              width vwpx(150)
              height vwpx(150)
            .text
              margin-right vwpx(10)
            :global(.region)
              font-size 1.2rem
              letter-spacing 0
              line-height (36 / 24)
              margin-top 1.2rem
            :global(.title)
              font-size 1.2rem
              line-height (30 / 24)
              margin-top 0.3rem
            :global(.name)
              font-size 1.4rem
              line-height (42 / 28)
              margin-top 0.3rem
          a.en
            :global(.name)
              margin-top 0.2rem
      `}</style>
    </>
  )
}

const TeamIndex = ({ members }: { members: Member[] }) => {
  const [shuffled, setShuffled] = useState<Member[]>([])
  useEffect(() => { setShuffled(shuffle(members)) }, [])
  return (
    <>
      <Layout title="Team" side="Team">
        <div className="team-index">
          {shuffled.map(m => <SingleMember key={m.slug} member={m} />)}
        </div>
      </Layout>
      <style jsx>{`
        @import 'lib/vw.styl'
        .team-index
          display grid
          grid-template-columns repeat(4, 1fr)
          column-gap vwpx(82)
          grid-auto-rows vwpx(425)
          align-items start
          margin-top 40px
          min-height 100vh
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .team-index
            margin 0 0 70px 0
            grid-template-columns repeat(2, 1fr)
            grid-gap vwpx(40) vwpx(25)
            grid-auto-rows auto
      `}</style>
    </>
  )
}

export default TeamIndex

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const members = await getAllMembers(100, locale)
  return {
    props: { members },
    revalidate: 60 * 10,
  }
}
