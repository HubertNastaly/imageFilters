import * as PIXI from "pixi.js"

class WorkSheet {
  constructor() {
    this.pixiApp = new PIXI.Application({ width: 0, height: 0, backgroundColor: 0x000000, preserveDrawingBuffer: true })
    this.sprite = null
    this.downloadButton = this.createDownloadButton()
    this.urlInput = this.createUrlInput()
    this.maxFilters = 30
  }

  loadImage(imageUrl) {
    this.urlInput.value = imageUrl
    this.changeImage(this.getValidUrl(imageUrl))
  }
  changeImage(imageUrl) {
    const pixiApp = this.pixiApp
    pixiApp.loader.reset()
    pixiApp.loader.add("image", this.getValidUrl(imageUrl))

    function handleLoad() {
      this.sprite = PIXI.Sprite.from(this.pixiApp.loader.resources.image.texture)
      this.pixiApp.renderer.resize(this.sprite.width - 1, this.sprite.height)
      this.pixiApp.stage.addChild(this.sprite)
      this.reset()
    }

    const handleLoadBound = handleLoad.bind(this)
    pixiApp.loader.onComplete.add(() => handleLoadBound())
    pixiApp.loader.load()
  }
  getView() {
    return this.pixiApp.view
  }
  getValidUrl(url) {
    return "https://cors-anywhere.herokuapp.com/" + url
  }
  reset() {
    this.sprite.filters = []
    this.pixiApp.render()
    this.updateDownloadLink()
  }
  addFilter(filter) {
    this.sprite.filters.push(filter)
    this.pixiApp.render()
    this.updateDownloadLink()
  }
  canAddFilter() {
    return this.sprite.filters.length < this.maxFilters
  }
  removeFilterAt(idx) {
    console.log("Remove at " + idx)
    this.sprite.filters.splice(idx, 1)
  }
  updateDownloadLink() {
    this.downloadButton.href = this.pixiApp.renderer.view.toDataURL()
  }
  createDownloadButton() {
    const downloadButton = document.createElement("a")
    downloadButton.classList.add("material-icons")
    downloadButton.innerHTML = "get_app"
    downloadButton.download = "gandalf.png"
    return downloadButton
  }
  createUrlInput() {

    const urlInput = document.createElement("input")
    urlInput.type = "text"
    urlInput.id = "sourceInput"
    urlInput.addEventListener("click", (e) => {
      e.target.setSelectionRange(0, e.target.value.length)
    })
    urlInput.addEventListener("change", (e) => {
      this.changeImage(e.target.value)
    })

    return urlInput
  }
}

export default new WorkSheet()