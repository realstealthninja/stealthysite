import { Webgl } from './webgl';

describe('Webgl', () => {
  it('should create an instance', () => {
  
    var canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
    
    var vert = 
    `#version 300 es

    in vec4 a_position;

    void main() {
      gl_Position = a_position;
    }
    `;

    var frag = 
    `#version 300 es

    out vec4 outColor;

    void main() {
      ouColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
    `


    expect(new Webgl(canvas, vert, frag)).toBeTruthy();
  });
});
