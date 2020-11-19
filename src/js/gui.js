const cube = 0
const sphere = 1
const cone = 2



var config =[{ rotate: degToRad(20),
  scale: {x:1,y:1,z:1},
  position: {x: 0,y: 0,z: 0}, 
  index: 0,
  u_matrix: m4.identity(),
  u_colorMult: [0.5, 1, 0.5, 1],
  type: cube
},
 {rotate: degToRad(20),
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
    fieldOfViewRadians : degToRad(60)
  },
  {
    position: {x: 100,y: 0,z: 0},
    target : {x: 0,y: 0,z: 0, lookAt : -1},
    up : [0, 1, 0],
    fieldOfViewRadians : degToRad(60)
  },
  {
    position: {x: 0.05,y: -100,z: 0},
    target : {x: 0,y: 0,z: 0, lookAt : -1},
    up : [0, 1, 0],
    fieldOfViewRadians : degToRad(60)
  }
];
  

  var i = { 
    addobj: function addObject() {config.push({ 
        rotate: degToRad(20),
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
    translateSpace: 50,
    RotateSpace: 6.28,
    steps: 3,
    objectID: 1,
    selectedCamera : 0,
    animate: function animate() {
      if(this.objectID>= 0 && this.objectID < config.length){
        startTime = Date.now();
        
        initialPosition = [config[this.objectID].position.x,config[this.objectID].position.y,config[this.objectID].position.z]

        animateStart(this.translateSpace, this.RotateSpace, 1000, this.steps, this.objectID, true);
      }
    },
    animateCam: function animateCam() {
      startTime = Date.now();
        
      initialPosition = [camera[this.selectedCamera].position.x,camera[this.selectedCamera].position.y,camera[this.selectedCamera].position.z]

      animateStart(this.translateSpace, this.RotateSpace, 1000, this.steps, this.selectedCamera, false);
      
      
    }
    
}

var benzier = {
  p1 : {x : -90, y : -50, z : 0},
  p2 : {x : -90, y : 50, z : 0},
  p3 : {x : 90, y : 50, z : 0},
  p4 : {x : 90, y : -50, z : 0},
  t : 0,
  objectID : -1
};




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
  anim.add(i,"translateSpace", -100, 100, 0.5);
  anim.add(i,"RotateSpace", -50, 50, 0.05);
  anim.add(i,"steps" ,2 ,10 ,1 )
  anim.add(i,"objectID" ,-1 ,5 ,1 )  
  anim.add(i,"animate");
  anim.add(i,"animateCam");

   
   
  var benzierF = i.gui.addFolder("benzier");

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
  benzierF.add(benzier, "t", 0, 1, 0.0005 )
  benzierF.add(benzier,"objectID" ,-1 ,5 ,1 )  

  config.forEach(element => addOnGui(i.gui, element));
  

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
  folder.add(item, "rotate", 0, 20, 0.5);
}
