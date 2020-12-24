import Image from 'next/image'
import { t, ta, LangStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Grad, GradImg, GradLink } from 'components/Grad'

type AddressData = {
  region: string
  address: string
  maplink: string
  phone?: string
  representative?: string
}

const data: { [locale: string]: AddressData[] } =
{
  'en': [
    {
      region: 'TOKYO',
      address: 'WHEREVER 7F, 7-2-8 Roppongi, Minato-ku, Tokyo 106-0032, Japan',
      maplink: 'https://g.page/whatever-inc',
      phone: '+81-3-6427-6022',
      representative: 'Yusuke Tominaga',
    },
    {
      region: 'NEW YORK',
      address: '347 W 36th St, #902 New York, NY 10018 U.S.A.',
      maplink: 'https://goo.gl/maps/x7zKNoj7ixG2',
      phone: '+1-347-801-7789',
      representative: 'Masashi Kawamura / Qanta Shimizu',
    },
    {
      region: 'TAIPEI',
      address: '18F, No.97, Songren Rd., Xinyi Dist., Taipei City 110, Taiwan',
      maplink: 'https://goo.gl/maps/1ytCrzEK9EPKGWxe8',
      phone: '+886-908-222-101',
      representative: 'Eiji Muroichi',
    },
    {
      region: 'BERLIN',
      address: 'Friedrichstraße 68, 10117 Berlin, Germany',
      maplink: 'https://goo.gl/maps/JJ9c4hEupRFWHB5X6',
    },
  ],
  'ja': [
    {
      region: 'TOKYO',
      address: '〒106-0032 東京都港区六本木 7 丁目 2 番 8 号 WHEREVER 7F',
      maplink: 'https://g.page/whatever-inc',
      phone: '03-6427-6022',
      representative: '富永 勇亮',
    },
    {
      region: 'NEW YORK',
      address: '347 W 36th St, #902 New York, NY 10018 U.S.A.',
      maplink: 'https://goo.gl/maps/x7zKNoj7ixG2',
      phone: '+1-347-801-7789',
      representative: '川村 真司 / 清水 幹太',
    },
    {
      region: 'TAIPEI',
      address: '18F, No.97, Songren Rd., Xinyi Dist., Taipei City 110, Taiwan',
      maplink: 'https://goo.gl/maps/1ytCrzEK9EPKGWxe8',
      phone: '+886-908-222-101',
      representative: '室市 栄二',
    },
    {
      region: 'BERLIN',
      address: 'Friedrichstraße 68, 10117 Berlin, Germany',
      maplink: 'https://goo.gl/maps/JJ9c4hEupRFWHB5X6',
    },
  ],
  'zh-hans': [
    {
      region: 'TOKYO',
      address: 'WHEREVER 7F, 7-2-8 Roppongi, Minato-ku, Tokyo 106-0032, Japan',
      maplink: 'https://g.page/whatever-inc',
      phone: '+81-3-6427-6022',
      representative: 'Yusuke Tominaga',
    },
    {
      region: 'NEW YORK',
      address: '347 W 36th St, #902 New York, NY 10018 U.S.A.',
      maplink: 'https://goo.gl/maps/x7zKNoj7ixG2',
      phone: '+1-347-801-7789',
      representative: 'Masashi Kawamura / Qanta Shimizu',
    },
    {
      region: 'TAIPEI',
      address: '台北市信義區松仁路 97 號',
      maplink: 'https://goo.gl/maps/1ytCrzEK9EPKGWxe8',
      phone: '+886-908-222-101',
      representative: 'Eiji Muroichi',
    },
    {
      region: 'BERLIN',
      address: 'Friedrichstraße 68, 10117 Berlin, Germany',
      maplink: 'https://goo.gl/maps/JJ9c4hEupRFWHB5X6',
    },
  ],
}

const Head = () => (
  <div className={LangStyle('head')}>
    <img src="/contact/head@2x.png" alt="" />
    {t('contact.title').split('\n').map((line, index) => <Grad key={index}><div>{line}</div></Grad>)}
    <div className="mailto"><GradImg><a href="mailto:hello@whatever.co">hello@whatever.co</a></GradImg></div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .head
        position relative
        margin-top vwpx(137)
        margin-left vwpx(39)
        font-size 0
        >img
          position absolute
          top vwpx(-140)
          right vwpx(-15)
          width vwpx(745.69)
        div
          display inline-block
          font-size vwpx(38)
          font-weight bold
          line-height vwpx(60)
      .mailto
        width vwpx(300)
        height vwpx(80)
        margin-top vwpx(67)
        background-color black
        a
          display flex
          justify-content center
          align-items center
          width vwpx(300)
          height vwpx(80)
          font-size vwpx(18)
          font-weight bold
          letter-spacing 0.04em
          color white
      .en
        &.head
          div
            font-size vwpx(48)
    `}</style>
  </div>
)

const Address = ({ data }: { data: any }) => (
  <div className="container">
    <Grad><h2 className="region">{data.name}</h2></Grad>
    <div className="address"><GradLink className="address" href={data.maplink} target="_blank" rel="noopener noreferrer">{data.address}</GradLink></div>
    {data.phone ? <Grad><div className="phone">{data.phone}</div></Grad> : null}
    {data.representative ? <Grad><div className="repr">{data.representative}</div></Grad> : null}
    <style jsx>{`
      vwpx(px)
          'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .container
        font-size 0
      .region
        display inline-block
        font-size vwpx(24)
        font-weight bold
        margin-bottom vwpx(34)
      .address
        display inline-block
        font-size 1.5rem
        line-height 1em
        margin-bottom 6px
      .phone
        display inline-block
        font-size 1.5rem
        line-height 1em
        margin-bottom 16px
      .repr
        display inline-block
        font-size 1.5rem
        line-height 1em
    `}</style>
  </div>
)

const ContactPage = () => (
  <Layout title="Contact">
    <Head />
    <div className="address">
      {ta('contact.addresses').map(data => <Address key={data.name} data={data} />)}
    </div>
    <div className="images">
      <img src="/contact/whatever_7F_002@2x.jpg" alt="" className="i1" />
      <img src="/contact/whatever_6F_004@2x.jpg" alt="" className="i2" />
      <div className="row">
        <img src="/contact/whatever_4F_005@2x.jpg" alt="" className="i3" />
        <img src="/contact/whatever_3F_004@2x.jpg" alt="" className="i4" />
      </div>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .address
        margin-top vwpx(203)
        margin-left vwpx(80)
        margin-right vwpx(16)
        display grid
        grid-template-columns repeat(2, 1fr)
        grid-auto-rows vwpx(216)
      .images
        {/* opacity 0.5 */}
        font-size 0
        margin-top vwpx(83)
        margin-left vwpx(80)
        margin-bottom vwpx(160)
        .row
          display flex
          justify-content space-between
        .i1
          width vwpx(1205)
          float right
        .i2
          width vwpx(844)
          margin-top vwpx(70)
        .i3
          width vwpx(562)
          margin-top vwpx(80)
        .i4
          width vwpx(562)
          margin-top vwpx(80)
      .row
        display flex
        justify-content space-between
        align-items flex-start
    `}</style>
  </Layout >
)

export default ContactPage
