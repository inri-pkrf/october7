import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// כפתורי צד — מלבנים מעוגלים באותו רדיוס של הכרטיסיות, צרים,
// חציים מחוץ למסך כך שרואים רק את החצי הפנימי; הטקסט מרוכז בחלק הנראה
export default function BottomBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const inGrid = location.pathname === "/grid";
  const inBases = location.pathname === "/bases";

  const side =
    "absolute z-30 select-none bg-[#E5A93C] font-heading leading-none text-black gold-glow";

  const label =
    "absolute inset-y-0 flex w-12 flex-col items-center justify-center gap-1 text-[22px] md:text-[24px]";

  return (
    <>
      {/* צד ימין — תצוגה מלאה / תצוגה מתחלפת */}
      <button
        onClick={() => navigate(inGrid ? "/" : "/grid")}
        className={`${side} -right-12 top-3/4 h-40 w-24 -translate-y-1/2 rounded-l-[24px] md:h-44`}
      >
        <span className={`${label} left-0`}>
          <span className="block">תצוגה</span>
          <span className="block">{inGrid ? "מתחלפת" : "מלאה"}</span>
        </span>
      </button>

      {/* צד שמאל — סיפורי הבסיסים / תצוגה מתחלפת */}
      <button
        onClick={() => navigate(inBases ? "/" : "/bases")}
        className={`${side} -left-12 top-3/4 h-40 w-24 -translate-y-1/2 rounded-r-[24px] md:h-44`}
      >
        <span className={`${label} right-0`}>
          <span className="block">{inBases ? "תצוגה" : "סיפורי"}</span>
          <span className="block">{inBases ? "מתחלפת" : "הבסיסים"}</span>
        </span>
      </button>
    </>
  );
}