// * Build House Cube */

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

const plane1 = new THREE.Mesh(
     new THREE.BoxGeometry(1,0.1,1
    ),
    new THREE.MeshBasicMaterial({color:0x8080})
);
plane1.position.set(1,1,0);
plane1.rotation.z = THREE.MathUtils.degToRad(50);// top left
plane1.scale.set(2,0.2,2)


const plane2 = new THREE.Mesh(
     new THREE.BoxGeometry(1,0.1,  
    ),
    new THREE.MeshBasicMaterial({color:0xfffff})
);
plane2.position.set(0.35,-0.8,0);
plane2.scale.set(2,0.1,2)
plane2.rotation.z = THREE.MathUtils.degToRad(90); 

const plane3 = new THREE.Mesh(
     new THREE.BoxGeometry(1,0.1,1  
    ),
    new THREE.MeshBasicMaterial({color:0x808080})
);
plane3.position.set(1.7,0.21,0);
plane3.scale.set(2.7,0.2,2)


const plane4 = new THREE.Mesh(
     new THREE.BoxGeometry(1,0.1,1  
    ),
    new THREE.MeshBasicMaterial({color:0xf3728})
);
plane4.position.set(2.3,1,0);
plane4.rotation.z = THREE.MathUtils.degToRad(-50);//top right
plane4.scale.set(2,0.2,2)

const plane5 = new THREE.Mesh(
     new THREE.BoxGeometry(1,0.1,1  
    ),
    new THREE.MeshBasicMaterial({color:0xfff28})
);
plane5.position.set(3,-0.8,0);
plane5.scale.set(2,0.2,2)
plane5.rotation.z = THREE.MathUtils.degToRad(90);


const plane6 = plane2.clone();
plane6.scale.set(3,0.2,2)
plane6.position.set(1.6,-1.8,0);
plane6.rotation.z = THREE.MathUtils.degToRad(180)


scene.add(plane1,plane2,plane3,plane4,plane5,plane6);

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
    // cube.rotation.x = elapsedTime;
    // cube.rotation.y = elapsedTime * 1.5;

    // cube.position.y = Math.sin(elapsedTime) * 0.5;
    // cube.position.x = Math.cos(elapsedTime) * 3;
    renderer.render(scene,camera);
    requestAnimationFrame(animation);
}

animation();
