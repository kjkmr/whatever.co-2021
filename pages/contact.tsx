import { GetStaticProps } from 'next'
import { t, langStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import BlackButton from 'components/BlackButton'
import { Grad, GradImg, GradLink } from 'components/Grad'
import { Desktop, Mobile } from 'components/Responsive'

const Head = () => (
  <>
    <div className={langStyle('head')}>
      <div className="image">
        <Desktop><GradImg lighten={true}><img src="/contact/pict04.svg" alt="" /></GradImg></Desktop>
        <Mobile><GradImg lighten={true}><img src="/contact/pict04_sp.svg" alt="" /></GradImg></Mobile>
      </div>
      {t('contact_title')?.split('\n').map((line, index) => <div key={index}><Grad className="title" key={index} inline>{line}</Grad></div>)}
      <div className="mailto"><BlackButton className="button" link="mailto:hello@whatever.co">hello@whatever.co</BlackButton></div>
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
          line-height calc(52 / 30)
          mix-blend-mode multiply
        .mailto
          margin-top vwpx(47)
          :global(.button)
            width 300px
            height 80px
      .en.head
        :global(.title)
          font-size vwpx(36)
          line-height vwpx(54)
        .mailto
          margin-top vwpx(41)
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .head
          margin vwpx(45) 0 0 0
          .image
            position static
            margin-bottom 3.4rem
            img
              width vwpx(334)
          :global(.title)
            font-size 1.7rem
            line-height 1.9
          .mailto
            display flex
            justify-content flex-end          
            margin 3.9rem 0 0 0
            :global(.button)
              width 210px
              height 70px
        .en.head
          :global(.title)
            font-size 2.0rem
            line-height calc(64 / 40)
          .mailto
            margin 3.9rem 0 0 0
    `}</style>
  </>
)

const Address = ({ data }: { data: any }) => (
  <>
    <div className={langStyle('container')}>
      <div><Grad className="region" inline>{data.name}</Grad></div>
      <div><Grad className="address" inline><GradLink href={data.link} target="_blank" rel="noopener noreferrer">{data.address}</GradLink></Grad></div>
      {data.phone != '-' ? <div>
        <Desktop><Grad className="phone" inline>{data.phone}</Grad></Desktop>
        <Mobile><Grad className="phone" inline><GradLink href={`tel:${data.phone}`}>{data.phone}</GradLink></Grad></Mobile>
      </div> : null}
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
          margin-bottom 1.5rem
        :global(.phone)
          font-size var(--font-size-ja)
          line-height 1em
          margin-bottom 1.5rem
        :global(.repr)
          font-size var(--font-size-ja)
          line-height 1em
      .en.container
        :global(.address)
          font-size var(--font-size-en)
          font-weight 200
          line-height 1em
          margin-bottom 1.3rem
        :global(.phone)
          font-size var(--font-size-en)
          font-weight 200
          line-height 1em
          margin-bottom 1.3rem
        :global(.repr)
          font-size var(--font-size-en)
          font-weight 200
          line-height 1em
      @media (--mobile)
        .container
          margin 0 0 7.2rem 0
          :global(.region)
            font-size 1.7rem
            margin 0
          :global(.address)
            font-size 1.2rem
            line-height 2.0
            margin 2.05rem 0 0 0
          :global(.phone)
            font-size 1.2rem
            margin 1.65rem 0 0 0
          :global(.repr)
            font-size 1.2rem
            margin 2.25rem 0 0 0
        .en.container
          margin 0 0 5.0rem 0
          :global(.region)
            font-size 1.7rem
            margin 0
          :global(.address)
            font-size 1.4rem
            font-weight 300
            line-height calc(50 / 28)
            margin 2.05rem 0 0 0
          :global(.phone)
            font-size 1.4rem
            font-weight 300
            line-height calc(50 / 28)
            margin 1.0rem 0 0 0
          :global(.repr)
            font-size 1.4rem
            font-weight 300
            line-height calc(50 / 28)
            margin 1.0rem 0 0 0
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
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .address
          margin 7.45rem 30px 0 0
          display block
        .images
          margin 8.0rem 0 7.5rem -50px
          .row
            display block
          .i1, .i2
            width 100%
          .i3, .i4
            width vwpx(227)
          .i2, .i3, .i4
            margin-top vwpx(30)
          .i3
            display flex
            justify-content flex-end
            width 100%
            img
              width vwpx_min(227)
      `}</style>
    </Layout >
  )
}

export default ContactPage

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
