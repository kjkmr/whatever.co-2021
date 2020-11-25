const Footer = () => (
  <div className="container">
    <img src="/whatever.png" />
    <div className="text">For new business, career and media inquires, contact us.</div>
    <div className="contact">Contact us</div>
    <input className="email" type="text" placeholder="Email address"></input>
    <div className="subscribe">Subscribe to our newsletter</div>
    <div className="sns">
      <img src="/sns.png" />
      <div className="copyright">© Whatever Inc.</div>
    </div>
    <div className="pagetop"><hr />Page Top</div>

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
        margin-top 100px
      .contact
        margin-top 32px
        font-weight bold
        letter-spacing 0.04em
      .email
        border-radius 30px
        border 1px solid white
        background-color transparent
        width 384px
        padding 17px 26px
        margin-top 106px
        color white
      .subscribe
        margin-top 30px
        font-weight bold
        letter-spacing 0.0em
      .sns
        position absolute
        bottom 100px
        right 80px
      .copyright
        font-size 12px
        text-align right
        margin-top 30px
      .pagetop
        position absolute
        top 213px
        right 80px
        font-size 12px
        letter-spacing 0.05em
        transform rotate(90deg)
        transform-origin top right
        hr
          display inline-block
          width 40px
          border none
          border-top 1px solid white
          margin-right 20px
    `}</style>
  </div>
)

export default Footer
