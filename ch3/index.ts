import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';

const main = () => {
  // WebGL 콘텍스트 생성
  const canvas = document.getElementById('c') as HTMLCanvasElement;
  const gl = canvas.getContext('webgl');
  if (!gl) {
    console.error('WebGL unavaliable');
    return;
  }

  // 지오메트리 정의 및 저장
  const firstSquare = [
    -0.3, -0.3, -0.3,

    0.3, -0.3, -0.3,

    0.3, 0.3, -0.3,

    -0.3, -0.3, -0.3,

    -0.3, 0.3, -0.3,

    0.3, 0.3, -0.3,
  ];

  // 전면 정점 정의
  // 전면 버퍼 정의
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(firstSquare), gl.STATIC_DRAW);
  // 세이더 생성
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertexShader, vertexSource);
  gl.shaderSource(fragmentShader, fragmentSource);
  // 세이더 컴파일
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);
  // 세이더 프로그램 생성
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 링크 세이더 프로그램
  gl.linkProgram(program);
  gl.useProgram(program);
  // 속성을 정점 세이더와 연결
  const posAttribLocation = gl.getAttribLocation(program, 'aPosition');
  gl.vertexAttribPointer(posAttribLocation, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(posAttribLocation);
  // 그리기
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 화면에 포인트 그리기
  const mode = gl.LINE_LOOP;
  const first = 0;
  const count = 6;
  gl.drawArrays(mode, first, count);
};

main();
