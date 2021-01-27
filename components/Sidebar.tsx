import Link from 'next/link'
import LanguageSelector from 'components/LanguageSelector'

type SidebarProps = {
  title?: string
  backto?: {
    name: string,
    href: string
  }
}

const Sidebar = ({ title, backto }: SidebarProps) => (
  <>
    <div className="sidebar">
      <div className="vertical">
        <div className="title">{title}</div>
        {backto ? <div className="back">
          <Link href={backto.href}>
            <a>
              <div className="text">Back to {backto.name}</div>
              <div className="line" />
            </a>
          </Link>
        </div> : null}
        <div className="langselect"><LanguageSelector /></div>
      </div>
    </div>
    <style jsx>{`
      .sidebar
        position fixed
        width 80px
        height 100vh
      .vertical
        position absolute
        display flex
        justify-content space-between
        width calc(100vh - 80px)
        height 80px
        top 80px
        left 80px
        transform-origin top left
        transform rotate(90deg)
      .title
        font-size 2rem
        font-weight bold
        user-select none
        margin-left 40px
        margin-top 31px
      .back
        position relative
        font-size 1.0rem
        letter-spacing 0.08rem
        margin-left 30px
        margin-top 30px
        text-align center
        a
          display flex
          flex-direction column
          align-items center
          border none
          padding 5px 5px 0
          {/* background-color lightgreen */}
          transition all 0.15s cubic-bezier(0.80, 0.000, 0.200, 1.0)
          &:hover
            padding-top 15px
            opacity 0.3
            transition all 0.15s cubic-bezier(0.80, 0.000, 0.200, 1.0)
            .text
              margin-bottom 10px
              transition all 0.15s cubic-bezier(0.80, 0.000, 0.200, 1.0)
          .text
            margin-bottom 20px
            transition all 0.15s cubic-bezier(0.80, 0.000, 0.200, 1.0)
          .line
            height 15px
            border-left 1px solid #333333
            margin-right 2px
      .langselect
        font-size 1.2rem
        letter-spacing 0.12em
        color #cccccc
        user-select none
        margin-right 38px
        margin-top 36px
    `}</style>
  </>
)

export default Sidebar
