import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trophy, MapPin, Shirt, Target, ArrowRight, Quote, Calendar, Award, Flag } from "lucide-react";
import Header from "@/components/Header";
import MatchTicker from "@/components/MatchTicker";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";

import { heroFootballers } from "@/data/mockData";
import footballer1 from "@/assets/footballer-1.png";
import footballer2 from "@/assets/footballer-2.jpg";
import footballer3 from "@/assets/footballer-3.jpg";
import footballer4 from "@/assets/footballer-4.jpg";
import footballer5 from "@/assets/footballer-5.jpg";
import footballer6 from "@/assets/footballer-6.jpg";
import footballer7 from "@/assets/footballer-7.jpg";
import footballer8 from "@/assets/footballer-8.jpg";
import footballer9 from "@/assets/footballer-9.jpg";
import footballer10 from "@/assets/footballer-10.jpg";
import footballer11 from "@/assets/footballer-11.jpg";

const portraits = [footballer1, footballer2, footballer3, footballer4, footballer5, footballer6, footballer7, footballer8, footballer9, footballer10, footballer11];

interface PlayerBioData {
  fullName: string;
  birthDate: string;
  birthPlace: string;
  height: string;
  position: string;
  currentClub: string;
  number: number;
  bio: string[];
  careerHighlights: string[];
  quote: string;
  internationalGoals: number;
  internationalCaps: number;
}

const playerBios: Record<number, PlayerBioData> = {
  1: {
    fullName: "Eldor Azamat o'g'li Shomurodov",
    birthDate: "29 iyun 1995",
    birthPlace: "Jarqo'rg'on, Surxondaryo viloyati",
    height: "1.90 m",
    position: "Hujumchi",
    currentClub: "İstanbul Başakşehir (Roma ijarasi)",
    number: 14,
    internationalGoals: 43,
    internationalCaps: 88,
    bio: [
      "Eldor Shomurodov — O'zbekiston futboli tarixidagi eng samarali hujumchi va terma jamoa kaptani. U 1995 yil 29 iyunda Surxondaryo viloyatining Jarqo'rg'on tumanida tug'ilgan. Uning otasi, amakilari va akasi ham futbolchi bo'lgan — amakilari Ilxom va Otabek Shomurodov O'zbekiston terma jamoasida o'ynashgan.",
      "Shomurodov 6 yoshdan futbol o'ynashni boshlagan va 11 yoshida Mash'al Muborak akademiyasiga qo'shilgan. 2015 yilda Bunyodkorga o'tgan, so'ng 2017 yilda Rossiya Premer Ligasidagi Rostov klubiga transfer bo'lgan. Rostovda eng samarali mavsumida 11 gol urgan.",
      "2020 yilda 8 million evroga Italiya Seriya A dagi Jenoa klubiga o'tdi va Ilyos Zeytullayevdan keyin Seriya A da o'ynagan ikkinchi o'zbek futbolchiga aylandi. Bir mavsumda 8 gol urdi. 2021 yilda Roma uni 17.5 million evroga sotib oldi.",
      "Roma safida Xoze Mourinyoning birinchi o'yinida gol urib, 2022 yilda UEFA Konferensiya Ligasi finalida g'alaba qozongan jamoaning a'zosi bo'ldi — bu bilan u yirik UEFA musobaqasini yutgan birinchi o'zbek futbolchiga aylandi.",
      "Terma jamoa safida 88 ta o'yinda 43 gol urgan Shomurodov, Maksim Shatskixning rekordini sindirib, O'zbekiston tarixidagi eng ko'p gol urgan futbolchiga aylandi. U 2015 yilgi U-20 Jahon chempionati, 2019 Osiyo kubogi va 2024 Olimpiya o'yinlarida ishtirok etgan.",
      "2025 yilda Turkiyaning İstanbul Başakşehir klubiga ijara asosida o'tgan. O'zbekiston terma jamoasini birinchi Jahon chempionatiga olib chiqishda hal qiluvchi rol o'ynagan.",
    ],
    careerHighlights: [
      "🏆 UEFA Konferensiya Ligasi g'olibi — 2022 (Roma)",
      "🥇 CAFA Millatlari Kubogi g'olibi — 2025",
      "⚽ O'zbekiston tarixidagi eng ko'p gol urgan futbolchi — 43 gol",
      "🌍 Seriya A da o'ynagan ikkinchi o'zbek futbolchi",
      "👨‍✈️ Terma jamoa kaptani",
      "🎯 2019 Osiyo kubogida 4 gol",
    ],
    quote: "«Biz har bir o'yinda tarixni yozmoqdamiz. Men bu golni butun xalqimiz uchun urdim.»",
  },
  2: {
    fullName: "Abduqodir Xusanov",
    birthDate: "2003",
    birthPlace: "Jizzax, O'zbekiston",
    height: "1.86 m",
    position: "Himoyachi",
    currentClub: "Manchester Siti",
    number: 4,
    internationalGoals: 1,
    internationalCaps: 42,
    bio: [
      "Abduqodir Xusanov — Manchester Siti safida o'ynayotgan yosh himoyachi. FIFA statistikasiga ko'ra, u JCh-2026 da eng yaxshi himoyachi sifatida tan olingan. Pep Guardiola uni «kelajakning Sergio Ramosi» deb atagan.",
      "Xusanovning tezligi, aqli va kuchi — bu kombinatsiya juda kam uchraydi. U Lans klubidan 45 million evroga sotib olingan.",
    ],
    careerHighlights: [
      "🏆 APL da eng yaxshi yosh himoyachi",
      "🌍 JCh-2026 da eng yaxshi himoyachi (FIFA)",
    ],
    quote: "«Biz tayyor. Kolumbiya o'yini — bizning eng muhim imtihonimiz bo'ladi.»",
  },
  3: {
    fullName: "Oston Urunov",
    birthDate: "1998",
    birthPlace: "Toshkent, O'zbekiston",
    height: "1.78 m",
    position: "Yarim himoyachi",
    currentClub: "Lans",
    number: 8,
    internationalGoals: 5,
    internationalCaps: 38,
    bio: [
      "Oston Urunov — Fransiya Ligue 1 dagi Lans klubining yarim himoyachisi. U terma jamoa o'rtasida muhim bog'lovchi rolini bajaradi.",
      "Urunov tez va texnik futbolchi bo'lib, hujumga ham, himoyaga ham bir xil darajada hissa qo'shadi.",
    ],
    careerHighlights: ["🏅 Ligue 1 da haftaning o'yinchisi"],
    quote: "«Fransiyada o'ynash meni juda rivojlantirdi.»",
  },
  4: {
    fullName: "Otabek Shukurov", birthDate: "1996", birthPlace: "Toshkent", height: "1.75 m", position: "Yarim himoyachi", currentClub: "AGMK", number: 10, internationalGoals: 3, internationalCaps: 35,
    bio: ["Otabek Shukurov — AGMK klubining kapitan va asosiy yarim himoyachisi. U O'zbekiston Superligasida ko'p yillik tajribaga ega."],
    careerHighlights: ["🏅 Superliga chempioni"], quote: "«Superliga — mening uyim.»",
  },
  5: {
    fullName: "Ignatiy Nesterov", birthDate: "1997", birthPlace: "Toshkent", height: "1.91 m", position: "Darvozabon", currentClub: "Paxtakor", number: 1, internationalGoals: 0, internationalCaps: 40,
    bio: ["Ignatiy Nesterov — Paxtakor klubining darvozaboni. U Superligada eng ko'p clean sheet qilgan darvozabon sifatida tan olingan."],
    careerHighlights: ["🧤 Eng ko'p clean sheet"], quote: "«Har bir to'p muhim.»",
  },
  6: {
    fullName: "Jasur Yaxshiboyev", birthDate: "1999", birthPlace: "Navoiy", height: "1.82 m", position: "Hujumchi", currentClub: "Nasaf", number: 11, internationalGoals: 8, internationalCaps: 32,
    bio: ["Jasur Yaxshiboyev — Nasaf klubining hujumchisi. U mavsumning eng chiroyli golini urgan futbolchi sifatida e'tirof etildi."],
    careerHighlights: ["⚽ Mavsumning eng chiroyli goli"], quote: "«Gol urish — eng katta zavq.»",
  },
  7: {
    fullName: "Xusniddin Aliqulov", birthDate: "1998", birthPlace: "Toshkent", height: "1.84 m", position: "Himoyachi", currentClub: "Bunyodkor", number: 3, internationalGoals: 2, internationalCaps: 30,
    bio: ["Xusniddin Aliqulov — Bunyodkor klubining himoyachisi. U Osiyo Chempionlar Ligasida ajoyib o'ynab, xalqaro miqyosda tan olingan."],
    careerHighlights: ["🌏 Osiyo Chempionlar Ligasi yulduzi"], quote: "«Himoya — san'at.»",
  },
  8: {
    fullName: "Abbosbek Fayzullayev", birthDate: "2003", birthPlace: "Toshkent", height: "1.73 m", position: "Yarim himoyachi", currentClub: "Lans", number: 7, internationalGoals: 6, internationalCaps: 36,
    bio: ["Abbosbek Fayzullayev — Lans klubida Urunov bilan birga o'ynayotgan yosh iste'dod. U Yevropa ligasida dubl qilgan va Fransiya futbolida o'zini isbotlagan."],
    careerHighlights: ["⚽ Yevropa ligasida dubl"], quote: "«Yevropada o'ynash — orzuim edi.»",
  },
  9: {
    fullName: "Jamshid Iskandarov", birthDate: "1997", birthPlace: "Toshkent", height: "1.87 m", position: "Himoyachi", currentClub: "Paxtakor", number: 5, internationalGoals: 1, internationalCaps: 34,
    bio: ["Jamshid Iskandarov — Paxtakor klubining himoyachisi. Superligada eng yaxshi himoyachi unvonini qo'lga kiritgan."],
    careerHighlights: ["🛡️ Superliganing eng yaxshi himoyachisi"], quote: "«Paxtakor — mening hayotim.»",
  },
  10: {
    fullName: "Ulug'bek Xoshimov", birthDate: "1999", birthPlace: "Namangan", height: "1.76 m", position: "Yarim himoyachi", currentClub: "Navbahor", number: 6, internationalGoals: 4, internationalCaps: 28,
    bio: ["Ulug'bek Xoshimov — Navbahor klubining yarim himoyachisi. U bir o'yinda ikkita gol urgan va Superligada yuqori ko'rsatkichlarga erishgan."],
    careerHighlights: ["⚽ Bir o'yinda ikki gol"], quote: "«Har bir o'yin — yangi imkoniyat.»",
  },
  11: {
    fullName: "Doniyor To'rsunov", birthDate: "2000", birthPlace: "Toshkent", height: "1.80 m", position: "Hujumchi", currentClub: "Bunyodkor", number: 17, internationalGoals: 7, internationalCaps: 33,
    bio: ["Doniyor To'rsunov — Bunyodkor klubining hujumchisi. Mavsumning eng tez golini urgan va jamoa hujumida muhim rol o'ynaydi."],
    careerHighlights: ["⏱️ Mavsumning eng tez goli"], quote: "«Tezlik — mening qurolim.»",
  },
};

const FootballerPage = () => {
  const { id } = useParams();
  const playerId = parseInt(id || "1");
  const player = heroFootballers.find((p) => p.id === playerId) || heroFootballers[0];
  const portrait = portraits[(playerId - 1) % portraits.length];
  const data = playerBios[playerId] || playerBios[1];

  const otherPlayers = heroFootballers.filter((p) => p.id !== playerId).slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MatchTicker />

      <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Main Content */}
          <div className="lg:col-span-8">
            <article className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Back link */}
              <div className="px-5 sm:px-7 pt-5 pb-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-primary transition-colors font-body"
                >
                  <ArrowLeft size={14} /> Bosh sahifa
                </Link>
              </div>

              {/* Creative split: image left, info right */}
              <div className="flex flex-col sm:flex-row gap-0">
                {/* Left: Portrait */}
                <div className="sm:w-[45%] relative">
                  <div className="aspect-[3/4] sm:aspect-auto sm:h-full relative overflow-hidden">
                    <img
                      src={portrait}
                      alt={player.name}
                      className="w-full h-full object-cover"
                      style={{ minHeight: "460px" }}
                    />
                    {/* Subtle gradient on right edge for blending */}
                    <div
                      className="absolute inset-0 hidden sm:block pointer-events-none"
                      style={{
                        background: "linear-gradient(to right, transparent 70%, hsl(var(--card)) 100%)",
                      }}
                    />
                    {/* Bottom gradient for mobile */}
                    <div className="absolute inset-0 sm:hidden bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Decorative number watermark */}
                    <div
                      className="absolute -left-2 bottom-[-10px] font-heading font-black text-white/[0.08] select-none pointer-events-none"
                      style={{ fontSize: "clamp(140px, 20vw, 220px)", lineHeight: 1 }}
                    >
                      {data.number}
                    </div>
                  </div>
                </div>

                {/* Right: Player info */}
                <div className="sm:w-[55%] flex flex-col justify-center px-5 sm:px-7 py-6 sm:py-8">
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-primary-foreground"
                      style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
                    >
                      {data.position}
                    </span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-body">
                      <Shirt className="w-3 h-3" /> #{data.number}
                    </span>
                  </div>

                  {/* Name */}
                  <h1 className="text-3xl sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.02] tracking-[-0.04em] text-foreground mb-1">
                    {player.name}
                  </h1>
                  <p className="text-[13px] text-muted-foreground font-body mb-5">{data.fullName}</p>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { icon: <Calendar size={13} />, label: "Tug'ilgan sana", value: data.birthDate },
                      { icon: <MapPin size={13} />, label: "Tug'ilgan joy", value: data.birthPlace },
                      { icon: <Flag size={13} />, label: "Joriy klub", value: data.currentClub },
                      { icon: <Award size={13} />, label: "Bo'y", value: data.height },
                    ].map((item) => (
                      <div key={item.label} className="bg-muted/50 rounded-xl px-3 py-2.5 border border-border">
                        <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                          {item.icon}
                          <span className="text-[10px] font-body uppercase tracking-wider">{item.label}</span>
                        </div>
                        <p className="text-[13px] font-heading font-bold text-foreground leading-tight">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* International stats */}
                  <div className="flex gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg">⚽</span>
                      </div>
                      <div>
                        <div className="text-[20px] font-heading font-extrabold text-primary leading-none">{data.internationalGoals}</div>
                        <div className="text-[10px] text-muted-foreground font-body">Terma jamoa gollari</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg">🏟️</span>
                      </div>
                      <div>
                        <div className="text-[20px] font-heading font-extrabold text-primary leading-none">{data.internationalCaps}</div>
                        <div className="text-[10px] text-muted-foreground font-body">O'yinlar</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio section — full width below */}
              <div className="px-6 sm:px-8 py-8 border-t border-border">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-1 h-6 rounded-full bg-primary" />
                  <h2 className="text-[20px] font-heading font-extrabold text-foreground">
                    Biografiya
                  </h2>
                </div>

                <div className="space-y-4">
                  {data.bio.map((paragraph, i) => (
                    <p key={i} className="text-[16px] sm:text-[17px] leading-[1.9] text-muted-foreground font-body">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Pullquote */}
                <div className="my-8 pl-5 border-l-[3px] border-primary/40">
                  <Quote size={20} className="text-primary/40 mb-2" />
                  <p className="text-[16px] sm:text-[18px] font-heading font-bold text-foreground leading-[1.5] italic">
                    {data.quote}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-2 font-body">— {player.name}</p>
                </div>

                {/* Career highlights */}

                {/* Tags */}
                <div className="mt-7 pt-5 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {[data.currentClub.split(" ")[0], data.position, "O'zbekiston", "JCh-2026", "Terma jamoa", "Kapitan"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-muted text-muted-foreground border border-border hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Other players section */}
            <div className="mt-6 bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 pt-2 pb-2">
                <div className="section-title">
                  <span>Boshqa sportchilar</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 pb-5">
                {otherPlayers.map((p) => {
                  const idx = heroFootballers.findIndex((h) => h.id === p.id);
                  return (
                    <Link
                      key={p.id}
                      to={`/footballer/${p.id}`}
                      className="group rounded-xl overflow-hidden border border-border bg-background hover:border-primary transition-colors"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={portraits[idx]}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2.5">
                          <div className="text-highlight text-[9px] font-bold font-body uppercase tracking-wider">{p.club}</div>
                          <h3 className="text-white font-heading font-bold text-[13px] leading-tight mt-0.5">
                            {p.name}
                          </h3>
                        </div>
                        <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-heading font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <Target size={9} /> {p.goals}
                        </div>
                      </div>
                      <div className="px-2.5 py-2 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-body">{p.position}</span>
                        <span className="text-[10px] text-primary font-bold font-body flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                          Ko'rish <ArrowRight size={10} />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-4 space-y-4">
            <NewsFeed />
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-accent to-primary p-6 py-8 text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity">
              <div className="text-[10px] uppercase font-heading font-bold tracking-wider opacity-80 mb-1">Reklama</div>
              <h3 className="font-heading font-extrabold text-base leading-tight mb-2">
                🏆 Superliga 2026 — yangi mavsum!
              </h3>
              <p className="text-[12px] font-body opacity-80 mb-3">
                O'zbekiston Superligasi o'yinlarini jonli tomosha qiling
              </p>
              <div className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-[12px] font-bold font-heading text-center py-2 rounded-lg">
                Batafsil →
              </div>
            </div>
            
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FootballerPage;
