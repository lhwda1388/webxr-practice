attribute vec4 aPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;

varying lowp vec4 vColor;

void main() {
  gl_Position = uModelViewMatrix * aPosition;
  vColor = aVertexColor;
}