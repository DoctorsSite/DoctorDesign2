import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Group, Mesh } from "three";

// 3D medical cross — two glass box bars forming a plus sign.
// Slow rotation reveals the depth of each bar and reads instantly as "medical".
function GlassCross() {
  const groupRef = useRef<Group>(null);
  useFrame((state, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.15;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.18;
  });

  const matProps = {
    thickness: 1.0,
    roughness: 0,
    transmission: 1 as const,
    ior: 1.55,
    chromaticAberration: 0.12,
    samples: 5,
    resolution: 256,
    color: "#7fd4ff",
    attenuationColor: "#a8e6ff",
    attenuationDistance: 0.9,
  };

  return (
    <Float speed={0.7} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={groupRef} position={[1.4, 0, 0]}>
        {/* Vertical bar */}
        <mesh>
          <boxGeometry args={[0.6, 2.4, 0.6]} />
          <MeshTransmissionMaterial {...matProps} />
        </mesh>
        {/* Horizontal bar */}
        <mesh>
          <boxGeometry args={[2.4, 0.6, 0.6]} />
          <MeshTransmissionMaterial {...matProps} />
        </mesh>
      </group>
    </Float>
  );
}

// Small floating glass spheres — represent cells / molecules orbiting the cross
function FloatingCell({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * speed;
    ref.current.rotation.x += dt * speed * 0.5;
  });
  return (
    <Float speed={1.3} rotationIntensity={0.8} floatIntensity={1.3}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          thickness={0.4}
          roughness={0}
          transmission={1}
          ior={1.45}
          chromaticAberration={0.05}
          samples={3}
          resolution={64}
          color="#a8e6ff"
          attenuationColor="#c4eaff"
          attenuationDistance={0.6}
        />
      </mesh>
    </Float>
  );
}

export function AnalysisScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.5], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.22} />
        <directionalLight position={[6, 5, 5]}  intensity={1.8} color="#a8e6ff" />
        <directionalLight position={[-6, -4, 2]} intensity={1.0} color="#7fd4ff" />
        <pointLight       position={[3, 2, 4]}   intensity={2.5} color="#ffffff" />

        <GlassCross />

        {/* Floating glass cell spheres around the cross */}
        <FloatingCell position={[-2.8,  2.0, -0.6]} scale={0.45} speed={0.28} />
        <FloatingCell position={[ 4.5, -1.4, -0.4]} scale={0.32} speed={0.38} />
        <FloatingCell position={[-1.6, -2.8,  0.8]} scale={0.28} speed={0.44} />

        <Sparkles
          count={50}
          scale={9}
          size={0.9}
          speed={0.25}
          color="#7fd4ff"
          opacity={0.4}
        />

        <Environment preset="city" resolution={64} />
      </Suspense>
    </Canvas>
  );
}
