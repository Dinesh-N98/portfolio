"use client";

import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

interface BadgeProps {
  label: string;
  percentage?: number;
  onClick?: () => void;
  pressed?: boolean;
  className?: string;
}

const badgeClassName = "rounded-full border px-2.5 py-1 text-xs";

export default function Badge({ label, percentage, onClick, pressed, className = "" }: BadgeProps) {
  const tooltipId = useId();
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties | null>(null);
  const badgeClasses = `${badgeClassName} ${className || "border-accent/30 text-accent"}`;

  useEffect(() => {
    if (!isTooltipVisible) {
      return;
    }

    const updateTooltipPosition = () => {
      const trigger = triggerRef.current;
      if (!trigger || typeof window === "undefined") return;

      const rect = trigger.getBoundingClientRect();
      const tooltipWidth = 170;
      const padding = 12;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const preferredLeft = rect.left + rect.width / 2;
      const clampedLeft = Math.min(Math.max(preferredLeft, tooltipWidth / 2 + padding), viewportWidth - tooltipWidth / 2 - padding);
      const top = Math.max(rect.top - 10, padding);

      setTooltipStyle({
        position: "fixed",
        left: `${clampedLeft}px`,
        top: `${top}px`,
        transform: "translate(-50%, -100%)",
        zIndex: 9999,
      });
    };

    updateTooltipPosition();
    window.addEventListener("resize", updateTooltipPosition);
    window.addEventListener("scroll", updateTooltipPosition, true);

    return () => {
      window.removeEventListener("resize", updateTooltipPosition);
      window.removeEventListener("scroll", updateTooltipPosition, true);
    };
  }, [isTooltipVisible]);

  const handleMouseEnter = () => setIsTooltipVisible(true);
  const handleMouseLeave = () => setIsTooltipVisible(false);
  const handleFocus = () => setIsTooltipVisible(true);
  const handleBlur = () => setIsTooltipVisible(false);

  if (percentage === undefined) {
    return <span className={badgeClasses}>{label}</span>;
  }

  const formattedPercentage = Math.round(percentage).toString();
  const badge = onClick ? (
    <button
      type="button"
      aria-pressed={pressed}
      aria-describedby={tooltipId}
      onClick={onClick}
      className={badgeClasses}
    >
      {label}
    </button>
  ) : (
    <span className={badgeClasses}>{label}</span>
  );

  return (
    <span
      ref={triggerRef}
      tabIndex={onClick ? undefined : 0}
      aria-describedby={onClick ? undefined : tooltipId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="group relative inline-flex z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {badge}
      {isTooltipVisible && typeof document !== "undefined" && createPortal(
        <span
          id={tooltipId}
          role="tooltip"
          style={tooltipStyle ?? undefined}
          className="pointer-events-none whitespace-nowrap rounded-md border border-white/15 bg-background px-3 py-2 text-xs text-foreground opacity-100 shadow-lg"
        >
          {formattedPercentage}% of repositories
        </span>,
        document.body,
      )}
    </span>
  );
}
