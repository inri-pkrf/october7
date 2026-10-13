import React, { useState, useEffect, useRef } from "react";
import KioskShell from "@/components/kiosk/KioskShell";
import { BASES } from "@/data/bases";
import { Video, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// מסך 4 — סיפורי הבסיסים: כרטיסיות, וכרטיס גדול בגודל קבוע (הטקסט נכנס אליו);
// החצים במרכז הכרטיס עם הטקסט לצידם, עוברים בין קטעי הסיפור של אותו בסיס בלבד
export default function BaseStories() {
  const [activeId, setActiveId] = useState(BASES[0].id);
  const [segIndex, setSegIndex] = useState(0);
  const touchStartX = useRef(null);

  const base = BASES.find((b) => b.id === activeId);
  const segments = base.segments;
  const segCount = segments.length;

  useEffect(() => {
    setSegIndex(0);
  }, [activeId]);

  const nextSeg = () => setSegIndex((i) => Math.min(i + 1, segCount - 1));
  const prevSeg = () => setSegIndex((i) => Math.max(i - 1, 0));

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 70) {
      if (dx < 0) nextSeg();
      else prevSeg();
    }
  };

  const arrowBase =
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E5A93C]/60 text-[#E5A93C] select-none transition-opacity duration-300";

  return (
    <KioskShell>
      <div className="flex h-full w-full flex-col items-center px-4 pb-6 pt-[320px]">
        <div className="flex w-full flex-wrap items-center justify-center gap-4 md:gap-8">
          {BASES.map((b) => {
            const active = b.id === activeId;
            return (
              <button
                key={b.id}
                onClick={() => setActiveId(b.id)}
                className={cn(
                  "flex h-[55px] w-[min(180px,44vw)] select-none items-center justify-center border-b-[3px] px-2 transition-all duration-300",
                  active
                    ? "gold-glow border-[#E5A93C] font-heading text-[30px] font-bold text-[#E5A93C]"
                    : "border-transparent font-heading text-[26px] text-[#6f6552]"
                )}
              >
                {b.name}
              </button>
            );
          })}
        </div>

        <div
          key={base.id}
          className="fade-in gold-glow mt-6 flex h-[min(960px,calc(100vh-400px))] w-[min(960px,92vw)] flex-col rounded-[28px] border border-[#E5A93C]/70 bg-gradient-to-b from-[#151109] to-[#0b0a07] p-6 md:p-8"
        >
          <div className="relative shrink-0">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 font-body text-[14px] leading-none text-[#9d9077]">
              {segIndex + 1}/{segCount}
            </span>
            <h2 className="text-center font-heading text-[38px] leading-none text-white md:text-[46px]">
              {base.name}
            </h2>
          </div>

          {/* חצים במרכז הכרטיס, הטקסט לצידם — הטקסט נכנס לפי גודל הכרטיס */}
          <div
            className="mt-4 flex min-h-0 flex-1 items-center gap-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={prevSeg}
              disabled={segIndex === 0}
              className={cn(arrowBase, segIndex === 0 && "opacity-30")}
              aria-label="הקטע הקודם"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <div
              className="no-scrollbar max-h-full flex-1 overflow-y-auto overflow-x-hidden"
              style={{ scrollBehavior: "smooth" }}
            >
              <p
                key={segIndex}
                className="fade-in whitespace-pre-line text-center text-[18px] leading-[1.7] text-[#e8dcc4] md:text-[22px]"
              >
                {segments[segIndex]}
              </p>
            </div>
            <button
              onClick={nextSeg}
              disabled={segIndex === segCount - 1}
              className={cn(arrowBase, segIndex === segCount - 1 && "opacity-30")}
              aria-label="הקטע הבא"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          </div>

          <div className="mt-6 flex h-[65%] shrink-0 items-center justify-center">
            {base.videoUrl ? (
              <video
                src={base.videoUrl}
                controls
                loop
                className="h-full w-full rounded-2xl border border-[#3a3325] object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#3a3325] bg-black/40 text-[#9d9077]">
                <Video className="h-10 w-10" />
                <span className="px-2 text-center text-base">
                  סרטון המורשת של {base.name} יוצג כאן
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </KioskShell>
  );
}