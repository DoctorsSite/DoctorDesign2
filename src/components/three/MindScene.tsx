import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

// A large glass capsule / pill — universally recognised medical symbol.
// CapsuleGeometry gives smooth hemispherical caps + a cylindrical body.
function GlassPill() {
  const ref = useRef<Mesh>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.z += dt * 0.10;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.25;
  });
  return (
    <Float speed={0.9} rotationIntensity={0.35} floatIntensity={0.8}>
      <mesh ref={ref} rotation={[0, 0, Math.PI / 5]} scale={1.7}>
        {/* radius, length, capSegments, radialSegments */}
        <capsuleGeometry args={[0.75, 2.0, 16, 48]} />
        <MeshTransmissionMaterial
          thickness={0.8}
          roughness={0}
          transmission={1}
          ior={1.55}
          chromaticAberration={0.10}
          samples={5}
          resolution={256}
          color="#7fd4ff"
          attenuationColor="#a8e6ff"
          attenuationDistance={1.0}
        />
      </mesh>
    </Float>
  );
}

// Smaller accent pills floating around the main one
function AccentPill({
  position,
  scale,
  tilt,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  tilt: [number, number, number];
  speed: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.z += dt * speed;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.7} floatIntensity={1.2}>
      <mesh ref={ref} position={position} rotation={tilt} scale={scale}>
        <capsuleGeometry args={[0.75, 2.0, 10, 32]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0}
          transmission={1}
          ior={1.48}
          chromaticAberration={0.06}
          samples={3}
          resolution={64}
          color="#a8e6ff"
          attenuationColor="#c4eaff"
          attenuationDistance={0.8}
        />
      </mesh>
    </Float>
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
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 4, 5]}  intensity={1.6} color="#a8e6ff" />
        <directionalLight position={[-5, -3, 2]} intensity={0.9} color="#7fd4ff" />
        <pointLight       position={[2, 2, 4]}   intensity={2.0} color="#ffffff" />

        <GlassPill />

        {/* Two smaller accent pills at different orientations */}
        <AccentPill
          position={[-2.8, 1.5, -0.8]}
          scale={0.38}
          tilt={[0.5, 0.3, 1.1]}
          speed={0.22}
        />
        <AccentPill
          position={[2.6, -1.8, -0.5]}
          scale={0.30}
          tilt={[0.2, -0.4, 0.6]}
          speed={0.30}
        />

        <Sparkles
          count={50}
          scale={7}
          size={0.8}
          speed={0.25}
          color="#7fd4ff"
          opacity={0.4}
        />

        <Environment preset="studio" resolution={64} />
      </Suspense>
    </Canvas>
  );
}
