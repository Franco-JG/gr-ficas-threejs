import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const fov = 70; // campo de vision
const aspect = window.innerWidth / window.innerHeight; // relacion de aspecto
const near = 0.1; // plano cercano
const far = 1000; // plano lejano 
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10; 

// Crear la escena
const scene = new THREE.Scene();
const axes = new THREE.AxesHelper(5)   // ejes de referencia
scene.add(axes)

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Carga del HDRI
const loader = new RGBELoader();
loader.load('/sky.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});


const controls = new OrbitControls(camera, renderer.domElement);

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    
    // Rotar la cámara alrededor del eje Y
    // camera.position.x = Math.sin(Date.now() * 0.001) * 5;
    // camera.position.z = Math.cos(Date.now() * 0.001) * 5;

    controls.update();
    renderer.render(scene, camera);
}

// Iniciar la animación
animate();