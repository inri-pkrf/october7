import React from "react";

const TAP_HINT_IMAGE =
  "https://media.base44.com/images/public/6ab370144e481c08e9aebeb4/173d4cd31_image.png";

// אייקון הקשה — יד שחורה עם עיגול על קצה האצבע (האייקון שסופק),
// מציין שניתן ללחוץ על התמונה ולהפוך אותה
export default function TapHintIcon({ className }) {
  return (
    <img src={TAP_HINT_IMAGE} alt="אייקון הקשה" className={className} draggable={false} />
  );
}