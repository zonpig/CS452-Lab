# Lab 1: Drawing Shapes

Done by:

Mustapha Jom - Drew Hexagon and inserted it into Lab1.html and Lab1.js  
Bryan Lim - Drew Triangle and Ellipse and inserted them into Lab1.html and Lab1.js

The program draws three shapes: A triangle, a hexagon, and an ellipse. The triangle is drawn with gl.LINE_LOOP, the
hexagon and ellipse are drawn with gl.TRIANGLE_FAN. The points for the triangle is generated manually, the ellipse uses the requisite formula, with a precision of 256 points and the hexagon uses a similar formula, with a precision of 6 points.

The program uses three functions to draw the shapes: drawTriangle, drawHexagon, and drawEllipse. Each function takes in a gl object, a program object, and a color array. The functions then bind the color array to the program, and then draw the shape using the appropriate gl.drawArrays call. The functions share the same vertex and fragment shaders, which are stored in Lab1.html.
