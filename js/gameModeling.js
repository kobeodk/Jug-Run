
//--------------------MODELING FUCTIONS----------------//

function createBox(dx, dy, dz, color, x, y, z) {
    var geom = new THREE.BoxBufferGeometry(dx, dy, dz);
    var mat = new THREE.MeshPhongMaterial({
		color:color,
    });
    var box = new THREE.Mesh(geom, mat);
    box.castShadow = true;
    box.receiveShadow = true;
    box.position.set(x, y, z);
    return box;
}

function createSkyBox(){
  var skyboxMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.BackSide});
  var skyboxGeo = new THREE.BoxBufferGeometry(7500, 7500, 7500);
  var skybox = new THREE.Mesh(skyboxGeo, skyboxMaterial);
   skybox.position.z = 0;
   scene.add(skybox);
}

function createSnowfall(){
   particles = new THREE.Group();
   var geo = new THREE.BoxBufferGeometry(1,1,1);
   var pMaterial = new THREE.PointsMaterial({
     color: colors.white,
     size:1,
   });
   for (var i = 0; i < game.pCount; i++){
     var particle = new THREE.Mesh(geo, pMaterial);
     particle.velocity = new THREE.Vector3(0,-1, 15);
     particle.position.x = 400 + -Math.random() * 800;
     particle.position.y = Math.random() * 300;
     particle.position.z = 500 + Math.random() * -4500;
     particles.add(particle);
   }
   // particles.position.x = -200;
   particles.position.z = 000;
   scene.add(particles);
 }

 function createCracks(){
   cracks = new THREE.Group();
   var crackGeo = new THREE.BoxBufferGeometry(40,1,.5);
   var cMaterial = new THREE.MeshPhongMaterial({ color: colors.black, transparent:true, opacity:1});
   for (var i = 0; i < game.crackCount; i++){
     var leftCrack = new THREE.Mesh(crackGeo, cMaterial);
     var rightCrack = new THREE.Mesh(crackGeo, cMaterial);
     leftCrack.velocity = new THREE.Vector3(0,0,15);
     leftCrack.position.x = -120;
     leftCrack.position.y = 4.75;
     leftCrack.position.z = 500 + (i * -(roadLength/game.crackCount));
     rightCrack.velocity = new THREE.Vector3(0,0,15);
     rightCrack.position.x = 120;
     rightCrack.position.y = 4.75;
     rightCrack.position.z = 500 + (i * -(roadLength/game.crackCount));
     cracks.add(leftCrack);
     cracks.add(rightCrack);
   }
   scene.add(cracks);
 }

 function createLamps(){
   lamps = new THREE.Group();
   for (var i = 0; i < game.lampCount; i++){
     var leftLamp = createLamp();
     var rightLamp = createLamp();
     rightLamp.scale.x = 20;
     rightLamp.scale.y = 35;
     rightLamp.scale.z = 25;
     leftLamp.scale.x = 20;
     leftLamp.scale.y = 35;
     leftLamp.scale.z = 25;
     leftLamp.velocity = new THREE.Vector3(0,0,15);
     leftLamp.position.x = -160;
     leftLamp.position.y = 82;
     leftLamp.position.z = 500 + (i * -(roadLength/game.lampCount));
     rightLamp.velocity = new THREE.Vector3(0,0,15);
     rightLamp.position.x = 160;
     rightLamp.position.y = 82;
     rightLamp.position.z = 500 + (i * -(roadLength/game.lampCount));
     lamps.add(leftLamp);
     lamps.add(rightLamp);
   }
   scene.add(lamps);
 }

 function createHouses(){
   houses = new THREE.Group();
   for (var i = 0; i < game.houseCount; i++){
     var house;
     if (i % 2 == 0){
       house = createHouse();
     }else{
       house = createGarageHouse();
     }
     house.velocity = new THREE.Vector3(0,0,15);
     house.scale.x = 50;
     house.scale.y = 50;
     house.scale.z = 50;
     house.rotation.y = radians(180);
     house.position.x = 350;
     house.position.y = 4.75;
     house.position.z = 500 + (i * -(roadLength/game.houseCount));
     houses.add(house);
   }
   scene.add(houses);
 }
 function createGround(){
   var ground = createBox(200, 2, roadLength, colors.ground, 0, -1, -roadLength/2 + 500);
   var right_sidewalk = createBox(40, 6, roadLength, colors.sidewalk, 120, 2, -roadLength/2 + 500);
   var left_sidewalk = createBox(40, 6, roadLength, colors.sidewalk, -120, 2, -roadLength/2 + 500);
   var right_plane = createBox(1000,2,roadLength, colors.grass, 640, -1, -roadLength/2 + 500);
   var left_plane = createBox(1000,2,roadLength, colors.grass, -640, -1, -roadLength/2 + 500);
   var line1 = createBox(2, 1, roadLength, colors.roadLine, -2, 0, -roadLength/2 + 500);
   var line2 = createBox(2, 1, roadLength, colors.roadLine,  2, 0, -roadLength/2 + 500);
   scene.add(right_plane);
   scene.add(left_plane);
   scene.add(left_sidewalk);
   scene.add(right_sidewalk);
   scene.add(ground);
   scene.add(line1);
   scene.add(line2);
 }

 function createLampHead() {
   var glassMaterial = new THREE.MeshLambertMaterial({
           color: 0xf5de2f,
           opacity: 0.3,
           transparent: true
           });
 var cornerMaterial = new THREE.MeshPhongMaterial({
             color: 0x7a7979,
             refractionRatio: 0.8
           });
   var sideGeo1 = new THREE.BoxBufferGeometry(0.01, 0.75, 0.5);
   var cornerGeo1 = new THREE.BoxBufferGeometry(0.05, 0.75, 0.05);
   var sideGeo2 = new THREE.BoxBufferGeometry(0.5, 0.75, 0.01);
   var topGeo = new THREE.BoxBufferGeometry(0.5 ,0.01, 0.5);
   var side1 = new THREE.Mesh(sideGeo1, glassMaterial);
   side1.position.y = 2;
   side1.position.x = -0.25;
   var corner1 = new THREE.Mesh(cornerGeo1, cornerMaterial);
   corner1.position.y = 2;
   corner1.position.x = 0.25;
   corner1.position.z = 0.25;
   var side2 = new THREE.Mesh(sideGeo1, glassMaterial);
   side2.position.y = 2;
   side2.position.x = 0.25;
   var corner2 = new THREE.Mesh(cornerGeo1, cornerMaterial);
   corner2.position.y = 2;
   corner2.position.x = -0.25;
   corner2.position.z = 0.25;
   var side3 = new THREE.Mesh(sideGeo2, glassMaterial);
   side3.position.y = 2;
   side3.position.z = -0.25;
   var corner3 = new THREE.Mesh(cornerGeo1, cornerMaterial);
   corner3.position.y = 2;
   corner3.position.x = 0.25;
   corner3.position.z = -0.25;
   var side4 = new THREE.Mesh(sideGeo2, glassMaterial);
   side4.position.y = 2;
   side4.position.z = 0.25;
   var corner4 = new THREE.Mesh(cornerGeo1, cornerMaterial);
   corner4.position.y = 2;
   corner4.position.x = -0.25;
   corner4.position.z = -0.25;
   var top = new THREE.Mesh(topGeo, cornerMaterial);
   top.position.y = 2.375;
   var bulb = new THREE.Mesh(new THREE.SphereBufferGeometry(0.3,12,12), new THREE.MeshPhongMaterial({ color: 0xFFF700}));
   bulb.position.y = 2;
   var head = new THREE.Object3D();
   head.add(side1);
   head.add(side2);
   head.add(side3);
   head.add(side4);
   head.add(top);
   head.add(corner1);
   head.add(corner2);
   head.add(corner3);
   head.add(corner4);
   head.add(bulb);
   return head;
 }


 function createLamp(){
   var base = new THREE.Mesh(new THREE.BoxBufferGeometry(1,1,1), new THREE.MeshPhongMaterial({ color: 0x7a7979 }));
   base.scale.set(0.75, 0.75, 0.75);
   base.position.y = -2;
   var post = new THREE.Mesh(new THREE.CylinderBufferGeometry(1,1,1), new THREE.MeshPhongMaterial({ color: 0x7a7979 }));
   post.scale.set(0.25, 3.5, 0.25);
   var lightpost = new THREE.Object3D();
   var lampHead = createLampHead();
   lightpost.add(base);
   lightpost.add(post);
   lightpost.add(lampHead);
   var spotLight = new THREE.SpotLight( 0xffffff );
   spotLight.position.set(0,2,0);
   spotLight.intensity = 2;
   spotLight.distance = 200;
   spotLight.target = base;
   lightpost.add(spotLight);
   return lightpost;
 }

 function createAxle() {
    var wheel = new THREE.Mesh(
       new THREE.TorusBufferGeometry(0.47, 0.15, 12, 22),
       new THREE.MeshLambertMaterial({ color: colors.black })
       );
    var cylinder = new THREE.Mesh(
       new THREE.CylinderBufferGeometry(0.5,0.5,1,5,1),
       colors.grey
       );
    cylinder.scale.set(0.1,1.2,0.15);
    wheel.scale.set(0.75,0.75,0.7);
    wheel.add(cylinder.clone());
    cylinder.rotation.z = Math.PI/3;
    wheel.add(cylinder.clone());
    cylinder.rotation.z = -Math.PI/3;
    wheel.add(cylinder.clone());
    var axleModel = new THREE.Object3D();
    cylinder.scale.set(0.2,1,0.2);
    cylinder.rotation.set(Math.PI/2,0,0);
    axleModel.add(cylinder);
    wheel.position.z = 1.6;
    axleModel.add(wheel.clone());
    wheel.position.z = -1.6;
    axleModel.add(wheel);
    return axleModel;
 }

 function createCar(axleModel) {
    var carModel = new THREE.Object3D();
    var red = new THREE.MeshPhongMaterial({
          color: "red",
          specular: 0x080808,
          shininess: 8,
    });
    var textureLoader = new THREE.TextureLoader();
    var front = textureLoader.load( "images/front.png" );
    var frontside = textureLoader.load( "images/frontside.png" );
    var cruiserD = textureLoader.load( "images/cruiserD.png" );


    front.anisotropy = 16;
    frontside.anisotropy = 16;
    cruiserD.anisotropy = 16;
    const materialBase = [ new THREE.MeshStandardMaterial( {map: cruiserD} ),
     materials.red,
     materials.red,
     materials.red,
     materials.red,
     materials.red
    ];
    const frontMaterial = [ new THREE.MeshStandardMaterial( {map: front} ),
     materials.red,
     materials.red,
     materials.red,
     new THREE.MeshStandardMaterial( {map: frontside } ),
     materials.red
    ];
    var door = new THREE.Mesh(new THREE.BoxBufferGeometry(1.2,3.9,3.5), materials.red);
       door.position.y = 1.555;
       door.position.x = 4.1;
       door.position.z = 0;
    var hood = new THREE.Mesh(new THREE.BoxBufferGeometry(6,3.8,3.5, 1, 1, 1), materials.red);
    hood.position.set(0.5,1.6,0);
    var nose = new THREE.Mesh(new THREE.BoxBufferGeometry(1.75,2,3), frontMaterial);
    nose.position.set(5.58,0.7,0);
    var forehead = new THREE.Mesh(new THREE.BoxBufferGeometry(0.8,0.6,3.5), materialBase);
    forehead.position.set(5.1,2.9,0);
    var triangleNose = new THREE.Object3D();
    var length = 1;
    var width = 1;
    var shape1 = new THREE.Shape()
    shape1.moveTo( 0,0 );
    shape1.lineTo( 0, 0.01 );
    shape1.lineTo( .5, -0.3 );
    shape1.lineTo( 0, 0 );

    var extrudeSettings1 = {
     amount: 2.9,
     steps: 2,
    	bevelEnabled: true,
    	bevelThickness: 1,
    	bevelSize: 1,
    	bevelOffset: 1,
    	bevelSegments: 0

   };

   var noseBase = new THREE.Mesh(
     new THREE.ExtrudeBufferGeometry(shape1, extrudeSettings1),
     new THREE.MeshPhongMaterial({ color: colors.black, specular: 0x101010, shininess:16})
   );

   noseBase.position.set(4.6,2.25,-1.46);

   var aboveTriangle = new THREE.Object3D();

   var length = 1;
   var width = 1;

   var shape2 = new THREE.Shape()
   shape2.moveTo( 0,0 );
   shape2.lineTo( 0.1, 0.2 );
   shape2.lineTo( 0.1, 0.22 );
   shape2.lineTo( 0, 0 );

   var extrudeSettings2 = {
    amount: 2.9,
    steps: 2,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 1,
    bevelSegments: 0

  };

  var hoodTop = new THREE.Mesh(
    new THREE.ExtrudeBufferGeometry(shape2, extrudeSettings2),
    new THREE.MeshLambertMaterial({

    })
  );

  hoodTop.position.set(4.6,5.25,-1.46);

    var length1 = .02, width1 = .02;

    var shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, .02 );
    shape.lineTo( .2, 0 );
    shape.lineTo( 0, 0 );

    var extrudeSettings = {
    	steps: 2,
    	depth: 0.05,
    	bevelEnabled: true,
    	bevelThickness: .1,
    	bevelSize: 1,
    	bevelOffset: -5,
    	bevelSegments: 1

    };

    var headlight1 = new THREE.Mesh(new THREE.SphereBufferGeometry(1,16,8), materials.yellow);
    headlight1.scale.set(0.1,0.25,0.25);
    headlight1.position.set(-3,0.6,-1.5);
    var headlight2 = headlight1.clone();
    headlight1.position.set(-3,0.6,1.4);

    var spotLight1 = new THREE.SpotLight( 0xffffff );
    spotLight1.position.set(headlight1.position.x + 10, headlight1.position.y + 2, headlight1.position.z);
    spotLight1.intensity = 2;
    spotLight1.angle = Math.PI/4;
    spotLight1.distance = 350;

    var target1 = new THREE.Mesh(new THREE.SphereBufferGeometry(0.001,0.001,0.001), new THREE.MeshPhongMaterial({ color: 0xffffff}));

    target1.position.x = spotLight1.position.x + 5;
    target1.position.y = headlight1.position.y;
    target1.position.z = headlight1.position.z;

    carModel.add(target1);

    spotLight1.target = target1;

    var spotLight2 = new THREE.SpotLight( 0xffffff );
    spotLight2.position.set(headlight2.position.x + 10, headlight2.position.y + 2, headlight2.position.z);
    spotLight2.angle = Math.PI/4;
    spotLight2.intensity = 2;
    spotLight2.distance = 350;

    var target2 = new THREE.Mesh(new THREE.SphereBufferGeometry(0.001,0.001,0.001), new THREE.MeshPhongMaterial({ color: 0xffffff}));

    target2.position.x = spotLight2.position.x + 5;
    target2.position.y = headlight2.position.y;
    target2.position.z = headlight2.position.z;

    carModel.add(target2);

    spotLight2.target = target2;

    var carAxle1 = axleModel.clone();
    carAxle1.position.x = -0.2;
    carAxle1.position.y = -0.25;
    carAxle1.scale.z = 1.1;
    var carAxle2 = axleModel.clone();
    carAxle2.position.x = 5.6;
    carAxle2.position.y = -0.25;

    carModel.add(carAxle1);
    carModel.add(carAxle2);
    carModel.add(hood);
    carModel.add(door);
    carModel.add(nose);
    carModel.add(noseBase);
    carModel.add(forehead);
    carModel.add(spotLight1);
    carModel.add(spotLight2);

    return carModel;
 }






 function createJacket() {

    var jacketModel = new THREE.Object3D();
    var red = new THREE.MeshPhongMaterial({
          color: "red",
          specular: 0x080808,
          shininess: 8
    });



    var hood = new THREE.Mesh(new THREE.BoxBufferGeometry(6,1,3.5, 1, 1, 1), jacketColor);
    hood.position.set(0.5,1.85,0);

    var ground = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.9,1.9,1,64,1), jacketColor);
    ground.position.set(-2.4, 1.851, 0);

    var headHole = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.3,1.3,1,64,1),materials.black);
    headHole.position.set(-2.4, 1.855, 0);

    var armLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(1,1,3.5, 1, 1, 1), jacketColor);
    armLeft.position.set(0.5,1.85,2.3);
    armLeft.rotation.y = (radians(55));

    var armRight = new THREE.Mesh(new THREE.BoxBufferGeometry(1,1,3.5, 1, 1, 1), jacketColor);
    armRight.position.set(0.5,1.85,-2.3);
    armRight.rotation.y = (radians(-55));

    var zipper = new THREE.Mesh(new THREE.BoxBufferGeometry(5,1,0.25, 1, 1, 1), materials.black);
    zipper.position.set(1.02, 1.852, 0);

    jacketModel.add(hood);
    jacketModel.add(ground);
    jacketModel.add(armLeft);
    jacketModel.add(armRight);
    jacketModel.add(zipper);
    jacketModel.add(headHole);

    return jacketModel;
 }

 function createSlice(){
  var slice = new THREE.Object3D();

  var shape = new THREE.Shape();
      shape.moveTo( 0,0 );
      shape.lineTo( 0, 0.05 );
      shape.lineTo( 0.2, 0.02 );
      shape.lineTo( 0, 0 );

      var extrudeSettings = {
      amount: 0.3,
     steps: 2,
     bevelEnabled: true,
     bevelThickness: 1,
     bevelSize: 1,
     bevelOffset: 1,
     bevelSegments: 0
      };

  var base = new THREE.Mesh(
  new THREE.ExtrudeBufferGeometry(shape,extrudeSettings),
  new THREE.MeshLambertMaterial({
  color: 0xFED511
  })
  );

  var crust = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.2,0.2,2.3,18,1),
  new THREE.MeshLambertMaterial({
  color: 0x885522
  })
  );
  crust.position.y = 0;
  crust.position.x = -1;
  crust.position.z = 0.2;

  var pepperoni1 = pepperoni(-0.4,0.4,0.25);
  var pepperoni2 = pepperoni(-0.2,-0.3,0.25);
  var pepperoni3 = pepperoni(0.5,0,0.25);

  slice.add(base);
  slice.add(crust);
  slice.add(pepperoni1, pepperoni2, pepperoni3);
  return slice;
  }

  function pepperoni(x,y,z){
  var pep = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.25,0.25,0.2,16,1),
  new THREE.MeshLambertMaterial({
  color: 0xCD2805
  })
  );
  pep.position.x = x;
  pep.position.y = y;
  pep.position.z = z;
  pep.rotation.x = Math.PI/2;

  return pep;
}

function createHouse() {

   var house = new THREE.Object3D();

   var houseMaterials = [materials.houseYellow, materials.houseGrey, materials.houseBrown, materials.houseBlue];

   var colorRand = Math.floor(Math.random() * 4);


   var houseBase = new THREE.Mesh(new THREE.BoxBufferGeometry(3.65,4,4, 1, 1, 1), houseMaterials[colorRand]);
   houseBase.position.set(0.5,1.85,0);

   var door = new THREE.Mesh(new THREE.BoxBufferGeometry(3.6,2.1, 1, 1, 1), houseMaterials[colorRand]);
   door.position.set(0.55,0.91,0);

   var houseWindowLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(3.674,1.1,1.1, 1, 1, 1), houseMaterials[colorRand]);
   houseWindowLeft.position.set(0.5,2.7,1.2);

   var houseWindowRight = new THREE.Mesh(new THREE.BoxBufferGeometry(3.674,1.1,1.1, 1, 1, 1), houseMaterials[colorRand]);
   houseWindowRight.position.set(0.5,2.7,-1.2);

   //roof

   var houseRoofLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(4,3.35,0.5, 1, 1, 1), colors.black);
   houseRoofLeft.position.set(0.5,4.7,-1.04);
   houseRoofLeft.rotation.x = (radians(45));
   houseRoofLeft.rotation.y = (radians(0));

   var houseRoofRight = new THREE.Mesh(new THREE.BoxBufferGeometry(4,3.35,0.5, 1, 1, 1), colors.black);
   houseRoofRight.position.set(0.5,4.7,1.04);
   houseRoofRight.rotation.x = (radians(-45));

   var houseFillIn = new THREE.Mesh(new THREE.BoxBufferGeometry(3.67,2.7,2.5, 1, 1, 1), houseMaterials[colorRand]);
   houseFillIn.position.set(0.5,4,0.1);
   houseFillIn.rotation.x = (radians(45));
   houseFillIn.rotation.y = (radians(0));


  house.add(houseBase);
  house.add(houseRoofLeft);
  house.add(houseRoofRight);
  house.add(houseFillIn);
  house.add(door);
  house.add(houseWindowLeft);
  house.add(houseWindowRight);

   return house;
}

function createGarageHouse() {

   var house = new THREE.Object3D();

   var houseMaterials = [materials.houseYellow, materials.houseGrey, materials.houseBrown, materials.houseBlue ];

   var colorRand = Math.floor(Math.random() * 4);


   var houseBase = new THREE.Mesh(new THREE.BoxBufferGeometry(3.65,4,4, 1, 1, 1), houseMaterials[colorRand]);
   houseBase.position.set(0.5,1.85,0);

   var garage = new THREE.Mesh(new THREE.BoxBufferGeometry(3,2.5,3.5, 1, 1, 1), houseMaterials[colorRand]);
   garage.position.set(0.5,1.11,-3.5);

   var driveWay = new THREE.Mesh(new THREE.BoxBufferGeometry(3,2.5,3.5, 1, 1, 1), houseMaterials[colorRand]);
   driveWay.position.set(0.5,1.11,-3.5);

   var garageRoof = new THREE.Mesh(new THREE.BoxBufferGeometry(3.65,0.5,3.35, 1, 1, 1), colors.black);
   garageRoof.position.set(0.5,2.5,-3.7);

   var garageDoor = new THREE.Mesh(new THREE.BoxBufferGeometry(0.5,2.2,3, 1, 1, 1), houseMaterials[colorRand]);
   garageDoor.position.set(1.755,0.95,-3.625);

   var door = new THREE.Mesh(new THREE.BoxBufferGeometry(3.6,2.1, 1, 1, 1), houseMaterials[colorRand]);
   door.position.set(0.55,0.91,0);

   var houseWindowLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(3.674,1.1,1.1, 1, 1, 1), houseMaterials[colorRand]);
   houseWindowLeft.position.set(0.5,2.7,1.2);

   var houseWindowRight = new THREE.Mesh(new THREE.BoxBufferGeometry(3.674,1.1,1.1, 1, 1, 1), houseMaterials[colorRand]);
   houseWindowRight.position.set(0.5,2.7,-1.2);

   //roof

   var houseRoofLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(4,3.35,0.5, 1, 1, 1), colors.black);
   houseRoofLeft.position.set(0.5,4.7,-1.04);
   houseRoofLeft.rotation.x = (radians(45));
   houseRoofLeft.rotation.y = (radians(0));

   var houseRoofRight = new THREE.Mesh(new THREE.BoxBufferGeometry(4,3.35,0.5, 1, 1, 1), colors.black);
   houseRoofRight.position.set(0.5,4.7,1.04);
   houseRoofRight.rotation.x = (radians(-45));

   var houseFillIn = new THREE.Mesh(new THREE.BoxBufferGeometry(3.67,2.7,2.5, 1, 1, 1), houseMaterials[colorRand]);
   houseFillIn.position.set(0.5,4,0.1);
   houseFillIn.rotation.x = (radians(45));
   houseFillIn.rotation.y = (radians(0));


  house.add(houseBase);
  house.add(driveWay);
  house.add(garage);
  house.add(garageDoor);
  house.add(garageRoof);

  house.add(houseRoofLeft);
  house.add(houseRoofRight);
  house.add(houseFillIn);
  house.add(door);
  house.add(houseWindowLeft);
  house.add(houseWindowRight);

   return house;
}

function createSnowbank() {

   var snowbankModel = new THREE.Object3D();

// Layer 1

   var layer1A = new THREE.Mesh(new THREE.BoxBufferGeometry(8,1,3.8, 1, 1, 1), materials.white);
   layer1A.position.set(0.5,1.85,0);

   var layer1B = new THREE.Mesh(new THREE.BoxBufferGeometry(1,1,5, 1, 1, 1), materials.white);
   layer1B.position.set(0.2,1.85,2.3);
   layer1B.rotation.y = (radians(90));

   var layer1C = new THREE.Mesh(new THREE.BoxBufferGeometry(1,1,6, 1, 1, 1), materials.white);
   layer1C.position.set(0.2,1.85,-2.3);
   layer1C.rotation.y = (radians(90));

// Layer 2

    var layer2A = new THREE.Mesh(new THREE.BoxBufferGeometry(6,0.5,2.5, 1, 1, 1), materials.white);
    layer2A.position.set(0.2,2.6,0);

    var layer2B = new THREE.Mesh(new THREE.BoxBufferGeometry(1.2,0.5,4, 1, 1, 1), materials.white);
    layer2B.position.set(0.2,2.6,1.6);
    layer2B.rotation.y = (radians(90));

    var layer2C = new THREE.Mesh(new THREE.BoxBufferGeometry(0.7,0.5,5, 1, 1, 1), materials.white);
    layer2C.position.set(0.2,2.65,-1.6);
    layer2C.rotation.y = (radians(90));

    var layer2D = new THREE.Mesh(new THREE.BoxBufferGeometry(1,0.75,2, 1, 1, 1), materials.white);
    layer2D.position.set(2.7,2.65,-0.2);
    layer2D.rotation.y = (radians(90));

// Layer 3

    var layer3A = new THREE.Mesh(new THREE.BoxBufferGeometry(3.5,0.75,1.8, 1, 1, 1), materials.white);
    layer3A.position.set(-0.3,3.1,0);

    var layer3B = new THREE.Mesh(new THREE.BoxBufferGeometry(1.2,0.75,2, 1, 1, 1), materials.white);
    layer3B.position.set(0.1,3.1,1.2);
    layer3B.rotation.y = (radians(90));

    var layer3C = new THREE.Mesh(new THREE.BoxBufferGeometry(0.7,0.75,2.4, 1, 1, 1), materials.white);
    layer3C.position.set(-0.3,3.1,-1.2);
    layer3C.rotation.y = (radians(90));

    var layer3D = new THREE.Mesh(new THREE.BoxBufferGeometry(0.8,0.75,1.5, 1, 1, 1), materials.white);
    layer3D.position.set(1.5,3.1,0);
    layer3D.rotation.y = (radians(90));

// Layer 4

    var layer4A = new THREE.Mesh(new THREE.BoxBufferGeometry(2,0.75,1.4, 1, 1, 1), materials.white);
    layer4A.position.set(-0.3,3.4,0);


    snowbankModel.add(layer1A);
    snowbankModel.add(layer1B);
    snowbankModel.add(layer1C);

    snowbankModel.add(layer2A);
    snowbankModel.add(layer2B);
    snowbankModel.add(layer2C);
    snowbankModel.add(layer2D);

    snowbankModel.add(layer3A);
    snowbankModel.add(layer3B);
    snowbankModel.add(layer3C);
    snowbankModel.add(layer3D);

    snowbankModel.add(layer4A);

   return snowbankModel;
}

function createLake() {
   var lakeModel = new THREE.Object3D();

   var lakeSide = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(5.5, 5.5, 0.5, 64, 1),
      new THREE.MeshLambertMaterial( { color: 0x0add8e6  } )
      );

   lakeSide.position.y = -0.3;

   var lakeSide2 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(7.5, 5.5, 0.5, 64, 1),
      new THREE.MeshLambertMaterial( { color: 0x0add8e6  } )
      );

   lakeSide2.position.y = -0.3;
   lakeSide2.position.x = -5.9;

   var lakeSide3 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(5.5, 5.5, 0.5, 64, 1),
      new THREE.MeshLambertMaterial( { color: 0x0add8e6  } )
      );

   lakeSide3.position.y = -0.3;
   lakeSide3.position.z = 4.3;

   lakeModel.add(lakeSide);
   lakeModel.add(lakeSide2);
   lakeModel.add(lakeSide3);
   return lakeModel;

}

function createJugSign() {

   var jugModel = new THREE.Object3D();

   var jugSignTexture = new THREE.TextureLoader().load( "images/START.png" );
   var backTexture = new THREE.TextureLoader().load( "images/mBrick.png" );
   jugSignTexture.anisotropy = 16;
   backTexture.anisotropy = 16;

   const signMaterial = [ new THREE.MeshStandardMaterial( {
     } ),

     new THREE.MeshStandardMaterial( {
     } ),

     new THREE.MeshStandardMaterial( {
       map: backTexture,
     } ),

     new THREE.MeshStandardMaterial( {
       map: backTexture,
     } ),

     new THREE.MeshStandardMaterial( {
       map: jugSignTexture,
     } ),

     new THREE.MeshStandardMaterial( {
       map: jugSignTexture,
     } ),

   ];

   var pillarLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(1,7,1, 1, 1, 1), materials.black);
   pillarLeft.position.set(0.5,1.85,0);

   var pillarRight = new THREE.Mesh(new THREE.BoxBufferGeometry(1,7,1, 1, 1, 1), materials.black);
   pillarRight.position.set(7.5,1.85,0);

   var sign = new THREE.Mesh(new THREE.BoxBufferGeometry(5.965,4,0.5, 1, 1, 1), signMaterial);
   sign.position.set(4,2.85,0);

  jugModel.add(pillarLeft);
  jugModel.add(pillarRight);
  jugModel.add(sign);

   return jugModel;
}


function createHalfway() {

   var halfwayModel = new THREE.Object3D();

   var halfwaySignTexture = new THREE.TextureLoader().load( "images/HALFWAY.png" );
   var backTexture = new THREE.TextureLoader().load( "images/mBrick.png" );
   halfwaySignTexture.anisotropy = 16;
   backTexture.anisotropy = 16;

   const halfwaySignMaterial = [ new THREE.MeshStandardMaterial( {
     } ),

     new THREE.MeshStandardMaterial( {
     } ),

     new THREE.MeshStandardMaterial( {
       map: backTexture,
     } ),

     new THREE.MeshStandardMaterial( {
       map: backTexture,
     } ),

     new THREE.MeshStandardMaterial( {
       map: halfwaySignTexture,
     } ),

     new THREE.MeshStandardMaterial( {
       map: halfwaySignTexture,
     } ),

   ];

   var pillarLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(1,7,1, 1, 1, 1), materials.black);
   pillarLeft.position.set(0.5,1.85,0);

   var pillarRight = new THREE.Mesh(new THREE.BoxBufferGeometry(1,7,1, 1, 1, 1), materials.black);
   pillarRight.position.set(7.5,1.85,0);

   var sign = new THREE.Mesh(new THREE.BoxBufferGeometry(5.965,4,0.5, 1, 1, 1), halfwaySignMaterial);
   sign.position.set(4,2.85,0);

  halfwayModel.add(pillarLeft);
  halfwayModel.add(pillarRight);
  halfwayModel.add(sign);

   return halfwayModel;
}


function createEndSign() {

   var endSignModel = new THREE.Object3D();

   var endSignTexture = new THREE.TextureLoader().load( "images/END.png" );
   var backTexture = new THREE.TextureLoader().load( "images/mBrick.png" );
   endSignTexture.anisotropy = 16;
   backTexture.anisotropy = 16;

   const endSignMaterial = [ new THREE.MeshStandardMaterial( {
     } ),

     new THREE.MeshStandardMaterial( {
     } ),

     new THREE.MeshStandardMaterial( {
       map: backTexture,
     } ),

     new THREE.MeshStandardMaterial( {
       map: backTexture,
     } ),

     new THREE.MeshStandardMaterial( {
       map: endSignTexture,
     } ),

     new THREE.MeshStandardMaterial( {
       map: endSignTexture,
     } ),

   ];

   var pillarLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(1,7,1, 1, 1, 1), materials.black);
   pillarLeft.position.set(0.5,1.85,0);

   var pillarRight = new THREE.Mesh(new THREE.BoxBufferGeometry(1,7,1, 1, 1, 1), materials.black);
   pillarRight.position.set(7.5,1.85,0);

   var sign = new THREE.Mesh(new THREE.BoxBufferGeometry(5.965,4,0.5, 1, 1, 1), endSignMaterial);
   sign.position.set(4,2.85,0);

  endSignModel.add(pillarLeft);
  endSignModel.add(pillarRight);
  endSignModel.add(sign);

   return endSignModel;
}

function createStartMessage(){
	var start = new THREE.Object3D();

	var textureLoader = new THREE.TextureLoader();

	var welcome = textureLoader.load("images/welcome.png");
	welcome.anisotropy = 16;

	const boxMaterial = new THREE.MeshStandardMaterial({
			map: welcome,
	});

	var box = new THREE.Mesh(
		new THREE.BoxGeometry(8,6,1),
		boxMaterial
		);

	start.add(box);
	return start;
}

function createLosingMessage(){
	var lost = new THREE.Object3D();
	var textureLoader = new THREE.TextureLoader();

	var losing = textureLoader.load("images/losing.png");
	losing.anisotropy = 16;

	const boxMaterial = new THREE.MeshStandardMaterial({
			map: losing,
	});

	var box = new THREE.Mesh(
		new THREE.BoxGeometry(8,6,1),
		boxMaterial
		);

	lost.add(box);
	return lost;
}

function createWinningMessage(){
	var won = new THREE.Object3D();
	var textureLoader = new THREE.TextureLoader();

	var winning = textureLoader.load("images/winning.png");
	winning.anisotropy = 16;

	const boxMaterial = new THREE.MeshStandardMaterial({
			map: winning,
	});

	var box = new THREE.Mesh(
		new THREE.BoxGeometry(8,6,1),
		boxMaterial
		);

	won.add(box);
	return won;
}
