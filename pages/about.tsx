import Layout from '../components/Layout'
import { Grad } from '../components/Grad'

const Genres = () => (
  <div className="genres">
    <div className="image"><img src="/about/image.jpg" width="1028" height="578" /></div>
    <div className="inner">
      <Grad><h2>Crossing the border of</h2></Grad>
      <Grad><h1>genres</h1></Grad>
      <Grad><p>At Whatever, we do exactly what the name implies: we create anything. From global brand vision development to advertising, TV shows, products, and stores. We make the most of our team’s ability to “think and create” to transcend the boundaries of media and genres, from planning to development and implementation of never-before-seen experiences.</p></Grad>
      <div className="learn"><Grad><button>Learn more</button></Grad></div>
    </div>
    <style jsx>{`
      .genres
        {/* opacity 0.5 */}
        position relative
        padding-top 289px
        padding-left 603px
        padding-right 60px
        margin-bottom 93px
      .image
        position absolute
        top 0
        left 0
      .inner
        position relative
        background-color white
        padding-top 29px
        padding-left 60px
      h2
        display inline-block
        overflow hidden
        font-size 36px
        margin-bottom 0
        margin-left -2px
      h1
        display inline-block
        overflow hidden
        font-size 72px
        margin-top 10px
        margin-bottom 17px
        margin-left -4px
      p
        line-height 2.0em
        margin-left -2px
        letter-spacing -0.01em
      .learn
        display flex
        justify-content flex-end
        button
          display block
          font-weight bold
          font-size 18px
          border none
          border-bottom 1px solid
          background none
          margin-top 10px
          margin-right 20px
          padding-bottom 5px
          padding-right 55px
          padding-left 0
    `}</style>
  </div>
)

const Cultures = () => (
  <div className="cultures">
    <div className="inner">
      <Grad><h2>Crossing the border of</h2></Grad>
      <Grad><h1>cultures</h1></Grad>
      <Grad><p>At Whatever, we have a proven track record of working with brands around the world, which enables us to support branding and content development across borders and cultures.<br />With four offices in Tokyo, New York, Taiwan and Berlin, and a world-class staff, Whatever can plan and produce world-class brand communications and products.</p></Grad>
      <div className="learn"><Grad><button>Learn more</button></Grad></div>
    </div>
    <style jsx>{`
      .cultures
        {/* opacity 0.5 */}
        background-image url('/about/image2.jpg')
        background-repeat no-repeat
        background-position top right
        padding-top 289px
        padding-right 599px
        margin-bottom 89px
      .inner
        background-color white
        padding-top 43px
        padding-left 81px
        padding-right 60px
      h2
        overflow hidden
        font-size 36px
        margin-bottom 0
        margin-left -2px
      h1
        overflow hidden
        font-size 72px
        margin-top 13px
        margin-bottom 37px
        margin-left -4px
      p
        line-height 2.0em
        margin-left -1px
        letter-spacing -0.01em
      .learn
        display flex
        justify-content flex-end
        button
          display block
          font-weight bold
          font-size 18px
          border none
          border-bottom 1px solid
          background none
          margin-top 11px
          padding-bottom 5px
          padding-right 55px
          padding-left 0
    `}</style>
  </div>
)

const Profession = () => (
  <div className="profession">
    <div className="inner">
      <Grad><h2>Crossing the border of</h2></Grad>
      <Grad><h1>profession</h1></Grad>
      <Grad><p>Whatever is also actively involved in in-house product and business development.<br />We also provide product development and R&amp;D support for a variety of brands, as well as branding and investment support for startups.</p></Grad>
      <div className="learn"><Grad><button>Learn more</button></Grad></div>
    </div>
    <style jsx>{`
      .profession
        {/* opacity 0.5 */}
        background-image url('/about/image3.jpg')
        background-repeat no-repeat
        padding-top 289px
        padding-left 603px
        padding-right 70px
        margin-bottom 139px
      .inner
        background-color white
        padding-top 29px
        padding-left 60px
      h2
        overflow hidden
        font-size 36px
        margin-bottom 0
        margin-left -2px
      h1
        overflow hidden
        font-size 72px
        margin-top 12px
        margin-bottom 37px
        margin-left -3px
      p
        line-height 2.0em
        margin-left -2px
        letter-spacing -0.01em
      .learn
        display flex
        justify-content flex-end
        button
          display block
          font-weight bold
          font-size 18px
          border none
          border-bottom 1px solid
          background none
          margin-top 29px
          margin-right 10px
          padding-bottom 5px
          padding-right 55px
          padding-left 0
    `}</style>
  </div>
)

const AboutPage = () => (
  <Layout title="ABOUT">
    <Grad><h1>Crossborder<br />Creative Studio.</h1></Grad>
    <div className="text">
      <Grad><span style={{ marginBottom: '54px' }}>Whatever is a cross-border creative studio.</span></Grad>
      <Grad><span>The world has become a much closer place now that we are all online,</span></Grad>
      <Grad><span>but it’s also brought us closer to boundaries we never noticed before.</span></Grad>
      <Grad><span>But it’s also brought us closer to boundaries that we never noticed before.</span></Grad>
      <Grad><span>We’re going to jump over those boundaries.</span></Grad>
      <Grad><span>If we know the goodness of that world, we can make this one better.</span></Grad >
      <Grad><span style={{ marginBottom: '55px' }}>Because there will be new emotions created by connecting this world with that one.</span></Grad >
      <Grad><span>With bases in Tokyo, New York, Taipei, and Berlin, we are able to transcend the borders of country and</span></Grad >
      <Grad><span>language.</span></Grad >
      <Grad><span>We cross borders in a variety of fields, from branding to TV programs, products, and new business</span></Grad >
      <Grad><span>development.</span></Grad >
      <Grad><span style={{ marginBottom: '55px' }}>We cross the borders of the creative process, which is neither just thinking about it nor just creating it.</span></Grad >
      <Grad><span>By doing so, it doesn’t matter whether you are here or there.</span></Grad >
      <Grad><span>We will realize ideas that will bring the world together and inspire.</span></Grad >
    </div>

    <Genres />
    <Cultures />
    <Profession />

    <style jsx>{`
      h1
        display inline-block
        margin-top 75px
        margin-bottom 86px
        margin-left -4px
        font-size 120px
        letter-spacing 0.00em
        line-height 1.09em
        overflow hidden
      .text
        margin-left 80px
        margin-bottom 157px
        font-size 24px
        font-weight bold
        {/* line-height 1.75em */}
        p
          margin 42px 0
        span
          display inline-block
          overflow hidden
          margin-bottom 13px
    `}</style>
  </Layout>
)

export default AboutPage
