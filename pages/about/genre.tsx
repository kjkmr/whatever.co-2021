import Link from 'next/link'
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

const SectionTitle = ({ num, title, nx, tx }: { num: string, title: string, nx?: number, tx?: number }) => (
  <div className="head">
    <div className="num" style={{ marginLeft: nx }}>{num}</div>
    <div className="title" style={{ marginLeft: 45 + (tx || 0) }}>{title}</div>
    <style jsx>{`
      .head
        position relative
        z-index 1
        display flex
        padding-top 50px
        width 752px
      .num
        font-size 108px
        font-weight bold
        -webkit-text-stroke 1px black
        -webkit-text-fill-color transparent
        margin-top 5px
        {/* margin-left -4px */}
      .title
        font-size 36px
        font-weight bold
        margin-top 1px
        {/* margin-left 45px */}
        line-height 1.5em
    `}</style>
  </div>
)

const Section1 = () => (
  <div className="container">
    <SectionTitle num="01" nx={-4} title="Knowledge of creative development in a variety of areas" />
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
        margin-bottom 228px
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

const Section2 = () => (
  <div className="container">
    <SectionTitle num="02" title="Crossing the boundary between “thinking” and “making" tx={-13} />
    <div className="t">At Whatever, we believe that “thinking and creating” together is the way to bring new ideas to life. To do this, you won’t get there by just thinking like a creative agency or consulting firm, and you won’t get there by just creating like a production company. Thinking about an idea that you have never seen before and immediately testing whether it can be realized. At the end of such a process that goes beyond the realm of “thinking” and “making”, an idea that has never been seen before can be realized. In order to do so, Whatever has the talent to think and create.</div>
    <div className="g">
      <div>
        <div className="title">Project<br />Management</div>
        <ul>
          <li>Producer</li>
          <li>Project Manager</li>
        </ul>
      </div>
      <div>
        <div className="title">Creative<br />Development</div>
        <ul>
          <li>Creative Director</li>
          <li>Sound Artist</li>
          <li>Art Director</li>
          <li>Architects</li>
          <li>Designer</li>
          <li>Copywriter</li>
          <li>Illustrator</li>
          <li>Choreographer</li>
        </ul>
      </div>
      <div>
        <div className="title">Project<br />Management</div>
        <ul>
          <li>Tech Director</li>
          <li>Programmer</li>
          <li>Engineer</li>
          <li>Drone racer</li>
        </ul>
      </div>
      <div>
        <div className="title">Business<br />Development</div>
        <ul>
          <li>Business Producer</li>
          <li>Business Consultant</li>
          <li>Investment Director</li>
        </ul>
      </div>
    </div>
    <style jsx>{`
      .container
        margin-left 80px
        margin-right 80px
        margin-bottom 127px
      .t
        margin-top 51px
        font-size 16px
        line-height 2em
      .g
        display grid
        grid-template-columns 218px 277px 277px auto
        margin-top 65px
        >div
          border-right 2px solid #E0E0E0
          padding-left 60px
          padding-right 30px
          &:first-child
            padding 0
          &:last-child
            border none
        .title
          font-size 18px
          font-weight bold
          line-height 1.55em
          margin-bottom 21px
        ul
          margin 0
          padding 0
          list-style inside '- '
          li
            font-size 16px
            line-height 2em
    `}</style>
  </div>
)

const Section3 = () => (
  <div className="container">
    <SectionTitle num="03" nx={-4} title="Co-development, in-house projects and creative investment" tx={-17} />
    <div className="t" style={{ marginTop: 32, marginBottom: 60 }}>Unless you’ve done it before, you can’t say that you really understand the process. If you’re doing branding and product development for a client, we should be able to experience the process ourselves, and understand it with our bodies as well as our minds. With this in mind, we at Whatever are actively working on our own product development and joint business development with our clients. Whatever’s business support includes product development and R&D support for various brands, as well as branding and investment for startups.</div>
    <h2>In-house product development</h2>
    <div className="t">We don’t stop at just prototypes and R&D, but rather, we do not stop at just prototypes and R&D. We do not stop at outlandish ideas that may not seem feasible based on logic alone, or ideas that may or may not be viable for business but would make the world a little happier if they were realized.</div>
    <div className="works">
      <div>
        <div className="name"><Link href="/work/rakugakiar"><a>- Rakugaki AR</a></Link></div>
        <div className="desc">An app that makes your scribbles come alive in AR.</div>
      </div>
      <div>
        <div className="name"><Link href="/work/puppet-guts"><a>- Puppet Guts</a></Link></div>
        <div className="desc">Internal Nugurumi for placement in hand puppets.</div>
      </div>
      <div>
        <div className="name"><Link href="/work/wear-you-are"><a>- Wear you are</a></Link></div>
        <div className="desc">A service that allows you to make T-shirts and phone cases with satellite photos of your favorite places.</div>
      </div>
      <div>
        <div className="name"><Link href="/work/discodog"><a>- Discodog</a></Link></div>
        <div className="desc">An LED vest for your dog that can display text and animations from your phone.</div>
      </div>
      <div>
        <div className="name"><Link href="/work/wfh-jammies"><a>- WFH Jammies</a></Link></div>
        <div className="desc">Remote worker’s pajamas with only the part of the shirt that shows up in the video conference.</div>
      </div>
      <div>
        <div className="name"><Link href="/work/lyric-speaker"><a>- Lyric Speaker</a></Link></div>
        <div className="desc">A speaker whose lyrics are animated in sync with the song.</div>
      </div>
    </div>
    <div className="images">
      <img src="/about/genre/image03a@2x.jpg" alt="" width={546} height={308} style={{ top: 17, right: 0 }} />
      <img src="/about/genre/image03b@2x.jpg" alt="" width={255} height={255} style={{ top: 395, right: 80 }} />
      <img src="/about/genre/image03c@2x.jpg" alt="" width={463} height={260} style={{ top: 609, right: 122 }} />
      <img src="/about/genre/image03d@2x.jpg" alt="" width={326} height={183} style={{ top: 963, right: 80 }} />
    </div>
    <style jsx>{`
      .container
        position relative
        margin-left 80px
      .t
        width 603px
        font-size 16px
        line-height 2em
      h2
        font-size 24px
        font-weight bold
        margin-bottom 32px
      .works
        display grid
        grid-template-columns 252px 247px
        grid-gap 39px 58px
        margin-top 44px
        margin-left 41px
        font-size 16px
        line-height 2em
        .name
          font-weight 700
          a
            padding-bottom 2px
            padding-right 4px
            border-bottom 1px solid red
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
      <Section2 />
      <Section3 />
    </div>
    <style jsx>{`
      .container
        min-height 6000px
    `}</style>
  </Layout>
)

export default GenrePage
