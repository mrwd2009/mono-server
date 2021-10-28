import { memo, useRef, useEffect } from 'react';

export interface Props {
  title: string,
};

const compile = (gl: WebGLRenderingContext, vShaderSrc: string, fShaderSrc: string ): WebGLProgram => {
  const vShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vShader, vShaderSrc);
  gl.compileShader(vShader);

  const fShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fShader, fShaderSrc);
  gl.compileShader(fShader);

  const program = gl.createProgram()!;
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  console.log(`vShader: ${gl.getShaderInfoLog(vShader)}`);
  console.log(`fShader: ${gl.getShaderInfoLog(fShader)}`);
  console.log(`program:${gl.getProgramInfoLog(program)}`);

  return program;
};

const createScene = (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext('webgl')!;
  const vShaderSrc = `
    void main() {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 10.0;
    }
  `;
  const fShaderSrc = `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `;
  const vShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vShader, vShaderSrc);
  gl.compileShader(vShader);

  const fShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fShader, fShaderSrc);
  gl.compileShader(fShader);

  const program = gl.createProgram()!;
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  console.log(`vShader: ${gl.getShaderInfoLog(vShader)}`);
  console.log(`fShader: ${gl.getShaderInfoLog(fShader)}`);
  console.log(`program:${gl.getProgramInfoLog(program)}`);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
};

const createWithAttributeUniform = (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext('webgl')!;
  const vShaderSrc = `
    attribute vec4 position;
    attribute float size;
    void main() {
      gl_Position = position;
      gl_PointSize = size;
    }
  `;
  const fShaderSrc = `
    precision mediump float;
    uniform vec4 color;
    void main() {
      float d = distance(gl_PointCoord, vec2(0.5, 0.5));
      if (d < 0.5) {
        gl_FragColor = color;
      } else {
        discard;
      }
    }
  `;

  const program = compile(gl, vShaderSrc, fShaderSrc);
  const position = gl.getAttribLocation(program, 'position');
  const size = gl.getAttribLocation(program, 'size');
  const color = gl.getUniformLocation(program, 'color');
  gl.vertexAttrib4f(position, 0, 0, 0, 1);
  gl.vertexAttrib1f(size, 10);
  gl.uniform4f(color, 1, 0, 0, 1);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.POINTS, 0, 1);

  setInterval(() => {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();

    gl.vertexAttrib3f(position, x, y, 0);
    gl.uniform4f(color, r, g, b, 1);
    gl.drawArrays(gl.POINTS, 0, 1);
  }, 500);

  // gl.vertexAttrib4f(position, 0.25, 0, 0, 1);
  // gl.uniform4f(color, 0, 1, 0, 1);
  // gl.drawArrays(gl.POINTS, 0, 1);

};

const createGradientScene = (canvas: HTMLCanvasElement)=> {
  const gl = canvas.getContext('webgl')!;
  const vShaderSrc = `
    attribute vec4 position;
    attribute vec4 color;
    varying vec4 v_color;
    void main() {
      gl_Position = position;
      v_color = color;
    }
  `;
  const fShaderSrc = `
    precision mediump float;
    varying vec4 v_color;
    void main() {
      gl_FragColor = v_color;
    }
  `;
  const program = compile(gl, vShaderSrc, fShaderSrc);
  const verticesColors = new Float32Array([
     0,    0.5, -0.9, 0, 1, 0,
    -0.5, -0.5,  -.9, 0, 0, 1,
     0.5, -0.5,  -1.1, 1, 0, 0,
  ]);
  const n = 3;
  const floatSize = verticesColors.BYTES_PER_ELEMENT;

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  const position = gl.getAttribLocation(program, 'position');
  gl.vertexAttribPointer(position, 3, gl.FLOAT, false, floatSize * 6, 0);
  gl.enableVertexAttribArray(position);

  const color = gl.getAttribLocation(program, 'color');
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false, floatSize * 6, floatSize * 3);
  gl.enableVertexAttribArray(color);

  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);

};

const buffer = (gl: WebGLRenderingContext, data: Float32Array, program: WebGLProgram, attribute: string, size: number, type: number)  => {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  const a = gl.getAttribLocation(program, attribute);
  gl.vertexAttribPointer(a, size, type, false, 0, 0);
  gl.enableVertexAttribArray(a);
};

const createTransformScene = (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext('webgl')!;
  const vShaderSrc = `
    attribute vec4 position;
    uniform mat4 translation;
    uniform mat4 rotation;
    uniform mat4 scale;
    void main() {
      gl_Position = scale * rotation * translation * position;
    }
  `;
  const fShaderSrc = `
    precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color.bgra;
    }
  `;
  const program = compile(gl, vShaderSrc, fShaderSrc);
  const position = gl.getAttribLocation(program, 'position');
  const translation = gl.getUniformLocation(program, 'translation');
  const rotation = gl.getUniformLocation(program, 'rotation');
  const scale = gl.getUniformLocation(program, 'scale');
  const color = gl.getUniformLocation(program, 'color');

  gl.uniform4f(color, 1, 0, 0, 1);

  const vertices = new Float32Array([0, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0]);
  buffer(gl, vertices, program, 'position', 3, gl.FLOAT);

  const tMatrix = new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0.8, -0.6, 0, 1,
  ]);
  gl.uniformMatrix4fv(translation, false, tMatrix);

  const angle = 0.7;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const rMatrix = new Float32Array([
    cos, sin, 0, 0,
    -sin, cos, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]);
  gl.uniformMatrix4fv(rotation, false, rMatrix);

  const sMatrix = new Float32Array([
    0.4, 0, 0, 0,
    0, 0.4, 0, 0,
    0, 0, 0.4, 0,
    0, 0, 0, 1
  ]);
  gl.uniformMatrix4fv(scale, false, sMatrix);

  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

const HelloWebGL = ({ title } : Props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    createGradientScene(canvasRef.current!);
  }, []);
  return (
    <>
      <h5>{title}</h5>
      <canvas ref={canvasRef} width="300" height="300" style={{ border: '1px solid red'}} />
    </>
  )
};

export default memo(HelloWebGL);