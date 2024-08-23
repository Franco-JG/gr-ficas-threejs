import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(1,1,1)
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper); //! Ejes

// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear una geometría de triángulo utilizando BufferGeometry
const geometry = new THREE.BufferGeometry();
console.log(geometry);

// Definir los vértices del triángulo
const vertices = new Float32Array([
    0, 1, 0,    // Vértice 1
   -1, -1, 0,   // Vértice 2
    1, -1, 0    // Vértice 3
]);

// Asignar los vértices a la geometría
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

// Crear una línea que conecta los vértices del triángulo
const material = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Color azul para los bordes
const triangleEdges = new THREE.LineLoop(geometry, material);
scene.add(triangleEdges);

// Opcional: Agregar controles de órbita para interactuar con la escena
const controls = new OrbitControls(camera, renderer.domElement);

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Actualizar los controles
    renderer.render(scene, camera);
}

// Iniciar la animación
animate();

// Ajustar el tamaño del renderizador cuando se cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
