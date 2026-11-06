import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import useRipple from "./use-ripple";

interface AnimatedRippleProps {
  disabled?: boolean;
  duration?: number;
  pressedOpacity?: number;
  color?: string;
}

/* Material Design 3 standard easing curve (cubic-bezier 0.4, 0, 0.2, 1). */
const M3_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const AnimatedRipple = ({
  disabled = false,
  duration = 800,
  pressedOpacity = 0.35,
  color = "currentColor"
}: AnimatedRippleProps) => {
  const layerRef = useRef<HTMLSpanElement>(null);
  const { ripples, addRipple, removeRipple } = useRipple();

  useEffect(() => {
    const layer = layerRef.current;
    if (layer === null) return;
    const host = layer.parentElement;
    if (host === null) return;

    const spawnRippleAt = (clientX: number, clientY: number) => {
      const rect = layer.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = clientX - rect.left - size / 2;
      const y = clientY - rect.top - size / 2;
      addRipple(x, y, size);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (disabled || event.button !== 0) return;
      spawnRippleAt(event.clientX, event.clientY);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled || event.repeat) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      const rect = layer.getBoundingClientRect();
      spawnRippleAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
    };

    host.addEventListener("pointerdown", handlePointerDown);
    host.addEventListener("keydown", handleKeyDown);
    return () => {
      host.removeEventListener("pointerdown", handlePointerDown);
      host.removeEventListener("keydown", handleKeyDown);
    };
  }, [disabled, addRipple]);

  return (
    <span ref={layerRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: color
            }}
            initial={{ scale: 0, opacity: pressedOpacity }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration / 1000, ease: M3_EASE }}
            onAnimationComplete={() => removeRipple(ripple.id)}
          />
        ))}
      </AnimatePresence>
    </span>
  );
};

export default AnimatedRipple;