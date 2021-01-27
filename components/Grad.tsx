import { ReactNode, CSSProperties, useLayoutEffect, useRef } from 'react'
import classnames from 'classnames'

const COLORS = ["#ff2300", "#ff9201", "#ffeb00", "#89e82b", "#00c745", "#29ebfe", "#0d44fb", "#a725fc", "#fd1eba"];
export const getColors = (): [string, string] => {
  const i = Math.floor(Math.random() * COLORS.length)
  let j
  do {
    j = Math.floor(Math.random() * COLORS.length)
  } while (i == j)
  return [COLORS[i], COLORS[j]]
}

const _setup = (base: Element, colorA: string, colorB: string): [Element, Element] => {
  base.classList.add('grad-effect-base')
  const fade = document.createElement('div')
  fade.classList.add('grad-effect-fade')
  fade.style.backgroundImage = `url(/noise.png), linear-gradient(to right, ${colorA}, ${colorB})`
  base.appendChild(fade)
  const slide = document.createElement('div')
  slide.classList.add('grad-effect-slide')
  slide.style.backgroundImage = `url(/noise.png), linear-gradient(to right, ${colorA}, ${colorB}, ${colorB})`
  base.appendChild(slide)
  return [fade, slide]
}

const doAnime = (base: Element, fade: Element, slide: Element, duration: number = 250) => {
  const delay = Math.random() * 500
  base.animate(
    [
      {
        visibility: "hidden"
      },
      {
        offset: 0.001,
        visibility: "visible"
      },
      {
        visibility: "visible"
      },
    ],
    {
      duration: duration,
      delay: duration / 2 + delay,
      iterations: 1,
      fill: "both"
    }
  )
  slide.animate(
    [
      {
        left: "-100%"
      },
      {
        backgroundPosition: "0 0, 0 0",
        left: 0
      },
      {
        backgroundPosition: "0 0, 100% 0",
        left: "100%"
      }
    ],
    {
      duration: duration,
      delay: delay,
      iterations: 1,
      fill: "both"
    }
  )
  return fade.animate(
    [
      {
        visibility: "hidden",
        opacity: 1
      },
      {
        offset: 0.001,
        visibility: "visible",
        opacity: 1
      },
      {
        offset: 0.1,
        opacity: 1
      },
      {
        opacity: 0
      }
    ],
    {
      duration: duration * 5,
      delay: duration / 2 + delay,
      iterations: 1,
      fill: "both"
    }
  )
}

export const setup = (base: HTMLElement, whiteText: boolean = false, inline: boolean = true): () => void => {
  const [colorA, colorB] = getColors()
  const [fade, slide] = _setup(base, colorA, colorB)
  if (whiteText) {
    base.classList.add('grad-effect-black')
    fade.classList.add('grad-effect-multiply')
  }
  if (inline) {
    base.style.display = 'inline-block'
  }
  const cleanup = () => {
    fade.parentNode?.removeChild(fade)
    slide.parentNode?.removeChild(slide)
    base.classList.remove('grad-effect-base')
    // base.style.display = ''
  }
  new IntersectionObserver((entries: IntersectionObserverEntry[], object: IntersectionObserver) => {
    const entry = entries[0]
    if (!entry.isIntersecting) { return }
    doAnime(base, fade, slide).onfinish = cleanup
    object.unobserve(base)
  }).observe(base)
  return cleanup
}

export const Grad = ({ children, className, style, whiteText = false, inline = true }: { children?: ReactNode, className?: string, style?: CSSProperties, whiteText?: boolean, inline?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => setup(ref.current!, whiteText, inline), [])
  return (
    <>
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
      <style jsx global>{`
        .grad-effect-base
          position relative
          overflow hidden
          visibility hidden
          background-color white
        .grad-effect-black
          background-color black
        .grad-effect-fade
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background-image url(/noise.png), linear-gradient(to right, #fbe105, #f91fae)
          background-blend-mode overlay, normal
          mix-blend-mode lighten
          visibility hidden
          user-select none
          pointer-events none
          > *
            background-color: transparent !important
        .grad-effect-multiply
          mix-blend-mode multiply
        .grad-effect-image
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background-color white
          background-image url(/noise.png), linear-gradient(to right, #fbe105, #f91fae)
          background-size auto, 100% 100%
          background-blend-mode overlay, normal
          visibility hidden
        .grad-effect-slide
          position absolute
          background-image url(/noise.png), linear-gradient(to right, #fbe105, #f91fae, #f91fae)
          background-size auto, 200% 100%
          background-blend-mode overlay, normal
          top 0
          left -100%
          width 100%
          height 100%
          visibility visible
          user-select none
          pointer-events none
        .grad-effect-over
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background-color red
          mix-blend-mode screen
          user-select none
          pointer-events none
      `}</style>
    </>
  )
}

export const setupImage = (node: HTMLElement, lighten: boolean = false) => {
  node.classList.add('grad-effect-base')
  const img = node.children[0]

  const grad = document.createElement('div')
  grad.classList.add('grad-effect-image')
  if (lighten === true) {
    // @ts-ignore
    grad.style.mixBlendMode = 'lighten'
  }
  const [colorA, colorB] = getColors()
  grad.style.backgroundImage = `url(/noise.png), linear-gradient(to right, ${colorA}, ${colorB})`
  node.appendChild(grad)

  const box = document.createElement('div')
  box.classList.add('grad-effect-slide')
  box.style.backgroundImage = `url(/noise.png), linear-gradient(to right, ${colorA}, ${colorB}, ${colorB})`
  node.appendChild(box)

  const cleanup = () => {
    grad?.parentNode?.removeChild(grad)
    box?.parentNode?.removeChild(box)
    node.classList.remove('grad-effect-base')
  }

  new IntersectionObserver((entries: IntersectionObserverEntry[], object: IntersectionObserver) => {
    const entry = entries[0]
    if (!entry.isIntersecting) { return }
    doAnime(img, grad, box, 200).onfinish = cleanup
    object.unobserve(img)
  }).observe(img)
  return cleanup
}

export const GradImg = ({ children, lighten, mouseEntered }: { children?: ReactNode, lighten?: boolean, mouseEntered?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => setupImage(ref.current!, lighten === true), [])

  const els = useRef<HTMLDivElement[]>([])
  useLayoutEffect(() => {
    if (mouseEntered === undefined) return;
    if (mouseEntered) {
      const el = document.createElement('div')
      el.classList.add('grad-effect-over')
      const [colorA, colorB] = getColors()
      el.style.backgroundImage = `linear-gradient(to right, ${colorA}, ${colorB})`
      ref.current?.appendChild(el)
      els.current?.push(el)
      el.animate(
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
    } else {
      const el = els.current?.shift()
      if (!el) return
      el.animate(
        [
          { left: '100%', easing: 'cubic-bezier(0.80, 0.000, 0.200, 1.0)' },
        ],
        {
          duration: 125,
          iterations: 1,
          fill: "both"
        }
      ).onfinish = () => {
        el.parentNode?.removeChild(el)
      }
    }
  }, [mouseEntered])

  return (
    <>
      <div className="grad-image" ref={ref}>
        {children}
      </div>
      <style jsx>{`
        .grad-image
          font-size 0
          position relative
          overflow hidden
      `}</style>
    </>
  )
}

export const GradLink = ({ children, href, target, rel, inlineBlock = false }: { children?: ReactNode, href?: string, target?: string, rel?: string, inlineBlock?: boolean }) => {
  const ref = useRef<HTMLAnchorElement>(null)
  useLayoutEffect(() => {
    const node = ref.current!
    const [colorA, colorB] = getColors()
    const linearGrad = `linear-gradient(to right, ${colorA}, ${colorB})`
    node.style.borderImage = `${linearGrad} 1`
    const onMouseEnter = () => {
      node.style.backgroundImage = linearGrad
    }
    const onMouseLeave = () => {
      node.style.backgroundImage = ''
    }
    node.addEventListener('mouseenter', onMouseEnter)
    node.addEventListener('mouseleave', onMouseLeave)
    return () => {
      node.removeEventListener('mouseenter', onMouseEnter)
      node.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])
  return (
    <>
      <a ref={ref} className={classnames('grad-link', { 'inline-block': inlineBlock })} href={href} target={target} rel={rel}>{children}</a>
      <style jsx>{`
        .grad-link
          cursor pointer
          &:hover
            padding-bottom 2px
            border-bottom-width 2px
            background-clip text
            -webkit-background-clip text
            -webkit-text-fill-color transparent
        .inline-block
          display inline-block
      `}</style>
    </>
  )
}
