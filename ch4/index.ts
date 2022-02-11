import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';
import { mat4 } from 'gl-matrix';

const main = () => {
  // WebGL 콘텍스트 생성
  const canvas = document.getElementById('c') as HTMLCanvasElement;
  const gl = canvas.getContext('webgl');
  if (!gl) {
    console.error('WebGL unavaliable');
    return;
  }

  // 지오메트리 정의 및 저장
  const squares = [
    // 정면
    -0.3, -0.3, -0.3,

    0.3, -0.3, -0.3,

    0.3, 0.3, -0.3,

    -0.3, -0.3, -0.3,

    -0.3, 0.3, -0.3,

    0.3, 0.3, -0.3,
    // 후면

    -0.2, -0.2, 0.3,

    0.4, -0.2, 0.3,

    0.4, 0.4, 0.3,

    -0.2, -0.2, 0.3,

    -0.2, 0.4, 0.3,

    0.4, 0.4, 0.3,

    // 상단
    -0.3, 0.3, -0.3,

    0.3, 0.3, -0.3,

    -0.2, 0.4, 0.3,

    0.4, 0.4, 0.3,

    0.3, 0.3, -0.3,

    -0.2, 0.4, 0.3,
  ];

  const squaresColors = [
    0.0, 0.0, 1.0, 1.0,

    0.0, 0.0, 1.0, 1.0,

    0.0, 0.0, 1.0, 0.5,

    0.0, 0.0, 1.0, 1.0,

    0.0, 0.0, 1.0, 1.0,

    0.0, 0.0, 1.0, 0.5,

    1.0, 0.0, 0.0, 1.0,

    1.0, 0.0, 0.0, 1.0,

    1.0, 0.0, 0.0, 0.5,

    1.0, 0.0, 0.0, 1.0,

    1.0, 0.0, 0.0, 1.0,

    1.0, 0.0, 0.0, 1.0,

    0.0, 0.8, 0.0, 1.0,

    0.0, 0.8, 0.0, 0.5,

    0.0, 0.8, 0.0, 1.0,

    0.0, 0.8, 0.0, 1.0,

    0.0, 0.8, 0.0, 0.5,

    0.0, 0.8, 0.0, 1.0,
  ];

  // 전면 정점 정의
  // 전면 버퍼 정의
  const squaresBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squaresBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squares), gl.STATIC_DRAW);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(squaresColors),
    gl.STATIC_DRAW,
  );
  // 세이더 생성
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertexShader, vertexSource);
  gl.shaderSource(fragmentShader, fragmentSource);
  // 세이더 컴파일
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the vertexShader shader : ${gl.getShaderInfoLog(
        vertexShader,
      )}`,
    );
    gl.deleteShader(vertexShader);
    return;
  }

  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the fragmentShader shader : ${gl.getShaderInfoLog(
        fragmentShader,
      )}`,
    );
    gl.deleteShader(fragmentShader);
    return;
  }
  // 세이더 프로그램 생성
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 링크 세이더 프로그램
  gl.linkProgram(program);
  let cubeRotation = 0.0;
  let then = 0;
  const render = (now: number) => {
    now *= 0.001;
    const deltaTime = now - then;
    then = now;
    gl.useProgram(program);
    // 속성을 정점 세이더와 연결
    const posAttribLocation = gl.getAttribLocation(program, 'aPosition');
    gl.bindBuffer(gl.ARRAY_BUFFER, squaresBuffer);
    const positionGroupCount = 3;
    gl.vertexAttribPointer(
      posAttribLocation,
      positionGroupCount,
      gl.FLOAT,
      false,
      0,
      0,
    );
    gl.enableVertexAttribArray(posAttribLocation);
    const colorAttribLocation = gl.getAttribLocation(program, 'aVertexColor');
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttribLocation);
    const modelMatrixLocation = gl.getUniformLocation(
      program,
      'uModelViewMatrix',
    );
    const modelViewMatrix = mat4.create();

    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, 0.5]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation, [1, 0, 0]);
    gl.uniformMatrix4fv(modelMatrixLocation, false, modelViewMatrix);

    // 그리기
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // 화면에 포인트 그리기
    const mode = gl.TRIANGLES;
    const first = 0;
    const count = squares.length / positionGroupCount;
    gl.drawArrays(mode, first, count);
    cubeRotation += deltaTime;
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

main();
