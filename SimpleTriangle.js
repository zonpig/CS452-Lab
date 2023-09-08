var canvas;
var gl;
var myShaderProgramTri;
var myShaderProgramSq;

function init() {
  var canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL is not available");
  }

  // Set up the viewport
  gl.viewport(0, 0, 512, 512); // x, y, width, height

  // Set up the background color
  gl.clearColor(1.0, 0.0, 0.0, 1.0); // red, green, blue, opacity (alpha)

  // Force the WebGL context to clear the color buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Create shader program, needs vertex and fragment shader code
  // in GLSL to be written in HTML file
  myShaderProgramTri = initShaders(
    gl,
    "vertex-shader-tri",
    "fragment-shader-tri"
  );

  // Create shader program, needs vertex and fragment shader code
  // in GLSL to be written in HTML file
  myShaderProgramSq = initShaders(gl, "vertex-shader-sq", "fragment-shader-sq");

  drawTriangle();
  drawSquare();
}

function drawTriangle() {
  // Set up the canvas
  var canvas = document.getElementById("gl-canvas");
  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL is not available");
  }

  // Set up the viewport
  gl.viewport(0, 0, 512, 512); // x, y, width, height

  // Set up the background color
  gl.clearColor(1.0, 0.0, 0.0, 1.0); // red, green, blue, opacity (alpha)

  // Force the WebGL context to clear the color buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Enter array set up code here
  var arrayOfPoints = [];
  var p0 = vec2(0.0, 0.0);
  var p1 = vec2(1.0, 0.0);
  var p2 = vec2(0.0, 1.0);
  var arrayOfPoints = [p0, p1, p2];

  // or arrayOfPoints = [0.0,0.0,1.0,0.0,0.0,1.0]
  //  gl.bufferData(gl.ARRAY_BUFFER, arrayOfPoints, gl.STATIC_DRAW);

  // Create a buffer (storage unit for the points) on the graphics card,
  // and send array to the buffer for use
  // in the shaders
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);

  gl.useProgram(myShaderProgramTri);

  // Create a pointer that iterates over the
  // array of points in the shader code
  var myPosition = gl.getAttribLocation(myShaderProgramTri, "myPosition");
  gl.vertexAttribPointer(myPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(myPosition);

  // Force a draw of the triangle using the
  // 'drawArrays()' call
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// 0.0 - 1st point
// 0.0 - 2nd point
// 1.0 - 3rd point
// 0.0
// 0.0
// 1.0

function drawSquare() {
  // Set up the canvas
  var canvas = document.getElementById("gl-canvas");
  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL is not available");
  }

  // Set up the viewport
  gl.viewport(0, 0, 512, 512); // x, y, width, height

  // Set up the background color
  // gl.clearColor(1.0, 0.0, 0.0, 1.0); // red, green, blue, opacity (alpha)

  // Force the WebGL context to clear the color buffer
  // gl.clear(gl.COLOR_BUFFER_BIT);

  // Enter array set up code here
  var arrayOfPoints = [];
  var p0 = vec2(0.0, 0.0);
  var p1 = vec2(-1.0, 0.0);
  var p2 = vec2(-1.0, -1.0);
  var p3 = vec2(0.0, -1.0);
  var arrayOfPoints = [p0, p1, p2, p3];

  // or arrayOfPoints = [0.0,0.0,1.0,0.0,0.0,1.0]
  //  gl.bufferData(gl.ARRAY_BUFFER, arrayOfPoints, gl.STATIC_DRAW);

  // Create a buffer (storage unit for the points) on the graphics card,
  // and send array to the buffer for use
  // in the shaders
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);

  gl.useProgram(myShaderProgramSq);

  // Create a pointer that iterates over the
  // array of points in the shader code
  var myPosition = gl.getAttribLocation(myShaderProgramSq, "myPosition");
  gl.vertexAttribPointer(myPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(myPosition);

  // Force a draw of the triangle using the
  // 'drawArrays()' call
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
