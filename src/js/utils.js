const degToRad = (d) => (d * Math.PI) / 180;

const radToDeg = (r) => (r * 180) / Math.PI;

function mult(a,b){
    var c = [0,0,0]
    for(var i =0; i!= a.length;i++) c[i] = a[i]*b
    return c
  }


function initialize(){
  for(var i = -1; i!=2; i++){ 
    for(var j = -1; j!=2; j++){
      for(var k = -1; k!=2; k++){
        if(i == 0 && j == 0 && k == 0){continue}
        config.push({ 
          rotate: {x: 0,y: 0,z: 0},
          scale: {x:10,y:10,z:10},
          position: {x: j*20,y: k*20,z: i*20}, 
          index: config.length,
          u_matrix: m4.identity(),

        })
      
        if( j== 0 && k == -1 && i == 0){console.log(config.length)}      
      }
    }
  }
  reorganize();
}



function reorganize(){
  zp = []
  zn = []
  yp = []
  yn = []
  xp = []
  xn = []
  
  config.forEach(element => {

    if(element.position.x ==  20){xp.push(element.index)}
    if(element.position.x == -20){xn.push(element.index)}

    if(element.position.y ==  20){yp.push(element.index)}
    if(element.position.y == -20){yn.push(element.index)}
    
    if(element.position.z ==  20){zp.push(element.index)}
    if(element.position.z == -20){zn.push(element.index)}

  });

} 

var zp = [],zn= [], yp= [], yn= [], xp= [], xn= [];



function rotateDO(list, ClockWise, axis){
  if(animeList.length != 0 ){return}
  var round = 0.25
  var contine =false
  
  if(isPositive(ClockWise)  && axis == -3 && !contine){ round *= -1;ClockWise *= -1; contine = true}
  if(!isPositive(ClockWise) && axis == 3 && !contine){ ClockWise *= -1;contine = true }
  if(isPositive(ClockWise)  && axis == 3 && !contine){ round *= -1; ClockWise *= -1;contine = true }
  if(!isPositive(ClockWise)  && axis == -3 && !contine){ClockWise *= -1;contine = true }

  if(!isPositive(ClockWise) && axis == 2 && !contine){ClockWise *= -1;contine = true}
  if(isPositive(ClockWise)  && axis == 2 && !contine){ round *= -1; ClockWise *= -1;contine = true }
  if(!isPositive(ClockWise) && axis == -2 && !contine){ round *= -1;contine = true }
 
  if(!isPositive(ClockWise) && axis == 1 && !contine){ClockWise *= -1;contine = true}
  if(isPositive(ClockWise)  && axis == 1 && !contine){ round *= -1; ClockWise *= -1;contine = true }
  if(!isPositive(ClockWise) && axis == -1 && !contine){ round *= -1;contine = true}
   
    if(axis == 1){axis = [1,0,0]}
    if(axis == 2){axis = [0,1,0]}
    if(axis == 3){axis = [0,0,1]}
    if(axis == -1){axis = [-1,0,0]}
    if(axis == -2){axis = [0,-1,0]}
    if(axis == -3){axis = [0,0,-1]}

  list.forEach(element => {
    
    
    var rad = m4.length(m4.subtractVectors([config[element].position.x,config[element].position.y,config[element].position.z],mult(axis,40)))
    
    var b = {x: axis[0],
      y : axis[1],
      z: axis[2],
      r:rad,
      rounds:round,
      point:{x:axis[0]*20,y:axis[1]*20,z:axis[2]*20}

    }
    animeList.push(animeRotate(b, 500, element, ClockWise));

  });
}


function isPositive(b){
  if(b>=0) return true
  return false
}
function signal(b){
  if(b>=0) return 1
  return -1
}
