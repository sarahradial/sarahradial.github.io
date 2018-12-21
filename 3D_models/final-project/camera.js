function createCameraParams(){
  var params = {
    camera0: {
      near: 100, far: 6000,
      fov: 70, aspectRatio: 3/2, // from canvas dimensions, see CSS
      atX: 0, atY: 0, atZ: 0,
      eyeX: 200, eyeY: 200, eyeZ: 900,
      upX: 0, upY: 1, upZ: 0
    },
    camera1: {
      near: 100, far: 6000,
      fov: 70, aspectRatio: 3/2, // from canvas dimensions, see CSS
      atX: 0, atY: 50, atZ: 700,
      eyeX: 0, eyeY: 175, eyeZ: 525,
      upX: 0, upY: 1, upZ: 0
    },
    camera2: {
      near: 100, far: 6000,
      fov: 70, aspectRatio: 3/2, // from canvas dimensions, see CSS
      atX: 0, atY: 25, atZ: -700,
      eyeX: 100, eyeY: 100, eyeZ: -475,
      upX: 0, upY: 1, upZ: 0
    },
    camera3: {
      near: 100, far: 6000,
      fov: 70, aspectRatio: 3/2, // from canvas dimensions, see CSS
      atX: 150, atY: 25, atZ: -700,
      eyeX: -400, eyeY: 150, eyeZ: -100,
      upX: 0, upY: 1, upZ: 0
    },
    camera4: {
      near: 100, far: 6000,
      fov: 70, aspectRatio: 3/2, // from canvas dimensions, see CSS
      atX: 0, atY: 25, atZ: 700,
      eyeX: 0, eyeY: 100, eyeZ: -850,
      upX: 0, upY: 1, upZ: 0
    },
    camera5: {
      near: 100, far: 6000,
      fov: 70, aspectRatio: 3/2, // from canvas dimensions, see CSS
      atX: -300, atY: 25, atZ: 60,
      eyeX: 200, eyeY: 400, eyeZ: -800,
      upX: 0, upY: 1, upZ: 0
    },
  };
  return params;
}
// function to set up camera based on camera parameters
function setUpCamera(cameraParameters){
  var cp = cameraParameters;
  var camera = new THREE.PerspectiveCamera(cp.fov,
                                          cp.aspectRatio,
                                          cp.near,
                                          cp.far);
  camera.position.set(cp.eyeX, cp.eyeY, cp.eyeZ);
  //camera.up.set(cp.upX, cp.upY, cp.upZ);
  camera.lookAt(scene.position);
  return camera;
}
// function to update the already created camera with new parameters
function updateCamera(cameraParameters){
  var cp = cameraParameters;
  camera.position.set(cp.eyeX, cp.eyeY, cp.eyeZ);
  camera.up.set(cp.upX, cp.upY, cp.upZ);
  camera.fov = cp.fov;
  camera.lookAt(new THREE.Vector3(cp.atX, cp.atY, cp.atZ));
  camera.updateProjectionMatrix();
}
