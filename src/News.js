import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./Components/Navbar";

const CATEGORIES = [
  "All",
  "Health",
  "Lifestyle",
  "Government",
  "Technology",
  "Environment",
];

const NEWS_DATA = [
  {
    id: "health-1",
    category: "Health",
    title: "National mission expands preventive screenings in districts",
    summary:
      "Mobile clinics begin weekend health camps to spot lifestyle risks.",
    details:
      "The Health Ministry is rolling out mobile vans across tier-2 and tier-3 districts to conduct free screenings for blood pressure, blood sugar, and anaemia. Officials say the move targets early detection of hypertension and diabetes, with on-the-spot counselling and referrals to nearby wellness centres.",
  },
  {
    id: "health-2",
    category: "Health",
    title: "Ayushman Bharat network adds more digital health IDs",
    summary: "Hospitals onboard faster patient check-in through ABDM QR codes.",
    details:
      "Over 200 government and private hospitals in state capitals have adopted the Ayushman Bharat Digital Mission QR check-in, allowing patients to pull up records in seconds. Doctors note shorter queues and fewer paper forms as labs and pharmacies plug into the same digital rail.",
  },
  {
    id: "health-3",
    category: "Health",
    title: "Flu season alert: metro cities step up vaccination drives",
    summary:
      "Civic bodies push awareness in schools and offices before peak season.",
    details:
      "Municipal corporations in Delhi, Mumbai, and Bengaluru are partnering with RWAs and offices to host on-site vaccination camps. Public advisories highlight masking in crowded spaces, ventilation, and symptom-based leave to prevent outbreaks during the seasonal flu surge.",
  },
  {
    id: "lifestyle-1",
    category: "Lifestyle",
    title: "Car-free Sundays grow to more neighbourhoods",
    summary: "Citizens enjoy pop-up cycling tracks and local artisan markets.",
    details:
      "Following strong participation in Chennai and Pune, more wards in Hyderabad and Ahmedabad are cordoning select stretches for pedestrians and cyclists every Sunday morning. Local businesses are hosting farmer markets and music corners, making the initiative both a climate and community win.",
  },
  {
    id: "lifestyle-2",
    category: "Lifestyle",
    title: "Workcation hotspots lure remote teams to the hills",
    summary: "Homestays bundle Wi‑Fi upgrades and meal plans for longer stays.",
    details:
      "Co-working collectives in Uttarakhand and Himachal are adding dedicated power backups, enterprise Wi‑Fi, and ergonomic setups to attract remote teams for week-long sprints. Hosts report higher off-season occupancy as companies mix work with treks and local cultural trails.",
  },
  {
    id: "lifestyle-3",
    category: "Lifestyle",
    title: "Metro cities see rise in micro fitness studios",
    summary: "Neighbourhood gyms add yoga, mobility, and recovery pods.",
    details:
      "Boutique studios are launching 30-minute mobility sessions and guided cold therapy to cater to young professionals. Trainers say shorter, science-backed routines are helping members stay consistent between office commutes and hybrid schedules.",
  },
  {
    id: "government-1",
    category: "Government",
    title: "Unified logistics platform enters wider pilot",
    summary:
      "States begin linking warehouse and freight data for faster permits.",
    details:
      "The commerce ministry's ULIP stack is expanding to additional freight corridors, letting transporters fetch e-permits and track consignments through a single dashboard. Early adopters report quicker turnarounds at checkposts and fewer manual filings.",
  },
  {
    id: "government-2",
    category: "Government",
    title: "State budgets reserve more for green mobility",
    summary: "EV bus procurement and charging hubs get priority lines.",
    details:
      "Several states have earmarked funds to add electric buses on high-density urban routes while subsidising depot charging. Officials expect the push to cut fuel costs and pollution, with sunset clauses that taper incentives as adoption rises.",
  },
  {
    id: "government-3",
    category: "Government",
    title: "Digital service kiosks added in gram panchayats",
    summary:
      "Residents can print land records and certificates without travel.",
    details:
      "Common service centres in rural blocks are being upgraded with biometric validation and multilingual interfaces. The goal is to reduce dependency on district offices for income certificates, land extracts, and pension inquiries, saving travel time and costs for villagers.",
  },
  {
    id: "technology-1",
    category: "Technology",
    title: "ISRO tests reusable launcher systems for upcoming missions",
    summary: "Engineers simulate sea recovery to cut future launch costs.",
    details:
      "A series of splash-down trials in the Bay of Bengal are validating parachute systems for small-stage recovery. Project leads say the data will guide hardware tweaks ahead of technology demonstration flights planned for the next launch window.",
  },
  {
    id: "technology-2",
    category: "Technology",
    title: "Unified payments cross-border pilot expands to new corridors",
    summary: "Banks integrate UPI-like rails for low-value remittances.",
    details:
      "NPCI International is onboarding more partner banks to enable instant, low-fee transfers for students and small businesses. The expanded corridors aim to reduce remittance friction while keeping compliance checks automated and transparent.",
  },
  {
    id: "technology-3",
    category: "Technology",
    title: "Startups deploy AI copilots in public service apps",
    summary: "Voice bots in regional languages guide citizens through forms.",
    details:
      "Civic apps in Karnataka and Maharashtra are testing conversational assistants that can auto-fill forms and explain schemes in Kannada and Marathi. Early metrics show higher completion rates and fewer manual support calls for common queries.",
  },
  {
    id: "environment-1",
    category: "Environment",
    title: "Early heat alerts trigger city-level cooling plans",
    summary: "Urban local bodies prepare misting tents and shaded bus bays.",
    details:
      "IMD's early warnings are prompting municipal teams to activate ward-level heat action plans. Water kiosks, shaded transit stops, and extended clinic hours are being set up to protect outdoor workers and commuters ahead of peak summer.",
  },
  {
    id: "environment-2",
    category: "Environment",
    title: "Coastal states tighten mangrove protection zones",
    summary: "Fresh satellite mapping draws clearer boundaries for buffers.",
    details:
      "Forest departments are using high-resolution imagery to mark no-go areas around mangrove belts, limiting construction while allowing community-led eco-tourism. The move is expected to improve flood resilience and revive fish breeding grounds.",
  },
  {
    id: "environment-3",
    category: "Environment",
    title: "Cities pilot smart composters in markets",
    summary: "IoT-enabled bins turn vegetable waste into manure on-site.",
    details:
      "Market boards in Kochi, Indore, and Nagpur are installing smart bins that monitor moisture and temperature to speed up composting. The pilot aims to divert tonnes of wet waste from landfills while supplying nearby parks with steady manure.",
  },
  {
    id: "health-4",
    category: "Health",
    title: "Tele-ICU network connects district hospitals overnight",
    summary: "Specialists guide critical care through high-definition links.",
    details:
      "A new tele-ICU mesh is letting intensivists from teaching hospitals monitor critical patients in remote districts after hours. Nurses can escalate vitals in real time, while doctors issue protocols for stabilisation before transfers.",
  },
  {
    id: "lifestyle-4",
    category: "Lifestyle",
    title: "Craft clusters go digital with weekend maker fairs",
    summary: "Artisans livestream workshops and accept UPI orders instantly.",
    details:
      "Handloom and pottery clusters in Odisha and Rajasthan are hosting hybrid fairs where artisans stream quick tutorials and sell limited batches online. Organisers say digital slots help artisans reach younger buyers without leaving their workshops for long periods.",
  },
  {
    id: "government-4",
    category: "Government",
    title: "Open data push adds ward-level dashboards",
    summary: "Civic APIs share updates on water, waste, and streetlights.",
    details:
      "Urban data cells are publishing machine-readable feeds on ward services, enabling local startups to build citizen dashboards. The transparency drive aims to crowdsource fault reporting and reduce response times for routine maintenance.",
  },
  {
    id: "technology-4",
    category: "Technology",
    title: "Semiconductor skilling labs open in polytechnics",
    summary:
      "Students get hands-on with chip design toolchains and clean rooms.",
    details:
      "New labs in Telangana, Gujarat, and Karnataka are equipping diploma students with EDA tools and wafer handling basics. Industry partners are co-designing modules to align with the upcoming fabrication ecosystem and packaging units.",
  },
  {
    id: "environment-4",
    category: "Environment",
    title: "River clean-up drives deploy floating trash barriers",
    summary: "Low-cost booms trap plastic before it moves downstream.",
    details:
      "Municipalities along the Yamuna and Sabarmati are anchoring floating barriers near major drains, allowing sanitation crews to collect plastics daily. The initiative is paired with awareness campaigns that reward households for reducing single-use plastics.",
  },
];

const createSeededRandom = (seed) => {
  let value = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return () => {
    const x = Math.sin(value++) * 10000;
    return x - Math.floor(x);
  };
};

function News() {
  const [todayKey, setTodayKey] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [dailyNews, setDailyNews] = useState([]);
  const [activeNews, setActiveNews] = useState(null);
  const [pinnedNews, setPinnedNews] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const lastKeyRef = useRef(todayKey);

  useEffect(() => {
    const refreshNews = (dateKey) => {
      const seededRandom = createSeededRandom(dateKey);
      const shuffled = [...NEWS_DATA].sort(() => seededRandom() - 0.5);
      const todaysPick = shuffled.slice(0, 8);
      setDailyNews(todaysPick);
      setActiveNews(todaysPick[0]);
      setPinnedNews((prev) => {
        if (!prev) return todaysPick[0];
        return todaysPick.find((item) => item.id === prev.id) || todaysPick[0];
      });
    };

    refreshNews(todayKey);
  }, [todayKey]);

  useEffect(() => {
    const watcher = setInterval(() => {
      const key = new Date().toISOString().slice(0, 10);
      if (key !== lastKeyRef.current) {
        lastKeyRef.current = key;
        setTodayKey(key);
      }
    }, 60 * 1000);

    return () => clearInterval(watcher);
  }, []);

  const visibleNews = useMemo(() => {
    if (selectedCategory === "All") return dailyNews;
    return dailyNews.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, dailyNews]);

  return (
    <>
    <Navbar />
      <div className="news-page my-5">
        <div className="container py-4">
          <div className="news-hero shadow-sm mb-4">
            <div>
              <p className="text-uppercase small mb-1 text-muted">
                Daily India News • Auto-refreshes by date
              </p>
              <h2 className="fw-semibold mb-0">Today's Top Picks</h2>
              <p className="text-muted mb-0">
                Fresh mix of Health, Lifestyle, Government, Technology, and
                Environment headlines.
              </p>
            </div>
            <div className="date-chip text-center">
              <div className="small text-muted">Date</div>
              <div className="fw-bold">{todayKey}</div>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`category-pill ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="row g-3">
            {visibleNews.map((item) => (
              <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                <div className="card news-card h-100">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-light text-dark">
                        {item.category}
                      </span>
                      <span className="news-dot" />
                    </div>
                    <h5 className="fw-semibold mb-2">{item.title}</h5>
                    <p className="text-muted small flex-grow-1">
                      {item.summary}
                    </p>

                    <div className="d-flex gap-2 flex-wrap mt-3">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setActiveNews(item)}
                      >
                        View details
                      </button>
                      <button
                        className={`btn btn-sm ${
                          pinnedNews?.id === item.id
                            ? "btn-success"
                            : "btn-outline-success"
                        }`}
                        onClick={() => setPinnedNews(item)}
                      >
                        {pinnedNews?.id === item.id ? "Pinned" : "Pin"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {visibleNews.length === 0 && (
              <div className="col-12">
                <div className="alert alert-light border">
                  No stories in this category today. Try another filter.
                </div>
              </div>
            )}
          </div>

          <div className="row g-3 align-items-stretch mt-4">
            <div className="col-12 col-lg-8">
              <div className="card news-detail-card h-100">
                <div className="card-body">
                  <p className="text-uppercase small text-muted mb-1">
                    Full Story
                  </p>
                  {activeNews ? (
                    <>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="badge bg-primary-subtle text-primary fw-semibold">
                          {activeNews.category}
                        </span>
                        <span className="dot-divider" />
                        <span className="small text-muted">Daily rotation</span>
                      </div>
                      <h4 className="fw-semibold">{activeNews.title}</h4>
                      <p className="text-muted mb-2">{activeNews.summary}</p>
                      <p className="mb-3">{activeNews.details}</p>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => setActiveNews(null)}
                        >
                          Clear selection
                        </button>
                        <button
                          className={`btn btn-sm ${
                            pinnedNews?.id === activeNews.id
                              ? "btn-success"
                              : "btn-outline-success"
                          }`}
                          onClick={() => setPinnedNews(activeNews)}
                        >
                          {pinnedNews?.id === activeNews.id
                            ? "Pinned below"
                            : "Pin this"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-muted">
                      Select any card to read the full story.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card tips-card h-100">
                <div className="card-body">
                  <p className="text-uppercase small text-muted mb-1">
                    Daily tips
                  </p>
                  <h6 className="fw-semibold">Stay informed, stay ready</h6>
                  <ul className="list-unstyled mt-3 mb-0 text-muted small">
                    <li>
                      • Tap any headline to load its full summary instantly.
                    </li>
                    <li>• Use Pin to keep one important story highlighted.</li>
                    <li>• Content reshuffles automatically every new day.</li>
                    <li>• Filters help you focus on one category at a time.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="pinned-section mt-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Pinned for today</h5>
              <span className="small text-muted">
                Auto-refreshes with new date
              </span>
            </div>
            {pinnedNews ? (
              <div className="card pinned-card">
                <div className="card-body d-flex flex-column flex-md-row align-items-start gap-3">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="badge bg-success-subtle text-success fw-semibold">
                        {pinnedNews.category}
                      </span>
                      <span className="dot-divider" />
                      <span className="small text-muted">
                        Highlighted story
                      </span>
                    </div>
                    <h5 className="fw-semibold mb-2">{pinnedNews.title}</h5>
                    <p className="text-muted mb-1">{pinnedNews.summary}</p>
                    <p className="mb-0">{pinnedNews.details}</p>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => setPinnedNews(null)}
                  >
                    Unpin
                  </button>
                </div>
              </div>
            ) : (
              <div className="alert alert-light border">
                Pin a story to keep it handy here.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
