
//--------------------MATH FUCTIONS----------------//

function radians( degrees ) {
return degrees * Math.PI / 180.0;
}

function rotateObject(object,x,y,z){
  object.rotation.x = x;
  object.rotation.y = y;
  object.rotation.z = z;
}

function scaleObject(object,x,y,z){
  object.scale.x = x;
  object.scale.y = y;
  object.scale.z = z;
}
