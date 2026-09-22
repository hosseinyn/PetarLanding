"use client";

import { useEffect } from "react";

export default function ClarityProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    if (projectId === undefined || projectId === "") {
      return;
    }
    import("@microsoft/clarity")
      .then((m) => m.default.init(projectId))
      .catch(() => undefined);
  }, []);

  return null;
}
