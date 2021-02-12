import { useRouter } from 'next/router'
import { langStyle } from 'lib/i18n'
import { Grad, GradImg, GradLinkedTextBox } from 'components/Grad'
import BlackButton from 'components/BlackButton'
import { Desktop, Mobile } from 'components/Responsive'

type HeaderProps = {
  headerMargin?: number
  title: string
  titleSize?: number
  titleMargin?: number
  subtitle: string
  desc: string
  image: string
  imageWidth?: number
  imageMargin?: number
  ty?: { [locale: string]: number }
  iy?: { [locale: string]: number }
}

export const Header = (props: HeaderProps) => {
  const { ty, iy } = props
  const router = useRouter()
  const locale = router.locale || router.defaultLocale!
  return (
    <>
      <div className={langStyle('header')}>
        <div className="upper">
          <div className="text">
            <div><Grad className="t1" inline>Whatever</Grad></div>
            <div><Grad className="t2" inline>{props.title}</Grad></div>
            {props.subtitle != '-' ? <div><Grad className="t3" inline><span className="hr" />{props.subtitle}</Grad></div> : null}
          </div>
          <div className="image">
            <Desktop><GradImg lighten={true}><img src={`/about/${props.image}.svg`} alt="" /></GradImg></Desktop>
            <Mobile><GradImg lighten={true}><img src={`/about/${props.image}_sp.svg`} alt="" /></GradImg></Mobile>
          </div>
        </div>
        <div className="desc">
          {props.desc.split('\n').map((line, index) => <Grad key={index} inline><div className="desc-line">{line}</div></Grad>)}
        </div>
      </div >
      <style jsx>{`
        @import 'lib/vw.styl'
        .header
          font-size 0
          --a calc((100vw - 80px) * ${(props.headerMargin || 55) / (1366 - 80)})
          margin var(--a) vwpx(80) 0
        .upper
          display flex
          justify-content space-between
          align-items center
          margin-bottom vwpx(101)
        .text
          width vwpx(562)
          margin-top calc((100vw - 80px) * ${(ty && ty[locale] ? ty[locale] : 0) / (1366 - 80)})
          margin-bottom 9px
          :global(.t1)
            font-size vwpx(62)
            font-weight 700
            margin 0
            margin-left vwpx(2)
          :global(.t2)
            font-size calc((100vw - 80px) * ${(props.titleSize || 124) / (1366 - 80)})
            font-weight 700
            margin 0
            margin-top calc((100vw - 80px) * ${(props.titleMargin || 8) / (1366 - 80)})
            margin-left vwpx(-4)
            margin-bottom vwpx(56)
          :global(.t3)
            font-size vwpx(30)
            font-weight 700
            margin 0
            .hr
              display inline-block
              border-top 1px solid #707070
              width vwpx(70)
              margin-right vwpx(27)
              margin-bottom vwpx(9)
        .image
          font-size 0
          margin-right vwpx(34)
          img
            width calc((100vw - 80px) * ${(props.imageWidth || 607) / (1366 - 80)})
            margin-top calc((100vw - 80px) * ${(iy && iy[locale] ? iy[locale] : 0) / (1366 - 80)})
            background-color white
        .desc-line
          display inline-block
          font-size vwpx_min(18)
          font-weight 700
          line-height (40 / 18)
        .en
          .upper
            margin-bottom vwpx(95)
          .text
            margin-bottom -30px
          .desc-line
            font-size vwpx_min(20)
            font-weight 400
            line-height 2.0
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .header
            margin 0
          .upper
            flex-direction column-reverse
            margin 0
          .image
            margin 0
            margin-right vwpx(50)
            padding calc(100vw * (${props.imageMargin || 0} / 375))
            img
              width 100%
          .text
            width 100%
            margin-top vwpx(60)
            :global(.t1)
              font-size vwpx(21.5)
              letter-spacing -0.015em
            :global(.t2)
              font-size vwpx(62)
              margin vwpx(10) 0 0 vwpx(-2)
            :global(.t3)
              font-size vwpx(17)
              margin vwpx(7) 0 0 0
              .hr
                display none
          .desc
            margin 1.2rem vwpx(30) 0 0
          .desc-line
            font-size var(--font-size-ja)
            font-weight 500
            line-height 2.0
          .en
            .desc
              margin-top 4.15rem
            .desc-line
              font-size 1.4rem
              font-weight 500
              line-height (50 / 28)
      `}</style>
    </>
  )
}

type SectionTitleProps = {
  num: string
  title: string
  body: string
}

export const SectionHeader = ({ num, title, body }: SectionTitleProps) => (
  <div className={langStyle('header')}>
    <div className="row">
      <div className="num-column">
        <Grad className="num" inline>{num}</Grad>
      </div>
      <div>
        <div>
          {title.split('\n').map((line, index) => (
            <Grad key={index} className="title" inline>{line}</Grad>
          ))}
        </div>
        <div className="body">
          {body?.split('\n').map((line, index) => <Grad key={index} className="body-line"><GradLinkedTextBox key={index} html={line} /></Grad>)}
        </div>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .header
        font-size 0
        .row
          display grid
          grid-template-columns vwpx_min(252) auto
          grid-gap 0
          align-items start
        .num-column
          width vwpx_min(252)
        :global(.num)
          font-size vwpx_min(180)
          font-weight bold
          -webkit-text-stroke 1px black
          -webkit-text-fill-color transparent
          transform translateX(vwpx(-7))
        :global(.title)
          font-size vwpx_min(30)
          font-weight bold
          line-height 1.8
          margin-top vwpx(4)
        .body
          margin-top vwpx(48)
          :global(.body-line)
            font-size var(--font-size-ja)
            line-height 2.0
            margin 3.0rem 0
      .en
        :global(.title)
          font-size vwpx_min(36)
          line-height 1.5
          margin-top vwpx(3)
        .body
          margin-top vwpx(57)
          :global(.body-line)
            font-size var(--font-size-en)
            font-weight 200
            line-height 1.8
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .header
          margin-right vwpx(30)
          .row
            display flex
            flex-direction column
          .num-column
            width auto
          :global(.num)
            font-size vwpx(110)
            transform translateX(vwpx(-4))
          :global(.title)
            font-size vwpx(17)
            line-height 1.6
            margin-top vwpx(16)
          .body
            margin-top vwpx(27.5)
            :global(.body-line)
              line-height 2.0
              margin 2.6rem 0
        .en.header
          :global(.title)
            font-size vwpx(20)
            line-height (54 / 40)
            margin-top vwpx(14)
            &:nth-child(n + 2)
              margin 0
          .body
            margin-top vwpx(28.5)
            :global(.body-line)
              font-size 1.4rem
              font-weight 300
              line-height (50 / 28)
    `}</style>
  </div>
)
