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

// let top_bottom = 0;
// let left_right = 0;
// window.addEventListener('keydown',(e)=>{
//     let key = e.key;
//     if(key == 'w'){
//         top_bottom +=0.1;
//     }else if(key == 's'){
//         top_bottom -=0.1
//     }else if(key=='a'){
//         left_right -= 0.1;
//     }else{
//         left_right +=0.1;
//     }
// })

//Better Method
const keys = {};
window.addEventListener('keydown',(e)=>{
    keys[e.key.toLocaleLowerCase()] = true;
});
window.addEventListener('keyup',(e)=>{
    keys[e.key.toLocaleLowerCase()] = false;
});

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0xff0000})
);
scene.add(cube);
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.99999,
    100
);
camera.position.z = 5;
scene.add(camera);
const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
});
renderer.setSize(sizes.width , sizes.height);


const control = new OrbitControls(camera,canvas);
control.enablePan = false;
const clock = new THREE.Clock();
const speed = 0.1;
function animation(){

    if(keys['w']) cube.position.y +=speed;
    if(keys['s']) cube.position.y -=speed;
    if(keys['a']) cube.position.x -=speed;
    if(keys['d']) cube.position.x +=speed;
 
    control.update();
    renderer.render(scene,camera);
    requestAnimationFrame(animation);
}

animation();
