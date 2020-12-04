import Link from 'next/link'

const Header = () => (
  <div className="header">
    <Link href="/"><a><img src="/logo_rgb_black.png" /></a></Link>

    <style jsx>{`
      .header
        height 80px
        display flex
        justify-content flex-end
        align-items flex-start
      a
        display block
      img
        margin-top 32px
        margin-right 30px
    `}</style>
  </div>
)

export default Header
