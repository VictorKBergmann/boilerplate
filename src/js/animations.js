const lineartype = 0
const benzierType = 1
const rotationType = 2


var animeList = [
{
  startTime : 0,
  dt : -1,
  type: rotationType,
  objectID : 0,
  totalTime : 1000,
  rad: 50,
  initialPosition : {x:0,y:0,z:0},
  orbit : [0,2,1],
  round : 3,
  point : [0,-20,0]
}
];

function animeLinear(toTranslate, ToRotate, totalTim, object) {
  
  var obj = {
  startTime : 0,
  dt : -1,
  type : lineartype,
  translate : toTranslate,
  rotate : ToRotate,
  objectID :object.index,
  totalTime : totalTim,
  initialPosition : {x:0,y:0,z:0}}
  return obj
}

function animeRotate(orbits, time, index){
 var obj = {
  startTime : 0,
  dt : -1,
  type: rotationType,
  objectID : index,
  totalTime : time,
  rad: orbits.r,
  initialPosition : {x:0,y:0,z:0},
  orbit : [orbits.x,orbits.y,orbits.z],
  round : orbits.rounds,   
  point : [orbits.point.x,orbits.point.y,orbits.point.z]
 }
 return obj
}
function animeBenzier(point1, point2, point3, point4, totalTim, object){
  var obj = {
    startTime : 0,
    dt : -1,
    type : benzierType,
    objectID :object.index,
    totalTime : totalTim,
    p1:{x:0,y:0,z:0},
    p2:{x:0,y:0,z:0},
    p3:{x:0,y:0,z:0},
    p4:{x:0,y:0,z:0},
    initialPosition:{x:0,y:0,z:0},
}
  
  obj.p1.x =point1.x
  obj.p1.y =point1.y
  obj.p1.z =point1.z
  
  obj.p2.x =point2.x
  obj.p2.y =point2.y
  obj.p2.z =point2.z
  
  obj.p3.x =point3.x
  obj.p3.y =point3.y
  obj.p3.z =point3.z

  obj.p4.x =point4.x
  obj.p4.y =point4.y
  obj.p4.z =point4.z
  
  return obj
}


function animationStart(object){
  console.log(object.position)
  animeList[0].initialPosition.x = object.position.x;
  animeList[0].initialPosition.y = object.position.y;
  animeList[0].initialPosition.z = object.position.z;
  animeList[0].initialRotation = object.rotate;
  animeList[0].startTime = Date.now();

}

function Animate(anime){
  if( anime.dt == -1  ){animationStart(config[anime.objectID])}
  
  anime.dt = Date.now() - anime.startTime;
  if(anime.type == lineartype){
    config[anime.objectID].position.x = ((anime.initialPosition.x + (anime.translate* (anime.dt/anime.totalTime))));  
    config[anime.objectID].rotate = anime.initialRotation + (anime.rotate*anime.dt/anime.totalTime);
  }
  if(anime.type == benzierType){
    var t = anime.dt/anime.totalTime;
    config[anime.objectID].position.x = Math.pow((1 - t),3)* anime.p1.x + 3*Math.pow((1-t),2)*t*anime.p2.x +3*(1-t)*Math.pow(t,2)*anime.p3.x + Math.pow(t,3)*anime.p4.x
    config[anime.objectID].position.y = Math.pow((1 - t),3)* anime.p1.y + 3*Math.pow((1-t),2)*t*anime.p2.y +3*(1-t)*Math.pow(t,2)*anime.p3.y + Math.pow(t,3)*anime.p4.y
    config[anime.objectID].position.z = Math.pow((1 - t),3)* anime.p1.z + 3*Math.pow((1-t),2)*t*anime.p2.z +3*(1-t)*Math.pow(t,2)*anime.p3.z + Math.pow(t,3)*anime.p4.z

  }
  if(anime.type == rotationType){
    var orbitunit = m4.normalize(anime.orbit)
    var final= [0,0,0]
    var vector = m4.cross(orbitunit, [0, anime.rad,0])
    var teta = 2* anime.round*Math.PI* (anime.dt/anime.totalTime)

    final =m4.addVectors( m4.addVectors( mult(vector,Math.cos( teta)) ,  mult(m4.cross(orbitunit,vector), Math.sin(teta))), anime.point)
    
    config[anime.objectID].position.x = final[0]
    config[anime.objectID].position.y = final[1]
    config[anime.objectID].position.z = final[2]
    config[anime.objectID].rotate = teta
  }
  return (anime.dt/anime.totalTime >= 1) // retorna se terminou
}

