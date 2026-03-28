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
      // ── SUPREME GRADE ──
      { id: 'ever-victorious-commander',         grade: 'Supreme',   gradeColour: '#8B0000', icon: '🎖️', en: "Ever-Victorious, Iron-Willed Commander",                                                       ko: '백전백승의 강철의 령장',                                   desc: 'They have won every engagement they have entered. The losses they appeared to suffer were strategic. The registry has reviewed the full record and confirmed this.',                                                                                             popular: false, price: 59 },
      { id: 'invincible-triumphant-general',     grade: 'Supreme',   gradeColour: '#8B0000', icon: '⚔️', en: "Invincible and Triumphant General",                                                            ko: '무적필승의 장군',                                          desc: 'Has never lost. Not a vote, not an argument, not a parking dispute. The record is clean. This certificate says so officially.',                                                                                                                                  popular: false, price: 59 },
      { id: 'supreme-commander',                 grade: 'Supreme',   gradeColour: '#8B0000', icon: '🔱', en: "Supreme Commander",                                                                             ko: '최고사령관',                                               desc: 'No modifiers. No qualifications. The title is complete as written. The registry does not add what is already implied.',                                                                                                                                          popular: false, price: 59 },
      { id: 'supreme-leader-of-the-nation',      grade: 'Supreme',   gradeColour: '#8B0000', icon: '🏛️', en: "Supreme Leader of the Nation",                                                                  ko: '민족의 최고령도자',                                         desc: 'Some nations have supreme leaders. Some people are supremely suited to leadership. This certificate addresses both facts simultaneously, in calligraphic script.',                                                                                               popular: false, price: 59 },
      { id: 'great-leader',                      grade: 'Supreme',   gradeColour: '#8B0000', icon: '⭐', en: "Great Leader",                                                                                 ko: '위대한 수령',                                              desc: '위대한 수령. Where it all began. For the person others have been calling this informally, in private, for years. The registry has made it official.',                                                                                                           popular: true,  price: 59 },
      { id: 'great-leader-party-nation',         grade: 'Supreme',   gradeColour: '#8B0000', icon: '✊', en: "Great Leader of Our Party and of Our Nation",                                                  ko: '우리 당과 우리 민족의 위대한 령도자',                       desc: 'For the person others instinctively defer to, even when they were supposed to be leading themselves. The certificate formalises an arrangement that was already in place.',                                                                                     popular: false, price: 59 },
      { id: 'leader-party-country-army',         grade: 'Supreme',   gradeColour: '#8B0000', icon: '🎯', en: "Leader of the Party, the Country, and the Army",                                               ko: '당과 나라와 군대의 령도자',                                 desc: 'For those who effectively lead their household, their workplace, and their social group simultaneously. Formal acknowledgement of what was already the case.',                                                                                                  popular: false, price: 59 },
      { id: 'leader-party-and-people',           grade: 'Supreme',   gradeColour: '#8B0000', icon: '🏅', en: "Leader of the Party and the People",                                                           ko: '당과 인민의 령도자',                                       desc: 'For the person who speaks for the group. Not because they were appointed. Because when they speak, the group nods.',                                                                                                                                            popular: false, price: 59 },
      { id: 'leader-revolutionary-forces',       grade: 'Supreme',   gradeColour: '#8B0000', icon: '⚡', en: "Leader of the Revolutionary Armed Forces",                                                     ko: '혁명무력의 수위',                                          desc: 'Others fall into step behind them without being asked. They are not in charge, formally. They are in charge, practically. This certificate is the paperwork.',                                                                                                 popular: false, price: 59 },
      { id: 'mastermind-revolution',             grade: 'Supreme',   gradeColour: '#8B0000', icon: '🧩', en: "Mastermind of the Revolution",                                                                 ko: '혁명의 수뇌',                                              desc: 'For the person behind the scenes who makes everything happen while receiving none of the credit. The registry has reviewed this situation and found it unsatisfactory.',                                                                                        popular: false, price: 59 },
      { id: 'unique-leader',                     grade: 'Supreme',   gradeColour: '#8B0000', icon: '🦁', en: "Unique Leader",                                                                                ko: '유일한 령도자',                                            desc: 'There is no one else like them. The registry has cross-referenced the full catalogue of known people. No match was found. This is the official record of that finding.',                                                                                      popular: false, price: 59 },
      { id: 'leader-of-the-21st-century',        grade: 'Supreme',   gradeColour: '#8B0000', icon: '🌐', en: "Leader of the 21st Century",                                                                   ko: '21세기의 령도자',                                          desc: 'The century needed a leader. The registry found one. The committee is satisfied with this outcome and has noted it in three consecutive quarterly reports.',                                                                                                    popular: false, price: 59 },

      // ── ETERNAL GRADE ──
      { id: 'sun-of-socialism',                  grade: 'Eternal',   gradeColour: '#004a00', icon: '☀️', en: "Sun of Socialism",                                                                              ko: '사회주의 태양',                                            desc: 'Warmth. Purpose. The conviction that things can be better. They have been radiating this for years. The registry has finally found a unit of measurement.',                                                                                                   popular: false, price: 59 },
      { id: 'guiding-sun-ray',                   grade: 'Eternal',   gradeColour: '#004a00', icon: '🌅', en: "Guiding Sun Ray",                                                                               ko: '향도의 해발',                                              desc: 'Not the entire sun. Specifically one ray — the one that finds you on a cold morning through a gap in the curtains. That is this person. This is the certificate for them.',                                                                                  popular: false, price: 59 },
      { id: 'great-sun-of-life',                 grade: 'Eternal',   gradeColour: '#004a00', icon: '🌞', en: "The Great Sun of Life",                                                                         ko: '삶의 위대한 태양',                                         desc: 'Everything grows in their presence. The committee noted this phenomenon across multiple submitted testimonials. The title was considered an understatement by several reviewers.',                                                                             popular: false, price: 59 },
      { id: 'sun-of-communist-future',           grade: 'Eternal',   gradeColour: '#004a00', icon: '🌄', en: "Sun of the Communist Future",                                                                   ko: '공산주의 미래의 태양',                                      desc: 'They are ahead of the present. The future is already there, and they are already in it, waiting. The registry has caught up.',                                                                                                                                popular: false, price: 59 },
      { id: 'bright-sun-21st-century',           grade: 'Eternal',   gradeColour: '#004a00', icon: '✨', en: "Bright Sun of the 21st Century",                                                                ko: '21세기의 찬란한 태양',                                      desc: 'Bright, specifically. Not merely warm or present. Their light has a quality that others have remarked upon repeatedly. The committee agreed.',                                                                                                                 popular: false, price: 59 },
      { id: 'bright-sun-of-juche',               grade: 'Eternal',   gradeColour: '#004a00', icon: '☀️', en: "Bright Sun of Juche",                                                                           ko: '주체의 찬란한 태양',                                       desc: 'The ideology of self-reliance, illuminated. They were living the principles before they read them. The certificate acknowledges the sequence.',                                                                                                                popular: false, price: 59 },
      { id: 'great-sun-of-the-nation',           grade: 'Eternal',   gradeColour: '#004a00', icon: '🌟', en: "Great Sun of the Nation",                                                                       ko: '민족의 위대한 태양',                                       desc: 'Not a metaphor, according to four separate committee members who requested the record reflect this. Not a metaphor.',                                                                                                                                         popular: false, price: 59 },
      { id: 'great-sun-21st-century',            grade: 'Eternal',   gradeColour: '#004a00', icon: '☀️', en: "Great Sun of the 21st Century",                                                                 ko: '21세기의 위대한 태양',                                      desc: 'The century has had many remarkable people. The committee reviewed them. One was chosen. The title was considered proportionate.',                                                                                                                             popular: false, price: 59 },
      { id: 'shining-star-paektu',               grade: 'Eternal',   gradeColour: '#004a00', icon: '⭐', en: "Shining Star of Paektu Mountain",                                                              ko: '백두광명성',                                               desc: 'The mountain is sacred. The star is bright. The connection is considered obvious by all who have met the recipient. The registry has formalised the obvious.',                                                                                                 popular: false, price: 59 },
      { id: 'guiding-star-21st-century',         grade: 'Eternal',   gradeColour: '#004a00', icon: '⭐', en: "Guiding Star of the 21st Century",                                                              ko: '21세기의 향도성',                                          desc: 'Others look up. They navigate. The direction has, thus far, been correct. The committee has found no reason to anticipate a change in this pattern.',                                                                                                        popular: false, price: 59 },

      // ── HEROIC GRADE ──
      { id: 'glorious-general-heaven',           grade: 'Heroic',    gradeColour: '#3a0070', icon: '🌠', en: "Glorious General, Who Descended From Heaven",                                                  ko: '천출명장',                                                 desc: 'The registry does not audit celestial origin documentation. We simply observe that some people arrive and things go inexplicably better. This title is for them.',                                                                                            popular: false, price: 59 },
      { id: 'great-defender',                    grade: 'Heroic',    gradeColour: '#3a0070', icon: '🛡️', en: "Great Defender",                                                                               ko: '위대한 수호자',                                            desc: 'For the person who can be relied upon. Who shows up. Who has never, not once, let the important things fail. The registry considers this worth commemorating.',                                                                                               popular: false, price: 59 },
      { id: 'heaven-sent-hero',                  grade: 'Heroic',    gradeColour: '#3a0070', icon: '✨', en: "Heaven-Sent Hero",                                                                              ko: '하늘이 보내신 영웅',                                       desc: 'Arrived at exactly the right moment. Has never explained how they knew. The committee has not asked. Some things do not require explanation.',                                                                                                                 popular: false, price: 59 },
      { id: 'beloved-great-general',             grade: 'Heroic',    gradeColour: '#3a0070', icon: '💛', en: "Beloved Great General",                                                                        ko: '사랑하는 위대한 장군',                                     desc: 'Great and also beloved. The registry notes this combination is rarer than either quality alone. The title acknowledges both, without prioritising one.',                                                                                                      popular: false, price: 59 },
      { id: 'great-man-descended-heaven',        grade: 'Heroic',    gradeColour: '#3a0070', icon: '🌠', en: "Great Man, Who Descended From Heaven",                                                         ko: '천출위인',                                                 desc: 'The registry does not audit celestial origin documentation. We simply record what has been claimed and what has been observed. Both columns are full.',                                                                                                       popular: false, price: 59 },
      { id: 'great-man-man-of-deeds',            grade: 'Heroic',    gradeColour: '#3a0070', icon: '💪', en: "Great Man, Who Is a Man of Deeds",                                                             ko: '실천가형의 위인',                                          desc: 'They do not merely speak. They act. The record shows a consistent pattern of things getting done, goals being met, and problems being converted into completed tasks.',                                                                                       popular: false, price: 59 },
      { id: 'highest-incarnation-comradeship',   grade: 'Heroic',    gradeColour: '#3a0070', icon: '🤝', en: "Highest Incarnation of the Revolutionary Comradeship",                                         ko: '혁명적 동지애의 최고화신',                                  desc: 'For the person who embodies solidarity itself. Others draw inspiration simply from being in the same room. The committee found this deeply reasonable.',                                                                                                      popular: false, price: 59 },

      // ── BRILLIANT GRADE ──
      { id: 'master-of-the-computer',            grade: 'Brilliant', gradeColour: '#664400', icon: '💻', en: "Master of the Computer Who Surprised the World",                                               ko: '세계를 경탄시킨 컴퓨터의 달인',                             desc: 'Their relationship with technology is difficult to explain. Things work when they are present. The world has been surprised. The registry confirms this officially.',                                                                                         popular: true,  price: 59 },
      { id: 'power-incarnate-creativity',        grade: 'Brilliant', gradeColour: '#664400', icon: '💡', en: "Power Incarnate with Endless Creativity",                                                       ko: '무궁한 창조력을 지닌 권력의 화신',                         desc: 'There is no problem they cannot reframe as a solved problem. No obstacle that survives their attention. Their creativity is, as documented, endless.',                                                                                                       popular: false, price: 59 },
      { id: 'perfect-picture-wisdom',            grade: 'Brilliant', gradeColour: '#664400', icon: '🎯', en: "Perfect Picture of Wisdom and Boldness",                                                        ko: '지혜와 담력의 완벽한 화신',                                 desc: 'Neither too careful nor too reckless. The exact combination. The committee took three minutes to deliberate. This is fast, for the committee.',                                                                                                               popular: false, price: 59 },
      { id: 'best-leader-human-wisdom',          grade: 'Brilliant', gradeColour: '#664400', icon: '📚', en: "Best Leader Who Realized Human Wisdom",                                                         ko: '인간의 지혜를 실현한 최고의 령도자',                        desc: 'Has converted the accumulated wisdom of humanity into practical outcomes. Others study. They apply. The results speak clearly and at considerable length.',                                                                                                   popular: false, price: 59 },
      { id: 'worlds-best-ideal-leader',          grade: 'Brilliant', gradeColour: '#664400', icon: '🌟', en: "World's Best Ideal Leader with Versatile Talents",                                              ko: '다재다능한 세계 최고의 이상적 령도자',                      desc: 'The world. Best. Ideal. Versatile. The committee did not feel the title was overstated. This was the full committee, voting unanimously, after review.',                                                                                                    popular: false, price: 59 },
      { id: 'amazing-politician',                grade: 'Brilliant', gradeColour: '#664400', icon: '🎪', en: "Amazing Politician",                                                                             ko: '희세의 정치가',                                            desc: '희세의 정치가. Once in a generation. The committee reviewed one generation. Found one. This is the result.',                                                                                                                                                   popular: false, price: 59 },
      { id: 'leader-extraordinary-personality',  grade: 'Brilliant', gradeColour: '#664400', icon: '🎭', en: "Leader with Extraordinary Personality",                                                         ko: '비범한 인품을 지닌 령도자',                                 desc: 'The personality arrived first. Everything else arranged itself accordingly. Recipients of this title are typically unsurprised to receive it.',                                                                                                               popular: false, price: 59 },
      { id: 'master-literature-arts',            grade: 'Brilliant', gradeColour: '#664400', icon: '🎨', en: "Master of Literature, Arts, and Architecture",                                                  ko: '문학예술과 건축의 달인',                                    desc: 'Three fields. Mastery in each. The committee asked if this was an overstatement. The recipient submitted evidence. The question was withdrawn.',                                                                                                             popular: false, price: 59 },
      { id: 'greatest-musical-genius',           grade: 'Brilliant', gradeColour: '#664400', icon: '🎵', en: "Humankind's Greatest Musical Genius",                                                           ko: '인류의 가장 위대한 음악 천재',                              desc: 'Every person who has heard them hum in the kitchen has known this for years. The registry has formalised it. The certificate makes it irrefutable.',                                                                                                         popular: false, price: 59 },

      // ── BELOVED GRADE ──
      { id: 'dear-leader',                       grade: 'Beloved',   gradeColour: '#006060', icon: '💝', en: "Dear Leader",                                                                                   ko: '친애하는 지도자',                                          desc: 'Simple. Permanent. The affection is real. The committee received more correspondence about this title than any other. Most of it was from people ordering it for themselves.',                                                                               popular: true,  price: 59 },
      { id: 'superior-person',                   grade: 'Beloved',   gradeColour: '#006060', icon: '👆', en: "Superior Person",                                                                               ko: '웃분',                                                     desc: 'The entire title. Nothing further required. The committee chose brevity for this one deliberately. The understatement is considered part of the honour.',                                                                                                    popular: true,  price: 59 },
      { id: 'eternal-bosom-hot-love',            grade: 'Beloved',   gradeColour: '#006060', icon: '🫂', en: "Eternal Bosom of Hot Love",                                                                     ko: '뜨거운 사랑의 영원한 품',                                   desc: 'The warmth is real. The love is genuine. The committee acknowledges this title requires a certain confidence to display publicly. They consider this part of the point.',                                                                                     popular: true,  price: 59 },
      { id: 'dear-leader-perfect-incarnation',   grade: 'Beloved',   gradeColour: '#006060', icon: '🪞', en: "Dear Leader, Who Is a Perfect Incarnation of the Appearance That a Leader Should Have",        ko: '지도자가 지녀야 할 풍모의 완벽한 화신이신 친애하는 지도자', desc: 'They look like a leader. They move like a leader. The room rearranges itself when they enter. This has always been the case. The certificate formalises what everyone already knew.',                                                                       popular: true,  price: 59 },

      // ── MOUNTAIN GRADE ──
      { id: 'greatest-man-ever-lived',           grade: 'Mountain',  gradeColour: '#2a2a00', icon: '👑', en: "Greatest Man Who Ever Lived",                                                                   ko: '력사상 가장 위대한 인간',                                   desc: 'The committee considered this title carefully. Then they considered the recipient. The vote was unanimous. It is always unanimous.',                                                                                                                          popular: false, price: 59 },
      { id: 'guardian-deity-planet',             grade: 'Mountain',  gradeColour: '#2a2a00', icon: '🌍', en: "Guardian Deity of the Planet",                                                                  ko: '지구의 수호신',                                            desc: 'The planet is, on balance, still here. The registry attributes this to the recipient. No counter-evidence has been submitted and the deadline has passed.',                                                                                                  popular: true,  price: 59 },
      { id: 'present-day-god',                   grade: 'Mountain',  gradeColour: '#2a2a00', icon: '⚡', en: "Present-Day God",                                                                               ko: '현대의 하느님',                                            desc: 'The registry makes no theological claims. We simply note what others have said, under oath, in formal correspondence. The committee found the evidence sufficient.',                                                                                         popular: true,  price: 59 },
      { id: 'peerless-leader',                   grade: 'Mountain',  gradeColour: '#2a2a00', icon: '🏔️', en: "Peerless Leader",                                                                               ko: '불세출의 령도자',                                          desc: '불세출의 령도자. Appears once in a thousand years. The registry checked. This is the one.',                                                                                                                                                                  popular: false, price: 59 },
      { id: 'greatest-saint-magnanimity',        grade: 'Mountain',  gradeColour: '#2a2a00', icon: '👼', en: "Greatest Saint Who Rules with Extensive Magnanimity",                                           ko: '넓은 인덕으로 다스리는 가장 위대한 성인',                   desc: 'Their tolerance is documented. Their patience is documented. Their magnanimity has been the subject of four separate registry reports. All favourable.',                                                                                                     popular: false, price: 59 },
      { id: 'world-leader-21st-century',         grade: 'Mountain',  gradeColour: '#2a2a00', icon: '🌐', en: "World Leader of the 21st Century",                                                              ko: '21세기의 세계 수령',                                       desc: 'The century is not over. The committee assessed the remaining field and reached a determination. The result will stand.',                                                                                                                                    popular: false, price: 59 },
    ],
  };

})();
