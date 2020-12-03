import Image from 'next/image'
import Layout from '../components/Layout'
import { Grad, GradImg } from '../components/Grad'

type AddressData = {
  region: string
  address: string
  phone?: string
  representative?: string
}

const data: AddressData[] = [
  {
    region: 'TOKYO',
    address: 'WHEREVER 7F, 7-2-8 Roppongi, Minato-ku, Tokyo 106-0032, Japan',
    phone: '+81-3-6427-6022',
    representative: ' Yusuke Tominaga',
  },
  {
    region: 'NEW YORK',
    address: '347 W 36th St, #902 New York, NY 10018 U.S.A.',
    phone: '+1-347-801-7789',
    representative: 'Masashi Kawamura / Qanta Shimizu',
  },
  {
    region: 'TAIPEI',
    address: '18F, No.97, Songren Rd., Xinyi Dist., Taipei City 110, Taiwan',
    phone: '+886-908-222-101',
    representative: 'Eiji Muroichi',
  },
  {
    region: 'BERLIN',
    address: 'Friedrichstraße 68, 10117 Berlin, Germany',
  },
]

const Head = () => (
  <div className="head">
    <Grad><div>For new business,</div></Grad>
    <Grad><div>career and media inquiries,</div></Grad>
    <Grad><div>contact us.</div></Grad>
    <div className="mailto"><GradImg><a href="mailto:hello@whatever.co">hello@whatever.co</a></GradImg></div>
    <GradImg><a href="mailto:hello@whatever.co">hello@whatever.co</a></GradImg>
    <style jsx>{`
      .head
        margin-top 145px
        margin-left 39px
        font-size 0
        div
          display inline-block
          font-size 48px
          font-weight bold
          margin-bottom 12px
        .mailto
          width 300px
          height 80px
          margin-top 59px
          background-color black
          a
            display flex
            justify-content center
            align-items center
            width 300px
            height 80px
            font-size 18px
            font-weight bold
            letter-spacing 0.04em
            color white
    `}</style>
  </div>
)

const Address = ({ data }: { data: AddressData }) => (
  <div className="container">
    <Grad><h2 className="region">{data.region}</h2></Grad>
    <Grad><a href="#" className="address">{data.address}</a></Grad>
    {data.phone ? <Grad><div className="phone">{data.phone}</div></Grad> : null}
    {data.representative ? <Grad><div className="repr">Representative: {data.representative}</div></Grad> : null}
    <style jsx>{`
      .container
        font-size 0
      .region
        display inline-block
        font-size 24px
        font-weight bold
        margin-bottom 34px
      .address
        display inline-block
        font-size 16px
        padding-bottom 2px
        border-bottom 1px solid red
        margin-bottom 13px
      .phone
        display inline-block
        font-size 16px
        margin-bottom 16px
      .repr
        display inline-block
        font-size 16px
    `}</style>
  </div>
)

const AboutPage = () => (
  <Layout title="About">
    <Head />
    <div className="address">
      {data.map(data => <Address key={data.region} data={data} />)}
    </div>
    <div className="imgs">
      <div className="row" style={{ marginBottom: '80px' }}>
        <GradImg><Image src="/contact/whatever_4F_005@2x.jpg" alt="" width={562} height={375} /></GradImg>
        <GradImg><Image src="/contact/whatever_3F_004@2x.jpg" alt="" width={562} height={375} /></GradImg>
      </div>
      <div style={{ marginBottom: '80px', display: 'inline-block' }}><GradImg><Image src="/contact/whatever_6F_004@2x.jpg" alt="" width={844} height={562.5} /></GradImg></div>
      <div style={{ marginBottom: '80px' }}><GradImg><Image src="/contact/whatever_7F_002@2x.jpg" alt="" width={1205} height={804} /></GradImg></div>
      <div className="row">
        <GradImg><Image src="/contact/whatever_4F_008@2x.jpg" alt="" width={562} height={375} /></GradImg>
        <GradImg><Image src="/contact/whatever_4F_009@2x.jpg" alt="" width={562} height={750} /></GradImg>
      </div>
    </div>
    <style jsx>{`
      .address
        margin-top 270px
        margin-left 80px
        margin-right 20px
        display grid
        grid-template-columns repeat(2, 1fr)
        grid-auto-rows 216px
      .imgs
        font-size 0
        margin-top 83px
        margin-left 80px
        margin-bottom 150px
      .row
        display flex
        justify-content space-between
        align-items flex-start
    `}</style>
  </Layout >
)

export default AboutPage
