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
