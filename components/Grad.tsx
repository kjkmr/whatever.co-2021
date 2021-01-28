import { ReactNode, CSSProperties, useRef } from 'react'
import classnames from 'classnames'
import { useLayoutEffect } from 'lib/useLayoutEffect'

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

const doAnime = (base: Element, fade: Element, slide: Element, duration: number = 250, startImmediately: boolean = false) => {
  const delay = startImmediately ? 0 : Math.random() * 500
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

export const setup = (base: HTMLElement, whiteText: boolean = false, inline: boolean = true, startImmediately: boolean = false): () => void => {
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
    doAnime(base, fade, slide, 250, startImmediately).onfinish = cleanup
    object.unobserve(base)
  }).observe(base)
  return cleanup
}

export type GradProps = {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  whiteText?: boolean
  inline?: boolean
  startImmediately?: boolean
}

export const Grad = ({ children, className, style, whiteText = false, inline = false, startImmediately = false }: GradProps) => {

  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => setup(ref.current!, whiteText, inline, startImmediately), [])
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

const doAnimeImage = (base: Element, fade: Element, slide: Element, duration: number = 250, startImmediately: boolean = false) => {
  const delay = startImmediately ? 0 : Math.random() * 500
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
        left: "-100%",
        visibility: "visible",
      },
      {
        backgroundPosition: "0 0, 0 0",
        left: 0,
        visibility: "hidden",
      },
      {
        visibility: "hidden",
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
        offset: 0.0001,
        visibility: "visible",
        opacity: 1
      },
      {
        opacity: 0
      }
    ],
    {
      duration: duration * 4,
      delay: duration / 2 + delay,
      iterations: 1,
      fill: "both"
    }
  )
}

export const setupImage = (node: HTMLElement, lighten: boolean = false) => {
  const fade = document.createElement('div')
  fade.classList.add('grad-effect-image')
  if (lighten === true) {
    // @ts-ignore
    fade.style.mixBlendMode = 'lighten'
  }
  const [colorA, colorB] = getColors()
  fade.style.backgroundImage = `url(/noise.png), linear-gradient(to right, ${colorA}, ${colorB})`
  node.appendChild(fade)

  const slide = document.createElement('div')
  slide.classList.add('grad-effect-slide')
  slide.style.backgroundImage = `url(/noise.png), linear-gradient(to right, ${colorA}, ${colorB}, ${colorB})`
  node.appendChild(slide)

  const cleanup = () => {
    fade?.parentNode?.removeChild(fade)
    slide?.parentNode?.removeChild(slide)
    node.classList.remove('grad-effect-base')
  }

  new IntersectionObserver((entries: IntersectionObserverEntry[], object: IntersectionObserver) => {
    const entry = entries[0]
    if (!entry.isIntersecting) { return }
    doAnimeImage(node, fade, slide).onfinish = cleanup
    object.unobserve(node)
  }).observe(node)
  return cleanup
}

export type GradImgProps = {
  children?: ReactNode
  className?: string
  lighten?: boolean
  mouseEntered?: boolean
}

export const GradImg = ({ children, className, lighten, mouseEntered }: GradImgProps) => {
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
      <div className={classnames('grad-image', className)} ref={ref}>
        {children}
      </div>
      <style jsx>{`
        .grad-image
          font-size 0
          position relative
          overflow hidden
          visibility hidden
      `}</style>
    </>
  )
}

export const setupLink = (node: HTMLElement) => {
  const [colorA, colorB] = getColors()
  const linearGrad = `linear-gradient(to right, ${colorA}, ${colorB})`
  node.style.borderImage = `${linearGrad} 1`
  const onMouseEnter = () => {
    node.style.backgroundImage = linearGrad
    node.classList.add('grad-link-hover')
  }
  const onMouseLeave = () => {
    node.style.backgroundImage = ''
    node.classList.remove('grad-link-hover')
  }
  node.addEventListener('mouseenter', onMouseEnter)
  node.addEventListener('mouseleave', onMouseLeave)
  return () => {
    node.removeEventListener('mouseenter', onMouseEnter)
    node.removeEventListener('mouseleave', onMouseLeave)
  }
}

export type GradLinkProps = {
  children?: ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
  inlineBlock?: boolean
  onClick?: any
}

export const GradLink = ({ children, className, href, target, rel, inlineBlock = false, onClick }: GradLinkProps) => {
  const ref = useRef<HTMLAnchorElement>(null)
  useLayoutEffect(() => setupLink(ref.current!), [])
  return (
    <>
      <a ref={ref} className={classnames('grad-link', className, { 'inline-block': inlineBlock })} href={href} target={target} rel={rel} onClick={onClick}>{children}</a>
      <style jsx>{`
        .grad-link
          cursor pointer
        .inline-block
          display inline-block
      `}</style>
    </>
  )
}
