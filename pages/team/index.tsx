import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Member, getAllMembers } from 'lib/api'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'

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
        <a onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
          <div>
            <GradImg mouseEntered={entered}><img src={m.image} alt="" /></GradImg>
            <div><Grad className="region">{m.region.join(' / ')}</Grad></div>
            <div><Grad className="title">{m.title}</Grad></div>
            <div><Grad className="name">{m.name}</Grad></div>
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
            line-height 2.0em
            margin-top 0.4rem
      `}</style>
    </>
  )
}

const TeamIndex = ({ members }: { members: Member[] }) => {
  const [shuffled, setShuffled] = useState<Member[]>([])
  useEffect(() => {
    setShuffled(shuffle(members))
  }, [members])
  return (
    <>
      <Layout title="Team" side="Team">
        <div className="container">
          {shuffled.map(m => <SingleMember key={m.slug} member={m} />)}
        </div>
      </Layout>
      <style jsx>{`
        @import 'lib/vw.styl'
        .container
          display grid
          grid-template-columns repeat(4, 1fr)
          column-gap vwpx(82)
          grid-auto-rows vwpx(425)
          align-items start
          margin-top 40px
      `}</style>
    </>
  )
}

export default TeamIndex

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const members = await getAllMembers(100, locale)
  return { props: { members } }
}
