
*Run Locally to Load Textures*

*Made in collaboration with Hank Alderoty, Kobe Darko, and Isabel Kraus*

Game Description

Jug Run is a game inspired by the popular Hamilton bar, The Old Stone Jug, and the sometimes brutal trip back to one’s dormitory, apartment, or house during a cold winter’s night. In Jug Run this experience is exaggerated and the game’s hero, The Student, is running home to the townhouses while their health is constantly depleting due to the cold. If the health reaches zero the player has lost, but if they are able to make it all the way to the townhouse, they win. The player has to dodge cruisers, avoid snow banks, and pick up jackets and slices to keep their health up. 
Jug Run is played on a road resembling Broad Street. The Student can move between four lanes: two road lanes and a sidewalk on either side. While The Student never moves in the animated world it appears they are due to movement of objects such as street cracks, lamps, and houses moving along the z-axis until exiting the bottom of the canvas. The area is illuminated by a dim ambient light, spotlights in the street lamps, and headlights on the front of the cruisers.

References 

	•	Boxy Run 
	◦	https://github.com/wanfungchui/Boxy-Run 
	•	Ski The Hill 
	◦	https://www.cs.colgate.edu/~efourquet/cosc435/gallery/emrys-ski-hill/ 
	•	Climb The Hill 
	◦	https://www.cs.colgate.edu/~efourquet/cosc435/gallery/climb-the-hill/ 
	•	Mystery 
	◦	https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/ 
	•	Exploring Animation And Interaction Techniques With WebGL 
	◦	https://www.smashingmagazine.com/2017/09/animation-interaction-techniques-webgl/ 


Original and New Objectives

	1.	Users will play as The Student  
	1.	The Student will not be seen from the front making modeling easier 
	2.	The Student has to be able to stand still, run forward, and jump side-to-side 
	2.	The Student is running along a road and sidewalks  
	1.	The road has two lanes and a sidewalk on either side  
	2.	4 lanes total for The Student to run on 
	3.	This object has to be designed so that it can be repeated and look like one flowing road  
	4.	We may use animation to mimic a moving road - we can have a dotted yellow line running down the center of the road, so yellow rectangles are moving down the screen to look like The Student is running down the road 
	3.	The Student’s health will be tracked on the House Counter 
	1.	The Health Counter starts at 100 and decreases by a specific increment that changes depending on the chosen difficulty 
	2.	If the Health Counter gets to 0 the game is over and the players has lost 
	4.	While health is always draining, if The Student picks up a slice or jacket then their health bar will be pushed up a certain amount 
	1.	Slices will have simple designs and be placed in any line 
	2.	The jackets will be random colors 
	3.	Jackets won’t push Health up, but instead slow down the rate that health is draining 
	5.	In the same fashion, if The Student hits a snow pile or cruiser then their health will be pushed down a certain amount  
	1.	Snow piles will have simple designs and will only be placed on sidewalks 
	2.	The cruisers will only drive down the road lanes, one moving up the display and the other moving down 
	3.	The player has to watch for headlights to dodge the cruiser that spawns quickly from the bottom of the screen 
	4.	We will use collision boxes to manage the collision of the student with snow piles or cruisers 
	6.	In the game The Student will be running by randomly generated houses  
	7.	In the game The Student will run by Taylor Lake  
	8.	There will be distance-marker signs that mark the beginning, middle, and end of the run 
	9.	During the game there will be snow falling  
	1.	The actual snow is going to be a simple model, small white cubes with alpha blending to make some look more transparent than others 
	10.	There will be three different difficulties: flurries, heavy snowfall, and blizzard 
	1.	When the difficulty is increased The Student’s health decreases faster and more snow banks are generated 



Game Specifications

* The game is run on GOOGLE CHROME
* The following keys are bound to certain movements and commands
	* P = PAUSE, stops all movement and actions within the game environment
	* LEFT, RIGHT KEYS = MOVEMENT, moves the student left to right
	* UP KEY = JUMP, makes the student leap into the air, avoiding obstacles
* The game can be restarted through the GUI control panel in the top right side of the screen. Players can change the difficulty between flurries, heavy snowfall, or blizzard which affects how fast The Student’s health decreases, the amount of snow banks in the game, and the probability of objects spawning
