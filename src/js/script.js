function main() {
  const { gl, programInfo } = initializeWorld();

  //const cubeTranslation = [0, 0, 0];

  var sphereBufferInfo = flattenedPrimitives.createSphereBufferInfo(gl, 10, 12, 6);
  var cubeBufferInfo   = flattenedPrimitives.createCubeBufferInfo(gl, 20);
  var coneBufferInfo   = flattenedPrimitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);

  var sphereVAO = twgl.createVAOFromBufferInfo(gl, programInfo, sphereBufferInfo);
  var cubeVAO   = twgl.createVAOFromBufferInfo(gl, programInfo, cubeBufferInfo);
  var coneVAO   = twgl.createVAOFromBufferInfo(gl, programInfo, coneBufferInfo);

  var fieldOfViewRadians = degToRad(60);


  function computeMatrix(viewProjectionMatrix, translation, yRotation, scale) {
    var matrix = m4.translate(
      viewProjectionMatrix,
      translation.x,
      translation.y,
      translation.z,
    );
    matrix = m4.scale(matrix,scale.x,scale.y,scale.z)

    return m4.yRotate(matrix, yRotation);
  }

  loadGUI();
  
  function render() {

    if(animeList.length != 0){
      if(LinearAnimate(animeList[0])) {  animeList.shift();}
    }


    //animateDOIT();
    animateDOITCam();
    if(benzier.objectID>= 0 && benzier.objectID < config.length){config[benzier.objectID].position = benzierCurve();}
    
    
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix = m4.perspective(camera[0].fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.

    if(camera[i.selectedCamera].target.lookAt>= 0 && camera[i.selectedCamera].target.lookAt < config.length){
      camera[i.selectedCamera].target.x = config[camera[i.selectedCamera].target.lookAt].position.x
      camera[i.selectedCamera].target.y = config[camera[i.selectedCamera].target.lookAt].position.y
      camera[i.selectedCamera].target.z = config[camera[i.selectedCamera].target.lookAt].position.z
    }
    var cameraMatrix = m4.lookAt([camera[i.selectedCamera].position.x,camera[i.selectedCamera].position.y,camera[i.selectedCamera].position.z], [camera[i.selectedCamera].target.x,camera[i.selectedCamera].target.y,camera[i.selectedCamera].target.z], camera[i.selectedCamera].up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(programInfo.program);

    
  config.forEach(element => {

  if(element.type == cube){gl.bindVertexArray(cubeVAO);}
  if(element.type == sphere){gl.bindVertexArray(sphereVAO);}
  if(element.type == cone){gl.bindVertexArray(coneVAO);}


  element.u_matrix = computeMatrix(
    viewProjectionMatrix,
    element.position,
    element.rotate,
    element.scale
  );

  // Set the uniforms we just computed
  twgl.setUniforms(programInfo, element);

  if(element.type == cube)  {twgl.drawBufferInfo(gl, cubeBufferInfo);   }
  if(element.type == sphere){twgl.drawBufferInfo(gl, sphereBufferInfo); }
  if(element.type == cone)  {twgl.drawBufferInfo(gl, coneBufferInfo);   }
 

}); 
  
	requestAnimationFrame(render);
  }
     
  requestAnimationFrame(render);
}

main();
