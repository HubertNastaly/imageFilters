export const pixelateFragmentShader = `
#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 pixelDimensions;
uniform vec2 dimensions;
void main(void) {

  vec2 step = pixelDimensions / dimensions;
  vec2 newCoord = clamp(floor(vTextureCoord / step) * step + step / 2.0, 0.0, 1.0); 

  gl_FragColor = TEXTURE2D(uSampler,newCoord);
}
`