export const vignetteFragmentShader = `
#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float radius;
uniform vec2 dimensions;
void main(void) {

  vec2 middle = vec2(0.5,0.5);
  float frac = clamp( distance(middle,vTextureCoord) / radius - 1.0, 0.0, 1.0 );
  gl_FragColor = TEXTURE2D(uSampler,vTextureCoord) * (1.0 - frac);

}
`