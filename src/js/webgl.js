const vertexShaderSource = `#version 300 es

  in vec4 a_position;
 

  in vec2 a_texcoord;
  in uint a_faceId;
  out vec2 v_texCoord;
  flat out uint v_faceId;

  uniform mat4 u_matrix;


  void main() {
    
    gl_Position = u_matrix * a_position;
   
    
    v_faceId = a_faceId;
    v_texCoord = a_texcoord;
    
  }
`;

const fragmentShaderSource = `#version 300 es
precision highp float;


in vec2 v_texCoord;
flat in uint v_faceId;

uniform mediump sampler2DArray u_diffuse;

uniform uint u_faceIndex[6];


out vec4 outColor;

void main() {
   outColor = texture(u_diffuse, vec3(v_texCoord, u_faceIndex[v_faceId]));
}
`;

const initializeWorld = () => {
  const canvas = document.querySelector("#canvas");
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }
  twgl.setAttributePrefix("a_");
  const programInfo = twgl.createProgramInfo(gl, [
    vertexShaderSource,
    fragmentShaderSource,
  ]);

  return {
    gl,
    programInfo,
  };
};

