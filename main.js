import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(0);
camera.position.setY(1.2);
camera.position.setZ(-10); 


renderer.render(scene, camera);


// textures, diffuse map, roughness map
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('weavenorm.jpg');
const roughnessTexture = new THREE.TextureLoader().load('weaverough.jpg');
const diffuseMap = new THREE.TextureLoader().load('weavedisp.png');

// Torus

const geometry = new THREE.TorusGeometry(5, 0.5, 32, 100);
const material = new THREE.MeshStandardMaterial(
  { color: 0xFFD700,
    roughness: 0.1,
    metalness: 0.7,
    diffuse: 0,
    // map: moonTexture,
    normalMap: normalTexture,
    roughnessTexture: roughnessTexture,
    diffuseMap: diffuseMap,
  });
const torus = new THREE.Mesh(geometry, material);

torus.position.setX(8);
torus.position.setY(-5);
torus.position.setZ(-15);

scene.add(torus);

// Mesh Ring

const mesh = new THREE.Mesh(
  new THREE.TorusGeometry(5, 0.5, 32, 100),
  new THREE.MeshBasicMaterial({wireframe: true}),
    // map: moonTexture,

);

mesh.position.setX(7);
mesh.position.setY(-3);
mesh.position.setZ(20)

scene.add(mesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  mesh.rotation.x += 0.05;
  mesh.rotation.y += 0.075;
  mesh.rotation.z += 0.05;

  camera.position.z = t * -0.05;
  // camera.position.x = t * -0.0005;
  // camera.rotation.y = t * -0.0005;
}

// document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.0005;
  torus.rotation.z += 0.001;

  mesh.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();


// helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(100, 0);
// scene.add(lightHelper, gridHelper)

// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );


// controls.addEventListener('change', renderer); // use if there is no animation loop

const controls = new OrbitControls(camera, renderer.domElement);

controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set(0, 0, - 0.2);
controls.update();