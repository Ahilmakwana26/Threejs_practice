// * Floating Cube */

import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const canvas = document.querySelector('.webgl');

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

const colors_arr = [0xff0000,0xFFFF00,0x00FF00];
let cubes = [];
const red = new THREE.Mesh(
    new THREE.SphereGeometry(1,32,32),
    new THREE.MeshBasicMaterial({color:0x333333})
);
red.position.set(0,3,0);
const yellow = new THREE.Mesh(
    new THREE.SphereGeometry(1,32,32),
    new THREE.MeshBasicMaterial({color:0x333333  })
)
yellow.position.set(0,0.7,0);
const green = new THREE.Mesh(
    new THREE.SphereGeometry(1,32,32),
    new THREE.MeshBasicMaterial({color:0x333333})
)
green.position.set(0,-2,0);
scene.add(red,yellow,green);
cubes.push(red,yellow,green);

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

let active = 0;
let lastSecond = -1;

function animation(){
    let elapsedTime = clock.getElapsedTime();
    const currentSecond = Math.floor(elapsedTime);
    if(currentSecond !== lastSecond){
        lastSecond = currentSecond
        cubes.forEach((cube,index)=>{
            if(index === active){
                cube.material.color.setHex(colors_arr[index]);
            }else{
                cube.material.color.setHex(0x333333);
            }
        });
    active = (active + 1) % 3;
}

    control.update();
    renderer.render(scene,camera);
    requestAnimationFrame(animation);
}

animation();
