//* Multiple Cubes  */


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

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0xff0000})
);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x00FF00 })
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x1E90FF })
)

const cube4 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x8A2BE2 })
)

const cube5 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0xFFD700 })
)

scene.add(cube1,cube2,cube3,cube4,cube5);

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

cube1.position.set(-5,0,0);//x, y, z
cube2.position.set(-3,1,0);
cube3.position.set(-1,0,0);
cube4.position.set(1,1,0);
cube5.position.set(3,0,0);

function animation(){
    let elapsedTime = clock.getElapsedTime();

    control.update();
    // cube1.rotation.x = elapsedTime;
     cube1.rotation.y = elapsedTime;
     cube2.rotation.y = elapsedTime * 1.3;
     cube3.rotation.y = elapsedTime * 1.5;
     cube4.rotation.y = elapsedTime * 2;
     cube5.rotation.y = elapsedTime * 2.5;

    //animation
    const radiusX = 2.9;
    const radiusY = 1.8;

    const gap = Math.PI / 2; // 90 degrees

    // cube1.position.x = Math.sin(elapsedTime) * radiusX;
    // cube1.position.y = Math.cos(elapsedTime) * radiusY;

    // cube2.position.x = Math.sin(elapsedTime + gap) * radiusX;
    // cube2.position.y = Math.cos(elapsedTime + gap) * radiusY;

    // cube3.position.x = Math.sin(elapsedTime + gap * 2) * radiusX;
    // cube3.position.y = Math.cos(elapsedTime + gap * 2) * radiusY;

    const cubes = [cube1,cube2,cube3,cube4,cube5];

    cubes.forEach((cube,index)=>{
        const angle = elapsedTime + index * ( Math.PI / cubes.length);

        cube.position.x = Math.sin(angle)  * radiusX;
        cube.position.y = Math.cos(angle)  * radiusY;
    });
    renderer.render(scene,camera);
    requestAnimationFrame(animation);
}

animation();
