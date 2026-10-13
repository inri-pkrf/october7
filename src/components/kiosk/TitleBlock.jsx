import React from "react";

// קבוצת הכותרות — שלוש השורות: הכותרת, התאריך והציטוט
export default function TitleBlock({ className }) {
  return (
    <div className={className}>
      <h1 className="text-center font-heading text-[max(9vw,56px)] leading-none text-white">
        יום הזיכרון הלאומי
      </h1>
      <p className="mt-2 text-center font-heading text-[max(3.6vw,28px)] leading-none text-[#E5A93C]">
        לאירועי 7.10.2023
      </p>
      <p className="mt-2 text-center font-body text-[max(2vw,16px)] leading-[1.5] text-[#9d9077]">
        ״יַחַד בַּכְּאֵב, שֻׁתָּפִים בַּגְּבוּרָה, מְאֻחָדִים בַּזִּכָּרוֹן״
      </p>
    </div>
  );
}