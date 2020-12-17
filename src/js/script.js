
function main() {
  const { gl, programInfo } = initializeWorld();

  //const cubeTranslation = [0, 0, 0];

  const arrays = {
    position: [1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1],
    normal:   [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1],
    texcoord: [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
    faceId:   { numComponents: 1, data: new Uint8Array([0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6]), },
    indices:  [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23],
  };
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

  const slices = [
    "src/images/amarelo.png",
      "src/images/branco.png",
      "src/images/vermelho.png",
      "src/images/azul.png",
      "src/images/verde.png",
      "src/images/laranja.png",
  ];
  const tex = twgl.createTexture(gl, {
    target: gl.TEXTURE_2D_ARRAY,
    src: slices,
    
  });


  
  function computeMatrix(viewProjectionMatrix, translation, Rotation, scale) {
    var matrix = m4.translate(
      viewProjectionMatrix,
      translation.x,
      translation.y,
      translation.z,
    );
    matrix = m4.scale(matrix,scale.x,scale.y,scale.z)

    //var matrix2 = m4.axisRotate(matrix,[1,0,0], Rotation.x)

    //console.log(matrix2)

    
    
    //var qua = Quaternion.fromEuler(-Rotation.z,-Rotation.x,-Rotation.y,'XYZ')
    //var w = Math.sqrt( 1- Math.pow(Rotation.x/Math.PI*2,2),2)
    //if(Rotation.x> Math.PI*2)console.log(Rotation.x)
      
    var quaX = Quaternion.fromEuler(Rotation.z,Rotation.x,Rotation.y).conjugate()
    

    matrix = m4.multiply(matrix, quaX.toMatrix4())
    //matrix = m4.yRotate(matrix, Rotation.y)
    
    //console.log(m4.normalize([Math.cos(Rotation.x),Math.cos(Rotation.y),Math.cos(Rotation.z)]))
    //console.log( rotationZYX(Rotation.z,Rotation.y,Rotation.x))
    //matrix = m4.multiply(matrix, rotationZYX(Rotation.z,Rotation.y,Rotation.x))
    //matrix = m4.axisRotate(matrix,m4.normalize([Math.cos(Rotation.x),Math.cos(Rotation.y),Math.cos(Rotation.z)]), Rotation.x+Rotation.y+Rotation.z)
    //matrix = m4.xRotate(matrix, Rotation.x)
    //matrix = m4.zRotate(matrix, Rotation.z)
    

    


    return matrix

  }




  initialize();
  loadGUI();
  
  //rotateDO(zn, 1, -3);
 

  function render() {
    var contine = true
    if(animeList.length != 0 ){//continue word is used by node already :,(
      if(animeList[0].dt == -1) contine = !i.pause
      else contine = true
    }



    if(animeList.length != 0 && contine){
      for(var j = 0; j < animeList.length; j++){
        if(Animate(animeList[j],j)) {  animeList.splice(j,1);
          if(animeList.length == 0)
            reorganize();
            
        }
      }
    }
    
    if(animeListCam.length != 0 && contine){
      if(AnimateCam(animeListCam [0])) {  animeListCam.shift();}
    }
    
    
    twgl.resizeCanvasToDisplaySize(gl.canvas);


    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //novo
    
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix = m4.perspective(camera[0].fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.

    if(camera[i.selectedCamera].target.lookAt>= 0 && camera[i.selectedCamera].target.lookAt < config.length){
      camera[i.selectedCamera].target.x = config[camera[i.selectedCamera].target.lookAt].position.x
      camera[i.selectedCamera].target.y = config[camera[i.selectedCamera].target.lookAt].position.y
      camera[i.selectedCamera].target.z = config[camera[i.selectedCamera].target.lookAt].position.z
    }
    var cameraMatrix = m4.lookAt([camera[i.selectedCamera].position.x,camera[i.selectedCamera].position.y,camera[i.selectedCamera].position.z], [camera[i.selectedCamera].target.x,camera[i.selectedCamera].target.y,camera[i.selectedCamera].target.z], [camera[i.selectedCamera].up.x,camera[i.selectedCamera].up.y,camera[i.selectedCamera].up.z]);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(programInfo.program);

    
  config.forEach(element => {

    
  element.u_matrix = computeMatrix(
    viewProjectionMatrix,
    element.position,
    element.rotate,
    element.scale
  );
  
  element.u_diffuse= tex
  element.u_faceIndex= [0, 1, 2, 3, 4, 5,6,7,8,9]
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      
  // Set the uniforms we just computed
  twgl.setUniforms(programInfo, element);

  twgl.drawBufferInfo(gl, bufferInfo);
  
}); 
  
	requestAnimationFrame(render);
  }
     
  requestAnimationFrame(render);
}

main();
