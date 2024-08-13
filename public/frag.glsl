precision highp float;
varying vec2 vTexCoord;

vec4 b = vec4(.1,.1,1.,1.);

float cubicBezier(float t, vec4 p) {
    float oneMinusT = 1.0 - t;
    return oneMinusT * oneMinusT * oneMinusT * p.x +
            3.0 * oneMinusT * oneMinusT * t * p.y +
            3.0 * oneMinusT * t * t * p.z +
            t * t * t * p.w;
}

void main() {
    float d = distance(vTexCoord, vec2(0.5, 0.5));
    float t = cubicBezier(d, b);
    t*=2.;
    float s = (1.0 - t) / 1.0;
    gl_FragColor = vec4(s, s, 0.0, 1.0);
}