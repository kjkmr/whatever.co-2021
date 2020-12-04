import Link from 'next/link'
import Layout from '../../components/Layout'
import { Header, Footer, SectionTitle } from '../../components/About'

const Section1 = () => (
  <div className="container">
    <SectionTitle num="01" nx={-4.5} title="Extensive experience in domestic and overseas projects" />
    <div className="t">At Whatever, we can provide cross-border branding and business development support, leveraging our experience in working with a wide range of brands around the world. We can help companies that are looking to expand from Japan to the world or enter the Japanese market from abroad with our four global offices in Tokyo, New York, Taiwan and Berlin.</div>
    <h2 style={{ marginTop: 55 }}>In-house product development</h2>
    <div className="logo5">
      <img src="/about/cultures/logo_whill@2x.png" alt="" width={108} height={81} />
      <img src="/about/cultures/logo_muji@2x.png" alt="" width={166} height={125} />
      <img src="/about/cultures/logo_sony@2x.png" alt="" width={150} height={98} />
      <img src="/about/cultures/Union 45@2x.png" alt="" width={167} height={36} />
      <img src="/about/cultures/Image 1@2x.png" alt="" width={166} height={125} />
    </div>
    <h2 style={{ marginTop: 67, marginBottom: 23 }}>Creative support for overseas companies entering the Japanese market</h2>
    <div className="logo4">
      <img src="/about/cultures/logo_slack@2x.png" alt="" width={119} height={78} />
      <img src="/about/cultures/logo_shopify@2x.png" alt="" width={132} height={86} />
      <img src="/about/cultures/logo_airbnb@2x.png" alt="" width={119} height={78} />
      <img src="/about/cultures/logo_google@2x.png" alt="" width={119} height={78} />
      <img src="/about/cultures/logo_hermes@2x.png" alt="" width={137} height={103} />
      <img src="/about/cultures/Image 2@2x.png" alt="" width={84} height={36} />
      <img src="/about/cultures/Group 544@2x.png" alt="" width={159} height={17} />
    </div>
    <style jsx>{`
      .container
        margin-top 191px
        margin-left 80px
      .t
        font-size 16px
        line-height 2em
        margin-top 33px
        width 1046px
      .logo5
        display grid
        grid-template-columns repeat(5, 1fr)
        grid-gap 0
        width 1046px
        img
          justify-self center
          align-self center
      .logo4
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap 0
        width 1046px
        img
          justify-self center
          align-self center
          object-fit scale-down
          height 106px
    `}</style>
  </div>
)

const Member = ({ image, title, name }: { image: string, title: string, name: string }) => (
  <div className="member">
    <img src={`/about/cultures/${image}@2x.jpg`} alt="" width={245} height={245} />
    <div className="title">{title}</div>
    <div className="name">{name}</div>
    <style jsx>{`
      .member
        font-size 0
      .title
        font-size 12px
        font-weight 200
        margin-top 20px
      .name
        font-size 24px
        font-weight 700
        margin-top 12px
    `}</style>
  </div>
)

const Section2 = () => (
  <div className="container">
    <SectionTitle num="02" nx={-3.5} title="World-class creative team" tx={-13} ty={26} />
    <div className="t">We have creators and producers who have achieved success in corporate marketing, branding and business development around the world. With the knowledge of successful creative development in the areas of brand communication, product development, and business development, we provide appropriate support for our partner companies in accordance with their business conditions and growth stage.</div>
    <div className="members">
      <Member image="masa" title="CCO" name="Masashi Kawamura" />
      <Member image="mark" title="Producer / Creative Director" name="Mark Stein" />
      <Member image="shiny" title="Associate Creative Director" name="Shiny Lee" />
      <Member image="jane" title="???" name="Jane Rosch" />
      <Member image="eiji" title="Design Director" name="Eiji Muroichi" />
      <Member image="yuta" title="Corporate Development Director" name="Yuta Inoue" />
      <Member image="kei" title="Business / Strategic Director" name="Kei Kaneko" />
      <Member image="shota" title="Producer" name="Shota Hatama" />
    </div>
    <div className="link"><Link href="/team"><a>All Members</a></Link></div>
    <style jsx>{`
      .container
        margin-top 71px
        margin-left 80px
        margin-bottom 137px
      .t
        font-size 16px
        line-height 2em
        margin-top 35px
        width 1125px
      .members
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap 69px 75px 
        margin-top 64px
      .link
        margin-top 85px
        padding-right 79px
        text-align right
        a
          font-size 18px
          font-weight 700
          padding-bottom 6px
          padding-right 60px
          border-bottom 1px solid red
    `}</style>
  </div>
)

const Cultures = () => (
  <Layout title="cultures" footer={<Footer left="genres" right="profession" />}>
    <div className="container">
      <Header title="cultures" desc="At Whatever, we have a proven track record of working with brands around the world and can support branding and content development across borders and cultures.<br/>We can plan and produce world-class brand communications and products by utilizing our four offices in Tokyo, New York, Taiwan and Berlin, and our world-class human resources." />
      <Section1 />
      <Section2 />
    </div>
    <style jsx>{`
    `}</style>
  </Layout>
)

export default Cultures
