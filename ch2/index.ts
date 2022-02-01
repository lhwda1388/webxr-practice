import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";

window.onload = () => {
  const canvas = document.getElementById("c") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");

  console.log("gl : ", gl);

  if (!gl) {
    console.error("WebGL unavailable");
  } else {
    console.log("WebGL is good to go");
  }

  console.log(
    `drawingBufferWidth: ${gl.drawingBufferWidth}, drawingBufferHeight: ${gl.drawingBufferHeight}`
  );

  // 화면의 포인트 정의
  const coordinates = [-0.7, 0.7, 0.7, 0.7, -0.7, 0, 0.7, 0];

  // 정점을 저장한 버퍼 객체 생성
  const pointsBuffer = gl.createBuffer();

  // 버퍼객체를 gl 콘텍스트에 연결
  gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);

  // 정점을 GL의 연결된 버퍼에 로드
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordinates), gl.STATIC_DRAW);

  // 세이더를 GLSL로 compile
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertex);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragment);
  gl.compileShader(fragmentShader);

  // 세이더 기능을 GPU에 전달하는 컨테이너 생성
  const program = gl.createProgram();

  // 세이더 부착
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // linking
  gl.linkProgram(program);
  gl.useProgram(program);

  // 프로그램의 정점 세이더 소스에서 속성찾기
  const pointsAttributeLocation = gl.getAttribLocation(
    program,
    "vertex_points"
  );

  // 세이더 속성을 버퍼 객체에 있는 포인트 데이터에 연결
  gl.vertexAttribPointer(pointsAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // 포인트 데이터를 GPU에 보냄
  gl.enableVertexAttribArray(pointsAttributeLocation);

  gl.clearColor(0, 0, 0, 0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};
