import BlackButton from "./BlackButton"

type Props = {
  leftSub?: string,
  leftTitle?: string,
  leftLink?: string,
  rightSub?: string,
  rightTitle?: string,
  rightLink?: string,
}

export const NextPrevButtons = ({ leftSub, leftTitle, leftLink, rightSub, rightTitle, rightLink }: Props) => (
  <>
    <div className="next-prev">
      {leftTitle ? <BlackButton className="next-prev-button left" link={leftLink}>
        <div className="line"></div>
        <div className="inner">
          {leftSub ? <div className="whatever" >{leftSub}</div> : null}
          <div className="title" >{leftTitle}</div>
        </div>
      </BlackButton> : <div className="next-prev-button left" />}
      {rightTitle ? <BlackButton className="next-prev-button right" link={rightLink}>
        <div className="inner">
          {rightSub ? <div className="whatever" >{rightSub}</div> : null}
          <div className="title" >{rightTitle}</div>
        </div>
        <div className="line"></div>
      </BlackButton> : <div className="next-prev-button right" />}
    </div>
    <style jsx>{`
      .next-prev
        position relative
        height 160px
        display grid
        grid-template-columns repeat(2, 1fr)
        grid-gap 0
        :global(.next-prev-button)
          width 100%
          height 100%
          border-right 1px solid #333333
          box-sizing border-box
          background-color black
          :global(a)
            padding 0
            justify-content start
        :global(.left .inner)
          margin-left 40px
        :global(.right)
          border none
        :global(.right a)
          justify-content flex-end
        :global(.right .inner)
          margin-right 40px
          text-align right
        .line
          border-top 1px solid #fff
          width 40px
          visibility hidden
        .whatever
          font-size 1.2rem
          font-weight 400
          margin-top 1px
        .title
          font-size 2.0rem
          font-weight 500
        .whatever + .title
          margin-top 10px
      @media (--mobile)
        .next-prev
          height 100px
          .line
            display none
          .whatever
            font-size 0.9rem
            margin-top 2px
            letter-spacing 0
          .title
            font-size 1.3rem
            font-weight 400
            letter-spacing 0
            margin-top 8px
          :global(.left .inner)
            margin-left 30px
          :global(.right .inner)
            margin-right 29px
    `}</style>
  </>
)
