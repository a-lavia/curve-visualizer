const parameters = {
  planetRadius: 1.0,
  observerHeight: 1.0,
  targetHeight: 1.0,
  targetDistance: 1.0
};

//Pixels
var dimWidth = 512;
var dimHeight = 1024;

var scene = new THREE.Scene();

//World units
var width = 5;
var height = 5;
var worldCamera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, 0, 20000);
var observerCamera = new THREE.PerspectiveCamera(45, 1, 0.001, 10000);

var renderer = new THREE.WebGLRenderer({antialias: true});

function initCanvas() {
  renderer.setSize(dimWidth, dimHeight);
  renderer.setClearColor(0x93d3fb, 1);
  document.body.appendChild(renderer.domElement).setAttribute("align", "center");
}

function initScene() {
  scene.add(createSphere());
}

function createSphere() {
  let radius = 1;
  let segments = 64;
  let geometry = new THREE.SphereGeometry(radius, segments, segments);
  let material = new THREE.MeshStandardMaterial( { color: 0x0066ff } );
  let mesh = new THREE.Mesh(geometry, material);

  const edgesGeometry = new THREE.EdgesGeometry(geometry );
  const wireframe = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
  mesh.add( wireframe );

  return mesh;
}

function render () {
  requestAnimationFrame(render);

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
