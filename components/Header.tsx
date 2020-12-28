import Link from 'next/link'

const Header = () => (
  <div className="header">
    <div className="fixed">
      <Link href="/"><a><img src="/logo_rgb_black.png" /></a></Link>
    </div>

    <style jsx>{`
      .header
        height 80px
        display flex
        justify-content flex-end
        align-items flex-start
      .fixed
        position fixed
        z-index 10000
      a
        display block
        border none
        padding 0
        margin-top 32px
        margin-right 30px
    `}</style>
  </div>
)

export default Header
