
/*  Create the scene graph.  This function is called once, as soon as the page loads.
*  The renderer has already been created before this function is called.
*/

function createScene() {
   // Set background color.
   //renderer.setClearColor( 0xBBBBBB );
   container = document.getElementById('world');
   scene = new THREE.Scene();

   // create a camera, sitting on the positive z-axis.  The camera is not part of the scene.
   camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
   camera.position.set(0,100,400);
   camera.lookAt(new THREE.Vector3(0, 1000, -10000 ));
   window.camera = camera;

   renderer = new THREE.WebGLRenderer();

   var element = renderer.domElement;
   renderer.setSize( window.innerWidth, window.innerHeight );
   container.appendChild( element );
   controls = new THREE.OrbitControls( camera, renderer.domElement );

   gui = new dat.GUI();
   gui.closed = true;
   parameters = {
     difficulty: "Flurries",
     restart: function() {resetGame(parameters.difficulty); gui.closed = true;}
   };

   var difficulty = gui.add(parameters, 'difficulty', ['Flurries','Heavy Snowfall', 'Blizzard']).name('Difficulty').listen();
   difficulty.onChange(function(value){
     resetGame(value);
     parameters.difficulty = value;
     //gui.closed = true;
   });

   gui.add( parameters, 'restart' ).name("Restart Game");


   // dim light shining from above
   scene.add( new THREE.AmbientLight( 0xffffff, .4) );
   // a light to shine in the direction the camera faces
   var viewpointLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
   viewpointLight.position.set(0,0,1);  // shines down the z-axis
   scene.add(viewpointLight);
   scene.fog = new THREE.Fog(colors.black ,1, roadLength);

   createSkyBox();
   createGround();
   createCracks();
   createLamps();
   createHouses();
   createSnowfall();

   student.position.set(50,30 ,0);
   student.rotation.set(radians(90),0,0);
   rotateObject(student,0,radians(180),0)
   scaleObject(student,7,7,10);
   scene.add(student);

   var axleModel1 = createAxle();
   cruiser1 = createCar(axleModel1);
   rotateObject(cruiser1,0,radians(-90),0);
   scaleObject(cruiser1,25,25,25);
   cruiser1.position.set(-50,18,-6000);
   cruiser1.width = 48;
   cruiser1.length = 233;
   cruiser1.height = 100;
   cruiser1.driving = false;
   scene.add(cruiser1);

   var axleModel2 = createAxle();
   cruiser2 = createCar(axleModel2);
   cruiser2.width = 48;
   cruiser2.length = 235;
   cruiser2.height = 100;
   cruiser2.driving = false;
   rotateObject(cruiser2,0,radians(90),0);
   scaleObject(cruiser2,25,25,25);
   cruiser2.position.set(50,18,-6000);
   scene.add(cruiser2);

   for (var i = 0; i < game.maxJackets; i++){
     var jacket = createJacket();
     jacket.position.set(50,0,2000);
     rotateObject(jacket,0,radians(45),0);
     scaleObject(jacket,7,4,7);
     jacket.width = 50;
     jacket.length = 50;
     jacket.height = 3;
     jacket.checked= false;
     jackets.push(jacket);
     scene.add(jacket);
   }

   for (var i = 0; i < game.maxSlices; i++){
     var slice = createSlice();
     slice.position.set(-50,0,2000);
     rotateObject(slice,radians(-90),0,radians(-45));
     scaleObject(slice,10,10,10);
     slice.width = 20;
     slice.length = 20;
     slice.height = 2;
     slice.checked= false;
     slices.push(slice);
     if (i > game.maxSlices - 3){
       slice.position.z = Math.random() * -6000;
       slice.position.x = game.xPosArray[Math.floor(Math.random()*4)];
       if (slice.position.x == Math.abs(125)){
         slice.position.y = 6;
       } else{
         slice.position.y = 0;
       }
     }
     scene.add(slice);
   }

   taylorLake = createLake();
   taylorLake.position.set(-500,2 , -3000);
   scaleObject(taylorLake, 85, 10, 35);
   rotateObject(taylorLake,0,radians(-90),0);
   scene.add(taylorLake);


   // leavingJug = createJugSign();
   // leavingJug.position.set(-275, 30 , -75);
   // scaleObject(leavingJug, 15, 10, 10);
   // scene.add(leavingJug);
   //
   // halfwayPoint = createHalfway();
   // halfwayPoint.position.set(-275, 30 , -6000);
   // scaleObject(halfwayPoint, 15, 10, 10);
   // scene.add(halfwayPoint);
   //
   // lastSign = createEndSign();
   // lastSign.position.set(-275, 30 , -5500);
   // scaleObject(lastSign, 15, 10, 10);
   // scene.add(lastSign);

   var snowbankAngles = [0, 180]
   var snowbankAnglesRand = snowbankAngles[Math.floor(Math.random() * 2)];
   for (var i = 0; i < game.maxSnowbanks; i++){
     var snowbank = createSnowbank();
     var height = Math.floor(Math.random() * 10) + 5;
     scaleObject(snowbank,5,height,10);
     rotateObject(snowbank,0,radians(snowbankAnglesRand),0);
     if (i < game.maxSnowbanks/2){
       snowbank.position.set(-125,-height,1000);
     } else{
       snowbank.position.set(125,-height,1000);
     }
     snowbank.width = 40;
     snowbank.length = 50;
     snowbank.height = height;
     snowbank.checked = false;
     snowbanks.push(snowbank);
     scene.add(snowbank);
   }

   // start = createStartMessage();
   // scaleObject(start,25,25,25);
   // start.position.y = 60;
   // start.position.z = 100;
   // scene.add(start);
   //
   // lost = createLosingMessage();
   // lost.position.y = 60;
   // lost.position.z = 1000;
   // scaleObject(lost,25,25,25);
   // scene.add(lost);
   //
   //
   // won = createWinningMessage();
   // won.position.set(0,60,1000);
   // scaleObject(won,25,25,25);
   // scene.add(won);

   //renderer.compile(scene, camera); //ASK LATER
   //doFrame();
}

// function createScene() {
//    // Set background color.
//    //renderer.setClearColor( 0xBBBBBB );
//    container = document.getElementById('world');
//    scene = new THREE.Scene();
//
//    // create a camera, sitting on the positive z-axis.  The camera is not part of the scene.
//    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
//    camera.position.set(0,100,400);
//    camera.lookAt(new THREE.Vector3(0, 1000, -10000 ));
//    window.camera = camera;
//
//    renderer = new THREE.WebGLRenderer( { antialias: true } );
//
//    var element = renderer.domElement;
//    renderer.setSize( window.innerWidth, window.innerHeight );
//    container.appendChild( element );
//    controls = new THREE.OrbitControls( camera, renderer.domElement );
//
//    gui = new dat.GUI();
//    gui.closed = true;
//    parameters = {
//      difficulty: "Flurries",
//      restart: function() {resetGame(parameters.difficulty); gui.closed = true;}
//    };
//
//    var difficulty = gui.add(parameters, 'difficulty', ['Flurries','Heavy Snowfall', 'Blizzard']).name('Difficulty').listen();
//    difficulty.onChange(function(value){
//      resetGame(value);
//      parameters.difficulty = value;
//      //gui.closed = true;
//    });
//
//    gui.add( parameters, 'restart' ).name("Restart Game");
//
//
//    // dim light shining from above
//    scene.add( new THREE.AmbientLight( 0xffffff, .4) );
//    // a light to shine in the direction the camera faces
//    var viewpointLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
//    viewpointLight.position.set(0,0,1);  // shines down the z-axis
//    scene.add(viewpointLight);
//    scene.fog = new THREE.Fog(colors.black ,1, roadLength);
//
//    //createSkyBox();
//    //createGround();
//    //createCracks();
//    //createLamps();
//    //createHouses();
//    //createSnowfall()
//
//    student.position.set(50,30 ,0);
//    student.rotation.set(radians(90),0,0);
//    rotateObject(student,0,radians(180),0)
//    scaleObject(student,7,7,10);
//    scene.add(student);
//
//    var axleModel1 = createAxle();
//    cruiser1 = createCar(axleModel1);
//    rotateObject(cruiser1,0,radians(-90),0);
//    scaleObject(cruiser1,25,25,25);
//    cruiser1.position.set(-50,18,-6000);
//    cruiser1.width = 48;
//    cruiser1.length = 233;
//    cruiser1.height = 100;
//    cruiser1.driving = false;
//    scene.add(cruiser1);
//
//    var axleModel2 = createAxle();
//    cruiser2 = createCar(axleModel2);
//    cruiser2.width = 48;
//    cruiser2.length = 235;
//    cruiser2.height = 100;
//    cruiser2.driving = false;
//    rotateObject(cruiser2,0,radians(90),0);
//    scaleObject(cruiser2,25,25,25);
//    cruiser2.position.set(50,18,-6000);
//    scene.add(cruiser2);
//
//    for (var i = 0; i < game.maxJackets; i++){
//      var jacket = createJacket();
//      jacket.position.set(50,0,2000);
//      rotateObject(jacket,0,radians(45),0);
//      scaleObject(jacket,7,4,7);
//      jacket.width = 50;
//      jacket.length = 50;
//      jacket.height = 3;
//      jacket.checked= false;
//      jackets.push(jacket);
//      scene.add(jacket);
//    }
//
//    for (var i = 0; i < game.maxSlices; i++){
//      var slice = createSlice();
//      slice.position.set(-50,0,2000);
//      rotateObject(slice,radians(-90),0,radians(-45));
//      scaleObject(slice,10,10,10);
//      slice.width = 20;
//      slice.length = 20;
//      slice.height = 2;
//      slice.checked= false;
//      slices.push(slice);
//      if (i > game.maxSlices - 3){
//        slice.position.z = Math.random() * -6000;
//        slice.position.x = game.xPosArray[Math.floor(Math.random()*4)];
//        if (slice.position.x == Math.abs(125)){
//          slice.position.y = 6;
//        } else{
//          slice.position.y = 0;
//        }
//      }
//      scene.add(slice);
//    }
//
//    taylorLake = createLake();
//    taylorLake.position.set(-500,2 , -3000);
//    scaleObject(taylorLake, 85, 10, 35);
//    rotateObject(taylorLake,0,radians(-90),0);
//    scene.add(taylorLake);
//
//
//    leavingJug = createJugSign();
//    leavingJug.position.set(-275, 30 , -75);
//    scaleObject(leavingJug, 15, 10, 10);
//    scene.add(leavingJug);
//
//    halfwayPoint = createHalfway();
//    halfwayPoint.position.set(-275, 30 , -6000);
//    scaleObject(halfwayPoint, 15, 10, 10);
//    scene.add(halfwayPoint);
//
//    lastSign = createEndSign();
//    lastSign.position.set(-275, 30 , -5500);
//    scaleObject(lastSign, 15, 10, 10);
//    scene.add(lastSign);
//
//    var snowbankAngles = [0, 180]
//    var snowbankAnglesRand = snowbankAngles[Math.floor(Math.random() * 2)];
//    for (var i = 0; i < game.maxSnowbanks; i++){
//      var snowbank = createSnowbank();
//      var height = Math.floor(Math.random() * 10) + 5;
//      scaleObject(snowbank,5,height,10);
//      rotateObject(snowbank,0,radians(snowbankAnglesRand),0);
//      if (i < game.maxSnowbanks/2){
//        snowbank.position.set(-125,-height,1000);
//      } else{
//        snowbank.position.set(125,-height,1000);
//      }
//      snowbank.width = 40;
//      snowbank.length = 50;
//      snowbank.height = height;
//      snowbank.checked = false;
//      snowbanks.push(snowbank);
//      scene.add(snowbank);
//    }
//
//    // start = createStartMessage();
//    // scaleObject(start,25,25,25);
//    // start.position.y = 60;
//    // start.position.z = 100;
//    // scene.add(start);
//    //
//    // lost = createLosingMessage();
//    // lost.position.y = 60;
//    // lost.position.z = 1000;
//    // scaleObject(lost,25,25,25);
//    // scene.add(lost);
//    //
//    //
//    // won = createWinningMessage();
//    // won.position.set(0,60,1000);
//    // scaleObject(won,25,25,25);
//    // scene.add(won);
//
//    //renderer.compile(scene, camera); ASK LATER
//    doFrame();
// }
