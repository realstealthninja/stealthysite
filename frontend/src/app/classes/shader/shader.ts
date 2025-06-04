
export class Shader {
    private shader!: WebGLShader;

    constructor(
        private context: WebGL2RenderingContext,
        private type: GLenum,
        private source: string
    ) {
        this.shader = context.createShader(this.type)!;
        this.context.shaderSource(this.shader, this.source);
        this.context.compileShader(this.shader);
        
        
        if(!context.getShaderParameter(this.shader, this.context.COMPILE_STATUS)) {
            this.context.deleteShader(this.shader);
            throw new Error("Unable to compile shader");
        }
    }

    public attachShader(program: WebGLProgram) {
        this.context.attachShader(program, this.shader);
    }

    public destroyShader() {
        this.context.deleteShader(this.shader)
    }
}
