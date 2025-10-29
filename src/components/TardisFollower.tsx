import { useState, useEffect, useRef } from "preact/hooks";

export default function TardisFollower() {
  const tardisRef = useRef<SVGSVGElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const speed = 0.08; // 0.05 = très lent, 0.1 = fluide, 0.2 = réactif

  useEffect(() => {
    const tardis = tardisRef.current;
    if (!tardis) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = tardis.parentElement?.getBoundingClientRect();
      if (!rect) return;

      // Centre de la souris dans le conteneur
      mouseX.current = e.clientX - rect.left - tardis.clientWidth / 2;
      mouseY.current = e.clientY - rect.top - tardis.clientHeight / 2;
    };

    const updatePosition = () => {
      // Lissage exponentiel → "drift"
      currentX.current += (mouseX.current - currentX.current) * speed;
      currentY.current += (mouseY.current - currentY.current) * speed;

      tardis.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;

      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    updatePosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <svg
      ref={tardisRef}
      viewBox="0 0 72 72"
      className="absolute pointer-events-none opacity-85 transition-opacity duration-300"
      style={{
        width: '64px',
        height: '64px',
        filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.4))',
        top: 0,
        left: 0,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* === TARDIS SVG (identique) === */}
      <g id="color">
        <rect x="25" y="12" rx="1" width="21" height="5" fill="#1e50a0" />
        <rect x="23" y="16" rx="1" width="26" height="48" fill="#1e50a0" />
        <path fill="#fff" fillRule="evenodd" d="m38 9.6c0-0.8837-0.8954-1.6-2-1.6s-2 0.7163-2 1.6v2.4h4z" clipRule="evenodd" />
        <rect x="37" y="53" rx="1.125" ry="1.143" width="9" height="8" fill="#3f3f3f" fillOpacity="0.502" />
        <rect x="26" y="53" rx="1.125" ry="1.143" width="9" height="8" fill="#3f3f3f" fillOpacity="0.502" />
        <rect x="37" y="43" rx="1.125" ry="1.143" width="9" height="8" fill="#3f3f3f" fillOpacity="0.502" />
        <rect x="26" y="43" rx="1.125" ry="1.143" width="9" height="8" fill="#3f3f3f" fillOpacity="0.502" />
        <rect x="37" y="33" rx="1.125" ry="1.143" width="9" height="8" fill="#3f3f3f" fillOpacity="0.502" />
        <rect x="26" y="33" rx="1.125" ry="1.143" width="9" height="8" fill="#3f3f3f" fillOpacity="0.502" />
        <rect x="37" y="23" rx="1.125" ry="1.143" width="9" height="8" fill="#fff" />
        <rect x="26" y="23" rx="1.125" ry="1.143" width="9" height="8" fill="#fff" />
      </g>
      <g id="line">
        <rect x="26" y="18.5" rx="1" ry="1" width="20" height="3" />
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m38 54.01v5.986h6.986" />
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m27 54.01v5.986h6.986" />
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m38 44v6h7" />
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m27 44.01v5.986h6.986" />
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m38 34.01v5.986h6.986" />
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m27 34.01v5.986h6.986" />
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m38 24.01v5.986h6.986" />
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m27 24.01v5.986h6.986" />
        <rect x="23" y="16" rx="1" width="26" height="48" fill="none" stroke="#000" strokeWidth="2" />
        <path fill="none" stroke="#000" strokeWidth="2" d="m34 12v-2.4c0-0.8837 0.8954-1.6 2-1.6s2 0.7163 2 1.6v2.4" />
        <path fill="none" stroke="#000" strokeWidth="2" d="m25 16v-3c0-0.5523 0.4477-1 1-1h19c0.5523 0 1 0.4477 1 1v3" />
      </g>
    </svg>
  );
}