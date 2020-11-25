import Link from 'next/link'

const Header = (props: any) => (
  <div className="header">
    <img src="logo_rgb_black.png" />

    <style jsx>{`
      .header
        height 80px
        display flex
        justify-content flex-end
        align-items flex-start
      img
        display block
        margin-top 32px
        margin-right 30px
    `}</style>
  </div>
)

export default Header
