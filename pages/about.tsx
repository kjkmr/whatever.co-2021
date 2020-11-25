import Link from 'next/link'
import Layout from '../components/Layout'
import React from 'react'

const AboutPage = () => (
  <Layout title="ABOUT">
    <h1>Crossborder<br />Creative Studio.</h1>
    <div className="text">
      <p>Whatever is a cross-border creative studio.</p>
      <p>The world has become a much closer place now that we are all online,<br />
      but it’s also brought us closer to boundaries we never noticed before.<br />
      But it’s also brought us closer to boundaries that we never noticed before.<br />
      We’re going to jump over those boundaries.<br />
      If we know the goodness of that world, we can make this one better.<br />
      Because there will be new emotions created by connecting this world with that one.</p>
      <p>With bases in Tokyo, New York, Taipei, and Berlin, we are able to transcend the borders of country and language.<br />
      We cross borders in a variety of fields, from branding to TV programs, products, and new business development.<br />
      We cross the borders of the creative process, which is neither just thinking about it nor just creating it.</p>
      <p>By doing so, it doesn’t matter whether you are here or there.<br />
      We will realize ideas that will bring the world together and inspire.</p>
    </div>

    <div className="genres">
      <div className="inner">
        <h2>Crossing the border of</h2>
        <h1>genres</h1>
        <p>At Whatever, we do exactly what the name implies: we create anything. From global brand vision development to advertising, TV shows, products, and stores. We make the most of our team’s ability to “think and create” to transcend the boundaries of media and genres, from planning to development and implementation of never-before-seen experiences.</p>
        <div className="learn"><button>Learn more</button></div>
      </div>
    </div>

    <div className="cultures">
      <div className="inner">
        <h2>Crossing the border of</h2>
        <h1>cultures</h1>
        <p>At Whatever, we have a proven track record of working with brands around the world, which enables us to support branding and content development across borders and cultures.<br />With four offices in Tokyo, New York, Taiwan and Berlin, and a world-class staff, Whatever can plan and produce world-class brand communications and products.</p>
        <div className="learn"><button>Learn more</button></div>
      </div>
    </div>

    <div className="profession">
      <div className="inner">
        <h2>Crossing the border of</h2>
        <h1>profession</h1>
        <p>Whatever is also actively involved in in-house product and business development.<br />We also provide product development and R&amp;D support for a variety of brands, as well as branding and investment support for startups.</p>
        <div className="learn"><button>Learn more</button></div>
      </div>
    </div>

    <style jsx>{`
      h1
        display block
        margin-top 75px
        margin-bottom 79px
        margin-left -4px
        font-size 120px
        letter-spacing 0.00em
        line-height 1.09em
      .text
        margin-left 80px
        margin-bottom 163px
        font-size 24px
        letter-spacing 0.016em
        line-height 1.75em
        p
          margin 43px 0
      .genres
        background-image url('/about/image.jpg')
        background-repeat no-repeat
        padding-top 289px
        padding-left 603px
        padding-right 60px
        margin-bottom 93px
        .inner
          background-color white
          {/* opacity 0.5 */}
          padding-top 29px
          padding-left 60px
          h2
            font-size 36px
            margin-bottom 0
            margin-left -2px
          h1
            font-size 72px
            margin-top 10px
            margin-bottom 33px
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
      .cultures
        background-image url('/about/image2.jpg')
        background-repeat no-repeat
        background-position top right
        padding-top 289px
        padding-right 599px
        margin-bottom 89px
        .inner
          background-color white
          {/* opacity 0.5 */}
          padding-top 43px
          padding-left 81px
          padding-right 60px
          h2
            font-size 36px
            margin-bottom 0
            margin-left -2px
          h1
            font-size 72px
            margin-top 10px
            margin-bottom 34px
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
      .profession
        background-image url('/about/image3.jpg')
        background-repeat no-repeat
        padding-top 289px
        padding-left 603px
        padding-right 70px
        margin-bottom 139px
        .inner
          background-color white
          {/* opacity 0.5 */}
          padding-top 29px
          padding-left 60px
          h2
            font-size 36px
            margin-bottom 0
            margin-left -2px
          h1
            font-size 72px
            margin-top 10px
            margin-bottom 33px
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
  </Layout>
)

export default AboutPage
