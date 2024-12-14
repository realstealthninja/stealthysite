#version 300 es

precision highp float;


uniform vec3 iResolution;
uniform float iTime;


out vec4 outColor;

void main() {

  vec2 st = gl_FragCoord.xy / iResolution.xy;
  outColor = vec4(1.0); 

  vec3 color = vec3(0.0, 0.0, 1.0);

  vec2 borders = step(vec2(0.1), st);
  float pct = borders.x * borders.y;
  outColor = vec4(color* pct, 1.0);

}