varying vec2 vUv;
uniform float scale;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position * scale, 1.0);
    }