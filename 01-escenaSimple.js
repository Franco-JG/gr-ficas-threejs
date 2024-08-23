import * as THREE from 'three'

//* Crear escena y cámara
const scene = new THREE.Scene()
// scene.background = new THREE.Color(0x859fc9)
console.log(scene.background);
console.log(new THREE.Color(0x859fc9));
const camera =  new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
camera.position.z = 5;

//* Crear el renderizador
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//* Creamos una figura
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00})
const cube = new THREE.Mesh(geometry,material);
scene.add(cube)


function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate()