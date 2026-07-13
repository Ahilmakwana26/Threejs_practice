import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

let curson = {
  x:0,
  y:0,
};

window.addEventListener('mousemove',(e)=>{
  curson.x = e.clientX / sizes.width - 0.5;
  curson.y = -1 * (e.clientY / sizes.height - 0.5);
  // console.log(curson.x , curson.y)
})

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

//Inbuild Thress js Orbit Control
const control = new OrbitControls(camera, canvas);
//now add smothness in rotating
control.enableDamping = true;




// Animate
const clock = new THREE.Clock();

//mousemove event
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime;
  //custom orbit Control using mousemovement
  // camera.position.x = Math.sin(curson.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(curson.x * Math.PI * 2) * 2;
  // camera.position.y = curson.y * 3;
  control.update();
  //camera.lookAt(mesh.position);
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
