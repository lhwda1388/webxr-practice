attribute vec4 aPosition;
attribute vec4 aVertexColor;

varying lowp vec4 vColor;

void main() {
  gl_Position = aPosition;
  vColor = aVertexColor;
}