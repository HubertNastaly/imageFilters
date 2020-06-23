import "./style.css"
import * as PIXI from "pixi.js"
import { filterCollection as Filters } from "./filters.js"
import * as Constants from "./constants.js"

function renderer(imageUrl) {
  const pixiApp = new PIXI.Application({ width: Constants.RENDERER_WIDTH, height: Constants.RENDERER_HEIGHT, backgroundColor: 0x000000 })

  //const imageUrl = "https://lh3.googleusercontent.com/proxy/t_Spyu5VdbCJ7SpstUNJdh-Ul2_e2csIkZ4fdRho8aSoV_uAKmPuxXEw_s1_Ct9b1Z1jbnMT645JaxElee91BhBeTMyluvEPoBsKZBczKaRvTisLqiGog5M9eJOrf2OIMIeMe8AK"
  renderer.sprite = PIXI.Sprite.from(imageUrl)
  pixiApp.stage.addChild(renderer.sprite)
  renderer.sprite.filters = []
  return pixiApp.view
}

function splitSidebarAndWorkspace() {
  const imageUrl = "https://www.syfy.com/sites/syfy/files/styles/1200x680_hero/public/2020/01/gandalf.jpg";

  const mainContainer = document.createElement("div")
  mainContainer.classList.add("mainContainer")
  const sidebar = document.createElement("div")
  sidebar.classList.add("sidebar")
  const workspace = document.createElement("div")
  workspace.classList.add("workspace")

  workspace.appendChild(renderer(imageUrl))

  mainContainer.appendChild(sidebar)
  mainContainer.appendChild(workspace)

  const title = document.createElement("h4")
  title.textContent = "Reset"
  const button = document.createElement("button")
  button.classList.add("filterButton", "resetFiltersButton")
  button.appendChild(title)
  button.addEventListener("click", () => {
    renderer.sprite.filters = []
  })
  sidebar.appendChild(button)

  Object.keys(Filters).forEach(filterName => {
    const title = document.createElement("h4")
    title.textContent = filterName

    const button = document.createElement("button")
    button.classList.add("filterButton")
    button.appendChild(title)
    button.addEventListener("click", () => {
      renderer.sprite.filters.push(Filters[filterName]())
    })

    sidebar.appendChild(button)
  })
  return mainContainer;
}

function init() {
  document.body.appendChild(splitSidebarAndWorkspace())
}

init()
