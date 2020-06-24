import * as PIXI from "pixi.js"
import { invertFragmentShader } from "./shaders/invert"
import { boxBlurFragmentShader } from "./shaders/boxBlur"
import { gaussianBlurFragmentShader } from "./shaders/gaussianBlur"
import { pixelateFragmentShader } from "./shaders/pixelate"
import { edgeDetectionFragmentShader } from "./shaders/edgeDetection"
import { posterizeFragmentShader } from "./shaders/posterize"
import { gradientMapFragmentShader } from "./shaders/gradientMap"
import * as Constants from "./constants"
import WorkSheet from "./WorkSheet"

export const filterCollection = {
  "Invert": invertFilter,
  "Box blur": boxBlurFilter,
  "Gaussian blur": gaussianBlurFilter,
  "Pixelate": pixelateFilter,
  "Edge detection": edgeDetectionFilter,
  "Posterize": posterizeFilter,
  "Gradient map": gradientMapFilter
}

function invertFilter() {
  const uniforms = {}
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    invertFragmentShader,
    uniforms
  );
}

function boxBlurFilter() {
  const uniforms = {}
  uniforms.offset = new Float32Array(
    [-1.0, -1.0, 0.0, -1.0, 1.0, -1.0,
    -1.0, 0.0, 0.0, 0.0, 1.0, 0.0,
    -1.0, 1.0, 0.0, 1.0, 1.0, 1.0]
  )
  uniforms.dimensions = new Float32Array([WorkSheet.pixiApp.renderer.width, WorkSheet.pixiApp.renderer.height])
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    boxBlurFragmentShader,
    uniforms
  );
}

function gaussianBlurFilter() {
  const uniforms = {}
  uniforms.offset = new Float32Array(
    [-2.0, -2.0, -1.0, -2.0, 0.0, -2.0, 1.0, -2.0, 2.0, -2.0,
    -2.0, -1.0, -1.0, -1.0, 0.0, -1.0, 1.0, -1.0, 2.0, -1.0,
    -2.0, 0.0, -1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 0.0,
    -2.0, 1.0, -1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 2.0, 1.0,
    -2.0, 2.0, -1.0, 2.0, 0.0, 2.0, 1.0, 2.0, 2.0, 2.0]
  )
  uniforms.weights = new Float32Array(
    [2.0, 4.0, 5.0, 4.0, 2.0,
      4.0, 9.0, 12.0, 9.0, 4.0,
      5.0, 12.0, 15.0, 12.0, 5.0,
      4.0, 9.0, 12.0, 9.0, 4.0,
      2.0, 4.0, 5.0, 4.0, 2.0]
  ).map(x => x / 159.0)
  uniforms.dimensions = new Float32Array([WorkSheet.pixiApp.renderer.width, WorkSheet.pixiApp.renderer.height])
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    gaussianBlurFragmentShader,
    uniforms
  );
}

function pixelateFilter() {
  const uniforms = {
    pixelDimensions: new Float32Array([10.0, 10.0]),
    dimensions: new Float32Array([WorkSheet.pixiApp.renderer.width, WorkSheet.pixiApp.renderer.height])
  }
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    pixelateFragmentShader,
    uniforms
  );
}

function edgeDetectionFilter() {
  const uniforms = {}
  uniforms.offset = new Float32Array(
    [-1.0, -1.0, 0.0, -1.0, 1.0, -1.0,
    -1.0, 0.0, 0.0, 0.0, 1.0, 0.0,
    -1.0, 1.0, 0.0, 1.0, 1.0, 1.0]
  )
  uniforms.dimensions = new Float32Array([WorkSheet.pixiApp.renderer.width, WorkSheet.pixiApp.renderer.height])
  uniforms.xSobelOperator = new Float32Array([1.0, 0.0, -1.0, 2.0, 0.0, -2.0, 1.0, 0.0, -1.0])
  uniforms.ySobelOperator = new Float32Array([1.0, 2.0, 1.0, 0.0, 0.0, 0.0, -1.0, -2.0, -1.0])
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    edgeDetectionFragmentShader,
    uniforms
  );
}

function posterizeFilter() {
  const uniforms = {
    colorA: new Float32Array([0.0, 153.0, 247.0]).map(x => x / 255.0),//#0099F7
    colorB: new Float32Array([241.0, 23.0, 18.0]).map(x => x / 255.0),//#F11712
    luminanceMatrix: new Float32Array([
      0.2053, 0.7125, 0.4670,
      1.8537, -1.2797, -0.4429,
      -0.3655, 1.0120, -0.6104
    ])
  }
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    posterizeFragmentShader,
    uniforms
  );
}

function gradientMapFilter() {
  const uniforms = {
    colorA: new Float32Array([204.0, 83.0, 51.0]).map(x => x / 255.0),//#cc5333
    colorB: new Float32Array([35.0, 7.0, 77.0]).map(x => x / 255.0),//#23074d
    luminanceMatrix: new Float32Array([
      0.2053, 0.7125, 0.4670,
      1.8537, -1.2797, -0.4429,
      -0.3655, 1.0120, -0.6104
    ])
  }
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    gradientMapFragmentShader,
    uniforms
  );
}
