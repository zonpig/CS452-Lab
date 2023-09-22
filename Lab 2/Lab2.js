var gl;
var shaderProgramSquare;
var thetaUniform;
var thetaValue;
var stopStartFlag;
var x;
var y;
var speed;
var direction;

function init() {
  // Set up the canvas
  var canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL is not available");
  }

  // Set up the viewport
  gl.viewport(0, 0, 512, 512); // x, y, width, height

  // Set up the background color
  gl.clearColor(1.0, 0.0, 0.0, 1.0);

  shaderProgramSquare = initShaders(
    gl,
    "vertex-shader-square",
    "fragment-shader-square"
  );
  gl.useProgram(shaderProgramSquare);

  speed = 0.1; // Adjust the animation speed as needed

  thetaValue = 0.0;
  thetaUniform = gl.getUniformLocation(shaderProgramSquare, "theta");
  gl.uniform1f(thetaUniform, thetaValue);

  x = 0.0;
  y = 0.0;
  mousePositionUniform = gl.getUniformLocation(
    shaderProgramSquare,
    "mousePosition"
  );
  gl.uniform2f(mousePositionUniform, x, y);

  stopStartFlag = 0;
  direction = "Right";

  // Force the WebGL context to clear the color buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  setupSquare();

  render();

  //setInterval( drawSquare, 5 );
}

function setupSquare() {
  // Enter array set up code here
  var p0 = vec2(0.2, 0.2);
  var p1 = vec2(-0.2, 0.2);
  var p2 = vec2(-0.2, -0.2);
  var p3 = vec2(0.2, -0.2);
  var arrayOfPoints = [p0, p1, p2, p3];

  // Create a buffer on the graphics card,
  // and send array to the buffer for use
  // in the shaders
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);

  // Create a pointer that iterates over the
  // array of points in the shader code
  var myPositionAttribute = gl.getAttribLocation(
    shaderProgramSquare,
    "myPosition"
  );
  gl.vertexAttribPointer(myPositionAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(myPositionAttribute);
}

function startRotate() {
  stopStartFlag = 1;
}

function stopRotate() {
  stopStartFlag = 0;
}

function increaseSpeed() {
  speed += 0.5;
}

function decreaseSpeed() {
  speed -= 0.5;
}

function moveShape(event) {
  x = (event.clientX / 512.0) * 2.0 - 1.0;
  y = -((event.clientY / 512.0) * 2.0 - 1.0);
  mousePositionUniform = gl.getUniformLocation(
    shaderProgramSquare,
    "mousePosition"
  );
  gl.uniform2f(mousePositionUniform, x, y);
}

function moveShapeKeys(event) {
  var theKeyCode = event.keyCode;

  if (theKeyCode == 65) {
    direction = "Left";
  } else if (theKeyCode == 68) {
    direction = "Right";
  } else if (theKeyCode == 83) {
    direction = "Down";
  } else if (theKeyCode == 87) {
    direction = "Up";
  }
  gl.uniform2f(mousePositionUniform, x, y);
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  thetaValue += 0.01 * stopStartFlag;
  gl.uniform1f(thetaUniform, thetaValue);

  switch (direction) {
    case "Up":
      y = y + 0.005 * speed;
      break;

    case "Left":
      x = x - 0.005 * speed;
      break;

    case "Down":
      y = y - 0.005 * speed;
      break;

    case "Right":
      x = x + 0.005 * speed;
      break;
  }
  gl.uniform2f(mousePositionUniform, x, y);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

  requestAnimFrame(render);
}
