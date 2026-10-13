import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import KioskShell, { lightSoulCandles } from "@/components/kiosk/KioskShell";
import TitleBlock from "@/components/kiosk/TitleBlock";
import FlipCard from "@/components/kiosk/FlipCard";
import MemorialCardBack from "@/components/kiosk/MemorialCardBack";
import TapHintIcon from "@/components/kiosk/TapHintIcon";
import { Image } from "@/components/ui/image";
import { CANDLE_IMAGE } from "@/components/kiosk/Candle";
import { FALLEN } from "@/data/fallen";

const AUTO_ADVANCE_MS = 5000;
// מידות גלריה — פרוסות על המסך, מוגבלות גם בגובה
const CENTER_W = "min(640px, 44vw, calc((100vh - 400px) * 0.696))";
const SIDE_W = "min(460px, 25vw, calc((100vh - 430px) * 0.696))";

// מסך 1 — תצוגה מתחלפת: קבוצת הכותרות מעל הכרטיסיות בריווח זהה,
// הגלריה ממורכזת אנכית, והמעבר בין הכרטיסים חלק ומסונכרן עם כיוון ההחלפה
export default function Home() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef(null);

  const next = useCallback(() => {
    setDir(1);
    setIndex((i) => (i + 1) % FALLEN.length);
  }, []);
  const prev = useCallback(() => {
    setDir(-1);
    setIndex((i) => (i - 1 + FALLEN.length) % FALLEN.length);
  }, []);

  useEffect(() => {
    if (flipped) return undefined;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [flipped, next]);

  const fallen = FALLEN[index];
  const prevFallen = FALLEN[(index - 1 + FALLEN.length) % FALLEN.length];
  const nextFallen = FALLEN[(index + 1) % FALLEN.length];

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 70) {
      setFlipped(false);
      if (dx < 0) next();
      else prev();
    }
  };

  // מעבר חלק — קרוספייד עדין עם תזוזה קטנה לכיוון ההחלפה (הלאה מימין, אחורה משמאל)
  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
  };
  const transition = { duration: 0.7, ease: [0.33, 0, 0.2, 1] };

  return (
    <KioskShell>
      <div
        className="flex h-full w-full flex-col items-center px-4 pb-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
          {/* קבוצת הכותרות — מעל הכרטיסיות בריווח זהה לשורת השם */}
          <TitleBlock className="shrink-0" />

          <div className="flex items-center justify-center gap-4 md:gap-6">
            {/* תמונה צדדית קודמת — חלק מהגלריה, לחיצה מעבירה */}
            <button
              onClick={prev}
              className="hidden shrink-0 opacity-50 sm:block"
              aria-label="הכרטיס הקודם"
            >
              <div
                key={prevFallen.id}
                className="fade-in aspect-[32/46] overflow-hidden rounded-[24px] border border-[#3a3325] bg-[#0d0c0a]"
                style={{ width: SIDE_W }}
              >
                <Image
                  src={prevFallen.image}
                  alt={prevFallen.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </button>

            {/* תמונה מרכזית גדולה — המעבר חלק, הכרטיס היוצא והנכנס חופפים */}
            <div className="relative aspect-[32/46] shrink-0" style={{ width: CENTER_W }}>
              <AnimatePresence initial={false} custom={dir}>
                <motion.div
                  key={fallen.id}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transition}
                  className="absolute inset-0"
                >
                  <FlipCard
                    flipped={flipped}
                    onFlip={() => setFlipped((f) => !f)}
                    className="h-full w-full"
                    front={
                      <div className="gold-glow relative h-full w-full overflow-hidden rounded-[28px] bg-[#0d0c0a]">
                        <Image
                          src={fallen.image}
                          alt={fallen.name}
                          fittingType="fill"
                          className="h-full w-full object-cover"
                        />
                        <TapHintIcon className="absolute left-4 top-4 h-12 w-12 animate-pulse opacity-90" />
                      </div>
                    }
                    back={<MemorialCardBack fallen={fallen} />}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* תמונה צדדית הבאה — חלק מהגלריה, לחיצה מעבירה */}
            <button
              onClick={next}
              className="hidden shrink-0 opacity-50 sm:block"
              aria-label="הכרטיס הבא"
            >
              <div
                key={nextFallen.id}
                className="fade-in aspect-[32/46] overflow-hidden rounded-[24px] border border-[#3a3325] bg-[#0d0c0a]"
                style={{ width: SIDE_W }}
              >
                <Image
                  src={nextFallen.image}
                  alt={nextFallen.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </button>
          </div>

          {/* כיתוב הנופל — מתחת לכרטיס */}
          <p className="text-center font-body text-[15px] leading-[1.5] text-white md:text-[22px]">
            {fallen.name} · {fallen.fallDate}
          </p>

          {/* הדלקת נר נשמה — ברווח מתחת לשורת השם והתאריך */}
          <button
            onClick={lightSoulCandles}
            className="mt-6 flex select-none items-center gap-3 rounded-[30px] border border-black bg-[#1a1408] px-6 py-3 gold-glow md:px-8 md:py-4"
          >
            <span className="font-heading text-[22px] leading-none text-[#E5A93C] md:text-[28px]">
              הדלקת נר נשמה
            </span>
            <img
              src={CANDLE_IMAGE}
              alt="נר"
              className="h-9 w-9 object-contain md:h-11 md:w-11"
              draggable={false}
            />
          </button>
        </div>
      </div>
    </KioskShell>
  );
}