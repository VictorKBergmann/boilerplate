var animeListCam = [{
    startTime : 0,
    dt : -1,
    translate : [0,0,0],
    rotate : [0,0,0],
    objectID : 0,
    type: lineartype,
    totalTime : 1000,
    initialPosition : [0,0,0],
    initialTarget : [0,0,1],
    initialUp:[0,0,0]
}];



function animeLinearCam(toTranslate, toRotate, totalTim, index) {
  
    var obj = {
    startTime : 0,
    dt : -1,
    type : lineartype,
    translate : [toTranslate.x,toTranslate.y,toTranslate.z],
    rotate : [toRotate.x,toRotate.y,toRotate.z],
    objectID :index,
    totalTime : totalTim,
    initialPosition : [0,0,0],
    initialTarget:[0,0,0],
    initialUp:[0,0,0],


    }
    
    return obj
}
  
  function animeRotateCam(orbits, time, index){
   var obj = {
    startTime : 0,
    dt : -1,
    type: rotationType,
    objectID : index,
    totalTime : time,
    rad: orbits.r,
    initialPosition : [0,0,0],
    initialTarget:[0,0,0],
    initialUp:[0,0,0],
    orbit : [orbits.x,orbits.y,orbits.z],
    round : orbits.rounds,   
    point : [orbits.point.x,orbits.point.y,orbits.point.z]
   }
   return obj
  }
  function animeBenzierCam(point1, point2, point3, point4, totalTim, index){
    var obj = {
      startTime : 0,
      dt : -1,
      type : benzierType,
      objectID :index,
      totalTime : totalTim,
      p1:[point1.x,point1.y,point1.z],
      p2:[point2.x,point2.y,point2.z],
      p3:[point3.x,point3.y,point3.z],
      p4:[point4.x,point4.y,point4.z],
      initialPosition:[0,0,0],
      initialTarget:[0,0,0],
      initialUp:[0,0,0],
  }
    
    
    return obj
  }
  
  
  
function animationStartCam(object){
    animeListCam[0].initialPosition = [object.position.x,object.position.y,object.position.z];
    animeListCam[0].initialTarget = [object.target.x,object.target.y,object.target.z];
    animeListCam[0].initialUp = [object.up.x,object.up.y,object.up.z];
    
    animeListCam[0].startTime = Date.now();
    
  }
  
function AnimateCam(anime){
  if( anime.dt == -1  ){animationStartCam(camera[anime.objectID])}
  anime.dt = Date.now() - anime.startTime;
  if(anime.type == lineartype){
    
    var pos = m4.addVectors(anime.initialPosition , (mult(anime.translate, (anime.dt/anime.totalTime))));
    var tar = m4.addVectors(anime.initialTarget , (mult(anime.translate, (anime.dt/anime.totalTime))))
    camera[anime.objectID].position.x = pos[0]
    camera[anime.objectID].position.y = pos[1]
    camera[anime.objectID].position.z = pos[2] 
    camera[anime.objectID].target.x = tar[0]
    camera[anime.objectID].target.y = tar[1]
    camera[anime.objectID].target.z = tar[2]  
    
    //console.log(Math.cos(anime.rotate[0]))
    var vec = [camera[anime.objectID].target.x,camera[anime.objectID].target.y,camera[anime.objectID].target.z]
    vec = m4.normalize(vec)
    
    
    
    camera[anime.objectID].target.z =Math.cos(anime.rotate[0]*anime.dt/anime.totalTime)+ vec[2]
  //  camera[anime.objectID].target.x = m4.addVectors(Math.cos(mult(anime.rotate[1],anime.dt/anime.totalTime), vec[0]))


 }
  if(anime.type == benzierType){
    var t = anime.dt/anime.totalTime;
    var pos = m4.addVectors(m4.addVectors(m4.addVectors(  mult(anime.p1,Math.pow((1 - t),3)), mult(anime.p2,(3*Math.pow((1-t),2)*t))), mult(anime.p3,(Math.pow(t,2)*3*(1-t)))), mult(anime.p4,Math.pow(t,3)))
    camera[anime.objectID].position.x = pos[0]
    camera[anime.objectID].position.y = pos[1]
    camera[anime.objectID].position.z = pos[2]
    
  }
  if(anime.type == rotationType){
    var orbitunit = m4.normalize(anime.orbit)
    var final= [0,0,0]
    var vector = m4.cross(orbitunit, [0, anime.rad,0])
    var teta = 2* anime.round*Math.PI* (anime.dt/anime.totalTime)

    final =m4.addVectors( m4.addVectors( mult(vector,Math.cos( teta)) ,  mult(m4.cross(orbitunit,vector), Math.sin(teta))), anime.point)
    
    camera[anime.objectID].position.x = final[0]
    camera[anime.objectID].position.y = final[1]
    camera[anime.objectID].position.z = final[2]
    camera[anime.objectID].target = {x:anime.point[0],y:anime.point[1],z:anime.point[2]}
    //config[anime.objectID].rotate = teta 
  }
  return (anime.dt/anime.totalTime >= 1) // retorna se terminou
}
