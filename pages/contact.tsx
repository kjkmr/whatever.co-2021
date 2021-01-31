import { GetStaticProps } from 'next'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import BlackButton from 'components/BlackButton'
import { Grad, GradImg, GradLink } from 'components/Grad'

const Head = () => (
  <>
    <div className={langStyle('head')}>
      <div className="image"><GradImg lighten={true}><img src="/contact/pict04.svg" alt="" /></GradImg></div>
      {t('contact_title')?.split('\n').map((line, index) => <div key={index}><Grad className="title" key={index} inline>{line}</Grad></div>)}
      <div className="mailto"><BlackButton link="mailto:hello@whatever.co">hello@whatever.co</BlackButton></div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .head
        position relative
        margin-top vwpx(189)
        margin-left vwpx(80)
        font-size 0
        .image
          position absolute
          top vwpx(-184)
          right vwpx(-24)
          background-color white
          img
            width vwpx(900)
        :global(.title)
          position relative
          font-size vwpx(30)
          font-weight bold
          line-height vwpx(52)
          mix-blend-mode multiply
      .mailto
        margin-top vwpx(47)
      .en
        &.head :global(.title)
          font-size vwpx(36)
          line-height vwpx(54)
        .mailto
          margin-top vwpx(41)
    `}</style>
  </>
)

const Address = ({ data }: { data: any }) => (
  <>
    <div className="container">
      <div><Grad className="region" inline>{data.name}</Grad></div>
      <div><Grad className="address" inline><GradLink href={data.link} target="_blank" rel="noopener noreferrer" inlineBlock={true}>{data.address}</GradLink></Grad></div>
      {data.phone != '-' ? <div><Grad className="phone" inline>{data.phone}</Grad></div> : null}
      {data.representative != '-' ? <div><Grad className="repr" inline>{data.representative}</Grad></div> : null}
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .container
        font-size 0
        :global(.region)
          font-size vwpx_min(24)
          font-weight bold
          margin-bottom vwpx_min(35)
        :global(.address)
          font-size var(--font-size-ja)
          line-height 1em
          margin-bottom 1.1rem
        :global(.phone)
          font-size var(--font-size-ja)
          line-height 1em
          margin-bottom 1.5rem
        :global(.repr)
          font-size var(--font-size-ja)
          line-height 1em
    `}</style>
  </>
)

const ContactPage = () => {
  const regions = ['tokyo', 'newyork', 'taipei', 'berlin']
  const keys = ['name', 'address', 'link', 'phone', 'representative']
  const addresses = regions.map(region => {
    const data: { [key: string]: string } = {}
    keys.forEach(key => data[key] = t(`contact_${region}_${key}`)!)
    return data
  })
  return (
    <Layout title="Contact" side="Contact">
      <Head />
      <div className="address">
        {addresses.map((data: any) => <Address key={data.name} data={data} />)}
      </div>
      <div className="images">
        <div className="i1"><GradImg><img src="/contact/whatever_7F_002@2x.jpg" alt="" /></GradImg></div>
        <div className="i2"><GradImg><img src="/contact/whatever_6F_004@2x.jpg" alt="" /></GradImg></div>
        <div className="row">
          <div className="i3"><GradImg><img src="/contact/whatever_4F_005@2x.jpg" alt="" /></GradImg></div>
          <div className="i4"><GradImg><img src="/contact/whatever_3F_004@2x.jpg" alt="" /></GradImg></div>
        </div>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .address
          margin-top vwpx(244)
          margin-left vwpx(80)
          margin-right vwpx(16)
          display grid
          grid-template-columns repeat(2, 1fr)
          grid-auto-rows vwpx(216)
        .images
          font-size 0
          margin-top vwpx(64)
          margin-left vwpx(80)
          margin-bottom vwpx(200)
          img
            width 100%
          .row
            display flex
            justify-content space-between
          .i1
            width vwpx(1206)
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
}

export default ContactPage

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
