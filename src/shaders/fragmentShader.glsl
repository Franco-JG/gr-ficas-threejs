varying vec2 vUv;
    uniform sampler2D u_texture;
    void main() {
        vec4 texColor = texture2D(u_texture, vUv);
        gl_FragColor = texColor;
    }