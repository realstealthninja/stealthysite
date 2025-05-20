import { Shader } from "./shader";

export class Webgl {
    private vertexShader!: Shader;
    public program!: WebGLProgram;
    private fragmentShader!: Shader;
    public context!: WebGL2RenderingContext;


    constructor(
        public canvas: HTMLCanvasElement,
        vertexSourceCode: string,
        fragmentSourceCode: string
    ) {
        this.context = this.canvas.getContext("webgl2")!;

        if (this.context == null) {
          return
          // TODO:throw a error
        }

        this.vertexShader = new Shader(
            this.context,
            this.context.VERTEX_SHADER,
            vertexSourceCode
        );

        this.fragmentShader = new Shader(
            this.context,
            this.context.FRAGMENT_SHADER,
            fragmentSourceCode
        );


        this.program = this.context.createProgram()!;

        this.vertexShader.attachShader(this.program);
        this.fragmentShader.attachShader(this.program);
        this.context.linkProgram(this.program);

        if(!this.context.getProgramParameter(this.program, this.context.LINK_STATUS)) {
            this.context.deleteProgram(this.program);
            throw new ReferenceError("Unable to link program");
        }
    }


}
