export const anaglyphFragmentShader = `
#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 dimensions;
uniform vec2 offset;
void main(void) {

  vec4 left = TEXTURE2D(uSampler,clamp(vTextureCoord-offset/dimensions, 0.0, 1.0));
  vec4 right = TEXTURE2D(uSampler,clamp(vTextureCoord+offset/dimensions, 0.0, 1.0));

  gl_FragColor = vec4(left.r,right.gb,1.0);
}
`