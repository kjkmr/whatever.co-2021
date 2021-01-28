import { ReactNode, useRef, useEffect } from 'react'
import Link from 'next/link'
import classnames from 'classnames'
import { Grad, getColors } from 'components/Grad'

type BlackButtonProps = {
  children?: ReactNode
  className?: string
  link?: string
  width?: string
  height?: string
  backgroundColor?: string
  onClick?: any
  skipIn?: boolean
}

const BlackButton = ({ children, className, link, width = '256px', height = '60px', backgroundColor = 'black', onClick, skipIn = false }: BlackButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const bgs = useRef<HTMLDivElement[]>([])
  const onMouseEnter = () => {
    const bg = document.createElement('div')
    bg.classList.add('black-button-bg')
    const [colorA, colorB] = getColors()
    bg.style.backgroundImage = `linear-gradient(to right, ${colorA}, ${colorB})`
    ref.current?.appendChild(bg)
    bgs.current.push(bg)
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
    const bg = bgs.current.shift()!
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
  useEffect(() => {
    ref.current?.addEventListener('mouseenter', onMouseEnter)
    ref.current?.addEventListener('mouseleave', onMouseLeave)
    return () => {
      ref.current?.removeEventListener('mouseenter', onMouseEnter)
      ref.current?.removeEventListener('mouseleave', onMouseLeave)
      bgs.current.forEach(bg => bg.parentNode?.removeChild(bg))
    }
  }, [])
  const inner = (
    <>
      <div className={classnames(className)}>
        {link
          ? <Link href={link}><a ref={ref} >{children}</a></Link>
          : <a ref={ref} onClick={onClick}>{children}</a>
        }
      </div>
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
        @media (--mobile)
          a
            font-size 1.4rem
            padding-top 2px
      `}</style>
    </>
  )
  return (
    <>
      {skipIn ? <div>{inner}</div> : <Grad>{inner}</Grad>}
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
