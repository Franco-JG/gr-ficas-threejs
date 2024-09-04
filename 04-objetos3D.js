import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from './src/shaders/vertexShader3D.glsl?raw';
import fragmentShader from './src/shaders/fragmentShader3D.glsl?raw';

// creamos la cámara
const fov = 100; // campo de vision
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


// Crear el material con los shaders
const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader
  });
  
// creamos la esfera y agregamos los materiales
const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
const sphere = new THREE.Mesh(sphereGeometry, shaderMaterial);

// Crear una matriz de transformación personalizada
const customMatrix = new THREE.Matrix4();

// Aplicar una rotación de 30 grados en el eje X
customMatrix.makeRotationX(THREE.MathUtils.degToRad(30)); // Convierte grados a radianes

// Multiplicar por una rotación de 45 grados en el eje Y
customMatrix.multiply(new THREE.Matrix4().makeRotationY(THREE.MathUtils.degToRad(45)));

// Multiplicar por una traslación de (2, 3, 1)
customMatrix.multiply(new THREE.Matrix4().makeTranslation(2, 2, 2));


sphere.matrix.copy(customMatrix);
sphere.matrixAutoUpdate = false; // desactivamos las actualizaciones automáticas para mantener la matriz

// agregamos la esfera a la escena
scene.add(sphere);

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