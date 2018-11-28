// function to create fountain fountain parameters
function createFountainParams(){
  var params = {
    height1: 15, length1: 90,
    height2: 15, length2: 120,
    height3: 15, length3: 150,
    lightThick: 5, sideMargin: 10, topMargin: 5,
    baseHeight: 15, baseLength: 200,
    borderHeight: 20, borderTopHeight: 5, borderThick: 25
  };
  return params;
}
// function to create any rectangular geometry
// origin of rectangle is in the middle
function syanRectangleGeom(height, length, depth){
  // create geom via vertices and faces
  var rectangleGeom = new THREE.Geometry();
  // add top vertices
  rectangleGeom.vertices.push(new THREE.Vector3(-length/2, height/2, depth/2));
  rectangleGeom.vertices.push(new THREE.Vector3(-length/2, height/2, -depth/2));
  rectangleGeom.vertices.push(new THREE.Vector3(length/2, height/2, -depth/2));
  rectangleGeom.vertices.push(new THREE.Vector3(length/2, height/2, depth/2));
  // add bottom vertices
  rectangleGeom.vertices.push(new THREE.Vector3(-length/2, -height/2, depth/2));
  rectangleGeom.vertices.push(new THREE.Vector3(-length/2, -height/2, -depth/2));
  rectangleGeom.vertices.push(new THREE.Vector3(length/2, -height/2, -depth/2));
  rectangleGeom.vertices.push(new THREE.Vector3(length/2, -height/2, depth/2));
  // add faces
  rectangleGeom.faces.push(new THREE.Face3(0, 2, 1)); // top face
  rectangleGeom.faces.push(new THREE.Face3(0, 3, 2)); // top face
  rectangleGeom.faces.push(new THREE.Face3(4, 3, 0)); // front face
  rectangleGeom.faces.push(new THREE.Face3(4, 7, 3)); // front face
  rectangleGeom.faces.push(new THREE.Face3(7, 2, 3)); // right face
  rectangleGeom.faces.push(new THREE.Face3(7, 6, 2)); // right face
  rectangleGeom.faces.push(new THREE.Face3(6, 1, 2)); // back face
  rectangleGeom.faces.push(new THREE.Face3(6, 5, 1)); // back face
  rectangleGeom.faces.push(new THREE.Face3(5, 0, 1)); // left face
  rectangleGeom.faces.push(new THREE.Face3(5, 4, 0)); // left face
  rectangleGeom.faces.push(new THREE.Face3(5, 7, 4)); // bottom face
  rectangleGeom.faces.push(new THREE.Face3(5, 6, 7)); // bottom face
  // calculate the normals for shading
  rectangleGeom.computeFaceNormals();

  return rectangleGeom;
}
// function to create one layer of a fountain
// origin at bottom of layer
function fountainLayer(maxHeight, length, lightThick, sideMargin, topMargin, materials){
  var layer = new THREE.Object3D();
  var centerBlock = new THREE.BoxGeometry(length - lightThick*2 - sideMargin*2,
    maxHeight, length - lightThick*2 - sideMargin*2);
  var lightBlock = new THREE.BoxGeometry(length - sideMargin*2, maxHeight - topMargin,
    length - sideMargin*2);
  // create the side blocks for layer
  var backBlock = syanRectangleGeom(maxHeight, length, sideMargin);
  var frontBlock = syanRectangleGeom(maxHeight, length, sideMargin);
  var rightBlock = syanRectangleGeom(maxHeight, sideMargin, length - sideMargin*2 + lightThick);
  var leftBlock = syanRectangleGeom(maxHeight, sideMargin, length - sideMargin*2 + lightThick);
  // create meshes
  var centerMesh = new THREE.Mesh(centerBlock, materials.fountainMiddleMaterial);
  var lightMesh = new THREE.Mesh(lightBlock, materials.fountainLightMaterial);
  var backMesh = new THREE.Mesh(backBlock, materials.fountainMiddleMaterial);
  var frontMesh = new THREE.Mesh(frontBlock, materials.fountainMiddleMaterial);
  var rightMesh = new THREE.Mesh(rightBlock, materials.fountainMiddleMaterial);
  var leftMesh = new THREE.Mesh(leftBlock, materials.fountainMiddleMaterial);

  centerMesh.position.set(0, maxHeight/2, 0);
  lightMesh.position.set(0, (maxHeight - topMargin)/2, 0);
  backMesh.position.set(0, maxHeight/2, -(length-sideMargin)/2);
  frontMesh.position.set(0, maxHeight/2, (length-sideMargin)/2);
  rightMesh.position.set((length-sideMargin)/2, maxHeight/2, 0);
  leftMesh.position.set(-(length-sideMargin)/2, maxHeight/2, 0);

  layer.add(centerMesh);
  layer.add(lightMesh);
  layer.add(backMesh);
  layer.add(frontMesh);
  layer.add(rightMesh);
  layer.add(leftMesh);

  return layer;
}
// function to create the base of the fountain
function fountainBase(baseHeight, borderHeight, borderTopHeight, baseLength, borderThick, sideMargin, materials){
  var base = new THREE.Object3D();
  var black = new THREE.BoxGeometry(baseLength, baseHeight, baseLength);
  // create the side blocks for border
  var backBlock = syanRectangleGeom(borderHeight, baseLength + borderThick*2, borderThick);
  var frontBlock = syanRectangleGeom(borderHeight, baseLength + borderThick*2, borderThick);
  var rightBlock = syanRectangleGeom(borderHeight, borderThick, baseLength);
  var leftBlock = syanRectangleGeom(borderHeight, borderThick, baseLength);
  // create the top blocks for border
  var backTop = syanRectangleGeom(borderTopHeight, baseLength + borderThick*2 + sideMargin,
    borderThick + sideMargin);
  var frontTop = syanRectangleGeom(borderTopHeight, baseLength + borderThick*2 + sideMargin,
    borderThick + sideMargin);
  var rightTop = syanRectangleGeom(borderTopHeight, borderThick + sideMargin,
    baseLength + borderThick*2 + sideMargin);
  var leftTop = syanRectangleGeom(borderTopHeight, borderThick + sideMargin,
    baseLength + borderThick*2 + sideMargin);

  var blackMesh = new THREE.Mesh(black, materials.fountainMiddleMaterial);
  var backBlockMesh = new THREE.Mesh(backBlock, materials.fountainSideMaterial);
  var frontBlockMesh = new THREE.Mesh(frontBlock, materials.fountainSideMaterial);
  var rightBlockMesh = new THREE.Mesh(rightBlock, materials.fountainSideMaterial);
  var leftBlockMesh = new THREE.Mesh(leftBlock, materials.fountainSideMaterial);
  var backTopMesh = new THREE.Mesh(backTop, materials.fountainTopMaterial);
  var frontTopMesh = new THREE.Mesh(frontTop, materials.fountainTopMaterial);
  var rightTopMesh = new THREE.Mesh(rightTop, materials.fountainTopMaterial);
  var leftTopMesh = new THREE.Mesh(leftTop, materials.fountainTopMaterial);

  blackMesh.position.set(0, baseHeight/2, 0);
  backBlockMesh.position.set(0, borderHeight/2, -(baseLength+borderThick)/2);
  frontBlockMesh.position.set(0, borderHeight/2, (baseLength+borderThick)/2);
  rightBlockMesh.position.set((baseLength+borderThick)/2, borderHeight/2, 0);
  leftBlockMesh.position.set(-(baseLength+borderThick)/2, borderHeight/2, 0);
  backTopMesh.position.set(0, borderHeight + borderTopHeight/2, -(baseLength + borderThick)/2);
  frontTopMesh.position.set(0, borderHeight + borderTopHeight/2, (baseLength + borderThick)/2);
  rightTopMesh.position.set((baseLength + borderThick)/2, borderHeight + borderTopHeight/2, 0);
  leftTopMesh.position.set(-(baseLength + borderThick)/2, borderHeight + borderTopHeight/2, 0);

  base.add(blackMesh);
  base.add(backBlockMesh);
  base.add(frontBlockMesh);
  base.add(rightBlockMesh);
  base.add(leftBlockMesh);
  base.add(backTopMesh);
  base.add(frontTopMesh);
  base.add(rightTopMesh);
  base.add(leftTopMesh);

  return base;
}
// function to make the fountain
// origin is bottom center
function createFountain(fountainParams, materials){
  var fountain = new THREE.Object3D();
  var bottomLayer = fountainLayer(fountainParams.height3, fountainParams.length3,
    fountainParams.lightThick, fountainParams.sideMargin, fountainParams.topMargin,
    materials);
  var middleLayer = fountainLayer(fountainParams.height2, fountainParams.length2,
    fountainParams.lightThick, fountainParams.sideMargin, fountainParams.topMargin,
    materials);
  var topLayer = fountainLayer(fountainParams.height1, fountainParams.length1,
    fountainParams.lightThick, fountainParams.sideMargin, fountainParams.topMargin,
    materials);
  var base = fountainBase(fountainParams.baseHeight, fountainParams.borderHeight,
    fountainParams.borderTopHeight, fountainParams.baseLength, fountainParams.borderThick,
    fountainParams.sideMargin, materials);
  bottomLayer.position.set(0, fountainParams.baseHeight, 0);
  middleLayer.position.set(0, fountainParams.height3 + fountainParams.baseHeight, 0);
  topLayer.position.set(0, fountainParams.height3 + fountainParams.height2 + fountainParams.baseHeight, 0);

  fountain.add(bottomLayer);
  fountain.add(middleLayer);
  fountain.add(topLayer);
  fountain.add(base);
  return fountain;
}
