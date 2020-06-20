

/*  Create the scene graph.  This function is called once, as soon as the page loads.
*  The renderer has already been created before this function is called.
*/
pauseScreen.style.display = "none";
lossScreen.style.display = "none";
waitingScreen.style.display = "none";
winScreen.style.display = "none";
buttons.style.display = "none";

init();
function handleKeyPress(e){
  e = e.keyCode;
  if (e == 80){ // p
    if (game.status == "menu"){
      if (startScreen.style.display === "none") {
        startScreen.style.display = "block";
      } else {
        startScreen.style.display = "none";
      }
      game.status = "playing";
      // start.position.set(0,60,1000);
      game.clock.start(); //MAYBE
      doFrame();
      console.log(game.studentHealth);
    } else if (game.status == "over"){
      waitingScreen.style.display = "none";
      game.status = "playing";
      game.clock.start();
    }
    else if (game.status == "playing" && game.status != "paused"){
      pauseScreen.style.display = "block";
      buttons.style.display = "block";
      game.status = "paused";
      game.clock.stop();
    } else if (game.status == "paused"){
      pauseScreen.style.display = "none";
      buttons.style.display = "none";
      game.status = "playing";
      game.clock.start();
    }
  }
  if (e == 37){ //left arrow
    if (body.running && !body.jumping){
      direction = "left";
      if (student.position.x == 50){
        endPos -= 100;
      } else if (student.position.x == -50 || student.position.x == 120){
        endPos -= 70;
      }
    }
  }
  if (e == 39){ //right arrow
    if (body.running && !body.jumping && game.status != "paused"){
      direction = "right";
      if (student.position.x == -50 ){
        endPos += 100;
      } else if(student.position.x == 50 || student.position.x == -120){
        endPos += 70;
      }
    }
  }
  if (e == 38){  //up Arrow
    if (!body.jumping && game.status != "paused"){
      body.jumping = true;
      heightGoal = 125;
    }
  }
}

function render() {
   renderer.render(scene, camera);
}

function updateForFrame() {
   //UPDATE THINGS HERE
   if (game.status == "playing"){
     if (body.running && !body.jumping){
       animateStudent();
     }
     game.newTime = Math.floor(game.clock.getElapsedTime());
     if (game.oldTime != game.newTime){ //second has passed
       if (game.studentHealth < game.tick){
         game.studentHealth = 0;
       } else{
         game.studentHealth -= game.tick; //subtract from health
         game.distanceRem -= 20;
       }
       game.oldTime = game.newTime;
       snowbankHalt = false;
       sliceHalt = false;
       jacketHalt = false;
       timesCruiserChecked = 0;
     }
     body.left = student.position.x - 23;
     body.right = student.position.x + 23;
     body.bottom = student.position.y - 30;

     if (game.newTime > game.maxDistance){
       //console.log('PLAYER WON');
       //display banner
       //won.position.set(0,60,100);
       winScreen.style.display = "block";
       buttons.style.display = "block";
       game.status = "over";
     }
     if (game.studentHealth <= 0){
       //console.log('PLAYER LOST');
       //display banner
       // lost.position.set(0,60,100);
       cruiser1.position.set(-50,0,-6000);
       cruiser2.position.set(50,0,-6000);
       game.status = "over";
       lossScreen.style.display = "block";
       buttons.style.display = "block";
     }

     if (game.newTime % 1 == 0 && snowbankHalt == false){
       if(snowbankNum >= game.maxSnowbanks/2){
         snowbankNum = 0;
       }
       snowbankHalt = true;
       var leftSnowbank = snowbanks[snowbankNum];
       var rightSnowbank = snowbanks[snowbankNum+game.maxSnowbanks/2];
       var prob1 = Math.random();
       var prob2 = Math.random();
       if (prob1 < game.snowbankProb){
         leftSnowbank.position.z = Math.random() *500 + -6000;
         leftSnowbank.checked = false;
       }
       if (prob2 < game.snowbankProb){
         rightSnowbank.position.z = Math.random() *500 + -6000;
         rightSnowbank.checked = false;
       }
       snowbankNum ++;
     }
     if(game.newTime % 2 == 0 && sliceHalt == false){
       if (sliceNum >= game.maxSlices){
         sliceNum = 0;
       }
       sliceHalt = true;
       slice = slices[sliceNum];
       sliceProb = Math.random();
       if (sliceProb < game.pizzaProb){
         slice.checked = false;
         slice.position.z = -6000;
         slice.position.x = game.xPosArray[Math.floor(Math.random()*4)];
         if (slice.position.x == Math.abs(125)){
           slice.position.y = 6;
         } else{
           slice.position.y = 0;
         }
       }
       sliceNum++;
     }
     if(game.newTime % 2 == 0 && jacketHalt == false){
       if (jacketNum >= game.maxJackets){
         jacketNum = 0;
       }
       jacketHalt = true;
       jacket = jackets[jacketNum];
       jacketProb = Math.random();
       if (jacketProb < game.jacketProb){
         jacket.checked = false;
         jacket.position.z = -6000;
         jacket.position.x = game.xPosArray[Math.floor(Math.random()*4)];
         if (jacket.position.x == Math.abs(125)){
           jacket.position.y = 3;
         } else{
           jacket.position.y = 0;
         }
       }
       jacketNum++;
     }
     if (timesCruiserChecked == 0){
       timesCruiserChecked = 1;
       var prob3 = Math.random();
       var prob4 = Math.random();
       if (prob3 < game.cruiserProb && cruiser1.driving == false){
         cruiser1.position.z = -6000;
         cruiser1.driving = true;
       }
       if (prob4 < game.cruiserProb && cruiser2.driving == false){
         cruiser2.position.z = 1000;
         cruiser2.driving = true;
       }
     }
     particles.children.forEach(p => {
       p.position.add(p.velocity)
       if (p.position.y < -2){
         p.position.y = 300;
       }
       if (p.position.z > 500){
         p.position.z = -1000;
       }
     });
     cracks.children.forEach(p => {
       p.position.add(p.velocity)
       if (p.position.z > 500){
         p.position.z = -roadLength + 500;
       }
     });
     lamps.children.forEach(p => {
       p.position.add(p.velocity)
       if (p.position.z > 500){
         p.position.z = -roadLength + 500;
       }
     });
     houses.children.forEach(p => {
       p.position.add(p.velocity)
       if (p.position.z > 500){
         p.position.z = -roadLength + 500;
       }
     });
     if (student.position.x != endPos){
       body.jumping = false;
       if (student.position.x < endPos){
         student.position.x += 5;
       } else{
         student.position.x -= 5;
       }
     }
     if (cruiser1.position.z < 1000 && cruiser1.driving == true){
       cruiser1.position.z+=game.cruiserSpeed;
     }
     if (cruiser1.position.z >= 1000){
       cruiser1.driving = false;
     }
     if (cruiser2.position.z > -6000 && cruiser2.driving == true){
       cruiser2.position.z-=game.cruiserSpeed/5;
     }
     if (cruiser2.position.z <= -6000){
       cruiser2.driving = false;
     }
     for (var i = 0; i < game.maxSnowbanks; i++){
       snowbank = snowbanks[i];
       if (snowbank.position.z < 1000){
         snowbank.position.z += 15;
       }
     }
     for (var i = 0; i < game.maxSlices; i++){
       var slice = slices[i];
       if (slice.position.z < 1000){
         slice.position.z += 15;
       }
     }
     for (var i = 0; i < game.maxJackets; i++){
       var jacket = jackets[i];
       if (jacket.position.z < 1000){
         jacket.position.z += 15;
       }
     }

     if (taylorLake.position.z <1000){
       taylorLake.position.z += 5;
     }

     if (body.jumping){
       if (student.position.y < heightGoal && heightGoal != 30){
         student.position.y +=5;
       } else if (student.position.y == heightGoal && heightGoal != 30){
         heightGoal = 30;
         student.position.y -=5;
       } else if (student.position.y > heightGoal){
         student.position.y -=5;
       } else if (student.position.y == 30){
         body.jumping = false;
       }
     }
     if (cruiser1.position.z + cruiser1.length/2 + 48 > 0 && cruiser1.position.z - cruiser1.length/2  + 48< 0){
       if(checkCollision(body.left, body.right, body.bottom, cruiser1)){
         game.studentHealth = 0;
         //console.log("zero 1");
       }
     }
     if (cruiser2.position.z + cruiser2.length/2 - 48 > 0 && cruiser2.position.z - cruiser2.length/2  - 48< 0){
       if(checkCollision(body.left, body.right, body.bottom, cruiser2)){
         game.studentHealth = 0;
       }
     }
     for (var i = 0; i < game.maxSnowbanks; i++){
       snowbank = snowbanks[i];
       if(snowbank.position.z + snowbanks.length/2 > 0 && snowbank.position.z - snowbanks.length/2 < 0){
         if(checkCollision(body.left,body.right,body.bottom,snowbank) && snowbank.checked == false){
           if(game.studentHealth <= 10){
           	  game.studentHealth = 0;
           }
           else{
           	  game.studentHealth -= 10;
           }
           snowbank.checked = true;
         }
       }
     }
     for (var i = 0; i < game.maxSlices; i++){
       slice = slices[i];
       if(slice.position.z + slice.length/2 > 0 && slice.position.z - slice.length/2 < 0){
         if(checkCollision(body.left,body.right,body.bottom,slice) && slice.checked == false){
           slice.position.z = 1000;
           game.studentHealth += 10;
           if(game.studentHealth > 100){
             game.studentHealth = 100;
           }
           slice.checked = true;
         }
       }
     }
     for (var i = 0; i < game.maxJackets; i++){
       jacket = jackets[i];
       if(jacket.position.z + jacket.length/2 > 0 && jacket.position.z - jacket.length/2 < 0){
         if(checkCollision(body.left,body.right,body.bottom,jacket) && jacket.checked == false){
           jacket.position.z = 1000;
           game.tick --;
           if (game.tick <= 0){
             game.tick =1;
           }
           jacket.checked = true;
         }
       }
     }

     // if (game.newTime >= 0 && leavingJug.position.z < 1000){
     //   leavingJug.position.z += 15;
     // }
     // if (game.newTime >= 25 && halfwayPoint.position.z < 1000){
     //   halfwayPoint.position.z += 15;
     // }
     // if (game.newTime >= 55 && lastSign.position.z < 1000){
     //   lastSign.position.z += 15;
     // }

     //document.getElementById("scoreValue").innerHTML = game.studentHealth;
     document.getElementById("values").innerHTML = (game.studentHealth).toString();
     document.getElementById("feet").innerHTML = ((game.distanceRem).toString()).concat("ft");
     //$('#health .values').html(game.studentHealth.toString());
   }
}

function doFrame() {
  if (game.status != "menu"){
    controls.update();
     updateForFrame();
    render();
    requestAnimationFrame(doFrame);
  }
}

function init() {
   // try {
   //    canvas = document.getElementById("glcanvas");
   //    renderer = new THREE.WebGLRenderer( {
   //          canvas: canvas,
   //          antialias: true
   //    } );
   // }
   // catch (e) {
   //    document.getElementById("canvas-holder").innerHTML =
   //    "<h3><b>Sorry, WebGL is required but is not available.</b><h3>";
   //    return;
   // }

   document.addEventListener('keydown', handleKeyPress);
   createScene();
   //render();
}

function resetGame(difficulty){
  game.clock.stop();
  if (difficulty == "Flurries"){
    game.tick = 3;
    game.cruiserSpeed = 25;
    game.snowbankProb = .3;
    game.snowSpeed = 15;
  } else if(difficulty == "Heavy Snowfall"){
    game.tick = 4;
    game.cruiserSpeed = 30;
    game.snowbankProb = .5;
    game.snowSpeed = 22;
  } else if(difficulty == "Blizzard"){
    game.tick = 5;
    game.cruiserSpeed = 40;
    game.snowbankProb = .8;
    game.snowSpeed = 30;
  }
  game.status = "over";
  game.newTime = 0;
  game.oldTime = 0;
  game.studentHealth = 100;
  game.distanceRem = 1220;
  particles.children.forEach(p => {
    p.velocity = new THREE.Vector3(0,-1, game.snowSpeed);
    p.position.set(400 + -Math.random() * 800, Math.random() * 300, 500 + Math.random() * -4500);
  });
  // leavingJug.position.set(-275, 30 , -75);
  // halfwayPoint.position.set(-275, 30 , -6000);
  // lastSign.position.set(-275, 30 , -6000);
  taylorLake.position.set(-500,2 , -3000);
  for (var i = 0; i < game.maxJackets; i++){
    var jacket = jackets[i];
    jacket.position.set(50,0,2000);
    jacket.checked= false;
  }
  for (var i = 0; i < game.maxSlices; i++){
    var slice = slices[i];
    slice.position.set(-50,0,2000);
    slice.checked= false;
    if (i > game.maxSlices - 3){
      slice.position.z = Math.random() * -6000;
      slice.position.x = game.xPosArray[Math.floor(Math.random()*4)];
      if (slice.position.x == Math.abs(125)){
        slice.position.y = 6;
      } else{
        slice.position.y = 0;
      }
    }
    student.position.x = 50;
    endPos = 50;
    //game.clock.start();
    game.newTime = 0;
    // won.position.set(0,60,1000);
    // start.position.set(0,60,100);
    // lost.position.set(0,60,1000);
  }
  var snowbankAngles = [0, 180]
  var snowbankAnglesRand = snowbankAngles[Math.floor(Math.random() * 2)];
  for (var i = 0; i < game.maxSnowbanks; i++){
    var snowbank = snowbanks[i];
    if (i < game.maxSnowbanks/2){
      snowbank.position.set(-125,-snowbank.height,1000);
    } else{
      snowbank.position.set(125,-snowbank.height,1000);
    }
    snowbank.checked = false;
  }
  cruiser1.position.set(-50,18,-6000);
  cruiser1.driving = false;
  cruiser2.position.set(50,18,-6000);
  cruiser2.driving = false;

  document.getElementById("values").innerHTML = (game.studentHealth).toString();
}

function goMain(){
  resetGame(game.difficulty);
  game.status = "menu";
  var startScreen = document.getElementById("start");
  pauseScreen.style.display = "none";
  buttons.style.display = "none";
  startScreen.style.display = "block";
  lossScreen.style.display = "none";
  winScreen.style.display = "none";
  game.studentHealth = 100;
}

function showPause(){
  var pauseScreen = document.getElementById("pauseScreen");
  pauseScreen.style.display ="none"
}

function restart(diff){
  if (diff != "null"){
    game.difficulty = diff;
  }
  buttons.style.display = "none";
  pauseScreen.style.display = "none";
  winScreen.style.display = "none";
  lossScreen.style.display = "none";
  //waitingScreen.style.display = "block";
  resetGame(diff);
  game.status = "playing";
  game.clock.start();
}
