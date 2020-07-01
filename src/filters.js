import * as PIXI from "pixi.js"
import { invertFragmentShader } from "./shaders/invert"
import { blurFragmentShader } from "./shaders/blur"
import { pixelateFragmentShader } from "./shaders/pixelate"
import { edgeDetectionFragmentShader } from "./shaders/edgeDetection"
import { posterizeFragmentShader } from "./shaders/posterize"
import { gradientMapFragmentShader } from "./shaders/gradientMap"
import { anaglyphFragmentShader } from "./shaders/anaglyph"
import { vignetteFragmentShader } from "./shaders/vignette"
import { displaceFragmentShader } from "./shaders/displace"
import { fogFragmentShader } from "./shaders/fog"
import WorkSheet from "./WorkSheet"

const palette = {
  red: "#ff1744",
  pink: "#f50057",
  purple: "#d500f9",
  deepPurple: "#651fff",
  indigo: "#3d5afe",
  blue: "#2979ff",
  lightBlue: "#00b0ff",
  cyan: "#00e5ff",
  teal: "#1de9b6",
  green: "#00e676",
  lightGreen: "#76ff03",
  lime: "#c6ff00",
  yellow: "#ffea00",
  amber: "#ffc400",
  orange: "#ff9100",
  deepOrange: "#ff3d00"
}

export const filterCollection = {
  "Invert": {
    filter: invertFilter,
    color: palette.red
  },
  "Blur": {
    filter: blurFilter,
    color: palette.pink
  },
  "Pixelate": {
    filter: pixelateFilter,
    color: palette.deepPurple
  },
  "Edge detection": {
    filter: edgeDetectionFilter,
    color: palette.indigo
  },
  "Posterize": {
    filter: posterizeFilter,
    color: palette.lightBlue
  },
  "Gradient map": {
    filter: gradientMapFilter,
    color: palette.teal
  },
  "Anaglyph": {
    filter: anaglyphFilter,
    color: palette.green
  },
  "Vignette": {
    filter: vignetteFilter,
    color: palette.lightGreen
  },
  "Displace": {
    filter: displaceFilter,
    color: palette.yellow
  },
  "Fog": {
    filter: fogFilter,
    color: palette.amber
  }
}

function invertFilter() {
  const uniforms = {}
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    invertFragmentShader,
    uniforms
  );
}

function blurFilter() {
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
    blurFragmentShader,
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

function anaglyphFilter() {
  const uniforms = {}
  uniforms.offset = new Float32Array([5.0, 0.0])
  uniforms.dimensions = new Float32Array([WorkSheet.pixiApp.renderer.width, WorkSheet.pixiApp.renderer.height])
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    anaglyphFragmentShader,
    uniforms
  );
}

function vignetteFilter() {
  const uniforms = {}
  uniforms.radius = 0.4
  uniforms.dimensions = new Float32Array([WorkSheet.pixiApp.renderer.width, WorkSheet.pixiApp.renderer.height])
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    vignetteFragmentShader,
    uniforms
  );
}

function displaceFilter() {
  const uniforms = {}
  uniforms.dimensions = new Float32Array([WorkSheet.pixiApp.renderer.width, WorkSheet.pixiApp.renderer.height])
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    displaceFragmentShader,
    uniforms
  );
}

function fogFilter() {
  const uniforms = {}
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    fogFragmentShader,
    uniforms
  );
}