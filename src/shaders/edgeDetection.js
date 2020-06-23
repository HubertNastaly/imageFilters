export const edgeDetectionFragmentShader = `
#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float xSobelOperator[9];
uniform float ySobelOperator[9];
uniform vec2 offset[9];
uniform vec2 dimensions;
void main(void) {

  vec4 colorX = vec4(0.0);
  vec4 colorY = vec4(0.0);
  vec2 sampleCoord;
  for(int i = 0; i < 9; ++i){
    sampleCoord = vTextureCoord + (offset[i] / dimensions);
    colorX += TEXTURE2D(uSampler, sampleCoord) * xSobelOperator[i];
    colorY += TEXTURE2D(uSampler, sampleCoord) * ySobelOperator[i];
  }

  gl_FragColor = sqrt(colorX * colorX + colorY * colorY);
}
`