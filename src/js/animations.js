var animeList = [{
  startTime : 0,
  dt : -1,
  translate : 2,
  rotate : 3.14,
  objectID : 1,
  totalTime : 1000,
  initialPosition : {x:0,y:0,z:0}
}];
var animeListCam = [{
  startTime : 0,
  dt : -1,
  translate : 2,
  rotate : 3.14,
  objectID : 1,
  totalTime : 1000,
  initialPosition : {x:0,y:0,z:0}
}];

function anime(toTranslate, ToRotate, totalTim, object) {
  console.log(object.position)
  var obj = {
  startTime : 0,
  dt : -1,
  translate : toTranslate,
  rotate : ToRotate,
  objectID :object.index,
  totalTime : totalTim,
  initialPosition : object.position}
  return obj
}



function animationStart(object){
  animeList[0].initialPosition.x = object.position.x;
  animeList[0].initialPosition.y = object.position.y;
  animeList[0].initialPosition.z = object.position.z;
  animeList[0].initialRotation = object.rotate;
  animeList[0].startTime = Date.now();
  
}

function animationStartCam(object){
  animeListCam[0].initialPosition.x = object.position.x;
  animeListCam[0].initialPosition.y = object.position.y;
  animeListCam[0].initialPosition.z = object.position.z;
  animeListCam[0].initialRotation = object.rotate;
  animeListCam[0].startTime = Date.now();
  
}


function LinearAnimate(anime){

  if( anime.dt == -1  ){animationStart(config[anime.objectID])}

  anime.dt = Date.now() - anime.startTime;

  config[anime.objectID].position.x = ((anime.initialPosition.x + (anime.translate* (anime.dt/anime.totalTime))));  
  config[anime.objectID].rotate = anime.initialRotation + (anime.rotate*anime.dt/anime.totalTime);


  return (anime.dt/anime.totalTime >= 1) // retorna se terminou
}


function animateDOITCam(anime){

  if( anime.dt == -1  ){animationStart(camera[anime.objectID])}

  anime.dt = Date.now() - anime.startTime;

  camera[anime.objectID].position.x = ((anime.initialPosition.x + (anime.translate* (anime.dt/anime.totalTime))));  
  camera[anime.objectID].target = anime.initialRotation + (anime.rotate*anime.dt/anime.totalTime);


  return (anime.dt/anime.totalTime >= 1) // retorna se terminou

}

/* 
function rotation(anime ){
  config[anime.objectID].position.x  = raio * x0 + rcos theta, y0 +r sin theta
} */



function benzierCurve(/* benzier */) {
  var p = {x:0,y:0,z:0}
  var t = benzier.t
  var p1 = benzier.p1, p2 = benzier.p2, p3 = benzier.p3, p4 = benzier.p4
  p.x = Math.pow((1 - t),3)* p1.x + 3*Math.pow((1-t),2)*t*p2.x +3*(1-t)*Math.pow(t,2)*p3.x + Math.pow(t,3)*p4.x
  p.y = Math.pow((1 - t),3)* p1.y + 3*Math.pow((1-t),2)*t*p2.y +3*(1-t)*Math.pow(t,2)*p3.y + Math.pow(t,3)*p4.y
  p.z = Math.pow((1 - t),3)* p1.z + 3*Math.pow((1-t),2)*t*p2.z +3*(1-t)*Math.pow(t,2)*p3.z + Math.pow(t,3)*p4.z

  return p;
}