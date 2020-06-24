import "./style.css"
import * as PIXI from "pixi.js"
import { filterCollection as Filters } from "./filters.js"
//import * as Constants from "./constants.js"
import WorkSheet from "./WorkSheet"

// function renderer(imageUrl) {

//   const pixiApp = new PIXI.Application({ backgroundColor: 0x000000 })
//   pixiApp.loader.add("image", imageUrl)
//   pixiApp.loader.onComplete.add(() => {
//     renderer.sprite = PIXI.Sprite.from(pixiApp.loader.resources.image.texture)
//     pixiApp.renderer.resize(renderer.sprite.width - 1, renderer.sprite.height)
//     pixiApp.stage.addChild(renderer.sprite)
//     renderer.sprite.filters = []
//   })
//   pixiApp.loader.load()

//   return pixiApp.view
// }

function fileMenu() {
  const menu = document.createElement("div")
  menu.classList.add("fileMenu")

  return menu
}

function filterList() {
  const filterList = document.createElement("div")
  filterList.classList.add("filterList")

  const title = document.createElement("h4")
  title.textContent = "Reset"
  const button = document.createElement("button")
  button.classList.add("filterButton", "resetFiltersButton")
  button.appendChild(title)
  button.addEventListener("click", () => {
    WorkSheet.sprite.filters = []
  })
  filterList.appendChild(button)

  Object.keys(Filters).forEach(filterName => {
    const title = document.createElement("h4")
    title.textContent = filterName

    const button = document.createElement("button")
    button.classList.add("filterButton")
    button.appendChild(title)
    button.addEventListener("click", () => {
      WorkSheet.sprite.filters.push(Filters[filterName]())
    })

    filterList.appendChild(button)
  })
  return filterList
}

function leftSidebar() {
  const sidebar = document.createElement("div")
  sidebar.classList.add("leftSidebar")
  sidebar.appendChild(filterList())
  sidebar.appendChild(fileMenu())
  return sidebar
}

function rightSidebar() {
  const sidebar = document.createElement("div")
  sidebar.classList.add("rightSidebar")
  return sidebar
}

function workspaceElement() {
  const workspace = document.createElement("div")
  workspace.classList.add("workspace")
  workspace.appendChild(WorkSheet.getView())
  return workspace
}

function splitSidebarAndWorkspace() {
  //const imageUrl = "https://cors-anywhere.herokuapp.com/https://www.arimr.gov.pl/typo3temp/_processed_/csm_mlody_las_Fotolia_437093127c.jpg"
  const imageUrl = "https://cors-anywhere.herokuapp.com/https://www.syfy.com/sites/syfy/files/styles/1200x680_hero/public/2020/01/gandalf.jpg"

  WorkSheet.loadImage(imageUrl)

  const mainContainer = document.createElement("div")
  mainContainer.classList.add("mainContainer")

  const leftSide = leftSidebar()
  const rightSide = rightSidebar()
  const workspace = workspaceElement()

  mainContainer.appendChild(leftSide)
  mainContainer.appendChild(workspace)
  mainContainer.appendChild(rightSide)

  return mainContainer;
}

function init() {
  document.body.appendChild(splitSidebarAndWorkspace())
}

init()
