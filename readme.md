
*Run Locally to Load Textures*

*Made in collaboration with Hank Alderoty, Ignacio Bernaldez, and Isabel Kraus*

Game Description

Jug Run is an "Endless Runner" browser game created using webGL, JavaScript, HTML, and CSS. It is inspired by the popular Hamilton, New York bar, The Old Stone Jug, and the sometimes brutal trip back to one’s dormitory, apartment, or house during a cold winter’s night. In Jug Run this experience is exaggerated and the game’s hero, The Student, is running home to the townhouses while their health is constantly depleting due to the cold. If the health reaches zero the player has lost, but if they are able to make it all the way to the townhouse, they win. The player has to dodge cruisers, avoid snow banks, and pick up jackets and slices to keep their health up. 
Jug Run is played on a road resembling Broad Street. The Student can move between four lanes: two road lanes and a sidewalk on either side. While The Student never moves in the animated world it appears they are due to movement of objects such as street cracks, lamps, and houses moving along the z-axis until exiting the bottom of the canvas. The area is illuminated by a dim ambient light, spotlights in the street lamps, and headlights on the front of the cruisers.

References 

	•	Boxy Run
	◦	https://github.com/wanfungchui/Boxy-Run
	•	Ski The Hill
	◦	https://www.cs.colgate.edu/~efourquet/cosc435/gallery/emrys-ski-hill/
	•	Climb The Hill
	◦	https://www.cs.colgate.edu/~efourquet/cosc435/gallery/climb-the-hill/
	•	The Aviator
	◦	https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
	•	Exploring Animation And Interaction Techniques With WebGL
	◦	https://www.smashingmagazine.com/2017/09/animation-interaction-techniques-webgl/


Initial and New Objectives

	1.	Users will play as The Student.
	2.	The Student will not be seen from the front making modeling easier.
	3.	The Student has to be able to stand still, run forward, and jump side-to-side.
	4.	There are two road lanes and a sidewalk on each side for The Student to run on. 
	5.	We may use animation to mimic a moving road - we can have a dotted yellow line running. down the center of the road, so yellow rectangles are moving down the screen to look like The Student is running down the road.
	6.	The Student’s health will be tracked by the Health Counter.
	7.	The Health Counter starts at 100 and decreases by a specific increment that changes depending on the chosen difficulty.
	8.	If the Health Counter gets to 0, the game is over and the players has lost.
	9.	While health is always draining, if The Student picks up a slice or jacket then their health bar will be pushed up a certain amount.
	10.	Slices will have simple designs and be placed in any line
	11.	The jackets will be random colors.
	12.	Jackets won’t push Health up, but instead slow down the rate that health is draining.
	13.	In the same fashion, if The Student hits a snow pile or cruiser then their health will be pushed down a certain amount. 
	14.	Snow piles will have simple designs and will only be placed on sidewalks.
	15.	The cruisers will only drive down the road lanes, one moving up the display and the other moving down.
	16.	The player has to watch for headlights to dodge the cruiser that spawns quickly from the bottom of the screen.
	17.	We will use collision boxes to manage the collision of the student with snow piles or cruisers.
	18.	In the game The Student will be running by randomly generated houses. 
	19.	In the game The Student will run by Taylor Lake. 
	20.	There will be distance-marker signs that mark the beginning, middle, and end of the run.
	21.	During the game there will be snow falling. 
	22.	The actual snow is going to be a simple model, small white cubes with alpha blending to make some look more transparent than others.
	23.	There will be three different difficulties: flurries, heavy snowfall, and blizzard.
	24.	When the difficulty is increased The Student’s health decreases faster and more snow banks are generated.



Game Specifications

* The game is run on GOOGLE CHROME
* The following keys are bound to certain movements and commands
	* P = START GAME/PAUSE : Starts the game from the Main Menu, or brings up the Pause Menu
	* LEFT, RIGHT KEYS = MOVEMENT, moves the student left to right
	* UP KEY = JUMP, makes the student leap into the air, avoiding obstacles
* Players can change the difficulty between flurries, heavy snowfall, or blizzard in the Pause Menu. This affects how fast The Student’s health decreases along with the probabilities of certain objects spawning.
