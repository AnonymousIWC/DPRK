"""
DPRK Title Registry — Print-Ready Certificate Generator
=======================================================
Produces a 2-page A4 PDF at high resolution (2.5x scale).
Front: Full certificate.  Back: Conditions, story, easter eggs.

REQUIREMENTS:
    pip install PyMuPDF

USAGE:
    python3 build_cert.py

    Or pass arguments:
    python3 build_cert.py "Name" "Title line 1\nTitle line 2" "Korean title" "STR-0001"

TO ADD GOOGLE FONTS (optional — improves name calligraphy):
    Download from https://fonts.google.com:
      - Great Vibes (for recipient name)
      - Cinzel (for title text)
      - Cormorant Garamond (for body text)
    Place the .ttf files in the fonts/ folder and update the FONT PATHS section below.
"""

import fitz
import sys
import math
import os

# ─────────────────────────────────────────────────────────────────────
# EDIT THESE PER ORDER
# ─────────────────────────────────────────────────────────────────────
RECIPIENT_NAME = "Margaret Brent"
TITLE_EN       = "Iron-Willed Commander of the\nGlorious People's Eternal Struggle"
TITLE_KO       = "강철의 의지를 지닌 영광스러운 인민의 사령관"
REGISTRY_NUM   = "STR-0001"
OUTPUT_FILE    = "certificate.pdf"
JUCHE_YEAR     = 113  # Update if needed

# ─────────────────────────────────────────────────────────────────────
# FONT PATHS — relative to this script
# ─────────────────────────────────────────────────────────────────────
BASE = os.path.dirname(os.path.abspath(__file__))
F    = os.path.join(BASE, "fonts")

PAGELLA_REG   = f"{F}/texgyrepagella-regular.otf"
PAGELLA_BOLD  = f"{F}/texgyrepagella-bold.otf"
PAGELLA_ITAL  = f"{F}/texgyrepagella-italic.otf"
PAGELLA_BOLDI = f"{F}/texgyrepagella-bolditalic.otf"
CHORUS        = f"{F}/texgyrechorus-mediumitalic.otf"   # calligraphic — used for name
SCHOLA_BOLD   = f"{F}/texgyreschola-bold.otf"
SCHOLA_REG    = f"{F}/texgyreschola-regular.otf"
NOTO_KR       = f"{F}/NotoSerifCJK-Regular.ttc"

# Optional upgrades — place these TTFs in fonts/ to use them
_GREAT_VIBES  = f"{F}/GreatVibes-Regular.ttf"
_CINZEL_BOLD  = f"{F}/Cinzel-Bold.ttf"
_CINZEL_REG   = f"{F}/Cinzel-Regular.ttf"
_CORMORANT_I  = f"{F}/CormorantGaramond-Italic.ttf"
_CORMORANT_R  = f"{F}/CormorantGaramond-Regular.ttf"

# Swap to Google Fonts versions if available
NAME_FONT     = _GREAT_VIBES  if os.path.exists(_GREAT_VIBES)  else CHORUS
TITLE_FONT    = _CINZEL_BOLD  if os.path.exists(_CINZEL_BOLD)  else SCHOLA_BOLD
HEADING_FONT  = _CINZEL_REG   if os.path.exists(_CINZEL_REG)   else SCHOLA_REG
BODY_FONT     = _CORMORANT_I  if os.path.exists(_CORMORANT_I)  else PAGELLA_ITAL
BODY_REG      = _CORMORANT_R  if os.path.exists(_CORMORANT_R)  else PAGELLA_REG

# ─────────────────────────────────────────────────────────────────────
# DIMENSIONS
# A4 = 595.28 x 841.89 pts.  Scale 2.5x for ~180 DPI equivalent.
# At print resolution, Officeworks/printers will render at 300dpi.
# ─────────────────────────────────────────────────────────────────────
SCALE = 2.5
W = 595.28 * SCALE
H = 841.89 * SCALE

# ─────────────────────────────────────────────────────────────────────
# COLOURS  (R, G, B) in 0–1
# ─────────────────────────────────────────────────────────────────────
NAVY    = (0.000, 0.125, 0.357)
CRIMSON = (0.545, 0.102, 0.102)
GOLD    = (0.788, 0.659, 0.294)
GOLD_LT = (0.961, 0.855, 0.478)
PAPER   = (0.961, 0.925, 0.843)
INK     = (0.100, 0.031, 0.000)
WHITE   = (1.000, 1.000, 1.000)
GREY    = (0.500, 0.450, 0.380)

# ─────────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────────
def pt(x): return x * SCALE

def text_w(txt, fontfile, fontsize):
    try:
        return fitz.Font(fontfile=fontfile).text_length(txt, fontsize=fontsize)
    except:
        return len(txt) * fontsize * 0.55

def tc(page, txt, cx, y, fontfile, fontsize, color=INK):
    if not txt: return
    x = cx - text_w(txt, fontfile, fontsize) / 2
    page.insert_text(fitz.Point(x, y), txt, fontfile=fontfile, fontsize=fontsize, color=color)

def tl(page, txt, x, y, fontfile, fontsize, color=INK):
    if not txt: return
    page.insert_text(fitz.Point(x, y), txt, fontfile=fontfile, fontsize=fontsize, color=color)

def ln(page, x0, y0, x1, y1, color, w=1):
    page.draw_line(fitz.Point(x0, y0), fitz.Point(x1, y1), color=color, width=w)

def rect(page, x0, y0, x1, y1, fill=None, stroke=None, w=1):
    page.draw_rect(fitz.Rect(x0, y0, x1, y1), color=stroke, fill=fill, width=w)

def star(page, cx, cy, ro, ri, n, fill, stroke=None, w=0.5):
    pts = []
    for i in range(n * 2):
        a = math.pi * i / n - math.pi / 2
        r = ro if i % 2 == 0 else ri
        pts.append(fitz.Point(cx + r * math.cos(a), cy + r * math.sin(a)))
    s = page.new_shape()
    s.draw_polyline(pts + [pts[0]])
    s.finish(color=stroke, fill=fill, width=w, closePath=True)
    s.commit()

def wrap(text, width):
    words = text.split()
    lines, cur, n = [], [], 0
    for word in words:
        extra = len(word) + (1 if cur else 0)
        if n + extra <= width:
            cur.append(word); n += extra
        else:
            if cur: lines.append(' '.join(cur))
            cur, n = [word], len(word)
    if cur: lines.append(' '.join(cur))
    return lines

def double_rule(page, x0, x1, y, color):
    gap = pt(1.4)
    ln(page, x0, y - gap, x1, y - gap, color, pt(1.2))
    ln(page, x0, y + gap, x1, y + gap, color, pt(0.35))

def corner(page, cx, cy, fx=1, fy=1):
    s = pt(13)
    ln(page, cx, cy, cx + fx * s * 1.9, cy, GOLD, pt(0.9))
    ln(page, cx, cy, cx, cy + fy * s * 1.9, GOLD, pt(0.9))
    ln(page, cx, cy, cx + fx * s * 1.45, cy + fy * s * 1.45, GOLD, pt(0.4))
    page.draw_circle(fitz.Point(cx, cy), pt(2.2), color=CRIMSON, fill=CRIMSON)
    page.draw_circle(fitz.Point(cx + fx * s * 1.9, cy), pt(1.3), color=GOLD, fill=GOLD)
    page.draw_circle(fitz.Point(cx, cy + fy * s * 1.9), pt(1.3), color=GOLD, fill=GOLD)

def emblem(page, cx, cy, r):
    page.draw_circle(fitz.Point(cx, cy), r, color=GOLD, width=pt(1.2))
    page.draw_circle(fitz.Point(cx, cy), r * 0.9, color=GOLD, width=pt(0.4))
    for side in [-1, 1]:
        ox = cx + side * r * 0.62
        for a in range(-72, 73, 18):
            rad = math.radians(a)
            lx = ox + side * math.sin(rad) * r * 0.30
            ly = cy - math.cos(rad) * r * 0.30
            ln(page, ox, cy, lx, ly, GOLD, pt(1.3))
    tri = [fitz.Point(cx, cy - r*.56), fitz.Point(cx - r*.40, cy + r*.32), fitz.Point(cx + r*.40, cy + r*.32)]
    s = page.new_shape()
    s.draw_polyline(tri + [tri[0]])
    s.finish(color=NAVY, fill=NAVY, width=0, closePath=True)
    s.commit()
    rect(page, cx - r*.33, cy + r*.10, cx + r*.33, cy + r*.32,
         fill=tuple(c * 0.55 for c in NAVY))
    for i in range(3):
        bx = cx - r*.22 + i * r*.22
        rect(page, bx, cy + r*.12, bx + r*.14, cy + r*.30, fill=(0.15, 0.30, 0.55))
    star(page, cx, cy - r * 0.28, r * 0.20, r * 0.09, 5, CRIMSON, CRIMSON, pt(0.3))

def sig(page, cx, cy, w):
    sx = w / 220
    def p(x, y): return fitz.Point(cx - w/2 + x*sx, cy + (y-32)*sx * 0.9)
    kw = pt(1.5) * sx * 3.5
    for pts, lw in [
        ([p(8,46), p(20,52), p(36,44), p(48,36)], kw),
        ([p(48,36), p(54,30), p(54,46), p(42,54)], kw*0.85),
        ([p(62,38), p(70,24), p(78,34), p(64,46)], kw*0.85),
        ([p(88,20), p(92,22), p(100,32), p(106,44)], kw),
        ([p(118,42), p(136,26), p(158,12), p(178,8)], kw),
        ([p(178,8), p(188,16), p(185,30), p(172,40)], kw*0.8),
    ]:
        s = page.new_shape()
        s.draw_bezier(*pts)
        s.finish(color=INK, width=lw, closePath=False)
        s.commit()
    page.draw_circle(p(88,20), pt(2.8)*sx*2.5, color=INK, fill=INK)
    page.draw_circle(p(178,8), pt(3.2)*sx*2.5, color=INK, fill=INK)

def seal(page, cx, cy, r, top, mid, bot):
    page.draw_circle(fitz.Point(cx, cy), r, color=CRIMSON, width=pt(1.3))
    page.draw_circle(fitz.Point(cx, cy), r*0.84, color=GOLD, width=pt(0.5))
    star(page, cx, cy - r*.16, r*.38, r*.17, 5, CRIMSON, CRIMSON, pt(0.3))
    tc(page, top, cx, cy - r*.72, PAGELLA_BOLD, pt(5.5), CRIMSON)
    tc(page, mid, cx, cy + r*.52, PAGELLA_BOLD, pt(6.5), CRIMSON)
    tc(page, bot, cx, cy + r*.82, PAGELLA_BOLD, pt(4.8), CRIMSON)

def crop_marks(page):
    bm, gap = pt(7), pt(3)
    for bx, by in [(0,0),(W,0),(0,H),(W,H)]:
        sx = 1 if bx == 0 else -1
        sy = 1 if by == 0 else -1
        ln(page, bx+sx*gap, by, bx+sx*(gap+bm), by, (.4,.4,.4), pt(0.4))
        ln(page, bx, by+sy*gap, bx, by+sy*(gap+bm), (.4,.4,.4), pt(0.4))

# ─────────────────────────────────────────────────────────────────────
# FRONT PAGE
# ─────────────────────────────────────────────────────────────────────
def front(page, name, title_en, title_ko, reg_num):
    mg = pt(14)
    pw = W - 2*mg
    ph = H - 2*mg

    # Background
    rect(page, 0, 0, W, H, fill=PAPER)
    for i in range(0, int(H), int(pt(4))):
        ln(page, 0, i, W, i, (.60,.50,.30), pt(0.07))

    # Triple border
    rect(page, mg, mg, mg+pw, mg+ph, stroke=GOLD, w=pt(1.9))
    rect(page, mg+pt(5.5), mg+pt(5.5), mg+pw-pt(5.5), mg+ph-pt(5.5), stroke=CRIMSON, w=pt(1.2))
    rect(page, mg+pt(9), mg+pt(9), mg+pw-pt(9), mg+ph-pt(9), stroke=GOLD, w=pt(0.4))

    # Corners
    p = pt(14)
    corner(page, mg+p, mg+p)
    corner(page, mg+pw-p, mg+p, -1, 1)
    corner(page, mg+p, mg+ph-p, 1, -1)
    corner(page, mg+pw-p, mg+ph-p, -1, -1)

    # Top navy band
    bh = pt(27)
    rect(page, mg, mg, mg+pw, mg+bh, fill=NAVY)
    ln(page, mg, mg+bh, mg+pw, mg+bh, CRIMSON, pt(2.8))
    tc(page, "조선민주주의인민공화국", mg+pw*.22, mg+bh*.66, NOTO_KR, pt(7.5), WHITE)
    tc(page, "DPRK TITLE REGISTRY", W/2, mg+bh*.66, SCHOLA_BOLD, pt(9), WHITE)
    tc(page, f"Juche {JUCHE_YEAR} · Official Document", mg+pw*.78, mg+bh*.66, PAGELLA_ITAL, pt(6.5), (.8,.8,.8))

    # Crimson ribbon
    ry = mg + bh
    rh = pt(14)
    rect(page, mg, ry, mg+pw, ry+rh, fill=CRIMSON)
    ln(page, mg, ry+rh, mg+pw, ry+rh, GOLD, pt(0.9))
    tc(page, "★  Democratic People's Republic of Korea — Supreme Title Registry  ★",
       W/2, ry+rh*.70, SCHOLA_BOLD, pt(7.5), GOLD_LT)

    y = ry + rh + pt(13)

    # Emblem
    ecx, ecy = W/2, y + pt(38)
    er = pt(29)
    emblem(page, ecx, ecy, er)
    double_rule(page, mg+pt(18), ecx-er-pt(8), ecy, GOLD)
    double_rule(page, ecx+er+pt(8), mg+pw-pt(18), ecy, GOLD)

    # Star row
    sy2 = ecy + er + pt(11)
    configs = [(pt(4),pt(2),CRIMSON),(pt(3),pt(1.5),GOLD),(pt(5.5),pt(2.5),CRIMSON),
               (pt(3),pt(1.5),GOLD),(pt(5.5),pt(2.5),CRIMSON),(pt(3),pt(1.5),GOLD),(pt(4),pt(2),CRIMSON)]
    for i,(ro,ri,col) in enumerate(configs):
        star(page, W/2 + (i-3)*pt(15), sy2, ro, ri, 5, col, col, pt(0.3))

    y = sy2 + pt(13)

    # Issued by
    tc(page, "SUPREME TITLE REGISTRY", W/2, y, SCHOLA_BOLD, pt(8), CRIMSON)
    y += pt(12)
    tc(page, "By Supreme Decree of the Democratic People's Republic of Korea",
       W/2, y, BODY_FONT, pt(8.5), INK)
    y += pt(11)
    tc(page, "Issued from the Official Registry, Desert Colony, Australia",
       W/2, y, BODY_FONT, pt(8), (.35,.25,.15))
    y += pt(15)

    double_rule(page, mg+pt(22), mg+pw-pt(22), y, CRIMSON)
    y += pt(7)
    ln(page, mg+pt(40), y, mg+pw-pt(40), y, GOLD, pt(0.4))
    y += pt(13)

    # "Be it known"
    tc(page, "Be it known throughout all the nation and beyond that",
       W/2, y, BODY_FONT, pt(9.5), (.35,.25,.15))
    y += pt(20)

    # Recipient name
    nfs = pt(30) if len(name) <= 18 else pt(24) if len(name) <= 25 else pt(20)
    nw = text_w(name, NAME_FONT, nfs)
    page.insert_text(fitz.Point(W/2 - nw/2, y), name,
                     fontfile=NAME_FONT, fontsize=nfs, color=NAVY)
    y += pt(9)
    ln(page, mg+pt(42), y, mg+pw-pt(42), y, GOLD, pt(1.1))
    y += pt(15)

    # Conferral line
    tc(page, "is henceforth and in absolute perpetuity to be addressed by the title of",
       W/2, y, BODY_FONT, pt(8.5), (.35,.25,.15))
    y += pt(17)

    # Title box
    bpad = pt(48)
    bx0, bx1 = mg+bpad, mg+pw-bpad
    tlines = title_en.split('\n')
    tfs = pt(11.5) if max(len(l) for l in tlines) <= 38 else pt(9.5)
    bh2 = pt(12) + pt(10) + len(tlines) * (tfs + pt(6)) + pt(10)
    by0, by1 = y, y + bh2
    rect(page, bx0, by0, bx1, by1, fill=(.98,.95,.90), stroke=CRIMSON, w=pt(1.1))
    rect(page, bx0+pt(3), by0+pt(3), bx1-pt(3), by1-pt(3),
         stroke=(.65,.28,.28), w=pt(0.35))
    ty = by0 + pt(12)
    tc(page, title_ko, W/2, ty, NOTO_KR, pt(8.5), CRIMSON)
    ty += pt(13)
    for l in tlines:
        tc(page, l.upper(), W/2, ty, TITLE_FONT, tfs, CRIMSON)
        ty += tfs + pt(6)
    y = by1 + pt(5)

    # Wheat/star strip
    sh = pt(12)
    rect(page, mg, y, mg+pw, y+sh, fill=NAVY)
    ln(page, mg, y, mg+pw, y, GOLD, pt(1.8))
    ln(page, mg, y+sh, mg+pw, y+sh, GOLD, pt(0.9))
    for i in range(22):
        ox = mg + (i+0.5) * (pw/22)
        oy = y + sh/2
        if i % 4 == 2: star(page, ox, oy, pt(3.2), pt(1.5), 5, GOLD, GOLD, pt(0.2))
        elif i % 2 == 0: page.draw_circle(fitz.Point(ox,oy), pt(1.3), color=GOLD, fill=GOLD)
        else: star(page, ox, oy, pt(2), pt(1), 5, (.8,.6,.2), None, pt(0.3))
    y += sh + pt(11)

    # Body text
    for line in [
        "In solemn recognition of their formidable qualities, their absolute correctness in all matters,",
        "and their outstanding contribution to the Revolutionary Cause of the People.",
        "This honour is granted by Supreme Decree. It is permanent, eternal, and without condition.",
        "Let all citizens conduct themselves accordingly in the presence of this person.",
    ]:
        tc(page, line, W/2, y, BODY_FONT, pt(7.8), (.29,.22,.14))
        y += pt(11.5)

    y += pt(9)
    ln(page, mg+pt(22), y, mg+pw-pt(22), y, (.7,.6,.4), pt(0.5))
    y += pt(13)

    # Signature row
    sr = pt(21)
    scy = y + sr
    seal(page, mg+pt(55), scy, sr, "OFFICIAL", str(JUCHE_YEAR), "REGISTRY")
    seal(page, mg+pw-pt(55), scy, sr, "JUCHE", str(JUCHE_YEAR), "OFFICIAL")
    sig(page, W/2, y + pt(5), pt(125))
    sl_y = y + pt(38)
    ln(page, W/2-pt(62), sl_y, W/2+pt(62), sl_y, CRIMSON, pt(0.9))
    tc(page, "김정은 · Kim Jong-un", W/2, sl_y+pt(9.5), NOTO_KR, pt(7.5), CRIMSON)
    tc(page, "SUPREME LEADER · GENERAL SECRETARY", W/2, sl_y+pt(18), SCHOLA_BOLD, pt(5.5), CRIMSON)
    tc(page, "Workers' Party of Korea · DPRK", W/2, sl_y+pt(25), PAGELLA_ITAL, pt(6.5), (.55,.55,.55))

    y = scy + sr + pt(9)
    tc(page,
       f"Registry No. {reg_num}  ·  A4 · 200gsm  ·  Desert Colony, Australia  ·  Juche {JUCHE_YEAR}",
       W/2, y, PAGELLA_ITAL, pt(5.5), (.55,.48,.38))

    # Bottom band
    bbh = pt(19)
    bby = mg + ph - bbh
    rect(page, mg, bby, mg+pw, mg+ph, fill=NAVY)
    ln(page, mg, bby, mg+pw, bby, CRIMSON, pt(2.8))
    tc(page, "조선민주주의인민공화국", mg+pw*.22, bby+bbh*.64, NOTO_KR, pt(7.5), (.8,.8,.8))
    tc(page, f"★  Supreme Title Registry  ·  Est. Juche {JUCHE_YEAR}  ★",
       W/2, bby+bbh*.64, SCHOLA_BOLD, pt(7), GOLD)
    tc(page, "Democratic People's Republic of Korea", mg+pw*.78, bby+bbh*.64,
       PAGELLA_ITAL, pt(6.5), (.7,.7,.7))

    crop_marks(page)


# ─────────────────────────────────────────────────────────────────────
# BACK PAGE
# ─────────────────────────────────────────────────────────────────────
def back(page, name, title_en, reg_num):
    mg = pt(14)
    pw = W - 2*mg
    ph = H - 2*mg

    rect(page, 0, 0, W, H, fill=PAPER)
    for i in range(0, int(H), int(pt(4))):
        ln(page, 0, i, W, i, (.60,.50,.30), pt(0.06))

    rect(page, mg, mg, mg+pw, mg+ph, stroke=GOLD, w=pt(1.9))
    rect(page, mg+pt(5.5), mg+pt(5.5), mg+pw-pt(5.5), mg+ph-pt(5.5), stroke=CRIMSON, w=pt(1.2))
    rect(page, mg+pt(9), mg+pt(9), mg+pw-pt(9), mg+ph-pt(9), stroke=GOLD, w=pt(0.4))

    p = pt(14)
    corner(page, mg+p, mg+p)
    corner(page, mg+pw-p, mg+p, -1, 1)
    corner(page, mg+p, mg+ph-p, 1, -1)
    corner(page, mg+pw-p, mg+ph-p, -1, -1)

    bh = pt(23)
    rect(page, mg, mg, mg+pw, mg+bh, fill=NAVY)
    ln(page, mg, mg+bh, mg+pw, mg+bh, CRIMSON, pt(2.8))
    tc(page, "DPRK TITLE REGISTRY  ·  CONDITIONS OF HONOUR  ·  REVERSE",
       W/2, mg+bh*.65, SCHOLA_BOLD, pt(7.5), WHITE)

    y = mg + bh + pt(15)

    # KJU Quote
    quote = ('"Only a great people can write such a great chronicle for the times and history. '
             'As this great people throw in their lot with the country and find their greatest '
             'honour and joy of life in devoting themselves to its victory and glory, our Party '
             'is invincible and our socialism is ever-prosperous."')
    for line in wrap(quote, 90):
        tc(page, line, W/2, y, BODY_FONT, pt(8), INK)
        y += pt(12)
    y += pt(3)
    tc(page, "— Kim Jong-un, General Secretary, Workers' Party of Korea  ·  Rodong Sinmun, Juche 114",
       W/2, y, BODY_REG, pt(6.5), CRIMSON)
    y += pt(14)

    ln(page, mg+pt(22), y, mg+pw-pt(22), y, GOLD, pt(0.4))
    y += pt(12)

    # Story
    tc(page, "THE CERTIFICATE", W/2, y, SCHOLA_BOLD, pt(8.5), CRIMSON)
    y += pt(13)
    story = ("The Supreme Leader was reviewing documents of state when he paused. "
             "Officials fell silent with respectful embarrassment. "
             "He had observed that certain citizens of extraordinary quality remained formally unacknowledged. "
             "He issued guidance. A registry was established. "
             "Arrangements were made at the Desert Colony, coordinates 29°S 131°E. "
             "Officials broke into stormy cheers of Hurrah.")
    for line in wrap(story, 96):
        tc(page, line, W/2, y, BODY_FONT, pt(7.8), (.20,.15,.10))
        y += pt(11)

    y += pt(10)
    ln(page, mg+pt(40), y, mg+pw-pt(40), y, GOLD, pt(0.4))
    y += pt(13)

    # Conditions
    tc(page, "CONDITIONS OF HONOUR", W/2, y, SCHOLA_BOLD, pt(8.5), CRIMSON)
    y += pt(14)

    conditions = [
        ("I.",   "This title is permanent, irrevocable, and without condition. The registry does not "
                 "accept requests for amendment, reconsideration, or clarification."),
        ("II.",  "The recipient is encouraged to use this title in all formal correspondence, "
                 "professional settings, and any situation in which they feel it may be advantageous."),
        ("III.", "The registry maintains the permanent record. Citizens may verify their entry "
                 "by searching their name at the Official Registry."),
        ("IV.",  "The beatings will continue until morale improves."),
        ("V.",   "This certificate has been issued by Supreme Decree. "
                 "The Supreme Leader has reviewed the matter and finds it entirely satisfactory. "
                 "Stormy cheers of Hurrah are the appropriate response."),
    ]
    for num, body in conditions:
        tl(page, num, mg+pt(20), y, SCHOLA_BOLD, pt(7.8), CRIMSON)
        for line in wrap(body, 84):
            tl(page, line, mg+pt(38), y, BODY_REG, pt(7.8), INK)
            y += pt(11.5)
        y += pt(5)

    y += pt(4)
    ln(page, mg+pt(22), y, mg+pw-pt(22), y, GOLD, pt(0.4))
    y += pt(12)

    # Korean easter egg
    tc(page, "공식 인증 번역  ·  CERTIFIED TRANSLATION", W/2, y, SCHOLA_BOLD, pt(6.5), CRIMSON)
    y += pt(12)
    ko_text = ("이 증서는 매우 공식적입니다. 우리는 사막에서 이것을 인쇄합니다. "
               "감자는 풍부합니다. 사기가 향상되었습니다. 항상 그래왔습니다.")
    for line in wrap(ko_text, 55):
        tc(page, line, W/2, y, NOTO_KR, pt(7.5), (.30,.20,.10))
        y += pt(12)

    y += pt(8)

    # Fake QR code
    qr = pt(30)
    qx = W/2 - qr/2
    rect(page, qx, y, qx+qr, y+qr, stroke=GOLD, w=pt(0.9))
    cell = qr / 7
    pattern = [
        [1,1,1,0,1,1,1],
        [1,0,1,0,1,0,1],
        [1,1,1,0,1,1,1],
        [0,0,1,1,0,1,0],
        [1,1,1,0,1,0,1],
        [1,0,0,0,0,0,1],
        [1,0,1,1,1,0,1],
    ]
    for r2 in range(7):
        for c2 in range(7):
            if pattern[r2][c2]:
                rect(page, qx+c2*cell, y+r2*cell, qx+(c2+1)*cell, y+(r2+1)*cell, fill=NAVY)
    tc(page, "REGISTRY VERIFICATION", W/2, y+qr+pt(9), BODY_REG, pt(5.8), CRIMSON)
    tc(page, "Response time: immediate to several working centuries",
       W/2, y+qr+pt(16), PAGELLA_ITAL, pt(5.8), (.5,.4,.3))
    tc(page, "Desert Colony, Central Australia  ·  29°S 131°E",
       W/2, y+qr+pt(23), PAGELLA_ITAL, pt(5.8), (.5,.4,.3))

    # Ultra-fine print (only readable under magnification)
    page.insert_text(
        fitz.Point(mg+pt(15), mg+ph-pt(8)),
        ("If you are reading this you have looked very closely at the back of a certificate "
         "and this is exactly the kind of person who deserves a title. Stormy cheers of Hurrah!"),
        fontfile=PAGELLA_ITAL, fontsize=pt(3.5), color=(.5,.4,.3))

    # Diagonal watermark — very faint, drawn via shape for angle support
    wm_shape = page.new_shape()
    wm_mat = fitz.Matrix(1, 0, 0, 1, 0, 0).prerotate(32)
    # Draw watermark text as a slightly rotated annotation using a rect
    wm_rect = fitz.Rect(mg+pt(55), mg+ph*.25, mg+pw-pt(30), mg+ph*.55)
    page.insert_textbox(
        wm_rect,
        "ETERNAL GLORY",
        fontfile=PAGELLA_BOLD,
        fontsize=pt(44),
        color=(.80,.72,.55),
        rotate=0,
        align=1,
    )

    # Registry number
    tc(page,
       f"Registry No. {reg_num}  ·  Desert Colony, Australia  ·  Juche {JUCHE_YEAR}",
       W/2, mg+ph-pt(22), PAGELLA_ITAL, pt(5.8), (.55,.48,.38))

    bbh = pt(14)
    bby = mg + ph - bbh
    rect(page, mg, bby, mg+pw, mg+ph, fill=NAVY)
    ln(page, mg, bby, mg+pw, bby, CRIMSON, pt(2.8))
    tc(page, "★  This certificate is satirical · For entertainment only · No actual authority conferred  ★",
       W/2, bby+bbh*.65, PAGELLA_ITAL, pt(5.8), (.7,.7,.7))

    crop_marks(page)


# ─────────────────────────────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────────────────────────────
def build(name, title_en, title_ko, reg_num, output):
    print(f"Building certificate for: {name}")
    print(f"Title: {title_en.replace(chr(10),' ')}")
    print(f"Registry: {reg_num}")

    doc = fitz.open()
    p1 = doc.new_page(width=W, height=H)
    front(p1, name, title_en, title_ko, reg_num)

    p2 = doc.new_page(width=W, height=H)
    back(p2, name, title_en, reg_num)

    doc.set_metadata({
        "title": f"DPRK Title Registry — {name}",
        "author": "Supreme Title Registry, Desert Colony, Australia",
        "subject": f"Honorary Title Certificate — {reg_num}",
        "creator": f"DPRK Title Registry · Juche {JUCHE_YEAR}",
    })
    doc.save(output, garbage=4, deflate=True)
    doc.close()

    size_kb = os.path.getsize(output) // 1024
    print(f"\nSaved: {output} ({size_kb} KB)")
    print(f"Page size: {W/SCALE:.1f} x {H/SCALE:.1f} pts (A4)")
    print(f"Scale: {SCALE}x — suitable for 200gsm print via Officeworks or home laser printer")
    print("\nTo customise per order, edit RECIPIENT_NAME, TITLE_EN, TITLE_KO, REGISTRY_NUM at the top of this file.")


if __name__ == "__main__":
    if len(sys.argv) >= 4:
        n   = sys.argv[1]
        ten = sys.argv[2].replace('\\n', '\n')
        tko = sys.argv[3]
        rn  = sys.argv[4] if len(sys.argv) > 4 else REGISTRY_NUM
        out = sys.argv[5] if len(sys.argv) > 5 else OUTPUT_FILE
    else:
        n, ten, tko, rn, out = RECIPIENT_NAME, TITLE_EN, TITLE_KO, REGISTRY_NUM, OUTPUT_FILE

    build(n, ten, tko, rn, out)
