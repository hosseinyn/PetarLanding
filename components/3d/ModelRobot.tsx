"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import type { Mesh, MeshStandardMaterial, Object3D } from "three";
import { COLORS } from "@/lib/3d-config";
import { MODEL_URLS, ensureDracoDecoder } from "@/lib/3d-models";

const TARGET_HEIGHT = 2.1;

function paintPurple(root: Object3D): void {
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
    if (mat.name === "Black") {
      mat.color.set("#2E1065");
    } else {
      mat.color.set(COLORS.purple);
    }
    mat.roughness = 0.55;
    mat.metalness = 0.05;
    mesh.material = mat;
  });
}

export default function ModelRobot() {
  const { scene } = useGLTF(MODEL_URLS.robot, true);

  useEffect(() => {
    ensureDracoDecoder();
  }, []);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    paintPurple(clone);
    return clone;
  }, [scene]);

  useEffect(() => {
    return () => {
      model.traverse((o: Object3D) => {
        const mesh = o as Mesh;
        if (mesh.isMesh !== true) {
          return;
        }
        const mat = mesh.material as MeshStandardMaterial | MeshStandardMaterial[];
        if (Array.isArray(mat)) {
          for (const m of mat) {
            m.dispose();
          }
        } else if (mat !== undefined && mat !== null) {
          mat.dispose();
        }
      });
    };
  }, [model]);

  const fit = useMemo(() => {
    const box = new Box3().setFromObject(model);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const s = TARGET_HEIGHT / Math.max(size.x, size.y, size.z);
    return {
      s,
      ox: -center.x * s,
      oy: -box.min.y * s,
      oz: -center.z * s,
    };
  }, [model]);

  return (
    <group scale={fit.s} position={[fit.ox, fit.oy, fit.oz]}>
      <primitive object={model} />
    </group>
  );
}
