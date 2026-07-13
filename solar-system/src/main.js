import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import sunmap from "./assets/images/8k_sun.jpg";
import earthmap from "./assets/images/8k_earth_daymap.jpg";
import moonmap from "./assets/images/2k_moon.jpg";

const scene = new THREE.Scene();

const canvas = document.querySelector('#webgl');
const sizes = {
    width:window.innerWidth,
    height:window.innerHeight,
};

const geomatry = new THREE.SphereGeometry(1,32,32);

const loader = new THREE.TextureLoader();
const load = loader.load(sunmap);
const material = new THREE.MeshStandardMaterial({
   map:load,
   color: new THREE.Color(1, 0.9, 0.5).multiplyScalar(8)
   //color:0xffff00
});

//sun
const sun = new THREE.Mesh(geomatry,material);
sun.position.set(0,0,0);
scene.add(sun);

//Earth
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1,32,32),
    new THREE.MeshStandardMaterial({
        map:loader.load(earthmap)
    })
);

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(1,32,32),
    new THREE.MeshStandardMaterial({
        map:loader.load(moonmap)
    })
);

// scene.add(earth);
// scene.add(moon)
const pointLight = new THREE.PointLight(0xffddaa, 100);
pointLight.position.set(5,5,5);

scene.add(pointLight);

const ambientlight = new THREE.AmbientLight(0xffffff , 0.2);
scene.add(ambientlight);

const camera = new THREE.PerspectiveCamera(
    74,
    sizes.width / sizes.height,
);

camera.position.z = 2;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
});
renderer.setSize(sizes.width , sizes.height);

window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width , sizes.height);//Changes the size of the WebGL canvas.
})
const orbit = new OrbitControls(camera,canvas);
let redious = 5 ;
let speed = 2;

const earthorbit = new THREE.Object3D();
scene.add(earthorbit);
earthorbit.add(earth);

earth.position.set(10,0,0);
moon.position.set(3,0,0);
const moonOrbit = new THREE.Object3D();
moonOrbit.add(moon);
earth.add(moonOrbit);

let clock = new THREE.Clock();

function animation(){

    orbit.update();
    let elapsedTime = clock.getElapsedTime();
    sun.rotation.x +=0.01;
    earthorbit.rotation.y +=0.001;
    earth.rotation.y += 0.01;
 
    moonOrbit.rotation.y +=0.001;
    moon.rotation.y += 0.02;

    requestAnimationFrame(animation);
    renderer.render(scene,camera)
}
animation();