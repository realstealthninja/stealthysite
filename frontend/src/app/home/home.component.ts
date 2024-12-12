import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Webgl } from '../webgl/webgl';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.querySelector('#header-canvas')!
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
      ];

      gl.context.bufferData(
        gl.context.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.context.STATIC_DRAW
      );

      var vao = gl.context.createVertexArray();
      
      gl.context.bindVertexArray(vao);
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
      gl.context.uniform3f(iresloc, gl.canvas.width, gl.canvas.height, 1.0);

      //clear canvas
      gl.context.clearColor(0.0, 0.0, 0.0, 1.0);

      gl.context.clear(gl.context.COLOR_BUFFER_BIT);
      gl.context.useProgram(gl.program);

      gl.context.bindVertexArray(vao);
      var primitiveType = gl.context.TRIANGLES;
      var offset = 0;
      var count = 3;
      gl.context.drawArrays(primitiveType, offset, count);


    });

  }
}
