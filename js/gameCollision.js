
//--------------------COLLISION FUNCTION----------------//

function checkCollision(left, right, bottom, object){
  var objectLeft = object.position.x - object.width/2 ;
  var objectRight = object.position.x + object.width/2;
  var objectHeight = object.height;
  if (left < objectLeft && objectLeft < right && bottom < object.height){
    return true;
  } else if (left < objectRight && objectRight < right && bottom < object.height){
     return true;
  } else if (objectLeft < left  && left < objectRight && bottom < object.height){
    return true;
  } else if (objectLeft < right && right < objectRight && bottom < object.height){
     return true;
  } else{
    return false;
  }
}
