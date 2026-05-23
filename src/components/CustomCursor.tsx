import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("custom-cursor-active");
    setVisible(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [role=button], input, textarea, select, label"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const loop = () => {
      setTrail((t) => ({ x: t.x + (pos.x - t.x) * 0.18, y: t.y + (pos.y - t.y) * 0.18 }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pos, visible]);

  if (!visible) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[300] rounded-full transition-[width,height,background] duration-300"
        style={{
          left: pos.x,
          top: pos.y,
          width: hover ? 26 : 20,
          height: hover ? 26 : 20,
          transform: "translate(-50%, -50%)",
          border: "1px solid var(--amber-gold)",
          background: hover ? "var(--amber-gold)" : "transparent",
          mixBlendMode: "difference",
        }}
      />
      <div
        className="pointer-events-none fixed z-[299] rounded-full opacity-30"
        style={{
          left: trail.x,
          top: trail.y,
          width: 28,
          height: 28,
          transform: "translate(-50%, -50%)",
          border: "1px solid var(--amber-gold)",
        }}
      />
    </>
  );
}
