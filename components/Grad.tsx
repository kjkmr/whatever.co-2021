import { useCallback } from 'react'

const COLORS = ["#ff2300", "#ff9201", "#ffeb00", "#89e82b", "#00c745", "#29ebfe", "#0d44fb", "#a725fc", "#fd1eba"];
const getColors = (): [String, String] => {
  const i = Math.floor(Math.random() * COLORS.length)
  let j
  do {
    j = Math.floor(Math.random() * COLORS.length)
  } while (i == j)
  return [COLORS[i], COLORS[j]]
}

const setup = (base: Element): [Element, Element] => {
  const grad = document.createElement('div')
  base.childNodes.forEach((e: Node) => {
    grad.appendChild(e.cloneNode(true))
  })
  base.classList.add('grad-effect-base')
  grad.classList.add('grad-effect-text')
  const [colorA, colorB] = getColors()
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
        backgroundPosition: "0% 0%",
        left: 0
      },
      {
        backgroundPosition: "100% 0%",
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

export const Grad = ({ children }: any) => {
  const ref = useCallback(node => {
    if (!node) return
    const base = node.children[0]
    const [grad, box] = setup(base)
    new IntersectionObserver((entries: IntersectionObserverEntry[], object: IntersectionObserver) => {
      const entry = entries[0]
      if (!entry.isIntersecting) { return }
      doAnime(base, grad, box).onfinish = () => {
        base.removeChild(grad)
        base.removeChild(box)
      }
      object.unobserve(base)
    }).observe(base)
  }, [])
  return (
    <div ref={ref}>
      {children}

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
        .grad-effect-img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background-color white
          background-image url(/noise.png), linear-gradient(to right, #fbe105, #f91fae)
          background-size auto, 200% 100%
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
      `}</style>
    </div>
  )
}

export const GradImg = ({ children }: any) => {
  const ref = useCallback(node => {
    if (!node) return

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
      }
      object.unobserve(img)
    }).observe(img)
  }, [])
  return (
    <div className="container" ref={ref}>
      {children}
      <style jsx>{`
        .container
          font-size 0
      `}</style>
    </div>
  )
}
