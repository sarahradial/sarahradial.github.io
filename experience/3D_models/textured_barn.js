function addTextureCoords(barnGeom) {
    if( ! barnGeom instanceof THREE.Geometry ) {
        throw "not a THREE.Geometry: "+barnGeom;
    }
    // array of face descriptors
    var UVs = [];
    function faceCoords(as,at, bs,bt, cs,ct) {
        UVs.push( [ new THREE.Vector2(as,at),
                    new THREE.Vector2(bs,bt),
                    new THREE.Vector2(cs,ct)] );
    }
    // front
    faceCoords(0,0, 1,0, 1,1);
    faceCoords(0,0, 1,1, 0,1);
    faceCoords(0,1, 1,1, 1,1);  // special for the upper triangle
    // back.  Vertices are not quite analogous to the front, alas
    faceCoords(1,0, 0,1, 0,0);
    faceCoords(1,0, 1,1, 0,1);
    faceCoords(0,1, 1,1, 1,1);  // special for upper triangle
    //roof
    faceCoords(1,0, 1,1, 0,0);
    faceCoords(1,1, 0,1, 0,0);
    faceCoords(0,0, 1,0, 1,1);
    faceCoords(0,1, 0,0, 1,1);
    // sides
    faceCoords(1,0, 0,1, 0,0);
    faceCoords(1,1, 0,1, 1,0);
    faceCoords(1,0, 1,1, 0,0);
    faceCoords(1,1, 0,1, 0,0);
    // floor
    faceCoords(0,0, 1,0, 0,1);
    faceCoords(1,0, 1,1, 0,1);
    // Finally, attach this to the geometry
    barnGeom.faceVertexUvs = [ UVs ];
}
function createBarnTextureLighting(barnGeom, barnMaterial){
  barnGeom.faces[0].materialIndex = 0;
  barnGeom.faces[1].materialIndex = 0;
  barnGeom.faces[2].materialIndex = 0;
  barnGeom.faces[3].materialIndex = 0;
  barnGeom.faces[4].materialIndex = 0;
  barnGeom.faces[5].materialIndex = 0;
  barnGeom.faces[6].materialIndex = 0;
  barnGeom.faces[7].materialIndex = 0;
  barnGeom.faces[8].materialIndex = 0;
  barnGeom.faces[9].materialIndex = 0;
  barnGeom.faces[10].materialIndex = 0;
  barnGeom.faces[11].materialIndex = 0;
  barnGeom.faces[12].materialIndex = 0;
  barnGeom.faces[13].materialIndex = 0;
  barnGeom.faces[14].materialIndex = 0;
  barnGeom.faces[15].materialIndex = 0;
}
function createMaterialTexture(){

}
