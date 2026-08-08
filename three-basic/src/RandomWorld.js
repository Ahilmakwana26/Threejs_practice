// * Floating Cube */

import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const canvas = document.querySelector('.webgl');

let cubes = [];

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

for(let i = 0 ; i<=30;i++){
    let X = Math.floor(Math.random() * 16 - 5);
    let Y = Math.floor(Math.random() * 16 - 5);
    let Z = Math.floor(Math.random() * 16 - 5);
    const randomColor = new THREE.Color();
    randomColor.setHex(Math.random() * 0xffffff);

   let cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({color:randomColor})
    )
    // cube.position.x = Math.random() * 10 - 5;
    // cube.position.y = Math.random() * 10 - 5;
    cube.position.set(X,Y,Z);
    //cube.scale.set(X,Y);
    cube.userData.rotationSpeed = Math.random() * 2 + 0.5;
    scene.add(cube)
    cubes.push(cube);
}

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
   
    let speed = Math.floor(Math.random() * 2);
    cubes.forEach((cube,index)=>{
        cube.rotation.x = elapsedTime * cube.userData.rotationSpeed;
    })

    renderer.render(scene,camera);
    requestAnimationFrame(animation);
}

animation();
