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
// function to create the ball given its parameters
function createBall(ballColor, ballRadius, ballSpecular, ballShininess){
  var ball = new THREE.Object3D();
  var ballGeom = new THREE.SphereGeometry(ballRadius, 30, 30);
  var ballMat = new THREE.MeshPhongMaterial({
                              color: ballColor,
                              specular: ballSpecular,
                              shininess: ballShininess });
  var ballMesh = new THREE.Mesh(ballGeom, ballMat);
  ball.add(ballMesh);
  return ball;
}
// function to create one cone given its parameters
function createCone(coneColor, coneRadius, coneHeight, coneSpecular, coneShininess){
  var cone = new THREE.Object3D();
  var coneGeom = new THREE.ConeGeometry(coneRadius, coneHeight, 30, 30, true);
  var coneMat = new THREE.MeshPhongMaterial({
                              color: coneColor,
                              specular: coneSpecular,
                              shininess: coneShininess });
  var coneMesh = new THREE.Mesh(coneGeom, coneMat);
  cone.add(coneMesh);
  return cone
}
