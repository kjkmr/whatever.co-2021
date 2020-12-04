import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { Member, getAllMembers } from '../../lib/api'
import { Grad, GradImg } from '../../components/Grad'
import React from 'react'

const TeamIndex = ({ members }: { members: Member[] }) => (
  <Layout title="TEAM">
    <div className="container">
      {members.map(m => (
        <Link href={`/team/${m.slug}`} key={m.slug}>
          <a >
            <div >
              <GradImg><img src={m.image} alt="" width="260" height="260" /></GradImg>
              <Grad><div className="region">{m.region.join(' / ')}</div></Grad>
              <Grad><div className="title">{m.title}</div></Grad>
              <Grad><div className="name">{m.name}</div></Grad>
            </div>
          </a>
        </Link>
      ))}

      <style jsx>{`
        .container
          {/* opacity 0.5 */}
          display grid
          grid-template-columns repeat(4, 1fr)
          column-gap 81px
          grid-auto-rows 427px
          margin-top 40px
          font-size 0
        .region
          display inline-block
          font-size 10px
          letter-spacing 0.01em
          margin-top 20px
        .title
          display inline-block
          font-size 12px
          margin-top 14px
        .name
          display inline-block
          font-size 24px
          font-weight bold
          letter-spacing 0.05em
          margin-top 11px
      `}</style>
    </div>
  </Layout>
)

export default TeamIndex

export const getStaticProps: GetStaticProps = async () => {
  const members = await getAllMembers()
  return { props: { members } }
}
