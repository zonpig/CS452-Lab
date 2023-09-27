var gl;
var shaderProgramSquare;
var thetaUniform;
var thetaValue;
var rotateFlag;
var stepX;
var stepY;
var stepScale;
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

  stepScale = 0.3; // Adjust the animation speed as needed

  thetaValue = 0.0;
  thetaUniform = gl.getUniformLocation(shaderProgramSquare, "theta");
  gl.uniform1f(thetaUniform, thetaValue);

  stepX = 0.0;
  stepY = 0.0;
  mousePositionUniform = gl.getUniformLocation(
    shaderProgramSquare,
    "mousePosition"
  );
  gl.uniform2f(mousePositionUniform, stepX, stepY);

  rotateFlag = 0;
  direction = "Right";

  // Force the WebGL context to clear the color buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  setupSquare();

  render();

  //setInterval( drawSquare, 5 );
}

function setupSquare() {
  // Enter array set up code here
  var p0 = vec2(0.1, 0.1);
  var p1 = vec2(-0.1, 0.1);
  var p2 = vec2(-0.1, -0.1);
  var p3 = vec2(0.1, -0.1);
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
  rotateFlag = 1;
}

function stopRotate() {
  rotateFlag = 0;
}

function increaseSpeed() {
  if (stepScale >= 0.0) {
    stepScale += 0.5;
  }
}

function decreaseSpeed() {
  if (stepScale > 0.0) {
    stepScale -= 0.5;
  }
  if (stepScale < 0.0) {
    stepScale = 0.0;
  }
}

function moveShape(event) {
  stepX = (event.clientX / 512.0) * 2.0 - 1.0;
  stepY = -((event.clientY / 512.0) * 2.0 - 1.0);
  mousePositionUniform = gl.getUniformLocation(
    shaderProgramSquare,
    "mousePosition"
  );
  gl.uniform2f(mousePositionUniform, stepX, stepY);
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
  gl.uniform2f(mousePositionUniform, stepX, stepY);
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  thetaValue += 0.1 * rotateFlag;
  gl.uniform1f(thetaUniform, thetaValue);

  switch (direction) {
    case "Up":
      stepY = stepY + 0.005 * stepScale;
      break;

    case "Left":
      stepX = stepX - 0.005 * stepScale;
      break;

    case "Down":
      stepY = stepY - 0.005 * stepScale;
      break;

    case "Right":
      stepX = stepX + 0.005 * stepScale;
      break;
  }
  gl.uniform2f(mousePositionUniform, stepX, stepY);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

  requestAnimFrame(render);
}
