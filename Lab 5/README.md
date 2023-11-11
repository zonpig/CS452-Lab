# Lab 3: 3D Transforms

Done by:

Mustapha Jom - Made the tetrahedron, made the tetrahedron have interpolated colors on the faces, and made the rotation functions.

Bryan Lim - Implemented Scaling, Translations and composition of the various transformations.

## Key Bindings

We have implemented the following key bindings for different transformations:

- 'z': Rotate Around X
- 'x': Rotate Around Y
- 'c': Rotate Around Z
- 'a': Scale Up on X
- 'd': Scale Down on X
- 'w': Scale Up on Y
- 's': Scale Down on Y
- 'j': Translate Left on X
- 'l': Translate Right on X
- 'i': Translate Up on Y
- 'k': Translate Down on Y

The Rotation (zxc) key bindings are on in one row as they only rotate in one direction. While for the Scaling (wasd) and Translation (ijkl) key bindings, they are in a manner such they resemble the arrow keys on a keyboard.

## Implementation

For Lab 3, we started by using RotatingCube.js, RotatingCube.html as our basis.  
Once we had that set up we decided to use a tetrahedron. Another consideration made was to have the various rotations, scaling and translations matrices in the vertex shader in the html file instead of the javascript file. This was done to make it easier to understand the code and implement the various transformations.

## Transformation Amount

I rotate, scale, and translate by 0.1f, or 5% (since the range is -1.0 to 1.0), per input. This is per keypress, or if the key is held for a short while, roughly 60 times per second.

## Order of Composing Transformaiton

We are composing the transformation in the below order:  
position -> scale -> rotate X -> rotate Y -> rotate Z -> translate

After experimenting and googling online (https://computergraphics.stackexchange.com/questions/4193/what-is-the-correct-order-of-transformations-scale-rotate-and-translate-and-why), we chose the above order as the order allows for the scaling to happen along the axis of the object and rotation about the center of the object.
