import React from "react";
import { Maximize, Minimize } from "lucide-react";
import { useLocation } from "react-router-dom";
import TitleBlock from "./TitleBlock";

const LOGO_URL =
  "https://media.base44.com/images/public/6ab370144e481c08e9aebeb4/11fe8b10d_inri-logo-white21.svg";

// סרגל עליון — Fullscreen בפינה השמאלית העליונה, לוגו מימין;
// בתצוגה המתחלפת קבוצת הכותרות יורדת אל מעל הכרטיסיות (מוצגת מתוך המסך עצמו)
export default function TopBar({ isFullscreen, onToggleFullscreen }) {
  const isHome = useLocation().pathname === "/";

  return (
    <div className="fixed top-0 inset-x-0 z-30 pointer-events-none">
      {/* כפתור מסך מלא — 48x48, 15px מהקצוות, שקיפות 60% */}
      <button
        onClick={onToggleFullscreen}
        className="pointer-events-auto absolute flex h-12 w-12 items-center justify-center rounded-full border border-[#E5A93C]/40 bg-black/60 text-[#E5A93C] opacity-60"
        style={{ top: 15, left: 15 }}
        aria-label="מסך מלא"
      >
        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
      </button>

      {!isHome && (
        <div className="absolute left-1/2 top-24 -translate-x-1/2">
          <TitleBlock />
        </div>
      )}

      <img
        src={LOGO_URL}
        alt="לוגו"
        className="pointer-events-auto absolute right-5 top-5 h-16 w-auto md:h-20"
      />
    </div>
  );
}