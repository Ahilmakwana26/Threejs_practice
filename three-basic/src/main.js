import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1,1,1);
const sunLight = new THREE.PointLight(0xffffff, 3);
sunLight.position.set(0, 0, 0);

scene.add(sunLight);
const material = new THREE.MeshStandardMaterial({
    color: 0xffcc33,
    emissive: 0xffaa00,
    emissiveIntensity: 1.7
});
const mesh = new THREE.Mesh(geometry,material);

scene.add(mesh);

const sizes={
    width:window.innerWidth,
    height:window.innerHeight
};

window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width , sizes.height);//Changes the size of the WebGL canvas.
})

const camera = new THREE.PerspectiveCamera(
    75,//FOV
    sizes.width / sizes.height,
    1,
    100
);

camera.position.z = 2;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas:canvas
});

renderer.setSize(sizes.width , sizes.height);

const control = new OrbitControls(camera,canvas);
control.enableDamping = true;

const elapsedtime = new THREE.Clock();
function animate(){

    control.update();
    let time = elapsedtime.getElapsedTime();
    mesh.rotation.x = time;
    mesh.rotation.y = time;
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

animate();



// const geometry = new THREE.SphereGeometry(1, 64, 64);

// const material = new THREE.MeshBasicMaterial({
//     color: 0xffcc33
// });

// const sun = new THREE.Mesh(geometry, material);
// scene.add(sun);

// const sunLight = new THREE.PointLight(0xffffff, 3, 100);
// sunLight.position.copy(sun.position);
// scene.add(sunLight);