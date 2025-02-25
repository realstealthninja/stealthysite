#version 300 es

precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;

uniform vec3 background;
uniform vec3 accent;
uniform vec3 primary;
uniform vec3 secondary;

uniform bool dark;

out vec4 outColor;

float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453133);
}

float noise(in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  // Smooth Interpolation

  // Cubic Hermine Curve.  Same as SmoothStep()
  vec2 u = f * f * (3.0 - 2.0 * f);
  // u = smoothstep(0.,1.,f);

  // Mix 4 coorners percentages
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {

  vec2 st = gl_FragCoord.xy / iResolution.xy;
  st.x *= iResolution.x / iResolution.y;

  float t = abs(1.0 - sin(0.2 - iTime * random(st) * 0.5)) * 0.5;
  st += noise(st * 2.0) * t - iMouse * 0.00005;

  vec3 color = background;

  if (dark) {
    color = background;
    color = background * smoothstep(.18, .2, noise(st));
    color += secondary * smoothstep(.15, .2, noise(st * 10.0));
    color -= secondary * smoothstep(.35, .4, noise(st * 10.0));

  } else {
    color = secondary;
    color += background * smoothstep(.35, .4, noise(st * 10.0));
  }

  outColor = vec4(color, 1.0);
}