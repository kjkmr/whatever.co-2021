import Layout from '../../components/Layout'
import { Grad, GradImg } from '../../components/Grad'

const Head = () => (
  <div className="head">
    <Grad><div className="t1">Crossing the border of</div></Grad>
    <Grad><div className="t2">genre</div></Grad>
    <div className="t3"><Grad><div>At Whatever, we do exactly what our name implies - we create everything. From global brand vision development to advertising, TV shows, products, and stores. We make the most of our team’s ability to “think and create” to transcend the boundaries of media and genres, from planning to development and implementation of never-before-seen experiences.</div></Grad></div>
    <style jsx>{`
      .head
        font-size 0
        margin 40px
        margin-top 48px
      .t1
        display inline-block
        margin-bottom 8px
        font-size 32px
        font-weight bold
      .t2
        display inline-block
        margin-bottom 71px
        font-size 108px
        font-weight bold
      .t3
        width 534px
        font-size 24px
        font-weight bold
        line-height 1.75em
    `}</style>
  </div>
)

const Section1 = () => (
  <div className="container">
    <div className="head">
      <div className="num">01</div>
      <div className="title">Knowledge of creative development<br />in a variety of areas</div>
    </div>
    <div className="t">
      <p>We have been engaged in a wide variety of creative projects that have produced results, regardless of the domain. We have been involved in a wide range of creative projects, from strategic creative work such as brand visioning and brand issue identification, to communication development such as TV commercials and digital campaigns, to content production such as TV programs and product design, and from shop design to permanent airport installations. Even projects.</p>
      <p>These seemingly unrelated fields of creative development are actually the same in terms of the ideas they require and the technical and production skills needed to realize them. In fact, through my experience in various fields, I have developed the development and production skills to deal with any issue. In addition, we are able to look at the issues that need to be solved from a holistic perspective that is not bound by genre, and we are able to find the best ideas and implement the best solutions.</p>
    </div>
    <h2>Example of planning and production</h2>
    <ul>
      <li><span>Branding</span><br />Brand logo, brand guidelines, vision statement, etc.</li>
      <li><span>Product</span><br />Product concepts, product design, web services, prototyping, etc.</li>
      <li><span>Marketing</span><br />TV commercials, OOH, websites, apps, events, installations, etc.</li>
      <li><span>Content</span><br />Music videos, TV shows, AR/VR content, etc.</li>
      <li><span>Space</span><br />Permanent exhibitions, shop design, event design, etc.</li>
    </ul>
    <div className="images">
      <img src="/about/genre/image.jpg" alt="" width={403} height={403} style={{ top: 0, right: 160 }} />
      <img src="/about/genre/image-1@2x.jpg" alt="" width={341} height={191} style={{ top: 284, right: 0 }} />
      <img src="/about/genre/image-2@2x.jpg" alt="" width={205} height={205} style={{ top: 540, right: 220 }} />
      <img src="/about/genre/image-3@2x.jpg" alt="" width={205} height={205} style={{ top: 670, right: 80 }} />
      <img src="/about/genre/image-4@2x.jpg" alt="" width={568} height={321} style={{ top: 946, right: 0 }} />
    </div>
    <style jsx>{`
      .container
        position relative
        margin-top 193px
        margin-left 80px
      .head
        position relative
        z-index 1
        display flex
        padding-top 50px
      .num
        font-size 108px
        font-weight bold
        -webkit-text-stroke 1px black
        -webkit-text-fill-color transparent
        margin-top 5px
        margin-left -4px
      .title
        font-size 36px
        font-weight bold
        margin-top 1px
        margin-left 45px
        line-height 1.5em
      .t
        width 603px
        font-size 16px
        line-height 2em
        margin-top 33px
        margin-bottom 67px
        p
          margin-top 32px
      h2
        font-size 24px
        font-weight bold
        margin-bottom 52px
      ul
        margin 0
        margin-left 52px
        padding 0
        list-style-type '- '
        li
          margin 0
          margin-bottom 20px
          padding 0
          font-size 16px
          line-height 2em
          >span
            font-weight 400
      .images img
        position absolute
    `}</style>
  </div>
)

const GenrePage = () => (
  <Layout title="About">
    <div className="container">
      <Head />
      <Section1 />
    </div>
    <style jsx>{`
      .container
        min-height 6000px
    `}</style>
  </Layout>
)

export default GenrePage
