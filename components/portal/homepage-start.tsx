"use client";

import { useEffect } from "react";

export function HomepageStart() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.history.scrollRestoration = "manual";

    if (window.location.hash) {
      const { pathname, search } = window.location;
      window.history.replaceState(null, "", `${pathname}${search}`);
    }

    window.scrollTo({ behavior: "auto", left: 0, top: 0 });
  }, []);

  return null;
}
