import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Sparkles, RoundedBox } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

// Shared glass material props for both bars of the cross
const matProps = {
  thickness: 1.1,
  roughness: 0 as const,
  transmission: 1 as const,
  ior: 1.58,
  chromaticAberration: 0.13,
  samples: 6,
  resolution: 512,
  color: "#7fd4ff",
  attenuationColor: "#a8e6ff",
  attenuationDistance: 0.85,
};

// Medical cross — two RoundedBox bars (beveled edges) forming a plus sign.
// Slow Y rotation shows the depth of each bar, making it unambiguously 3D.
// A pulsing glow sphere at the intersection adds life.
function GlassCross() {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);

  useFrame((state, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.14;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.32) * 0.16;

    // Subtle breathing pulse on the whole cross
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.018;
    groupRef.current.scale.setScalar(pulse);

    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2.0) * 0.25;
    }
  });

  return (
    <Float speed={0.65} rotationIntensity={0.22} floatIntensity={0.6}>
      <group ref={groupRef} position={[1.3, 0, 0]}>
        {/* Vertical bar — beveled corners via RoundedBox */}
        <RoundedBox args={[0.52, 2.6, 0.52]} radius={0.09} smoothness={6}>
          <MeshTransmissionMaterial {...matProps} />
        </RoundedBox>

        {/* Horizontal bar */}
        <RoundedBox args={[2.6, 0.52, 0.52]} radius={0.09} smoothness={6}>
          <MeshTransmissionMaterial {...matProps} />
        </RoundedBox>

        {/* Glowing sphere at bar intersection */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial
            color="#a8e6ff"
            emissive="#7fd4ff"
            emissiveIntensity={0.6}
            transparent
            opacity={0.75}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Small glass spheres floating around the cross — cells / molecules
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
  });
  return (
    <Float speed={1.2} rotationIntensity={0.7} floatIntensity={1.2}>
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
        <ambientLight intensity={0.20} />
        <directionalLight position={[ 6,  5,  5]} intensity={2.0} color="#a8e6ff" />
        <directionalLight position={[-6, -4,  2]} intensity={1.2} color="#7fd4ff" />
        <pointLight       position={[ 3,  2,  4]} intensity={3.0} color="#ffffff" />

        <GlassCross />

        <FloatingCell position={[-2.8,  2.0, -0.7]} scale={0.42} speed={0.28} />
        <FloatingCell position={[ 4.6, -1.5, -0.4]} scale={0.30} speed={0.38} />
        <FloatingCell position={[-1.5, -2.9,  0.8]} scale={0.26} speed={0.44} />

        <Sparkles
          count={55}
          scale={9}
          size={0.85}
          speed={0.22}
          color="#7fd4ff"
          opacity={0.38}
        />

        <Environment preset="city" resolution={128} />
      </Suspense>
    </Canvas>
  );
}
