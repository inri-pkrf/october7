import React from "react";

export const CANDLE_IMAGE =
  "https://media.base44.com/images/public/6ab370144e481c08e9aebeb4/daabcd2a5_Group41.png";

// נר נשמה — התמונה שסופקה, נייח ללא הבהוב;
// הגודל והשקיפות נקבעים רנדומלית בעת ההדלקה
export default function Candle({ width = 28 }) {
  return (
    <div style={{ width }}>
      <img
        src={CANDLE_IMAGE}
        alt="נר נשמה"
        className="h-auto w-full select-none"
        draggable={false}
      />
    </div>
  );
}