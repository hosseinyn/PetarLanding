"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import type { Mesh, MeshStandardMaterial, Object3D } from "three";
import { MODEL_URLS, ensureDracoDecoder } from "@/lib/3d-models";

const TARGET_WIDTH = 1.5;

function finish(root: Object3D): void {
  root.traverse((o: Object3D) => {
    const mesh = o as Mesh;
    if (mesh.isMesh !== true) {
      return;
    }
    const source = mesh.material as MeshStandardMaterial;
    if (source === undefined || source === null) {
      return;
    }
    const mat = source.clone() as MeshStandardMaterial;
    mat.roughness = 0.62;
    mat.metalness = 0.04;
    mesh.material = mat;
  });
}

export default function ModelQuranRealistic() {
  const { scene } = useGLTF(MODEL_URLS.quranRealistic, true);

  useEffect(() => {
    ensureDracoDecoder();
  }, []);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    finish(clone);
    return clone;
  }, [scene]);

  const fit = useMemo(() => {
    const box = new Box3().setFromObject(model);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const s = TARGET_WIDTH / Math.max(size.x, size.y, size.z);
    return {
      s,
      ox: -center.x * s,
      oy: -center.y * s,
      oz: -center.z * s,
    };
  }, [model]);

  return (
    <group scale={fit.s} position={[fit.ox, fit.oy, fit.oz]}>
      <primitive object={model} />
    </group>
  );
}
