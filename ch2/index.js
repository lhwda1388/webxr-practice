import fragment from "./shaders/fragment.frag";
import vertex from "./shaders/vertex.frag";

/*========== Create a WebGL Context ==========*/
const canvas = document.querySelector("#c");
const gl = canvas.getContext("webgl");
if (!gl) {
  console.log("WebGL unavailable");
} else {
  console.log("WebGL is good to go");
}
console.log(gl.drawingBufferWidth);
console.log(gl.drawingBufferHeight);
console.log(gl);
/*========== Define and Store the Geometry ==========*/

// Define the points in the scene
const coordinates = [-0.7, 0.7, 0.7, 0.7, -0.7, 0, 0.7, 0];

// Create an empty buffer object to store the vertex points
const pointsBuffer = gl.createBuffer();

// Connect the empty buffer object to the GL context
gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);

// Load the vertices into the GL's connected buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordinates), gl.STATIC_DRAW);

/*========== Shaders ==========*/

// Create a variable to store the data for our vertex shader
// const vsSource = document.querySelector("#vertex-data").text;

// Create a varialble to store the data from our fragment shader
// const fsSource = document.querySelector("#fragment-data").text;

// Compile the shaders into little programs

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

// Create a GL program to connect the shaders to the GL context
const program = gl.createProgram();

// Attach the shaders to the GL context through the program
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

// Create shader executables to run on the GPU
gl.linkProgram(program);

// Define the active program defining what the GPU will draw
gl.useProgram(program);

/*===================== Connect the attribute with the vertex shader ===================*/

// Locate the attribute from the vertex shader source in the program
const pointsAttributeLocation = gl.getAttribLocation(program, "vertex_points");
// Connect the attribute to the points data currently in the buffer object
gl.vertexAttribPointer(pointsAttributeLocation, 2, gl.FLOAT, false, 0, 0);
// Send the points data to the GPU
gl.enableVertexAttribArray(pointsAttributeLocation);

/*==================== Drawing ======================== */

// Clear the canvas
gl.clearColor(0.5, 0.5, 0.5, 1);

// Clear the GL context's color buffer for a fresh paint
gl.clear(gl.COLOR_BUFFER_BIT);

// Draw the points on the screen
const mode = gl.TRIANGLE_STRIP;
const first = 0;
const count = 4;
gl.drawArrays(mode, first, count);
