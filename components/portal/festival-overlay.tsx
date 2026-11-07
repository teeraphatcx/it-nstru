"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type FestivalThemeId,
  getFestivalThemeById,
  isFestivalThemeId,
} from "@/lib/festival-themes";

type Particle = {
  id: string;
  glyph: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
  drift: string;
};

function buildParticles(glyphs: string[], count: number): Particle[] {
  if (glyphs.length === 0) {
    return [];
  }

  const items: Particle[] = [];
  for (let index = 0; index < count; index += 1) {
    const glyph = glyphs.at(index % glyphs.length) ?? "✨";
    items.push({
      delay: `${(index % 12) * 0.35}s`,
      drift: `${((index % 9) - 4) * 12}px`,
      duration: `${8 + (index % 7)}s`,
      glyph,
      id: `fest-${index}-${glyph}`,
      left: `${(index * 17 + 8) % 100}%`,
      size: `${0.9 + (index % 5) * 0.22}rem`,
    });
  }
  return items;
}

export function FestivalOverlay({
  previewId,
  compact = false,
}: {
  previewId?: FestivalThemeId;
  compact?: boolean;
}) {
  const [themeId, setThemeId] = useState<FestivalThemeId>(previewId ?? "none");

  useEffect(() => {
    if (previewId) {
      setThemeId(previewId);
      return;
    }

    let cancelled = false;
    const loadTheme = async () => {
      try {
        const res = await fetch("/api/portal/settings");
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        if (!cancelled && isFestivalThemeId(data.festivalTheme)) {
          setThemeId(data.festivalTheme);
        }
      } catch {
        // Keep default theme when settings cannot be loaded
      }
    };

    loadTheme();
    return () => {
      cancelled = true;
    };
  }, [previewId]);

  const theme = getFestivalThemeById(themeId);
  const particles = useMemo(
    () => buildParticles(theme.particles, compact ? 12 : 28),
    [theme.particles, compact]
  );

  if (theme.id === "none") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${
        compact ? "absolute inset-0 rounded-xl" : "fixed inset-0 z-30"
      }`}
    >
      <div className="absolute inset-0" style={{ background: theme.tint }} />
      {particles.map((particle) => (
        <span
          className={`festival-particle festival-${theme.motion}`}
          key={particle.id}
          style={{
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            fontSize: particle.size,
            left: particle.left,
            marginLeft: particle.drift,
          }}
        >
          {particle.glyph}
        </span>
      ))}
    </div>
  );
}
