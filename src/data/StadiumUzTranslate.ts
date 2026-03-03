const venueSuffixMap: Record<string, string> = {
  stadium: "Stadioni",
  arena: "Arenasi",
  field: "Maydoni",
  estadio: "Stadioni",
  stadio: "Stadioni",
  stade: "Stadioni",
  place: "Maydoni",
};

export const translateVenueName = (name: string) => {
  if (!name) return name;

  let normalized = name
    .replace(/\s+/g, " ") // ortiqcha bo‘sh joylarni olib tashlash
    .replace(/\./g, "")
    .trim();

  // Suffixni aniqlash
  for (const key of Object.keys(venueSuffixMap)) {
    const re = new RegExp(`\\b${key}\\b`, "i");
    if (re.test(normalized)) {
      // Suffixni oxirga qo‘shish va asl so‘zni olib tashlash
      normalized =
        normalized.replace(re, "").trim() + " " + venueSuffixMap[key];
      break;
    }
  }

  return normalized;
};
