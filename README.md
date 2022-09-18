### Install
"Install 'Live server' extension from vs code"

### Run
* Right click on PixCap.html and open with Live Server
* Go to `localhost:8080` in the web browser

### Environment
The provided `pixCap.html` script loads a simple three.js scene and adds three primitive objects: Cylinder, Cube, IcoSphere.

#### Task 1) UI & Primitive Meshes
Selecting a mesh should bring up a UI window with primitives parameters adjustment. 
You can choose any library or plain HTML to implement the following UI
When a primitive mesh is selected, the UI should display options specific for the selected primitive. It should be possible to set:
* For the *Cube*: 3 dimensions: width, height, depth (range 0.1-2.0)
* For the *Cylinder*: Diameter and height (range 0.1-2.0)
* For the *IcoSphere*: Diameter (range 0.1-2.0) and subdivisions (range 1-10)

#### Task 1 Solution
Click on any one of the mesh, the color changes from default to red 
below the scene, there is a form which is editable and ranges are given there 
change the range for width, height, depth, diameter type of paramaters and click "submit"
This should get us the required new shape

#### Task 2) Bouncing Animation
Implement the following algorithm:
`applyBouncing(node: TransformNode, amplitude: number, duration: time)`

where
* `node` - an object which should play this animation
* `amplitude` - the start height of the bounce.
* `"duration` - Period of time in ms from the start of the animation when the object is at the topmost point to the end of the animation when the object has completely stopped. E.g. if duration is 2 seconds the whole animation should finish in 2 seconds i.e. it will be twice as fast vs if duration is 4 seconds. But the overall animation is the same.

#### Task 2 Solution
Click on any one of the mesh, the color changes from default to red 
below the form, there is a botton named as bounce(animation), CLicking on this button would do the animation
I used tween.js for this animation, however there were other solutions present on internet such as "https://medium.com/geekculture/learning-three-js-1-how-to-create-a-bouncing-ball-5f423a629e59" I decided to try by my own. I was not able to make this work out for 2nd bounce. Will work on it 


The result of this animation should roughly match the following video:(https://www.youtube.com/watch?v=a7oSbf8NiLw)

Please implement this on a mesh in the scene e.g. a sphere, so that the animation can be viewed