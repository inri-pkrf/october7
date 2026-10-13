import React from "react";
import { cn } from "@/lib/utils";

// כרטיס מתהפך — חזית וגב, היפוך במגע
export default function FlipCard({ flipped, onFlip, front, back, className }) {
  return (
    <div className={cn("flip-card", className)} onClick={onFlip}>
      <div className={cn("flip-inner", flipped && "flipped")}>
        <div className="flip-face">{front}</div>
        <div className="flip-face flip-back">{back}</div>
      </div>
    </div>
  );
}