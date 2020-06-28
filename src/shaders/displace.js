export const displaceFragmentShader = `
#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
// uniform vec2 offset[25];
uniform vec2 dimensions;
void main(void) {

  vec4 color = TEXTURE2D(uSampler, vTextureCoord);
  float x = color.r * 10000007.0 + color.g * 102913.0 + color.b * 104729.0;
  float idx = floor(fract(sin(x)*100000.0) * 25.0);

  vec2 offset = vec2( float(idx/5.0 - 2.0),float(mod(idx,5.0) - 2.0) );

  gl_FragColor = TEXTURE2D(uSampler, vTextureCoord + offset / dimensions);
}
`