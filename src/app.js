import "./style.css"
import { filterCollection as Filters } from "./filters.js"
import WorkSheet from "./WorkSheet"

function fileMenu() {

  // const urlInput = document.createElement("input")
  // urlInput.type = "text"

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

  const title = document.createElement("h4")
  title.textContent = "Reset"
  const button = document.createElement("button")
  button.appendChild(title)
  button.addEventListener("click", () => {
    WorkSheet.reset()
  })
  filterList.appendChild(button)

  Object.keys(Filters).forEach(filterName => {
    const title = document.createElement("h4")
    title.textContent = filterName

    const button = document.createElement("button")
    button.appendChild(title)
    button.addEventListener("click", () => {
      WorkSheet.addFilter(Filters[filterName]())
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
  const imageUrl = WorkSheet.getValidUrl("https://www.syfy.com/sites/syfy/files/styles/1200x680_hero/public/2020/01/gandalf.jpg")

  WorkSheet.loadImage(imageUrl)

  const mainContainer = document.createElement("div")
  mainContainer.classList.add("mainContainer")

  const workspace = workspaceElement()
  const leftSide = leftSidebar()
  const rightSide = rightSidebar()

  mainContainer.appendChild(leftSide)
  mainContainer.appendChild(workspace)
  mainContainer.appendChild(rightSide)

  return mainContainer;
}

function init() {
  document.head.innerHTML += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'
  document.body.appendChild(splitSidebarAndWorkspace())
}

init()
