// a function to hold all the parameters for clown
function createClownParams(){
    var parameters = {
        // clown component variables
        originRadius: 0.25,
        headRadius: 5,
        hatRadius: 6, hatBaseHeight: 0.25, hatHeight: 7, hatTopRadius: 5.5, hatBottomRadius: 5, hatAngle: Math.PI*1/3,
        eyeRadius: 1, noseRadius: 0.5, earRadius: 2, eyeSpace: 4, eyeHeight: 1,
        mouthRadius: 2, mouthTube: 0.25, mouthHeight: -2, mouthRotation: Math.PI*1/4, mouthArc: Math.PI*1/2,
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
        headMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("lightgreen")}),
        hatMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("darkblue")}),
        faceMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("black")}),
        mouthMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("white")}),
        bodyMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("darkblue")}),
        shoulderMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("grey")}),
        armMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("powderblue")}),
        legMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("blue")}),
        footMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("lime")}),
        handMaterial: new THREE.MeshBasicMaterial({color: new THREE.Color("white")})
    };
    return parameters;
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
    shoulder.position.y = armTopRadius;
    shoulder.position.x = 0;
    hand.position.y = armBottomRadius;
    hand.position.x = -armLength;
    arm.add(shoulder);
    arm.add(hand);

    // position arm
    arm.rotation.z = side*params.armAngle;
    arm.position.y = params.legLength+params.shoulderHeight;
    arm.position.x = side*(params.shoulderWidth/2);

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
function createHat(hatRadius, hatBaseHeight, hatHeight, hatTopRadius, hatBottomRadius, material, segments){
    var hat = new THREE.Object3D();
    var hatGeom = new THREE.CylinderGeometry(hatTopRadius, hatBottomRadius, hatHeight, segments, segments);
    var hatMesh = new THREE.Mesh(hatGeom, material);
    hatMesh.name = "hat";
    hat.add(hatMesh);
    var baseHatGeom = new THREE.CylinderGeometry(hatRadius, hatRadius, hatBaseHeight, segments, segments);
    var hatBaseMesh = new THREE.Mesh(baseHatGeom, material);
    hat.add(hatBaseMesh);
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
    rightEye.set.position(1*params.eyeSpace/2, params.eyeHeight, params.headRadius);
    leftEye.set.position(-1*params.eyeSpace/2, params.eyeHeight, params.headRadius);
    nose.set.position(0, 0, params.headRadius);
    rightEar.set.position(1*params.headRadius, params.headRadius, 0);
    leftEar.set.position(-1*params.headRadius, params.headRadius, 0);
    mouth.set.position(0, params.mouthHeight, 0);
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
    var hat = createHat(params.hatRadius, params.hatBaseHeight, params.hatHeight, params.hatTopRadius, params.hatBottomRadius, params.hatMaterial, params.cylinderDetail);
    hat.set.position(0, 2*headRadius, 0);
    hat.rotation.z = params.hatAngle;
    head.add(hat);
    // add facial features to face
    addFace(head, params);
    // set position of entire head + components
    var headPositiony = params.legLength + 2*params.bodyRadius*params.bodyScaleY+headRadius;
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
