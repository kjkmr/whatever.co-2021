import Link from 'next/link'
import { t, langStyle } from 'lib/i18n'
import { Grad } from 'components/Grad'

const ContactForm = () => (
  <>
    <div className={langStyle('contact-form')}>
      <div><Grad className="text" whiteText inline>{t('contactform_contacthere')}</Grad></div>
      <div><Grad className="contact" whiteText inline interactive><Link href="/contact"><a>{t('contactform_inquiry')}</a></Link></Grad></div>
      <div className="newsletter">
        <div><Grad className="subscribe" whiteText inline>{t('contactform_register')}</Grad></div>
        <div>
          <Grad className="form" whiteText inline interactive>
            <form action="https://whatever.us20.list-manage.com/subscribe/post?u=0b31ccc167140375101923bbb&amp;id=c20b8d6b11" method="post">
              <input className="email" type="email" name="EMAIL" placeholder="Email address"></input>
              <input className="submit" type="submit" value="Subscribe" name="subscribe" />
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
          width 436px
          mix-blend-mode lighten
        :global(form)
          display grid
          grid-template-columns auto 48px
          margin 0
          padding 0
          border-radius 30px
          border 1px solid white
        .email
          display inline-block
          color white
          font-size 1.6rem
          font-weight 300
          width 100%
          box-sizing border-box
          margin 0
          padding 14px 24px
          border none
          background-color transparent
          vertical-align middle
        .submit
          font-size 0
          margin 2px
          padding 0
          width 44px
          height 44px
          box-sizing border-box
          background-color transparent
          background-image url(/footer/mail.svg)
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
      @media (--mobile)
        .contact-form
          :global(.text)
            font-size var(--font-size-ja)
            line-height 1.8
          :global(.contact)
            margin-top 1.9rem
            a
              font-size 1.4rem
              padding-bottom 0.5rem
        .newsletter
          margin-top 7.1rem
          :global(.subscribe)
            font-size var(--font-size-ja)
          :global(.form)
            margin-top 2.8rem
            width 100%
          :global(form)
            display flex
            box-sizing border-box
          .email
            flex-grow 2
            width auto
            font-size 1.4rem
          .submit
            flex-basis 40px
            margin 9px
            width 40px
            height 40px
            background-size 40px 40px
        .en
          &.contact-form
            :global(.text)
              font-size 1.4rem
              line-height (42 / 28)
            :global(.contact)
              margin-top 2.2rem
              a
                font-size 1.6rem
                font-weight 700
                letter-spacing 0
                padding-right 3.5rem
                padding-bottom 0.7rem
          .newsletter
            margin-top 7.5rem
            :global(.subscribe)
              font-size 1.4rem
            :global(.form)
              margin-top 2.7rem
    `}</style>
  </>
)


export default ContactForm
