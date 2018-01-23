var camera, scene, renderer;
var mesh;
var earthTexture, sunTexture, mercuryTexture, venusTexture, marsTexture, jupiterTexture;
var planetTexture = [];

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0,35,70);
  scene = new THREE.Scene();

  earthTexture = new THREE.TextureLoader().load('images/earthmap.jpg');
  sunTexture = new THREE.TextureLoader().load('images/sunmap.jpg');
  mercuryTexture = new THREE.TextureLoader().load('images/mercurymap.jpg');
  venusTexture = new THREE.TextureLoader().load('images/venusmap.jpg');
  marsTexture = new THREE.TextureLoader().load('images/marsmap.jpg');
  jupiterTexture = new THREE.TextureLoader().load('images/jupitermap.jpg');

  planetTexture.push(sunTexture);
  planetTexture.push(earthTexture);
  planetTexture.push(mercuryTexture);
  planetTexture.push(venusTexture);
  planetTexture.push(marsTexture);
  planetTexture.push(jupiterTexture);

  //add earth globe
  var earthGeometry = new THREE.SphereGeometry(100, 40, 40);
  var earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture
  });


  earthMaterial.bumpMap = new THREE.TextureLoader().load('images/earthbump.jpg');
  earthMaterial.bumpScale = 0.1;

  mesh = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(mesh);
  //add moon
  var moonGeometry = new THREE.SphereGeometry(20, 40, 40);
  var moonTexture = new THREE.TextureLoader().load('images/moonmap.jpg');
  var moonMaterial = new THREE.MeshPhongMaterial({
    map: moonTexture
  });
  meshMoon = new THREE.Mesh(moonGeometry, moonMaterial);
  // scene.add(meshMoon);

  //add Stars
  var starGeometry = new THREE.SphereGeometry(50, 40, 40);
  var starTexture = new THREE.TextureLoader().load('images/starmap.png');
  var starMaterial = new THREE.MeshPhongMaterial({
    map: starTexture
  });
  var starField = new THREE.Mesh(starGeometry, starMaterial);
  // scene.add(starField);
  // add light , otherwise MeshPhongMaterial is black
  //Lights
  var ambientLight = new THREE.AmbientLight(0xf1f1f1);
  // scene.add(ambientLight);
  var spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(50, 50, 50);
  scene.add(spotLight);

  // var light = new THREE.DirectionalLight(0xffffff);
  // light.position.set(0, 1, 1).normalize();
  // scene.add(light);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  //
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  // mesh.material.needsUpdate = true;

  let flag = Math.floor(mesh.rotation.y % 6);
  // console.log(mesh.rotation.y);
  // if (flag){
  //   mesh.position.y = Math.random()*20;
  //   mesh.position.x = Math.random()*20;
  //   mesh.position.z = Math.random()*20;
  // }
  mesh.material.map = planetTexture[flag];

  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}