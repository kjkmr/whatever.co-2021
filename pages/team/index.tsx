import React from 'react'
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

const TeamIndex = ({ members }: { members: Member[] }) => (
  <Layout title="Team" side="Team">
    <div className="container">
      {members.map(m => (
        <Link href={`/team/${m.slug}`} key={m.slug}>
          <a>
            <div>
              <GradImg><img src={m.image} alt="" /></GradImg>
              <Grad><div className="region">{m.region.join(' / ')}</div></Grad>
              <Grad><div className="title">{m.title}</div></Grad>
              <Grad><div className="name">{m.name}</div></Grad>
            </div>
          </a>
        </Link>
      ))}

      <style jsx>{`
        @import 'lib/vw.styl'
        .container
          display grid
          grid-template-columns repeat(4, 1fr)
          column-gap vwpx(81)
          grid-auto-rows vwpx(427)
          margin-top 40px
          font-size 0
        a
          border none
        img
          width vwpx(260)
          height vwpx(260)
        .region
          display inline-block
          font-size 1.0rem
          letter-spacing 0.01em
          margin-top 2.0rem
        .title
          display inline-block
          font-size 1.4rem
          font-weight 300
          margin-top 1.2rem
        .name
          display inline-block
          font-size 1.8rem
          line-height 1.8rem
          font-weight bold
          letter-spacing 0.05em
          margin-top 1.4rem
      `}</style>
    </div>
  </Layout>
)

export default TeamIndex

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const members = await getAllMembers(100, locale)
  return { props: { members } }
}
