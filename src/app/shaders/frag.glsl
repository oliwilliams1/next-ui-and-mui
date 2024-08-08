precision highp float;
varying vec2 vTexCoord;

void main() {
    float dist = distance(vTexCoord, vec2(0.5, 0.5));
    float alpha = smoothstep(0.45, 0.55, dist);
    gl_FragColor = vec4(vTexCoord, 0.0, 1.0);
}