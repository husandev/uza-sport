import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trophy, MapPin, Shirt, Target, ArrowRight, Quote } from "lucide-react";
import Header from "@/components/Header";
import MatchTicker from "@/components/MatchTicker";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";
import HeroFootballers from "@/components/HeroFootballers";
import { heroFootballers } from "@/data/mockData";
import footballer1 from "@/assets/footballer-1.jpg";
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

const playerBios: Record<number, string> = {
  1: "Eldor Shomurodov — O'zbekiston futbolining eng yorqin yulduzlaridan biri. U Italiya Seriya A da Roma klubida o'ynaydi va terma jamoa hujum chizig'ining asosiy futbolchisi hisoblanadi. 2026 yilgi Jahon chempionatida Argentinaga qarshi tarixiy gol urgan Shomurodov, o'zbek futbolining jahon arenasidagi eng muhim lahzasini yaratdi. Uning tezligi, kuchi va gol urish mahorati uni dunyodagi eng xavfli hujumchilardan biriga aylantirgan.",
  2: "Abduqodir Xusanov — Manchester Siti safida o'ynayotgan yosh himoyachi. FIFA statistikasiga ko'ra, u JCh-2026 da eng yaxshi himoyachi sifatida tan olingan. Pep Guardiola uni «kelajakning Sergio Ramosi» deb atagan. Xusanovning tezligi, aqli va kuchi — bu kombinatsiya juda kam uchraydi.",
  3: "Oston Urunov — Fransiya Ligue 1 dagi Lans klubining yarim himoyachisi. U terma jamoa o'rtasida muhim bog'lovchi rolini bajaradi. Urunov tez va texnik futbolchi bo'lib, hujumga ham, himoyaga ham bir xil darajada hissa qo'shadi.",
  4: "Otabek Shukurov — AGMK klubining kapitan va asosiy yarim himoyachisi. U O'zbekiston Superligasida ko'p yillik tajribaga ega va terma jamoaning doimiy a'zosi hisoblanadi.",
  5: "Ignatiy Nesterov — Paxtakor klubining darvozaboni. U Superligada eng ko'p clean sheet qilgan darvozabon sifatida tan olingan. Uning reflesklari va pozitsiya tanlash mahorati ajoyib.",
  6: "Jasur Yaxshiboyev — Nasaf klubining hujumchisi. U mavsumning eng chiroyli golini urgan futbolchi sifatida e'tirof etildi. Yaxshiboyev tezligi va finishyor sifatlari bilan ajralib turadi.",
  7: "Xusniddin Aliqulov — Bunyodkor klubining himoyachisi. U Osiyo Chempionlar Ligasida ajoyib o'ynab, xalqaro miqyosda ham tan olingan futbolchi.",
  8: "Abbosbek Fayzullayev — Lans klubida Urunov bilan birga o'ynayotgan yosh iste'dod. U Yevropa ligasida dubl qilgan va Fransiya futbolida o'zini isbotlagan.",
  9: "Jamshid Iskandarov — Paxtakor klubining himoyachisi. Superligada eng yaxshi himoyachi unvonini qo'lga kiritgan va terma jamoaning ishonchli qalqoni.",
  10: "Ulug'bek Xoshimov — Navbahor klubining yarim himoyachisi. U bir o'yinda ikkita gol urgan va Superligada yuqori ko'rsatkichlarga erishgan.",
  11: "Doniyor To'rsunov — Bunyodkor klubining hujumchisi. Mavsumning eng tez golini urgan va jamoa hujumida muhim rol o'ynaydi.",
};


const FootballerPage = () => {
  const { id } = useParams();
  const playerId = parseInt(id || "1");
  const player = heroFootballers.find((p) => p.id === playerId) || heroFootballers[0];
  const portrait = portraits[(playerId - 1) % portraits.length];
  const bio = playerBios[playerId] || playerBios[1];

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
              {/* Creative hero: diagonal split layout */}
              <div className="relative overflow-hidden" style={{ minHeight: "420px" }}>
                {/* Full-bleed image */}
                <img
                  src={portrait}
                  alt={player.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Artistic overlay — diagonal gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary) / 0.92) 0%, hsl(var(--primary) / 0.7) 35%, transparent 60%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Content on top of image */}
                <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-8" style={{ minHeight: "420px" }}>
                  {/* Top: back + badges */}
                  <div>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-1.5 text-[12px] text-white/70 hover:text-white transition-colors font-body mb-6"
                    >
                      <ArrowLeft size={14} /> Bosh sahifa
                    </Link>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-primary-foreground"
                        style={{ background: "hsla(0, 0%, 100%, 0.2)", backdropFilter: "blur(8px)", border: "1px solid hsla(0, 0%, 100%, 0.2)" }}
                      >
                        {player.position}
                      </span>
                      <span className="text-[11px] text-white/80 flex items-center gap-1">
                        <Shirt className="w-3 h-3" /> #{player.number}
                      </span>
                      <span className="text-[11px] text-white/80 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {player.club}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: name + headline */}
                  <div className="max-w-md">
                    <h1 className="text-3xl sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white mb-3 drop-shadow-lg">
                      {player.name}
                    </h1>
                    <p className="text-[15px] leading-[1.6] text-white/75 font-body">
                      {player.headline}
                    </p>
                  </div>
                </div>

                {/* Decorative number watermark */}
                <div
                  className="absolute -right-4 bottom-[-20px] font-heading font-black text-white/[0.06] select-none pointer-events-none"
                  style={{ fontSize: "clamp(180px, 25vw, 300px)", lineHeight: 1 }}
                >
                  {player.number}
                </div>
              </div>

              {/* Bio section */}
              <div className="px-6 sm:px-8 py-8">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-1 h-6 rounded-full bg-primary" />
                  <h2 className="text-[20px] font-heading font-extrabold text-foreground">
                    Biografiya
                  </h2>
                </div>

                <p className="text-[16px] sm:text-[17px] leading-[1.9] text-muted-foreground font-body">
                  {bio}
                </p>

                {/* Pullquote */}
                <div className="my-7 pl-5 border-l-[3px] border-primary/40">
                  <Quote size={20} className="text-primary/40 mb-2" />
                  <p className="text-[16px] sm:text-[18px] font-heading font-bold text-foreground leading-[1.5] italic">
                    «Biz har bir o'yinda tarixni yozmoqdamiz. Terma jamoa uchun o'ynash — eng katta sharaf.»
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-2 font-body">— {player.name}</p>
                </div>

                {/* Tags */}
                <div className="mt-6 pt-5 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {[player.club, player.position, "O'zbekiston", "JCh-2026", "Terma jamoa"].map((tag) => (
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
                        {/* Goals badge */}
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
            <HeroFootballers />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FootballerPage;
