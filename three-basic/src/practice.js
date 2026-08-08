import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
const scene = new THREE.Scene();

const canves = document.querySelector('.webgl');

const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}
let cubes = [];
let cubes2 = [];
const group = new THREE.Group();
scene.add(group);

for(let i = 0 ; i<=9 ; i++){

     let X = Math.floor(Math.random() * 10 - 5);
    let Y = Math.floor(Math.random() * 10 - 5);
    let Z = Math.floor(Math.random() * 10 - 5);
    let randomColor = new THREE.Color();
    randomColor.setHex(Math.random() * 0xffffff);
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,2),
        new THREE.MeshBasicMaterial({color:randomColor})
    );
    group.add(cube);
    cubes.push(cube);
}
group.rotation.x = -Math.PI / 2;

///////////////////
const group2 = new THREE.Group();
scene.add(group2);
for(let i = 0 ; i<=9 ; i++){

    let X = Math.floor(Math.random() * 10 - 5);
    let Y = Math.floor(Math.random() * 10 - 5);
    let Z = Math.floor(Math.random() * 10 - 5);
    let randomColor = new THREE.Color();
    randomColor.setHex(Math.random() * 0xffffff);
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,2,1),
        new THREE.MeshBasicMaterial({color:randomColor})
    );
    group2.add(cube);
    cubes2.push(cube);
}
group2.rotation.x = Math.PI / 1;
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas:canves
});

window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width , sizes.height);
})
window.addEventListener('dblclick',()=>{
    if(!document.fullscreenElement){
        canves.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
})
const control = new OrbitControls(camera,canves);
control.enableDamping = true;
renderer.setSize(sizes.width ,sizes.height);
let clock = new THREE.Clock();
let radiusX = 2.9;
let radiusY = 2.9;

function animation (){
    let elapsedTime = clock.getElapsedTime();
    cubes.forEach((cube,index) => {
        let angle = elapsedTime + index * (Math.PI * 2 / cubes.length);
        cube.position.x = Math.sin(angle) * radiusX; 
        cube.position.y = Math.cos(angle) * radiusY;

    });
    // circle 2
     cubes2.forEach((cube,index) => {
        let angle = elapsedTime + index * (Math.PI * 2 / cubes.length);
        cube.position.x = - Math.sin(angle) * radiusX + 1.2; 
        cube.position.y = - Math.cos(angle) * radiusY + 1;

    });

    control.update();
    requestAnimationFrame(animation);
    renderer.render(scene,camera);
}
animation();