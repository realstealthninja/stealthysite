import { Shader } from './shader';

describe('Shader', () => {
  it('should create an instance', () => {

    const shaderSource = 
    `#version 300 es

    in vec4 a_position;

    void main() {
      gl_Position = a_position;
    }
    `

    const context: WebGL2RenderingContext = document.createElement("canvas").getContext("webgl2") as WebGL2RenderingContext;
    expect(new Shader(context, context.VERTEX_SHADER, shaderSource)).toBeTruthy();
  });
});
