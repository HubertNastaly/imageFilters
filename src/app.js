import "./style.css"
import * as PIXI from "pixi.js"
import * as Filters from "./filters.js"
import * as Constants from "./constants.js"
function createRenderer() {
  const pixiApp = new PIXI.Application({ width: Constants.RENDERER_WIDTH, height: Constants.RENDERER_HEIGHT, backgroundColor: 0x000000 })
  document.body.appendChild(pixiApp.view)
  const imageUrl = "https://www.syfy.com/sites/syfy/files/styles/1200x680_hero/public/2020/01/gandalf.jpg";
  //const imageUrl = "https://lh3.googleusercontent.com/proxy/t_Spyu5VdbCJ7SpstUNJdh-Ul2_e2csIkZ4fdRho8aSoV_uAKmPuxXEw_s1_Ct9b1Z1jbnMT645JaxElee91BhBeTMyluvEPoBsKZBczKaRvTisLqiGog5M9eJOrf2OIMIeMe8AK"
  const sprite = PIXI.Sprite.from(imageUrl)
  pixiApp.stage.addChild(sprite);
  sprite.filters = [Filters.boxBlurFilter()]
}

createRenderer()
