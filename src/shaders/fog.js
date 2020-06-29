export const fogFragmentShader = `
#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
void main(void) {

  vec4 color = TEXTURE2D(uSampler,vTextureCoord);
  float luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
  float brighten = sqrt(sqrt(1.0 - luminance + 1.0)) - 1.0;
  float red = clamp(color.r + brighten , 0.0, 1.0);
  float green = clamp(color.g + brighten , 0.0, 1.0);
  float blue = clamp(color.b + brighten , 0.0, 1.0);
  gl_FragColor = vec4(red, green, blue, 1.0);

}
`