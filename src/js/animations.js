const lineartype = 0
const benzierType = 1
const rotationType = 2


var animeList = [

];

function animeLinear(toTranslate, toRotate,toScale, totalTim, object) {
  
  var obj = {
  startTime : 0,
  dt : -1,
  type : lineartype,
  translate : [toTranslate.x,toTranslate.y,toTranslate.z],
  scale:[toScale.x,toScale.y,toScale.z],
  rotate : [toRotate.x,toRotate.y,toRotate.z],
  objectID :object.index,
  totalTime : totalTim,
  initialPosition : [0,0,0],
  initialRotation : [0,0,0],
  initicialScale:[1,1,1]
}
  return obj
}

function animeRotate(orbits, time, index, clockWise){
 var obj = {
  startTime : 0,
  dt : -1,
  type: rotationType,
  objectID : index,
  totalTime : time,
  rad: orbits.r,
  orbit : [orbits.x,orbits.y,orbits.z],
  round : orbits.rounds,   
  point : [orbits.point.x,orbits.point.y,orbits.point.z],
  vetor :  m4.normalize([config[index].position.x, config[index].position.y,config[index].position.z]),
  clockwise: clockWise
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
    
    p1:[point1.x,point1.y,point1.z],
    p2:[point2.x,point2.y,point2.z],
    p3:[point3.x,point3.y,point3.z],
    p4:[point4.x,point4.y,point4.z],
  }
  
  return obj
}


function animationStart(object, h){
    if(animeList[h].type == lineartype){
      animeList[h].initialPosition = [object.position.x,object.position.y,object.position.z];
      animeList[h].initialRotation = [object.rotate.x,object.rotate.y,object.rotate.z];
      animeList[h].initicialScale = [object.scale.x,object.scale.y,object.scale.z]
    }
  animeList[h].startTime = Date.now();
  
}

function Animate(anime, h){
  if( anime.dt == -1  ){animationStart(config[anime.objectID], h)}
  
  anime.dt = Date.now() - anime.startTime;
  if(anime.dt/anime.totalTime > 1){anime.dt = anime.totalTime}
  if(anime.type == lineartype){
    var pos = (m4.addVectors(anime.initialPosition,mult(anime.translate, (anime.dt/anime.totalTime))));  
    var rot = m4.addVectors(anime.initialRotation , mult(anime.rotate ,(anime.dt/anime.totalTime)));
    var scale = m4.addVectors(anime.initicialScale,mult(anime.scale ,(anime.dt/anime.totalTime)))
    
    

    config[anime.objectID].position.x = pos[0]
    config[anime.objectID].position.y = pos[1]
    config[anime.objectID].position.z = pos[2]
    config[anime.objectID].rotate.x = rot[0]
    config[anime.objectID].rotate.y = rot[1]
    config[anime.objectID].rotate.z = rot[2]
    config[anime.objectID].scale.x =scale[0]
    config[anime.objectID].scale.y =scale[1]
    config[anime.objectID].scale.z =scale[2]
    
  }
  if(anime.type == benzierType){
    var t = anime.dt/anime.totalTime;
    var pos = m4.addVectors(m4.addVectors(m4.addVectors(  mult(anime.p1,Math.pow((1 - t),3)), mult(anime.p2,(3*Math.pow((1-t),2)*t))), mult(anime.p3,(Math.pow(t,2)*3*(1-t)))), mult(anime.p4,Math.pow(t,3)))
    config[anime.objectID].position.x = pos[0]
    config[anime.objectID].position.y = pos[1]
    config[anime.objectID].position.z = pos[2]

  }
  if(anime.type == rotationType){
    var orbitunit = m4.normalize(anime.orbit)
    var final= [0,0,0]

    var vector = mult(m4.cross(orbitunit, anime.vetor), anime.rad)
    
    var teta = 2* anime.round*Math.PI* (anime.dt/anime.totalTime)

    final =m4.addVectors( m4.addVectors( mult(vector,Math.cos( teta)) ,  mult(m4.cross(orbitunit,vector), Math.sin(teta))), anime.point)
    //rodrigues rotation formula: https://en.wikipedia.org/wiki/Rodrigues%27_rotation_formula#:~:text=In%20the%20theory%20of%20three-dimensional%20rotation%2C%20Rodrigues%27%20rotation,space%2C%20given%20an%20axis%20and%20angle%20of%20rotation.
    config[anime.objectID].position.x = final[0]
    config[anime.objectID].position.y = final[1]
    config[anime.objectID].position.z = final[2]
    config[anime.objectID].rotate.x = (anime.clockwise *Math.PI * (anime.dt/anime.totalTime) /2) * orbitunit[0]
    config[anime.objectID].rotate.y = (anime.clockwise *Math.PI * (anime.dt/anime.totalTime) /2) * orbitunit[1]
    config[anime.objectID].rotate.z = (anime.clockwise *Math.PI * (anime.dt/anime.totalTime) /2) * orbitunit[2]
  }
  return (anime.dt/anime.totalTime == 1) // retorna se terminou
}


