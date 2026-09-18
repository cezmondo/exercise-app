"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    // Only register in production: in dev, `next dev` reissues assets with
    // new hashes on every restart, and a cached service worker from an
    // earlier run would serve stale JS and break the page.
    if (process.env.NODE_ENV !== "production") return;
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // offline support is a nice-to-have, ignore registration failures
      });
    }
  }, []);

  return null;
}
