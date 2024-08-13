precision highp float;

varying vec2 vTexCoord;
uniform float uAspectRatio;

vec4 b = vec4(0.1, 0.1, 1.0, 1.0);

float cubicBezier(float t, vec4 p) {
    float oneMinusT = 1.0 - t;
    return oneMinusT * oneMinusT * oneMinusT * p.x +
           3.0 * oneMinusT * oneMinusT * t * p.y +
           3.0 * oneMinusT * t * t * p.z +
           t * t * t * p.w;
}

float circleContrib(vec2 coord, vec2 pos, float radius)
{
    float distance = length(coord - pos);
    float t = clamp(distance / radius, 0.0, 1.0);
    return 1.0 - cubicBezier(t, b);
}

void main() {
    float rad = 1.0;
    vec2 aspect = vec2(1.0, 1.0 / uAspectRatio);
    vec2 coord = (vTexCoord * 2.0 - 1.0) * aspect;
    float rc = circleContrib(coord, vec2(-0.3, 0.3), rad);
    float bc = circleContrib(coord, vec2(0.3, -0.3), rad);
    gl_FragColor = vec4(rc, 0.0, bc, 1.0);
}