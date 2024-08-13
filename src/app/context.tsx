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

interface ContextProps {
  width: string;
  height: string;
}

export default function Context({ width, height } : ContextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const gl = canvas.getContext('webgl');
      if (gl) {
        const fetchData = async () => {
          const vertexShaderResponse = await fetch('/vert.glsl');
          const vertSource = await vertexShaderResponse.text();

          const fragmentShaderResponse = await fetch('/frag.glsl');
          const fragSource = await fragmentShaderResponse.text();

          const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertSource);
          const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragSource);

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
        };
        fetchData();
      }
    }
  }, []);

  return (
    <div className="display:block">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  )
}