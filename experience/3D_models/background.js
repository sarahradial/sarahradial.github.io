// function to create fancy tree params
function createTreeParams(){
  var params = {
    totalHeight: 150, baseRadius: 10, spacing: 30, bottomSpace: 50,
    radius1: 14, radius2: 12, radius3: 8
  };
  return params;
}
// function to create side walk params
function createSideWalkParams(){
  var params = {
    spacing: 20, side: 60, thickness: 5,
    totalDistance: 1200
  };
  return params;
}
// function to create sun params
function createSunParams(){
  var params = {
    radius: 100,
    xCoord: 0, yCoord: 800, zCoord: 0
  };
  return params;
}
// function to create fire fly params
// decided to put in the colors in the parameters here since there will be
// different colored flies (body and light)
function createFireFlyParams(){
  var params = {
    firefly1 : {
      bodyColor: 0x404A5B, lightColor: 0xFFFFFF, intensity: 4, distance: 50,
      bodyRadius: 3, scaleBodyZ: 2.0, scaleLightZ: 0.8,
      xCoord: 75, yCoord: 60, zCoord: 700,
      wingWidth: 4, wingHeight: 1, wingDepth: 4, wingAngle: Math.PI*7/4,
      animX: 10, animY: 6, animZ: 20
    },
    firefly2 : {
      bodyColor: 0x192538, lightColor: 0x9efff8, intensity: 4, distance: 50,
      bodyRadius: 3, scaleBodyZ: 2.0, scaleLightZ: 0.8,
      xCoord: 0, yCoord: 70, zCoord: 720,
      wingWidth: 4, wingHeight: 1, wingDepth: 4, wingAngle: Math.PI*7/4,
      animX: -40, animY: 2, animZ: -20
    },
    firefly3 : {
      bodyColor: 0x747382, lightColor: 0xf2a3ff, intensity: 4, distance: 50,
      bodyRadius: 3, scaleBodyZ: 2.0, scaleLightZ: 0.8,
      xCoord: 70, yCoord: 80, zCoord: -600,
      wingWidth: 4, wingHeight: 1, wingDepth: 4, wingAngle: Math.PI*7/4,
      animX: 20, animY: 0, animZ: 30
    },
    firefly4 : {
      bodyColor: 0x352d3a, lightColor: 0xff91a8, intensity: 4, distance: 50,
      bodyRadius: 3, scaleBodyZ: 2.0, scaleLightZ: 0.8,
      xCoord: 85, yCoord: 20, zCoord: 700,
      wingWidth: 4, wingHeight: 1, wingDepth: 4, wingAngle: Math.PI*7/4,
      animX: 0, animY: 0, animZ: 30
    },
    firefly5 : {
      bodyColor: 0x57594b, lightColor: 0xf3ff9e, intensity: 4, distance: 50,
      bodyRadius: 3, scaleBodyZ: 2.0, scaleLightZ: 0.8,
      xCoord: -140, yCoord: 20, zCoord: -600,
      wingWidth: 4, wingHeight: 1, wingDepth: 4, wingAngle: Math.PI*7/4,
      animX: -10, animY: 0, animZ: 10
    }
  };
  return params;
}
// default camera parameters
function createCameraParams(){
  var params = {
    near: 100,
    far: 6000,
    fov: 70,                  // degrees
    aspectRatio: 100/70, // from canvas dimensions, see CSS
    atX: 0,
    atY: 0,
    atZ: 0,
    eyeX: 200,
    eyeY: 200,
    eyeZ: 900,
    upX: 0,
    upY: 1,
    upZ: 0
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
// function to create fancy tree
function syanFancyTree(treeParams, materials){
  var fancyTree = new THREE.Object3D();
  var barkGeom = new THREE.ConeGeometry(treeParams.baseRadius, treeParams.totalHeight, 32);
  var tier1Geom = new THREE.TorusBufferGeometry(treeParams.radius1, treeParams.radius1*2, 32, 32);
  var tier2Geom = new THREE.TorusBufferGeometry(treeParams.radius2, treeParams.radius2*2, 32, 32);
  var tier3Geom = new THREE.TorusBufferGeometry(treeParams.radius3, treeParams.radius3*2, 32, 32);

  var bark = new THREE.Mesh(barkGeom, materials.treeBarkMaterial);
  var tier1 = new THREE.Mesh(tier1Geom, materials.treeLeafMaterial);
  var tier2 = new THREE.Mesh(tier2Geom, materials.treeLeafMaterial);
  var tier3 = new THREE.Mesh(tier3Geom, materials.treeLeafMaterial);

  // enable shadows
  bark.castShadow = true;
  tier1.castShadow = true;
  tier2.castShadow = true;
  tier3.castShadow = true;
  bark.receiveShadow = true;
  tier1.receiveShadow = true;
  tier2.receiveShadow = true;
  tier3.receiveShadow = true;

  tier1.rotation.x = Math.PI/2;
  tier1.scale.z = 0.25;
  tier2.rotation.x = Math.PI/2;
  tier2.scale.z = 0.25;
  tier3.rotation.x = Math.PI/2;
  tier3.scale.z = 0.25;

  bark.position.set(0, treeParams.totalHeight/2, 0);
  tier1.position.set(0, treeParams.radius1*0.25 + treeParams.bottomSpace, 0);
  tier2.position.set(0, treeParams.radius2*0.25 + treeParams.spacing +
    treeParams.radius1*0.25 + treeParams.bottomSpace, 0);
  tier3.position.set(0, treeParams.radius3*0.25 + treeParams.spacing +
    treeParams.radius2*0.25 + treeParams.spacing + treeParams.radius1*0.25 +
    treeParams.bottomSpace, 0);

  fancyTree.add(bark);
  fancyTree.add(tier1);
  fancyTree.add(tier2);
  fancyTree.add(tier3);

  return fancyTree;
}
// function to create tile for sidewalk
function syanTile(sideWalkParams, materials){
  var tile = new THREE.Object3D();
  var tileGeom = new THREE.BoxGeometry(sideWalkParams.side, sideWalkParams.thickness,
    sideWalkParams.side);
  var tileMesh = new THREE.Mesh(tileGeom, materials.sideWalkMaterial);
  tileMesh.castShadow = true;
  tileMesh.receiveShadow = true;

  tile.add(tileMesh);
  return tile;
}
// function to create the sun
function syanSun(sunParams, materials){
  var sun = new THREE.Object3D();
  var sunGeom = new THREE.SphereGeometry(sunParams.radius, 60, 60);
  var sunMesh = new THREE.Mesh(sunGeom, materials.sunMaterial);
  sun.add(sunMesh);
  return sun;
}
// function to create one firefly
// fire fly origin is in the middle of the body and wing
// the firefly looks like a bullet with two box wings
function syanFireFly(fireflyParam){
  var firefly = new THREE.Object3D();
  // create the body of the firefly
  var bodyGeom = new THREE.SphereGeometry(fireflyParam.bodyRadius, 32, 32, 0, Math.PI);
  var bodyMat = new THREE.MeshLambertMaterial({color: fireflyParam.bodyColor, shading: THREE.FlatShading})
  var bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
  bodyMesh.rotation.y = 0;
  bodyMesh.scale.z = fireflyParam.scaleBodyZ;
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;

  // create the light of the firefly
  var lightGeom = new THREE.SphereGeometry(fireflyParam.bodyRadius, 32, 32, 0, Math.PI);
  var lightMat = new THREE.MeshPhongMaterial({color: fireflyParam.lightColor, shading: THREE.FlatShading});
  var lightMesh = new THREE.Mesh(lightGeom, lightMat);
  lightMesh.rotation.y = Math.PI;
  lightMesh.scale.z = fireflyParam.scaleLightZ;

  // create the wings
  var rightWingGeom = new THREE.BoxGeometry(fireflyParam.wingWidth, fireflyParam.wingHeight, fireflyParam.wingDepth);
  var rightWing = new THREE.Mesh(rightWingGeom, bodyMat);
  rightWing.position.set(-fireflyParam.bodyRadius*2/3-fireflyParam.wingWidth/2, 0,
    fireflyParam.bodyRadius*(fireflyParam.scaleBodyZ + fireflyParam.scaleLightZ)/3);
  rightWing.rotation.z = -fireflyParam.wingAngle;
  var leftWing = rightWing.clone();
  leftWing.position.x = -rightWing.position.x;
  leftWing.rotation.z = -rightWing.rotation.z;

  // create the light
  var light = new THREE.SpotLight(fireflyParam.lightColor, fireflyParam.intensity,
      fireflyParam.distance, Math.PI*3/8, 0, 2);
  light.position.set(-fireflyParam.bodyRadius*fireflyParam.scaleLightZ, 0, 0);
  //light.castShadow = true;
  light.target = lightMesh;

  // add components to fly
  firefly.add(bodyMesh);
  firefly.add(lightMesh);
  firefly.add(rightWing);
  firefly.add(leftWing);
  firefly.add(light);
  return firefly;
}
// function to create one row of trees
// origin in between tree7 and tree8
function syanTreeRow(treeParams, sideWalkParams, materials){
  var treeRow = new THREE.Object3D();
  // add the two rows of trees spaced in between the tiles
  var tree1 = syanFancyTree(treeParams, materials);
  var tree2 = syanFancyTree(treeParams, materials);
  var tree3 = syanFancyTree(treeParams, materials);
  var tree4 = syanFancyTree(treeParams, materials);
  var tree5 = syanFancyTree(treeParams, materials);
  var tree6 = syanFancyTree(treeParams, materials);
  var tree7 = syanFancyTree(treeParams, materials);
  var tree8 = syanFancyTree(treeParams, materials);
  var tree9 = syanFancyTree(treeParams, materials);
  var tree10 = syanFancyTree(treeParams, materials);
  var tree11 = syanFancyTree(treeParams, materials);
  var tree12 = syanFancyTree(treeParams, materials);
  var tree13 = syanFancyTree(treeParams, materials);
  var tree14 = syanFancyTree(treeParams, materials);

  // set positions for each tree relative to the sideWalkParams
  tree1.position.set(0, 0, sideWalkParams.spacing*13/2 + sideWalkParams.side*13/2);
  tree2.position.set(0, 0, sideWalkParams.spacing*11/2 + sideWalkParams.side*11/2);
  tree3.position.set(0, 0, sideWalkParams.spacing*9/2 + sideWalkParams.side*9/2);
  tree4.position.set(0, 0, sideWalkParams.spacing*7/2 + sideWalkParams.side*7/2);
  tree5.position.set(0, 0, sideWalkParams.spacing*5/2 + sideWalkParams.side*5/2);
  tree6.position.set(0, 0, sideWalkParams.spacing*3/2 + sideWalkParams.side*3/2);
  tree7.position.set(0, 0, sideWalkParams.spacing/2 + sideWalkParams.side/2);
  tree8.position.set(0, 0, -(sideWalkParams.spacing/2 + sideWalkParams.side/2));
  tree9.position.set(0, 0, -(sideWalkParams.spacing*3/2 + sideWalkParams.side*3/2));
  tree10.position.set(0, 0, -(sideWalkParams.spacing*5/2 + sideWalkParams.side*5/2));
  tree11.position.set(0, 0, -(sideWalkParams.spacing*7/2 + sideWalkParams.side*7/2));
  tree12.position.set(0, 0, -(sideWalkParams.spacing*9/2 + sideWalkParams.side*9/2));
  tree13.position.set(0, 0, -(sideWalkParams.spacing*11/2 + sideWalkParams.side*11/2));
  tree14.position.set(0, 0, -(sideWalkParams.spacing*13/2 + sideWalkParams.side*13/2));

  // add trees
  treeRow.add(tree1);
  treeRow.add(tree2);
  treeRow.add(tree3);
  treeRow.add(tree4);
  treeRow.add(tree5);
  treeRow.add(tree6);
  treeRow.add(tree7);
  treeRow.add(tree8);
  treeRow.add(tree9);
  treeRow.add(tree10);
  treeRow.add(tree11);
  treeRow.add(tree12);
  treeRow.add(tree13);
  treeRow.add(tree14);
  return treeRow;
}
// function to create rows of trees and sidewalk
function backgroundScene(treeParams, sideWalkParams, materials, archWidth){
  var background = new THREE.Object3D();
  // make the row of tiles
  var tile1 = syanTile(sideWalkParams, materials);
  var tile2 = syanTile(sideWalkParams, materials);
  var tile3 = syanTile(sideWalkParams, materials);
  var tile4 = syanTile(sideWalkParams, materials);
  var tile5 = syanTile(sideWalkParams, materials);
  var tile6 = syanTile(sideWalkParams, materials);
  var tile7 = syanTile(sideWalkParams, materials);
  var tile8 = syanTile(sideWalkParams, materials);
  var tile9 = syanTile(sideWalkParams, materials);
  var tile10 = syanTile(sideWalkParams, materials);
  var tile11 = syanTile(sideWalkParams, materials);
  var tile12 = syanTile(sideWalkParams, materials);
  var tile13 = syanTile(sideWalkParams, materials);
  var tile14 = syanTile(sideWalkParams, materials);
  var tile15 = syanTile(sideWalkParams, materials);

  // position tiles accordingly
  tile1.position.set(0, 0, sideWalkParams.spacing*7 + sideWalkParams.side*7);
  tile2.position.set(0, 0, sideWalkParams.spacing*6 + sideWalkParams.side*6);
  tile3.position.set(0, 0, sideWalkParams.spacing*5 + sideWalkParams.side*5);
  tile4.position.set(0, 0, sideWalkParams.spacing*4 + sideWalkParams.side*4);
  tile5.position.set(0, 0, sideWalkParams.spacing*3 + sideWalkParams.side*3);
  tile6.position.set(0, 0, sideWalkParams.spacing*2 + sideWalkParams.side*2);
  tile7.position.set(0, 0, sideWalkParams.spacing + sideWalkParams.side);
  tile8.position.set(0, 0, 0);
  tile9.position.set(0, 0, -(sideWalkParams.spacing + sideWalkParams.side));
  tile10.position.set(0, 0, -(sideWalkParams.spacing*2 + sideWalkParams.side*2));
  tile11.position.set(0, 0, -(sideWalkParams.spacing*3 + sideWalkParams.side*3));
  tile12.position.set(0, 0, -(sideWalkParams.spacing*4 + sideWalkParams.side*4));
  tile13.position.set(0, 0, -(sideWalkParams.spacing*5 + sideWalkParams.side*5));
  tile14.position.set(0, 0, -(sideWalkParams.spacing*6 + sideWalkParams.side*6));
  tile15.position.set(0, 0, -(sideWalkParams.spacing*7 + sideWalkParams.side*7));

  // add the row of tiles
  background.add(tile1);
  background.add(tile2);
  background.add(tile3);
  background.add(tile4);
  background.add(tile5);
  background.add(tile6);
  background.add(tile7);
  background.add(tile8);
  background.add(tile9);
  background.add(tile10);
  background.add(tile11);
  background.add(tile12);
  background.add(tile13);
  background.add(tile14);
  background.add(tile15);

  var leftTreeRow = syanTreeRow(treeParams, sideWalkParams, materials);
  var rightTreeRow = syanTreeRow(treeParams, sideWalkParams, materials);
  leftTreeRow.position.set(-archWidth/2, 0, 0);
  rightTreeRow.position.set(archWidth/2, 0, 0);
  background.add(leftTreeRow);
  background.add(rightTreeRow);

  return background;
}
