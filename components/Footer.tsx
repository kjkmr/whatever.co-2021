import { animateScroll as scroll } from 'react-scroll'
import ContactForm from 'components/ContactForm'
import SNSButtons from 'components/SNSButtons'
import { Grad, GradImg } from 'components/Grad'

const toTop = () => {
  scroll.scrollToTop({
    duration: 200,
    smooth: 'easeOutQuint',
  })
}

const Footer = () => (
  <>
    <div className="footer">
      <div><Grad className="logo" whiteText={true}><img src="/footer/whatever.png" /></Grad></div>
      <ContactForm />
      <div className="sns">
        <div><Grad className="sns-buttons" whiteText={true}><SNSButtons /></Grad></div>
        <div style={{ textAlign: 'right' }}><Grad className="copyright" whiteText={true}>© Whatever Inc.</Grad></div>
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
        :global(.logo)
          display inline-block
          margin-bottom 97px
          mix-blend-mode lighten
        .sns
          position absolute
          bottom 99px
          right 80px
          :global(.sns-buttons)
            mix-blend-mode lighten
        :global(.copyright)
          display inline-block
          font-size 1.2rem
          font-weight 300
          margin-top 30px
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
    `}</style>
  </>
)

export default Footer
