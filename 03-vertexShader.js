import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from './src/shaders/vertexShader.glsl?raw';
import fragmentShader from './src/shaders/fragmentShader.glsl?raw';

// Cargar la textura
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/image.jpg");

// Crear la escena
const scene = new THREE.Scene();
const axisHelper = new THREE.AxesHelper(3)
scene.add(axisHelper)

// 1. Crear la cámara de perspectiva
const fov = 75; // Campo de visión (en grados)
const aspect = window.innerWidth / window.innerHeight; // Relación de aspecto
const near = 0.1; // Plano cercano
const far = 1000; // Plano lejano
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;  // Centrando la cámara

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear una geometría de triángulo utilizando BufferGeometry
const geometry = new THREE.BufferGeometry();

// Definir los vértices del triángulo (ya son 2D)
const vertices = new Float32Array([
    0, 1,     // Vértice 1
   -1, -1,    // Vértice 2
    1, -1,    // Vértice 3
]);

// Definir las coordenadas UV para la textura
const uvs = new Float32Array([
    0.5, 1.0,  // Vértice 1
    0.0, 0.0,  // Vértice 2
    1.0, 0.0   // Vértice 3
]);

// Crear un BufferAttribute para los vértices
const positionAttribute = new THREE.BufferAttribute(vertices, 2);
geometry.setAttribute('position', positionAttribute);

// Crear un BufferAttribute para las coordenadas UV
const uvAttribute = new THREE.BufferAttribute(uvs, 2);
geometry.setAttribute('uv', uvAttribute);



// Crear el material shader
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        scale: { value: 1.0 }, // Escala inicial
        u_texture: { value: texture }
    }
});

// Crear el triángulo utilizando el material shader y la geometría
const mesh = new THREE.Mesh(geometry, material);
console.log(mesh.matrix)
console.log(mesh.matrixWorld)
scene.add(mesh);

// Opcional: Agregar controles de órbita para la cámara
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableZoom = true; // Habilitar zoom
// controls.enablePan = true;  // Habilitar desplazamiento (pan)

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    
    // controls.update();  // Actualizar los controles
    renderer.render(scene, camera);
}

// Iniciar la animación
animate();

// Ajustar el tamaño del renderizador cuando se cambia el tamaño de la ventana