import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import type { Mesh } from "three";
import * as THREE from "three";

// Brain geometry: a sphere deformed with multi-frequency sine waves to simulate
// cerebral gyri (ridges) and sulci (grooves). No external model needed.
function usebrainGeo() {
  return useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 80, 80);
    const pos = geo.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const r = Math.sqrt(x * x + y * y + z * z);
      if (r === 0) continue;

      const theta = Math.acos(Math.max(-1, Math.min(1, y / r)));
      const phi = Math.atan2(z, x);

      // Seven harmonics at incommensurable frequencies — gives organic, non-repeating folds
      const fold =
        0.12 * Math.sin(theta * 5  + phi *  3) +
        0.08 * Math.cos(theta * 8  + phi *  5) +
        0.07 * Math.sin(theta * 4  - phi *  7) +
        0.05 * Math.cos(theta * 11 + phi *  4) +
        0.04 * Math.sin(theta * 7  + phi * 11) +
        0.03 * Math.cos(theta * 14 - phi *  6) +
        0.02 * Math.sin(theta * 17 + phi * 15);

      const nr = r + fold;
      // Brain proportions: wider L-R, flattened top-bottom, slightly narrower front-back
      pos.setXYZ(i,
        (x / r) * nr * 1.10,
        (y / r) * nr * 0.78,
        (z / r) * nr * 0.94,
      );
    }

    geo.computeVertexNormals();
    return geo;
  }, []);
}

function GlassBrain() {
  const ref = useRef<Mesh>(null);
  const brainGeo = usebrainGeo();

  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.11;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.28) * 0.12;
  });

  return (
    <Float speed={0.7} rotationIntensity={0.2} floatIntensity={0.65}>
      <mesh ref={ref} geometry={brainGeo} scale={1.85}>
        <MeshTransmissionMaterial
          thickness={1.4}
          roughness={0.04}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.11}
          samples={6}
          resolution={512}
          color="#7fd4ff"
          attenuationColor="#a8e6ff"
          attenuationDistance={0.85}
        />
      </mesh>
    </Float>
  );
}

export function MindScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.0], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.22} />
        <directionalLight position={[ 6,  5,  5]} intensity={2.0} color="#a8e6ff" />
        <directionalLight position={[-5, -3,  2]} intensity={1.0} color="#7fd4ff" />
        <pointLight       position={[ 2,  2,  4]} intensity={2.5} color="#ffffff" />

        <GlassBrain />

        <Sparkles
          count={60}
          scale={8}
          size={0.9}
          speed={0.22}
          color="#7fd4ff"
          opacity={0.4}
        />

        <Environment preset="city" resolution={128} />
      </Suspense>
    </Canvas>
  );
}
