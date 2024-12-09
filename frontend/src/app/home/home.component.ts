import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  ngOnInit() {

    const canvas: HTMLCanvasElement = 
     <HTMLCanvasElement>  document.querySelector("#header-canvas")!;
    
    const gl: WebGLRenderingContext = canvas.getContext("webgl")!;

    if (gl === null) {
      alert("No webgl");
      return;
    }


    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}
