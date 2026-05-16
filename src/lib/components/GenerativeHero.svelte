<script>
  import { onMount } from 'svelte';

  /** Lightweight generative canvas — slow-drifting accent-colored particles
   *  with low density (~30 nodes) so it sits behind hero copy without competing. */

  let { density = 30 } = $props();

  let canvas;
  let raf;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);

    const nodes = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: (Math.random() * 1.2 + 0.4) * devicePixelRatio
    }));

    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }
    window.addEventListener('resize', resize);

    let paused = false;
    const onVis = () => {
      paused = document.hidden;
      if (!paused) loop();
    };
    document.addEventListener('visibilitychange', onVis);

    function loop() {
      if (paused) return;
      ctx.clearRect(0, 0, w, h);

      // Subtle radial glow from upper-left
      const grad = ctx.createRadialGradient(w * 0.2, h * 0.1, 0, w * 0.2, h * 0.1, w * 0.7);
      grad.addColorStop(0, 'rgba(74, 108, 247, 0.08)');
      grad.addColorStop(1, 'rgba(74, 108, 247, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const max = 180 * devicePixelRatio;
          if (dist < max) {
            ctx.strokeStyle = `rgba(74, 108, 247, ${0.18 * (1 - dist / max)})`;
            ctx.lineWidth = 0.5 * devicePixelRatio;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes themselves
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.fillStyle = 'rgba(232, 233, 237, 0.45)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  });
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.85;
  }

  @media (prefers-reduced-motion: reduce) {
    canvas { display: none; }
  }
</style>
