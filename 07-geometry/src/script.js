import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
// const geometry = new THREE.SphereGeometry(1,32,32);
// const plane = new THREE.PlaneGeometry(5,5,1,1);

//Buffer Geomatry
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0, 0, 0,   // Vertex A
    1, 0, 0,   // Vertex B
    0, 1, 0  // Vertex C
]);
//Tell Three.js these are positions.
// geometry.setAttribute(
//   'position',
//   new THREE.BufferAttribute(vertices,3)
// )

//more traingle
const count = 3;
const array = new Float32Array(count * 9);

for (let i = 0; i < array.length; i++) {
    array[i] = (Math.random() - 0.5) * 5;
}
//Every 3 vertices = 1 triangle
geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(array, 3)
);
geometry.setAttribute('position',new THREE.BufferAttribute(array,3));


const sphereGeometry = new THREE.SphereGeometry(2,30,30);

const material = new THREE.MeshBasicMaterial({ color: 0xff0000,wireframe:true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
