export const invertFragmentShader = `
#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float strength;
void main(void) {
  gl_FragColor = TEXTURE2D(uSampler, vTextureCoord);
  gl_FragColor = clamp(1.0 - gl_FragColor, 0.0, 1.0);
}
`