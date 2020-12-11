const cube = 0
const sphere = 1
const cone = 2



var config =[];
 
  var camera = [{
    position: {x: -70,y: -60,z: 100},
    target : {x: 0,y: 0,z: 0, lookAt : -1},
    up : {x: 0,y: 1,z: 0},
    index: 0,
    fieldOfViewRadians : degToRad(60)
  },
  {
    position: {x: 100,y: 0,z: 0},
    target : {x: 0,y: 0,z: 0, lookAt : -1},
    up : {x: 0,y: 1,z: 0},
    index: 1,
    fieldOfViewRadians : degToRad(60)
  },
  {
    position: {x: 0.05,y: -100,z: 0},
    target : {x: 0,y: 0,z: 0, lookAt : -1},
    up : {x: 0,y: 1,z: 0},
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

    },


    gui: new dat.GUI(),
    translateSpace: {x:50,y:0,z:0},
    RotateSpace: {x:0,y:Math.PI,z:0},
    scaleSpace:{x:1,y:1,z:1},
    time: 1000,
    objectID: 1,
    selectedCamera : 0,
    pause:false,
    animateLinear: function animateLinear() {
      if(this.objectID>= 0 && this.objectID < config.length){
        animeList.push(animeLinear(this.translateSpace, this.RotateSpace,this.scaleSpace, this.time, config[this.objectID]))       
        console.log(animeList.length)
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
      animeListCam.push(animeLinearCam(this.translateSpace, this.RotateSpace, this.time, this.selectedCamera))       
      
    },
    animateBenzierCam: function animateBenzierCam() {
      startTime = Date.now();
      animeListCam.push(animeBenzierCam(benzier.p1,benzier.p2,benzier.p3,benzier.p4, this.time, this.selectedCamera))       
      
    },
    animateRotateCam: function animateRotateCam() {
      startTime = Date.now();
      animeListCam.push(animeRotateCam(orbit,this.time,this.selectedCamera))       
      
    },
    X_pos_CW: function X_pos_CW(){rotateDO(xp, 1, 1);},
    X_pos_CC: function X_pos_CC(){rotateDO(xp, -1, 1);},
    X_neg_CW: function X_neg_CW(){rotateDO(xn, 1, -1);},
    X_neg_CC: function X_neg_CC(){rotateDO(xn, -1, -1);},

    Y_pos_CW: function Y_pos_CW(){rotateDO(yp, 1, 2);},
    Y_pos_CC: function Y_pos_CC(){rotateDO(yp, -1, 2);},
    Y_neg_CW: function Y_neg_CW(){rotateDO(yn, 1, -2);},
    Y_neg_CC: function Y_neg_CC(){rotateDO(yn, -1, -2);},

    Z_pos_CW: function Z_pos_CW(){rotateDO(zp, 1, 3);},
    Z_pos_CC: function Z_pos_CC(){rotateDO(zp, -1, 3);},
    Z_neg_CW: function Z_neg_CW(){rotateDO(zn, 1, -3);},
    Z_neg_CC: function Z_neg_CC(){rotateDO(zn, -1, -3);},

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

  var cam = [0,1,2];
  var cameras = i.gui.addFolder("cameras");
  cameras.add(i,"selectedCamera", 0, 2, 1 )
  for(j = 0; j!= 3; j++){
    cam[j] = cameras.addFolder("camera" + j);
    var camTrans = cam[j].addFolder("Translation");
    camTrans.add(camera[j].position,"x", -200, 200, 0.05 )
    camTrans.add(camera[j].position,"y", -200, 200, 0.05 )
    camTrans.add(camera[j].position,"z", -200, 200, 0.05 )
    tar = camTrans.addFolder("target")
    up = camTrans.addFolder("up")
    tar.add(camera[j].target,"x", -200, 200, 0.05 )
    tar.add(camera[j].target,"y", -200, 200, 0.05 )
    tar.add(camera[j].target,"z", -200, 200, 0.05 )
    up.add(camera[j].up,"x", -200, 200, 0.05 )
    up.add(camera[j].up,"y", -200, 200, 0.05 )
    up.add(camera[j].up,"z", -200, 200, 0.05 )
    
    cam[j].add(camera[j].target,"lookAt", 0, 10, 1 )
    cam[j].add(camera[j],"fieldOfViewRadians", 0.1, Math.PI, 0.01 )
  }

  i.gui.add(i,"X_pos_CW");
  i.gui.add(i,"X_pos_CC");
  i.gui.add(i,"X_neg_CW");
  i.gui.add(i,"X_neg_CC");

  i.gui.add(i,"Y_pos_CW");
  i.gui.add(i,"Y_pos_CC");
  i.gui.add(i,"Y_neg_CW");
  i.gui.add(i,"Y_neg_CC");

  i.gui.add(i,"Z_pos_CW");
  i.gui.add(i,"Z_pos_CC");
  i.gui.add(i,"Z_neg_CW");
  i.gui.add(i,"Z_neg_CC");
  
};

