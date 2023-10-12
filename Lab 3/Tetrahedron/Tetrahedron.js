var gl;
var myShaderProgram;
var alpha;
var beta;
var gamma;
var Mx;
var My;
var Mz;
var Mxuni;
var Myuni;
var Mzuni;


function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);

    if (!gl) {alert("WebGL is not available");}

    gl.viewport(0, 0, 512, 512);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    alpha = 0.0;
    beta = 0.0;
    gamma = 0.0;
    
    Mx = [
    1.0, 0.0, 0.0, 0.0,
    0.0, Math.cos(alpha), -Math.sin(alpha), 0.0,
    0.0, Math.sin(alpha), Math.cos(alpha), 0.0,
    0.0, 0.0, 0.0, 1.0
];

My = [
    Math.cos(beta), 0.0, Math.sin(beta), 0.0,
    0.0, 1.0, 0.0, 0.0,
    -Math.sin(beta), 0.0, Math.cos(beta), 0.0,
    0.0, 0.0, 0.0, 1.0
];

Mz = [
    Math.cos(gamma), -Math.sin(gamma), 0.0, 0.0,
    Math.sin(gamma), Math.cos(gamma), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
];

    myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(myShaderProgram);

    Mxuni = gl.getUniformLocation(myShaderProgram, "Mx");
    Myuni = gl.getUniformLocation(myShaderProgram, "My");
    Mzuni = gl.getUniformLocation(myShaderProgram, "Mz");

    gl.uniformMatrix4fv( Mxuni, false, Mx);
    gl.uniformMatrix4fv( Myuni, false, My);
    gl.uniformMatrix4fv( Mzuni, false, Mz);

    gl.enable(gl.DEPTH_TEST);

    setupTetrahedron();
    render();
}

function setupTetrahedron() {
    // Tetrahedron vertices
    tetrahedronVertices = [
        vec4(0.0, 0.5, -Math.sqrt(3) / 6, 1.0),
        vec4(-0.5, -0.5, -Math.sqrt(3) / 6, 1.0),
        vec4(0.5, -0.5, -Math.sqrt(3) / 6, 1.0),
        vec4(0.0, 0.0, Math.sqrt(3) / 3, 1.0)
    ];

    // Tetrahedron colors
    tetrahedronColors = [
        vec4(1.0, 0.0, 0.0, 1.0), // Red
        vec4(0.0, 1.0, 0.0, 1.0), // Green
        vec4(0.0, 0.0, 1.0, 1.0), // Blue
        vec4(1.0, 1.0, 0.0, 1.0)  // Yellow
    ];

    // Tetrahedron faces (filled triangles)
    tetrahedronIndices = [
        0, 1, 2,
        0, 1, 3,
        1, 2, 3,
        2, 0, 3
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(tetrahedronVertices), gl.STATIC_DRAW);

    var myPosition = gl.getAttribLocation(myShaderProgram, "myPosition");
    gl.vertexAttribPointer(myPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(myPosition);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(tetrahedronColors), gl.STATIC_DRAW);

    var myColor = gl.getAttribLocation(myShaderProgram, "myColor");
    gl.vertexAttribPointer(myColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(myColor);

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(tetrahedronIndices), gl.STATIC_DRAW);
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var modelViewMatrix = mat4();
    modelViewMatrix = mult(modelViewMatrix, rotate(45, [1, 1, 1])); // Rotate the tetrahedron
    modelViewMatrix = mult(modelViewMatrix, scalem(0.5, 0.5, 0.5)); // Scale the tetrahedron

    var modelViewMatrixLoc = gl.getUniformLocation(myShaderProgram, "modelViewMatrix");
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    gl.drawElements(gl.TRIANGLES, tetrahedronIndices.length, gl.UNSIGNED_BYTE, 0);
}

// Add event listeners to detect keypresses
document.addEventListener("keydown", function(event) {
    if (event.key === 'x') {
        rotateAroundX();
    } else if (event.key === 'y') {
        rotateAroundY();
    } else if (event.key === 'z') {
        rotateAroundZ();
    }
});

function rotateAroundX(){
    //will implement this to rotate the shape around the x axis
    alpha = alpha + .1;
    Mx = [
        1.0, 0.0, 0.0, 0.0,
        0.0, Math.cos(alpha), -Math.sin(alpha), 0.0,
        0.0, Math.sin(alpha), Math.cos(alpha), 0.0,
        0.0, 0.0, 0.0, 1.0];

        gl.uniformMatrix4fv(Mxuni, false, Mx);
        render();
}
function rotateAroundY(){
    //will implement this to rotate the shape around the y axis
    beta = beta + .1;

    My = [
        Math.cos(beta), 0.0, Math.sin(beta), 0.0,
        0.0, 1.0, 0.0, 0.0,
        -Math.sin(beta), 0.0, Math.cos(beta), 0.0,
        0.0, 0.0, 0.0, 1.0
    ];

        gl.uniformMatrix4fv(Myuni, false, My);
        render();
}
function rotateAroundZ(){
    //will implement this to rotate the shape  on z axis
    gamma = gamma + .1;

    Mz = [
        Math.cos(gamma), -Math.sin(gamma), 0.0, 0.0,
        Math.sin(gamma), Math.cos(gamma), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];

        gl.uniformMatrix4fv(Mzuni, false, Mz);
        render();
}