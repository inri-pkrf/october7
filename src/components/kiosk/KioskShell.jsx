import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import CandleLayer from "./CandleLayer";

let candleSeq = 0;
const LIGHT_CANDLES_EVENT = "kiosk:light-candles";

// הפעלת הדלקת נרות הנשמה מכל מסך (הכפתור בתצוגה המתחלפת)
export const lightSoulCandles = () => window.dispatchEvent(new Event(LIGHT_CANDLES_EVENT));

// מסגרת העמדה — רקע, נרות נשמה, סרגלים וניהול מסך מלא
export default function KioskShell({ children }) {
  const [candles, setCandles] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen && document.exitFullscreen();
    } else {
      const el = document.documentElement;
      el.requestFullscreen && el.requestFullscreen().catch(() => {});
    }
  }, []);

  // ניסיון לעבור למסך מלא במגע הראשון (דפדפנים מחייבים פעולת משתמש)
  useEffect(() => {
    const enterOnFirstTouch = () => {
      if (!document.fullscreenElement) {
        const el = document.documentElement;
        el.requestFullscreen && el.requestFullscreen().catch(() => {});
      }
      window.removeEventListener("touchstart", enterOnFirstTouch);
      window.removeEventListener("click", enterOnFirstTouch);
    };
    window.addEventListener("touchstart", enterOnFirstTouch, { once: true });
    window.addEventListener("click", enterOnFirstTouch, { once: true });
    return () => {
      window.removeEventListener("touchstart", enterOnFirstTouch);
      window.removeEventListener("click", enterOnFirstTouch);
    };
  }, []);

  // הדלקת נרות — בכל לחיצה ובכל נר: גודל, שקיפות ומיקום רנדומליים לחלוטין
  useEffect(() => {
    const handler = () => {
      setCandles((prev) => {
        const count = 2 + Math.floor(Math.random() * 3); // 2-4 נרות בכל לחיצה
        const added = Array.from({ length: count }, () => ({
          id: ++candleSeq,
          x: 3 + Math.random() * 91,
          y: 8 + Math.random() * 78,
          opacity: [1, 0.8, 0.6, 0.4, 0.2][Math.floor(Math.random() * 5)], // שקיפות אקראית: 100/80/60/40/20
          width: Math.round(45 + Math.random() * 45), // רוחב 45-90px
          delay: Math.random() * 2,
        }));
        return [...prev, ...added];
      });
    };
    window.addEventListener(LIGHT_CANDLES_EVENT, handler);
    return () => window.removeEventListener(LIGHT_CANDLES_EVENT, handler);
  }, []);

  // אינרציה — אם לא נגעו במסך 5 דקות ואף סרטון לא מופעל, חזרה לתצוגה המתחלפת
  const navigate = useNavigate();
  const idleTimer = useRef(null);

  useEffect(() => {
    const resetIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        const videoPlaying = Array.from(
          document.querySelectorAll("video")
        ).some((v) => !v.paused && !v.ended);
        if (!videoPlaying) navigate("/");
      }, 5 * 60 * 1000);
    };

    resetIdle();
    window.addEventListener("touchstart", resetIdle, { passive: true });
    window.addEventListener("click", resetIdle);
    return () => {
      clearTimeout(idleTimer.current);
      window.removeEventListener("touchstart", resetIdle);
      window.removeEventListener("click", resetIdle);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#050505] text-[#f5f1e8] font-body" dir="rtl">
      <CandleLayer candles={candles} />
      <TopBar isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />
      <main className="relative z-10 h-full w-full">{children}</main>
      <BottomBar />
    </div>
  );
}