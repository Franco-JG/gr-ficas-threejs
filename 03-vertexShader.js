import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Crear la escena
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear una geometría de triángulo utilizando BufferGeometry
const geometry = new THREE.BufferGeometry();

// Definir los vértices del triángulo
const vertices = new Float32Array([
    0, 1, 0,    // Vértice 1
   -1, -1, 0,   // Vértice 2
    1, -1, 0,   // Vértice 3
]);

// Crear un BufferAttribute para los vértices
const positionAttribute = new THREE.BufferAttribute(vertices, 3);
geometry.setAttribute('position', positionAttribute);

// Definir un color sólido en el shader
const vertexShader = /*glsl*/`
    uniform float scale;
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position * scale, 1.0);
    }
`;

const fragmentShader = /*glsl*/`
    uniform vec3 color;
    void main() {
        gl_FragColor = vec4(color, 1.0); // Usar el color definido en el shader
    }
`;

const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        scale: { value: 1.0 }, // Escala inicial
        color: { value: new THREE.Color(0xa5d9ca) } // Color #a5d9ca
    }
});

// Crear el triángulo utilizando el material shader y la geometría
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Función de animación
let scaleDirection = 1;
function animate() {
    requestAnimationFrame(animate);

    // Escalamiento animación
    material.uniforms.scale.value += scaleDirection * 0.01;
    if (material.uniforms.scale.value > 1.0 || material.uniforms.scale.value < 0.5) {
        scaleDirection *= -1;  // Invertir dirección
    }

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
