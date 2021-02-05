const SNSButtons = () => (
  <>
    <div className="links">
      <a href="https://www.facebook.com/whtevr.co/" style={{ backgroundImage: 'url(/footer/facebook.svg)' }} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href="https://twitter.com/whtevr_co" style={{ backgroundImage: 'url(/footer/twitter.svg)' }} target="_blank" rel="noopener noreferrer">Twitter</a>
      <a href="https://www.instagram.com/whtevr_co/" style={{ backgroundImage: 'url(/footer/instagram.svg)' }} target="_blank" rel="noopener noreferrer">Instagram</a>
      <a href="https://www.linkedin.com/company/whtevr-co/" style={{ backgroundImage: 'url(/footer/linkedin.svg)' }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
    <style jsx>{`
      .links
        font-size 0
        a
          display inline-block
          width 25px
          height 25px
          font-size 0
          background-repeat no-repeat
          background-size 25px 25px
          margin 0
          margin-left 15px
          padding 0
          border none
          &:first-child
            margin 0
        @media (--mobile)
          a
            width 30px
            height 30px
            background-size 30px 30px
    `}</style>
  </>
)

export default SNSButtons
