const degToRad = (d) => (d * Math.PI) / 180;

const radToDeg = (r) => (r * 180) / Math.PI;

function mult(a,b){
    var c = [0,0,0]
    for(var i =0; i!= a.length;i++) c[i] = a[i]*b
    return c
  }

