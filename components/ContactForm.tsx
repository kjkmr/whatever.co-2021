import * as React from 'react'
import Link from 'next/link'

const ContactForm = () => (
  <>
    <div className="text">新規プロジェクト、採用、メディア掲載など各種ご相談はこちらまで</div>
    <div className="contact"><Link href="/contact"><a>お問い合わせ</a></Link></div>
    <div className="newsletter">
      <div className="subscribe">ニュースレターに登録</div>
      <form action="">
        <input className="email" type="text" placeholder="Email address"></input>
        <input className="submit" type="submit" value="" />
      </form>
    </div>
    <style jsx>{`
      .text
        font-size 1.4rem
        font-weight light
        color white
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
          color white
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
    `}</style>
  </>
)

export default ContactForm
