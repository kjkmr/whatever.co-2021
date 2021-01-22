import { ReactNode, SyntheticEvent, useCallback, useEffect, useRef } from 'react'

const COLORS = ["#ff2300", "#ff9201", "#ffeb00", "#89e82b", "#00c745", "#29ebfe", "#0d44fb", "#a725fc", "#fd1eba"];
export const getColors = (): [string, string] => {
  const i = Math.floor(Math.random() * COLORS.length)
  let j
  do {
    j = Math.floor(Math.random() * COLORS.length)
  } while (i == j)
  return [COLORS[i], COLORS[j]]
}

const setup = (base: Element, colorA: string, colorB: string): [Element, Element] => {
  const grad = document.createElement('div')
  base.childNodes.forEach((e: Node) => {
    grad.appendChild(e.cloneNode(true))
  })
  base.classList.add('grad-effect-base')
  grad.classList.add('grad-effect-text')
  grad.style.backgroundImage = `url(/noise.png), linear-gradient(to right, ${colorA}, ${colorB})`
  base.appendChild(grad)
  const box = document.createElement('div')
  box.classList.add('grad-effect-box')
  box.style.backgroundImage = `url(/noise.png), linear-gradient(to right, ${colorA}, ${colorB}, ${colorB})`
  base.appendChild(box)
  return [grad, box]
}

const doAnime = (base: Element, grad: Element, box: Element, duration: number = 250) => {
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
  box.animate(
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
  return grad.animate(
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

export const Grad = ({ children }: { children?: ReactNode }) => {
  const ref = useCallback(node => {
    if (!node) return
    const base = node.children[0]
    const [colorA, colorB] = getColors()
    const [grad, box] = setup(base, colorA, colorB)
    new IntersectionObserver((entries: IntersectionObserverEntry[], object: IntersectionObserver) => {
      const entry = entries[0]
      if (!entry.isIntersecting) { return }
      doAnime(base, grad, box).onfinish = () => {
        if (grad.parentNode == base) {
          base.removeChild(grad)
          base.removeChild(box)
        }
        base.classList.remove('grad-effect-base')
      }
      object.unobserve(base)
    }).observe(base)
  }, [])
  return (
    <>
      <div ref={ref}>
        {children}
      </div>
      <style jsx global>{`
        .grad-effect-base
          position relative
          overflow hidden
          visibility hidden
        .grad-effect-text
          position absolute
          top 0
          left 0
          color transparent
          background-image url(/noise.png), linear-gradient(to right, #fbe105, #f91fae)
          background-blend-mode overlay, normal
          background-clip text
          -webkit-background-clip text
          -webkit-text-fill-color transparent
          visibility hidden
          > *
            background-color: transparent !important
        .grad-effect-img
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
        .grad-effect-box
          position absolute
          background-color white
          background-image url(/noise.png), linear-gradient(to right, #fbe105, #f91fae, #f91fae)
          background-size auto, 200% 100%
          background-blend-mode overlay, normal
          top 0
          left -100%
          width 100%
          height 100%
          visibility visible
        .grad-effect-over
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background-color red
          mix-blend-mode screen
      `}</style>
    </>
  )
}

export const GradImg = ({ children, mouseEntered }: { children?: ReactNode, mouseEntered?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current!
    node.classList.add('grad-effect-base')
    const img = node.children[0]

    const grad = document.createElement('div')
    grad.classList.add('grad-effect-img')
    const [colorA, colorB] = getColors()
    grad.style.backgroundImage = `url(/noise.png), linear-gradient(to right, ${colorA}, ${colorB})`
    node.appendChild(grad)

    const box = document.createElement('div')
    box.classList.add('grad-effect-box')
    box.style.backgroundImage = `url(/noise.png), linear-gradient(to right, ${colorA}, ${colorB}, ${colorB})`
    node.appendChild(box)

    new IntersectionObserver((entries: IntersectionObserverEntry[], object: IntersectionObserver) => {
      const entry = entries[0]
      if (!entry.isIntersecting) { return }
      doAnime(img, grad, box, 200).onfinish = () => {
        node.removeChild(grad)
        node.removeChild(box)
        node.classList.remove('grad-effect-base')
      }
      object.unobserve(img)
    }).observe(img)
  }, [])

  const els = useRef<HTMLDivElement[]>([])
  useEffect(() => {
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

export const GradLink = ({ children, href, target, rel }: any) => {
  const ref = useCallback(node => {
    if (!node) return
    const base = node.children[0]
    const [colorA, colorB] = getColors()
    const linearGrad = `linear-gradient(to right, ${colorA}, ${colorB})`
    base.style.borderImage = `${linearGrad} 1`
    base.onmouseenter = ({ target }: SyntheticEvent) => {
      if (target instanceof HTMLAnchorElement) {
        target.style.backgroundImage = linearGrad
      }
    }
    base.onmouseleave = ({ target }: SyntheticEvent) => {
      if (target instanceof HTMLAnchorElement) {
        target.style.backgroundImage = 'none'
      }
    }
    const [grad, box] = setup(base, colorA, colorB)
    new IntersectionObserver((entries: IntersectionObserverEntry[], object: IntersectionObserver) => {
      const entry = entries[0]
      if (!entry.isIntersecting) { return }
      doAnime(base, grad, box).onfinish = () => {
        base.removeChild(grad)
        base.removeChild(box)
        base.classList.remove('grad-effect-base')
      }
      object.unobserve(base)
    }).observe(base)
  }, [])
  return (
    <div ref={ref} className="container">
      <a className="link" href={href} target={target} rel={rel}>{children}</a>

      <style jsx>{`
        .container
          overflow hidden
        .link
          display inline-block
          padding-bottom 6px
          border-bottom 1px solid green
          overflow hidden
          &:hover
            padding-bottom 5px
            border-bottom 2px solid green
            background-clip text
            -webkit-background-clip text
            -webkit-text-fill-color transparent
      `}</style>
    </div>
  )
}
