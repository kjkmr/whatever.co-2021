import { Grad } from "components/Grad"

const SNSButtons = () => (
  <>
    <div className="links">
      <Grad whiteText inline interactive>
        <a href="https://www.facebook.com/whtevr.co/" style={{ backgroundImage: 'url(/footer/facebook.svg)' }} target="_blank" rel="noopener noreferrer">Facebook</a></Grad>
      <Grad whiteText inline interactive><a href="https://twitter.com/whtevr_co" style={{ backgroundImage: 'url(/footer/twitter.svg)' }} target="_blank" rel="noopener noreferrer">Twitter</a></Grad>
      <Grad whiteText inline interactive><a href="https://www.instagram.com/whtevr_co/" style={{ backgroundImage: 'url(/footer/instagram.svg)' }} target="_blank" rel="noopener noreferrer">Instagram</a></Grad>
      <Grad whiteText inline interactive><a href="https://www.linkedin.com/company/whtevr-co/" style={{ backgroundImage: 'url(/footer/linkedin.svg)' }} target="_blank" rel="noopener noreferrer">LinkedIn</a></Grad>
    </div>
    <style jsx>{`
      .links
        font-size 0
        display grid
        grid-template-columns repeat(4, 25px)
        gap 0 15px
        a
          display inline-block
          width 25px
          height 25px
          font-size 0
          background-repeat no-repeat
          background-size 25px 25px
          margin 0
          padding 0
          border none
      @media (--mobile)
        .links
          grid-template-columns repeat(4, 30px)
          a
            width 30px
            height 30px
            background-size 30px 30px
    `}</style>
  </>
)

export default SNSButtons
