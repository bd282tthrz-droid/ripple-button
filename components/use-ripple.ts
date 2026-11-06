import { useCallback, useRef, useState } from "react";

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

const useRipple = () => {
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const nextIdRef = useRef(0);

  const addRipple = useCallback((x: number, y: number, size: number) => {
    const id = nextIdRef.current;
    nextIdRef.current += 1;
    setRipples((prev) => [...prev, { id, x, y, size }]);
  }, []);

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
  }, []);

  return { ripples, addRipple, removeRipple } as const;
};

export default useRipple;