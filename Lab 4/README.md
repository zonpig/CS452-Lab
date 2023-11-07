# Lab 4: Viewing and Lighting an Unknown Object

Done by:  
Bryan Lim

Req6  
Your README should discuss your implementation method. Your README should also name the object (i.e., you should provide its identity). If the object is an Eames chair, but you call it a chair because you did not know whether it is an Eames chair, a lawn chair, or a Poang chair, that is fine. But if the object is a chair, and you call it a house, you will lose points. No, the actual object is not a chair, that was just a hypothetical explanation. Your README should also discuss the process you employed to perform your ChatGPT investigation, including questions you asked, and output you received. You can share a screenshot as a separate image file, and write down the name of the screenshot in your README. Please include your name(s) in lab4.js and the README file.

## How to run

To load the object, you need to run a local host server. I used vite to run the local host server. To run the local host server, you need to install vite and run the following commands in the terminal. In addition, there are additional node modules installed to run three.js

```terminal commands
npm install
npx vite
```

## Object Identity

The object is a stone face statue/Moai.

# Implementaion Description

1. Camera  
   Look At Method (eye, at point, up vector)
   Orthographic projection & Perspective projection
   Orthographic projection is set by default

2. Light Source  
   Point light (set position) & Directional light (set direction)
   Phong shading for interpolated shading
   Point light is set by default

3. Specular Reflection  
   Ambient Reflection + Diffuse Reflection + (Specular Reflection)
   Specular reflection is included by default

## Implementation Method

To start with the lab, we set up the light source to ensure we can see the object first, we implemented the shading using Phong shading, which involves the interpolation of normals.

The point light source is implemented including the ambient reflection, diffuse reflection and specular reflection.
To turn each light on and off independently we moved to code of the point light source to a function called pointLight.

To add the directional light source, we just copied the code from the first light source and added a cutoff angle and a light direction location. To turn the second light on and off we used the function directionalLight.

In order to turn on/off the specular reflection we added a new varible to the HTML file called specularOn which can either be 1 or 0.
We change this variable in the lab4.js file when the button for specular is pressed.

After which, we move the camera to see provided object in a better angle. In order to do that we used a projectionMatrix and the modelViewMatrix. At the beginning, we just used the orthographic projection. In the lab4.js we added all the variables discussed in the slides like the eye, at, vup, etc. and tried different values to get a good view at the object. Arriving at the values we used in the end.

To change between perspective and ortographic projection we added some buttons to the html which call either the code for the orthographic or perspective projection. As well as for the perspective projection we also used the matrices discussed in the slides to get the orthographic projection.
For the projective transformation, we used an symmetric frustum.

## ChatGPT Investigation

At first, I tried tackling the chatGPT Implementation by using the recommended approach of asking ChatGPT to show you how to load a ply file and get access to the vertices and faces as individual arrays. From the process, I realised that when reading files in javascript, it is not possible to read files from the local file system. This is due to security reasons. Therefore, I had to host the files on a local host server. For the initial test, I used http-server but I found it troublesome to debug the code as it was not live reloading. Therefore, I switched to investigating the other approach of using Three.js.

The whole conversation with Chatgpt using the other approach can be accessed through Requirement 5.html. To start off the conversation, I copied and pasted the whole code and asked "How do I use THREE.js to load a ply file and get access to the vertices and faces as individual arrays?". After which, I continued to prompt ChatGpt to find a way to import THREE.js into lab4.js, which saw me changing the type of lab4.js to "module". While prompting ChatGpt, I also read up the documentation/example of PLYLoader on <https://github.com/mrdoob/three.js/blob/dev/examples/jsm/loaders/PLYLoader.js> and <https://sbcode.net/threejs/loaders-ply/>. Along the way, I attached the initGL() function to window.OnLoad as I realised that they were throwing me the error that "initGL() function not found".

After enough prompting, I managed to reach the point where I can retrieve the vertices and indexList. However, I realised the vertices where in a different format from object.js, which led me to write a function to convert the vertices to the same format as object.js. After doing all this, the last part would be to figure out on how to make the button function work with the local host method. Through prompting Chatgpt, I managed to find a way to make the button work with the local host method by exporting the functions and putting as script in the html file, accessing the DOM directly.

## Extra Credit Object

I loaded an ant object from <https://people.sc.fsu.edu/~jburkardt/data/ply/ply.html> and attached the screenshot of the ant (antPly.pngx) in the zip file.
