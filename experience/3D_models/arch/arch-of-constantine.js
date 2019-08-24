// creates all of the column parameters including material
function createColumnParams(){
  // parameters for columns
  var columnParams = {
    // capital parameters for column
    capital3: {
      baseHeight: 2, baseLength: 15, topLength: 15, bottomHeight: 5, bottomLength: 10
    },
    // middleBlock parameters for column
    middleBlock2: {
      height: 30, length: 10
    },
    // stairBlock parameters for column
    stairBlock3: {
      height1: 2, height2: 6, height3: 2, length1: 15, length2: 13, length3: 15
    },
    // capital parameters for column
    capital2: {
      baseHeight: 5, baseLength: 13, topLength: 15, bottomHeight: 5, bottomLength: 19
    },
    // capital parameters for column
    capital1: {
      baseHeight: 5, baseLength: 11, topLength: 15, bottomHeight: 10, bottomLength: 10
    },
    // shaft parameters for column
    shaft: {
      topHeight: 80, bottomHeight: 40, topRadius: 5, middleRadius: 6, bottomRadius: 6.25
    },
    // stairBlock parameters for column
    stairBlock2: {
      height1: 2, height2: 4, height3: 10, length1: 15, length2: 17, length3: 19
    },
    // middleBlock parameters for column
    middleBlock1: {
      height: 25, length: 17
    },
    // stairBlock parameters for column
    stairBlock1: {
      height1: 2, height2: 4, height3: 10, length1: 19, length2: 21, length3: 23
    },
    // to be deleted
    originRadius: 0.25, yellowMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("yellow")})
  };
  return columnParams;
}
// creates all of the side archway parameters including material
function createSideArchParams(){
  var sideArch = {
    width: 30, depth: 50,
    wedgeHeight: 10, wedgeWidth: 5,
    archWidth: 60, archThick: 10,
    block1height: 80,
  };
  return sideArch;
}
// creates all of the middle archway parameters including material
function createMiddleArchParams(){
  var middleArch = {
    width: 35,
    archWidth: 80, archThick: 10,
    block1height: 70
  };
  return middleArch;
}
function createOrigin(params){
    var origin = new THREE.Object3D();
    var originGeom = new THREE.SphereGeometry(params.originRadius);
    var originMesh = new THREE.Mesh(originGeom, params.yellowMaterial);
    originMesh.name = "origin";
    origin.add(originMesh);
    return origin;
}
// function to create an archway using bezier surfaces and ring geometry
// input: width, depth, height, thick
function syanArch(width, depth, thick, material){
  var arch = new THREE.Object3D();
  var cpsBottom = [  [[-width, 0, depth/2], [-width, width + thick, depth/2], [width, width + thick, depth/2], [width, 0, depth/2]],
                    [[-width, 0, depth/4], [-width, width + thick, depth/4], [width, width + thick, depth/4], [width, 0, depth/4]],
                    [[-width, 0, -depth/4], [-width, width + thick, -depth/4], [width, width + thick, -depth/4], [width, 0, -depth/4]],
                    [[-width, 0, -depth/2], [-width, width + thick, -depth/2], [width, width + thick, -depth/2], [width, 0, -depth/2]] ];
  var bottomGeom = new THREE.BezierSurfaceGeometry(cpsBottom.reverse(), 20, 20);
  var bottomMesh = new THREE.Mesh(bottomGeom, material);

  var cpsTop = [  [[-width - thick, 0, depth/2], [-width- thick, width + 2*thick, depth/2], [width + thick, width + 2*thick, depth/2], [width + thick, 0, depth/2]],
                    [[-width - thick, 0, depth/4], [-width- thick, width + 2*thick, depth/4], [width + thick, width + 2*thick, depth/4], [width + thick, 0, depth/4]],
                    [[-width - thick, 0, -depth/4], [-width- thick, width + 2*thick, -depth/4], [width + thick, width + 2*thick, -depth/4], [width + thick, 0, -depth/4]],
                    [[-width - thick, 0, -depth/2], [-width- thick, width + 2*thick, -depth/2], [width + thick, width + 2*thick, -depth/2], [width + thick, 0, -depth/2]] ];
  var topGeom = new THREE.BezierSurfaceGeometry(cpsTop.reverse(), 20, 20);
  var topMesh = new THREE.Mesh(topGeom, material);

  var frontRingGeom = new THREE.RingGeometry(width, width + thick, 30, 30, 0, Math.PI);
  var frontRingMesh = new THREE.Mesh(frontRingGeom, material);

  var backRingGeom = new THREE.RingGeometry(width, width + thick, 30, 30, 0, Math.PI);
  var backRingMesh = new THREE.Mesh(backRingGeom, material);

  frontRingMesh.position.set(0, 0, depth/2);
  backRingMesh.position.set(0, 0, -depth/2);

  bottomMesh.castShadow = true;
  topMesh.castShadow = true;
  frontRingMesh.castShadow = true;
  backRingMesh.castShadow = true;
  bottomMesh.receiveShadow = true;
  topMesh.receiveShadow = true;
  frontRingMesh.receiveShadow = true;
  backRingMesh.receiveShadow = true;

  arch.add(bottomMesh);
  arch.add(topMesh);
  arch.add(frontRingMesh);
  arch.add(backRingMesh);
  return arch;
}
// function to create the echninus part of the capital
// origin of echnius is in the middle
function syanEchniusGeom(height, topLength, bottomLength){
  // create geom via vertices and faces
  var echniusGeom = new THREE.Geometry();
  // add top vertices
  echniusGeom.vertices.push(new THREE.Vector3(-topLength/2, height/2, topLength/2));
  echniusGeom.vertices.push(new THREE.Vector3(-topLength/2, height/2, -topLength/2));
  echniusGeom.vertices.push(new THREE.Vector3(topLength/2, height/2, -topLength/2));
  echniusGeom.vertices.push(new THREE.Vector3(topLength/2, height/2, topLength/2));
  // add bottom vertices
  echniusGeom.vertices.push(new THREE.Vector3(-bottomLength/2, -height/2, bottomLength/2));
  echniusGeom.vertices.push(new THREE.Vector3(-bottomLength/2, -height/2, -bottomLength/2));
  echniusGeom.vertices.push(new THREE.Vector3(bottomLength/2, -height/2, -bottomLength/2));
  echniusGeom.vertices.push(new THREE.Vector3(bottomLength/2, -height/2, bottomLength/2));
  // add faces
  echniusGeom.faces.push(new THREE.Face3(0, 2, 1)); // top face
  echniusGeom.faces.push(new THREE.Face3(0, 3, 2)); // top face
  echniusGeom.faces.push(new THREE.Face3(4, 3, 0)); // front face
  echniusGeom.faces.push(new THREE.Face3(4, 7, 3)); // front face
  echniusGeom.faces.push(new THREE.Face3(7, 2, 3)); // right face
  echniusGeom.faces.push(new THREE.Face3(7, 6, 2)); // right face
  echniusGeom.faces.push(new THREE.Face3(6, 1, 2)); // back face
  echniusGeom.faces.push(new THREE.Face3(6, 5, 1)); // back face
  echniusGeom.faces.push(new THREE.Face3(5, 0, 1)); // left face
  echniusGeom.faces.push(new THREE.Face3(5, 4, 0)); // left face
  echniusGeom.faces.push(new THREE.Face3(5, 7, 4)); // bottom face
  echniusGeom.faces.push(new THREE.Face3(5, 6, 7)); // bottom face
  // calculate the normals for shading
  echniusGeom.computeFaceNormals();

  return echniusGeom;
}
// function to create the capital of the column
// input: height of both base and bottom, length of both base and bottom, and material
// origin is at the center bottom of the echnius
function syanCapital(baseHeight, baseLength, topLength, bottomHeight, bottomLength, material){
  var capital = new THREE.Object3D();
  // make the abacus
  var abacusGeom = new THREE.BoxGeometry(baseLength, baseHeight, baseLength);
  var abacusMesh = new THREE.Mesh(abacusGeom, material);
  abacusMesh.castShadow = true;
  abacusMesh.receiveShadow = true;
  abacusMesh.name = "abacus";
  abacusMesh.position.set(0, baseHeight/2 + bottomHeight, 0);
  // make the echnius
  var echniusGeom = syanEchniusGeom(bottomHeight, topLength, bottomLength);
  var echniusMesh = new THREE.Mesh(echniusGeom, material);
  echniusMesh.castShadow = true;
  echniusMesh.receiveShadow = true;
  echniusMesh.name = "echnius";
  echniusMesh.position.set(0, bottomHeight/2, 0);
  capital.name  = "capital";
  capital.add(abacusMesh);
  capital.add(echniusMesh);
  return capital;
}
// function to create the shaft of the column
// input: height of both parts of the shaft, radii of top, middle, and bottom, and yellowMaterial
// origin is at the center bottom of the shaft
function syanShaft(topHeight, bottomHeight, topRadius, middleRadius, bottomRadius, material){
  var shaft = new THREE.Object3D();
  var topGeom = new THREE.CylinderGeometry(topRadius, middleRadius, topHeight);
  var bottomGeom = new THREE.CylinderGeometry(middleRadius, bottomRadius, bottomHeight);
  var topMesh = new THREE.Mesh(topGeom, material);
  var bottomMesh = new THREE.Mesh(bottomGeom, material);
  topMesh.castShadow = true;
  bottomMesh.castShadow = true;
  topMesh.receiveShadow = true;
  bottomMesh.receiveShadow = true;

  topMesh.position.set(0, topHeight/2 + bottomHeight, 0);
  bottomMesh.position.set(0, bottomHeight/2, 0);
  shaft.add(topMesh);
  shaft.add(bottomMesh);
  return shaft;
}
// function to create the stair case like block of the column
// input: heights of the stair cases and their lengths
// origin is at the center bottom of the stair case
function syanStairBlock(height1, height2, height3, length1, length2, length3, material){
  var stairBlock = new THREE.Object3D();
  var topStair = new THREE.BoxGeometry(length1, height1, length1);
  var middleStair = new THREE.BoxGeometry(length2, height2, length2);
  var bottomStair = new THREE.BoxGeometry(length3, height3, length3);
  var topMesh = new THREE.Mesh(topStair, material);
  var middleMesh = new THREE.Mesh(middleStair, material);
  var bottomMesh = new THREE.Mesh(bottomStair, material);
  topMesh.castShadow = true;
  middleMesh.castShadow = true;
  bottomMesh.castShadow = true;
  topMesh.receiveShadow = true;
  middleMesh.receiveShadow = true;
  bottomMesh.receiveShadow = true;

  topMesh.position.set(0, height1/2 + height2 + height3, 0);
  middleMesh.position.set(0, height2/2 + height3, 0);
  bottomMesh.position.set(0, height3/2, 0);
  stairBlock.add(topMesh);
  stairBlock.add(middleMesh);
  stairBlock.add(bottomMesh);
  return stairBlock;
}
// function to create the middleblock of the column base
// input height and length
function syanMiddleBlock(height, length, depth, material){
  var middleBlock = new THREE.Object3D();
  var middleMesh = new THREE.Mesh(new THREE.BoxGeometry(length, height, depth), material);
  middleMesh.castShadow = true;
  middleMesh.receiveShadow = true;
  
  middleMesh.position.set(0, height/2, 0);
  middleBlock.add(middleMesh);
  return middleBlock;
}
// function to create the column using other functions
// input: all the parameters to make the capital, shaft, stairBlock, and an array of materials
// origin is at the bottom of the column
function syanColumn(capital3Params, middleBlock2Params, stairBlock3Params, capital2Params, capital1Params, shaftParams, stairBlock2Params, middleBlock1Params, stairBlock1Params, materials){
  var column = new THREE.Object3D();
  var capital3 = syanCapital(capital3Params.baseHeight, capital3Params.baseLength, capital3Params.topLength,
    capital3Params.bottomHeight, capital3Params.bottomLength, materials.capitalMaterial);
  var middleBlock2 = syanMiddleBlock(middleBlock2Params.height, middleBlock2Params.length,
    middleBlock2Params.length, materials.middleBlockMaterial);
  var stairBlock3 = syanStairBlock(stairBlock3Params.height1, stairBlock3Params.height2,
    stairBlock3Params.height3, stairBlock3Params.length1, stairBlock3Params.length2,
    stairBlock3Params.length3, materials.stairMaterial);
  var capital2 = syanCapital(capital2Params.baseHeight, capital2Params.baseLength, capital2Params.topLength,
    capital2Params.bottomHeight, capital2Params.bottomLength, materials.capitalMaterial);
  var capital1 = syanCapital(capital1Params.baseHeight, capital1Params.baseLength, capital1Params.topLength,
    capital1Params.bottomHeight, capital1Params.bottomLength, materials.capitalMaterial);
  var shaft = syanShaft(shaftParams.topHeight, shaftParams.bottomHeight, shaftParams.topRadius,
    shaftParams.middleRadius, shaftParams.bottomRadius, materials.shaftMaterial);
  var stairBlock2 = syanStairBlock(stairBlock2Params.height1, stairBlock2Params.height2,
    stairBlock2Params.height3, stairBlock2Params.length1, stairBlock2Params.length2,
    stairBlock2Params.length3, materials.stairMaterial);
  var middleBlock1 = syanMiddleBlock(middleBlock1Params.height, middleBlock1Params.length,
    middleBlock1Params.length, materials.middleBlockMaterial);
  var stairBlock1 = syanStairBlock(stairBlock1Params.height1, stairBlock1Params.height2,
    stairBlock1Params.height3, stairBlock1Params.length1, stairBlock1Params.length2,
    stairBlock1Params.length3, materials.stairMaterial);
  // calculate total heights
  var stairBlock1TotalHeight = stairBlock1Params.height1 + stairBlock1Params.height2 + stairBlock1Params.height3;
  var stairBlock2TotalHeight = stairBlock2Params.height1 + stairBlock2Params.height2 + stairBlock2Params.height3;
  var stairBlock3TotalHeight = stairBlock3Params.height1 + stairBlock3Params.height2 + stairBlock3Params.height3;
  var shaftTotalHeight = shaftParams.topHeight + shaftParams.bottomHeight;
  var capital1TotalHeight = capital1Params.baseHeight + capital1Params.bottomHeight;
  var capital2TotalHeight = capital2Params.baseHeight + capital2Params.bottomHeight;
  // calculate Ys for positions
  var middleBlock1Y = stairBlock1TotalHeight;
  var stairBlock2Y = middleBlock1Y + middleBlock1Params.height
  var shaftY = stairBlock2Y + stairBlock2TotalHeight;
  var capital1Y = shaftY + shaftTotalHeight;
  var capital2Y = capital1Y + capital1TotalHeight + capital2TotalHeight;
  var stairBlock3Y = capital2Y;
  var middleBlock2Y = stairBlock3Y + stairBlock3TotalHeight;
  var capital3Y = middleBlock2Y + middleBlock2Params.height;
  // set the positions
  capital3.position.set(0, capital3Y, 0);
  middleBlock2.position.set(0, middleBlock2Y, 0);
  stairBlock3.position.set(0, stairBlock3Y, 0);
  capital2.position.set(0, capital2Y, 0);
  capital1.position.set(0, capital1Y, 0);
  shaft.position.set(0, shaftY, 0);
  stairBlock2.position.set(0, stairBlock2Y, 0);
  middleBlock1.position.set(0, middleBlock1Y, 0);
  stairBlock1.position.set(0, 0, 0);
  // rotate any objects
  capital2.rotation.z = Math.PI;
  // add the objects
  column.add(capital3);
  column.add(middleBlock2);
  column.add(stairBlock3);
  column.add(capital2);
  column.add(capital1);
  column.add(shaft);
  column.add(stairBlock1);
  column.add(middleBlock1);
  column.add(stairBlock2);
  return column;
}
// function to create the side arch
// origin at the bottom aligned with the middle of arch
function syanSideArch(columnParams, sideArchParams, middleArchWidth, materialsParams){
  var sideArch = new THREE.Object3D();

  var totalHeight = columnParams.stairBlock1.height1 + columnParams.stairBlock1.height2 + columnParams.stairBlock1.height3 +
    columnParams.middleBlock1.height + columnParams.stairBlock2.height1 + columnParams.stairBlock2.height2 + columnParams.stairBlock2.height3 +
    columnParams.shaft.topHeight + columnParams.shaft.bottomHeight + columnParams.capital1.baseHeight + columnParams.capital1.bottomHeight;
  var topBlock = syanMiddleBlock(totalHeight - sideArchParams.wedgeHeight-sideArchParams.block1height-sideArchParams.archWidth/2- sideArchParams.archThick,
    sideArchParams.width*3.5 + middleArchWidth - sideArchParams.archThick, sideArchParams.depth - sideArchParams.wedgeWidth/2, materialsParams.middleBlockMaterial);
  // left side of arch
  var wedgeBlockL = syanMiddleBlock(sideArchParams.wedgeHeight,
    sideArchParams.width/2 + sideArchParams.wedgeWidth*2 + middleArchWidth,
    sideArchParams.depth + sideArchParams.wedgeWidth*2, materialsParams.stairMaterial);
  var thinBlock1L = syanMiddleBlock(sideArchParams.block1height, sideArchParams.width/2 + middleArchWidth,
    sideArchParams.depth, materialsParams.middleBlockMaterial);
  var thinBlock2L = syanMiddleBlock(sideArchParams.archWidth/2 + sideArchParams.archThick,
    sideArchParams.width/2 + middleArchWidth - sideArchParams.wedgeWidth - sideArchParams.archThick,
    sideArchParams.depth - sideArchParams.wedgeWidth, materialsParams.capitalMaterial);
  // right side of arch
  var wedgeBlockR = syanMiddleBlock(sideArchParams.wedgeHeight, sideArchParams.width + sideArchParams.wedgeWidth*2,
    sideArchParams.depth + sideArchParams.wedgeWidth*2, materialsParams.stairMaterial);
  var thinBlock1R = syanMiddleBlock(sideArchParams.block1height, sideArchParams.width,
    sideArchParams.depth, materialsParams.middleBlockMaterial);
  var thinBlock2R = syanMiddleBlock(sideArchParams.archWidth/2 + sideArchParams.archThick, sideArchParams.width - sideArchParams.wedgeWidth - sideArchParams.archThick,
    sideArchParams.depth - sideArchParams.wedgeWidth, materialsParams.capitalMaterial);
  // arch
  var arch = syanArch(sideArchParams.archWidth/2, sideArchParams.depth, sideArchParams.archThick, materialsParams.archMaterial);
  var block1 = syanMiddleBlock(sideArchParams.archWidth/2 - sideArchParams.archThick, sideArchParams.archWidth + sideArchParams.archThick,
    sideArchParams.depth - sideArchParams.archThick, materialsParams.stairMaterial);
  var block2 = syanMiddleBlock(sideArchParams.archWidth/4, sideArchParams.archWidth/4,
    sideArchParams.depth - sideArchParams.archThick, materialsParams.stairMaterial);
  var block3 = syanMiddleBlock(sideArchParams.archWidth/4, sideArchParams.archWidth/4,
    sideArchParams.depth - sideArchParams.archThick, materialsParams.stairMaterial);
  var block4 = syanMiddleBlock(sideArchParams.archWidth/2 + sideArchParams.archThick, sideArchParams.archThick,
    sideArchParams.depth - sideArchParams.archThick, materialsParams.stairMaterial);
  var block5 = syanMiddleBlock(sideArchParams.archWidth/2 + sideArchParams.archThick, sideArchParams.archThick,
    sideArchParams.depth - sideArchParams.archThick, materialsParams.stairMaterial);
  // calculate positions
  var rightSide1X = sideArchParams.archWidth/2 + sideArchParams.width/2;
  var rightSide2X = sideArchParams.archWidth/2 + sideArchParams.width/2 + sideArchParams.wedgeWidth/4;
  var leftSide1X = -(sideArchParams.archWidth/2 + sideArchParams.width/4 + middleArchWidth/2);
  var leftSide2X = -(sideArchParams.archWidth/2 + sideArchParams.width/4 + sideArchParams.wedgeWidth/4 + middleArchWidth/2);
  var topBlockY = sideArchParams.wedgeHeight + sideArchParams.block1height + sideArchParams.archWidth/2 + sideArchParams.archThick;
  // set positions
  wedgeBlockL.position.set(leftSide2X, 0, 0);
  wedgeBlockR.position.set(rightSide2X, 0, 0);
  thinBlock1L.position.set(leftSide1X, sideArchParams.wedgeHeight, 0);
  thinBlock1R.position.set(rightSide1X, sideArchParams.wedgeHeight, 0);
  thinBlock2L.position.set(leftSide1X - sideArchParams.archThick/2, sideArchParams.wedgeHeight + sideArchParams.block1height, 0);
  thinBlock2R.position.set(rightSide1X + sideArchParams.archThick/2, sideArchParams.wedgeHeight + sideArchParams.block1height, 0);
  topBlock.position.set(-sideArchParams.width/4 + sideArchParams.archThick/2, topBlockY, 0);
  arch.position.set(0, sideArchParams.wedgeHeight + sideArchParams.block1height, 0);
  block1.position.set(0, sideArchParams.wedgeHeight + sideArchParams.block1height + sideArchParams.archWidth/2, 0);
  block2.position.set(sideArchParams.archWidth/2, sideArchParams.wedgeHeight + sideArchParams.block1height + sideArchParams.archWidth*3/8, 0);
  block3.position.set(-sideArchParams.archWidth/2, sideArchParams.wedgeHeight + sideArchParams.block1height + sideArchParams.archWidth*3/8, 0);
  block4.position.set(-sideArchParams.archWidth/2 - sideArchParams.archThick/2, sideArchParams.wedgeHeight + sideArchParams.block1height, 0);
  block5.position.set(sideArchParams.archWidth/2 + sideArchParams.archThick/2, sideArchParams.wedgeHeight + sideArchParams.block1height, 0);

  // add objects
  sideArch.add(wedgeBlockL);
  sideArch.add(wedgeBlockR);
  sideArch.add(thinBlock1L);
  sideArch.add(thinBlock1R);
  sideArch.add(thinBlock2L);
  sideArch.add(thinBlock2R);
  sideArch.add(topBlock);
  sideArch.add(arch);
  sideArch.add(block1);
  sideArch.add(block2);
  sideArch.add(block3);
  sideArch.add(block4);
  sideArch.add(block5);
  return sideArch;
}
// function to create the middle arch
function syanMiddleArch(columnParams, sideArchParams, middleArchParams, materialsParams){
  var middleArch = new THREE.Object3D();
  var totalHeight = columnParams.stairBlock1.height1 + columnParams.stairBlock1.height2 + columnParams.stairBlock1.height3 +
    columnParams.middleBlock1.height + columnParams.stairBlock2.height1 + columnParams.stairBlock2.height2 + columnParams.stairBlock2.height3 +
    columnParams.shaft.topHeight + columnParams.shaft.bottomHeight + columnParams.capital1.baseHeight + columnParams.capital1.bottomHeight;
  var block1Height = totalHeight - sideArchParams.wedgeHeight-sideArchParams.block1height-sideArchParams.archWidth/2- sideArchParams.archThick - middleArchParams.archWidth/2;
  var block1 = syanMiddleBlock(block1Height, middleArchParams.archWidth+middleArchParams.archThick,
    sideArchParams.depth - middleArchParams.archThick, materialsParams.stairMaterial);
  var block2 = syanMiddleBlock(middleArchParams.archWidth/4, middleArchParams.archWidth/4,
    sideArchParams.depth - middleArchParams.archThick, materialsParams.stairMaterial);
  var block3 = syanMiddleBlock(middleArchParams.archWidth/4, middleArchParams.archWidth/4,
    sideArchParams.depth - middleArchParams.archThick, materialsParams.stairMaterial);
  var block4 = syanMiddleBlock(totalHeight - sideArchParams.wedgeHeight - sideArchParams.block1height, middleArchParams.archThick*1.3,
    sideArchParams.depth - middleArchParams.archThick, materialsParams.stairMaterial);
  var block5 = syanMiddleBlock(totalHeight - sideArchParams.wedgeHeight - sideArchParams.block1height, middleArchParams.archThick*1.3,
    sideArchParams.depth - middleArchParams.archThick, materialsParams.stairMaterial);
  var arch = syanArch(middleArchParams.archWidth/2, sideArchParams.depth, middleArchParams.archThick*1.3, materialsParams.archMaterial);
  block1.position.set(0, middleArchParams.archWidth/2+middleArchParams.archThick*0.1, 0);
  block2.position.set(middleArchParams.archWidth/2, middleArchParams.archWidth*3/8, 0);
  block3.position.set(-middleArchParams.archWidth/2, middleArchParams.archWidth*3/8, 0);
  block4.position.set(-middleArchParams.archWidth/2 - middleArchParams.archThick*1.3/2, 0, 0);
  block5.position.set(middleArchParams.archWidth/2 + middleArchParams.archThick*1.3/2, 0, 0);
  middleArch.add(block1);
  middleArch.add(block2);
  middleArch.add(block3);
  middleArch.add(block4);
  middleArch.add(block5);
  middleArch.add(arch);
  return middleArch;
}
// function to create top of the arch
// origin at bottom center
function syanTopArch(columnParams, sideArchParams, middleArchParams, materials){
  var topArch = new THREE.Object3D();
  var totalWidth = middleArchParams.width*2 + middleArchParams.archWidth +
    sideArchParams.width*3 + sideArchParams.wedgeWidth*2 + sideArchParams.archWidth*2;
  var bottomThinLayer1 = syanMiddleBlock(columnParams.capital2.baseHeight, totalWidth,
    sideArchParams.depth, materials.capitalMaterial);
  var bottomThinLayer2 = syanMiddleBlock(columnParams.capital2.bottomHeight,
    totalWidth + sideArchParams.wedgeWidth*2, sideArchParams.depth + sideArchParams.wedgeWidth*2,
    materials.capitalMaterial);
  var middleBlock = syanMiddleBlock(columnParams.middleBlock2.height, totalWidth,
    sideArchParams.depth, materials.middleBlockMaterial);
  var stair3Bottom = syanMiddleBlock(columnParams.stairBlock3.height3, totalWidth+sideArchParams.wedgeWidth,
    sideArchParams.depth + sideArchParams.wedgeWidth, materials.stairMaterial);
  var stair3Middle = syanMiddleBlock(columnParams.stairBlock3.height2, totalWidth,
    sideArchParams.depth, materials.stairMaterial);
  var stair3Top = syanMiddleBlock(columnParams.stairBlock3.height3, totalWidth+sideArchParams.wedgeWidth,
    sideArchParams.depth + sideArchParams.wedgeWidth, materials.stairMaterial);
  var topThinLayer1 = syanMiddleBlock(columnParams.capital3.bottomHeight, totalWidth + sideArchParams.wedgeWidth,
    sideArchParams.depth + sideArchParams.wedgeWidth, materials.capitalMaterial);
  var topThinLayer2 = syanMiddleBlock(columnParams.capital3.baseHeight, totalWidth + sideArchParams.wedgeWidth*2,
    sideArchParams.depth + sideArchParams.wedgeWidth*2, materials.capitalMaterial);
  // calculate positions
  var capital2Height = columnParams.capital2.baseHeight + columnParams.capital2.bottomHeight;
  var stairBlock3Height = columnParams.stairBlock3.height1 + columnParams.stairBlock3.height2 + columnParams.stairBlock3.height3;
  // set positions
  bottomThinLayer2.position.set(0, columnParams.capital2.baseHeight, 0);
  middleBlock.position.set(0, capital2Height + stairBlock3Height, 0);
  stair3Bottom.position.set(0, capital2Height, 0);
  stair3Middle.position.set(0, capital2Height + columnParams.stairBlock3.height1, 0);
  stair3Top.position.set(0, capital2Height + columnParams.stairBlock3.height1 + columnParams.stairBlock3.height2, 0);
  topThinLayer1.position.set(0, capital2Height + stairBlock3Height + columnParams.middleBlock2.height, 0);
  topThinLayer2.position.set(0, capital2Height + stairBlock3Height + columnParams.middleBlock2.height + columnParams.capital3.bottomHeight, 0);
  // add objects
  topArch.add(bottomThinLayer1);
  topArch.add(bottomThinLayer2);
  topArch.add(middleBlock);
  topArch.add(stair3Bottom);
  topArch.add(stair3Middle);
  topArch.add(stair3Top);
  topArch.add(topThinLayer1);
  topArch.add(topThinLayer2);
  return topArch;
}
// function to create the entire arch of constantine
// uses helper functions such as column and archway
// input: all the parameters of column and archway
// origin is at the center bottom
function createArchOfConstantine(columnParams, sideArchParams, middleArchParams, materialsParams){
  var archOfConstantine = new THREE.Object3D();
  // create columns
  var column1 = syanColumn(columnParams.capital3, columnParams.middleBlock2, columnParams.stairBlock3, columnParams.capital2, columnParams.capital1, columnParams.shaft, columnParams.stairBlock2, columnParams.middleBlock1, columnParams.stairBlock1, materialsParams);
  var column2 = syanColumn(columnParams.capital3, columnParams.middleBlock2, columnParams.stairBlock3, columnParams.capital2, columnParams.capital1, columnParams.shaft, columnParams.stairBlock2, columnParams.middleBlock1, columnParams.stairBlock1, materialsParams);
  var column3 = syanColumn(columnParams.capital3, columnParams.middleBlock2, columnParams.stairBlock3, columnParams.capital2, columnParams.capital1, columnParams.shaft, columnParams.stairBlock2, columnParams.middleBlock1, columnParams.stairBlock1, materialsParams);
  var column4 = syanColumn(columnParams.capital3, columnParams.middleBlock2, columnParams.stairBlock3, columnParams.capital2, columnParams.capital1, columnParams.shaft, columnParams.stairBlock2, columnParams.middleBlock1, columnParams.stairBlock1, materialsParams);
  var column5 = syanColumn(columnParams.capital3, columnParams.middleBlock2, columnParams.stairBlock3, columnParams.capital2, columnParams.capital1, columnParams.shaft, columnParams.stairBlock2, columnParams.middleBlock1, columnParams.stairBlock1, materialsParams);
  var column6 = syanColumn(columnParams.capital3, columnParams.middleBlock2, columnParams.stairBlock3, columnParams.capital2, columnParams.capital1, columnParams.shaft, columnParams.stairBlock2, columnParams.middleBlock1, columnParams.stairBlock1, materialsParams);
  var column7 = syanColumn(columnParams.capital3, columnParams.middleBlock2, columnParams.stairBlock3, columnParams.capital2, columnParams.capital1, columnParams.shaft, columnParams.stairBlock2, columnParams.middleBlock1, columnParams.stairBlock1, materialsParams);
  var column8 = syanColumn(columnParams.capital3, columnParams.middleBlock2, columnParams.stairBlock3, columnParams.capital2, columnParams.capital1, columnParams.shaft, columnParams.stairBlock2, columnParams.middleBlock1, columnParams.stairBlock1, materialsParams);
  // create side archs
  var rightSideArch = syanSideArch(columnParams, sideArchParams, middleArchParams.width, materialsParams);
  var leftSideArch = syanSideArch(columnParams, sideArchParams, middleArchParams.width, materialsParams);
  // create middle arch
  var middleArch = syanMiddleArch(columnParams, sideArchParams, middleArchParams, materialsParams);
  // create top arch
  var topArch = syanTopArch(columnParams, sideArchParams, middleArchParams, materialsParams);

  // calculate positions
  var columnAbsZ = sideArchParams.depth/2 + sideArchParams.wedgeWidth + columnParams.stairBlock1.length3/2;
  var column1X = -1*((middleArchParams.archWidth)/2 + middleArchParams.width + sideArchParams.archWidth + sideArchParams.width);
  var column2X = -1*((middleArchParams.archWidth)/2 + middleArchParams.width);
  var column3X = (middleArchParams.archWidth)/2 + middleArchParams.width;
  var column4X = (middleArchParams.archWidth)/2 + middleArchParams.width + sideArchParams.archWidth + sideArchParams.width;
  var sideArchAbsX = middleArchParams.archWidth/2 + middleArchParams.width + sideArchParams.width/2 + sideArchParams.archWidth/2;
  var topBaseX = columnParams.stairBlock1.height1 + columnParams.stairBlock1.height2 + columnParams.stairBlock1.height3 +
    columnParams.middleBlock1.height + columnParams.stairBlock2.height1 + columnParams.stairBlock2.height2 + columnParams.stairBlock2.height3 +
    columnParams.shaft.topHeight + columnParams.shaft.bottomHeight + columnParams.capital1.baseHeight + columnParams.capital1.bottomHeight;

  // set positions
  column1.position.set(column1X, 0, columnAbsZ);
  column2.position.set(column2X, 0, columnAbsZ);
  column3.position.set(column3X, 0, columnAbsZ);
  column4.position.set(column4X, 0, columnAbsZ);
  column5.position.set(column1X, 0, -columnAbsZ);
  column6.position.set(column2X, 0, -columnAbsZ);
  column7.position.set(column3X, 0, -columnAbsZ);
  column8.position.set(column4X, 0, -columnAbsZ);
  rightSideArch.position.set(sideArchAbsX, 0, 0);
  leftSideArch.position.set(-sideArchAbsX, 0, 0);
  middleArch.position.set(0, sideArchParams.wedgeHeight + sideArchParams.block1height + sideArchParams.archWidth/2 + sideArchParams.archThick, 0);
  topArch.position.set(0, topBaseX, 0);
  // rotate left side arch
  leftSideArch.rotation.y = Math.PI;
  // add objects
  archOfConstantine.add(column1);
  archOfConstantine.add(column2);
  archOfConstantine.add(column3);
  archOfConstantine.add(column4);
  archOfConstantine.add(column5);
  archOfConstantine.add(column6);
  archOfConstantine.add(column7);
  archOfConstantine.add(column8);
  archOfConstantine.add(rightSideArch);
  archOfConstantine.add(leftSideArch);
  archOfConstantine.add(topArch);
  archOfConstantine.add(middleArch);

  return archOfConstantine;
}
