import React, { useState } from "react";
import KioskShell from "@/components/kiosk/KioskShell";
import FlipCard from "@/components/kiosk/FlipCard";
import MemorialCardBack from "@/components/kiosk/MemorialCardBack";
import { Image } from "@/components/ui/image";
import { FALLEN } from "@/data/fallen";
import { X } from "lucide-react";

// מסך 3 — תצוגה מלאה: קיר תמונות 5x5 (מוצר מעט בצדדים לפני כפתורי חצי העיגול);
// לחיצה פותחת כרטיס גדול מעל הגריד עם הגריד נראה ברקע
export default function GridView() {
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const openFallen = (fallen) => {
    setSelected(fallen);
    setFlipped(false);
  };
  const closeModal = () => setSelected(null);

  return (
    <KioskShell>
      <div className="h-full w-full px-14 pb-6 pt-[320px] md:px-16">
        <div className="grid h-full grid-cols-5 grid-rows-5 gap-3 md:gap-5">
          {FALLEN.map((fallen) => (
            <button
              key={fallen.name}
              onClick={() => openFallen(fallen)}
              className="flex min-h-0 flex-col"
            >
              <div className="min-h-0 w-full flex-1 overflow-hidden rounded-[10px] bg-[#0d0c0a]">
                <Image
                  src={fallen.image}
                  alt={fallen.name}
                  fittingType="fill"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="mt-1 w-full truncate text-center font-body text-[12px] leading-[1.5] text-[#e8dcc4] md:text-[16px]">
                {fallen.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-6"
          onClick={closeModal}
        >
          <div
            className="relative aspect-[32/46] w-[min(560px,92vw,calc((100vh-230px)*0.696))]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -left-4 -top-4 z-10 rounded-full border border-[#E5A93C]/60 bg-black/70 p-3 text-[#E5A93C]"
              aria-label="סגירה"
            >
              <X className="h-7 w-7" />
            </button>
            <FlipCard
              flipped={flipped}
              onFlip={() => setFlipped((f) => !f)}
              className="h-full w-full"
              front={
                <div className="gold-glow h-full w-full overflow-hidden rounded-[28px] bg-[#0d0c0a]">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fittingType="fill"
                    className="h-full w-full object-cover"
                  />
                </div>
              }
              back={<MemorialCardBack fallen={selected} />}
            />
          </div>
        </div>
      )}
    </KioskShell>
  );
}