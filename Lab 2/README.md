# Lab 2: Drawing Shapes

Done by:

Mustapha Jom - Made the shape jump using mouse clicks. Did rotate and stop rotate.
Bryan Lim - Animation of the Square. Implemented direction change using 'a', 's', 'd', and 'w' and increasing and decreasing the speed features.

For Lab 2, we started off with using the code from Lecture 4: Animation and Interaction as the base. The code from Lecture 4 has already implemented the following features:

- Drawing a square (Rubric 1)
- Making the square jump with mouse clicks (Rubric 4)
- Rotation and Stop Rotation of the Square (Rubric 5)
- Nudging of the Square using 'a', 's', 'd', and 'w' (Part of Rubric 2)

Hence, the sample code from Lecture 4 has already helped us implement rubric 1,4,5 and part of rubric 2.
We modified the nudging code logic to be shifted to the render function instead as this would ensure the at the square would continuouly move in the direction that the user wants it to move in.
For the last Rubric 3, we implemented two function increaseSpeed and decreaseSpeed to
modify the stepScale variable. This would increase or decrease the speed of the square. if Statements were used to ensure that the speed would not go below 0 as it would have caused the square to move backwards.

All the above edits are on the js file. As for the html file, we added a button to increase the speed and a button to decrease the speed. We also seperated the start/stop rotate button to two buttons, one for start and one for stop.
