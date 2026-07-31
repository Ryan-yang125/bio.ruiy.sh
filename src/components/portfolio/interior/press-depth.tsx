"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type PressOrigin = { x: number; y: number };

type UsePressDepthOptions = {
  disabled?: boolean;
};

type UsePressDepthResult = {
  pressed: boolean;
  origin: PressOrigin | null;
  ref: (node: HTMLElement | null) => void;
  bind: {
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
    onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => void;
    onBlur: () => void;
  };
};

/**
 * Adapted from ddoemonn/interior's PressDepth hook.
 * The hook owns press recovery; the project card owns the visual language.
 */
export function usePressDepth(
  options: UsePressDepthOptions = {},
): UsePressDepthResult {
  const { disabled = false } = options;
  const [pressed, setPressed] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [origin, setOrigin] = useState<PressOrigin | null>(null);

  const node = useRef<HTMLElement | null>(null);
  const pointer = useRef<number | null>(null);
  const down = useRef(false);

  const setDown = useCallback((next: boolean) => {
    if (down.current === next) return;
    down.current = next;
    setPressed(next);
  }, []);

  const stop = useCallback(() => {
    pointer.current = null;
    setTracking(false);
    setOrigin(null);
    setDown(false);
  }, [setDown]);

  useEffect(() => {
    if (!tracking) return;

    const contains = (event: PointerEvent) => {
      const element = node.current;
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );
    };

    const move = (event: PointerEvent) => {
      if (event.pointerId !== pointer.current) return;
      setDown(contains(event));
    };
    const lift = (event: PointerEvent) => {
      if (event.pointerId !== pointer.current) return;
      stop();
    };
    const cancel = () => stop();
    const hidden = () => {
      if (document.hidden) stop();
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", lift);
    window.addEventListener("pointercancel", lift);
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", hidden);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", lift);
      window.removeEventListener("pointercancel", lift);
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, [setDown, stop, tracking]);

  const ref = useCallback((next: HTMLElement | null) => {
    node.current = next;
  }, []);

  return {
    pressed,
    origin,
    ref,
    bind: {
      onPointerDown: (event) => {
        if (disabled) return;
        if (event.pointerType === "mouse" && event.button !== 0) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setOrigin({
          x: Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1)),
          y: Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1)),
        });
        pointer.current = event.pointerId;
        setTracking(true);
        setDown(true);
      },
      onKeyDown: (event) => {
        if (disabled || event.repeat) return;
        if (event.key === " " || event.key === "Enter") setDown(true);
      },
      onKeyUp: (event) => {
        if (event.key === " " || event.key === "Enter" || event.key === "Escape") {
          setDown(false);
        }
      },
      onBlur: stop,
    },
  };
}
