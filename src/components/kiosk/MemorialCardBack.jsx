import React from "react";
import { ExternalLink } from "lucide-react";
import { Image } from "@/components/ui/image";

// גב הכרטיס — דיוקן קטן מימין, שם ותאריך בכותרת קרנטינה,
// ופסקה קצרה מיזכור בפונט Assistant מיושרת למרכז (ללא פרטי משפחה)
export default function MemorialCardBack({ fallen }) {
  return (
    <div className="flex h-full w-full flex-col rounded-[28px] border border-[#4a3f2a] bg-gradient-to-b from-[#151109] to-[#0b0a07] p-5 shadow-[inset_0_0_60px_rgba(229,169,60,0.06)] md:p-7">
      <div className="flex shrink-0 items-center gap-4 md:gap-6">
        <div className="h-[140px] w-[100px] shrink-0 overflow-hidden rounded-xl gold-glow md:h-[180px] md:w-[128px]">
          <Image src={fallen.image} alt={fallen.name} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1 text-center">
          <span className="block font-heading text-[24px] leading-none text-[#E5A93C] md:text-[28px]">
            {fallen.rank}
          </span>
          <h3 className="mt-1 font-heading text-[36px] leading-[1.05] text-white md:text-[44px]">
            {fallen.name} ז"ל
          </h3>
          <div className="mt-2 flex items-center justify-center gap-1.5 text-[#E5A93C]">
            <span className="font-heading text-[22px] leading-none md:text-[26px]">
              {fallen.female ? "נפלה" : "נפל"} ביום {fallen.fallDate}
            </span>
          </div>
          <p className="mt-2 font-body text-[14px] leading-[1.5] text-[#9d9077] md:text-[16px]">
            {fallen.city && <span>{fallen.city}</span>}
            {fallen.city && fallen.age && <span> · </span>}
            {fallen.age && (
              <span>
                בגיל {fallen.age} {fallen.female ? "בנפילתה" : "בנפילתו"}
              </span>
            )}
          </p>
        </div>
      </div>

      <div
        className="no-scrollbar mt-5 flex flex-1 items-center overflow-y-auto overflow-x-hidden"
        style={{ scrollBehavior: "smooth" }}
      >
        <p className="text-center text-[19px] leading-[1.6] text-[#e8dcc4] md:text-[23px]">
          {fallen.story || "לזכרו — יהי זכרו ברוך."}
        </p>
      </div>

      {fallen.izkorUrl && (
        <a
          href={fallen.izkorUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex shrink-0 select-none items-center justify-center gap-2 rounded-full border border-[#E5A93C]/50 px-5 py-2.5 text-[15px] leading-none text-[#E5A93C] md:text-[17px]"
        >
          לסיפור המלא באתר יזכור
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}