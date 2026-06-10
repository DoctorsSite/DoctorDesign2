import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

// One octahedral shell as clean edge lines — the building block of the diamond
function OctahedralShell({
  radius,
  opacity,
  rotSpeed,
  initRot = [0, 0, 0],
}: {
  radius: number;
  opacity: number;
  rotSpeed: [number, number, number];
  initRot?: [number, number, number];
}) {
  const ref = useRef<THREE.LineSegments>(null);
  const geo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(radius, 0)),
    [radius],
  );

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * rotSpeed[0];
    ref.current.rotation.y += dt * rotSpeed[1];
    ref.current.rotation.z += dt * rotSpeed[2];
  });

  return (
    <lineSegments ref={ref} rotation={new THREE.Euler(...initRot)} geometry={geo}>
      <lineBasicMaterial color="#7fd4ff" transparent opacity={opacity} />
    </lineSegments>
  );
}

// Pulsing core — a soft glowing sphere at the centre of the diamond
function GlowCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.45 + Math.sin(state.clock.elapsedTime * 2.2) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.28, 16, 16]} />
      <meshStandardMaterial
        color="#a8e6ff"
        emissive="#7fd4ff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.65}
      />
    </mesh>
  );
}

// Small floating node spheres orbiting the diamond — neural network accent
function NeuralNodes() {
  const groupRef = useRef<THREE.Group>(null);

  // Fixed positions (seeded manually so they never re-randomize)
  const positions = useMemo<[number, number, number][]>(
    () => [
      [3.2, 1.1, 0.4],   [-3.0, 0.8, -0.6],  [0.5, 3.3, -0.8],
      [0.3, -3.1, 0.9],  [2.5, -1.8, 1.2],   [-2.4, -1.6, -1.0],
      [1.8, 2.4, -1.5],  [-1.6, 2.2, 1.8],   [3.4, -0.5, -1.2],
      [-3.2, 0.2, 1.4],  [0.8, -2.8, -2.0],  [-0.6, 3.6, 0.5],
      [2.8, 1.5, -2.0],  [-2.6, -1.2, 2.2],  [1.2, -3.4, -0.4],
      [-1.0, 1.8, 3.2],
    ],
    [],
  );

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y -= dt * 0.06;
    groupRef.current.rotation.x += dt * 0.02;
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#cdeaff"
            emissive="#cdeaff"
            emissiveIntensity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

export function AnalysisScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.5], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.12} />
        <pointLight position={[5, 4, 5]}  intensity={3.5} color="#a8e6ff" />
        <pointLight position={[-5, -3, 3]} intensity={2.5} color="#7fd4ff" />
        <pointLight position={[0, 0, 4]}  intensity={1.0} color="#ffffff" />

        {/* Three concentric octahedral shells at different radii, speeds, and orientations.
            Each shell is 12 crisp edges — layering them gives unambiguous 3D diamond depth. */}
        <OctahedralShell
          radius={2.3}
          opacity={0.92}
          rotSpeed={[0.045, 0.18, 0.02]}
        />
        <OctahedralShell
          radius={1.55}
          opacity={0.55}
          rotSpeed={[-0.06, 0.11, 0.04]}
          initRot={[0.5, 0.3, 0]}
        />
        <OctahedralShell
          radius={0.9}
          opacity={0.32}
          rotSpeed={[0.08, -0.09, 0.06]}
          initRot={[1.0, 0.8, 0.3]}
        />

        <GlowCore />
        <NeuralNodes />
      </Suspense>
    </Canvas>
  );
}
