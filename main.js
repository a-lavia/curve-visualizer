const parameters = {
  sphereRadius: 1.0,
  latitude: 0.0,
  longitude: 0.0,
  observerHeight: 1.0,
  targetHeight: 1.0,
  targetDistance: 1.0
};

//Pixels
var dimWidth = 512;
var dimHeight = 1024;

//Scene
var scene = new THREE.Scene();

//World units
var width = 5;
var height = 5;
var worldCamera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, 0, 20000);
var observerCamera = new THREE.PerspectiveCamera(45, 1, 0.01, 10);

var renderer = new THREE.WebGLRenderer({antialias: true});
var orbitControls = new THREE.OrbitControls(worldCamera, renderer.domElement);

function initCanvas() {
  renderer.setSize(dimWidth, dimHeight);
  renderer.setClearColor(0x93d3fb, 1);
  worldCamera.position.z = 20;
  document.body.appendChild(renderer.domElement);
}

function initScene() {
  let ambientLight = new THREE.AmbientLight(0x666666);
  scene.add(ambientLight);

  let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5,3,5);
  scene.add(directionalLight);

  scene.add(createSphere());
  scene.add(createCircle());
  scene.add(createBox());
  //scene.add(createCameraHelper());
}

function updateScene() {
  updateSphere();
  updateCircle();
  updateObserver();
}

function updateSphere() {
  let sphere = scene.getObjectByName('sphere');
  sphere.scale.x = parameters.sphereRadius;
  sphere.scale.y = parameters.sphereRadius;
  sphere.scale.z = parameters.sphereRadius;
}

function updateCircle() {
  let circle = scene.getObjectByName('circle');
  let circleRadius = latitudeRadius();
  let circleY = yPosition();
  circle.scale.x = circleRadius;
  circle.scale.y = circleRadius;
  circle.scale.z = circleRadius;

  circle.position.y = circleY;
}

function updateObserver() {
  let observer = scene.getObjectByName('box');
  let r = parameters.sphereRadius;
  let lat = parameters.latitude;
  let lon = parameters.longitude;
  observer.position.copy(latLonToXYZ(r, lat, lon));
  observer.rotation.y = -lon;
  observer.rotation.z = lat;

  observerCamera.position.copy(latLonToXYZ(r+0.01, lat, lon));
  observerCamera.rotation.x = 0;
  observerCamera.rotation.z = lat;
  observerCamera.rotation.y = -lon;
  observerCamera.rotateZ(-Math.PI/2);

}

//Return radius given a latitude
function latitudeRadius() {
  return parameters.sphereRadius * Math.cos(parameters.latitude);
}

//Return Y position
function yPosition() {
  return parameters.sphereRadius * Math.sin(parameters.latitude);
}

function latLonToXYZ(r, lat, lon) {
  let xyz = new THREE.Vector3();
  xyz.x = r * Math.cos(lat) * Math.cos(lon);
  xyz.y = r * Math.sin(lat);
  xyz.z = r * Math.cos(lat) * Math.sin(lon);
  return xyz;
}

function createSphere() {
  let radius = 1;
  let segments = 64;
  let geometry = new THREE.SphereGeometry(radius, segments, segments);
  let material = new THREE.MeshStandardMaterial({color: 0x0066ff});
  let mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'sphere';

  const edgesGeometry = new THREE.EdgesGeometry(geometry);
  const wireframe = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 0.5}));
  mesh.add(wireframe);

  return mesh;
}

function createCircle() {
  let radius = 1;
  let segments = 128;
  let geometry = new THREE.CircleGeometry(radius, segments);
  let edgesGeometry = new THREE.EdgesGeometry(geometry);
  let material = new THREE.LineBasicMaterial({color: 0x00ff00, linewidth: 4});
  let mesh = new THREE.LineSegments(edgesGeometry, material);
  mesh.name = 'circle';
  mesh.rotation.x = Math.PI / 2.;
  return mesh;
}

function createBox() {
  let geometry = new THREE.BoxGeometry(0.1, 0.025, 0.025);
  geometry.translate(0.05, 0, 0);
  let material = new THREE.MeshStandardMaterial({color: 0xff0000 });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'box';

  return mesh;
}

function createCameraHelper() {
  let cameraHelper = new THREE.CameraHelper(observerCamera);
  cameraHelper.name = 'cameraHelper';
  return cameraHelper;
}

var clock = new THREE.Clock();

function render () {
  requestAnimationFrame(render);

  let delta = clock.getDelta();
  parameters.longitude+=0.25*delta/latitudeRadius();
  updateScene();

  renderer.setViewport(0, 0, dimWidth, Math.floor(dimHeight / 2));
  renderer.setScissor(0, 0, dimWidth, Math.floor(dimHeight / 2));
  renderer.setScissorTest(true);
  worldCamera.aspect = dimWidth / Math.floor(dimHeight / 2);
  worldCamera.updateProjectionMatrix();
  renderer.render(scene, worldCamera);

  renderer.setViewport(0, Math.floor(dimHeight / 2), dimWidth, Math.floor(dimHeight / 2));
  renderer.setScissor(0, Math.floor(dimHeight / 2), dimWidth, Math.floor(dimHeight / 2));
  renderer.setScissorTest(true);
  observerCamera.aspect = dimWidth / Math.floor(dimHeight / 2);
  observerCamera.updateProjectionMatrix();
  renderer.render(scene, observerCamera);
};

window.onload = function() {
  initCanvas();
  initScene();
  render();
};
