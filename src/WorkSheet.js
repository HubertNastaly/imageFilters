import * as PIXI from "pixi.js"

class WorkSheet {
  constructor() {
    this.pixiApp = new PIXI.Application({ width: 0, height: 0, backgroundColor: 0x000000 })
    this.sprite = null
  }

  loadImage(imageUrl) {

    const pixiApp = this.pixiApp
    pixiApp.loader.reset()
    pixiApp.loader.add("image", imageUrl)

    function handleLoad() {
      this.sprite = PIXI.Sprite.from(this.pixiApp.loader.resources.image.texture)
      this.pixiApp.renderer.resize(this.sprite.width - 1, this.sprite.height)
      this.pixiApp.stage.addChild(this.sprite)
      this.sprite.filters = []
    }

    const handleLoadBound = handleLoad.bind(this)
    pixiApp.loader.onComplete.add(() => handleLoadBound())
    pixiApp.loader.load()
  }
  getView() {
    return this.pixiApp.view
  }
}

export default new WorkSheet()