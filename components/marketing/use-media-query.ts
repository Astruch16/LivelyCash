"use client";

import { useEffect, useState } from "react";

/**
 * Matches a media query on the client, starting from `false` so the server and
 * the first client render agree. Callers should treat `false` as "not yet
 * known" and degrade to the simpler behaviour, which is what every use of this
 * hook does — parallax and the wider decoration layer are both enhancements.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);

    update();
    list.addEventListener("change", update);

    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}
