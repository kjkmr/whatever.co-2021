export class FaviconAnimator {

  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  index: number
  sprite: HTMLImageElement
  timeout: NodeJS.Timeout | null

  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = 32
    this.canvas.height = 32
    this.context = this.canvas.getContext('2d')!
    this.index = 0
    this.sprite = new Image()
    this.sprite.onload = () => this._update()
    this.sprite.src = "/favicons.png"
    this.timeout = null
  }

  _update() {
    const link = document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement
    if (link) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      var size = 32
      var x = this.index % 7
      var y = Math.floor(this.index / 7)
      this.context.drawImage(this.sprite, x * size, y * size, size, size, 0, 0, this.canvas.width, this.canvas.height)
      link.href = this.canvas.toDataURL()
      if (++this.index == 21) {
        this.index = 0
      }
    }
    this.timeout = setTimeout(this._update.bind(this), this.index == 1 ? 2000 : 200)
  }

  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }

}
