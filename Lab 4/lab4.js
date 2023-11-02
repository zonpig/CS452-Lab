// Name:
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

var gl;
var numVertices;
var numTriangles;
var orthographicIsOn;
var orthographicIsOnLocation;
var addPointLight;
var addPointLightLocation;
var addDirectionalLight;
var addDirectionalLightLocation;
var specularOn;
var specularOnLocation;
var myShaderProgram;
var vertices = [];
var indexList;

function initGL() {
  var canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  gl.enable(gl.DEPTH_TEST);
  gl.viewport(0, 0, 512, 512);
  gl.clearColor(0.8, 0.8, 0.0, 1.0);

  myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(myShaderProgram);

  // The following block of code together with the
  // definitions in object.js are provided for diagnosis
  //
  // For full credit, REPLACE THE FOLLOWING BLOCK with
  // a block that loads the vertices and faces from the provided ply file
  // You are encouraged to explore THREE.js by using ChatGPT
  // to investigate how to load a PLY file and get
  // access to the vertices and faces
  //

  // vertices = getVertices(); // currently defined in object.js
  // indexList = getFaces();

  readPLYFile("object.ply", function () {
    // This code will be executed after the PLY file is loaded
    console.log(vertices);
    console.log(vertices);
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indexList),
      gl.STATIC_DRAW
    );

    var verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vertexPosition = gl.getAttribLocation(
      myShaderProgram,
      "vertexPosition"
    );
    gl.vertexAttribPointer(vertexPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);

    // Insert your code here
    var faceNormals = getFaceNormals(vertices, indexList, numTriangles);
    var vertexNormals = getVertexNormals(
      vertices,
      indexList,
      faceNormals,
      numVertices,
      numTriangles
    );

    var normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);

    var vertexNormal = gl.getAttribLocation(myShaderProgram, "nv");
    gl.vertexAttribPointer(vertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexNormal);

    // Side View
    //   var eye = vec3(-90.0, 35.0, -50.0); // eye
    //Front View
    var eye = vec3(0.0, 35.0, -90.0); // eye
    var at = vec3(0.0, 0.0, 0.0); // at point
    var vup = vec3(0.0, 1.0, 0.0); // up vector

    var n = normalize(vec3(eye[0] - at[0], eye[1] - at[1], eye[2] - at[2]));
    var u = normalize(cross(vup, n));
    var v = normalize(cross(n, u));

    var M = [
      u[0],
      v[0],
      n[0],
      0.0,
      u[1],
      v[1],
      n[1],
      0.0,
      u[2],
      v[2],
      n[2],
      0.0,
      -dot(eye, u),
      -dot(eye, v),
      -dot(eye, n),
      1.0,
    ];

    var Minvt = [
      u[0],
      v[0],
      n[0],
      eye[0],
      u[1],
      v[1],
      n[1],
      eye[1],
      u[2],
      v[2],
      n[2],
      eye[2],
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    var rightPlane = 3.0;
    var leftPlane = -rightPlane;
    var topPlane = 3.0;
    var bottomPlane = -topPlane;
    var nearPlane = 100.0 - 50.0;
    var farPlane = 100.0 + 50.0;

    var P_orth = [
      2.0 / (rightPlane - leftPlane),
      0.0,
      0.0,
      0.0,
      0.0,
      2.0 / (topPlane - bottomPlane),
      0.0,
      0.0,
      0.0,
      0.0,
      -2.0 / (farPlane - nearPlane),
      0.0,
      -(rightPlane + leftPlane) / (rightPlane - leftPlane),
      -(topPlane + bottomPlane) / (topPlane - bottomPlane),
      -(farPlane + nearPlane) / (farPlane - nearPlane),
      1.0,
    ];

    var P_persp = [
      (2.0 * nearPlane) / (rightPlane - leftPlane),
      0.0,
      0.0,
      0.0,
      0.0,
      (2.0 * nearPlane) / (topPlane - bottomPlane),
      0.0,
      0.0,
      (rightPlane + leftPlane) / (rightPlane - leftPlane),
      (topPlane + bottomPlane) / (topPlane - bottomPlane),
      -(farPlane + nearPlane) / (farPlane - nearPlane),
      -1.0,
      0.0,
      0.0,
      (-2.0 * farPlane * nearPlane) / (farPlane - nearPlane),
      0.0,
    ];

    var Muniform = gl.getUniformLocation(myShaderProgram, "M");
    gl.uniformMatrix4fv(Muniform, false, M);
    var Minvtuniform = gl.getUniformLocation(myShaderProgram, "Minvt");
    gl.uniformMatrix4fv(Minvtuniform, false, Minvt);
    var Pouniform = gl.getUniformLocation(myShaderProgram, "P_orth");
    gl.uniformMatrix4fv(Pouniform, false, P_orth);
    var Ppuniform = gl.getUniformLocation(myShaderProgram, "P_persp");
    gl.uniformMatrix4fv(Ppuniform, false, P_persp);

    orthographicIsOn = 1;
    orthographicIsOnLocation = gl.getUniformLocation(
      myShaderProgram,
      "orthIsOn"
    );
    gl.uniform1f(orthographicIsOnLocation, orthographicIsOn);

    ////////////// 1st (Point Light Source) //////////////

    // Set up coefficients for the object (ambient, diffuse, specular, shininess)

    var p0 = [0.0, 0.0, -10.0]; // only for Point Light Source

    var Ia = [0.1, 0.1, 0.1];
    var Id = [0.8, 0.8, 0.8];
    var Is = [0.8, 0.8, 0.8];

    var ka = [0.5, 0.5, 0.5];
    var kd = [0.5, 0.5, 0.5];
    var ks = [1.0, 1.0, 1.0];

    var alpha = 4.0;

    // send coefficients to the shader program

    var p0loc = gl.getUniformLocation(myShaderProgram, "p0");
    var Ialoc = gl.getUniformLocation(myShaderProgram, "Ia");
    var Idloc = gl.getUniformLocation(myShaderProgram, "Id");
    var Isloc = gl.getUniformLocation(myShaderProgram, "Is");
    var kaloc = gl.getUniformLocation(myShaderProgram, "ka");
    var kdloc = gl.getUniformLocation(myShaderProgram, "kd");
    var ksloc = gl.getUniformLocation(myShaderProgram, "ks");
    var alphaloc = gl.getUniformLocation(myShaderProgram, "alpha");

    gl.uniform3fv(p0loc, p0);
    gl.uniform3fv(Ialoc, Ia);
    gl.uniform3fv(Idloc, Id);
    gl.uniform3fv(Isloc, Is);
    gl.uniform3fv(kaloc, ka);
    gl.uniform3fv(kdloc, kd);
    gl.uniform3fv(ksloc, ks);
    gl.uniform1f(alphaloc, alpha);

    ////////////// 2nd (Directional Light) //////////////

    // Set up coefficients for the object (ambient, diffuse, specular, shininess)

    var direction = [0.0, 10.0, 10.0];

    var Ia2 = [0.2, 0.1, 0.2];
    var Id2 = [0.7, 0.5, 0.7];
    var Is2 = [0.8, 0.8, 0.8];

    var ka2 = [0.5, 0.5, 0.5];
    var kd2 = [0.5, 0.5, 0.5];
    var ks2 = [1.0, 1.0, 1.0];

    var alpha2 = 3.0;

    // send coefficients to the shader program

    var Ia2loc = gl.getUniformLocation(myShaderProgram, "Ia2");
    var Id2loc = gl.getUniformLocation(myShaderProgram, "Id2");
    var Is2loc = gl.getUniformLocation(myShaderProgram, "Is2");
    var ka2loc = gl.getUniformLocation(myShaderProgram, "ka2");
    var kd2loc = gl.getUniformLocation(myShaderProgram, "kd2");
    var ks2loc = gl.getUniformLocation(myShaderProgram, "ks2");
    var directionLoc = gl.getUniformLocation(myShaderProgram, "direction");
    var alpha2loc = gl.getUniformLocation(myShaderProgram, "alpha2");

    gl.uniform3fv(Ia2loc, Ia2);
    gl.uniform3fv(Id2loc, Id2);
    gl.uniform3fv(Is2loc, Is2);
    gl.uniform3fv(ka2loc, ka2);
    gl.uniform3fv(kd2loc, kd2);
    gl.uniform3fv(ks2loc, ks2);
    gl.uniform3fv(directionLoc, direction);
    gl.uniform1f(alpha2loc, alpha2);

    addPointLight = 1;
    addPointLightLocation = gl.getUniformLocation(
      myShaderProgram,
      "addPointLight"
    );
    gl.uniform1f(addPointLightLocation, addPointLight);

    addDirectionalLight = 0;
    addDirectionalLightLocation = gl.getUniformLocation(
      myShaderProgram,
      "addDirectionalLight"
    );
    gl.uniform1f(addDirectionalLightLocation, addDirectionalLight);

    specularOn = 1;
    specularOnLocation = gl.getUniformLocation(myShaderProgram, "specularOn");
    gl.uniform1f(specularOnLocation, specularOn);
    //

    drawObject();
  });

  // End of block on reading vertices and faces that you should replace
}

window.onload = initGL;

function readPLYFile(filename, callback) {
  const loader = new PLYLoader();
  loader.load(filename, function (geometry) {
    const original_vertices = geometry.attributes.position.array; // Array of vertices
    for (let i = 0; i < original_vertices.length; i += 3) {
      const x = original_vertices[i];
      const y = original_vertices[i + 1];
      const z = original_vertices[i + 2];
      const w = 1.0;
      vertices.push(vec4(x, y, z, w));
    }
    indexList = geometry.index.array; // Array of faces (indices)
    numVertices = vertices.length;
    numTriangles = indexList.length / 3;

    // Call the callback function to indicate that the file has been loaded
    callback();
  });
}

function getFaceNormals(vertices, indexList, numTriangles) {
  var faceNormals = [];
  for (var i = 0; i < numTriangles; i++) {
    var x0 = vertices[indexList[3 * i]];
    var x1 = vertices[indexList[3 * i + 1]];
    var x2 = vertices[indexList[3 * i + 2]];

    var v01 = subtract(x1, x0);
    var v02 = subtract(x2, x0);

    var normal = normalize(cross(v01, v02));

    faceNormals.push(normal);
  }
  return faceNormals;
}

function getVertexNormals(
  vertices,
  indexList,
  faceNormals,
  numVertices,
  numTriangles
) {
  var vertexNormals = [];
  for (var j = 0; j < numVertices; j++) {
    var nv = vec3(0.0, 0.0, 0.0);
    for (var i = 0; i < numTriangles; i++) {
      var i0 = indexList[3 * i];
      var i1 = indexList[3 * i + 1];
      var i2 = indexList[3 * i + 2];
      if ((j === i0) | (j === i1) | (j === i2)) {
        nv[0] = nv[0] + faceNormals[i][0];
        nv[1] = nv[1] + faceNormals[i][1];
        nv[2] = nv[2] + faceNormals[i][2];
      }
    }
    nv = normalize(nv);
    vertexNormals.push(nv);
  }
  return vertexNormals;
}

export function showOrthographic() {
  orthographicIsOn = 1;
  orthographicIsOnLocation = gl.getUniformLocation(myShaderProgram, "orthIsOn");
  gl.uniform1f(orthographicIsOnLocation, orthographicIsOn);
}

export function showPerspective() {
  orthographicIsOn = 0;
  orthographicIsOnLocation = gl.getUniformLocation(myShaderProgram, "orthIsOn");
  gl.uniform1f(orthographicIsOnLocation, orthographicIsOn);
}

export function pointLight() {
  if (addPointLight === 1) {
    addPointLight = 0;
  } else {
    addPointLight = 1;
  }
  gl.uniform1f(addPointLightLocation, addPointLight);
}

export function directionalLight() {
  if (addDirectionalLight === 1) {
    addDirectionalLight = 0;
  } else {
    addDirectionalLight = 1;
  }
  gl.uniform1f(addDirectionalLightLocation, addDirectionalLight);
}

export function includeSpecular() {
  if (specularOn === 1) {
    specularOn = 0;
  } else {
    specularOn = 1;
  }
  gl.uniform1f(specularOnLocation, specularOn);
}

function drawObject() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, 3 * numTriangles, gl.UNSIGNED_SHORT, 0);
  requestAnimFrame(drawObject);
}
