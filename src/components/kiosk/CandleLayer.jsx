import React from "react";
import Candle from "./Candle";

// שכבת נרות נשמה ברקע — נרות במיקומים ושקיפויות אקראיים, אינה מסתירה תוכן
export default function CandleLayer({ candles }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {candles.map((c) => (
        <div
          key={c.id}
          className="absolute"
          style={{ left: `${c.x}%`, top: `${c.y}%`, opacity: c.opacity }}
        >
          <Candle width={c.width} delay={c.delay} />
        </div>
      ))}
    </div>
  );
}