import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames/bind'
import { t } from 'lib/i18n'

const ContactForm = () => {
  const router = useRouter()
  const langStyle: { [key: string]: any } = {}
  langStyle[router.locale!] = true;
  return (
    <div className={classNames(langStyle)}>
      <div className="text">{t('contactform.contacthere')}</div>
      <div className="contact"><Link href="/contact"><a>{t('contactform.inquiry')}</a></Link></div>
      <div className="newsletter">
        <div className="subscribe">{t('contactform.register')}</div>
        <form action="">
          <input className="email" type="text" placeholder="Email address"></input>
          <input className="submit" type="submit" value="" />
        </form>
      </div>
      <style jsx>{`
        .text
          color white
          font-size 1.5rem
          font-weight light
          margin-top 4px
        .contact
          margin-top 32px
          a
            color white
            font-size 1.6rem
            font-weight bold
            letter-spacing 0.04em
            padding-bottom 10px
            padding-right 42px
            border-bottom 1px solid white
        .newsletter
          margin-top 106px
          .subscribe
            font-size 1.5rem
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
        .ja, .zh-hans
          .text
            font-size 1.4rem
            margin-top 0
          .contact
            margin-top 26px
          .newsletter
            margin-top 99px
            .subscribe
              font-size 1.4rem
      `}</style>
    </div>
  )
}

export default ContactForm
