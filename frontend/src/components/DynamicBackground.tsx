import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  text?: string;
  alpha: number;
}

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(true);

  // Monitor document.documentElement class list for dark mode changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme(); // Initial check

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Code snippets / syntax keywords to float in dark mode
    const codeKeywords = [
      'const', 'await', 'import', 'export', 'function', 'class', '=>',
      'interface', 'return', 'async', 'promise', 'git commit', 'npm run',
      'docker up', 'Vite', 'React', 'Django', 'Postgres', 'Redis', 'AWS'
    ];

    let particles: Particle[] = [];
    const maxParticles = 65;

    const createParticle = (initRandom = false): Particle => {
      const size = Math.random() * 2 + 1;
      const isText = Math.random() > 0.85;
      return {
        x: Math.random() * width,
        y: initRandom ? Math.random() * height : height + 20,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.5 + 0.1), // Float upwards slowly
        size: isText ? Math.random() * 4 + 10 : size,
        color: '',
        text: isText ? codeKeywords[Math.floor(Math.random() * codeKeywords.length)] : undefined,
        alpha: Math.random() * 0.5 + 0.1,
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // ── THEME COLORS SWITCH ──
      // Dark Mode Palette: Cyber terminal (Neon Greens, Glowing Cyans, Deep Purples)
      // Light Mode Palette: Warm editorial (Warm Amber, Peach, Lavender, Soft Lilac)
      const particleColors = isDark
        ? ['#3fb950', '#58e6d9', '#7c3aed', '#a78bfa'] // green, cyan, violet, light violet
        : ['#4f46e5', '#7c71f8', '#d97706', '#0891b2']; // indigo, light indigo, amber, cyan

      // Set canvas composition
      ctx.globalCompositeOperation = 'source-over';

      // 1. Draw large blurry gradient blobs in background (combining CSS blur feel + Canvas speed)
      if (isDark) {
        // Blob 1 - Deep violet top right
        const grad1 = ctx.createRadialGradient(width * 0.8, height * 0.2, 0, width * 0.8, height * 0.2, Math.max(width, height) * 0.35);
        grad1.addColorStop(0, 'rgba(124, 58, 237, 0.12)');
        grad1.addColorStop(1, 'rgba(8, 10, 15, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        // Blob 2 - Cyan bottom left
        const grad2 = ctx.createRadialGradient(width * 0.2, height * 0.8, 0, width * 0.2, height * 0.8, Math.max(width, height) * 0.35);
        grad2.addColorStop(0, 'rgba(88, 230, 217, 0.08)');
        grad2.addColorStop(1, 'rgba(8, 10, 15, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Light theme blobs - warm amber & lavender
        // Blob 1 - Warm Amber top right
        const grad1 = ctx.createRadialGradient(width * 0.8, height * 0.15, 0, width * 0.8, height * 0.15, Math.max(width, height) * 0.4);
        grad1.addColorStop(0, 'rgba(217, 119, 6, 0.06)');
        grad1.addColorStop(1, 'rgba(250, 249, 247, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        // Blob 2 - Lilac bottom left
        const grad2 = ctx.createRadialGradient(width * 0.15, height * 0.8, 0, width * 0.15, height * 0.8, Math.max(width, height) * 0.4);
        grad2.addColorStop(0, 'rgba(79, 70, 229, 0.06)');
        grad2.addColorStop(1, 'rgba(250, 249, 247, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Draw & animate particles/floating code snippets
      particles.forEach((p, idx) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // If particle moves off-screen, reset to bottom
        if (p.y < -30 || p.x < -30 || p.x > width + 30) {
          particles[idx] = createParticle(false);
          return;
        }

        // Apply theme color
        if (!p.color) {
          p.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.text) {
          // Draw floating code text
          ctx.fillStyle = p.color;
          ctx.font = `500 ${p.size}px 'JetBrains Mono', monospace`;
          ctx.fillText(p.text, p.x, p.y);
        } else {
          // Draw circular particle node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = isDark ? 10 : 0;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
        ctx.restore();
      });

      // 3. Constellation web connecting close particles (only in Dark mode for dynamic cyber theme)
      if (isDark) {
        ctx.save();
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            // Don't connect text blocks, only connect normal dots
            if (p1.text || p2.text) continue;

            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            const maxDist = 120;

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.12;
              ctx.strokeStyle = `rgba(88, 230, 217, ${alpha})`; // Electric Cyan webs
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[-2] transition-all duration-500"
        style={{
          background: 'var(--bg-base)',
        }}
      />
      {/* Color Gradient Filter Overlay Layer */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-[-1] transition-all duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.2) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(88, 230, 217, 0.12) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle at 80% 20%, rgba(217, 119, 6, 0.08) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.08) 0%, transparent 60%)',
        }}
      />
    </>
  );
}
