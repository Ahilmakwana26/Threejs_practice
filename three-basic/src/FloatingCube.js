// * Floating Cube */

import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const canvas = document.querySelector('.webgl');

//const geometry = new THREE.BoxGeometry(1,1,1);
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
};

window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width , sizes.height);
})

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0xff0000})
);

scene.add(cube);

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height
);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
});
renderer.setSize(sizes.width , sizes.height);


const control = new OrbitControls(camera,canvas);
const clock = new THREE.Clock();
function animation(){
    let elapsedTime = clock.getElapsedTime();

    control.update();
    cube.rotation.x = elapsedTime;
    cube.rotation.y = elapsedTime * 1.5;

    cube.position.y = Math.sin(elapsedTime) * 0.5;
    cube.position.x = Math.cos(elapsedTime) * 3;
    renderer.render(scene,camera);
    requestAnimationFrame(animation);
}

animation();
