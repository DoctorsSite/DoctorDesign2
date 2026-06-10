import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import type { Mesh, Group } from "three";
import * as THREE from "three";

// Central crystalline mind — a sharp-faceted icosahedron (20 flat triangular faces)
// Visually reads as a precision-cut gem, distinct from DC1's flowing torus knot
function CrystalMind() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.07;
    ref.current.rotation.y += dt * 0.13;
  });
  return (
    <Float speed={0.9} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={ref} scale={1.55}>
        {/* detail=0 → 20 flat faces, reads as a sharp gem crystal */}
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          thickness={0.55}
          roughness={0.02}
          transmission={1}
          ior={1.52}
          chromaticAberration={0.09}
          samples={4}
          resolution={128}
          color="#7fd4ff"
          attenuationColor="#a8e6ff"
          attenuationDistance={1.3}
        />
      </mesh>
    </Float>
  );
}

// A small orbiting gem (sharp octahedron) tracing an inclined orbital path
function OrbitingGem({
  radius, speed, phase, inclination, color, scale = 0.18,
}: {
  radius: number;
  speed: number;
  phase: number;
  inclination: number;
  color: string;
  scale?: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.y = Math.sin(t) * radius * Math.sin(inclination);
    ref.current.position.z = Math.sin(t) * radius * Math.cos(inclination);
    ref.current.rotation.x += 0.012;
    ref.current.rotation.y += 0.018;
  });
  return (
    <group ref={ref}>
      <mesh scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.08}
          metalness={0.25}
          emissive={color}
          emissiveIntensity={0.45}
        />
      </mesh>
    </group>
  );
}

// Faint orbital ring so the eye follows the path of each satellite
function OrbitalRing({
  radius, inclination, opacity = 0.12,
}: {
  radius: number;
  inclination: number;
  opacity?: number;
}) {
  const geom = useMemo(
    () => new THREE.TorusGeometry(radius, 0.003, 8, 140),
    [radius],
  );
  return (
    <mesh geometry={geom} rotation={[Math.PI / 2 - inclination, 0, 0]}>
      <meshBasicMaterial color="#7fd4ff" transparent opacity={opacity} />
    </mesh>
  );
}

export function MindScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 4, 5]}   intensity={1.5} color="#a8e6ff" />
        <directionalLight position={[-4, -3, 2]}  intensity={0.9} color="#7fd4ff" />
        <pointLight       position={[0, 0, 3.5]}  intensity={0.5} color="#ffffff" />

        <CrystalMind />

        {/* Four gem satellites on distinct orbital planes — evokes electrons around a nucleus */}
        <OrbitingGem radius={2.3} speed={0.42} phase={0}              inclination={Math.PI * 0.08} color="#7fd4ff" scale={0.22} />
        <OrbitingGem radius={2.0} speed={0.63} phase={Math.PI * 0.6}  inclination={Math.PI * 0.32} color="#a8e6ff" scale={0.17} />
        <OrbitingGem radius={2.6} speed={0.28} phase={Math.PI * 1.2}  inclination={Math.PI * 0.54} color="#82c8ff" scale={0.21} />
        <OrbitingGem radius={1.85} speed={0.78} phase={Math.PI * 1.8} inclination={Math.PI * 0.19} color="#c4eaff" scale={0.14} />

        {/* Faint orbital traces */}
        <OrbitalRing radius={2.3}  inclination={Math.PI * 0.08} opacity={0.14} />
        <OrbitalRing radius={2.0}  inclination={Math.PI * 0.32} opacity={0.10} />
        <OrbitalRing radius={2.6}  inclination={Math.PI * 0.54} opacity={0.08} />

        <Environment preset="studio" resolution={64} />
      </Suspense>
    </Canvas>
  );
}
