"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function StatsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    void fetch("/api/stats/hit", {
      method: "POST",
      cache: "no-store",
    }).catch(() => {
      // Tracking hataları kullanıcı deneyimini etkilememeli.
    });
  }, [pathname]);

  return null;
}
