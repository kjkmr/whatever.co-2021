import Link from 'next/link'

const BlackButton = ({ text, link }: { text: string, link: string }) => (
  <>
    <Link href={link}>
      <a>{text}</a>
    </Link>
    <style jsx>{`
      a
        display flex
        justify-content center
        align-items center
        color white
        font-size 1.8rem
        font-weight bold
        letter-spacing 0.04em
        box-sizing border-box
        width 256px
        height 60px
        padding-top 4px
        background-color black
        border none
  `}</style>
  </>
)

export default BlackButton