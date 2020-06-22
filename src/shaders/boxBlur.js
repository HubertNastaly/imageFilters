export const boxBlurFragmentShader = `
#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 offset[9];
uniform vec2 dimensions;
void main(void) {
  vec4 sample[9];
  float divider;
  vec2 sampleCoord;
  for(int i = 0; i < 9; ++i){
    sampleCoord = vTextureCoord + (offset[i] / dimensions);
    sample[i] = TEXTURE2D(uSampler, sampleCoord);
  }

  gl_FragColor = (sample[0] + sample[1] + sample[2] +
                  sample[3] + sample[4] + sample[5] +
                  sample[6] + sample[7] + sample[8] ) / 9.0;
}
`