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

  //reset button
  const title = document.createElement("h4")
  title.textContent = "Reset"

  const button = document.createElement("button")
  button.appendChild(title)
  button.addEventListener("click", () => {
    WorkSheet.reset()
    document.getElementsByClassName("rightSidebar")[0].innerHTML = ""
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

      const layer = document.createElement("div")
      layer.style.backgroundColor = Filters[filterName].color
      layer.appendChild(deleteButton)
      layer.addEventListener("click", (e) => {
        let idx = 0;
        let node = e.currentTarget
        console.log(["Current target:", e.currentTarget])
        console.log(["Node: ", node])
        console.log(["Next sibling: ", node.nextSibling])
        while ((node = node.nextSibling) != null)
          idx++
        WorkSheet.removeFilterAt(idx)
        e.currentTarget.parentNode.removeChild(e.currentTarget)
      }, false)

      const stack = document.getElementsByClassName("rightSidebar")[0]
      stack.insertBefore(layer, stack.firstChild)

      if (WorkSheet.canAddFilter()) {
        WorkSheet.addFilter(Filters[filterName].filter())
      }
      else {
        // message box: cannot add filter
      }
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
  //add scrolling behaviour on mouse approaching top/bottom of stack
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
