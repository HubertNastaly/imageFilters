export const posterizeFragmentShader = `
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

  float dist = (vTextureCoord.x + vTextureCoord.y) / 2.0;
  vec4 gradientColor = vec4(dist * colorA + (1.0 - dist) * colorB, 1.0);
  float brightness = distance(vec3(0.0),luminanceMatrix * vec3(TEXTURE2D(uSampler,vTextureCoord)));

  if(brightness > 0.5)
    gl_FragColor = vec4(1.0);
  else
    gl_FragColor = gradientColor;
}
`