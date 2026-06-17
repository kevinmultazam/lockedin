# Design Brief: Lockedin

**Tone:** Premium minimalism. Refined, calm, focused. Discipline without coldness.

**Color Palette**

| Token | OKLCH | Use |
|-------|-------|-----|
| background | 0.99 0 0 | Main surface, breathing room |
| foreground | 0.12 0.01 0 | Text, deep neutral (not pure black) |
| primary | 0.25 0.04 0 | Buttons, interactive elements, intentional charcoal |
| accent | 0.72 0.09 134 | Success states, completed challenges, muted sage |
| muted | 0.92 0 0 | Secondary backgrounds, subtle borders |
| border | 0.93 0.01 0 | Card dividers, delicate lines |
| destructive | 0.62 0.2 24 | Warnings, resets |

**Typography**

| Layer | Font | Use |
|-------|------|-----|
| Display | Fraunces (serif) | Headers, "Lockedin", titles — unexpected sophistication |
| Body | DM Sans (geometric) | Content, challenges, descriptive text — clean & modern |
| Mono | Geist Mono | Numbers, progress %, day counters — distinct identity |

**Shape Language**

- Border radius: 24px (lg), 22px (md), 20px (sm) — generous, modern, approachable
- Pill buttons (rounded-full) for CTAs — intentional micro-detail
- No sharp corners; all components softly rounded

**Elevation & Depth**

| Shadow | Use |
|--------|-----|
| shadow-card | Challenge cards, light elevation |
| shadow-subtle | Borders, dividers, minimal depth |
| shadow-elevated | Modals, overlays, maximum depth |

**Structural Zones**

| Zone | Treatment |
|------|-----------|
| Header | bg-background, border-b border-border, title in Fraunces |
| Main content | bg-background, card-based grid layout |
| Challenge cards | bg-card, shadow-card, rounded-lg, hover lift effect |
| Footer | bg-muted/20, border-t border-border, low visual weight |

**Motion**

- Transitions: 300ms, cubic-bezier(0.4, 0, 0.2, 1) — Apple-style ease
- Checkbox complete: fade + subtle scale (0.98 → 1.0) + strike-through text
- Hover: color shift, shadow lift, no bounce
- Progress updates: smooth number transitions

**Spacing & Rhythm**

- Gap between cards: 1rem (consistent, breathing)
- Padding inside cards: 1.5rem
- Header/footer padding: 2rem top/bottom, 1rem sides
- Whitespace as design element — never cramped

**Component Patterns**

- Card: solid bg-card, shadow-card, rounded-lg border-border
- Checkbox: styled input, smooth animation on change, uses accent color
- Button: primary (bg-primary, text-primary-foreground), secondary (bg-muted)
- Progress bar: full width, bg-muted, accent fill, rounded-full
- Badge: bg-muted, text-muted-foreground, small rounded

**Signature Detail**

Serif + geometric sans pairing creates premium editorial feel, unexpected in productivity apps. Muted sage accent (not bright green) signals calm discipline, not urgency.
