var canvas;
var gl;
var myShaderProgramTri;
var myShaderProgramSq;
var myShaderProgramEl;

function init() {
  var canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL is not available");
  }

  // Set up the viewport
  gl.viewport(0, 0, 512, 512); // x, y, width, height

  // Set up the background color
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // red, green, blue, opacity (alpha)

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

  myShaderProgramEl = initShaders(gl, "vertex-shader-el", "fragment-shader-el");

  drawTriangle();
  drawSquare();
  drawEllipse();
}

function drawTriangle() {
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

function drawSquare() {
  // Enter array set up code here
  var arrayOfPoints = [];
  var p0 = vec2(-0.25, -0.25);
  var p1 = vec2(-0.75, -0.25);
  var p2 = vec2(-0.75, -0.75);
  var p3 = vec2(-0.25, -0.75);
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
  gl.drawArrays(gl.LINE_LOOP, 0, 4);
}

function drawEllipse() {
  var arrayOfPointsForCircle = [];

  // Enter array set up code here
  // Use the parametric form of the circle equations:
  // x = c cos(theta) + a
  // y = d sin(theta) + b
  var x, y;
  var theta;

  var thetastart = 0;
  var thetaend = 2 * Math.PI;
  var n = 256;
  var thetastep = (thetaend - thetastart) / n;

  var a = -0.5; // X-coordinate of the top-left corner
  var b = 0.5; // Y-coordinate of the top-left corner

  var c = 0.3; // Scale factor for the X-axis
  var d = 0.2; // Scale factor for the Y-axis

  var myPoint;

  for (var i = 0; i < n; i++) {
    theta = thetastart + i * thetastep;
    x = c * Math.cos(theta) + a;
    y = d * Math.sin(theta) + b;

    myPoint = vec2(x, y);
    arrayOfPointsForCircle.push(myPoint);
  }

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    flatten(arrayOfPointsForCircle),
    gl.STATIC_DRAW
  );

  gl.useProgram(myShaderProgramEl);

  var myPosition = gl.getAttribLocation(myShaderProgramEl, "myPosition");
  gl.vertexAttribPointer(myPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(myPosition);

  // Enter drawArrays code here
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}
