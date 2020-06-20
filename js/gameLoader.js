
//--------------------JUG RUN----------------//

//--------------------VAR DECLERATIONS----------------//

var scene, camera, renderer;  // THREE.js rendering basics.
var controls;

var canvas;  // The canvas on which the image is rendered.

var parameters;

var gui;

var startScreen = document.getElementById("start");
var pauseScreen = document.getElementById("pauseScreen");
var winScreen = document.getElementById("winScreen");
var lossScreen = document.getElementById("lossScreen");
var waitingScreen = document.getElementById("waitingScreen");
var diffSelect = document.getElementById("diff");
var buttons = document.getElementById("buttons");

var game = {
  status: "menu",
  clock: new THREE.Clock(),
  oldTime: 0,
  newTime: 0,
  studentHealth: 100,
  tick: 3,
  houseCount: 2,
  xPosArray: [-125, -50, 50, 125],
  xPosArraySnowbank: [-125, 125],
  jacketProb: 0.1,
  pizzaProb: 0.9,
  snowbankProb: 0.5,
  maxSnowbanks: 30,
  maxSlices: 15,
  maxJackets: 15,
  cruiserProb: 0.33,
  maxDistance: 60,
  pCount:2000,
  crackCount:40,
  lampCount:8,
  cruiserSpeed: 25,
  distanceRem: 1200,
  distanceTrav: 0,
  difficulty: diffSelect.options[diffSelect.selectedIndex].value
}

var body = {
  left:0,
  right:0,
  bottom:0,
  running: true,
  jumping: false,
  direction: "none",
}


var jacketHalt = false;
var snowbankHalt = false;
var sliceHalt = false;
var timesCruiserChecked = 0;

var studentJacketColor;
var jacketColor;

var leavingJug;
var halfwayPoint;
var lastSign;

var particles;
var cracks;
var lamps;
var houses;
var taylorLake;
var start;

var student = createStudent();
var head = student.children[0];
var core = student.children[1];
var leftarm = student.children[2];
var rightarm = student.children[3];
var lefthand = student.children[4];
var righthand = student.children[5];
var leftleg = student.children[6];
var rightleg = student.children[7];
var leftfoot = student.children[8];
var rightfoot = student.children[9];
var runningCycle = 0;

var cruiser1;
var cruiser2;
var snowbanks = [];
var slices = [];
var jackets = [];
var sliceNum = 0;
var jacketNum = 0;
var snowbankNum = 0;
var snowSpeed = 15;

var start;
var lost;
var won;
var gamelost = false;

var roadLength = 6000;

var endPos = 50;
var heightGoal = 100;
var colors = {
  yellow: 0xffff00,
  grey:0xc0c0c0,
  maroon:0x800000,
  black:0x000000,
  red:0xff0000,
  yellow:0xffff00,
  blue: 0x336EFF,
  purple: 0xB400FF,
  ground: 0x2a2a2a,
  sidewalk: 0x707070,
  grass: 0x155426,
  roadLine: 0xf5c242,
  white: 0xffffff,
  glass: 0xf5de2f,
  lamp: 0x7a7979,
  houseYellow: 0x645E00,
  houseGrey: 0x303030,
  houseBrown: 0x573434,
  houseBlue: 0x003172,

}
var materials = {
  black: new THREE.MeshPhongMaterial({ color: colors.black, specular: 0x101010, shininess:16}),
  white: new THREE.MeshPhongMaterial({ color: colors.white, specular: 0x101010, shininess:16}),
  red: new THREE.MeshPhongMaterial({ color: colors.red, specular: 0x101010, shininess:16}),
  yellow: new THREE.MeshPhongMaterial({ color: colors.yellow, specular: 0x101010, shininess:16}),
  blue: new THREE.MeshPhongMaterial({ color: colors.blue, specular: 0x101010, shininess:16}),
  purple: new THREE.MeshPhongMaterial({ color: colors.purple, specular: 0x101010, shininess:16}),
  grey: new THREE.MeshPhongMaterial({ color: colors.grey, specular: 0x101010, shininess:16}),
  houseYellow: new THREE.MeshPhongMaterial({color: colors.houseYellow, specular: 0x101010, shininess: 16}),
  houseGrey: new THREE.MeshPhongMaterial({color: colors.houseGrey, specular: 0x101010, shininess: 16}),
  houseBrown: new THREE.MeshPhongMaterial({color: colors.houseBrown, specular: 0x101010, shininess: 16}),
  houseBlue: new THREE.MeshPhongMaterial({color: colors.houseBlue, specular: 0x101010, shininess: 16}),

}

var jacketMaterials = [materials.red, materials.yellow, materials.blue, materials.purple, materials.grey];

var coloRand = Math.floor(Math.random() * 5);

jacketColor = jacketMaterials[coloRand];
studentJacketColor = jacketColor;

//--------------------MATH FUCTIONS----------------//

// radians(degrees);
//
// rotateObject(object,x,y,z);
//
// scaleObject(object,x,y,z);

//--------------------GAME FUCTIONS----------------//

// createScene();
//
// handleKeyPress(e);
//
// render();
//
// updateForFrame();
//
// doFrame();
//
// init();
//
// checkCollision(left, right, bottom, object);
//
// resetGame(difficulty);

//--------------------STUDENT FUCTIONS----------------//

function animateStudent(){
  var amp = 0.5;
  runningCycle += 0.25;//increment angle
  var angle = runningCycle;
  angle = angle % (2*Math.PI);

  leftarm.rotation.x = -Math.cos(angle + Math.PI) * amp;
    lefthand.position.z = -Math.cos(angle) * amp;
    rightarm.rotation.x = -Math.cos(angle) * amp;
    righthand.position.z = -Math.cos(angle + Math.PI) * amp;

    leftleg.position.z = Math.cos(angle + Math.PI) * amp;
    leftleg.position.y = -2.7 + -Math.sin(angle + Math.PI) * amp;
    leftfoot.position.z = Math.cos(angle + Math.PI) * amp;
    leftfoot.position.y = -3.8 + -Math.sin(angle + Math.PI) * amp;

    rightleg.position.z = Math.cos(angle) * amp;
    rightleg.position.y = -2.7 + -Math.sin(angle) * amp;
    rightfoot.position.z = Math.cos(angle) * amp;
    rightfoot.position.y = -3.8 + -Math.sin(angle) * amp;

    core.position.y = -0.7 - Math.cos(angle*2) * amp * 0.1;
    core.rotation.y = Math.cos(angle + Math.PI) * amp * 0.4;

    head.position.y = 1.5 - Math.cos(angle * 2) * amp * 0.2;
    head.rotation.z = Math.cos(angle) * amp * 0.1;
    head.rotation.y = Math.cos(angle) * amp * 0.05;
}


function createStudent(){

  var person = new THREE.Object3D();

  var head = new THREE.Mesh(
  new THREE.BoxBufferGeometry(2,2,1.5),
  new THREE.MeshLambertMaterial({
  color: 0xA2A0A0
  })
  );
  head.position.y = 1.5;

  var core = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1.4,2,1.5),
  studentJacketColor)
  core.position.y = -0.8;

  var leftarm = arms(-1.1, -0.5, -Math.PI/8);
  var rightarm = arms(1.1, -0.5, Math.PI/8);

  var lefthand = hands(-1.5, -1.35);
  var righthand = hands(1.5, -1.35);

  var leftleg = legs(-0.4, -2.7);
  var rightleg = legs(0.4, -2.7);

  var leftfoot = feet(-0.4, -3.8, 0.2);
  var rightfoot = feet(0.4, -3.8, 0.2);

  person.add(head);
  person.add(core);
  person.add(leftarm, rightarm);
  person.add(lefthand, righthand);
  person.add(leftleg, rightleg);
  person.add(leftfoot, rightfoot);

  return person;

}

function arms(x,y,rotate){
  var arm = new THREE.Mesh(
     new THREE.ConeBufferGeometry(0.4,1.3,20,1), studentJacketColor
     )

  arm.position.x = x;
  arm.position.y = y;
  arm.rotation.z = rotate;

  return arm;
}

function hands(x,y){
  var hand = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.2,0.2,0.2),
  new THREE.MeshLambertMaterial({
  color: 0xA2A0A0
  })
      );

      hand.position.x = x;
      hand.position.y = y;

      return hand;
}

function legs(x,y){
  var leg = new THREE.Mesh(
  new THREE.BoxBufferGeometry(0.5,1.3,0.7),
  new THREE.MeshLambertMaterial({
  color: 0x402b2f
  })
  );

  leg.position.x = x;
  leg.position.y = y;
  return leg;
}

function feet(x,y,z){
  var foot = new THREE.Mesh(
  new THREE.BoxBufferGeometry(0.5, 0.5, 1.2),
  new THREE.MeshLambertMaterial({
  color: 0xccb997
  })
  );

  foot.position.x = x;
  foot.position.y = y;
  foot.position.z = z;

  return foot;
}


//--------------------MODELING FUCTIONS----------------//

// createBox();
//
// createSkyBox();
//
// createSnowfall();
//
// createCracks();
//
// createLamps();
//
// createHouses();
//
// createGround();
//
// createLampHead();
//
// createLamp();
//
// createAxle();
//
// createCar(axleModel);
//
// createJacket();
//
// createSlice();
//
// createHouse();
//
// createGarageHouse();
//
// createSnowbank();
//
// createLake();
//
// createJugSign();
//
// createHalfway();
//
// createEndSign();
//
// createStartMessage();
//
// createLosingMessage()();
//
// createWinningMessage();
