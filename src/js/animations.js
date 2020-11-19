

var startTime = Date.now();
var initialPosition = [0,0,0]
var initialRotation = 0;
var parcialTime
var partialTranslate
var parcialRotation
var stepNow = 0
var steps = 0
var objectID = 0
var animeObject = false

function animateStart(toTranslate, ToRotate, totalTime, steps, object, objanim) {
  this.steps = steps
  startTime = Date.now();
  partialTranslate = toTranslate/(Math.ceil(steps/2));
  parcialRotation = ToRotate/(Math.trunc(steps/2));
  parcialTime = totalTime/steps;
  dt = Date.now();
  stepNow = 0
  objectID = object
  animeObject = objanim
}

function animateDOIT(){

  if(stepNow >= steps || !animeObject ){return}
  dt = Date.now() - startTime;
  
  if( stepNow % 2 == 0){
    config[objectID].position.x = ( (initialPosition[0]+ (partialTranslate* dt/parcialTime) )  );

    initialRotation = config[objectID].rotate
  }
  else{
    config[objectID].rotate = initialRotation + (parcialRotation*dt/parcialTime);
    initialPosition[0] = config[objectID].position.x
    
  }  
  if(dt > parcialTime){ stepNow++;startTime = Date.now();}

}

function animateDOITCam(){

  if(stepNow >= steps || animeObject){return}
  dt = Date.now() - startTime;
  
  if( stepNow % 2 == 0){
    camera[objectID].position.x = ( (initialPosition[0]+ (partialTranslate* dt/parcialTime) )  );

    initialRotation = camera[objectID].target.x
  }
  else{
    console.log(initialRotation)
    console.log(parcialRotation)
    camera[objectID].target.x = initialRotation + (parcialRotation*dt/parcialTime);
    initialPosition[0] = camera[objectID].position.x
    
  }  
  if(dt > parcialTime){ stepNow++;startTime = Date.now();}

}






function benzierCurve(/* benzier */) {
  var p = {x:0,y:0,z:0}
  var t = benzier.t
  var p1 = benzier.p1, p2 = benzier.p2, p3 = benzier.p3, p4 = benzier.p4
  p.x = Math.pow((1 - t),3)* p1.x + 3*Math.pow((1-t),2)*t*p2.x +3*(1-t)*Math.pow(t,2)*p3.x + Math.pow(t,3)*p4.x
  p.y = Math.pow((1 - t),3)* p1.y + 3*Math.pow((1-t),2)*t*p2.y +3*(1-t)*Math.pow(t,2)*p3.y + Math.pow(t,3)*p4.y
  p.z = Math.pow((1 - t),3)* p1.z + 3*Math.pow((1-t),2)*t*p2.z +3*(1-t)*Math.pow(t,2)*p3.z + Math.pow(t,3)*p4.z

  return p;
}