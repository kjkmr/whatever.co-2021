import * as React from 'react'
import { animateScroll as scroll } from 'react-scroll'
import ContactForm from 'components/ContactForm'
import SNSButtons from 'components/SNSButtons'

const toTop = () => {
  scroll.scrollToTop({
    duration: 200,
    smooth: 'easeOutQuint',
  })
}


const Footer = () => (
  <div className="container">
    <img src="/footer/whatever.png" />
    <ContactForm />
    <div className="sns">
      <SNSButtons />
      <div className="copyright">© Whatever Inc.</div>
    </div>
    <div className="pagetop"><hr /><span onClick={toTop}>Page Top</span></div>

    <style jsx>{`
      .container
        height 400px
        position relative
        padding 100px 80px
        color white
        background-color #333333
        >img
          display block
          margin-bottom 98px
      .sns
        position absolute
        bottom 99px
        right 80px
      .copyright
        font-size 1.2rem
        font-weight 300
        text-align right
        margin-top 26px
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
  </div>
)

export default Footer
