const WorkTag = (props: any) => (
  <a href="#">{props.children}
    <style jsx>{`
      a
        display inline-block
        border 1px solid black
        font-size 12px
        letter-spacing 0.02em
        padding 8px 10px
        margin-right 10px
    `}</style>
  </a>
)

export default WorkTag
