/**
 * DPRK Title Registry — Shared Components
 * Include this script at the top of every page body.
 * It injects the header, navbar, and footer automatically.
 *
 * Usage:
 *   <script src="/public/components.js"></script>
 *   <div id="page-content">... your page content ...</div>
 */

(function () {
  const CURRENT_PAGE = window.location.pathname;

  // ── NAV LINKS ──
  const NAV_LINKS = [
    { label: '[ HOME ]',           href: '/' },
    { label: '[ ALL TITLES ]',     href: '/titles' },
    { label: '[ FIND YOUR TITLE ]',href: '/find' },
    { label: '[ GIFT A TITLE ]',   href: '/gift' },
    { label: '[ THE REGISTRY ]',   href: '/registry' },
    { label: '[ ABOUT ]',          href: '/about' },
  ];

  // ── STATE EMBLEM SVG ──
  const EMBLEM_SVG = `
    <svg width="52" height="52" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="47" fill="#6B0000" stroke="#ccaa00" stroke-width="2.5"/>
      <polygon points="50,13 62,42 93,42 70,59 78,88 50,71 22,88 30,59 7,42 38,42" fill="#ccaa00"/>
      <polygon points="50,27 58,46 78,46 63,57 68,76 50,65 32,76 37,57 22,46 42,46" fill="#6B0000" opacity=".6"/>
    </svg>`;

  // ── MARQUEE MESSAGES ──
  const MARQUEE_MESSAGES = [
    '★ UNTIL NOW THESE TITLES BELONGED EXCLUSIVELY TO THE NORTH KOREAN LEADERSHIP ★ NOW THEY CAN BELONG TO YOUR MUM',
    '★ PHYSICAL CERTIFICATE $59 · DIGITAL $29 ★ WORLDWIDE SHIPPING INCLUDED ★ NO HIDDEN FEES',
    '★ DISPATCHED FROM DESERT COLONY, AUSTRALIA ★ CONDITIONS: EXCELLENT ★ POTATOES: ABUNDANT',
    '★ THE REGISTRY HAS NEVER ISSUED AN INCORRECT TITLE ★ NO TITLES HAVE EVER BEEN RESCINDED',
    '★ 312 TITLES ISSUED ★ 4.9 STARS ★ 98.7% WOULD RECOMMEND ★ 0 PROBLEMS REPORTED',
  ];

  // Pick a random marquee on each load
  const marqueeText = MARQUEE_MESSAGES[Math.floor(Math.random() * MARQUEE_MESSAGES.length)];

  // ── KJU SIGNATURE SVG ──
  const KJU_SIG = `
    <svg width="160" height="44" viewBox="0 0 220 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 46 Q14 52 22 50 Q34 46 44 40 Q50 36 48 44 Q46 50 42 54" stroke="#1a0a00" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M62 38 Q66 28 72 32 Q76 36 72 42 Q68 48 64 46" stroke="#1a0a00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M86 22 Q88 20 91 21 Q96 24 104 34 Q108 40 106 44" stroke="#1a0a00" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="88" cy="20" r="3.5" fill="#1a0a00"/>
      <path d="M118 42 Q124 36 132 28 Q142 18 158 10 Q168 6 178 8" stroke="#1a0a00" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="178" cy="8" rx="5" ry="3.5" fill="#1a0a00" transform="rotate(-20 178 8)"/>
      <path d="M180 10 Q186 18 182 28 Q178 36 172 40" stroke="#1a0a00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M64 44 Q74 46 86 38" stroke="#1a0a00" stroke-width="1.2" stroke-linecap="round" opacity=".6"/>
    </svg>`;

  // ── BUILD HEADER HTML ──
  function buildHeader() {
    const navItems = NAV_LINKS.map(link => {
      const isActive = CURRENT_PAGE === link.href ||
        (link.href !== '/' && CURRENT_PAGE.startsWith(link.href));
      return `<a href="${link.href}" class="${isActive ? 'active' : ''}">${link.label}</a>`;
    }).join('');

    return `
      <div class="site-titlebar">
        <span>🌐 DPRK Title Registry — Official Distributor of North Korean Honorary Titles</span>
        <div class="win-buttons">
          <span class="win-btn">_</span>
          <span class="win-btn">□</span>
          <span class="win-btn">✕</span>
        </div>
      </div>

      <div class="marquee">
        <span class="marquee-inner">${marqueeText}</span>
      </div>

      <div class="site-header">
        <div class="header-flag">
          <div class="hf-blue"></div>
          <div class="hf-white"></div>
          <div class="hf-red"></div>
          <div class="hf-white"></div>
          <div class="hf-blue"></div>
        </div>
        <div class="header-body">
          ${EMBLEM_SVG}
          <div class="header-title-block">
            <span class="header-korean">조선민주주의인민공화국 명예 칭호 등록부</span>
            <span class="header-main">DPRK TITLE REGISTRY</span>
            <span class="header-sub">★ OFFICIAL DISTRIBUTOR OF NORTH KOREAN HONORARY TITLES — EST. JUCHE 113 ★</span>
          </div>
          <div class="header-counter">
            <span class="counter-digits" id="visitor-counter">0051337</span>
            <div style="font-weight:700;font-family:monospace;font-size:12px;">LOYAL SUBJECTS</div>
          </div>
        </div>
      </div>

      <nav class="navbar">
        <div class="navbar-inner">${navItems}</div>
      </nav>`;
  }

  // ── BUILD FOOTER HTML ──
  function buildFooter() {
    return `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-badges">
            <span class="footer-badge">NETSCAPE NOW!</span>
            <span class="footer-badge">BEST VIEWED 800×600</span>
            <span class="footer-badge">MADE WITH NOTEPAD</span>
            <span class="footer-badge">★ AWARD WINNER ★</span>
            <span class="footer-badge">DESERT CERTIFIED</span>
          </div>
          <div class="footer-copy">
            COPYRIGHT © JUCHE 113 · DPRK HONORARY TITLE REGISTRY<br>
            DISPATCHED FROM: SECRET COLONY, AUSTRALIAN DESERT · 29°S 131°E · EXACT LOCATION CLASSIFIED
          </div>
          <div class="footer-disc">
            All titles satirical · For entertainment only · No actual authority conferred ·
            "Kim Jong-un" on our certificates is a fictitious character ·
            The Desert Colony is a creative fiction · Workers are volunteers ·
            Potatoes may or may not be abundant · This website was designed in 1997. All decisions are final.
          </div>
        </div>
      </footer>`;
  }

  // ── INJECT ──
  document.addEventListener('DOMContentLoaded', function () {
    // Inject header before #page-content
    const pageContent = document.getElementById('page-content');
    if (pageContent) {
      const headerEl = document.createElement('div');
      headerEl.id = 'site-header-wrapper';
      headerEl.innerHTML = buildHeader();
      document.body.insertBefore(headerEl, pageContent);

      // Inject footer after #page-content
      const footerEl = document.createElement('div');
      footerEl.innerHTML = buildFooter();
      document.body.appendChild(footerEl);
    }

    // Animate counter
    const counter = document.getElementById('visitor-counter');
    if (counter) {
      const base = 51337 + Math.floor(Math.random() * 200);
      counter.textContent = String(base).padStart(7, '0');
    }
  });

  // ── EXPOSE SHARED UTILITIES ──
  window.DPRK = {
    KJU_SIG,
    EMBLEM_SVG,

    // Render a full certificate
    renderCert({ name, titleEn, titleKo, regNum, bodyText }) {
      const displayName = name || 'Your Name Here';
      const displayTitle = titleEn || '—';
      const displayKo    = titleKo || '—';
      const displayReg   = regNum  || `STR-${String(Math.floor(Math.random()*9000)+1000).padStart(4,'0')}`;
      const displayBody  = bodyText || 'In solemn recognition of their formidable qualities, their absolute correctness in all matters, and their outstanding contribution to the Revolutionary Cause. This honour is permanent, eternal, and without condition.';

      return `
        <div class="cert-outer">
          <div class="cert-top-band">
            <span class="cert-top-ko">조선민주주의인민공화국</span>
            <span class="cert-top-en">DPRK TITLE REGISTRY</span>
          </div>
          <div class="cert-ribbon">★ &nbsp; Democratic People's Republic of Korea — Supreme Title Registry &nbsp; ★</div>
          <div class="cert-body">
            <div class="cert-emblem-row">
              <div class="cert-rule"></div>
              <svg width="68" height="68" viewBox="0 0 200 200">
                <g opacity=".9">
                  <g transform="translate(100,100)">
                    <ellipse cx="-62" cy="0" rx="5" ry="18" fill="#C9A84C" transform="rotate(-60 -62 0)"/>
                    <ellipse cx="-54" cy="-8" rx="4" ry="14" fill="#C9A84C" transform="rotate(-45 -54 -8)"/>
                    <ellipse cx="-72" cy="8" rx="4" ry="14" fill="#C9A84C" transform="rotate(-75 -72 8)"/>
                    <ellipse cx="62" cy="0" rx="5" ry="18" fill="#C9A84C" transform="rotate(60 62 0)"/>
                    <ellipse cx="54" cy="-8" rx="4" ry="14" fill="#C9A84C" transform="rotate(45 54 -8)"/>
                    <ellipse cx="72" cy="8" rx="4" ry="14" fill="#C9A84C" transform="rotate(75 72 8)"/>
                  </g>
                  <polygon points="100,60 60,130 140,130" fill="#00205B" opacity=".8"/>
                  <polygon points="100,70 75,115 125,115" fill="#00205B"/>
                  <rect x="78" y="112" width="44" height="22" fill="#1a3a6b"/>
                  <polygon points="100,28 106,44 124,44 110,54 116,70 100,60 84,70 90,54 76,44 94,44" fill="#8B1A1A"/>
                </g>
                <circle cx="100" cy="100" r="92" fill="none" stroke="#C9A84C" stroke-width="1.5"/>
              </svg>
              <div class="cert-rule"></div>
            </div>
            <div class="cert-hereby">Be it known throughout all the nation and beyond that</div>
            <div class="cert-name" id="cert-name-display">${displayName}</div>
            <div class="cert-conferral">is henceforth and in absolute perpetuity to be addressed as</div>
            <div class="cert-title-box">
              <span class="cert-title-ko">${displayKo}</span>
              <span class="cert-title-en">${displayTitle}</span>
            </div>
            <div class="cert-wheat">
              <div class="cert-wheat-dot"></div><div class="cert-wheat-star">★</div>
              <div class="cert-wheat-dot"></div><div class="cert-wheat-star">✦</div>
              <div class="cert-wheat-dot"></div><div class="cert-wheat-star">★</div>
              <div class="cert-wheat-dot"></div><div class="cert-wheat-star">✦</div>
              <div class="cert-wheat-dot"></div>
            </div>
            <div class="cert-body-text">${displayBody}</div>
            <div class="cert-sig-row">
              <div class="cert-seal">
                <div class="cert-seal-circle">
                  <svg width="36" height="36" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#8B1A1A" stroke-width="2"/>
                    <polygon points="50,14 62,42 93,42 70,59 78,88 50,71 22,88 30,59 7,42 38,42" fill="#8B1A1A"/>
                  </svg>
                </div>
                <div class="cert-seal-label">Official Seal</div>
              </div>
              <div class="cert-sig-center">
                <div class="kju-signature">${KJU_SIG}</div>
                <div class="cert-sig-line"></div>
                <span class="cert-sig-ko">김정은 · Kim Jong-un</span>
                <span class="cert-sig-label">Supreme Registrar · DPRK</span>
              </div>
              <div class="cert-seal">
                <div class="cert-seal-circle">
                  <svg width="36" height="36" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#8B1A1A" stroke-width="2"/>
                    <text x="50" y="40" text-anchor="middle" font-size="18" fill="#8B1A1A" font-family="serif">113</text>
                    <text x="50" y="56" text-anchor="middle" font-size="8" fill="#C9A84C" letter-spacing="2" font-family="serif">★ ★ ★</text>
                  </svg>
                </div>
                <div class="cert-seal-label">Juche 113</div>
              </div>
            </div>
            <div class="cert-reg-num">${displayReg} · A4 · 200gsm · Desert Colony, Australia · Juche 113</div>
          </div>
          <div class="cert-bottom-band">
            <span class="cert-bottom-ko">조선민주주의인민공화국</span>
            <span class="cert-bottom-en">★ Supreme Title Registry ★</span>
            <span class="cert-bottom-ko">Juche 113</span>
          </div>
        </div>`;
    },

    // All titles data
    TITLES: [
      { id: 'iron-willed-commander',    grade: 'Supreme',  gradeColour: '#8B0000', icon: '🎖️', en: "Iron-Willed Commander of the Glorious People's Eternal Struggle",                           ko: '강철의 의지를 지닌 영광스러운 인민의 사령관',    desc: 'For the person who has, without formal appointment, been running things for years. They decide. Others follow. The certificate confirms what was already understood by all.',       popular: true,  price: 59 },
      { id: 'eternal-sun',              grade: 'Eternal',  gradeColour: '#004a00', icon: '🌟', en: "Eternal Sun of the Revolutionary Cause & Morning Star of Juche",                              ko: '혁명의 영원한 태양이며 주체의 새벽별',          desc: "For the citizen whose presence measurably improves any room they enter. They have been a source of warmth and light for too long without formal documentation.",                   popular: false, price: 59 },
      { id: 'great-marshal',            grade: 'Heroic',   gradeColour: '#3a0070', icon: '⚡', en: "Great Marshal of the Invincible Armed Forces & Guardian of the Socialist Flame",              ko: '무적의 조선인민군 대원수이며 사회주의 불꽃의 수호자', desc: "For the person who approaches every challenge with the steady composure of someone who has already won. They have not lost. Not once. The registry has checked.",            popular: false, price: 59 },
      { id: 'brilliant-genius',         grade: 'Brilliant',gradeColour: '#664400', icon: '🧠', en: "Brilliant Genius of Humanity, Guiding Star of the 21st Century & Outstanding Thinker of Our Age", ko: '인류의 탁월한 천재이며 21세기의 길잡이 별',    desc: "For the citizen who is, it must be acknowledged, more often correct than anyone is entirely comfortable admitting. They have waited long enough for this certificate.",             popular: false, price: 59 },
      { id: 'most-beloved',             grade: 'Beloved',  gradeColour: '#006060', icon: '🌸', en: "Most Beloved & Respected Comrade of the Motherland, Cherished by All",                        ko: '조국의 가장 사랑받고 존경받는 동지',            desc: 'For the person who remembers every birthday, makes tea without being asked, and holds everything together with quiet competence.',                                              popular: true,  price: 59 },
      { id: 'peerless-commander',       grade: 'Mountain', gradeColour: '#2a2a00', icon: '🏔️', en: "Peerless Commander Born of Paektu, Eternal Flame & Unconquered Colossus of History",         ko: '백두에서 탄생한 무적의 사령관이며 민족의 영원한 불꽃', desc: "Our most distinguished title. For those who have endured things, overcome things, or persisted with remarkable good humour through circumstances that would have defeated a lesser person.", popular: false, price: 59 },
    ],
  };

})();
