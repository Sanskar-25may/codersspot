import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   DynamicBackground
   Renders a full-viewport looping animated layer behind all page content.
   • Dark  → Aurora Borealis mesh + drifting particle grid + scanline pulse
   • Light → Flowing gradient waves + floating soft blobs + geometric lattice
   Pure CSS animations — zero JS canvas, zero performance hit.
───────────────────────────────────────────────────────────────────────────── */

interface DynamicBackgroundProps {
  darkMode?: boolean;
}

// Generate deterministic "random" positions for particles
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: ((i * 137.508) % 100),           // golden-angle distribution
    y: ((i * 97.31 + 13) % 100),
    size: 1 + (i % 3),
    delay: (i * 0.3) % 8,
    duration: 4 + (i % 6),
    opacity: 0.15 + (i % 5) * 0.07,
  }));
}

const PARTICLES = generateParticles(48);

export default function DynamicBackground({ darkMode = true }: DynamicBackgroundProps) {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Parallax offset — orbs move at different rates
  const slowPar  = scrollY * 0.08;
  const midPar   = scrollY * 0.14;
  const fastPar  = scrollY * 0.22;

  return (
    <div
      aria-hidden="true"
      className="dynamic-bg-root"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {darkMode ? <DarkBackground slow={slowPar} mid={midPar} fast={fastPar} /> : <LightBackground slow={slowPar} mid={midPar} fast={fastPar} />}
    </div>
  );
}

/* ── DARK BACKGROUND ──────────────────────────────────────────────────────── */
function DarkBackground({ slow, mid, fast }: { slow: number; mid: number; fast: number }) {
  return (
    <>
      {/* Base: deep space gradient that slowly rotates hue */}
      <div className="db-base-dark" />

      {/* Layer 1: Aurora mesh — large slow colour blobs */}
      <div
        className="db-aurora-1"
        style={{ transform: `translateY(${slow}px)` }}
      />
      <div
        className="db-aurora-2"
        style={{ transform: `translateY(${-mid}px) translateX(${slow * 0.3}px)` }}
      />
      <div
        className="db-aurora-3"
        style={{ transform: `translateY(${fast * 0.5}px)` }}
      />

      {/* Layer 2: Particle field — tiny drifting dots */}
      <div className="db-particle-field">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="db-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              transform: `translateY(${-slow * (0.05 + p.id % 5 * 0.02)}px)`,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Horizontal scan line that sweeps vertically */}
      <div className="db-scanline" />

      {/* Layer 4: Dot grid overlay */}
      <div className="db-dot-grid-dark" />

      {/* Layer 5: Bottom vignette to fade into content */}
      <div className="db-vignette" />
    </>
  );
}

/* ── LIGHT BACKGROUND ─────────────────────────────────────────────────────── */
function LightBackground({ slow, mid, fast }: { slow: number; mid: number; fast: number }) {
  return (
    <>
      {/* Base: warm cream canvas */}
      <div className="db-base-light" />

      {/* Layer 1: Soft flowing gradient waves */}
      <div
        className="db-wave-1"
        style={{ transform: `translateY(${slow}px)` }}
      />
      <div
        className="db-wave-2"
        style={{ transform: `translateY(${-mid * 0.6}px) translateX(${slow * 0.2}px)` }}
      />
      <div
        className="db-wave-3"
        style={{ transform: `translateY(${fast * 0.3}px)` }}
      />

      {/* Layer 2: Floating geometric shapes */}
      <div className="db-geo-shapes">
        {[0,1,2,3,4,5].map((i) => (
          <div
            key={i}
            className={`db-geo db-geo-${i}`}
            style={{
              transform: `translateY(${-slow * (0.04 + i * 0.015)}px) rotate(${slow * 0.02 * (i % 2 === 0 ? 1 : -1)}deg)`,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Fine grid lattice */}
      <div className="db-lattice-light" />

      {/* Layer 4: Subtle vignette */}
      <div className="db-vignette-light" />
    </>
  );
}
