export const gaussianBlurFragmentShader = `
#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 offset[25];
uniform float weights[25];
uniform vec2 dimensions;
void main(void) {
  float divider;
  vec2 sampleCoord;
  vec4 color = vec4(0.0);
  for(int i = 0; i < 25; ++i){
    sampleCoord = vTextureCoord + (offset[i] / dimensions);
    color += TEXTURE2D(uSampler, sampleCoord) * weights[i];
  }

  gl_FragColor = color;
}
`