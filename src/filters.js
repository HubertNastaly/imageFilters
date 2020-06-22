import * as PIXI from "pixi.js"
import { invertFragmentShader } from "./shaders/invert"
import { boxBlurFragmentShader } from "./shaders/boxBlur"
import * as Constants from "./constants"

export function invertFilter() {
  const uniforms = {}
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    invertFragmentShader,
    uniforms
  );
}

export function boxBlurFilter() {
  const uniforms = {}
  uniforms.offset = new Float32Array(
    [-1.0, -1.0, 0.0, -1.0, 1.0, -1.0,
    -1.0, 0.0, 0.0, 0.0, 1.0, 0.0,
    -1.0, 1.0, 0.0, 1.0, 1.0, 1.0]
  )
  uniforms.dimensions = new Float32Array([800.0, 600.0])
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    boxBlurFragmentShader,
    uniforms
  );
}
