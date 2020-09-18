import Link from 'next/link'
import Layout from '../components/Layout'
import AboutData from '../components/AboutData'
import React from 'react'

const isMobile = false
const lang = "ja"
const state = AboutData[lang]
const prefix = "-" + lang

const AboutPage = () => (
  < Layout title="ABOUT" >
    <div className="about">
      <img className="about-text" src={isMobile ? "/assets/makewhatever-sp.svg" : "/assets/makewhatever.svg"} alt="Make whatever. Rules, whatever." />
      <img className="about-poem" src={isMobile ? state.poem_sp : state.poem_pc} alt={state.poem_alt} />
      <div className="about-chiefs">
        <Link href="/team/yusuke">
          <div className="about-chief">
            <img src="https://whatever.co/wp-content/uploads/2018/01/dotbydot7168.jpg" />
            <div className="about-chief-title">CEO / Executive Producer</div>
            <div className="about-chief-name-ja">富永 勇亮</div>
            <div className="about-chief-name-en">Yusuke Tominaga</div>
          </div>
        </Link>
        <Link href="/team/masa">
          <div className="about-chief">
            <img src="https://whatever.co/wp-content/uploads/2019/06/masa-2.jpg" />
            <div className="about-chief-title">CCO / Creative Director</div>
            <div className="about-chief-name-ja">川村 真司</div>
            <div className="about-chief-name-en">Masashi Kawamura</div>
          </div>
        </Link>
        <Link href="/team/saqoosha">
          <div className="about-chief">
            <img src="https://whatever.co/wp-content/uploads/2018/01/dotbydot7043.jpg" />
            <div className="about-chief-title">CTO / Programmer</div>
            <div className="about-chief-name-ja">Saqoosha</div>
            <div className="about-chief-name-en">さくーしゃ</div>
          </div>
        </Link>
      </div>

      <img className="about-aboutus-title" src="/assets/aboutus.png" alt="ABOUT US" />
      {[0, 1, 2, 3].map(i => <div className={"about-" + (i + 1)} key={i}>
        <img className="about-aboutus-title2" src={"/assets/about-" + (i + 1) + prefix + ".png"} alt={state.about[i].title} />
        <div className="about-aboutus-text" dangerouslySetInnerHTML={{ __html: state.about[i].text }}></div>
        {isMobile ? <img className="about-aboutus-image" src={"/assets/about-" + (i + 1) + "-sp.jpg"} /> : null}
      </div>)}
      <div className="about-4-detail">
        {state.about4.map((item, index) => <div className="about-4-detail-item" key={item.title}>
          <div className="about-4-detail-item-title" dangerouslySetInnerHTML={{ __html: item.title + (!isMobile && ((lang == 'en' && index == 1) || (lang == 'zh' && index == 2)) ? '<br/>&nbsp;' : '') }}></div>
          <div className="about-4-detail-item-text">{item.text}</div>
        </div>)}
      </div>
      <div className="about-5">
        <img src={"/assets/about-5" + prefix + ".png"} alt={state.about[4].title} />
        <div dangerouslySetInnerHTML={{ __html: state.about[4].text }}></div>
      </div>
      <div className="about-alliances">
        <Link href="https://lyric-speaker.com/">
          <div style={{ backgroundImage: "url(/assets/cotodama.png)" }}>
            <div>
              <b>COTODAMA</b>
              <span>{state.cotodama}</span>
            </div>
          </div>
        </Link>
        <Link href="https://bassdrum.org/">
          <div style={{ backgroundImage: "url(/assets/bassdrum.png)" }}>
            <div>
              <b>BASSDRUM</b>
              <span>{state.bassdrum}</span>
            </div>
          </div>
        </Link>
        <Link href="https://yummysake.jp/">
          <div style={{ backgroundImage: "url(/assets/yummysake.png)" }}>
            <div>
              <b>YUMMY SAKE</b>
              <span>{state.yummysake}</span>
            </div>
          </div>
        </Link>
        <Link href="https://kasa-made.com/">
          <div style={{ backgroundImage: "url(/assets/kasa.png)" }}>
            <div>
              <b>kasa</b>
              <span>{state.kasa}</span>
            </div>
          </div>
        </Link>
        <Link href="https://wtfc.jp/">
          <div style={{ backgroundImage: "url(/assets/wtfc.png)" }}>
            <div>
              <b>WTFC</b>
              <span>{state.wtfc}</span>
            </div>
          </div>
        </Link>
      </div>

      <img className="about-ourclients-title" src="/assets/ourclients.png" alt="OUT CLIENTS" />
      <img className="about-ourclients-table" src={"/assets/client-logo" + (isMobile ? "-sp" : "") + ".png"} alt="" />
    </div>

    <style jsx>{`
      .about
        font-size: 16.2px
        line-height: 1.9em
      .about-text
        width: 960px
        margin: 51px 0 48px
      .about-poem
        width: 960px
        margin-top: 32px
      .about-chiefs
        margin-top: 154px
        margin-bottom: 153px
        display: flex
        justify-content: space-between
      .about-chief
        display: block
        text-align: center
        border: none
        >img
          width: 270px
          margin-bottom: 15px
      .about-chief-title
        font-weight: bold
        margin-bottom: 2px
      .about-chief-name-ja
        font-size: 25px
        margin-bottom: -3px
      .about-chief-name-en
        font-size: 13px
      .about-aboutus-title
        height: 22px
        display: block
        margin: 0 auto 88px
      img.about-aboutus-title2
        width: 450px
        margin-bottom: 36px
      div.about-aboutus-text
        width: 450px
        line-height: 1.9em
      .about-1
        min-height: 420px
        margin-bottom: 103px
        background-image: url(/assets/about-1.jpg)
        background-size: 450px 420px
        background-repeat: no-repeat
        background-position: right bottom
      .about-2
        display: flex
        flex-direction: column
        align-items: flex-end
        min-height: 420px
        margin-bottom: 86px
        background-image: url(/assets/about-2.jpg)
        background-size: 450px 420px
        background-repeat: no-repeat
        background-position: left bottom
        >img.about-aboutus-title2
          margin-bottom: 42px
      .about-3
        min-height: 420px
        margin-bottom: 124px
        background-image: url(/assets/about-3.jpg)
        background-size: 450px 420px
        background-repeat: no-repeat
        background-position: right bottom
      .about-4
        display: flex
        flex-direction: column
        align-items: flex-end
        min-height: 280px
        margin-bottom: 42px
        background-image: url(/assets/about-4.jpg)
        background-size: 450px 280px
        background-repeat: no-repeat
        background-position: left bottom
        >img.about-aboutus-title2
          margin-bottom: 42px
      .about-4-detail
        display: flex
        justify-content: space-between
        margin-bottom: 101px
      .about-4-detail-item
        width: 195px
        line-height: 1.6em
      .about-4-detail-item-title
        border-bottom: 1px solid
        font-size: 16px
        font-weight: bold
        padding-bottom: 9px
        margin-bottom: 10px
      .about-4-detail-item-text
        font-size: 14px
      .about-5
        display: flex
        margin-bottom: 84px
        >img
          height: 93px
          margin-right: 62px
      .about-alliances
        margin-bottom: 100px
        >div
          margin-bottom: 45px
          background-repeat: no-repeat
          background-size: auto 72px
          background-position: 10px center
          cursor: pointer
          >div
            margin-left: 400px
            line-height: 1.5em
            padding-top: 3px
            >b
              display: block
              margin-bottom: 8px
            >span
              font-size: 14px
      .about-ourclients-title
        height: 22px
        display: block
        margin: 0 auto 88px
      .about-ourclients-table
        width: 960px
        margin-bottom: 55px
    `}</style>
  </Layout >
)

export default AboutPage
