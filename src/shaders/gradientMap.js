export const gradientMapFragmentShader = `
#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec3 colorA;
uniform vec3 colorB;
uniform mat3 luminanceMatrix;
uniform vec2 dimensions;
void main(void) {
  float brightness = distance(vec3(0.0),luminanceMatrix * vec3(TEXTURE2D(uSampler,vTextureCoord)));
  gl_FragColor = vec4(brightness * colorA + (1.0 - brightness) * colorB, 1.0);
}
`