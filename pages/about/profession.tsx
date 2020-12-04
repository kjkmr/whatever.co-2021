import Layout from '../../components/Layout'
import { Header, Footer, SectionTitle } from '../../components/About'
import React from 'react'

const Section1 = () => (
  <div className="container">
    <SectionTitle num="01" nx={-4.5} title="Flexible employment options" ty={2} />
    <div className="t">To ensure that each member of the team and the team can maximize their creativity, we have a Co-Creator system as well as the usual employment structure. In addition to no commitment to the work, you are free to use Whatever’s network, knowledge and facilities, and you are free to raise your hand on any project that comes to us. We have a project-based fee structure that starts to accrue from the moment you raise your hand. Our flexible work style allows you to work in a way that suits your career and life stage.</div>
    <style jsx>{`
      .container
        margin-top 137px
        margin-left 80px
      .t
        font-size 16px
        line-height 2em
        margin-top 33px
        width 602px
    `}</style>
  </div>
)

const Alliances = ({ logo, width, height, desc }: { logo: string, width: number, height: number, desc: string }) => (
  <div className="container">
    <div className="image"><img src={`/about/profession/${logo}@2x.png`} alt="" width={width} height={height} /></div>
    <div className="t">{desc}</div>
    <style jsx>{`
      .t
        font-size 16px
        font-weight 200
        line-height 1.75em
      .image
        display flex
        justify-content center
        align-items center
        width 100%
        height 150px
        margin-bottom 5px
    `}</style>
  </div>
)

const Section2 = () => (
  <div className="container">
    <SectionTitle num="02" nx={-4.5} title="Diverse Alliances" tx={-12} ty={27} />
    <div className="t">Instead of sticking to the organizational boundaries of a company, we form various alliances with synergistic companies and teams to increase our creative efficiency.</div>
    <div className="alliance">
      <Alliances logo="bassdrum" width={178} height={37} desc="The world’s first technical director collective.
We provide office space, business strategy support and executive staffing." />
      <Alliances logo="wtfc" width={113} height={32} desc="A creative engineering studio started as a joint venture between Tohokushinsha and Whatever to explore new forms of production." />
      <Alliances logo="cotodama" width={229} height={49} desc="" />
      <Alliances logo="yummysake" width={228} height={35} desc="" />
      <Alliances logo="kasa" width={123} height={39} desc="New York-based design collective consisting of Whatever, Studio Kudos and Studio Conduit, specializing in the design of public spaces." />
      <Alliances logo="cradle" width={127} height={46} desc="Sputniko! launched an egg freezing service. Sputniko! is an egg freezing service launched by Sputniko, with Kawamura serving as the external CCO and executing the overall creative direction of the brand." />
      <Alliances logo="newstand" width={209} height={22} desc="I’m in charge of the management and branding of New Stand Tokyo, a retail start-up from New York, and its first store outside of the United States." />
    </div>
    <style jsx>{`
      .container
        margin-top 118px
        margin-left 80px
      .t
        font-size 16px
        line-height 2em
        margin-top 37px
        width 1126px
      .alliance
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap 60px
        margin-right 75px
        margin-top 40px
    `}</style>
  </div>
)

const Section3 = () => (
  <div className="container">
    <SectionTitle num="03" nx={-4.5} title="Management of the<br/>Creative Commune" tx={-16} />
    <div className="t">As a place for these rich members to meet, we are jointly managing the creative commune WHEREVER with WTFC. In addition to serving as a base for Whatever, WTFC and Bassdrum, WHEREVER also functions as a place for cross-pollination of various creative staff through the shared office space on the 5th floor and New Stand Tokyo on the 1st floor.</div>
    <img src="/about/profession/image@2x.jpg" alt="" width={483} height={270} style={{ top: 27, right: 0 }} />
    <img src="/about/profession/image-1@2x.jpg" alt="" width={288} height={288} style={{ top: 211, right: 268 }} />
    <style jsx>{`
      .container
        position relative
        margin-top 117px
        margin-left 80px
        margin-bottom 295px
        >img
          position absolute
      .t
        font-size 16px
        line-height 2em
        margin-top 31px
        width 602px
    `}</style>
  </div>
)

const Profession = () => (
  <Layout title="profession" footer={<Footer left="cultures" right="genres" />}>
    <Header title="profession" desc="The people who come to Whatever are our greatest value. We are creating a community where the best and brightest people can come together to create new experiences together, without being confined by conventional employment patterns or client relations. We value an environment where people can create more freely and without boundaries of organization or business practices." />
    <Section1 />
    <Section2 />
    <Section3 />
    <style jsx>{`
    `}</style>
  </Layout>
)

export default Profession
