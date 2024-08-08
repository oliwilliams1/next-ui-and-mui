"use client";

import { useEffect, useRef } from "react";

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (shader) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
  return null;
}

export default function Context() 
{
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const gl = canvas.getContext('webgl');
      if (gl) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, `
          attribute vec2 aPosition;
          attribute vec2 aTexCoord;
          varying vec2 vTexCoord;

          void main() {
            gl_Position = vec4(aPosition, 0.0, 1.0);
            vTexCoord = aTexCoord;
          }
        `);
        
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, `
          precision highp float;
          varying vec2 vTexCoord;

          void main() {
            //float distanceToCenter = distance(vTexCoord, vec2(0.5, 0.5));
            gl_FragColor = vec4(vTexCoord, 0.0, 1.0);
          }
        `);

        // Check if shaders were created successfully
        if (vertexShader && fragmentShader) {
          // Create the WebGL program
          const program = gl.createProgram();
          if (program) {
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);

            // Set up the vertex data
            const vertices = new Float32Array([
              -1.0, 1.0, 0.0, 1.0,
              1.0, 1.0, 1.0, 1.0,
              1.0, -1.0, 1.0, 0.0,
              -1.0, -1.0, 0.0, 0.0
            ]);

            const vertexBuffer = gl.createBuffer();
            if (vertexBuffer) {
              gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

              const aPositionLocation = gl.getAttribLocation(program, 'aPosition');
              const aTexCoordLocation = gl.getAttribLocation(program, 'aTexCoord');

              gl.enableVertexAttribArray(aPositionLocation);
              gl.vertexAttribPointer(aPositionLocation, 2, gl.FLOAT, false, 16, 0);

              gl.enableVertexAttribArray(aTexCoordLocation);
              gl.vertexAttribPointer(aTexCoordLocation, 2, gl.FLOAT, false, 16, 8);

              // Render the UV grid
              gl.clearColor(0.0, 0.0, 0.0, 1.0);
              gl.clear(gl.COLOR_BUFFER_BIT);
              gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
            }
          }
        }
      }
    }
  }, []);

  return (
    <div className="display:block">
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  )
}