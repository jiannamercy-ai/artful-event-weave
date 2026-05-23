import { motion } from "framer-motion";

export function GoldRule({ className = "", width = 48 }: { className?: string; width?: number }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ width, transformOrigin: "left" }}
      className={`block h-px bg-[var(--amber-gold)] ${className}`}
    />
  );
}
