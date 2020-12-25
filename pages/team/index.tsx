import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { Member, getAllMembers } from '../../lib/api'
import { Grad, GradImg } from '../../components/Grad'
import React from 'react'

const TeamIndex = ({ members }: { members: Member[] }) => (
  <Layout title="Team" side="Team">
    <div className="container">
      {members.map(m => (
        <Link href={`/team/${m.slug}`} key={m.slug} prefetch={false}>
          <a >
            <div >
              <GradImg><img src={m.image} alt="" /></GradImg>
              <Grad><div className="region">{m.region.join(' / ')}</div></Grad>
              <Grad><div className="title">{m.title}</div></Grad>
              <Grad><div className="name">{m.name}</div></Grad>
            </div>
          </a>
        </Link>
      ))}

      <style jsx>{`
        vwpx(px)
          'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
        .container
          {/* opacity 0.5 */}
          display grid
          grid-template-columns repeat(4, 1fr)
          column-gap vwpx(81)
          grid-auto-rows vwpx(427)
          margin-top 40px
          font-size 0
        img
          width vwpx(260)
          height vwpx(260)
        .region
          display inline-block
          font-size vwpx(10)
          letter-spacing 0.01em
          margin-top vwpx(20)
        .title
          display inline-block
          font-size vwpx(14)
          font-weight bold
          margin-top vwpx(12)
        .name
          display inline-block
          font-size vwpx(20)
          font-weight bold
          letter-spacing 0.05em
          margin-top vwpx(8)
      `}</style>
    </div>
  </Layout>
)

export default TeamIndex

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const members = await getAllMembers(100, locale)
  return { props: { members } }
}
