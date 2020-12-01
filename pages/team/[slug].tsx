import { GetStaticProps, GetStaticPaths } from 'next'
import { Member, Entry, getAllMembers, getMemberDetail, getWorksByTag } from '../../lib/api'
import Layout from '../../components/Layout'
import { Grad, GradImg } from '../../components/Grad'
import { WorkList } from '../../components/WorkList'


const MemberInfo = ({ member }: { member: Member }) => (
  <div className="container">
    <div className="image"><GradImg><img src={member.image} alt="" width="643" height="688" /></GradImg></div>
    <div className="info">
      <div className="inner">
        <Grad><div className="region">{member.region.join(' / ')}</div></Grad>
        <Grad><div className="title">{member.title}</div></Grad>
        <Grad><div className="name">{member.name}</div></Grad>
        <Grad><div className="description" dangerouslySetInnerHTML={{ __html: member.content || '' }} /></Grad>
        <div>
          <ul>{member.links.map((link: any) => <li key={link.url}><Grad><span>- <a href={link.url}>{link.name}</a></span></Grad></li>)}</ul>
        </div>
      </div>
    </div>
    <style jsx>{`
      .container
        {/* opacity 0.5 */}
        position relative
        margin 0
        margin-bottom 40px
      .image
        position absolute
        top 0
        left 0
        width 643
        height 688
        overflow hidden
        img
          object-fit cover
      .info
        position relative
        padding-top 156px
        padding-left 563px
      .inner
        background-color white
        padding 80px
        font-size 0
        min-height 372px
      .region
        display inline-block
        font-size 11px
        letter-spacing 0.02em
      .title
        display inline-block
        font-size 18px
        margin-top 28px
      .name
        display inline-block
        font-size 48px
        font-weight bold
        margin-top 23px
      .description
        font-size 15px
        letter-spacing 0.01em
        line-height 2.15em
        margin-top 35px
        margin-bottom 42px
        p
          margin 0
      ul
        margin 0
        padding 0
      li
        font-size 16px
        list-style-type none
        margin-bottom 10px
        overflow hidden
        span
          display inline-block
        a
          padding-bottom 2px
          border-bottom 1px solid red
          display inline-block
    `}</style>
  </div>
)


const RelatedWork = ({ works }: { works: Entry[] }) => (
  <div className="container">
    <h2>Related Work</h2>
    <WorkList works={works} />
    <style jsx>{`
      .container
        {/* opacity 0.5 */}
        min-height 1000px
      h2
        font-size 36px
    `}</style>
  </div>
)


const MemberDetail = ({ member, works }: { member: Member, works: Entry[] }) => (
  <Layout title={member.name}>
    <MemberInfo member={member} />
    <RelatedWork works={works} />
    <style jsx>{`
    `}</style>
  </Layout >
)

export default MemberDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const members = await getAllMembers()
  const paths = members.map((m) => ({ params: { slug: m.slug } }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug: string = params?.slug as string
  const member = await getMemberDetail(slug)
  const works = await getWorksByTag(slug)
  return { props: { member, works } }
}
