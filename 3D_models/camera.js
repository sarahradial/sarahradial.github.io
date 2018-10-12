// default camera cameraParameters
function defaultParameters(){
  var params = {
    near: 5,
    far: 80,
    fov: 90,                  // degrees
    aspectRatio: 1, // from canvas dimensions, see CSS
    atX: 0,
    atY: 0,
    atZ: 0,
    eyeX: 0,
    eyeY: 0,
    eyeZ: 25,
    upX: 0,
    upY: 1,
    upZ: 0
  };
  return params;
}
// set up the camera based on camera parameters
function setUpCamera(cameraParameters){
  var cp = cameraParameters;
  var camera = new THREE.PerspectiveCamera(cp.fov,
                                          cp.aspectRatio,
                                          cp.near,
                                          cp.far);
  camera.position.set(cp.eyeX, cp.eyeY, cp.eyeZ);
  camera.up.set(cp.upX, cp.upY, cp.upZ);
  camera.lookAt(new THREE.Vector3(cp.atX, cp.atY, cp.atZ));
  return camera;
}
function makeFence(numPickets) {
    /* Makes a fence, with the left end at the origin and proceeding down
       the x axis. The pickets are made from barn objects, scaled to be unit
       height (at the shoulder) and very thin. */

    var fence = new THREE.Object3D();

    var picketG = TW.createBarn(.09, 1, 0.1);
    var picketM = new THREE.MeshNormalMaterial();
    var picket = new THREE.Mesh(picketG,picketM);
    var i;

    for( i = 0; i < numPickets; ++i ) {
        picket = picket.clone();
        picket.translateX(0.1);
        fence.add(picket);
    }
    return fence;
}
