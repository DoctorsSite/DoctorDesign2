import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import type { Group } from "three";
import * as THREE from "three";

// Shared glass properties — applied to every part so the whole
// stethoscope reads as one continuous glass sculpture
const G = {
  thickness: 1.0,
  roughness: 0 as const,
  transmission: 1 as const,
  ior: 1.56,
  chromaticAberration: 0.11,
  samples: 5,
  resolution: 256,
  color: "#7fd4ff",
  attenuationColor: "#a8e6ff",
  attenuationDistance: 0.95,
};

// Pre-build all tube geometries once (avoids recreation every render)
function useStethoGeo() {
  return useMemo(() => {
    const R = 0.072; // tube cross-section radius
    const SEG = 72;  // path segments
    const RAD = 14;  // radial segments

    // Single stem from top of chest piece → Y-split (slight forward bow for depth)
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3( 0,  -1.61,  0.00),
      new THREE.Vector3( 0,  -0.90,  0.13),
      new THREE.Vector3( 0,  -0.30,  0.09),
      new THREE.Vector3( 0,   0.00,  0.00),
    ]);

    // Left branch: Y-split → left earpiece (arcs up-left with a little Z depth)
    const leftCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3( 0.00,  0.00,  0.00),
      new THREE.Vector3(-0.48,  0.42,  0.16),
      new THREE.Vector3(-1.18,  0.90,  0.23),
      new THREE.Vector3(-1.80,  1.32,  0.18),
      new THREE.Vector3(-2.00,  1.70,  0.10),
    ]);

    // Right branch: mirror of left
    const rightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3( 0.00,  0.00,  0.00),
      new THREE.Vector3( 0.48,  0.42,  0.16),
      new THREE.Vector3( 1.18,  0.90,  0.23),
      new THREE.Vector3( 1.80,  1.32,  0.18),
      new THREE.Vector3( 2.00,  1.70,  0.10),
    ]);

    return {
      stem:  new THREE.TubeGeometry(stemCurve,  SEG, R, RAD, false),
      left:  new THREE.TubeGeometry(leftCurve,  SEG, R, RAD, false),
      right: new THREE.TubeGeometry(rightCurve, SEG, R, RAD, false),
    };
  }, []);
}

function Stethoscope() {
  const groupRef = useRef<Group>(null);
  const { stem, left, right } = useStethoGeo();

  useFrame((state, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.11;
    // Gentle nodding — ensures you always see depth even at slow rotation
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.28) * 0.10;
  });

  return (
    <Float speed={0.75} rotationIntensity={0.16} floatIntensity={0.65}>
      <group ref={groupRef}>

        {/* ── Chest piece ─────────────────────────────── */}
        {/* Main cylindrical body */}
        <mesh position={[0, -1.70, 0]}>
          <cylinderGeometry args={[0.85, 0.85, 0.18, 80]} />
          <MeshTransmissionMaterial {...G} />
        </mesh>

        {/* Outer bezel ring */}
        <mesh position={[0, -1.70, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.85, 0.09, 16, 80]} />
          <MeshTransmissionMaterial {...G} />
        </mesh>

        {/* Diaphragm membrane (inner recessed circle on the face) */}
        <mesh position={[0, -1.615, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.03, 64]} />
          <MeshTransmissionMaterial {...G} thickness={0.4} />
        </mesh>

        {/* ── Tubing ──────────────────────────────────── */}
        <mesh geometry={stem}>
          <MeshTransmissionMaterial {...G} />
        </mesh>
        <mesh geometry={left}>
          <MeshTransmissionMaterial {...G} />
        </mesh>
        <mesh geometry={right}>
          <MeshTransmissionMaterial {...G} />
        </mesh>

        {/* Y-split junction — hides the seam where stem meets branches */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.11, 20, 20]} />
          <MeshTransmissionMaterial {...G} />
        </mesh>

        {/* ── Earpieces ────────────────────────────────── */}
        <mesh position={[-2.00, 1.70, 0.10]}>
          <sphereGeometry args={[0.17, 24, 24]} />
          <MeshTransmissionMaterial {...G} />
        </mesh>
        <mesh position={[ 2.00, 1.70, 0.10]}>
          <sphereGeometry args={[0.17, 24, 24]} />
          <MeshTransmissionMaterial {...G} />
        </mesh>

      </group>
    </Float>
  );
}

export function MindScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.05, 7.8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.20} />
        <directionalLight position={[ 6,  5,  5]} intensity={2.2} color="#a8e6ff" />
        <directionalLight position={[-5, -3,  2]} intensity={1.1} color="#7fd4ff" />
        <pointLight       position={[ 2,  2,  5]} intensity={3.0} color="#ffffff" />
        {/* Back light to illuminate the glass from behind */}
        <pointLight       position={[ 0, -1, -4]} intensity={1.5} color="#7fd4ff" />

        <Stethoscope />

        <Sparkles
          count={55}
          scale={9}
          size={0.9}
          speed={0.20}
          color="#7fd4ff"
          opacity={0.38}
        />

        <Environment preset="city" resolution={128} />
      </Suspense>
    </Canvas>
  );
}
