import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Webgl } from '../webgl/webgl';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-glsl',
  standalone: true,
  imports: [],
  templateUrl: './glsl.component.html',
  styleUrl: './glsl.component.css'
})
export class GlslComponent {
  private startTime = 0;

  constructor(private httpClient: HttpClient) {
    this.startTime = Date.now()
  }

  ngOnInit() {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.querySelector('#glsl-canvas')!
    );

    combineLatest([
      this.httpClient.get('shaders/hello.vert', { responseType: 'text' }),
      this.httpClient.get('shaders/hello.frag', { responseType: 'text' }),
    ]).subscribe(([vertex, fragment]) => {
      var gl = new Webgl(canvas, vertex, fragment);

      var positionAttributeLocation = gl.context.getAttribLocation(
        gl.program,
        "a_position"
      );

      var positionBuffer = gl.  context.createBuffer();
      gl.context.bindBuffer(gl.context.ARRAY_BUFFER, positionBuffer);


      var positions = [
        -1.0, -1.0,
        -1.0,  1.0,
         1.0,  1.0,
         1.0, -1.0
      ];
      
      var indices = [
        0, 1, 2,
        0, 2, 3
      ]

      var vao = gl.context.createVertexArray();
      gl.context.bindVertexArray(vao);
      gl.context.bufferData(
        gl.context.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.context.STATIC_DRAW
      );


      var ebo = gl.context.createBuffer();
      gl.context.bindBuffer(gl.context.ELEMENT_ARRAY_BUFFER, ebo);
      gl.context.bufferData(
        gl.context.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), 
        gl.context.STATIC_DRAW
      );

      gl.context.enableVertexAttribArray(positionAttributeLocation);

      var size = 2; // no of elements per row
      var type = gl.context.FLOAT;
      var normalize = false;
      var stride = 0;
      var offset = 0;

      gl.context.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
      );

      

      gl.context.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      var iresloc = gl.context.getUniformLocation(gl.program, "iResolution");
      var iTimeloc = gl.context.getUniformLocation(gl.program, "iTime"); 
      let startTime = this.startTime;
      function render() {


      //clear canvas
      gl.context.clearColor(0.0, 0.0, 0.0, 1.0);

      gl.context.clear(gl.context.COLOR_BUFFER_BIT);
      gl.context.useProgram(gl.program);


      gl.context.uniform3f(iresloc, gl.canvas.width, gl.canvas.height, 1.0);
      gl.context.uniform1f(iTimeloc, (Date.now() - startTime) * 0.001);

      gl.context.bindVertexArray(vao);
      const primitiveType = gl.context.TRIANGLES;
      const offset = 0;
      const count = 6;
      const indexType = gl.context.UNSIGNED_SHORT;

      gl.context.drawElements(
        gl.context.TRIANGLES,
        count,
        indexType,
        offset
      );
      requestAnimationFrame(render);
      }

      requestAnimationFrame(render)

    });

  }
}
