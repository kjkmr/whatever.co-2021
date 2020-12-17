import Link from 'next/link'
import { animateScroll as scroll } from 'react-scroll'

const toTop = () => {
  scroll.scrollToTop({
    duration: 200,
    smooth: 'easeOutQuint',
  })
}

const Footer = () => (
  <div className="container">
    <img src="/footer/whatever.png" />
    <div className="text">新規プロジェクト、採用、メディア掲載など各種ご相談はこちらまで</div>
    <div className="contact"><Link href="/contact"><a>お問い合わせ</a></Link></div>
    <div className="newsletter">
      <div className="subscribe">ニュースレターに登録</div>
      <form action="">
        <input className="email" type="text" placeholder="Email address"></input>
        <input className="submit" type="submit" value="" />
      </form>
    </div>
    <div className="sns">
      <div className="links">
        <a href="https://www.facebook.com/whtevr.co/" style={{ backgroundImage: 'url(/footer/fb@2x.png)' }} target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com/whtevr_co" style={{ backgroundImage: 'url(/footer/tw@2x.png)' }} target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://www.instagram.com/whtevr_co/" style={{ backgroundImage: 'url(/footer/inst@2x.png)' }} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.linkedin.com/company/whtevr-co/" style={{ backgroundImage: 'url(/footer/li@2x.png)' }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
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
      img
        display block
      .text
        margin-top 98px
        font-size 1.4rem
        font-weight light
      .contact
        margin-top 28px
        a
          color white
          font-weight 1.6rem
          font-weight bold
          letter-spacing 0.11em
          padding-bottom 9px
          padding-right 28px
          border-bottom 1px solid white
      .newsletter
        margin-top 100px
        .subscribe
          font-size 1.4rem
          font-weight light
          letter-spacing 0.0em
        form
          display inline-block
          margin 0
          margin-top 18px
          padding 0
          border-radius 30px
          border 1px solid white
        .email
          display inline-block
          color white
          font-size 1.6rem
          font-weight light
          margin 0
          padding 14px 24px
          width 340px
          border none
          background-color transparent
          vertical-align middle
        .submit
          margin 2px
          padding 0
          width 44px
          height 44px
          background-color transparent
          background-image url(/footer/mail@2x.png)
          background-size 44px 44px
          border none
          vertical-align middle
          cursor pointer
      .sns
        position absolute
        bottom 99px
        right 80px
      .links
        a
          display inline-block
          width 25px
          height 25px
          font-size 0
          background-repeat no-repeat
          background-size 25px 25px
          margin-left 15px
      .copyright
        font-size 1.2rem
        font-weight light
        text-align right
        margin-top 30px
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
