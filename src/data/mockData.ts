export const heroNews = [
  {
    id: 1,
    title: "Jahon chempionati 2026 – eng katta futbol bayramiga tayyormisiz?",
    subtitle: "AQSH, Kanada va Meksikada 48 terma jamoa ishtirokida o'tkaziladigan tarixiy musobaqa",
    category: "Asosiy",
  },
  {
    id: 2,
    title: "O'zbekiston terma jamoasi guruh bosqichida Argentina bilan o'ynaydi",
    subtitle: "Tarixiy qur'a natijasi – O'zbekiston A guruhga tushdi",
    category: "Terma jamoa",
  },
  {
    id: 3,
    title: "MetLife Stadium – Jahon chempionati finalining mezboni",
    subtitle: "82 ming o'rinli stadion final uchrashuvi uchun tayyorlanmoqda",
    category: "Stadionlar",
  },
  {
    id: 4,
    title: "Messi va Ronaldu – so'nggi Jahon chempionatimi?",
    subtitle: "Ikki buyuk futbolchining so'nggi imkoniyati",
    category: "Tahlil",
  },
  {
    id: 5,
    title: "O'zbekiston futboli yangi davrga qadam qo'ymoqda",
    subtitle: "Jahon chempionatida ishtirok etish – tarixiy yutuq",
    category: "O'zbekiston",
  },
];

export const liveMatches = [
  {
    id: 1,
    homeTeam: "O'zbekiston",
    awayTeam: "Argentina",
    homeFlag: "🇺🇿",
    awayFlag: "🇦🇷",
    homeScore: 1,
    awayScore: 2,
    minute: "67'",
    status: "live" as const,
    group: "A guruh",
  },
  {
    id: 2,
    homeTeam: "Braziliya",
    awayTeam: "Germaniya",
    homeFlag: "🇧🇷",
    awayFlag: "🇩🇪",
    homeScore: 0,
    awayScore: 0,
    minute: "15:00",
    status: "upcoming" as const,
    group: "B guruh",
  },
  {
    id: 3,
    homeTeam: "Fransiya",
    awayTeam: "Ispaniya",
    homeFlag: "🇫🇷",
    awayFlag: "🇪🇸",
    homeScore: 3,
    awayScore: 1,
    minute: "FT",
    status: "finished" as const,
    group: "C guruh",
  },
  {
    id: 4,
    homeTeam: "Angliya",
    awayTeam: "Italiya",
    homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    awayFlag: "🇮🇹",
    homeScore: 0,
    awayScore: 0,
    minute: "18:00",
    status: "upcoming" as const,
    group: "D guruh",
  },
];

export const groupStandings = [
  {
    group: "A guruh",
    teams: [
      { pos: 1, name: "Argentina", flag: "🇦🇷", played: 2, won: 2, drawn: 0, lost: 0, gd: "+5", points: 6 },
      { pos: 2, name: "O'zbekiston", flag: "🇺🇿", played: 2, won: 1, drawn: 0, lost: 1, gd: "+1", points: 3 },
      { pos: 3, name: "Meksika", flag: "🇲🇽", played: 2, won: 1, drawn: 0, lost: 1, gd: "0", points: 3 },
      { pos: 4, name: "Kamerun", flag: "🇨🇲", played: 2, won: 0, drawn: 0, lost: 2, gd: "-6", points: 0 },
    ],
  },
  {
    group: "B guruh",
    teams: [
      { pos: 1, name: "Braziliya", flag: "🇧🇷", played: 2, won: 2, drawn: 0, lost: 0, gd: "+4", points: 6 },
      { pos: 2, name: "Germaniya", flag: "🇩🇪", played: 2, won: 1, drawn: 1, lost: 0, gd: "+2", points: 4 },
      { pos: 3, name: "Yaponiya", flag: "🇯🇵", played: 2, won: 0, drawn: 1, lost: 1, gd: "-1", points: 1 },
      { pos: 4, name: "Kosta-Rika", flag: "🇨🇷", played: 2, won: 0, drawn: 0, lost: 2, gd: "-5", points: 0 },
    ],
  },
];

export const latestNews = [
  {
    id: 1,
    title: "O'zbekiston terma jamoasi JCh-2026 uchun to'liq tayyorgarlik ko'rmoqda",
    date: "26.02.2026",
    category: "Terma jamoa",
    excerpt: "Bosh murabbiy Srechko Katanets futbolchilar bilan intensiv mashg'ulotlar o'tkazmoqda...",
  },
  {
    id: 2,
    title: "FIFA yangi qoidalarni e'lon qildi – VAR tizimi yangilandi",
    date: "25.02.2026",
    category: "FIFA",
    excerpt: "Jahon chempionati 2026 da yangilangan VAR tizimi qo'llaniladi...",
  },
  {
    id: 3,
    title: "Chiptalar sotuvga chiqarildi – qanday xarid qilish mumkin?",
    date: "24.02.2026",
    category: "Chiptalar",
    excerpt: "FIFA rasmiy sayti orqali chiptalarni xarid qilish imkoniyati...",
  },
  {
    id: 4,
    title: "Guruh bosqichi taqvimi e'lon qilindi",
    date: "23.02.2026",
    category: "Taqvim",
    excerpt: "48 terma jamoa 12 guruhda bellashadi, har bir guruhda 4 ta jamoa...",
  },
];

export const latestArticles = [
  {
    id: 1,
    title: "O'zbekiston futbolining rivojlanishi: JCh-2026 ga yo'l",
    author: "Alisher Zokirov",
    date: "26.02.2026",
    readTime: "8 daqiqa",
    excerpt: "O'zbekiston futboli qanday qilib jahon chempionatiga yo'llanma olganini tahlil qilamiz...",
  },
  {
    id: 2,
    title: "Jahon chempionati 2026 – nima kutish kerak?",
    author: "Rustam Qodirov",
    date: "25.02.2026",
    readTime: "6 daqiqa",
    excerpt: "48 jamoali yangi format, yangi stadionlar va texnologiyalar...",
  },
  {
    id: 3,
    title: "Eng kuchli terma jamoalar tahlili: favorit kim?",
    author: "Dilshod Rahmatov",
    date: "24.02.2026",
    readTime: "10 daqiqa",
    excerpt: "Braziliya, Fransiya, Argentina va boshqa kuchli terma jamoalar...",
  },
];

export const stadiums = [
  { id: 1, name: "MetLife Stadium", city: "Nyu-York", capacity: "82,500", country: "AQSH" },
  { id: 2, name: "Azteca Stadium", city: "Mexiko siti", capacity: "87,000", country: "Meksika" },
  { id: 3, name: "SoFi Stadium", city: "Los-Anjeles", capacity: "70,000", country: "AQSH" },
];

export const teams = [
  { id: 1, name: "O'zbekiston", flag: "🇺🇿", group: "A", coach: "Srechko Katanets", ranking: 55 },
  { id: 2, name: "Argentina", flag: "🇦🇷", group: "A", coach: "Lionel Scaloni", ranking: 1 },
  { id: 3, name: "Braziliya", flag: "🇧🇷", group: "B", coach: "Dorival Júnior", ranking: 5 },
  { id: 4, name: "Fransiya", flag: "🇫🇷", group: "C", coach: "Didier Deschamps", ranking: 2 },
  { id: 5, name: "Germaniya", flag: "🇩🇪", group: "B", coach: "Julian Nagelsmann", ranking: 11 },
  { id: 6, name: "Ispaniya", flag: "🇪🇸", group: "C", coach: "Luis de la Fuente", ranking: 3 },
];

export const heroFootballers = [
  { id: 1, name: "Eldor Shomurodov", position: "Hujumchi", club: "Roma", number: 9, goals: 12 },
  { id: 2, name: "Abdukodir Xusanov", position: "Himoyachi", club: "Manchester City", number: 4, goals: 1 },
  { id: 3, name: "Oston Urunov", position: "Yarim himoyachi", club: "Lens", number: 8, goals: 5 },
  { id: 4, name: "Otabek Shukurov", position: "Yarim himoyachi", club: "AGMK", number: 10, goals: 3 },
];

export const videoPosts = [
  { id: 1, title: "O'zbekiston – Argentina: eng yaxshi momentlar", duration: "5:32", views: "1.2M" },
  { id: 2, title: "JCh-2026: barcha gollar – 1-tur", duration: "12:45", views: "3.5M" },
  { id: 3, title: "Stadionlar touri – MetLife Stadium", duration: "8:10", views: "890K" },
  { id: 4, title: "Eldor Shomurodov – JCh yo'lidagi barcha gollari", duration: "6:20", views: "2.1M" },
];
