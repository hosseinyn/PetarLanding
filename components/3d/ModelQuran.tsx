"use client";

import { useEffect, useState } from "react";
import ModelBook from "@/components/3d/ModelBook";
import ModelQuranRealistic from "@/components/3d/ModelQuranRealistic";
import { MODEL_URLS, QURAN_VARIANT } from "@/lib/3d-models";

export default function ModelQuran() {
  const [realisticReady, setRealisticReady] = useState(false);

  useEffect(() => {
    if (QURAN_VARIANT !== 2) {
      return;
    }
    let live = true;
    fetch(MODEL_URLS.quranRealistic, { method: "HEAD" })
      .then((res) => {
        if (live && res.ok) {
          setRealisticReady(true);
        }
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, []);

  if (QURAN_VARIANT === 2 && realisticReady) {
    return <ModelQuranRealistic />;
  }
  return <ModelBook />;
}
