import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

// Main glass diamond — octahedron detail=1 gives 32 clearly-faceted triangular faces,
// reads as a precision gemstone. MeshTransmissionMaterial adds real volumetric refraction.
function GlassDiamond() {
  const ref = useRef<Mesh>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.13;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.28) * 0.2;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={ref} position={[1.5, 0, 0]} scale={1.9}>
        <octahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial
          thickness={1.4}
          roughness={0}
          transmission={1}
          ior={2.3}
          chromaticAberration={0.14}
          samples={6}
          resolution={256}
          color="#5ab8e8"
          attenuationColor="#a8e6ff"
          attenuationDistance={0.65}
        />
      </mesh>
    </Float>
  );
}

// Small accent gems — same material, much smaller, float freely around the main diamond
function AccentGem({
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
    ref.current.rotation.x += dt * speed * 0.6;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.9} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0}
          transmission={1}
          ior={1.9}
          chromaticAberration={0.07}
          samples={3}
          resolution={64}
          color="#7fd4ff"
          attenuationColor="#c4eaff"
          attenuationDistance={0.5}
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
        <ambientLight intensity={0.25} />
        <directionalLight position={[6, 5, 5]}  intensity={1.8} color="#a8e6ff" />
        <directionalLight position={[-6, -4, 2]} intensity={1.0} color="#7fd4ff" />
        <pointLight       position={[3, 2, 4]}   intensity={2.5} color="#ffffff" />

        <GlassDiamond />
        <AccentGem position={[-2.5, 2.0, -0.8]} scale={0.48} speed={0.35} />
        <AccentGem position={[ 4.2, -1.6, -0.5]} scale={0.32} speed={0.50} />
        <AccentGem position={[-1.8, -2.4, 0.6]}  scale={0.26} speed={0.42} />

        {/* Subtle sparkle field gives depth without clutter */}
        <Sparkles
          count={55}
          scale={9}
          size={0.9}
          speed={0.25}
          color="#7fd4ff"
          opacity={0.45}
        />

        <Environment preset="city" resolution={64} />
      </Suspense>
    </Canvas>
  );
}
