const lineartype = 0
const benzierType = 1
const rotationType = 2


var animeList = [];


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


function animationStart(object, h){
    
  animeList[h].initialRotation = [object.rotate.x,object.rotate.y,object.rotate.z];
  animeList[h].startTime = Date.now();
  
}

function Animate(anime, h){
  if( anime.dt == -1  ){animationStart(config[anime.objectID], h)}
     
  anime.dt = Date.now() - anime.startTime;
  if(anime.dt/anime.totalTime > 1){anime.dt = anime.totalTime}
  
    var orbitunit = m4.normalize(anime.orbit)
    var final= [0,0,0]

    var vector = mult(m4.cross(orbitunit, anime.vetor), anime.rad)
    
    var teta = 2* anime.round*Math.PI* (anime.dt/anime.totalTime) - degToRad(90)

    final =m4.addVectors( m4.addVectors( mult(vector,Math.cos( teta)) ,  mult(m4.cross(orbitunit,vector), Math.sin(teta))), anime.point)
    //rodrigues rotation formula: https://en.wikipedia.org/wiki/Rodrigues%27_rotation_formula#:~:text=In%20the%20theory%20of%20three-dimensional%20rotation%2C%20Rodrigues%27%20rotation,space%2C%20given%20an%20axis%20and%20angle%20of%20rotation.
    config[anime.objectID].position.x = final[0]
    config[anime.objectID].position.y = final[1]
    config[anime.objectID].position.z = final[2]
    
 
    config[anime.objectID].rotate.x = ((anime.clockwise *(Math.PI/2) * (anime.dt/anime.totalTime) )* orbitunit[0]) + anime.initialRotation[0]
    config[anime.objectID].rotate.y = ((anime.clockwise *(Math.PI/2) * (anime.dt/anime.totalTime) )* orbitunit[1]) + anime.initialRotation[1]
    config[anime.objectID].rotate.z = ((anime.clockwise *(Math.PI/2) * (anime.dt/anime.totalTime) )* orbitunit[2]) + anime.initialRotation[2]



    if(config[anime.objectID].rotate.x >= 2*Math.PI)config[anime.objectID].rotate.x -= 2*Math.PI
    if(config[anime.objectID].rotate.y >= 2*Math.PI)config[anime.objectID].rotate.y -= 2*Math.PI
    if(config[anime.objectID].rotate.z >= 2*Math.PI)config[anime.objectID].rotate.z -= 2*Math.PI
    if(config[anime.objectID].rotate.x < 0)config[anime.objectID].rotate.x += 2*Math.PI
    if(config[anime.objectID].rotate.y < 0)config[anime.objectID].rotate.y += 2*Math.PI
    if(config[anime.objectID].rotate.z < 0)config[anime.objectID].rotate.z +=2* Math.PI
 


    if(anime.dt/anime.totalTime == 1){
      config[anime.objectID].position.x = Math.round(config[anime.objectID].position.x)
      config[anime.objectID].position.y = Math.round(config[anime.objectID].position.y)
      config[anime.objectID].position.z = Math.round(config[anime.objectID].position.z)
      if(anime.objectID == 11 ||anime.objectID == 2)
        console.log(config[anime.objectID].rotate)
    }
  
  
  return (anime.dt/anime.totalTime == 1) // retorna se terminou
  
}


