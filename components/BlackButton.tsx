import { useRef, ReactNode } from 'react'
import Link from 'next/link'
import { Grad, getColors } from 'components/Grad'

const bgs: HTMLDivElement[] = []

type BlackButtonProps = {
  children?: ReactNode
  link?: string
  width?: string
  height?: string
  backgroundColor?: string
  onClick?: any
}

const BlackButton = ({ children, link, width = '256px', height = '60px', backgroundColor = 'black', onClick }: BlackButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const onMousEnter = () => {
    const bg = document.createElement('div')
    bg.classList.add('black-button-bg')
    const [colorA, colorB] = getColors()
    bg.style.backgroundImage = `linear-gradient(to right, ${colorA}, ${colorB})`
    ref.current?.appendChild(bg)
    bgs.push(bg)
    bg.animate(
      [
        { left: '-100%', easing: 'cubic-bezier(0.80, 0.000, 0.200, 1.0)' },
        { left: '0%' },
      ],
      {
        duration: 125,
        iterations: 1,
        fill: "both"
      }
    )
  }
  const onMouseLeave = () => {
    const bg = bgs.shift()!
    bg.animate(
      [
        { left: '100%', easing: 'cubic-bezier(0.80, 0.000, 0.200, 1.0)' },
      ],
      {
        duration: 125,
        iterations: 1,
        fill: "both"
      }
    ).onfinish = () => {
      bg.parentNode?.removeChild(bg)
    }
  }
  return (
    <>
      <Grad>
        <div>
          {link
            ? <Link href={link}><a ref={ref} onMouseEnter={onMousEnter} onMouseLeave={onMouseLeave}>{children}</a></Link>
            : <a ref={ref} onMouseEnter={onMousEnter} onMouseLeave={onMouseLeave} onClick={onClick}>{children}</a>
          }
        </div>
      </Grad>
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
          width ${width}
          height ${height}
          padding-top 4px
          background-color ${backgroundColor}
          border none
          position relative
          z-index 0
          overflow hidden
          cursor pointer
          user-select none
      `}</style>
      <style jsx global>{`
        .black-button-bg
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background-color red
          z-index -1
      `}</style>
    </>
  )
}

export default BlackButton
