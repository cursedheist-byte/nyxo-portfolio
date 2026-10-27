import { useEffect, useRef } from 'react'

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rotation * p * 2.03;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  float scale = min(uResolution.x, uResolution.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / scale;
  vec2 mouse = (uMouse - 0.5 * uResolution) / scale;

  float t = uTime * 0.045;
  vec2 p = uv * 1.4;
  p += 0.34 * vec2(fbm(p + t), fbm(p - t + 5.2));
  p += 0.16 * mouse;

  float n1 = fbm(p * 1.3 + vec2(t * 1.6, -t));
  float n2 = fbm(p * 2.0 - vec2(t, t * 1.4) + n1 * 1.6);
  float band = smoothstep(0.18, 0.92, n2);

  vec3 violet = vec3(0.545, 0.361, 0.965);
  vec3 cyan = vec3(0.133, 0.827, 0.933);
  vec3 pink = vec3(0.957, 0.447, 0.714);

  vec3 color = mix(violet, cyan, smoothstep(0.28, 0.82, n1));
  color = mix(color, pink, smoothstep(0.58, 0.96, n2) * 0.55);

  float glow = pow(band, 2.4);
  vec3 base = vec3(0.019, 0.023, 0.039);
  color = base + color * glow * 0.5;

  color += vec3(0.32, 0.22, 0.62) * 0.035 * smoothstep(1.0, 0.0, uv.y + 0.75);

  float vignette = smoothstep(1.55, 0.3, length(uv));
  color *= 0.5 + 0.5 * vignette;

  float grain = hash(gl_FragCoord.xy * 0.7 + uTime) * 0.018;
  color += grain;

  gl_FragColor = vec4(color, 1.0);
}
`

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(message || 'Shader compile failed')
  }
  return shader
}

export default function AuroraBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    })

    let frame = 0
    let disposed = false
    let program = null
    let buffer = null
    let uniforms = {}
    let resizeObserver = null

    if (gl) {
      try {
        program = gl.createProgram()
        const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
        const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
        gl.attachShader(program, vertex)
        gl.attachShader(program, fragment)
        gl.linkProgram(program)

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(program) || 'Program link failed')
        }

        gl.useProgram(program)

        buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 3, -1, -1, 3]),
          gl.STATIC_DRAW,
        )

        const position = gl.getAttribLocation(program, 'aPosition')
        gl.enableVertexAttribArray(position)
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

        uniforms = {
          resolution: gl.getUniformLocation(program, 'uResolution'),
          time: gl.getUniformLocation(program, 'uTime'),
          mouse: gl.getUniformLocation(program, 'uMouse'),
        }
      } catch (error) {
        console.warn('NYXO: WebGL background unavailable.', error)
        program = null
        canvas.dataset.fallback = 'true'
        // A failed WebGL canvas composites as an opaque layer on some GPUs;
        // drop it so the CSS aurora stays visible.
        canvas.style.display = 'none'
      }
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }
    const target = { x: pointer.x, y: pointer.y }
    let start = performance.now()

    function resize() {
      if (!gl) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
      const width = Math.floor(window.innerWidth * dpr)
      const height = Math.floor(window.innerHeight * dpr)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      gl.viewport(0, 0, width, height)
      if (uniforms.resolution) gl.uniform2f(uniforms.resolution, width, height)
    }

    function draw(now) {
      if (!gl || !program || disposed) return
      gl.clear(gl.COLOR_BUFFER_BIT)
      pointer.x += (target.x - pointer.x) * 0.045
      pointer.y += (target.y - pointer.y) * 0.045
      const elapsed = reduceMotion ? 12 : (now - start) / 1000
      if (uniforms.time) gl.uniform1f(uniforms.time, elapsed)
      if (uniforms.mouse) {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
        gl.uniform2f(
          uniforms.mouse,
          pointer.x * dpr,
          (window.innerHeight - pointer.y) * dpr,
        )
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (reduceMotion) return
      frame = requestAnimationFrame(draw)
    }

    function handlePointer(event) {
      target.x = event.clientX
      target.y = event.clientY
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(frame)
      } else if (!reduceMotion) {
        start = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }

    if (gl) {
      resize()
      gl.clearColor(0.019, 0.023, 0.039, 1)
      frame = requestAnimationFrame(draw)

      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(document.documentElement)
      window.addEventListener('pointermove', handlePointer, { passive: true })
      document.addEventListener('visibilitychange', handleVisibility)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      window.removeEventListener('pointermove', handlePointer)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (gl) {
        if (buffer) gl.deleteBuffer(buffer)
        if (program) gl.deleteProgram(program)
      }
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full opacity-90" />
      <div className="aurora-fallback" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,transparent_20%,rgba(5,6,10,0.55)_70%,#05060a_100%)]" />
    </div>
  )
}
