export const heroNews = [
  {
    id: 1,
    title: "Jahon chempionati 2026 – eng katta futbol bayramiga tayyormisiz?",
    subtitle: "AQSH, Kanada va Meksikada 48 terma jamoa ishtirokida o'tkaziladigan tarixiy musobaqa",
    category: "Asosiy",
    time: "12:30",
  },
  {
    id: 2,
    title: "O'zbekiston terma jamoasi guruh bosqichida Argentina bilan o'ynaydi",
    subtitle: "Tarixiy qur'a natijasi – O'zbekiston A guruhga tushdi",
    category: "Terma jamoa",
    time: "11:45",
  },
  {
    id: 3,
    title: "MetLife Stadium – Jahon chempionati finalining mezboni",
    subtitle: "82 ming o'rinli stadion final uchrashuvi uchun tayyorlanmoqda",
    category: "Stadionlar",
    time: "10:20",
  },
  {
    id: 4,
    title: "Messi va Ronaldu – so'nggi Jahon chempionatimi?",
    subtitle: "Ikki buyuk futbolchining so'nggi imkoniyati",
    category: "Tahlil",
    time: "09:15",
  },
  {
    id: 5,
    title: "O'zbekiston futboli yangi davrga qadam qo'ymoqda",
    subtitle: "Jahon chempionatida ishtirok etish – tarixiy yutuq",
    category: "O'zbekiston",
    time: "08:00",
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
    stadium: "MetLife Stadium",
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
    stadium: "SoFi Stadium",
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
    stadium: "Azteca Stadium",
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
    stadium: "Rose Bowl",
  },
  {
    id: 5,
    homeTeam: "Portugaliya",
    awayTeam: "Niderlandiya",
    homeFlag: "🇵🇹",
    awayFlag: "🇳🇱",
    homeScore: 2,
    awayScore: 2,
    minute: "FT",
    status: "finished" as const,
    group: "E guruh",
    stadium: "Hard Rock Stadium",
  },
  {
    id: 6,
    homeTeam: "Belgiya",
    awayTeam: "Xorvatiya",
    homeFlag: "🇧🇪",
    awayFlag: "🇭🇷",
    homeScore: 1,
    awayScore: 0,
    minute: "34'",
    status: "live" as const,
    group: "F guruh",
    stadium: "AT&T Stadium",
  },
];

export const groupStandings = [
  {
    group: "A guruh",
    teams: [
      { pos: 1, name: "Argentina", flag: "🇦🇷", p: 2, w: 2, d: 0, l: 0, gd: "+5", pts: 6 },
      { pos: 2, name: "O'zbekiston", flag: "🇺🇿", p: 2, w: 1, d: 0, l: 1, gd: "+1", pts: 3 },
      { pos: 3, name: "Meksika", flag: "🇲🇽", p: 2, w: 1, d: 0, l: 1, gd: "0", pts: 3 },
      { pos: 4, name: "Kamerun", flag: "🇨🇲", p: 2, w: 0, d: 0, l: 2, gd: "-6", pts: 0 },
    ],
  },
  {
    group: "B guruh",
    teams: [
      { pos: 1, name: "Braziliya", flag: "🇧🇷", p: 2, w: 2, d: 0, l: 0, gd: "+4", pts: 6 },
      { pos: 2, name: "Germaniya", flag: "🇩🇪", p: 2, w: 1, d: 1, l: 0, gd: "+2", pts: 4 },
      { pos: 3, name: "Yaponiya", flag: "🇯🇵", p: 2, w: 0, d: 1, l: 1, gd: "-1", pts: 1 },
      { pos: 4, name: "Kosta-Rika", flag: "🇨🇷", p: 2, w: 0, d: 0, l: 2, gd: "-5", pts: 0 },
    ],
  },
  {
    group: "C guruh",
    teams: [
      { pos: 1, name: "Fransiya", flag: "🇫🇷", p: 2, w: 2, d: 0, l: 0, gd: "+4", pts: 6 },
      { pos: 2, name: "Ispaniya", flag: "🇪🇸", p: 2, w: 1, d: 0, l: 1, gd: "+1", pts: 3 },
      { pos: 3, name: "Marokash", flag: "🇲🇦", p: 2, w: 1, d: 0, l: 1, gd: "0", pts: 3 },
      { pos: 4, name: "Kanada", flag: "🇨🇦", p: 2, w: 0, d: 0, l: 2, gd: "-5", pts: 0 },
    ],
  },
  {
    group: "D guruh",
    teams: [
      { pos: 1, name: "Angliya", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", p: 2, w: 1, d: 1, l: 0, gd: "+3", pts: 4 },
      { pos: 2, name: "Italiya", flag: "🇮🇹", p: 2, w: 1, d: 1, l: 0, gd: "+2", pts: 4 },
      { pos: 3, name: "Urugvay", flag: "🇺🇾", p: 2, w: 1, d: 0, l: 1, gd: "0", pts: 3 },
      { pos: 4, name: "Gana", flag: "🇬🇭", p: 2, w: 0, d: 0, l: 2, gd: "-5", pts: 0 },
    ],
  },
];

export const latestNews = [
  { id: 1, title: "O'zbekiston terma jamoasi JCh-2026 uchun to'liq tayyorgarlik ko'rmoqda", date: "26.02.2026", time: "14:30", category: "Terma jamoa", comments: 34 },
  { id: 2, title: "FIFA yangi qoidalarni e'lon qildi – VAR tizimi yangilandi", date: "26.02.2026", time: "13:15", category: "FIFA", comments: 12 },
  { id: 3, title: "Chiptalar sotuvga chiqarildi – qanday xarid qilish mumkin?", date: "25.02.2026", time: "18:00", category: "Chiptalar", comments: 89 },
  { id: 4, title: "Guruh bosqichi taqvimi e'lon qilindi", date: "25.02.2026", time: "16:40", category: "Taqvim", comments: 23 },
  { id: 5, title: "Eldor Shomurodov: 'Biz tarixni yozishga tayyormiz'", date: "25.02.2026", time: "15:20", category: "Intervyu", comments: 156 },
  { id: 6, title: "Argentina terma jamoasi 26 nafar futbolchini e'lon qildi", date: "25.02.2026", time: "12:00", category: "Jamoalar", comments: 45 },
  { id: 7, title: "Nyu-Yorkda JCh-2026 sanasi boshlanishiga 100 kun qoldi", date: "24.02.2026", time: "20:00", category: "Munosabat", comments: 67 },
  { id: 8, title: "O'zbekiston terma jamoasi Toshkentda ochiq mashg'ulot o'tkazdi", date: "24.02.2026", time: "17:30", category: "Terma jamoa", comments: 28 },
  { id: 9, title: "Abdukodir Xusanov Manchester City safida yangi mavsum boshlamoqda", date: "24.02.2026", time: "14:10", category: "Transfer", comments: 203 },
  { id: 10, title: "Meksika stadionlari tayyor – FIFA delegatsiyasi tashrif buyurdi", date: "24.02.2026", time: "11:00", category: "Stadionlar", comments: 15 },
];

export const latestArticles = [
  { id: 1, title: "O'zbekiston futbolining rivojlanishi: JCh-2026 ga yo'l", author: "Alisher Zokirov", date: "26.02.2026", readTime: "8 daq", comments: 42 },
  { id: 2, title: "Jahon chempionati 2026 – nima kutish kerak?", author: "Rustam Qodirov", date: "25.02.2026", readTime: "6 daq", comments: 31 },
  { id: 3, title: "Eng kuchli terma jamoalar tahlili: favorit kim?", author: "Dilshod Rahmatov", date: "24.02.2026", readTime: "10 daq", comments: 78 },
  { id: 4, title: "48 jamoali format: qanday o'zgarishlar kutilmoqda?", author: "Nodir Ismoilov", date: "23.02.2026", readTime: "7 daq", comments: 19 },
];

export const stadiums = [
  { id: 1, name: "MetLife Stadium", city: "Nyu-York", capacity: "82,500", country: "AQSH" },
  { id: 2, name: "Azteca Stadium", city: "Mexiko siti", capacity: "87,000", country: "Meksika" },
  { id: 3, name: "SoFi Stadium", city: "Los-Anjeles", capacity: "70,000", country: "AQSH" },
  { id: 4, name: "Rose Bowl", city: "Pasadena", capacity: "90,888", country: "AQSH" },
  { id: 5, name: "Hard Rock Stadium", city: "Mayami", capacity: "64,767", country: "AQSH" },
  { id: 6, name: "AT&T Stadium", city: "Dallas", capacity: "80,000", country: "AQSH" },
];

export const teams = [
  { id: 1, name: "O'zbekiston", flag: "🇺🇿", group: "A", coach: "Srechko Katanets", ranking: 55 },
  { id: 2, name: "Argentina", flag: "🇦🇷", group: "A", coach: "Lionel Scaloni", ranking: 1 },
  { id: 3, name: "Braziliya", flag: "🇧🇷", group: "B", coach: "Dorival Júnior", ranking: 5 },
  { id: 4, name: "Fransiya", flag: "🇫🇷", group: "C", coach: "Didier Deschamps", ranking: 2 },
  { id: 5, name: "Germaniya", flag: "🇩🇪", group: "B", coach: "Julian Nagelsmann", ranking: 11 },
  { id: 6, name: "Ispaniya", flag: "🇪🇸", group: "C", coach: "Luis de la Fuente", ranking: 3 },
  { id: 7, name: "Angliya", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "D", coach: "Thomas Tuchel", ranking: 4 },
  { id: 8, name: "Meksika", flag: "🇲🇽", group: "A", coach: "Javier Aguirre", ranking: 15 },
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

export const topScorers = [
  { pos: 1, name: "K. Mbappe", flag: "🇫🇷", goals: 4, assists: 1 },
  { pos: 2, name: "L. Messi", flag: "🇦🇷", goals: 3, assists: 2 },
  { pos: 3, name: "V. Junior", flag: "🇧🇷", goals: 3, assists: 0 },
  { pos: 4, name: "E. Shomurodov", flag: "🇺🇿", goals: 2, assists: 1 },
  { pos: 5, name: "H. Kane", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", goals: 2, assists: 0 },
];
