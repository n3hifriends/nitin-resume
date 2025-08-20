import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Download, ArrowRight, Award, Building2, BriefcaseBusiness, Cpu, Layers, Rocket, Star, Trophy, ChevronRight, Link as LinkIcon } from "lucide-react";

// === CONFIG ===
const PROFILE = {
  name: "Nitin Kalokhe",
  title: "Heads - Mobile Applications",
  tagline:
    "Driving innovation in user-centric mobile solutions across React Native, Android, iOS and cloud-native backends.",
  email: "nitin3kalokhe@gmail.com",
  phone: "+91 9762279667",
  location: "Pune, India",
  linkedin: "https://www.linkedin.com/in/nitin-kalokhe-59006629",
  github: "https://github.com/", // optional
  resumePDF: "resume/NitinKalokhe_13Yrs.pdf", // Put your PDF in /public/resume and keep this path
  yearsExp: 13,
  teamSize: 45,
  apps10L: 2,
};

const TECH = {
  languages: ["Java", "Kotlin", "Swift", "TypeScript", "JavaScript"],
  mobile: ["React Native", "Android", "iOS", "Hermes", "Maps", "Animations"],
  backend: ["Spring Boot", "Spring Cloud", "MySQL", "Hibernate", "Redis", "Kafka"],
  tooling: [
    "Keycloak",
    "OAuth2.0",
    "Firebase",
    "Dynatrace",
    "UserExperior",
    "pCloudy",
    "MoEngage",
    "Adobe Analytics",
    "AEM",
    "AppsFlyer",
    "JIRA",
    "Bitbucket",
  ],
};

const APPS = [
  { name: "Digit Insurance", platform: "Play Store & App Store", href: "https://play.google.com/store/apps/details?id=com.godigit.digit&hl=en_IN&gl=US" },
  { name: "Digit Partner", platform: "App Store", href: "#" },
  { name: "Digit Quick Scan", platform: "Play Store & App Store", href: "#" },
  { name: "Digit Workshop", platform: "Play Store", href: "#" },
  { name: "Insurance Wallet", platform: "Play Store & App Store", href: "#" },
  { name: "IInspect", platform: "Play Store", href: "#" },
  { name: "Bajaj Allianz GIC", platform: "Play Store", href: "https://play.google.com/store/apps/details?id=com.ba.cp.controller&hl=en_IN&gl=US" },
];

const ROLES = [
  {
    org: "Digit Insurance",
    period: "2019 - Present",
    title: "Heads - Mobile Applications (Director-level)",
    bullets: [
      "Scaled team from 2 → 45; built hiring loops and mentorship programs.",
      "End-to-end ownership of mobile roadmap, architecture, and delivery.",
      "Drove RN modernization (Hermes, navigation, state, perf & security).",
      "Multi-flavor apps, analytics, growth & user engagement at scale.",
    ],
  },
  {
    org: "Bajaj Allianz General Insurance",
    period: "2013 - 2019",
    title: "Senior Mobile Engineer & Tech Lead",
    bullets: [
      "Android & iOS apps with maps, geofence, secure storage, payments.",
      "Internal productivity apps; CI/CD and quality gates.",
    ],
  },
  {
    org: "EasyReach Solutions / Former Mobileware",
    period: "2012 - 2013",
    title: "Mobile Engineer (BlackBerry)",
    bullets: [
      "Frameworks, custom layouts, and payment gateway integrations.",
    ],
  },
];

const AWARDS = [
  { name: "Wall of Awesomeness (x2)", org: "Digit Insurance" },
  { name: "Tech Titan", org: "Digit Insurance" },
  { name: "Excellence Award", org: "Bajaj Allianz" },
];

const EDUCATION = [
  { degree: "MS (Pursuing)", school: "Woolf University, Europe" },
  { degree: "Scaler - Backend Development", school: "Scaler" },
  { degree: "MBA - Information Technology", school: "—" },
  { degree: "MBA - Software Project Management", school: "—" },
  { degree: "CDAC - WiMC", school: "CDAC" },
  { degree: "BE - E&TC", school: "—" },
];

const badges = (arr) => (
  <div className="flex flex-wrap gap-2">
    {arr.map((t) => (
      <span key={t} className="px-3 py-1 rounded-full bg-muted text-sm">
        {t}
      </span>
    ))}
  </div>
);

function Stat({ value, label }) {
  return (
    <motion.div
      className="p-5 rounded-2xl bg-card shadow-sm border"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="text-4xl font-semibold">{value}</div>
      <div className="text-muted-foreground mt-1">{label}</div>
    </motion.div>
  );
}

function Section({ id, title, icon, children }) {
  return (
    <section id={id} className="py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          {icon}
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function NavItem({ to, children, active, onClick }) {
  return (
    <a
      href={to}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`px-3 py-2 rounded-xl transition-colors ${active ? "bg-accent" : "hover:bg-accent"}`}
    >
      {children}
    </a>
  );
}

function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const [currentSection, setCurrentSection] = useState("top");
  const sectionIds = ["experience", "portfolio", "tech", "leadership", "awards", "education"];

  useEffect(() => {
    const handler = () => {
      const offsets = sectionIds.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id, top: Math.abs(rect.top - 80) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setCurrentSection(offsets[0]?.id || "top");
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  const smoothTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroWords = useMemo(() => ["Strategy", "Architecture", "Delivery", "Scale", "Security"], []);
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % heroWords.length), 1800);
    return () => clearInterval(id);
  }, [heroWords.length]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-bold tracking-tight text-lg">
            Nitin Kalokhe
          </a>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <NavItem to="#experience" active={currentSection === "experience"} onClick={() => smoothTo("experience")}>
              Experience
            </NavItem>
            <NavItem to="#portfolio" active={currentSection === "portfolio"} onClick={() => smoothTo("portfolio")}>
              Portfolio
            </NavItem>
            <NavItem to="#tech" active={currentSection === "tech"} onClick={() => smoothTo("tech")}>
              Tech
            </NavItem>
            <NavItem to="#leadership" active={currentSection === "leadership"} onClick={() => smoothTo("leadership")}>
              Leadership
            </NavItem>
            <NavItem to="#awards" active={currentSection === "awards"} onClick={() => smoothTo("awards")}>
              Awards
            </NavItem>
            <NavItem to="#education" active={currentSection === "education"} onClick={() => smoothTo("education")}>
              Education
            </NavItem>
            <a
              href={PROFILE.resumePDF}
              className="ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2 border font-medium hover:bg-accent"
              download
            >
              <Download className="w-4 h-4" /> Resume
            </a>
          </nav>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="md:ml-4 rounded-xl border px-3 py-2 text-sm hover:bg-accent"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
          <div className="absolute -left-32 -top-24 h-96 w-96 bg-primary/20 blur-3xl rounded-full" />
          <div className="absolute right-0 top-24 h-96 w-96 bg-secondary/20 blur-3xl rounded-full" />
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 90 }}
                className="text-3xl md:text-5xl font-extrabold tracking-tight"
              >
                {PROFILE.name}
              </motion.h1>
              <p className="mt-3 text-lg md:text-xl text-muted-foreground">{PROFILE.title}</p>
              <div className="mt-6 text-lg">
                <span className="opacity-80">Focused on </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="font-semibold"
                  >
                    {heroWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="opacity-80"> at scale.</span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:bg-accent">
                  <Mail className="w-4 h-4" /> {PROFILE.email}
                </a>
                <a
                  href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:bg-accent"
                >
                  <Phone className="w-4 h-4" /> {PROFILE.phone}
                </a>
                <a href={PROFILE.linkedin} target="_blank" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:bg-accent">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Stat value={`${PROFILE.yearsExp}+`} label="Years experience" />
                <Stat value={`${PROFILE.teamSize}+`} label="Team scaled & led" />
                <Stat value={`${PROFILE.apps10L}+`} label=">=10L+ user apps" />
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
              <div className="rounded-3xl border bg-card p-6 shadow-sm">
                <div className="text-sm text-muted-foreground">Key Outcomes</div>
                <ul className="mt-3 space-y-3 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1" />Optimized API response times ~500ms → ~20ms with Redis caching.
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1" />Event-driven email service using Kafka for cross-service scale.
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1" />AWS-hosted microservices (EB, RDS, CloudWatch) for reliability.
                  </li>
                </ul>
                <a href="#portfolio" className="mt-6 inline-flex items-center gap-2 text-primary font-medium">
                  Explore portfolio <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <Section id="experience" title="Experience" icon={<BriefcaseBusiness className="w-6 h-6" />}>
        <div className="grid md:grid-cols-3 gap-6">
          {ROLES.map((r) => (
            <motion.div
              key={r.org}
              className="rounded-2xl border bg-card p-5 shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5" />
                <div>
                  <div className="font-semibold">{r.org}</div>
                  <div className="text-xs text-muted-foreground">{r.period}</div>
                </div>
              </div>
              <div className="mt-3 font-medium">{r.title}</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {r.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <ChevronRight className="w-4 h-4" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Portfolio */}
      <Section id="portfolio" title="Portfolio & Apps" icon={<Rocket className="w-6 h-6" />}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {APPS.map((a) => (
            <motion.a
              key={a.name}
              href={a.href}
              target="_blank"
              className="group rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{a.name}</div>
                <LinkIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{a.platform}</div>
              <div className="mt-4 text-sm">At-scale deployments, analytics, and engagement.</div>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Tech */}
      <Section id="tech" title="Tech Stack" icon={<Cpu className="w-6 h-6" />}>
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-sm font-semibold">Mobile</div>
            {badges(TECH.mobile)}
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold">Backend</div>
            {badges(TECH.backend)}
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold">Tooling & Services</div>
            {badges(TECH.tooling)}
          </div>
        </div>
      </Section>

      {/* Leadership */}
      <Section id="leadership" title="Leadership & Impact" icon={<Layers className="w-6 h-6" />}>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div className="rounded-2xl border bg-card p-5 shadow-sm" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
            <div className="font-semibold mb-2">What I lead</div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex gap-2">
                <ChevronRight className="w-4 h-4" />Strategy, roadmap, resourcing & OKRs
              </li>
              <li className="flex gap-2">
                <ChevronRight className="w-4 h-4" />Architecture reviews, design governance, security posture
              </li>
              <li className="flex gap-2">
                <ChevronRight className="w-4 h-4" />Quality gates, performance budgets, release management
              </li>
              <li className="flex gap-2">
                <ChevronRight className="w-4 h-4" />Vendor & stakeholder management, cross-functional alignment
              </li>
            </ul>
          </motion.div>
          <motion.div className="rounded-2xl border bg-card p-5 shadow-sm" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
            <div className="font-semibold mb-2">Signature projects</div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex gap-2">
                <ChevronRight className="w-4 h-4" />Super-app foundation with multi-product flavors
              </li>
              <li className="flex gap-2">
                <ChevronRight className="w-4 h-4" />Microservices on AWS EB + RDS, evented email via Kafka
              </li>
              <li className="flex gap-2">
                <ChevronRight className="w-4 h-4" />Analytics & growth stack (MoEngage, AppsFlyer, Adobe)
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Awards */}
      <Section id="awards" title="Awards" icon={<Trophy className="w-6 h-6" />}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AWARDS.map((a) => (
            <motion.div key={a.name} className="rounded-2xl border bg-card p-5 shadow-sm" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5" />
                <div>
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.org}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education" icon={<Star className="w-6 h-6" />}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EDUCATION.map((e) => (
            <motion.div key={e.degree} className="rounded-2xl border bg-card p-5 shadow-sm" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
              <div className="font-semibold">{e.degree}</div>
              <div className="text-sm text-muted-foreground">{e.school}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl border bg-card p-8 md:p-12 shadow-sm text-center">
            <h3 className="text-2xl md:text-3xl font-bold">Let's build the next 10-million-user experience.</h3>
            <p className="mt-2 text-muted-foreground">Open to Director/Head of Mobile roles • Pune/Remote • Notice active</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 hover:bg-accent">
                <Mail className="w-4 h-4" /> Email me
              </a>
              <a href={PROFILE.linkedin} target="_blank" className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 hover:bg-accent">
                <Linkedin className="w-4 h-4" /> Connect on LinkedIn
              </a>
              <a href={PROFILE.resumePDF} download className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 hover:bg-accent">
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
          <div className="opacity-80">Built with React • Tailwind • Framer Motion.</div>
        </div>
      </footer>
    </main>
  );
}
