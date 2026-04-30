// Portfolio sections — React components
const { useState, useEffect, useRef, useCallback } = React;

// ---------- Mini icons ----------
const PIcon = ({ d, size = 16, strokeWidth = 1.75 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {d.split('|').map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const ICONS = {
  arrow: "M5 12h14|m12 5 7 7-7 7",
  arrowUpRight: "M7 17 17 7|M7 7h10v10",
  sun: "M12 4V2|M12 22v-2|m4.93 4.93-1.41 1.41|m19.07 19.07-1.41-1.41|M2 12h2|M22 12h-2|m4.93 19.07 1.41-1.41|m19.07 4.93-1.41 1.41|M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z",
  sparkle: "M12 3v18|M3 12h18|m5 5 14 14|m19 5L5 19",
  external: "M7 7h10v10|M7 17 17 7",
  download: "M12 3v12|m7 10 5 5 5-5|M3 21h18",
  mail: "M3 8 12 13l9-5|M3 6h18v12H3z",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71|M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
};

// ---------- Top Nav ----------
function Nav({ lang, setLang, theme, setTheme, t, currentPage = "home" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "works", label: t.nav.works },
    { id: "skills", label: t.nav.skills },
    { id: "contact", label: t.nav.contact },
  ];
  return (
    <nav className="nav" data-scrolled={scrolled}>
      <a href="index.html" className="nav-brand">
        <span className="dot"></span>
        Kris Lu
      </a>
      {currentPage === "home" && (
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className="nav-link">{l.label}</a>
          ))}
        </div>
      )}
      <div className="nav-actions">
        <div className="lang-toggle" role="tablist">
          <button data-active={lang === "zh"} onClick={() => setLang("zh")}>中</button>
          <button data-active={lang === "en"} onClick={() => setLang("en")}>EN</button>
        </div>
        <button className="icon-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="theme">
          <PIcon d={theme === "light" ? ICONS.moon : ICONS.sun} size={16} />
        </button>
      </div>
    </nav>
  );
}

// ---------- Hero ----------
function Hero({ t }) {
  const orbRef = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg"></div>
      <div className="hero-orb hero-orb-1" ref={orbRef}></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="container hero-inner">
        <div className="hero-eyebrow">
          <span className="pulse"></span>
          {t.hero.eyebrow}
        </div>
        <h1 className="hero-title">
          {t.hero.title_1}<br />
          <span className="accent">{t.hero.title_2}</span> {t.hero.title_3}<br />
          {t.hero.title_4}.
        </h1>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-meta">
          {t.hero.meta.map((m, i) => (
            <div className="hero-meta-item" key={i}>
              <span className="k">{m.k}</span>
              <span className="v">{m.v}</span>
            </div>
          ))}
        </div>
        <div className="hero-cta">
          <a href="#works" className="button button--primary button--lg">
            {t.hero.cta_primary}
            <PIcon d={ICONS.arrow} size={16} />
          </a>
          <a href="#contact" className="button button--outline button--lg">{t.hero.cta_secondary}</a>
        </div>
      </div>
      <div className="hero-scroll"><span>SCROLL</span><span className="line"></span></div>
    </section>
  );
}

// ---------- About ----------
function About({ t }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-portrait">
            <div className="about-portrait-inner">
              <img src="uploads/kris-portrait.png" alt="Kris Lu" style={{ width: "100%", display: "block", borderRadius: "inherit" }} />
            </div>
            <div className="badge">
              <span style={{ color: "var(--muted-foreground)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>Portrait</span>
              <span style={{ color: "var(--muted-foreground)" }}>placeholder</span>
            </div>
          </div>
          <div>
            <span className="section-label">{t.about.label}</span>
            <p className="about-bio" dangerouslySetInnerHTML={{ __html: t.about.bio_html }}></p>
            <p className="about-bio" style={{ marginTop: 24, fontSize: "clamp(16px, 1.4vw, 18px)", color: "var(--muted-foreground)" }}>{t.about.bio_2}</p>
            {t.about.now && (
              <div style={{
                marginTop: 28,
                padding: "18px 22px",
                background: "var(--accent-soft)",
                borderRadius: "var(--radius)",
                borderLeft: "3px solid var(--accent)"
              }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent-soft-foreground)",
                  fontWeight: 700,
                  marginBottom: 10
                }}>
                  <PIcon d={ICONS.sparkle} size={12} strokeWidth={2.2} />
                  {t.about.now.label}
                </div>
                <p style={{
                  margin: 0,
                  fontSize: "clamp(15px, 1.2vw, 16px)",
                  lineHeight: 1.65,
                  color: "var(--foreground)"
                }}>
                  {t.about.now.text}
                </p>
              </div>
            )}
            <div className="about-stats">
              {t.about.stats.map((s, i) => (
                <div className="stat" key={i}>
                  <div className="num-big">{s.n}</div>
                  <div className="label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Experience ----------
function Experience({ t }) {
  return (
    <section className="section" id="experience" style={{ background: "var(--tint)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 24, marginBottom: 56 }}>
          <div>
            <span className="section-label">{t.experience.label}</span>
            <h2 className="display-md" style={{ margin: 0, maxWidth: 720 }}>{t.experience.title}</h2>
          </div>
          {t.experience.sub && (
            <p style={{ maxWidth: 380, color: "var(--muted-foreground)", fontSize: 16, margin: 0, lineHeight: 1.55 }}>
              {t.experience.sub}
            </p>
          )}
        </div>
        <div className="exp-list">
          {t.experience.items.map((it, i) => (
            <div className="exp-row" key={i}>
              <div className="exp-period">
                {it.phase && (
                  <div style={{
                    fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "var(--accent)", fontWeight: 700, marginBottom: 6
                  }}>{it.phase}</div>
                )}
                <div className="num">{it.period}</div>
              </div>
              <div className="exp-content">
                <h3 className="exp-role">{it.role}</h3>
                <div className="exp-company">{it.company}</div>
                {it.summary && (
                  <p style={{
                    margin: "0 0 16px", fontSize: 16,
                    color: "var(--foreground)", lineHeight: 1.55,
                    fontWeight: 500, letterSpacing: "-0.005em"
                  }}>{it.summary}</p>
                )}
                <ul className="exp-bullets">
                  {it.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="exp-tags">
                  {it.tags.map((tag, j) => <span className="tag" key={j}>{tag}</span>)}
                </div>
              </div>
              <div className="exp-arrow"><PIcon d={ICONS.arrow} size={18} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Works ----------
function WorkPlaceholderArt({ index }) {
  // Three different abstract placeholder mocks per index
  const variants = [
    // Index 0 — dashboard mock
    (
      <svg viewBox="0 0 800 400" style={{ width: "92%", height: "92%", maxWidth: 800 }}>
        <defs>
          <linearGradient id="gA" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="800" height="400" rx="12" fill="var(--surface)" stroke="var(--border)" />
        <rect x="20" y="20" width="120" height="14" rx="4" fill="var(--muted-foreground)" opacity="0.3" />
        <rect x="20" y="60" width="240" height="120" rx="10" fill="var(--muted)" />
        <rect x="280" y="60" width="240" height="120" rx="10" fill="url(#gA)" stroke="var(--accent)" strokeOpacity="0.3" />
        <rect x="540" y="60" width="240" height="120" rx="10" fill="var(--muted)" />
        <rect x="20" y="200" width="500" height="180" rx="10" fill="var(--surface)" stroke="var(--border)" />
        <polyline points="40,340 100,300 160,320 220,260 280,280 340,220 400,240 460,200 500,180" fill="none" stroke="var(--accent)" strokeWidth="2" />
        <rect x="540" y="200" width="240" height="180" rx="10" fill="var(--muted)" />
        <circle cx="660" cy="290" r="50" fill="none" stroke="var(--accent)" strokeWidth="6" strokeOpacity="0.4" />
        <path d="M660,240 A50,50 0 0,1 706,304" fill="none" stroke="var(--accent)" strokeWidth="6" />
      </svg>
    ),
    // Index 1 — mobile mock
    (
      <svg viewBox="0 0 600 360" style={{ width: "85%", height: "85%" }}>
        <rect x="100" y="20" width="180" height="320" rx="24" fill="var(--surface)" stroke="var(--border)" />
        <rect x="118" y="50" width="144" height="20" rx="4" fill="var(--muted-foreground)" opacity="0.3" />
        <rect x="118" y="80" width="100" height="10" rx="2" fill="var(--muted-foreground)" opacity="0.2" />
        <rect x="118" y="110" width="144" height="60" rx="8" fill="var(--accent)" opacity="0.15" />
        <rect x="118" y="180" width="144" height="60" rx="8" fill="var(--muted)" />
        <rect x="118" y="250" width="144" height="60" rx="8" fill="var(--muted)" />
        <rect x="320" y="40" width="240" height="280" rx="12" fill="var(--surface)" stroke="var(--border)" />
        <circle cx="360" cy="80" r="20" fill="var(--accent)" opacity="0.4" />
        <rect x="390" y="68" width="120" height="10" rx="2" fill="var(--muted-foreground)" opacity="0.4" />
        <rect x="390" y="84" width="80" height="8" rx="2" fill="var(--muted-foreground)" opacity="0.2" />
        <rect x="340" y="120" width="200" height="100" rx="8" fill="var(--muted)" />
        <rect x="340" y="240" width="92" height="32" rx="6" fill="var(--accent)" />
        <rect x="448" y="240" width="92" height="32" rx="6" fill="var(--muted)" />
      </svg>
    ),
    // Index 2 — flow / system map
    (
      <svg viewBox="0 0 700 380" style={{ width: "88%", height: "88%" }}>
        <defs>
          <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10" fill="var(--accent)" />
          </marker>
        </defs>
        <rect x="40" y="50" width="140" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" />
        <rect x="280" y="50" width="140" height="80" rx="10" fill="var(--accent)" opacity="0.12" stroke="var(--accent)" strokeOpacity="0.4" />
        <rect x="520" y="50" width="140" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" />
        <rect x="40" y="250" width="140" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" />
        <rect x="280" y="250" width="140" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" />
        <rect x="520" y="250" width="140" height="80" rx="10" fill="var(--accent)" opacity="0.12" stroke="var(--accent)" strokeOpacity="0.4" />
        <line x1="180" y1="90" x2="280" y2="90" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ah)" />
        <line x1="420" y1="90" x2="520" y2="90" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ah)" />
        <line x1="350" y1="130" x2="350" y2="250" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ah)" />
        <line x1="180" y1="290" x2="280" y2="290" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ah)" />
        <line x1="420" y1="290" x2="520" y2="290" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ah)" />
        {[
          [110, 90], [350, 90], [590, 90],
          [110, 290], [350, 290], [590, 290]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="var(--muted-foreground)" opacity="0.5" />
        ))}
      </svg>
    )
  ];
  return variants[index] || variants[0];
}

function Works({ t }) {
  return (
    <section className="section" id="works">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 24, marginBottom: 56 }}>
          <div>
            <span className="section-label">{t.works.label}</span>
            <h2 className="display-md" style={{ margin: 0 }}>{t.works.title}</h2>
          </div>
          <p style={{ maxWidth: 420, color: "var(--muted-foreground)", fontSize: 16, margin: 0 }}>{t.works.sub}</p>
        </div>
        <div className="works-grid">
          {t.works.items.map((w, i) => (
            <a className="work-card" href={`work-${i + 1}.html`} key={i}>
              <div className="work-thumb">
                <div className="work-thumb-mock">
                  <WorkPlaceholderArt index={i} />
                </div>
              </div>
              <div className="work-meta">
                <div className="work-tags">
                  <span className="work-year num">{w.year}</span>
                  {w.tags.map((tag, j) => <span key={j}>{tag}</span>)}
                </div>
                <h3 className="work-title">
                  {w.title}
                  <span className="arrow"><PIcon d={ICONS.arrow} size={16} /></span>
                </h3>
                <p className="work-desc">{w.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Skills ----------
function Skills({ t }) {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <span className="section-label">{t.skills.label}</span>
        <h2 className="display-md" style={{ margin: "0 0 48px" }}>{t.skills.title}</h2>
        <div className="skills-grid">
          {t.skills.groups.map((g, i) => (
            <div className="skill-group" key={i}>
              <h4>{g.name}</h4>
              <ul className="skill-list">
                {g.items.map((s, j) => (
                  <li key={j}><span className="dot"></span>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...t.skills.marquee, ...t.skills.marquee, ...t.skills.marquee].map((m, i) => (
              <span className="marquee-item" key={i}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Education + Awards ----------
function EduAwards({ t }) {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="two-col">
          <div>
            <span className="section-label">{t.education.label}</span>
            <h3 className="display-sm" style={{ margin: "0 0 24px" }}>{t.education.label}</h3>
            <div>
              {t.education.items.map((e, i) => (
                <div className="edu-card" key={i}>
                  <p className="deg">{e.deg}</p>
                  <p className="school">{e.school}</p>
                  <p className="yrs">{e.yrs}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="section-label">{t.awards.label}</span>
            <h3 className="display-sm" style={{ margin: "0 0 24px" }}>{t.awards.label}</h3>
            <div>
              {t.awards.items.map((a, i) => (
                <div className="award-card" key={i}>
                  <p className="title-x">{a.title}</p>
                  <p className="org">{a.org}</p>
                  {a.desc && <p className="desc">{a.desc}</p>}
                  <span className="pat-num">{a.num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- CTA / Contact ----------
function CTA({ t }) {
  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <h2 className="cta-title">
          {t.cta.title_1} <span className="accent">{t.cta.title_2}</span>.
        </h2>
        <p style={{ maxWidth: 560, margin: "0 auto 40px", color: "var(--muted-foreground)", fontSize: 18, lineHeight: 1.6 }}>{t.cta.sub}</p>
        <div className="cta-buttons">
          <a className="button button--primary button--lg" href="mailto:jie820819@gmail.com">
            <PIcon d={ICONS.mail} size={16} />
            {t.cta.buttons.email}
          </a>
          <a className="button button--outline button--lg" href="https://www.linkedin.com/in/kris-uiux" target="_blank" rel="noreferrer">
            LinkedIn
            <PIcon d={ICONS.external} size={14} />
          </a>
        </div>
        <div className="contact-grid">
          {t.cta.contact.map((c, i) => (
            <a className="contact-card" href={c.href} key={i} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <span className="k">{c.k}</span>
              <span className="v">{c.v}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <div>{t.footer.copy}</div>
      <div>{t.footer.built}</div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, About, Experience, Works, Skills, EduAwards, CTA, Footer, PIcon, ICONS, WorkPlaceholderArt
});
