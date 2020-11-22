const cube = 0
const sphere = 1
const cone = 2



var config =[{ rotate: {x:1,y:1,z:1},
  scale: {x:1,y:1,z:1},
  position: {x: 0,y: 0,z: 0}, 
  index: 0,
  u_matrix: m4.identity(),
  u_colorMult: [0.5, 1, 0.5, 1],
  type: cube
},
 {rotate: {x:1,y:1,z:1},
  scale: {x:1,y:1,z:1},
  position: {x: 0,y: -30,z: 0}, 
  index: 1,
  u_matrix: m4.identity(),
  u_colorMult: [0.5, 1, 0.5, 1],
  type: sphere}];
 
  var camera = [{
    position: {x: 0,y: 0,z: 100},
    target : {x: 0,y: 0,z: 0, lookAt : -1},
    up : [0, 1, 0],
    index: 0,
    fieldOfViewRadians : degToRad(60)
  },
  {
    position: {x: 100,y: 0,z: 0},
    target : {x: 0,y: 0,z: 0, lookAt : -1},
    up : [0, 1, 0],
    index: 1,
    fieldOfViewRadians : degToRad(60)
  },
  {
    position: {x: 0.05,y: -100,z: 0},
    target : {x: 0,y: 0,z: 0, lookAt : -1},
    up : [0, 1, 0],
    index: 2,
    fieldOfViewRadians : degToRad(60)
  }
];
  

  var i = { 
    addobj: function addObject() {config.push({ 
        rotate: {x:1,y:1,z:1},
        scale: {x:1,y:1,z:1},
        position: {x: 0,y: 0,z: 0}, 
        index: config.length,
        u_matrix: m4.identity(),
        u_colorMult: [Math.random(), Math.random(), Math.random(), 1],
        type: Math.floor((Math.random()*3))
      });

      addOnGui(this.gui, config[config.length-1]);
    },


    gui: new dat.GUI(),
    translateSpace: {x:50,y:0,z:0},
    RotateSpace: {x:0,y:Math.PI,z:0},
    scaleSpace:{x:1,y:1,z:1},
    time: 1000,
    objectID: 1,
    selectedCamera : 0,
    animateLinear: function animateLinear() {
      if(this.objectID>= 0 && this.objectID < config.length){
        animeList.push(animeLinear(this.translateSpace, this.RotateSpace,this.scaleSpace, this.time, config[this.objectID]))       
      }
    },
    animateBenzier: function animateBenzier(){
      if(this.objectID>= 0 && this.objectID < config.length){

        animeList.push(animeBenzier(benzier.p1,benzier.p2,benzier.p3,benzier.p4, this.time,config[this.objectID]));
      }
    },
    animateRotate: function animateRotate(){
      if(this.objectID>= 0 && this.objectID < config.length){

        animeList.push(animeRotate(orbit,this.time,this.objectID));
      }
    },
    animateLinearCam: function animateLinearCam() {
      startTime = Date.now();
      animeListCam.push(animeLinearCam(this.translateSpace.x, this.RotateSpace.y, this.time, this.selectedCamera))       
      
    },
    animateBenzierCam: function animateBenzierCam() {
      startTime = Date.now();
      animeListCam.push(animeBenzierCam(benzier.p1,benzier.p2,benzier.p3,benzier.p4, this.time, this.selectedCamera))       
      
    },
    animateRotateCam: function animateRotateCam() {
      startTime = Date.now();
      animeListCam.push(animeRotateCam(orbit,this.time,this.selectedCamera))       
      
    },
}

var benzier = {
  p1 : {x : -90, y : -50, z : 0},
  p2 : {x : -90, y : 50, z : 0},
  p3 : {x : 90, y : 50, z : 0},
  p4 : {x : 90, y : -50, z : 0},
};

var orbit = {
  x:0,
  y:2,
  z:1,
  r:20,
  rounds:3,
  point:{x:0,y:20,z:0}
}

const loadGUI = () => {

  i.gui.add(i,"addobj");

  var cam = [0,1,2];
  var cameras = i.gui.addFolder("cameras");
  cameras.add(i,"selectedCamera", 0, 2, 1 )
  for(j = 0; j!= 3; j++){
    cam[j] = cameras.addFolder("camera" + j);
    var camTrans = cam[j].addFolder("Translation");
    camTrans.add(camera[j].position,"x", -200, 200, 0.05 )
    camTrans.add(camera[j].position,"y", -200, 200, 0.05 )
    camTrans.add(camera[j].position,"z", -200, 200, 0.05 )
    camTrans.add(camera[j].target,"x", -200, 200, 0.05 )
    cam[j].add(camera[j].target,"lookAt", 0, 10, 1 )
    cam[j].add(camera[j],"fieldOfViewRadians", 0.1, Math.PI, 0.01 )
  }


  var anim= i.gui.addFolder("animations")
  anim.add(i,"time" ,1000 ,10000 ,1 )
  anim.add(i,"objectID" ,-1 ,5 ,1 )
  var lin = anim.addFolder("Linear")
  trans = lin.addFolder("Translate");
  trans.add(i.translateSpace,"x",-200,200,0.005) 
  trans.add(i.translateSpace,"y",-200,200,0.005) 
  trans.add(i.translateSpace,"z",-200,200,0.005) 
  rot = lin.addFolder("Rotate");
  rot.add(i.RotateSpace,"x",-200,200,0.005) 
  rot.add(i.RotateSpace,"y",-200,200,0.005) 
  rot.add(i.RotateSpace,"z",-200,200,0.005) 
  scl = lin.addFolder("Scale");
  scl.add(i.scaleSpace,"x", -5,5,0.005) 
  scl.add(i.scaleSpace,"y",-5,5,0.005) 
  scl.add(i.scaleSpace,"z",-5,5,0.005) 
  
  lin.add(i,"animateLinear");

  

  var rotateF = anim.addFolder("rotate")
  rotateF.add(orbit,"x",-200,200,0.005)
  rotateF.add(orbit,"y",-200,200,0.005)
  rotateF.add(orbit,"z",-200,200,0.005)
  rotateF.add(orbit,"r", 0,100,0.005)
  rotateF.add(orbit,"rounds", 0,20,0.1)
  pointF = rotateF.addFolder("point")
  
  pointF.add(orbit.point,"x", -200,200,0.005)
  pointF.add(orbit.point,"y", -200,200,0.005)
  pointF.add(orbit.point,"z", -200,200,0.005)
  
  rotateF.add(i,"animateRotate")


  
   
  var benzierF = anim.addFolder("benzier");

  benzierF.add(benzier.p1, "x", -200, 200, 0.05 )
  benzierF.add(benzier.p1, "y", -200, 200, 0.05 )
  benzierF.add(benzier.p1, "z", -200, 200, 0.05 )
  benzierF.add(benzier.p2, "x", -200, 200, 0.05 )
  benzierF.add(benzier.p2, "y", -200, 200, 0.05 )
  benzierF.add(benzier.p2, "z", -200, 200, 0.05 )
  benzierF.add(benzier.p3, "x", -200, 200, 0.05 )
  benzierF.add(benzier.p3, "y", -200, 200, 0.05 )
  benzierF.add(benzier.p3, "z", -200, 200, 0.05 )
  benzierF.add(benzier.p4, "x", -200, 200, 0.05 )
  benzierF.add(benzier.p4, "y", -200, 200, 0.05 )
  benzierF.add(benzier.p4, "z", -200, 200, 0.05 )  
  benzierF.add(i,"animateBenzier");
  config.forEach(element => addOnGui(i.gui, element));
  
  lin.add(i,"animateLinearCam");
  benzierF.add(i, "animateBenzierCam");
  rotateF.add(i,"animateRotateCam")
};


function addOnGui(gui, item){
  var folder = (gui.addFolder("Object "+ item.index));  
  transFolder = folder.addFolder("Translation");
  transFolder.add(item.position,"x", -100, 100, 0.5);
  transFolder.add(item.position,"y", -100, 100, 0.5);
  transFolder.add(item.position,"z", -100, 100, 0.5);
  scaleFolder = folder.addFolder("Scale");
  scaleFolder.add(item.scale,"x", 0, 10, 0.1);
  scaleFolder.add(item.scale,"y", 0, 10, 0.1);
  scaleFolder.add(item.scale,"z", 0, 10, 0.1);
//  folder.add(item, "rotate", 0, 20, 0.5);
}
