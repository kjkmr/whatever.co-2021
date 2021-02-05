import { animateScroll as scroll } from 'react-scroll'
import ContactForm from 'components/ContactForm'
import SNSButtons from 'components/SNSButtons'
import { Grad } from 'components/Grad'

const toTop = () => {
  scroll.scrollToTop({
    duration: 200,
    smooth: 'easeOutQuint',
  })
}

const Footer = () => (
  <>
    <div className="footer">
      <div><Grad className="logo" whiteText inline><img src="/footer/logo_white.svg" width="170" /></Grad></div>
      <ContactForm />
      <hr className="line" />
      <div className="sns">
        <div><Grad className="sns-buttons" whiteText inline><SNSButtons /></Grad></div>
        <div className="copyright"><Grad className="copyright-inner" whiteText inline>© Whatever Inc.</Grad></div>
      </div>
      <div className="pagetop"><hr /><span onClick={toTop}>Page Top</span></div>
    </div>
    <style jsx>{`
      .footer
        height 400px
        position relative
        padding 100px 80px
        color white
        background-color #333333
        font-size 0
        opacity 0.5
        :global(.logo)
          display inline-block
          margin-bottom 97px
          mix-blend-mode lighten
        .line
          display none
        .sns
          position absolute
          bottom 99px
          right 80px
          :global(.sns-buttons)
            mix-blend-mode lighten
        .copyright
          margin-top 30px
          text-align right
        :global(.copyright-inner)
          display inline-block
          font-size 1.2rem
          font-weight 300
          mix-blend-mode lighten
      .pagetop
        position absolute
        top 215px
        right 80px
        font-size 1.2rem
        letter-spacing 0.07em
        transform rotate(90deg)
        transform-origin top right
        hr
          display inline-block
          width 40px
          border none
          border-top 1px solid white
          margin-right 20px
        span
          vertical-align 3px
          cursor pointer
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .footer
          padding vwpx(74) vwpx(30) vwpx(50)
          height auto
          :global(.logo)
            margin-bottom 73px
            img
              width vwpx(117)
          hr.line
            display block
            border none
            border-top 1px solid #707070
            margin-top 75px
          .sns
            position static
            margin-top 75px
          .copyright
            text-align left
            margin-top 48px
        .pagetop
          top auto
          left auto
          right 30px
          bottom 33px
          letter-spacing 0
          hr
            width 35px
            margin-right 10px
    `}</style>
  </>
)

export default Footer
