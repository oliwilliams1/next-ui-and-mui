precision highp float;

varying vec2 vTexCoord;
uniform float uAspectRatio;

vec4 b = vec4(.1,.1,1.,1.);

float cubicBezier(float t, vec4 p) {
    float oneMinusT = 1.0 - t;
    return oneMinusT * oneMinusT * oneMinusT * p.x +
            3.0 * oneMinusT * oneMinusT * t * p.y +
            3.0 * oneMinusT * t * t * p.z +
            t * t * t * p.w;
}

void main() {
    // Adjust the coordinates based on the aspect ratio
    vec2 adjustedTexCoord = vec2(vTexCoord.x * uAspectRatio, vTexCoord.y);
    
    // Calculate the distance from the center of the first circle
    float d1 = distance(adjustedTexCoord, vec2(0.75 * uAspectRatio, 0.25));
    float t1 = cubicBezier(d1, b);
    t1 *= 2.0;
    float s1 = (1.0 - t1) / 1.0;
    
    // Calculate the distance from the center of the second circle
    float d2 = distance(adjustedTexCoord, vec2(0.25 * uAspectRatio, 0.75));
    float t2 = cubicBezier(d2, b);
    t2 *= 2.0;
    float s2 = (1.0 - t2) / 1.0;
    
    // Combine the two circles
    gl_FragColor = vec4(s1, 0.0, 0.0, 1.0) + vec4(0.0, 0.0, s2, 1.0);
}