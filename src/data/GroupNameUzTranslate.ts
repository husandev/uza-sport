const roundMap: Record<string, string> = {
  // Knockout & special rounds
  "Round of 32": "1/32 final",
  "Round of 16": "1/8 final",
  "Quarter-finals": "Chorak final",
  "Semi-finals": "Yarim final",
  "3rd Place Final": "Bronza uchun final",
  "Final": "Final",

  // Ranking / special
  "Ranking of third-placed teams": "Uchinchi o‘rinlarni reytingi",
  "Ranking of best runners-up": "Eng yaxshi ikkinchi o‘rinlarni reytingi",
  "Overall ranking": "Umumiy reyting",
  "Fair play ranking": "Fair play reytingi",

  // Others
  "All Groups": "Barcha guruhlar",
  "Playoff qualifiers": "Pleyoffga chiqadiganlar",
};

export const translateRoundName = (name: string) => {
  if (!name) return name;

  // Group Stage - 1, Group Stage - 2 format
  if (name.startsWith("Group Stage")) return "Guruh bosqichi";

  // Group A/B/C format
  const groupMatch = name.match(/^Group\s+([A-Z0-9]+)$/i);
  if (groupMatch) {
    return `${groupMatch[1]} guruh`;
  }

  // To'g'ridan-to'g'ri map orqali tarjima
  if (roundMap[name]) return roundMap[name];

  // Case-insensitive match
  const foundKey = Object.keys(roundMap).find(
    (key) => key.toLowerCase() === name.toLowerCase()
  );
  if (foundKey) return roundMap[foundKey];

  // Fallback: asl nomni qaytaradi
  return name;
};