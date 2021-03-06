import "./style.css"
import { filterCollection as Filters } from "./filters.js"
import WorkSheet from "./WorkSheet"

function logoSection() {

  const title = document.createElement("h1")
  title.textContent = "Stack Up"
  const tagline = document.createElement("span")
  tagline.textContent = "Simple photo editor"

  const wrapper = document.createElement("div")
  wrapper.appendChild(title)
  wrapper.appendChild(tagline)

  return wrapper
}

function fileMenu() {

  const label = document.createElement("span")
  label.textContent = "Source image"

  const menu = document.createElement("div")
  menu.classList.add("fileMenu")
  menu.appendChild(label)
  menu.appendChild(WorkSheet.urlInput)
  menu.appendChild(WorkSheet.downloadButton)

  return menu
}

function filterList() {
  const filterList = document.createElement("div")
  filterList.classList.add("filterList")

  //reset button
  const title = document.createElement("h4")
  title.textContent = "Reset"

  const button = document.createElement("button")
  button.appendChild(title)
  button.addEventListener("click", () => {
    WorkSheet.reset()
    document.querySelector(".layersPanelWrapper > div").innerHTML = ""
  })
  filterList.appendChild(button)

  //filter buttons
  Object.keys(Filters).forEach(filterName => {

    const title = document.createElement("h4")
    title.textContent = filterName

    const button = document.createElement("button")
    button.style.backgroundColor = Filters[filterName].color
    button.appendChild(title)

    button.addEventListener("click", () => {

      const deleteButton = document.createElement("a")
      deleteButton.classList.add("material-icons")
      deleteButton.innerHTML = "clear"

      //layer button on right side
      const layer = document.createElement("div")
      layer.title = filterName
      layer.style.backgroundColor = Filters[filterName].color
      layer.appendChild(deleteButton)
      layer.addEventListener("click", (e) => {
        let idx = 0;
        let node = e.currentTarget
        while ((node = node.previousSibling) != null)
          idx++
        WorkSheet.removeFilterAt(idx)
        e.currentTarget.parentNode.removeChild(e.currentTarget)
      }, false)

      if (WorkSheet.canAddFilter()) {
        const stack = document.querySelector(".layersPanelWrapper > div")
        stack.appendChild(layer)
        WorkSheet.addFilter(Filters[filterName].filter())
      }
      else {
        showModal()
      }
    })

    filterList.appendChild(button)
  })
  return filterList
}

function showModal() {
  const modal = document.getElementsByClassName("info")[0]
  modal.classList.remove("invisible")
  window.setTimeout(() => {
    modal.classList.add("invisible")
  }, 3000)
}

function leftSidebar() {
  const sidebar = document.createElement("div")
  sidebar.classList.add("leftSidebar")
  sidebar.appendChild(logoSection())
  sidebar.appendChild(filterList())
  sidebar.appendChild(fileMenu())
  return sidebar
}

function layersPanel() {
  const sidebar = document.createElement("div")
  const scrollWrapper = document.createElement("div")
  scrollWrapper.appendChild(sidebar)
  scrollWrapper.classList.add("layersPanelWrapper")
  return scrollWrapper
}

function workspaceElement() {
  const workspace = document.createElement("div")
  workspace.classList.add("workspace")
  workspace.appendChild(WorkSheet.getView())
  workspace.appendChild(warningModal())
  workspace.appendChild(layersPanel())
  return workspace
}

function warningModal() {
  const modal = document.createElement("div")
  modal.classList.add("info", "invisible")
  const info = document.createElement("span")
  info.textContent = "Image can only have up to " + WorkSheet.maxFilters + " layers"
  modal.appendChild(info)
  return modal
}

function splitSidebarAndWorkspace() {
  const imageUrl = "https://www.syfy.com/sites/syfy/files/styles/1200x680_hero/public/2020/01/gandalf.jpg"

  WorkSheet.loadImage(imageUrl)

  const mainContainer = document.createElement("div")
  mainContainer.classList.add("mainContainer")

  const workspace = workspaceElement()
  const leftSide = leftSidebar()

  mainContainer.appendChild(leftSide)
  mainContainer.appendChild(workspace)

  return mainContainer;
}

function init() {
  document.head.innerHTML += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'
  document.body.appendChild(splitSidebarAndWorkspace())
}

init()
