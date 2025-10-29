'use client'

import { useEffect, useRef } from "preact/hooks";
import gsap from "gsap";

export default function TardisFollower() {
  const tardisRef = useRef<SVGSVGElement>(null);
  const lastX = useRef(0);

  useEffect(() => {
    const tardis = tardisRef.current;
    if (!tardis) return;

    const width = 64;
    const height = 64;

    const onMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Déplacement aléatoire léger pour effet "drift"
      const driftX = (Math.random() - 0.5) * 20;
      const driftY = (Math.random() - 0.5) * 20;
      const x = mouseX - width / 2 + driftX;
      const y = mouseY - height / 2 + driftY;

      // Balancement : direction du mouvement
      const dx = mouseX - lastX.current;
      const rotation = dx * 0.3 + (Math.random() - 0.5) * 5; // rotation selon mouvement + léger aléatoire

      lastX.current = mouseX;

      gsap.to(tardis, {
        x,
        y,
        rotation,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <svg
      ref={tardisRef}
      viewBox="0 0 72 72"
      className="fixed pointer-events-none opacity-90 z-0" // z-10 pour passer derrière header/footer
      style={{
        width: "64px",
        height: "64px",
        filter: "drop-shadow(0 0 12px rgba(0, 255, 255, 0.6))",
        top: 0,
        left: 0,
        transform: "translate(0px, 0px)",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* SVG TARDIS inchangé */}
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
