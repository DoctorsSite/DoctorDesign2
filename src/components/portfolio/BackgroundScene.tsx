import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Particles({ count = 4500, isDark }: { count?: number; isDark: boolean }) {
  const ref = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color(isDark ? "#7fd4ff" : "#3a7fb8");
    const c2 = new THREE.Color(isDark ? "#a8e6ff" : "#5a9bd4");
    const c3 = new THREE.Color(isDark ? "#ffffff" : "#2a5a8a");
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 14;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(p) * Math.cos(t);
      positions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      positions[i * 3 + 2] = r * Math.cos(p);
      const mix = Math.random();
      const col = mix < 0.5 ? c1 : mix < 0.85 ? c2 : c3;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, [count, isDark]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.01;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.2) * 0.3;
    // subtle mouse parallax via state.pointer
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;
    ref.current.rotation.z = mouse.current.x * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        sizeAttenuation
        vertexColors
        transparent
        opacity={isDark ? 0.85 : 0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingRings({ isDark }: { isDark: boolean }) {
  const g = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    g.current.rotation.x = Math.sin(t * 0.15) * 0.4;
    g.current.rotation.y = t * 0.05;
  });
  return (
    <group ref={g}>
      {[2.5, 3.4, 4.6].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, i * 0.4, 0]}>
          <torusGeometry args={[r, 0.004, 16, 200]} />
          <meshBasicMaterial color={isDark ? "#9fdcff" : "#4a8fc8"} transparent opacity={(isDark ? 0.25 : 0.18) - i * 0.05} />
        </mesh>
      ))}
    </group>
  );
}

export function BackgroundScene() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--bg-grad-from) 0%, var(--bg-grad-to) 70%)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.6]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color={isDark ? "#7fd4ff" : "#4a8fc8"} />
        <Particles isDark={isDark} />
        <FloatingRings isDark={isDark} />
      </Canvas>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--background) 50%, transparent) 0%, transparent 30%, transparent 70%, color-mix(in oklab, var(--background) 60%, transparent) 100%)",
        }}
      />
    </div>
  );
}