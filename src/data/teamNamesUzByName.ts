// API-Football uses English team names — this maps them to Uzbek
export const teamNamesUzByName: Record<string, string> = {
  // UEFA
  France: "Fransiya",
  England: "Angliya",
  Spain: "Ispaniya",
  Germany: "Germaniya",
  Portugal: "Portugaliya",
  Netherlands: "Niderlandiya",
  Belgium: "Belgiya",
  Italy: "Italiya",
  Denmark: "Daniya",
  Switzerland: "Shveytsariya",
  Sweden: "Shvetsiya",
  Norway: "Norvegiya",
  Poland: "Polsha",
  Croatia: "Xorvatiya",
  Serbia: "Serbiya",
  Austria: "Avstriya",
  Hungary: "Vengriya",
  "Czech Republic": "Chexiya",
  Czechia: "Chexiya",
  Slovakia: "Slovakiya",
  Slovenia: "Sloveniya",
  Romania: "Ruminiya",
  Greece: "Gretsiya",
  Turkey: "Turkiya",
  Türkiye: "Turkiya",
  Scotland: "Shotlandiya",
  Wales: "Uels",
  "Northern Ireland": "Shimoliy Irlandiya",
  Ireland: "Irlandiya",
  "Republic of Ireland": "Irlandiya",
  Ukraine: "Ukraina",
  Albania: "Albaniya",
  Georgia: "Gruziya",
  "Bosnia and Herzegovina": "Bosniya",
  "Bosnia & Herzegovina": "Bosniya",
  Montenegro: "Chernogoriya",
  "North Macedonia": "Makedoniya",
  Iceland: "Islandiya",
  Finland: "Finlandiya",
  Israel: "Isroil",
  Luxembourg: "Lyuksemburg",
  Kosovo: "Kosovo",
  Andorra: "Andorra",
  Gibraltar: "Gibraltar",
  Malta: "Malta",
  Cyprus: "Kipr",
  "Faroe Islands": "Farer orollari",
  Liechtenstein: "Lixtenshteyn",
  "San Marino": "San-Marino",
  Armenia: "Armaniston",
  Azerbaijan: "Ozarbayjon",
  Belarus: "Belarus",
  Estonia: "Estoniya",
  Latvia: "Latviya",
  Lithuania: "Litva",
  Moldova: "Moldova",

  // CONMEBOL
  Brazil: "Braziliya",
  Argentina: "Argentina",
  Uruguay: "Urugvay",
  Colombia: "Kolumbiya",
  Chile: "Chili",
  Peru: "Peru",
  Ecuador: "Ekvador",
  Paraguay: "Paragvay",
  Venezuela: "Venesuela",
  Bolivia: "Boliviya",

  // CONCACAF
  "United States": "AQSh",
  USA: "AQSh",
  Mexico: "Meksika",
  Canada: "Kanada",
  "Costa Rica": "Kosta-Rika",
  Panama: "Panama",
  Honduras: "Gonduras",
  Jamaica: "Yamayka",
  "El Salvador": "Salvador",
  Guatemala: "Gvatemala",
  "Trinidad and Tobago": "Trinidad",
  Cuba: "Kuba",
  Haiti: "Gaiti",
  Nicaragua: "Nikaragua",
  "Dominican Republic": "Dominikan",
  Guyana: "Gayana",
  Suriname: "Surinam",
  Belize: "Beliz",
  "Saint Kitts and Nevis": "Sent-Kits",
  "Antigua and Barbuda": "Antigua",

  // AFC
  Uzbekistan: "O'zbekiston",
  Curaçao: "Kurasao",
  Japan: "Yaponiya",
  "South Korea": "Jan. Koreya",
  "Korea Republic": "Jan. Koreya",
  Australia: "Avstraliya",
  "Saudi Arabia": "Saudiya Arabistoni",
  Iran: "Eron",
  Iraq: "Iroq",
  Jordan: "Iordaniya",
  Qatar: "Qatar",
  "United Arab Emirates": "BAA",
  China: "Xitoy",
  "China PR": "Xitoy",
  India: "Hindiston",
  Indonesia: "Indoneziya",
  Thailand: "Tailand",
  Vietnam: "Vyetnam",
  Malaysia: "Malayziya",
  "North Korea": "Shim. Koreya",
  "Korea DPR": "Shim. Koreya",
  Oman: "Ummon",
  Bahrain: "Bahrayn",
  Kuwait: "Quvayt",
  Syria: "Suriya",
  Tajikistan: "Tojikiston",
  Kyrgyzstan: "Qirgʻiziston",
  Kazakhstan: "Qozogʻiston",
  Philippines: "Filippin",
  Singapore: "Singapur",
  Lebanon: "Livan",
  Yemen: "Yaman",
  Palestine: "Falastin",
  Afghanistan: "Afgʻoniston",
  Nepal: "Nepal",
  Bangladesh: "Bangladesh",
  "Sri Lanka": "Shri-Lanka",
  Pakistan: "Pokiston",
  Mongolia: "Mongoliya",
  Myanmar: "Myanma",
  Cambodia: "Kambodja",
  Laos: "Laos",
  Brunei: "Bruney",
  Maldives: "Maldiv",
  "Timor-Leste": "Sharqiy Timor",
  Guam: "Guam",
  Macau: "Makao",
  "Hong Kong": "Gonkong",
  "Chinese Taipei": "Tayvan",

  // CAF
  Morocco: "Marokash",
  Senegal: "Senegal",
  Nigeria: "Nigeriya",
  Egypt: "Misr",
  Cameroon: "Kamerun",
  Ghana: "Gana",
  "Ivory Coast": "Kot-d'Ivuar",
  "Côte d'Ivoire": "Kot-d'Ivuar",
  Mali: "Mali",
  Tunisia: "Tunis",
  Algeria: "Jazoir",
  "South Africa": "Jan. Afrika",
  "DR Congo": "Kongo DR",
  "Congo DR": "Kongo DR",
  "Democratic Republic of the Congo": "Kongo DR",
  Congo: "Kongo",
  "Republic of the Congo": "Kongo",
  "Guinea-Bissau": "Gvineya-Bisau",
  Guinea: "Gvineya",
  Gabon: "Gabon",
  Togo: "Togo",
  Benin: "Benin",
  Mozambique: "Mozambik",
  Zimbabwe: "Zimbabve",
  Zambia: "Zambiya",
  Kenya: "Keniya",
  Uganda: "Uganda",
  Tanzania: "Tanzaniya",
  Ethiopia: "Efiopiya",
  Somalia: "Somali",
  Sudan: "Sudan",
  Libya: "Liviya",
  Mauritania: "Mavritaniya",
  Niger: "Niger",
  "Burkina Faso": "Burkina-Faso",
  Chad: "Chad",
  "Central African Republic": "Markaziy Afrika",
  Angola: "Angola",
  Namibia: "Namibiya",
  Botswana: "Botsvana",
  Eswatini: "Svazilend",
  Swaziland: "Svazilend",
  Lesotho: "Lesoto",
  Madagascar: "Madagaskar",
  Mauritius: "Mavrikiy",
  Seychelles: "Seyshel",
  "Cape Verde": "Kabo-Verde",
  "Sao Tome and Principe": "San-Tome",
  "Equatorial Guinea": "Ekvatorial Gvineya",
  Liberia: "Liberiya",
  "Sierra Leone": "Syerra-Leone",
  Djibouti: "Jibuti",
  Eritrea: "Eritreya",
  Rwanda: "Ruanda",
  Burundi: "Burundi",
  Malawi: "Malavi",
  Comoros: "Komor orollari",
  Gambia: "Gambiya",

  // OFC
  "New Zealand": "Yangi Zelandiya",
  Fiji: "Fiji",
  "Papua New Guinea": "Papua Yangi Gvineya",
  "Solomon Islands": "Solomon orollari",
  Vanuatu: "Vanuatu",
  Tahiti: "Taxiti",
  "New Caledonia": "Yangi Kaledoniya",
  "Team will be confirmed": "Tez orada",
};

const normalizeTeamName = (name: string) => {
  return name
    .replace(/\s+/g, " ")
    .replace(/U-?\d+/gi, "") 
    .replace(/\bFC\b/gi, "")
    .replace(/\bCF\b/gi, "")
    .replace(/\bAFC\b/gi, "")
    .replace(/\bSC\b/gi, "")
    .replace(/\./g, "")
    .trim();
};

export const translateTeamName = (name: string) => {
  if (!name) return name;

  const normalized = normalizeTeamName(name);

  // 1. To‘g‘ridan-to‘g‘ri match
  if (teamNamesUzByName[normalized]) {
    return teamNamesUzByName[normalized];
  }

  // 2. Case-insensitive match
  const foundKey = Object.keys(teamNamesUzByName).find(
    (key) => key.toLowerCase() === normalized.toLowerCase(),
  );

  if (foundKey) {
    return teamNamesUzByName[foundKey];
  }

  // 3. Partial match (masalan "IR Iran")
  const partialKey = Object.keys(teamNamesUzByName).find(
    (key) =>
      normalized.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(normalized.toLowerCase()),
  );

  if (partialKey) {
    return teamNamesUzByName[partialKey];
  }

  // 4. Oxirgi fallback
  return name;
};
