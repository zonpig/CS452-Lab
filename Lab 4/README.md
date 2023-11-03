# Lab 4: Viewing and Lighting an Unknown Object

Done by:

Bryan Lim

Req6)
Your README should discuss your implementation method. Your README should also name the object (i.e., you should provide its identity). If the object is an Eames chair, but you call it a chair because you did not know whether it is an Eames chair, a lawn chair, or a Poang chair, that is fine. But if the object is a chair, and you call it a house, you will lose points. No, the actual object is not a chair, that was just a hypothetical explanation. Your README should also discuss the process you employed to perform your ChatGPT investigation, including questions you asked, and output you received. You can share a screenshot as a separate image file, and write down the name of the screenshot in your README. Please include your name(s) in lab4.js and the README file.

## Object Identity

The object is a stone face statue/ Moai.

## Implementation Method

## ChatGPT Investigation

At first, I tried tackling the chatGPT Implementation by using the recommended approach of asking ChatGPT to show you how to load a ply file and get access to the vertices and faces as individual arrays. From the process, I realised that when reading files in javascript, it is not possible to read files from the local file system. This is due to security reasons. Therefore, I had to host the files on a local host server. For the initial test, I used http-server but I found it troublesome to debug the code as it was not live reloading. Therefore, I switched to investigating the other approach of using Three.js.

The whole conversation with Chatgpt using the other approach can be accessed through Requirement 5.html. To start off the conversation, I copied and pasted the whole code and asked "How do I use THREE.js to load a ply file and get access to the vertices and faces as individual arrays?". After which, I continued to prompt ChatGpt to find a way to import THREE.js into lab4.js, which saw me changing the type of lab4.js to "module". While prompting ChatGpt, I also read up the documentation/example of PLYLoader on <https://github.com/mrdoob/three.js/blob/dev/examples/jsm/loaders/PLYLoader.js> and <https://sbcode.net/threejs/loaders-ply/>. Along the way, I attached the initGL() function to window.OnLoad as I realised that they were throwing me the error that "initGL() function not found".

After enough prompting, I managed to reach the point where I can retrieve the vertices and indexList. However, I realised the vertices where in a different format from object.js, which led me to write a function to convert the vertices to the same format as object.js. After doing all this, the last part would be to figure out on how to make the button function work with the local host method. Through prompting Chatgpt, I managed to find a way to make the button work with the local host method by exporting the functions and putting as script in the html file, accessing the DOM directly.

## Extra Credit Object

I loaded an ant from <https://people.sc.fsu.edu/~jburkardt/data/ply/ply.html> and attached the screenshot of the ant (antPly.pngx) in the zip file.

## Order of Composing Transformaiton

Code practice material:
All material on Viewing, Lighting, and Lighting Continued.
Material at:
https://www.cs.unm.edu/~angel/BOOK/INTERACTIVE_COMPUTER_GRAPHICS/EIGHTH_EDITION/CODE/05/
(see 'ortho', and 'perspective')
Material at:
https://www.cs.unm.edu/~angel/BOOK/INTERACTIVE_COMPUTER_GRAPHICS/EIGHTH_EDITION/CODE/06/
(see 'shadedCube')

To work with this lab, make sure you download the following files into a single directory: lab4.html, lab4.js, object.js, object.ply, and include the Common folder one level above. Load the file 'lab4.html' in your browser. You should see a light gray canvas. Here's why: there is a big light gray object sitting right on top of the camera. The code in lab4.html and lab4.js does draw the object, but because it sits on top of the camera, you cannot see the object itself (imagine a big cave enclosing you, then you would not really see the outside of the cave. At the moment, the object is kind of like that cave).

In this draft version of the code, I have manually created the vertices and faces as array in object.js, so that you can start on writing viewing and lighting code without worrying about loading the 3D model. However, 3D models are never provided this way, and are defined using model file formats such as PLY and OBJ. For full credit, you need to replace the code that accesses the manual vertices and faces definitions from object.js with a block of code that loads the vertices and faces from the PLY file, 'object.ply'. For this, you will be exploring the use of ChatGPT, as discussed further in Req5 below.

You need to fulfill the following requirements for this lab:-

Req1) Set up the camera position using the look at method. You must position your camera so that you can reveal the identity of your object. Note: you are NOT permitted to use the lookAt() function provided by the authors in MV.js for this lab.

Req2) Implement two buttons, one that creates a camera with orthographic projection called 'Orthographic', and one that creates a camera with perspective projection called 'Perspective'. You must use set up projection matrices for each type of projection. For the projective transformation, you are free to choose either an asymmetric or a symmetric frustum. For the symmetric frustum, you are free to specify right, top, near, and far planes, or near plane, far plane, aspect ratio, and field of view in y. Note: you are NOT permitted to use the functions ortho(), frustum(), and perspective() provided by the authors in MV.js for this lab.

Req3) Implement two buttons that each switch on and switch off two different lights. Each light must have ambient, diffuse, and specular components. You can choose between point light source, spotlight, and directional light source. One button should switch on or off one kind of light source, and the other should switch on a different kind of light source. Example: LightButton1 can switch on and switch off a point light source. LightButton2 can switch on and switch off a spotlight source. If you use a spotlight and a point light source, they should each be at different locations from each other. Using LightButton1 and LightButton2, I should be able to switch on both lights, or just one of the lights, or switch off all lights.

For this lab, you are not permitted to use ambient light source on its own (if you want, you can use it in conjunction with another light source).

Req4) Implement one button that toggles the specular reflection output, called 'Specular'. When switched on (i.e., when you press the button an odd number of times), the object should have ambient, diffuse, and specular reflection. When switched off (i.e., when you press the button an even number of times), the object should have just ambient and diffuse reflection. When showing specular reflection, your chosen viewpoint should reveal specular highlights on the object.

The object must have interpolated shading, and not flat shading. You can choose whether you interpolate colors or normals, i.e., whether you implement Gouraud shading or whether you implement Phong shading.

The lab is fairly challenging so get started soon! At the moment, the object is not set up for you to see its identity that easily. In particular, it will be hard for you to set up your camera before you set up your lights and object materials: without light, it is nearly impossible to tell what is the front of the object and what is the back of the object. As a hint: when setting up your camera with the look at method, it is easier to have your 'at' point as the center of the object, which is currently at the origin (you will not really be observing the center point, but it is a good anchor point to set up your camera coordinate system). Once you have your lights, you will need to try out a variety of eye points to assist you with revealing your object.

Scoring Rubric (out of 20 points, scaled down to 6; 2 points are added separately for extra credit, i.e., with extra credit you would be eligible for a total of 6+2 or 8 points)

1. 4 points for setting up the camera using the look at method to reveal the identity of the object. These points include identifying the object in the README.
2. 4 points for implementing orthographic and perspective projections.
3. 4 points for implementing two different lights.
4. 4 points for implementing specular and non-specular toggle.
5. 3 points for loading the file from the PLY through ChatGPT-based self-investigation. Partial credit will be awarded if you do not succeed, but can describe your process of getting assistance from ChatGPT when you did not succeed and what happened as a result. Partial credit will be dependent on still being successful in showing your output for portions 1 to 4 with object.js.
6. 1 points for discussing your implementation in the README, as per Req6 above.
   Extra Credit: 2 points separately to the scaled down grade.
