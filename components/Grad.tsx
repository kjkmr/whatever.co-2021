import { useCallback } from 'react'

const setup = (base: Element): [Element, Element] => {
  const grad = document.createElement('div')
  base.childNodes.forEach((e: Node) => {
    grad.appendChild(e.cloneNode(true))
  })
  base.classList.add('grad-effect-base')
  grad.classList.add('grad-effect-text')
  base.appendChild(grad)
  const box = document.createElement('div')
  box.classList.add('grad-effect-box')
  base.appendChild(box)
  return [grad, box]
}

const doAnime = (base: Element, grad: Element, box: Element, duration: number = 200) => {
  const delay = Math.random() * 300
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
  );
  grad.animate(
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
        opacity: 0
      }
    ],
    {
      duration: duration * 5,
      delay: duration / 2 + delay,
      iterations: 1,
      fill: "both"
    }
  );
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
  );
  setTimeout(() => {
    base.removeChild(grad)
    base.removeChild(box)
    base.classList.remove('grad-effect-base')
  }, delay + duration)
}

const Grad = ({ children }: any) => {
  const ref = useCallback(node => {
    if (!node) return
    const base = node.children[0]
    const [grad, box] = setup(base)
    doAnime(base, grad, box)
  }, [])
  return (
    <div ref={ref}>
      {children}

      <style jsx global>{`
        .grad-effect-base
          position relative
          overflow hidden
        .grad-effect-text
          position absolute
          top 0
          left 0
          color transparent
          background-image linear-gradient(to right, #fbe105, #f91fae)
          -webkit-background-clip text
          -webkit-text-fill-color transparent
        .grad-effect-box
          position absolute
          background-image linear-gradient(to right, #fbe105, #f91fae, #f91fae)
          background-size 200% 100%
          top 0
          left -100%
          width 100%
          height 100%
          visibility visible
      `}</style>
    </div>
  )
}

export default Grad
