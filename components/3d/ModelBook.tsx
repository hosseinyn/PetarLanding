"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { Mesh, MeshStandardMaterial, Object3D } from "three";
import { COLORS } from "@/lib/3d-config";
import { MODEL_URLS, ensureDracoDecoder } from "@/lib/3d-models";

function retint(root: Object3D): void {
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
    if (mat.name === "DarkRed") {
      mat.color.set(COLORS.sky);
    } else if (mat.name === "Golden") {
      mat.color.set(COLORS.yellow);
    } else {
      mat.color.set(COLORS.white);
    }
    mat.roughness = 0.6;
    mat.metalness = 0.05;
    mesh.material = mat;
  });
}

export default function ModelBook() {
  const { scene } = useGLTF(MODEL_URLS.book, true);

  useEffect(() => {
    ensureDracoDecoder();
  }, []);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    retint(clone);
    return clone;
  }, [scene]);

  return <primitive object={model} />;
}
