import { Webgl } from './webgl';

describe('Webgl', () => {
  it('should create an instance', () => {
  
    const canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
    
    const vert = 
    `#version 300 es

    in vec4 a_position;

    void main() {
      gl_Position = a_position;
    }
    `;

    const frag = 
    `#version 300 es
    precision highp float;
     
    out vec4 outColor;
     
    void main() {
       outColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
    `

    expect(new Webgl(canvas, vert, frag)).toBeTruthy();
  });
});
