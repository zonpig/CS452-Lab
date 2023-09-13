// Completed by
// Bryan Lim
// Mustapha Jom

var gl;
var myShaderProgram;

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
  myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");

  drawTriangle();
  drawEllipse();
  drawHexagon();
}

//Function to draw a triangle
function drawTriangle() {
  // Enter array set up code here
  var arrayOfPoints = [];
  var p0 = vec2(0.25, 0.25);
  var p1 = vec2(0.75, 0.25);
  var p2 = vec2(0.25, 0.75);
  var arrayOfPoints = [p0, p1, p2];

  // Create a buffer (storage unit for the points) on the graphics card,
  // and send array to the buffer for use
  // in the shaders
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);

  // Create shader program, needs vertex and fragment shader code
  gl.useProgram(myShaderProgram);

  // Create a pointer that iterates over the
  // array of points in the shader code
  var myPosition = gl.getAttribLocation(myShaderProgram, "myPosition");
  gl.vertexAttribPointer(myPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(myPosition);

  // Set the color of the triangle
  myColorUniform = gl.getUniformLocation(myShaderProgram, "shapeColor");
  gl.uniform4f(myColorUniform, 1.0, 1.0, 0.0, 1.0);

  // Set the scale of the triangle
  myScaleUniform = gl.getUniformLocation(myShaderProgram, "scaleOnPosition");
  gl.uniform2f(myScaleUniform, 0.9, 0.9);

  // Force a draw of the triangle using the
  // 'drawArrays()' call
  gl.drawArrays(gl.LINE_LOOP, 0, 3);
}

function drawEllipse() {
  // Enter array set up code here
  var arrayOfPointsForCircle = [];
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

  // Create a buffer (storage unit for the points) on the graphics card,
  // and send array to the buffer for use
  // in the shaders
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    flatten(arrayOfPointsForCircle),
    gl.STATIC_DRAW
  );

  // Create shader program, needs vertex and fragment shader code
  gl.useProgram(myShaderProgram);

  // Create a pointer that iterates over the
  // array of points in the shader code
  var myPosition = gl.getAttribLocation(myShaderProgram, "myPosition");
  gl.vertexAttribPointer(myPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(myPosition);

  // Set the color of the ellipse
  myColorUniform = gl.getUniformLocation(myShaderProgram, "shapeColor");
  gl.uniform4f(myColorUniform, 0.0, 1.0, 0.0, 1.0);

  // Set the scale of the ellipse
  myScaleUniform = gl.getUniformLocation(myShaderProgram, "scaleOnPosition");
  gl.uniform2f(myScaleUniform, 0.9, 0.9);

  // Force a draw of the Ellipse using the
  // 'drawArrays()' call
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

function drawHexagon() {
  // Enter array set up code here
  var arrayOfPoints = [];
  var radius = 0.5;
  var yOffset = -0.435;
  var n = 6;

  for (var i = 0; i < n; i++) {
    var angle = (2 * Math.PI * i) / 6;
    var x = radius * Math.cos(angle);
    var y = radius * Math.sin(angle) + yOffset;
    arrayOfPoints.push(vec2(x, y));
  }

  // Create a buffer on the graphics card,
  // and send array to the buffer for use
  // in the shaders
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);

  // Create shader program, needs vertex and fragment shader code
  gl.useProgram(myShaderProgram);

  // Create a pointer that iterates over the
  // array of points in the shader code
  var myPosition = gl.getAttribLocation(myShaderProgram, "myPosition");
  gl.vertexAttribPointer(myPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(myPosition);

  // Set the color of the hexagon
  myColorUniform = gl.getUniformLocation(myShaderProgram, "shapeColor");
  gl.uniform4f(myColorUniform, 0.25, 0.25, 1.0, 1.0);

  // Set the scale of the hexagon
  myScaleUniform = gl.getUniformLocation(myShaderProgram, "scaleOnPosition");
  gl.uniform2f(myScaleUniform, 0.9, 0.9);

  // Draw the hexagon
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}
