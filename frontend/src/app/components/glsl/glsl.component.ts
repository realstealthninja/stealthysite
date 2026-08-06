import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Webgl } from '../../classes/webgl/webgl';
import { HttpClient } from '@angular/common/http';
import { parse } from 'marked';

@Component({
  selector: 'app-glsl',
  standalone: true,
  templateUrl: './glsl.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './glsl.component.css',
})
export class GlslComponent implements OnInit {
  private httpClient = inject(HttpClient);

  private startTime = 0;
  private canvas: HTMLCanvasElement | null = null;

  constructor() {
    this.startTime = Date.now();
  }

  ngOnInit() {
    function parseRGB(rgb: string) {
      const x = rgb
        .split('(')[1]
        .split(')')[0]
        .split(',')
        .map((x) => parseInt(x));

      return {
        r: x[0],
        g: x[1],
        b: x[2],
      };
    }

    function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
      // Lookup the size the browser is displaying the canvas in CSS pixels.
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      // Check if the canvas is not the same size.
      const needResize =
        canvas.width !== displayWidth || canvas.height !== displayHeight;

      if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        console.log('scaling');
      }

      return needResize;
    }

    this.canvas = document.getElementById('gl-canvas') as HTMLCanvasElement;

    combineLatest([
      this.httpClient.get('shaders/background.vert', { responseType: 'text' }),
      this.httpClient.get('shaders/background.frag', { responseType: 'text' }),
    ]).subscribe(([vertex, fragment]) => {
      const gl = new Webgl(this.canvas!, vertex, fragment);

      const positionAttributeLocation = gl.context.getAttribLocation(
        gl.program,
        'a_position',
      );

      const positionBuffer = gl.context.createBuffer();

      gl.context.bindBuffer(gl.context.ARRAY_BUFFER, positionBuffer);

      const positions = [-1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0];
      const indices = [0, 1, 2, 0, 2, 3];

      const vao = gl.context.createVertexArray();
      gl.context.bindVertexArray(vao);
      gl.context.bufferData(
        gl.context.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.context.STATIC_DRAW,
      );

      const ebo = gl.context.createBuffer();

      gl.context.bindBuffer(gl.context.ELEMENT_ARRAY_BUFFER, ebo);

      gl.context.bufferData(
        gl.context.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.context.STATIC_DRAW,
      );

      gl.context.enableVertexAttribArray(positionAttributeLocation);

      const size = 2; // no of elements per row
      const type = gl.context.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;

      gl.context.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset,
      );

      const iresloc = gl.context.getUniformLocation(gl.program, 'iResolution');
      const iTimeloc = gl.context.getUniformLocation(gl.program, 'iTime');
      const iMouseloc = gl.context.getUniformLocation(gl.program, 'iMouse');

      const background = gl.context.getUniformLocation(
        gl.program,
        'background',
      );
      const accent = gl.context.getUniformLocation(gl.program, 'accent');

      const secondary = gl.context.getUniformLocation(gl.program, 'secondary');

      const dark = gl.context.getUniformLocation(gl.program, 'dark');

      const startTime = this.startTime;
      const rgb_norm = 1 / 255;

      let mouseX = 0;
      let mouseY = 0;

      function setMousePosition(e: MouseEvent) {
        const rect =
          gl.canvas.parentElement!.parentElement!.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = rect.height - (e.clientY - rect.top) - 1; // bottom is 0 in WebGL
      }

      gl.canvas.parentElement!.parentElement!.addEventListener(
        'mousemove',
        setMousePosition,
      );

      function render() {
        resizeCanvasToDisplaySize(gl.canvas);
        gl.context.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        //clear canvas
        gl.context.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.context.clear(gl.context.COLOR_BUFFER_BIT);

        const background_color = window
          .getComputedStyle(document.body)
          .getPropertyValue('background-color');

        const accent_color = window
          .getComputedStyle(document.body)
          .getPropertyValue('accent-color');

        const secondary_hex = window
          .getComputedStyle(document.body)
          .getPropertyValue('border-inline-color');

        const theme = document.body.style.getPropertyValue('color-scheme');

        const background_rgb = parseRGB(background_color);
        const secondary_rgb = parseRGB(secondary_hex);
        const accent_rgb = parseRGB(accent_color);

        const background_normalised = [
          background_rgb.r * rgb_norm,
          background_rgb.g * rgb_norm,
          background_rgb.b * rgb_norm,
        ];

        const accent_normalised = [
          accent_rgb.r * rgb_norm,
          accent_rgb.g * rgb_norm,
          accent_rgb.b * rgb_norm,
        ];

        gl.context.useProgram(gl.program);

        gl.context.uniform3f(iresloc, gl.canvas.width, gl.canvas.height, 1.0);

        gl.context.uniform3f(
          background,
          background_normalised[0],
          background_normalised[1],
          background_normalised[2],
        );

        gl.context.uniform3f(
          accent,
          accent_normalised[0],
          accent_normalised[1],
          accent_normalised[2],
        );

        gl.context.uniform3f(
          secondary,
          secondary_rgb.r * rgb_norm,
          secondary_rgb.g * rgb_norm,
          secondary_rgb.b * rgb_norm,
        );

        if (!theme.startsWith('light')) {
          gl.context.uniform1i(dark, 1);
        } else {
          gl.context.uniform1i(dark, 0);
        }

        gl.context.uniform1f(iTimeloc, (Date.now() - startTime) * 0.001);
        gl.context.uniform2f(iMouseloc, mouseX, mouseY);

        gl.context.bindVertexArray(vao);
        const primitiveType = gl.context.TRIANGLES;
        const offset = 0;
        const count = 6;
        const indexType = gl.context.UNSIGNED_SHORT;

        gl.context.drawElements(primitiveType, count, indexType, offset);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    });
  }
}
