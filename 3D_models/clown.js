// a function to hold all the parameters for clown
function createClownParams(){
    var parameters = {
        // clown component variables
        originRadius: 0.25,
        headRadius: 5,
        hatRadius: 5, hatDistanceX: 1.5, hatBaseHeight: 0.5, hatHeight: 7, hatTopRadius: 5, hatBottomRadius: 3, hatAngle: -Math.PI*1/12,
        eyeRadius: 0.75, noseRadius: 0.5, earRadius: 2, eyeSpace: 4, eyeHeight: 1,
        mouthRadius: 2, mouthTube: 0.25, mouthHeight: -0.5, mouthRotation: -Math.PI*2/3, mouthArc: Math.PI*1/2,
        bodyRadius: 6, bodyScaleY: 1.2,
        armTopRadius: 0.75, armBottomRadius: 0.5, armLength: 8, armAngle: Math.PI*1/4,
        shoulderHeight: 9, shoulderWidth: 7, shoulderRadius: 2,
        hipHeight: 8, hipWidth: 5,
        legTopRadius: 1, legBottomRadius: 0.75, legLength: 10,
        footRadius: 2,
        handRadius: 1.5,
        // segment details
        sphereDetail: 16, cylinderDetail: 20,
        // materials
        yellowMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("yellow")}),
        headMaterial: new THREE.MeshLambertMaterial({color: new THREE.Color("lightgreen")}),
        hatMaterial: new THREE.MeshPhongMaterial({color: new THREE.Color("darkblue"),
                                                  specular: new THREE.Color("white"),
                                                  shiniess: 10,
                                                  shading: THREE.SmoothShading}),
        faceMaterial: new THREE.MeshPhongMaterial({color: new THREE.Color("black"),
                                                   specular: new THREE.Color("white"),
                                                   shininess: 40,
                                                   shading: THREE.SmoothShading}),
        mouthMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("white")}),
        bodyMaterial: new THREE.MeshPhongMaterial({color: new THREE.Color("darkblue"),
                                                   specular: new THREE.Color("white"),
                                                   shiniess: 70,
                                                   shading: THREE.SmoothShading}),
        shoulderMaterial: new THREE.MeshPhongMaterial({color: new THREE.Color("grey"),
                                                       specular: new THREE.Color("white"),
                                                       shiniess: 20,
                                                       shading: THREE.SmoothShading}),
        armMaterial: new THREE.MeshLambertMaterial({color: new THREE.Color("powderblue")}),
        legMaterial: new THREE.MeshLambertMaterial({color: new THREE.Color("blue")}),
        footMaterial: new THREE.MeshLambertMaterial({color: new THREE.Color("lime")}),
        handMaterial: new THREE.MeshLambertMaterial({color: new THREE.Color("white")})
    };
    return parameters;
}
// create material array for the room given its colors
function createMaterialArray(wallColors, ceilingColor, floorColor){
  var materialArray = [];
  // add same material for walls
  for (var i = 0; i < 2; i++) {
      materialArray.push(new THREE.MeshPhongMaterial({
                                   color: wallColors,
                                   side: THREE.BackSide}));
  }
  // add ceiling material
  materialArray.push(new THREE.MeshPhongMaterial({
                          color: ceilingColor,
                          side: THREE.BackSide }));
  // add floor material
  materialArray.push(new THREE.MeshPhongMaterial({
                          color: floorColor,
                          side: THREE.BackSide }));
  // add same material for walls
  for (var i = 0; i < 2; i++) {
      materialArray.push(new THREE.MeshPhongMaterial({
                                   color: wallColors,
                                   side: THREE.BackSide}));
  }
  return materialArray;
}
// creates origin marker
function createOrigin(params){
    var origin = new THREE.Object3D();
    var originGeom = new THREE.SphereGeometry(params.originRadius, params.sphereDetail, params.sphereDetail);
    var originMesh = new THREE.Mesh(originGeom, params.yellowMaterial);
    originMesh.name = "origin";
    origin.add(originMesh);
    return origin;
}
// creates foot Object3D
function createFoot(footRadius, segments, material){
    var foot = new THREE.Object3D();
    var footGeom = new THREE.SphereGeometry(footRadius, segments, segments, 0, Math.PI*2, 0, Math.PI/2);
    var footMesh = new THREE.Mesh(footGeom, material);
    foot.add(footMesh);
    return foot;
}
// creates shoulder Object3D
function createJoint(jointRadius, segments, material){
    var joint = new THREE.Object3D();
    var jointGeom = new THREE.SphereGeometry(jointRadius, segments, segments);
    var jointMesh = new THREE.Mesh(jointGeom, material);
    joint.add(jointMesh);
    return joint;
}
// creates limb Object3D for arm or leg
function createLimb(topRadius, bottomRadius, length, segments, material){
    var limb = new THREE.Object3D();
    var limbGeom = new THREE.CylinderGeometry(topRadius, bottomRadius, length, segments, segments);
    var limbMesh = new THREE.Mesh(limbGeom, material);
    limb.add(limbMesh);
    return limb;
}
// creates mouth Object3D for face
function createMouth(mouthRadius, mouthTube, segments, mouthArc, material){
    var mouth = new THREE.Object3D();
    var mouthGeom = new THREE.TorusGeometry(mouthRadius, mouthTube, segments, segments, mouthArc);
    var mouthMaterial = new THREE.Mesh(mouthGeom, material);
    mouth.add(mouthMaterial);
    return mouth;
}
// creates arm and positions it while adding to clown
function createArm(params, side){
    // variables for arm
    var armTopRadius = params.armTopRadius;
    var armBottomRadius = params.armBottomRadius;
    var armLength = params.armLength;
    var segments1 = params.cylinderDetail;
    var armMaterial = params.armMaterial;

    // variables for shoulder
    var shoulderRadius = params.shoulderRadius;
    var segments2 = params.sphereDetail;
    var shoulderMaterial = params.shoulderMaterial;

    // variables for hand
    var handRadius = params.handRadius;
    var handMaterial = params.handMaterial;

    var arm = createLimb(armTopRadius, armBottomRadius, armLength, segments1, armMaterial);
    var shoulder = createJoint(shoulderRadius, segments2, shoulderMaterial);
    var hand = createJoint(handRadius, segments2, handMaterial);

    // position shoulder and hand
    shoulder.position.set(0, armLength/2 - shoulderRadius/2, 0);
    hand.position.set(0, -armLength/2 + handRadius/2, 0);
    arm.add(shoulder);
    arm.add(hand);

    // position arm
    arm.position.set(side*(params.shoulderWidth/2+armLength/2), params.bodyRadius*params.bodyScaleY+params.shoulderHeight, 0);
    arm.rotation.z = side*params.armAngle;
    // right when side == 1, left when side == -1
    arm.name = (side == 1 ? "right arm": "left arm");
    return arm;
}
// creates body Object3D
function createBody(bodyRadius, segments, material, bodyScaleY){
    var body = new THREE.Object3D();
    var bodyGeom = new THREE.SphereGeometry(bodyRadius, segments, segments);
    var bodyMesh = new THREE.Mesh(bodyGeom, material);
    bodyMesh.name = "body";
    bodyMesh.scale.y = bodyScaleY;
    body.add(bodyMesh);
    return body;
}
// creates hat
function createHat(hatDistanceX, hatRadius, hatBaseHeight, hatHeight, hatTopRadius, hatBottomRadius, hatAngle, material, segments){
    var hat = new THREE.Object3D();
    var hatGeom = new THREE.CylinderGeometry(hatTopRadius, hatBottomRadius, hatHeight, segments, segments);
    var hatMesh = new THREE.Mesh(hatGeom, material);
    hatMesh.name = "hat";
    hat.add(hatMesh);
    var baseHatGeom = new THREE.CylinderGeometry(hatRadius, hatRadius, hatBaseHeight, segments, segments);
    var hatBaseMesh = new THREE.Mesh(baseHatGeom, material);
    hatBaseMesh.position.set(0, -hatHeight/2, 0);
    hat.add(hatBaseMesh);
    hat.position.set(hatDistanceX, hatHeight + hatBaseHeight, 0);
    return hat;
}
// creates and positions foot while adding to clown
function addFoot(clown, params, side){
    // right when side == 1, left when side == -1
    var footRadius = params.footRadius;
    var segments = params.sphereDetail;
    var footMaterial = params.footMaterial;
    var foot = createFoot(footRadius, segments, footMaterial);
    foot.position.set(side/2*params.hipWidth, 0, 0);
    foot.name = (side == 1 ? "right foot": "left foot");
    clown.add(foot);
}
// creates and positions leg while adding to clown
function addLeg(clown, params, side){
    var legTopRadius = params.legTopRadius;
    var legBottomRadius = params.legBottomRadius;
    var legLength = params.legLength;
    var segments = params.cylinderDetail;
    var legMaterial = params.legMaterial;
    var leg = createLimb(legTopRadius, legBottomRadius, legLength, segments, legMaterial);
    var legPositiony = legLength/2;
    leg.position.set(side/2*params.hipWidth, legPositiony, 0);
    // right when side == 1, left when side == -1
    leg.name = (side == 1 ? "right leg": "left leg");
    clown.add(leg);
    // now add the corresponding foot
    addFoot(clown, params, side);
}
// adds arms to clown
function addArms(clown, params){
    var leftArm = createArm(params, -1);
    var rightArm = createArm(params, 1);
    clown.add(leftArm);
    clown.add(rightArm);
}
// creates and positions body while adding to clown
function addBody(clown, params){
    var bodyRadius = params.bodyRadius;
    var segments = params.sphereDetail;
    var bodyMaterial = params.bodyMaterial;
    var bodyScaleY = params.bodyScaleY;
    var body = createBody(bodyRadius, segments, bodyMaterial, bodyScaleY);
    var bodyPositionY = bodyRadius*bodyScaleY + params.hipHeight;
    body.position.set(0, bodyPositionY, 0);
    clown.add(body);
    addLeg(clown, params, 1);
    addLeg(clown, params, -1);
    addArms(clown, params);
}
// creates face via createJoint and createMouth
function addFace(head, params){
    var rightEye = createJoint(params.eyeRadius, params.SphereGeometry, params.faceMaterial);
    var leftEye= createJoint(params.eyeRadius, params.SphereGeometry, params.faceMaterial);
    var nose = createJoint(params.noseRadius, params.SphereGeometry, params.faceMaterial);
    var rightEar = createJoint(params.earRadius, params.SphereGeometry, params.faceMaterial);
    var leftEar = createJoint(params.earRadius, params.SphereGeometry, params.faceMaterial);
    var mouth = createMouth(params.mouthRadius, params.mouthTube, params.sphereDetail, params.mouthArc, params.mouthMaterial);
    // position them relative to head
    rightEye.position.set(1*params.eyeSpace/2, params.eyeHeight, params.headRadius);
    leftEye.position.set(-1*params.eyeSpace/2, params.eyeHeight, params.headRadius);
    nose.position.set(0, 0, params.headRadius);
    rightEar.position.set(1*params.headRadius, 0, 0);
    leftEar.position.set(-1*params.headRadius, 0, 0);
    mouth.rotation.z = params.mouthRotation;
    mouth.position.set(0, params.mouthHeight, params.headRadius);
    // add them to head
    head.add(rightEye);
    head.add(leftEye);
    head.add(nose);
    head.add(rightEar);
    head.add(leftEar);
    head.add(mouth);
}
// creates and positions head while adding to clown
function addHead(clown, params){
    var headRadius = params.headRadius;
    var segments = params.sphereDetail;
    var headMaterial = params.headMaterial;
    var head = createJoint(headRadius, segments, headMaterial);
    head.name = "head";
    // add hat
    var hat = createHat(params.hatDistanceX, params.hatRadius, params.hatBaseHeight, params.hatHeight, params.hatTopRadius, params.hatBottomRadius, params.hatAngle, params.hatMaterial, params.cylinderDetail);
    head.add(hat);
    hat.rotation.z = params.hatAngle;
    // add facial features to face
    addFace(head, params);
    // set position of entire head + components
    var headPositiony = params.legLength + 2*params.bodyRadius*params.bodyScaleY+headRadius/2;
    head.position.set(0, headPositiony, 0);
    clown.add(head);
}
// a function where we create the entire clown
function createClown(params){
    var clown = new THREE.Object3D();
    // add an origin
    var origin = createOrigin(params);
    clown.add(origin);
    // create limbs
    addBody(clown, params);
    addHead(clown, params);
    return clown;
}
