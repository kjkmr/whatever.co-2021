import Link from 'next/link'
import { t, LangStyle } from 'lib/i18n'
import Layout from 'components/Layout'
import { Header, Footer, SectionTitle } from 'components/About'


const Section1 = () => (
  <div className="container">
    <SectionTitle num="01" nx={-5} tx={-4} title={t('about.genres.1.title')} />
    <div className="t">
      {t('about.genres.1.body').split('\n').map((line, index) => (<p key={index}>{line}</p>))}
    </div>
    <h2>{t('about.genres.1.example.title')}</h2>
    <ul>
      {[1, 2, 3, 4, 5].map(n => (
        <li key={n}><span>{t(`about.genres.1.example.${n}.name`)}</span><br />{t(`about.genres.1.example.${n}.content`)}</li>
      ))}
    </ul>
    <div className="images">
      <img src="/about/genres/image@2x.jpg" alt="" className="i1" />
      <img src="/about/genres/image-1@2x.jpg" alt="" className="i2" />
      <img src="/about/genres/image-2@2x.jpg" alt="" className="i3" />
      <img src="/about/genres/image-3@2x.jpg" alt="" className="i4" />
      <img src="/about/genres/image-4@2x.jpg" alt="" className="i5" />
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .container
        position relative
        min-height vwpx(1293)
        margin-top vwpx(159)
        margin-left vwpx(80)
        margin-bottom vwpx(88)
      .t
        width vwpx(522.7)
        line-height 2em
        margin-top vwpx(43)
        margin-bottom vwpx(87)
        p
          margin-top vwpx(30)
      h2
        font-size vwpx(20)
        font-weight bold
        margin-bottom vwpx(40)
      ul
        margin 0
        margin-left 10px
        padding 0
        width 510px
        list-style-type '- '
        li
          margin 0
          margin-bottom 24px
          padding 0
          font-size 1.5rem
          line-height 2.15em
          >span
            font-weight bold
      .images img
        position absolute
        &.i1
          top 0
          right 0
          width vwpx(523)
        &.i2
          top vwpx(366)
          right vwpx(208)
          width vwpx(231)
        &.i3
          top vwpx(531)
          right vwpx(80)
          width vwpx(185)
        &.i4
          top vwpx(842)
          right vwpx(142)
          width vwpx(461)
        &.i5
          top vwpx(1062)
          right 0
          width vwpx(231)
    `}</style>
  </div>
)

const Section2 = () => (
  <div className="container">
    <SectionTitle num="02" title={t('about.genres.2.title')} nx={-4} tx={-14} ty={28} />
    <div className="t">{t('about.genres.2.body')}</div>
    <div className="g">
      {[1, 2, 3, 4].map(n => (
        <div>
          <div className="title" dangerouslySetInnerHTML={{ __html: t(`about.genres.2.roles.${n}.category`).replace(/\n/g, '<br />') }}></div>
          <ul>
            {t(`about.genres.2.roles.${n}.roles`).split(',').map(role => <li>{role}</li>)}
          </ul>
        </div>
      ))}
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .container
        margin-left vwpx(80)
        margin-right vwpx(80)
        margin-bottom vwpx(100)
      .t
        margin-top vwpx(42)
        font-size 1.5rem
        line-height 2em
      .g
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap 0
        margin-top 76px
        >div
          margin-left -2px
          border-left 2px solid #E0E0E0
          border-right 2px solid #E0E0E0
          padding 0 vwpx(40)
        .title
          font-size vwpx(18)
          font-weight bold
          line-height 1.55em
          margin-bottom 21px
        ul
          margin 0
          margin-left -1px
          padding 0
          list-style inside '- '
          li
            font-size 1.2rem
            line-height 2.7em
    `}</style>
  </div>
)

const WorkLink = ({ name, link, desc, mb }: { name: string, link: string, desc: string, mb?: number }) => (
  <div style={{ marginBottom: mb || 'auto' }}>
    <div className="name"><Link href={`/work/${link}`}><a>- {name}</a></Link></div>
    <div className="desc">{desc}</div>
    <style jsx>{`
      .name
        font-weight 700
        a
          padding-bottom 2px
          padding-right 4px
          border-bottom 1px solid red
    `}</style>
  </div>
)

const Brands = () => (
  <div className="brands">
    <div className="text">
      <h2 style={{ marginTop: 156, marginBottom: 26 }}>Joint development with brands</h2>
      <div className="t">We collaborate with various brands to jointly develop products and services by leveraging the knowledge and skills we have cultivated in our product development.</div>
      <div className="items">
        <WorkLink name="toio" link="toio" desc="Development of UI/UX and content for Sony Interactive Entertainment’s “toio” product." mb={22} />
        <WorkLink name="New Stand Tokyo" link="new-stand-tokyo" desc="He was in charge of bringing New Stand to Japan, as well as the overall creative direction of the brand, store design and e-commerce site design." mb={22} />
        <WorkLink name="Minute Mint" link="minute-mint" desc="A new mint tablet was jointly developed with UHA Taste Sugar and Kokuyo based on the concept of “how to measure good time.”" />
      </div>
    </div>
    <img src="/about/genre/image03e@2x.jpg" alt="" width={354} height={199} style={{ top: 14, right: 0 }} />
    <img src="/about/genre/image03f@2x.jpg" alt="" width={352} height={352} style={{ top: 166, right: 148 }} />
    <style jsx>{`
      .brands
        position relative
        >img
          position absolute
      .text
        width 603px
        line-height 2em
      .items
        margin-top 43px
        margin-left 40px
    `}</style>
  </div>
)

const Investment = () => (
  <div className="investment">
    <div className="inner">
      <div className="text">
        <h2 style={{ marginBottom: 18 }}>Creative Investment</h2>
        <div className="t">We also support the growth of products and services that we believe in as businesses through investment in external partners and labor investment.</div>
      </div>
      <div className="items">
        <WorkLink name="Cotodama（Lyric Speaker）" link="" desc="Saqoosha is a joint venture with SIX, WOW and THE GUILD, with Saqoosha taking part as CTO and in charge of software development for Lyric Speaker’s motion graphics and direction." mb={22} />
        <WorkLink name="Yummy Sake" link="" desc="A service that uses AI and blind tasting to identify the sake you like, with Takata joining as CTO to support algorithm development, investment and business strategy." mb={22} />
        <WorkLink name="Cradle" link="" desc="Kawamura joined Sputniko as CCO and was in charge of the overall creative direction of the brand." />
      </div>
    </div>
    <img src="/about/genre/image03g@2x.jpg" alt="" width={401} height={225} style={{ top: 14, left: -80 }} />
    <img src="/about/genre/image03h@2x.jpg" alt="" width={338} height={338} style={{ top: 180, left: 121 }} />
    <style jsx>{`
      .investment
        position relative
        margin-top 168px
        >img
          position absolute
      .inner
        margin-left 523px
        width 603px
        line-height 2em
      .items
        margin-top 42px
        margin-left 40px
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
      <WorkLink name="Rakugaki AR" link="rakugakiar" desc="An app that makes your scribbles come alive in AR." />
      <WorkLink name="Puppet Guts" link="puppet-guts" desc="Internal Nugurumi for placement in hand puppets." />
      <WorkLink name="Wear you are" link="wear-you-are" desc="A service that allows you to make T-shirts and phone cases with satellite photos of your favorite places." />
      <WorkLink name="Discodog" link="discodog" desc="An LED vest for your dog that can display text and animations from your phone." />
      <WorkLink name="WFH Jammies" link="wfh-jammies" desc="Remote worker’s pajamas with only the part of the shirt that shows up in the video conference." />
      <WorkLink name="Lyric Speaker" link="lyric-speaker" desc="A speaker whose lyrics are animated in sync with the song." />
    </div>
    <div className="images">
      <img src="/about/genre/image03a@2x.jpg" alt="" width={546} height={308} style={{ top: 17, right: 0 }} />
      <img src="/about/genre/image03b@2x.jpg" alt="" width={255} height={255} style={{ top: 395, right: 80 }} />
      <img src="/about/genre/image03c@2x.jpg" alt="" width={463} height={260} style={{ top: 609, right: 122 }} />
      <img src="/about/genre/image03d@2x.jpg" alt="" width={326} height={183} style={{ top: 963, right: 80 }} />
    </div>
    <Brands />
    <Investment />
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
  <Layout title="About" footer={<Footer left="profession" right="cultures" />}>
    <div className="container">
      <Header title="Genres" subtitle={t('about.genres.title')} desc={t('about.genres.description')} />
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
    <style jsx>{`
      .container
        min-height 5000px
        margin-bottom 110px
    `}</style>
  </Layout>
)

export default GenrePage
