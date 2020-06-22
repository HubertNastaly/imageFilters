import * as PIXI from "pixi.js"
import { invertFragmentShader } from "./shaders/invert"
import { boxBlurFragmentShader } from "./shaders/boxBlur"
import { gaussianBlurFragmentShader } from "./shaders/gaussianBlur"
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
  uniforms.dimensions = new Float32Array([Constants.RENDERER_WIDTH, Constants.RENDERER_HEIGHT])
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    boxBlurFragmentShader,
    uniforms
  );
}

export function gaussianBlurFilter() {
  const uniforms = {}
  uniforms.offset = new Float32Array(
    [-2.0, -2.0, -1.0, -2.0, 0.0, -2.0, 1.0, -2.0, 2.0, -2.0,
    -2.0, -1.0, -1.0, -1.0, 0.0, -1.0, 1.0, -1.0, 2.0, -1.0,
    -2.0, 0.0, -1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.0, 0.0,
    -2.0, 1.0, -1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 2.0, 1.0,
    -2.0, 2.0, -1.0, 2.0, 0.0, 2.0, 1.0, 2.0, 2.0, 2.0]
  )
  uniforms.weights = new Float32Array(
    [1.0, 4.0, 6.0, 4.0, 1.0,
      4.0, 16.0, 24.0, 16.0, 4.0,
      6.0, 24.0, 36.0, 24.0, 6.0,
      4.0, 16.0, 24.0, 16.0, 4.0,
      1.0, 4.0, 6.0, 4.0, 1.0]
  ).map(x => x / 256.0)
  uniforms.dimensions = new Float32Array([Constants.RENDERER_WIDTH, Constants.RENDERER_HEIGHT])
  return new PIXI.Filter(
    PIXI.Filter.defaultVertexSrc,
    gaussianBlurFragmentShader,
    uniforms
  );
}
