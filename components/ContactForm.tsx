import * as React from 'react'
import Link from 'next/link'
import { t, langStyle } from 'lib/i18n'
import { Grad } from 'components/Grad'

const ContactForm = () => (
  <>
    <div className={langStyle('contact-form')}>
      <div><Grad className="text" whiteText inline>{t('contactform_contacthere')}</Grad></div>
      <div><Grad className="contact" whiteText inline><Link href="/contact"><a>{t('contactform_inquiry')}</a></Link></Grad></div>
      <div className="newsletter">
        <div><Grad className="subscribe" whiteText inline>{t('contactform_register')}</Grad></div>
        <div>
          <Grad className="form" whiteText inline>
            <form action="">
              <input className="email" type="text" placeholder="Email address"></input>
              <input className="submit" type="submit" value="" />
            </form>
          </Grad>
        </div>
      </div>
    </div>
    <style jsx>{`
      .contact-form
        font-size 0
        :global(.text)
          color white
          font-size 1.4rem
          font-weight 300
          mix-blend-mode lighten
        :global(.contact)
          margin-top 26px
          mix-blend-mode lighten
          a
            display inline-block
            color white
            font-size 1.6rem
            font-weight bold
            letter-spacing 0.04em
            padding-bottom 7px
            padding-right 28px
            border-bottom 1px solid white
      .newsletter
        margin-top 65px
        :global(.subscribe)
          font-size 1.4rem
          font-weight 300
          color white
          mix-blend-mode lighten
        :global(.form)
          margin-top 1.8rem
          mix-blend-mode lighten
        :global(form)
          display inline-block
          margin 0
          padding 0
          border-radius 30px
          border 1px solid white
        .email
          display inline-block
          color white
          font-size 1.6rem
          font-weight 300
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
      .en
        :global(.text)
          font-size 1.5rem
        .newsletter
          :global(.subscribe)
            font-size 1.5rem
          .email
            font-size 1.5rem
    `}</style>
  </>
)


export default ContactForm
