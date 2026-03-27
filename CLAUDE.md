# DPRK Honorary Title Registry

## What This Is

A satirical e-commerce website that sells North Korean-style honorary title certificates. The premise: the registry is an **actual arm of the North Korean government**, operating from a secret desert colony in central Australia, issuing historic DPRK honorary titles to civilians worldwide as an act of supreme magnanimity.

The joke is that it's completely deadpan. Nothing winks at the camera. The registry takes itself entirely seriously.

## The Conceit — Never Break Character

The operating persona is the **North Korean propaganda department**. Rules:
- Nothing has ever gone wrong. Nothing ever will.
- Everything is already at record levels. Conditions are excellent.
- Morale is outstanding. There have been no complaints. There are no complaints to file.
- Everything improves each quarter. This trend will continue indefinitely.
- The Desert Colony workers are volunteers. They are happy. Their correspondence is reviewed before dispatch.
- Potatoes are abundant.
- All committee votes are unanimous. They are always unanimous.
- Titles are permanent. They cannot be rescinded, disputed, or reviewed.
- The registry has never issued an incorrect title. This record will be maintained.

**Tone reference:** naenara.com.kp — the official DPRK state news site. Formal, bureaucratic, completely straight-faced.

**What to NEVER write:**
- "of course, this is all in good fun"
- jokes that acknowledge it's a joke
- anything that implies uncertainty or imperfection
- "we think" / "perhaps" / "might be" — the registry states facts

## The Product

Two SKUs:
- **Physical certificate**: $59 USD (worldwide shipping included, no extras)
- **Digital certificate**: $29 USD (instant PDF)

### What the physical order includes
1. **A4 certificate** on 200gsm cream stock — personalised name in Great Vibes calligraphic font, title in English + Korean, state emblem SVG, KJU signature (SVG approximation), two official seals (Registry + Juche calendar), crop marks
2. **Registry card** — A6, folded, sealed with crimson STR monogram wax seal. Recipient breaks the seal to open. Contains a real KJU quote (sourced from Rodong Sinmun).
3. **Navy envelope** — C4 hard-backed, bold DPRK navy (#00205B), crimson top/bottom bands, state emblem watermark, Desert Colony postmark, STR stamp. Certificate ships flat, uncreased.
4. **Registry entry** — name added to online registry. Searchable by exact name only (private). Includes personal message from Kim Jong-un.

## Fulfilment (manual, Phase 1)
- Orders come in via Stripe
- Edit `build_cert.py` with recipient name/title, run Python script → PDF
- Print at Officeworks on 200gsm cream (~$4/sheet)
- Apply wax seal to registry card
- Pack in navy C4 envelope
- Post via Australia Post tracked (~$20 worldwide)
- ~15 min per order, ~$26 AUD cost, ~$92 AUD revenue → ~$66 AUD profit

## The Desert Colony

**Location:** 29°S 131°E — the precise geographic centre of Australia  
**Established:** Month 2, Juche 113  
**Staffed by:** volunteers (all correspondence reviewed by Comrade Director O Yong-sik)  
**Conditions:** excellent  
**Potatoes:** abundant  
**Complaints:** none

## The Registry Leadership

**Kim Jong-fun** — Supreme Registrar  
- Born Juche 82, DPRK, under remarkable circumstances (double rainbow, birds arranged meaningfully)  
- Appointed Month 1, Juche 113  
- Has personally signed every certificate  
- Bowed for 17 seconds upon appointment (registry record)  
- Hobbies: ceremony, calligraphy, wax

**The Approvals Committee** (meets quarterly):
- Comrade Director Pak Sung-jin — Chair, Bureau of Title Verification and Correctness
- Comrade Secretary Ri Hyun-ok — Korean translation (never required amendment)
- Comrade Director Choe Kwang-sop — Bureau of Recipient Happiness (97% = personal disappointment)
- Comrade Director Kim Yong-ae — Bureau of Correct Display ("behind head on video calls" = optimal)
- Comrade Director O Yong-sik — Desert Colony Operations
- Comrade Senior Adviser Jang Tae-un — Emeritus, declined retirement on ideological grounds

## Titles (6 flagship, 50+ total)

All $59 physical / $29 digital. Flat price, no grade variation.

| ID | Grade | English Title | Korean |
|----|-------|--------------|--------|
| iron-willed-commander | Supreme | Iron-Willed Commander of the Glorious People's Eternal Struggle | 강철의 의지를 지닌 영광스러운 인민의 사령관 |
| eternal-sun | Eternal | Eternal Sun of the Revolutionary Cause & Morning Star of Juche | 혁명의 영원한 태양이며 주체의 새벽별 |
| great-marshal | Heroic | Great Marshal of the Invincible Armed Forces & Guardian of the Socialist Flame | 무적의 조선인민군 대원수이며 사회주의 불꽃의 수호자 |
| brilliant-genius | Brilliant | Brilliant Genius of Humanity, Guiding Star of the 21st Century & Outstanding Thinker of Our Age | 인류의 탁월한 천재이며 21세기의 길잡이 별 |
| most-beloved | Beloved | Most Beloved & Respected Comrade of the Motherland, Cherished by All | 조국의 가장 사랑받고 존경받는 동지 |
| peerless-commander | Mountain | Peerless Commander Born of Paektu, Eternal Flame & Unconquered Colossus of History | 백두에서 탄생한 무적의 사령관이며 민족의 영원한 불꽃 |

## Platform

- **Frontend:** Framer (to be built — HTML files are the reference design)
- **Payments:** Stripe ($59 physical product, $29 digital product)
- **No Shopify.** Stripe payment links embedded in Framer, manual fulfilment.
- Stripe fee: ~2.9% + 30¢ per transaction

## Tech Stack (this repo)

```
dprk-registry/
├── server.js              # Express dev server — run: npm run dev
├── package.json
├── public/
│   ├── style.css          # ALL shared CSS — every token, component, utility
│   └── components.js      # Shared header/nav/footer + window.DPRK utilities
│       ├── DPRK.renderCert()   — renders a full certificate HTML string
│       ├── DPRK.TITLES         — array of all title data
│       ├── DPRK.KJU_SIG        — KJU signature SVG string
│       └── DPRK.EMBLEM_SVG     — state emblem SVG string
├── pages/
│   ├── home.html          ✓ Complete — hero, package showcase, titles, reviews, CTA
│   ├── about.html         ✓ Complete — mandate, history, timeline, KJF profile, committee, colony
│   ├── product.html       ✓ Complete (legacy) — single title product page with order modal
│   ├── titles.html        🔲 To build — full 50+ title catalogue with filtering
│   ├── quiz.html          🔲 To build — 5-question title finder
│   ├── registry.html      🔲 To build — name search lookup
│   ├── gift.html          🔲 To build — gifting flow
│   └── certificate.html   🔲 To build — standalone certificate preview
└── scripts/
    └── build_cert.py      — Python PDF generator (requires PyMuPDF)
```

## Design System

**Full Win95 DPRK aesthetic** — the joke is the website itself. Key elements:
- Teal/green desktop NOT used (removed — full-width real site)
- Win95 chrome (navy titlebar with _ □ ✕, bevelled grey panels, inset borders) used as actual site chrome
- DPRK flag strip in header (blue/white/red proportions)
- Green-on-black LED visitor counter
- Animated red marquee at top
- VT323 for display headings + prices
- Georgia/Times New Roman for body text (readable)
- IM Fell English for editorial italic copy
- Cinzel for formal/certificate titling
- Great Vibes for calligraphic certificate names
- Cormorant Garamond for certificate body
- Noto Serif KR for Korean text

**Colour tokens** (defined in `public/style.css`):
- `--navy: #000080` — site chrome
- `--red: #cc0000` — accents, CTAs
- `--gold: #ccaa00` / `--gold2: #ffdd00` — gold accents
- `--cn: #00205B` — certificate navy / dark sections
- `--cr: #8B1A1A` — certificate crimson
- `--cg: #C9A84C` — certificate gold

## Pages Still to Build

### `/titles` — All Titles Catalogue
- Grid/list of all 50+ titles
- Filter by grade (Supreme, Eternal, Heroic, Brilliant, Beloved, Mountain)
- Search by keyword
- Each card links to `/title/:slug`

### `/find` — Title Finder Quiz  
Already designed in chat — 5 questions, trait scoring system, reveal screen with certificate preview + order CTA. Questions:
1. When you enter a room, what happens?
2. How do others describe your opinions?
3. What is your relationship with authority?
4. What is your most recent significant achievement?
5. Where will this certificate be displayed?

Trait scoring: commanding → Iron-Willed Commander, radiant → Eternal Sun, brilliant → Brilliant Genius, beloved → Most Beloved

### `/registry` — Name Search
- Single search box (exact name, case-insensitive)
- Padlock privacy note: "No browsing. Exact name only."
- On match: display full certificate + mood-based KJU quote
- Admin panel (separate, password-protected): add name + select title + click Add

### `/gift` — Gifting Flow
- Gift message input
- Option to send to recipient email directly or download for self-presentation

## Key Content Voice Examples

**Good (in voice):**
> "The committee voted unanimously. It is always unanimous."

> "Workers at the Desert Colony are volunteers. No worker has resigned. No worker has expressed dissatisfaction. Conditions are excellent. There have been no complaints. There are no complaints to file."

> "The registry has never issued an incorrect title. This record will be maintained."

> "Potatoes are abundant. The committee has noted this in three separate quarterly reports."

**Bad (breaks voice):**
> "Of course, this is all in good fun!"
> "We think this title might suit you"
> "Some customers have reported..."

## Legal Disclaimer (appears in footer of every page)

> All titles satirical · For entertainment only · No actual authority conferred · "Kim Jong-un" on our certificates is a fictitious character · The registry is not affiliated with the North Korean government · The Desert Colony is a creative fiction · Workers are volunteers · Potatoes may or may not be abundant · This website was designed in 1997. All decisions are final.
