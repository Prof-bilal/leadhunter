# LeadHunter Design System

**Version:** 1.0  
**Last Updated:** September 2, 2026  
**Status:** Design Specification for AI Implementation

---

## 1. PRODUCT UNDERSTANDING

LeadHunter is a **desktop-first B2B prospecting workstation** that intelligently discovers, analyzes, and scores potential customers for sales professionals.

**Core Value Proposition:**  
Eliminate manual research by providing an automated prospecting assistant that shows you *which* businesses are worth contacting and *why*.

**Primary User:**
- Sales development representatives (SDRs)
- Founders doing outbound sales
- Account executives prospecting for vertical-specific industries
- Sales leaders managing prospecting workflows

**User Pain Points Solved:**
- Manual research across multiple tools consuming 2-4 hours per prospect
- Difficulty identifying businesses with actual problems to solve
- Inability to prioritize leads by real opportunity signals (website quality, conversion gaps, etc.)
- Lack of personalized context for outreach

---

## 2. DESIGN PRINCIPLES

These principles guide every design decision:

1. **Evidence Before AI** — Show data and reasoning first; AI recommendations second. Users must understand *why* a lead scores 87/100.
2. **Intelligence Over Templates** — Avoid generic SaaS dashboards. This is a specialized research workstation.
3. **Speed Over Clicks** — Keyboard shortcuts and command palette are primary. Mouse is secondary.
4. **Density Over Minimalism** — Information-dense layouts for power users; never hide important context.
5. **Explanation Over Metrics** — "Website loads 6.8s (poor conversion)" beats "Performance: 34/100."
6. **Action Over Browsing** — Every screen should have a clear, obvious next action.
7. **Desktop First** — Optimize for 1440×900 and 1920×1080. Do not adapt from mobile.
8. **Keyboard Mastery** — Keyboard-first workflows; discoverable via Cmd/Ctrl+K command palette.

---

## 3. COMPETITIVE/UI RESEARCH SYNTHESIS

### References Studied

**Best Overall Reference: Attio CRM**  
- **Why:** Data-dense modern interface balancing precision with freshness
- **Key Pattern:** Multiple views (Grid, Kanban, List) for same data; customizable at pixel level
- **Learn:** Teal-green color strategy feels modern without distraction; sophisticated semantic labels for metadata
- **URL:** https://www.attio.com

**Best Spreadsheet/Data UI: Apollo + Clay Hybrid**  
- Apollo: High-contrast spreadsheet grid for lead enrichment; practical icon usage; filter pinning
- Clay: Waterfall enrichment logic visible in columns; conditional UI based on data types
- **Learn:** Spreadsheet metaphor works for power users; column actions (pull data, run AI, sync) are discoverable
- **URL:** https://apollo.io, https://clay.com

**Best Keyboard+Speed Pattern: Superhuman**  
- **Why:** <100ms interactions + comprehensive keyboard shortcuts = genuine productivity
- **Learn:** Command palette (Cmd+K) is single entry point; every action is discoverable via text search
- **Pattern:** Split sections reduce cognitive load; clean interface focuses attention on content
- **URL:** https://superhuman.com

**Best Desktop Navigation: Linear**  
- **Why:** Minimal purple accent, dark professional workspace, fast interactions
- **Learn:** Sidebar persistent; breadcrumbs optional; Inter font + 4px grid creates rhythm
- **Pattern:** Theme customization lets users own their environment
- **URL:** https://linear.app

**Best Report/Audit UI: Lighthouse + Interface Audit**  
- **Why:** Shows problem → evidence → impact → recommendation; not just raw metrics
- **Learn:** Scores contextual with explanations; visual hierarchy emphasizes actionable issues
- **Pattern:** Traffic light colors (red/yellow/green) work but optional; evidence screenshots stronger
- **URL:** https://developer.chrome.com/docs/lighthouse

**Best Command Interface: Arc Browser**  
- **Why:** Command palette centered; Spotlight-style search for everything
- **Learn:** Centered command bar feels modern and inviting
- **Pattern:** Tab key reveals integrations (e.g., type "maps.google.com" + Tab → search Maps directly)
- **URL:** https://arc.net

**Best Productivity Launcher: Raycast**  
- **Why:** Modern native macOS feel; dramatic negative space; keyboard-obsessed
- **Learn:** Extensions for common tools (Figma, Linear, Notion) reduce tool-switching
- **Pattern:** Recent items, quick actions, extensions create muscle memory
- **URL:** https://raycast.com

**Best Map/Discovery Pattern: Google Maps + Scrap.io**  
- **Why:** Polygon/radius search for location-based lead gen; visual context for geographic targeting
- **Learn:** Maps reduce scrolling; filters on left, results on right, detail panel optional
- **Pattern:** Can draw search boundary; toggleable layers for business signals
- **URL:** https://maps.google.com, https://scrap.io

**Best Sales CRM UI: Close + Attio Hybrid**  
- Close: Functional design; integrated calling/email/pipeline in one view
- Attio: Sophisticated data relationships; multiple simultaneous views of same data
- **Learn:** Inbox View (Close) captures new activity with auto-prioritization; don't force scrolling to find hot leads
- **URL:** https://close.com, https://www.attio.com

**Best Developer Tool Pattern: VS Code + Modern Developer Tools**  
- **Why:** Familiar to technical users; command palette ubiquitous
- **Learn:** Extensions/integrations are first-class; settings discoverable not hidden
- **URL:** https://code.visualstudio.com

---

## 4. DESIGN APPROACH DECISIONS

### 4.1 Navigation Style

**Decision: Persistent Left Sidebar + Command Palette (Cmd/Ctrl+K)**

**Why this approach:**
- Sidebar visible at 1440×900 without crowding main content
- Command Palette (Cmd+K) is primary for power users who know what they want
- Breadcrumbs optional in main content (not required)
- No collapsible sidebar burden; space is dedicated
- Aligns with Linear, Arc, Raycast patterns (modern desktop tools)

**Implementation:**
```
Sidebar (220px, persistent):
├── Logo/Brand
├── Navigation items:
│   ├── Dashboard (home icon)
│   ├── Find Leads (search icon)
│   ├── Leads (folder icon)
│   ├── Audits (chart icon)
│   ├── Campaigns (target icon)
│   ├── Outreach (send icon)
│   └── Settings (gear icon)
├── Workspace switcher (bottom)
└── User profile (bottom)

Command Palette (Cmd+K):
├── Instant search across leads, audits, campaigns
├── Quick actions ("Create audit", "Find leads", etc.)
└── Navigation history (recent pages)
```

### 4.2 Lead Discovery / "Find Leads" Screen

**Decision: Focused Input + Smart Targeting + Large CTA**

**Why:**
- First-time users enter one sentence: "I build websites for restaurants"
- Advanced targeting optional but available (business type, location, revenue range)
- Search runs client-side or background; shows progress
- Results appear in dedicated panel below

**Layout:**
```
┌────────────────────────────────────────────────────┐
│ Sidebar       Find Leads                           │
├──────────────┼────────────────────────────────────┤
│              │ "What do you sell?"                 │
│              │ [Large input text]                  │
│              │                                    │
│              │ Advanced Targeting (toggle)        │
│              │ ├── Business Type                  │
│              │ ├── Location / Radius              │
│              │ ├── Company Size                   │
│              │ └── Industry Signals               │
│              │                                    │
│              │ [Find Leads] (large CTA)          │
│              │                                    │
│              │ Search History / Recent Searches   │
│              │ ─────────────────────────────────  │
│              │ "Sell SaaS to mid-market"         │
│              │ "Build apps for fintech"          │
└────────────────────────────────────────────────────┘
```

### 4.3 Lead Results Layout

**Decision: Three-Column Design (Filters | List | Detail)**

**Why:**
- Filters stay visible (Clay, Apollo pattern)
- List of leads scrollable without losing context
- Detail panel shows full business profile on selection
- Works at 1440×900 and 1920×1080

**Column Widths:**
- Filters: 240px (collapsible)
- Lead List: 400px
- Detail/Map: Remaining space

**Lead List Item:**
```
┌─────────────────────────────────┐
│ [Business Name]                 │
│ Category · Location             │
│ ★ 87/100 Opportunity           │
│ Weak mobile · No booking system │
└─────────────────────────────────┘
```

**Detail Panel Content:**
- Business identity (name, website, social)
- Opportunity score breakdown (4-6 factors)
- Detected problems with evidence
- Business strengths
- Recommended approach
- [Audit Now] [Save] [Add to Campaign]

### 4.4 Information Density Strategy

**Decision: Dense, but Scannable with Semantic Labels**

**Why:**
- Attio + Apollo pattern: high density for power users
- Semantic labels (small caps, color-coded) make scanning fast
- Whitespace used strategically between sections, not everywhere
- Respects that users are doing serious research work

**Example Opportunity Score Card:**
```
┌──────────────────────────────┐
│ OPPORTUNITY SCORE            │
│ 87 / 100                     │
│ HIGH VALUE TARGET            │
├──────────────────────────────┤
│ Website Quality      82%     │
│ Business Demand      91%     │
│ Conversion Gap       88%     │
│ Competitive Fit      79%     │
│ Intent Signals       74%     │
└──────────────────────────────┘
```

### 4.5 Scoring Explanation

**Decision: Score + Factors + Evidence (No Gamification)**

**Why:**
- Every score must be explainable
- Traffic light colors optional (users understand context)
- Evidence panel shows *why* website quality = 82%
- Removes "magic AI" feeling; builds trust

**Example Score Card:**
```
WEBSITE QUALITY: 82/100

Evidence:
├── Load time: 6.8s (poor)
│   └── Competitors: 2.1s (industry average)
├── Mobile score: 64 (fair)
│   └── 32% of traffic is mobile
├── Form conversion: Missing email capture
│   └── Estimated lost leads: ~15/week
└── Accessibility: Poor (WCAG C)
    └── 8% of visitors have visual impairments

Recommendation:
Fastest ROI: Fix mobile experience + add email capture.
Could generate 10-15 additional leads per week.
```

### 4.6 Audit / Website Analysis Screen

**Decision: Problem-First Approach (Not Metric-First)**

**Why:**
- Show business impact, not technical jargon
- Problem → Evidence → Impact → Solution structure
- Lighthouse inspiration, but adapted for sales context

**Layout:**
```
┌──────────────────────────────────┐
│ Website Audit: [Business Name]   │
├──────────────────────────────────┤
│ Last Scanned: [date] [Rescan]   │
│                                 │
│ PERFORMANCE                     │
│ ├── 🔴 Load time: 6.8s          │
│ │   Evidence: Slow server + LCP  │
│ │   Impact: 12% drop-off rate    │
│ │   Fix: Optimize images + CDN   │
│ │                               │
│ ├── 🟡 Mobile: 64/100           │
│ │   Evidence: Stack overflow     │
│ │   Impact: Poor on-site XP      │
│ │   Fix: Responsive breakpoints  │
│ │                               │
│ └── 🟢 SSL: Active               │
│                                 │
│ CONVERSION FUNNEL                │
│ ├── 🔴 No email capture          │
│ │   Evidence: No form visible    │
│ │   Impact: No lead flow         │
│ │   Fix: Add email capture form  │
│ │                               │
│ └── 🟡 CTAs buried below fold     │
│     Evidence: 3 clicks to action  │
│     Impact: 8% CTA click rate     │
│     Fix: Above-the-fold button    │
│                                 │
│ SEO                             │
│ ├── 🟡 Meta tags: Partial        │
│ └── 🟢 Structured data: Present  │
└──────────────────────────────────┘
```

### 4.7 Sales Pitch / Outreach Screen

**Decision: Why-First, Evidence-First, Action-Ready**

**Layout:**
```
┌────────────────────────────────────────┐
│ Sales Pitch for [Business Name]        │
├────────────────────────────────────────┤
│                                        │
│ WHY THIS LEAD?                         │
│ ┌──────────────────────────────────────┐
│ │ Based on analysis:                   │
│ │ 1. Strong demand (high traffic,     │
│ │    reviews, hiring)                 │
│ │ 2. Technical gaps (slow mobile,     │
│ │    conversion issues)                │
│ │ 3. Competitive weakness (see        │
│ │    competitors have online booking) │
│ └──────────────────────────────────────┘
│                                        │
│ TOP PAIN POINTS                        │
│ ├── Mobile experience losing 12% sales │
│ ├── No online ordering (customers     │
│ │   going to competitors)              │
│ └── Booking scattered across email    │
│     and phone                          │
│                                        │
│ RECOMMENDED APPROACH                   │
│ Your tool solves: Mobile UX + online   │
│ ordering + booking system              │
│                                        │
│ GENERATED OPENING                      │
│ ┌──────────────────────────────────────┐
│ │ "Hi [Name], I noticed [Business]     │
│ │ getting great reviews but missing    │
│ │ online ordering. We helped similar   │
│ │ restaurants add ordering + mobile    │
│ │ booking, generating an extra..."     │
│ │                                      │
│ │ [Copy] [Edit] [Use Template]         │
│ └──────────────────────────────────────┘
│                                        │
│ [Add to Campaign] [Send Now] [Save]    │
└────────────────────────────────────────┘
```

### 4.8 Dashboard / Home Screen

**Decision: At-a-Glance Activity Hub**

**Layout:**
```
┌──────────────────────────────────────┐
│ Dashboard                            │
├──────────────────────────────────────┤
│                                      │
│ THIS WEEK                            │
│ ┌──────────┬──────────┬───────────┐ │
│ │ Leads     │ Audits   │ Outreach  │ │
│ │ Found: 47 │ Ran: 12  │ Sent: 38  │ │
│ └──────────┴──────────┴───────────┘ │
│                                      │
│ HIGH-OPPORTUNITY LEADS (new)          │
│ ├── Restaurant A · 91/100            │
│ │   Weak mobile, no online ordering   │
│ ├── SaaS B · 88/100                  │
│ │   Poor documentation, intent signal │
│ └── Legal C · 85/100                 │
│    Underutilized marketing tech      │
│                                      │
│ RECENT SEARCHES                      │
│ ├── "Sell web design to restaurants"  │
│ └── "Build apps for fintech"          │
│                                      │
│ ACTIVE CAMPAIGNS                     │
│ ├── Restaurant Outreach (12 pending)  │
│ └── Agency Growth (5 replies)         │
│                                      │
│ [New Search] [Audit] [Campaign]       │
└──────────────────────────────────────┘
```

---

## 5. VISUAL DIRECTION

### Color Palette

**Primary Principle:** Professional dark workspace with restrained accent color.

```yaml
# Light Mode (Secondary, not primary)
background: "#ffffff"
surface: "#f8f9fa"
surface-hover: "#f0f1f3"
border: "#e0e2e7"
text-primary: "#1c1d1f"  # Near-black
text-secondary: "#666666"
text-muted: "#999999"
accent: "#0066cc"  # Restrained blue
success: "#22863a"
warning: "#ffc107"
danger: "#d73a49"
info: "#0099cc"

# Dark Mode (Primary)
background: "#0d0e10"  # Deep charcoal (not pure black)
surface: "#121417"  # Slightly raised
surface-hover: "#1a1d22"
surface-active: "#242930"
border: "#2d3139"  # Subtle but visible
text-primary: "#eff3f4"  # Off-white
text-secondary: "#97a0af"
text-muted: "#5f6b7a"
accent: "#3b9eff"  # Clear blue (not harsh)
success: "#3fb950"
warning: "#d29922"
danger: "#f85149"
info: "#58a6ff"
```

**Why This Palette:**
- Deep charcoal (not pure black) reduces eye strain for all-day use
- Accent blue is professional without being corporate
- Semantic colors follow industry conventions
- Supports both light and dark; dark is primary
- High contrast for readability (4.5:1 minimum for WCAG AA)

### Typography

```yaml
font-family:
  primary: "Inter, -apple-system, system-ui, sans-serif"
  mono: "SF Mono, Monaco, Inconsolata, monospace"

type-scale:
  display-lg: "32px / 700 / -0.02em"  # Dashboard titles
  display-md: "24px / 600 / -0.015em"
  heading-lg: "20px / 600 / -0.01em"  # Section headers
  heading-md: "16px / 600 / -0.01em"
  heading-sm: "14px / 600 / 0"  # Card titles
  body-lg: "16px / 400 / 0.3px"  # Main body text
  body-md: "14px / 400 / 0.2px"  # Default
  body-sm: "12px / 400 / 0.15px"  # Secondary info
  label: "12px / 500 / 0.5px"  # All-caps labels ("OPPORTUNITY SCORE")
  code: "13px / 400 / monospace"

line-height:
  tight: 1.2
  normal: 1.5
  relaxed: 1.75

letter-spacing:
  tight: -0.02em
  normal: 0
  relaxed: 0.5px
```

**Why This Typography:**
- Inter is highly legible at small sizes; designed for screens
- Scale follows a clear 8px rhythm (accessible math)
- Semantic labels (small caps, bold) make hierarchy obvious
- Code uses monospace for technical data (timestamps, API responses)

### Spacing Scale

```yaml
spacing:
  0: "0"
  4: "4px"   # Micro-spacing (buttons, icons)
  8: "8px"   # Tiny gap (between inline elements)
  12: "12px" # Small padding (inside components)
  16: "16px" # Standard padding (default)
  24: "24px" # Medium spacing (between sections)
  32: "32px" # Large spacing (major sections)
  48: "48px" # Extra large (between major features)
  64: "64px" # Dramatic spacing (empty states)
```

**Why This System:**
- 4px base creates predictable, proportional layouts
- Multiples of 4 align with 1px borders, 2px shadows
- Reduces cognitive load; no arbitrary spacing
- Scales responsively at different breakpoints

### Border & Radius

```yaml
border-width:
  hairline: "1px"    # Subtle borders (cards, inputs)
  default: "2px"     # Button borders, dividers
  strong: "3px"      # Active states, emphasis

border-radius:
  none: "0"
  sm: "4px"   # Inputs, tags, small components
  md: "6px"   # Buttons, cards, dropdowns (default)
  lg: "8px"   # Panels, modals
  full: "9999px"  # Pills, circular elements

# Border Color Strategy
border-color:
  light: "var(--border)"        # Standard
  hover: "var(--text-primary)"  # On interaction
  active: "var(--accent)"       # Selected/focused
  error: "var(--danger)"        # Validation
```

**Why This System:**
- Minimal radius (4-8px) = modern, professional
- Avoids excessive roundedness (feels cheap)
- Clear hierarchy: sm < md < lg

### Shadows

```yaml
shadow:
  none: "none"
  sm: "0 1px 2px rgba(0, 0, 0, 0.08)"
  md: "0 4px 6px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)"
  lg: "0 10px 15px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.08)"
  xl: "0 20px 25px rgba(0, 0, 0, 0.18), 0 10px 10px rgba(0, 0, 0, 0.1)"

# Usage Guidelines
shadow-use:
  elevated-card: "md"
  modal: "lg"
  popover: "md"
  dropdown: "md"
  hover-state: "md"
  dragged-element: "xl"
```

**Why Minimal Shadows:**
- Professional tools (Linear, Attio) use restraint
- Over-shadowing creates visual chaos
- Dark mode shadows appear stronger; use sparingly
- Reserve shadows for true elevation/modals

### Icons

```yaml
icon-style: "Outlined"  # Not filled, not duotone
icon-size:
  xs: "12px"      # Micro-indicators
  sm: "16px"      # Inline, metadata
  md: "20px"      # Buttons, navigation (default)
  lg: "24px"      # Large buttons, hero sections
  xl: "32px"      # Empty states, illustrations

# Icon Pairing Rules
icon-usage:
  - Never icon-only on first appearance; pair with text
  - Navigation items: icon + text (Sidebar)
  - Buttons: icon + text or text-only (prefer text for clarity)
  - Status indicators: icon-only okay (🟢 green = success)
  - Metadata: icon + text ("📍 New York, NY")
```

**Why Outlined Icons:**
- Professional and clean (matches Attio, Linear)
- Consistent weight with 1-2px strokes
- Easy to understand at small sizes
- Avoid filled icons (appear heavy in data-dense UI)

---

## 6. COMPONENT LIBRARY

### Navigation Components

#### Sidebar Item
```
Active:
┌─────────────────────────────┐
│ 🏠 Dashboard                │  (icon + text, no indent)
└─────────────────────────────┘

Inactive:
┌─────────────────────────────┐
│ 🔍 Find Leads               │  (icon + text, muted)
└─────────────────────────────┘

Nested (if any):
┌─────────────────────────────┐
│ 📁 Leads                     │
│    ├── All (12)              │  (indented, count in muted)
│    ├── High Opportunity (3)  │
│    └── Saved (5)             │
└─────────────────────────────┘
```

#### Breadcrumb
```
Dashboard > Leads > High Opportunity > Restaurant A

- Text only, "/" or ">" separator
- Last item bold (current page)
- Clickable breadcrumbs (except last)
- Discourage deep nesting (keep to 3 levels max)
```

#### Command Palette (Cmd+K)
```
┌─────────────────────────────────────────┐
│ 🔍 Search leads, audits, actions...     │
├─────────────────────────────────────────┤
│ Quick Actions                           │
│ ├── ➕ Create New Search                │
│ ├── 🔍 Find Leads                       │
│ ├── 📊 Run Audit                        │
│ └── 📧 New Campaign                     │
│                                         │
│ Leads                                   │
│ ├── Restaurant A (87/100)               │
│ └── SaaS B (88/100)                     │
│                                         │
│ Audits                                  │
│ ├── Restaurant A (last week)            │
│ └── SaaS B (today)                      │
│                                         │
│ Pages                                   │
│ ├── Dashboard                           │
│ ├── Campaigns                           │
│ └── Settings                            │
└─────────────────────────────────────────┘
```

### Input Components

#### Search Input (Find Leads)
```
┌────────────────────────────────────────┐
│ 🔍 What do you sell?                   │
│ [User types: "I build websites for...] │
│                                        │
│ Suggestions appear below:               │
│ ├── restaurants                         │
│ ├── restaurants in New York             │
│ └── restaurants that need mobile UX    │
└────────────────────────────────────────┘
```

#### Filter Chip
```
Active:
┌──────────────┐
│ 🏢 NY ✕      │  (blue background, X to remove)
└──────────────┘

Inactive:
┌──────────────┐
│ 🏢 CA         │  (gray background, tappable)
└──────────────┘
```

#### Dropdown / Select
```
┌─────────────────────────────┐
│ Sort By: Opportunity Score ▼ │
├─────────────────────────────┤
│ ✓ Opportunity Score (high)  │
│   Opportunity Score (low)   │
│   Recently Added            │
│   Alphabetical              │
└─────────────────────────────┘
```

### Lead Components

#### Lead List Item (Compact)
```
┌──────────────────────────────────┐
│ 🏢 Restaurant XYZ                │
│ Fast Casual · New York, NY       │
│ Score: 87/100 ⭐ HIGH            │
│ Weak mobile · No online ordering │
│ [Details →]                      │
└──────────────────────────────────┘
```

#### Opportunity Score Card
```
┌────────────────────────────────────┐
│ OPPORTUNITY SCORE                  │
│ 87 / 100                           │
│ HIGH VALUE TARGET                  │
├────────────────────────────────────┤
│ Website Quality         ▓▓▓▓▓░░░░░ │  82%
│ Business Demand         ▓▓▓▓▓▓▓▓░░ │  91%
│ Conversion Gap          ▓▓▓▓▓▓▓░░░ │  88%
│ Competitive Weakness    ▓▓▓▓▓░░░░░ │  79%
│ Search Intent Signals   ▓▓▓▓▓░░░░░ │  74%
└────────────────────────────────────┘
```

#### Problem Block
```
┌──────────────────────────────────┐
│ 🔴 PRIORITY: Mobile Website       │
├──────────────────────────────────┤
│ Current: 64/100 (poor)            │
│ Competitor Avg: 85/100            │
│ Impact: 12% customer drop-off      │
│                                   │
│ Why It Matters:                   │
│ 32% of traffic from mobile.       │
│ Slow load = lost bookings.        │
│                                   │
│ Your Solution:                    │
│ Fast, mobile-first websites.      │
│ [Learn more] [Audit Full Site]    │
└──────────────────────────────────┘
```

### Action Components

#### Primary Button
```
┌─────────────────────┐
│ Find Leads          │  (Blue, white text, 6px radius)
└─────────────────────┘
State: hover → darker blue, slight shadow
State: active → blue + 0.1s scale(0.98)
State: disabled → gray, cursor: not-allowed
```

#### Secondary Button
```
┌─────────────────────┐
│ Save                │  (Gray background, dark text, 6px radius)
└─────────────────────┘
```

#### Ghost Button
```
┌─────────────────────┐
│ Cancel              │  (Transparent, blue text, 6px radius)
└─────────────────────┘
```

#### Copy Button
```
┌──────────────┐
│ 📋 Copy      │  (Icon + text, special affordance)
└──────────────┘
Feedback: "✓ Copied!" toast for 2s
```

#### Action Menu
```
┌──────────────┐
│ ⋯            │  (Three dots, dropdown on click)
├──────────────┤
│ 🔍 Audit     │
│ 📧 Send      │
│ 💾 Save      │
│ ────────     │
│ 🗑️ Remove    │  (Danger color, red text)
└──────────────┘
```

### Feedback Components

#### Toast Notification
```
Position: Bottom-right (not invasive)
Auto-dismiss: 3-4 seconds
Stacking: Max 3 toasts (older push off-screen)

Success:
┌─────────────────────────────┐
│ ✓ Lead saved successfully   │
└─────────────────────────────┘

Error:
┌─────────────────────────────┐
│ ✗ Website unreachable       │  (Red accent)
│   Retrying... [Retry]       │
└─────────────────────────────┘

Loading:
┌─────────────────────────────┐
│ ⟳ Scanning website...       │  (Spinner + text)
│   ETA: 45s                  │
└─────────────────────────────┘
```

#### Empty State
```
┌──────────────────────────────────┐
│                                  │
│  🔍                              │
│                                  │
│  No Leads Yet                    │
│  Start a search to find potential│
│  customers                       │
│                                  │
│  [Find Leads]                    │
│  [View Example Search]           │
│                                  │
└──────────────────────────────────┘
```

#### Loading State (Skeleton)
```
Pulse animation (subtle, not jarring):

┌────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░ │  (Gray pulse)
│ ▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░ │
└────────────────────────────────┘
```

#### Error State
```
┌──────────────────────────────────┐
│ ⚠️ Error                          │
│                                  │
│ Website unreachable              │
│ We couldn't connect to this URL. │
│ It may be offline or blocked.    │
│                                  │
│ [Retry] [Skip] [View Cache]      │
└──────────────────────────────────┘
```

### Data Presentation

#### Metric Card
```
┌──────────────────────┐
│ METRICS THIS WEEK    │
├──────────────────────┤
│ Leads Found: 47      │  (Large number, semantic label)
│ Audits Completed: 12 │
│ Outreach Sent: 38    │
│ Reply Rate: 18%      │  (Optional: muted if low)
└──────────────────────┘
```

#### Performance Indicator
```
Good:    ✓ 2.1s load time (industry avg: 2.4s)   (Green checkmark)
Warning: ⚠ 4.5s load time (industry avg: 2.4s)   (Yellow warning)
Poor:    ✗ 8.2s load time (industry avg: 2.4s)   (Red X)
Unknown: ? Unable to measure                      (Gray question)
```

---

## 7. INFORMATION ARCHITECTURE

```
LeadHunter
│
├── Dashboard
│   ├── This Week Summary (metrics)
│   ├── High-Opportunity Leads (widget)
│   ├── Recent Searches (quick access)
│   ├── Active Campaigns (progress)
│   └── Suggested Actions
│
├── Find Leads (main workflow)
│   ├── Input: "What do you sell?"
│   ├── Targeting: Location, industry, size filters
│   └── Results: Three-column layout (filters | list | detail)
│
├── Leads (manage discovered leads)
│   ├── All Leads (full list)
│   ├── High Opportunity (87+)
│   ├── Saved Leads (starred)
│   └── Archived (excluded)
│
├── Audits (website analysis history)
│   ├── Recent Audits
│   ├── Audit Templates
│   └── Audit Reports (detailed)
│
├── Campaigns (outreach orchestration)
│   ├── New Campaign
│   ├── Active Campaigns
│   ├── Draft Sequences
│   └── Analytics / Performance
│
├── Outreach (email/messaging)
│   ├── Drafts
│   ├── Scheduled
│   ├── Sent
│   └── Replies
│
└── Settings
    ├── Account
    ├── Integration (CRM, email)
    ├── Preferences (theme, shortcuts)
    └── Billing
```

---

## 8. SCREEN-BY-SCREEN SPECIFICATION

### 8.1 Dashboard

**Purpose:** Give user immediate context: what's happened this week, what's hot, what's next.

**Primary Goal:** Answer: "Should I do prospecting work right now? Where's my momentum?"

**Layout:**
- Full-width cards (no complex columns)
- Metric blocks at top (4 KPIs in a row)
- Recommended actions (what to do next)
- Recent activity (history)

**Main Components:**
1. Week Summary (4 metrics: Leads Found, Audits, Outreach, Reply Rate)
2. High-Opportunity Leads (top 5 new leads 85+)
3. Active Campaigns (status + pending actions)
4. Suggested Actions ([New Search], [Run Audit], [Review Replies])
5. Recent Searches (quick re-run)

**States:**
- Empty (first time): Onboarding, example searches
- Normal: Populated with recent work
- Loading: Skeleton cards

**Interactions:**
- Click lead card → Lead detail panel
- Click campaign → Campaign page
- [New Search] → Find Leads page

---

### 8.2 Find Leads

**Purpose:** Start new prospecting workflow.

**Primary Goal:** User enters "what they sell" and gets back "where to find buyers."

**Layout:**
```
┌─────────────────────────────────────────┐
│ Find Leads (large page title)           │
├─────────────────────────────────────────┤
│ [Large input: "What do you sell?"]      │
│                                         │
│ Advanced Targeting (optional)           │
│ ├── Location / Radius                   │
│ ├── Industry / Business Type            │
│ ├── Company Size                        │
│ └── Signals (hiring, funding, etc.)     │
│                                         │
│ [Find Leads] (large, prominent)         │
│                                         │
│ Recent Searches (below)                 │
│ "Sell web design to restaurants" (3d)   │
│ "Build apps for fintech" (1w)          │
└─────────────────────────────────────────┘
```

**Main Components:**
1. Primary input (text, auto-complete)
2. Optional filters (expandable)
3. Find Leads CTA (large, obvious)
4. Search history (recent + most used)

**Interactions:**
- Type → Auto-complete suggestions
- [Advanced] toggle → Reveal filters
- [Find Leads] → Execute search, navigate to Results
- Click history item → Re-run with same params

**Keyboard Shortcuts:**
- Cmd+K → Focus input
- Cmd+Enter → Execute search
- Esc → Clear input

**States:**
- Empty (first time): Show example searches
- Loading: Spinner + ETA
- Results ready: Navigate to Results page

---

### 8.3 Lead Results

**Purpose:** Display discovered leads; allow filtering and exploration.

**Primary Goal:** "Which of these 47 leads should I contact first?"

**Layout (Three-Column):**
```
┌──────────┬────────────────┬─────────────────┐
│ Filters  │ Lead List      │ Detail Panel    │
│ (240px)  │ (400px)        │ (Remaining)     │
├──────────┼────────────────┼─────────────────┤
│          │                │                 │
│ Sort:    │ [Lead 1]       │ Business Info   │
│ [Score▼] │ 87/100         │ Score Card      │
│          │ Problems       │ Problems        │
│ Filters: │                │ Audit Button    │
│ 🔍 Type  │ [Lead 2]       │ Pitch Template  │
│ 🏢 Size  │ 84/100         │ Actions         │
│ 📍 Loc   │                │                 │
│          │ [Lead 3]       │                 │
│ [Clear]  │ 82/100         │                 │
│          │                │                 │
│ [Save    │ [Load more...]  │                 │
│  View]   │                │                 │
└──────────┴────────────────┴─────────────────┘
```

**Main Components:**
1. Filter Panel (sort, filter, save views)
2. Lead List (scrollable, selectable)
3. Detail Panel (selected lead full context)

**Interactions:**
- Click lead row → Populate detail panel
- Click filter → Update list in real-time
- Click [Audit] → Navigate to Audit screen
- Click [Add to Campaign] → Campaign selector modal
- Click [Save] → Add to saved leads

**Keyboard Shortcuts:**
- J / K → Previous / Next lead
- Enter → Expand detail
- A → Add to campaign
- S → Save lead
- D → Audit (Details)

**States:**
- Empty: No leads found (suggest new search)
- Loading: Skeleton list + partial results
- Loaded: Full list + detail panel
- Error: Search failed (retry button)

---

### 8.4 Lead Profile / Detail

**Purpose:** Show everything about a single lead.

**Primary Goal:** Decide: "Is this worth contacting? What's my angle?"

**Layout:**
```
┌─────────────────────────────────────┐
│ [Business Name] · [Location]        │
│ Category · Website link             │
├─────────────────────────────────────┤
│                                     │
│ OPPORTUNITY SCORE CARD (87/100)     │
│ ├── Website Quality: 82%            │
│ ├── Business Demand: 91%            │
│ └── ...                             │
│                                     │
│ DETECTED PROBLEMS                   │
│ ├── 🔴 Weak mobile (64/100)        │
│ │   Impact: 12% drop-off            │
│ ├── 🟡 No online ordering          │
│ │   Customers: Competitor service   │
│ └── 🟢 Strong reviews (4.6★)       │
│                                     │
│ BUSINESS SIGNALS                    │
│ ├── Recent hiring (10 new jobs)     │
│ ├── Social activity (20 posts/week) │
│ └── Search volume (400+ searches/mo)│
│                                     │
│ RECOMMENDED APPROACH                │
│ "Your tool solves: Mobile UX +      │
│ online ordering + booking system"   │
│                                     │
│ [Audit Website] [Craft Pitch]       │
│ [Add to Campaign] [Save]            │
└─────────────────────────────────────┘
```

**Main Components:**
1. Lead header (name, category, location, website)
2. Opportunity score breakdown
3. Problems detected (prioritized)
4. Business signals (hiring, reviews, intent)
5. Recommended approach
6. Action buttons

**Interactions:**
- [Audit Website] → Navigate to Audit screen
- [Craft Pitch] → Navigate to Sales Pitch screen
- [Add to Campaign] → Modal: select/create campaign
- [Save] → Toggle save status (toast confirmation)

**Keyboard Shortcuts:**
- E → [Audit Website]
- P → [Craft Pitch]
- A → [Add to Campaign]
- S → [Save]

**States:**
- Loading: Skeleton content
- Loaded: Full profile
- Error: Website unreachable (show cached data + note)
- Expanded: Detailed score breakdown

---

### 8.5 Website Audit

**Purpose:** Deep-dive into website analysis; show problems + solutions.

**Primary Goal:** "Exactly *what* is wrong with their website, and how can I help?"

**Layout:**
```
┌───────────────────────────────────────┐
│ Audit: [Business Name]                │
│ Last Scanned: [date] [Rescan]         │
├───────────────────────────────────────┤
│                                       │
│ PERFORMANCE (3/5 issues)              │
│ ┌───────────────────────────────────┐ │
│ │ 🔴 Load Time: 6.8s (poor)        │ │
│ │ Evidence: Slow server + images    │ │
│ │ Impact: 12% bounce rate increase  │ │
│ │ Fix: Optimize images, use CDN     │ │
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ 🟡 Mobile: 64/100 (fair)         │ │
│ │ Evidence: Stack overflow          │ │
│ │ Impact: Poor on-site experience   │ │
│ │ Fix: Responsive breakpoints       │ │
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ 🟢 SSL: Active (good)            │ │
│ └───────────────────────────────────┘ │
│                                       │
│ CONVERSION FUNNEL (2/3 issues)        │
│ ┌───────────────────────────────────┐ │
│ │ 🔴 No Email Capture              │ │
│ │ Evidence: No form visible         │ │
│ │ Impact: No lead pipeline          │ │
│ │ Fix: Add email signup form        │ │
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ 🟡 CTAs Below Fold               │ │
│ │ Evidence: 3 clicks to action      │ │
│ │ Impact: 8% CTA click rate         │ │
│ │ Fix: Move button above fold       │ │
│ └───────────────────────────────────┘ │
│                                       │
│ SEO (1/2 issues)                      │
│ ├── 🟡 Meta Tags: Partial            │
│ └── 🟢 Structured Data: Present      │
│                                       │
│ BOTTOM LINE                           │
│ Your tool can fix 5 of 6 issues,      │
│ potentially generating 15-20 new      │
│ leads per month.                      │
│                                       │
│ [Craft Pitch] [Download Report]       │
└───────────────────────────────────────┘
```

**Main Components:**
1. Audit metadata (date, [Rescan])
2. Problem categories (Performance, Conversion, SEO)
3. Per-problem card: Evidence + Impact + Solution
4. Bottom Line: Business impact summary
5. Action buttons

**Interactions:**
- [Rescan] → Refresh audit (loading state)
- [Craft Pitch] → Go to Sales Pitch with audit data
- [Download Report] → PDF export

**Keyboard Shortcuts:**
- R → [Rescan]
- P → [Craft Pitch]
- D → [Download]

**States:**
- Loading: Skeleton audit sections
- Scanned: Results displayed
- Error: Website unreachable (show last cached result + warning)
- Expired: Scan >7 days old (show [Rescan] prompt)

---

### 8.6 Sales Pitch

**Purpose:** Generate personalized outreach message ready to send.

**Primary Goal:** "Give me an opening line I can use today."

**Layout:**
```
┌──────────────────────────────────────┐
│ Sales Pitch for [Business Name]      │
├──────────────────────────────────────┤
│                                      │
│ WHY THIS LEAD?                       │
│ ┌──────────────────────────────────┐ │
│ │ Based on analysis:               │ │
│ │ 1. Strong demand (4.6★ reviews,  │ │
│ │    recent hiring)                 │ │
│ │ 2. Technical gaps (weak mobile,  │ │
│ │    no online ordering)            │ │
│ │ 3. Competitive weakness          │ │
│ │    (competitors have booking)     │ │
│ └──────────────────────────────────┘ │
│                                      │
│ TOP PAIN POINTS                      │
│ ├── Mobile experience losing 12%    │ │
│ │   of bookings per month           │ │
│ ├── No online ordering (customers  │ │
│ │   going to competitors)           │ │
│ └── Booking scattered (email +     │ │
│     phone = manual work)            │ │
│                                      │
│ YOUR ANGLE                           │ │
│ "We help restaurants like you add   │ │
│ fast, mobile-first booking + online │ │
│ ordering. Average client generates  │ │
│ 15-20 new bookings per month."      │ │
│                                      │
│ GENERATED OPENING                    │ │
│ ┌──────────────────────────────────┐ │
│ │ Hi [Name],                       │ │
│ │                                  │ │
│ │ I noticed [Restaurant] has great │ │
│ │ reviews (4.6★) but the mobile   │ │
│ │ experience is costing you about  │ │
│ │ 12% of bookings each month.      │ │
│ │                                  │ │
│ │ We've helped 20+ restaurants add │ │
│ │ online ordering + mobile booking │ │
│ │ – most generate 15-20 extra      │ │
│ │ bookings within the first month. │ │
│ │                                  │ │
│ │ Worth a quick call?              │ │
│ │                                  │ │
│ │ [Your name]                      │ │
│ │                                  │ │
│ │ [Copy] [Edit] [Preview] [Send]   │ │
│ └──────────────────────────────────┘ │
│                                      │
│ [Add to Campaign] [Save Draft]       │
│ [Use Template] [Start Over]          │ │
└──────────────────────────────────────┘
```

**Main Components:**
1. Why This Lead (3 reasons)
2. Top Pain Points (extracted from audit)
3. Your Angle (brief statement of value)
4. Generated Opening (AI-drafted email)
5. Edit + Actions

**Interactions:**
- [Edit] → Inline text editor
- [Preview] → Full email in separate panel
- [Copy] → Toast confirmation
- [Send] → Modal: choose email client/CRM
- [Add to Campaign] → Add to campaign workflow
- [Use Template] → Modal: template selector
- [Start Over] → Clear and reset

**Keyboard Shortcuts:**
- E → [Edit]
- C → [Copy]
- S → [Send]
- A → [Add to Campaign]

**States:**
- Generating: Spinner + "Crafting message..."
- Generated: Message ready
- Editing: Text field active
- Sent: Confirmation + toast

---

## 9. WIREFRAME DESCRIPTIONS

### Dashboard (Text Wireframe)
```
┌──────────────────────────────────────────────────────────────┐
│ Sidebar          │ Dashboard                                 │
├──────────────────┼──────────────────────────────────────────┤
│ 🏠 Dashboard     │ THIS WEEK                                 │
│ 🔍 Find Leads    │ ┌──────────┬──────────┬──────────┐      │
│ 📁 Leads         │ │ 47 Leads │ 12 Audits│ 38 Sent  │      │
│ 📊 Audits        │ │ Found    │ Completed│ Outreach │      │
│ 🎯 Campaigns     │ └──────────┴──────────┴──────────┘      │
│ 📧 Outreach      │                                          │
│ ⚙️ Settings      │ HIGH-OPPORTUNITY LEADS (NEW)             │
│                  │ ┌──────────────────────────────────────┐ │
│ [Profile]        │ │ Restaurant XYZ      | 91/100  ⭐    │ │
│                  │ │ Weak mobile · No online ordering    │ │
│                  │ │ [Open]                              │ │
│                  │ ├──────────────────────────────────────┤ │
│                  │ │ SaaS Platform       | 88/100        │ │
│                  │ │ Poor docs · Intent signal           │ │
│                  │ │ [Open]                              │ │
│                  │ └──────────────────────────────────────┘ │
│                  │                                          │
│                  │ ACTIVE CAMPAIGNS                         │
│                  │ Restaurant Outreach (12 pending)        │
│                  │ Agency Growth (5 replies)               │
│                  │                                          │
│                  │ [New Search] [Run Audit] [Campaign]     │
└──────────────────┴──────────────────────────────────────────┘
```

### Find Leads
```
┌──────────────────────────────────────────────────────────────┐
│ Sidebar          │ Find Leads                                │
├──────────────────┼──────────────────────────────────────────┤
│ 🏠 Dashboard     │ Find Potential Customers                 │
│ 🔍 Find Leads    │                                          │
│ 📁 Leads         │ ┌──────────────────────────────────────┐ │
│ 📊 Audits        │ │ 🔍 I build websites for restaurants │ │
│ 🎯 Campaigns     │ └──────────────────────────────────────┘ │
│ 📧 Outreach      │                                          │
│ ⚙️ Settings      │ Advanced Targeting [+]                   │
│                  │ Location: Any / Radius: Any              │
│                  │ Industry: Restaurant                     │
│                  │ Size: Any                                │
│                  │ Signals: Any                             │
│                  │                                          │
│                  │ ┌──────────────────────────────────────┐ │
│                  │ │ Find Leads                           │ │
│                  │ └──────────────────────────────────────┘ │
│                  │                                          │
│                  │ Recent Searches                          │
│                  │ "Sell web design to restaurants" (3d)   │
│                  │ "Build apps for fintech" (1w)           │
└──────────────────┴──────────────────────────────────────────┘
```

### Lead Results (Three-Column)
```
┌───────────┬────────────────┬──────────────────────────────┐
│ Filters   │ Lead List      │ Detail Panel                 │
├───────────┼────────────────┼──────────────────────────────┤
│ Sort:     │ ┌────────────┐ │ Restaurant XYZ               │
│ [Score▼]  │ │ Restaurant │ │ Fast Casual · New York       │
│           │ │ 87/100 ⭐  │ │                              │
│ Filters:  │ │ Weak mobile│ │ OPPORTUNITY SCORE: 87/100    │
│ Type: [-] │ │ No ordering│ │ Website Quality: 82%         │
│           │ │ [Select]   │ │ Business Demand: 91%         │
│ Size: [-] │ └────────────┘ │ Conversion Gap: 88%          │
│           │ ┌────────────┐ │                              │
│ Loc: [-]  │ │ SaaS B     │ │ PROBLEMS                     │
│           │ │ 84/100     │ │ 🔴 Weak mobile              │
│ [Clear]   │ │ Poor docs  │ │ 🟡 No online ordering       │
│           │ │ [Select]   │ │                              │
│ [Save     │ └────────────┘ │ RECOMMENDED APPROACH         │
│  View]    │ ┌────────────┐ │ "Your tool solves..."        │
│           │ │ Agency C   │ │                              │
│           │ │ 82/100     │ │ [Audit] [Pitch] [Save] [+]   │
│           │ │ [Select]   │ │                              │
│           │ └────────────┘ │                              │
│           │ [Load more...]  │                              │
└───────────┴────────────────┴──────────────────────────────┘
```

### Website Audit
```
┌──────────────────────────────────────────────────────────────┐
│ Audit: Restaurant XYZ · Last Scanned: [date] [Rescan]       │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│ PERFORMANCE (3 issues)                                      │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 🔴 Load Time: 6.8s                                      │ │
│ │ Evidence: Slow server + unoptimized images              │ │
│ │ Impact: 12% bounce rate (vs 6% competitors)             │ │
│ │ Fix: Optimize images, use CDN                           │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 🟡 Mobile: 64/100                                       │ │
│ │ Evidence: Stack overflow, no media queries              │ │
│ │ Impact: Poor on-site experience; users leave            │ │
│ │ Fix: Responsive breakpoints                             │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                               │
│ CONVERSION (2 issues)                                       │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 🔴 No Email Capture                                     │ │
│ │ Evidence: No form visible on any page                   │ │
│ │ Impact: Zero online lead capture                        │ │
│ │ Fix: Add email signup form (above fold)                 │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 🟡 CTAs Below Fold                                      │ │
│ │ Evidence: "Book Now" at bottom (3 clicks)               │ │
│ │ Impact: 8% CTA click rate (vs 15% industry avg)         │ │
│ │ Fix: Move "Book Now" above fold                         │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                               │
│ BOTTOM LINE                                                 │
│ Fixing these 5 issues could generate 15-20 new bookings    │
│ per month. Your website solution is a perfect fit.          │
│                                                               │
│ [Craft Pitch] [Download Report]                             │
└──────────────────────────────────────────────────────────────┘
```

### Sales Pitch / Outreach
```
┌──────────────────────────────────────────────────────────────┐
│ Sales Pitch: Restaurant XYZ                                  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│ WHY THIS LEAD?                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 1. Strong Demand: 4.6★ reviews, recent hiring (10+)    │ │
│ │ 2. Technical Gaps: Weak mobile, no online ordering      │ │
│ │ 3. Market Opportunity: Competitors have booking         │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                               │
│ TOP PAIN POINTS                                             │
│ • Mobile losing 12% of bookings per month                   │
│ • No online ordering (customers go to competitors)          │
│ • Booking scattered (email + phone = manual)                │
│                                                               │
│ YOUR SOLUTION                                               │
│ Fast, mobile-first website + online ordering + booking      │
│ platform. Average client generates 15-20 new bookings/mo.   │
│                                                               │
│ GENERATED OPENING                                           │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Hi [Name],                                              │ │
│ │                                                          │ │
│ │ I noticed [Restaurant] has great reviews (4.6★) but    │ │
│ │ the mobile experience is costing you about 12% of      │ │
│ │ bookings each month.                                    │ │
│ │                                                          │ │
│ │ We've helped 20+ restaurants add online ordering +      │ │
│ │ mobile booking—most generate 15-20 extra bookings      │ │
│ │ within the first month.                                 │ │
│ │                                                          │ │
│ │ Worth a quick call?                                     │ │
│ │                                                          │ │
│ │ [Your name]                                             │ │
│ │                                                          │ │
│ │ [Copy] [Edit] [Preview] [Send]                          │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                               │
│ [Add to Campaign] [Save Draft] [Use Template] [Start Over]  │
└──────────────────────────────────────────────────────────────┘
```

---

## 10. INTERACTION DESIGN

### Hover States
```
Buttons:
- Brightness +5% with subtle shadow (md)
- Cursor: pointer
- 0.15s transition

Links:
- Underline appears
- Color darkens slightly
- Cursor: pointer

Cards/Rows:
- Background color +2 steps
- Shadow upgrade (sm → md)
- 0.1s transition

Inputs:
- Border color → accent
- Background brightens slightly
- 0.1s transition
```

### Active / Selected States
```
Button (pressed):
- Scale(0.98) (subtle compression)
- Opacity 0.9 (slightly dimmed)
- 0.08s transition

Navigation item (active):
- Background: surface-active
- Left border: 2px accent
- Text: bold
- Persistent

Lead row (selected):
- Background: surface-active
- Border: 1px accent
- Shadow: md
- Permanent until deselected
```

### Disabled States
```
Button:
- Opacity: 0.5
- Cursor: not-allowed
- No hover effect

Input:
- Background: surface-disabled (lighter gray)
- Cursor: not-allowed
- Border: 1px border-muted
- Text: text-muted
```

### Focus States (Keyboard Navigation)
```
All interactive elements must show visible focus ring:
- Outline: 2px solid accent
- Outline-offset: 2px
- 0.1s transition
- Visible in all color modes
```

### Keyboard Navigation

**Tab Order:**
- Left-to-right, top-to-bottom
- Skip hidden elements
- Logical grouping (related elements tab together)

**Shortcuts (Discoverable via Cmd+K):**
```
Global:
Cmd+K              Open Command Palette
Cmd+Enter          Execute primary action
Esc                Close modals / command palette
Cmd+S              Save current item

Navigation:
Cmd+D              Go to Dashboard
Cmd+F              Go to Find Leads
Cmd+L              Go to Leads
Cmd+A              Go to Audits

Find Leads:
Cmd+Enter          Execute search
Cmd+Shift+↓        Expand Advanced Targeting

Lead Results:
J / K              Previous / Next lead
Enter              Expand detail panel
A                  Add to Campaign
S                  Save lead
D                  Audit (Details)
Cmd+P              [Pitch] (Craft pitch)

Audit:
R                  Rescan
P                  Craft Pitch
D                  Download Report

Pitch:
E                  Edit
C                  Copy
S                  Send
A                  Add to Campaign
```

### Loading Indicators

**Skeleton Cards:**
```
Pulse animation (0.8s cycle):
Background: 0.08 opacity pulse
Smooth easing: ease-in-out
Not jarring or distracting
```

**Progress Bars:**
```
Search progress: "Scanning 3 of 47... (2m 14s remaining)"
Indeterminate: Horizontal pulse
Determinate: Color bar fill
Color: Accent blue
```

**Spinners:**
```
Rotation animation: 2s linear infinite
Color: Accent blue
Size: 24px default (24px md, 16px sm, 32px lg)
```

### Modals & Overlays

**Backdrop:**
- Blur: 4px
- Opacity: 0.5 (dark mode), 0.3 (light mode)
- Click outside: Close modal

**Modal Window:**
- Appear: Zoom in + fade (0.2s)
- Position: Center screen
- Max width: 600px
- Padding: 24px
- Shadow: xl (prominent)

**Actions:**
- Primary button (bottom right)
- Secondary button (bottom left)
- Close button (X, top right)

### Transitions & Animation

**Philosophy:** Functional, not decorative.

```
Standard Duration: 0.15s
Easing: cubic-bezier(0.2, 0, 0.38, 0.9) [ease-in-out]

When to animate:
- State changes (enable/disable)
- Visibility toggles (show/hide)
- Hover states
- Page transitions
- Emphasis (pulse on new data)

When NOT to animate:
- Scrolling
- Typing
- Rapid interactions
- Accessibility concerns
```

---

## 11. DESIGN TOKENS (CSS Variables)

```css
:root {
  /* Colors - Dark Mode (Primary) */
  --color-bg: #0d0e10;
  --color-surface: #121417;
  --color-surface-hover: #1a1d22;
  --color-surface-active: #242930;
  --color-border: #2d3139;
  --color-text-primary: #eff3f4;
  --color-text-secondary: #97a0af;
  --color-text-muted: #5f6b7a;
  --color-accent: #3b9eff;
  --color-success: #3fb950;
  --color-warning: #d29922;
  --color-danger: #f85149;
  --color-info: #58a6ff;

  /* Typography */
  --font-primary: "Inter", -apple-system, system-ui, sans-serif;
  --font-mono: "SF Mono", Monaco, monospace;
  
  --size-display-lg: 32px;
  --size-heading-lg: 20px;
  --size-heading-md: 16px;
  --size-body-md: 14px;
  --size-body-sm: 12px;
  
  --weight-bold: 600;
  --weight-semibold: 500;
  --weight-normal: 400;
  
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing */
  --space-4: 4px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-24: 24px;
  --space-32: 32px;
  --space-48: 48px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.18), 0 10px 10px rgba(0, 0, 0, 0.1);

  /* Z-Index Scale */
  --z-dropdown: 100;
  --z-modal-backdrop: 200;
  --z-modal: 210;
  --z-tooltip: 150;
  --z-floating-button: 120;

  /* Transitions */
  --duration-fast: 0.1s;
  --duration-normal: 0.15s;
  --duration-slow: 0.2s;
  --easing-standard: cubic-bezier(0.2, 0, 0.38, 0.9);
}
```

---

## 12. ACCESSIBILITY REQUIREMENTS

**WCAG 2.1 Level AA Compliance**

### Color Contrast
- Text on background: 4.5:1 minimum (normal text)
- Large text: 3:1 minimum (18px+ or 14px+ bold)
- UI components: 3:1 minimum for borders/outlines

**Implementation:**
- Use semantic color tokens (not arbitrary hex)
- Test contrast in both light and dark modes
- Never rely on color alone (use icons + text)

### Keyboard Navigation
- All interactive elements tabbable
- Logical tab order (left-to-right, top-to-bottom)
- Focus indicator always visible (2px outline)
- Keyboard shortcuts discoverable via Command Palette

### Screen Reader Support
- Semantic HTML (buttons, links, form elements)
- ARIA labels for icon-only buttons
- Form inputs paired with labels
- Status messages announced (aria-live regions)
- Skip to main content link

### Motion & Animation
- Respect prefers-reduced-motion media query
- No auto-playing videos
- Animations 0.15s or less
- No flashing/flickering (avoid >3 flashes per second)

### Vision & Magnification
- Minimum 44×44px touch targets
- Text resizable without layout breakage
- Logical zoom behavior (up to 200%)
- No text in images (unless decorative)

### Forms
- Labels associated with inputs (<label for="id">)
- Required fields clearly marked
- Error messages linked to inputs (aria-describedby)
- Validation on blur, not on keystroke
- Success/error states distinct from color alone

---

## 13. STATES & COMPREHENSIVE COVERAGE

Every screen must have defined behavior in these states:

### 1. Search / Find Leads
- **Empty:** No search run yet (show examples)
- **Loading:** Search in progress (spinner + ETA)
- **Results:** Leads displayed (successful)
- **No Results:** "No leads found" (try different params)
- **Error:** Search failed (show reason + retry)

### 2. Lead Detail
- **Loading:** Skeleton content
- **Loaded:** Full profile
- **Error:** Data unavailable (show cached + warning)
- **Audit Missing:** "Website not yet audited" (CTA to audit)
- **Website Unreachable:** "Website offline" (show analysis of cached version)

### 3. Audit Screen
- **Loading:** Skeleton sections
- **Scanned:** Results displayed
- **Error:** Website unreachable (show previous scan if exists)
- **Expired:** Scan >7 days old (show [Rescan] prompt)
- **First Time:** "No audit yet" (CTA to run)

### 4. Results List
- **Empty:** No leads found
- **Loading:** Partial results + skeleton
- **Loaded:** Full list
- **No Selection:** Detail panel empty
- **Selected:** Detail panel populated

### 5. Pitch Generation
- **Generating:** Spinner + "Crafting your pitch..."
- **Generated:** Message ready to use
- **Editing:** Text field active
- **Copied:** "✓ Copied!" toast
- **Sent:** Confirmation + next steps

### 6. Forms / Inputs
- **Empty:** Placeholder visible
- **Focused:** Border color → accent
- **Filled:** Value visible, clear button (✕)
- **Invalid:** Error message below, red border
- **Disabled:** Gray background, not-allowed cursor

### 7. Buttons
- **Enabled:** Full opacity, clickable
- **Hover:** Background +5%, shadow md
- **Active:** Scale(0.98), opacity 0.9
- **Loading:** Spinner inside, text hidden
- **Disabled:** Opacity 0.5, not-allowed cursor

---

## 14. UX ANTI-PATTERNS

**Do NOT do these things:**

1. **❌ Generic SaaS Dashboard Clutter**
   - Avoid: Large empty cards, meaningless metrics, generic charts
   - Use: Data-dense, specific to prospecting workflow

2. **❌ Bury Important Information**
   - Avoid: Hiding lead score breakdown, audit problems in tabs
   - Use: Show WHY a score is high (evidence + factors)

3. **❌ Gratuitous Animations**
   - Avoid: Spinning AI effects, gradient flows, parallax
   - Use: Functional transitions (state changes only)

4. **❌ Fake Functionality**
   - Avoid: Placeholder buttons, disabled features, "coming soon" UX
   - Use: Build real interactions; remove what doesn't work

5. **❌ Overuse of Rounded Corners**
   - Avoid: Excessively rounded cards (>12px radius)
   - Use: Minimal, modern radius (4-8px)

6. **❌ Purple Gradients for AI**
   - Avoid: Gimmicky AI branding
   - Use: Professional, restrained colors (blue accent)

7. **❌ Hide Search Filters**
   - Avoid: Filters behind expandable menu
   - Use: Sidebar filters always visible

8. **❌ Inconsistent Icon Usage**
   - Avoid: Mixed icon styles, random decorative icons
   - Use: Consistent outlined style, functional purpose

9. **❌ Multiple Navigation Patterns**
   - Avoid: Sidebar + top nav + bottom nav confusion
   - Use: Single primary navigation (sidebar)

10. **❌ Copy That Sounds AI-Generated**
    - Avoid: "Unlock insights," "harness data," buzzwords
    - Use: Clear, direct language ("Website is slow")

11. **❌ Assume Users Know What To Do**
    - Avoid: Empty states with no guidance
    - Use: Onboarding, empty state CTAs, examples

12. **❌ Long Forms in Modals**
    - Avoid: 10+ field forms in small modal
    - Use: Inline editing or full-page forms

---

## 15. MVP SCOPE & BOUNDARIES

### MUST HAVE (Prototype Priority)

**Core Screens:**
- [x] Dashboard
- [x] Find Leads (input + search)
- [x] Lead Results (three-column)
- [x] Lead Profile / Detail
- [x] Website Audit (analysis results)
- [x] Sales Pitch (outreach generation)
- [x] Navigation (sidebar + command palette)

**Core Interactions:**
- [x] Search execution (mock data)
- [x] Lead filtering & sorting
- [x] Lead selection & detail panel
- [x] Audit display with evidence
- [x] Pitch generation and copy
- [x] Keyboard shortcuts (Cmd+K, J/K, etc.)

**Mock Data:**
- [x] 20-30 realistic lead profiles
- [x] Realistic audit data (problems + solutions)
- [x] AI-generated pitch examples
- [x] Website metadata (reviews, traffic signals)

**States:**
- [x] Loading states (skeletons)
- [x] Empty states
- [x] Error states (graceful)
- [x] Success feedback (toasts)

### NOT YET (Post-MVP)

**Real Infrastructure:**
- [ ] Live web scraping / data collection
- [ ] Real website analysis engine
- [ ] Live database (leads persistence)
- [ ] Real authentication / billing
- [ ] Multi-user / team collaboration
- [ ] CRM integrations
- [ ] Email sending

**Advanced Features:**
- [ ] Complex automation workflows
- [ ] Advanced AI personalization
- [ ] Competitor tracking
- [ ] Intent signal real-time monitoring
- [ ] Mobile app
- [ ] API for integrations

---

## 16. AI IMPLEMENTATION CONTRACT

**This `design.md` is the source of truth for the UI developer.**

### Requirements for AI Coding Agent

**1. Read This Document First**
Before implementing any component or screen, read this entire `design.md` and understand:
- Design principles (section 2)
- Color palette & tokens (sections 5, 11)
- Component specifications (section 6)
- Screen layouts (sections 8, 9)

**2. Follow the Design System**
- Use CSS variables for all colors, spacing, sizing
- Maintain consistent typography scale
- Respect the 4px spacing grid
- Use Inter font; avoid system fonts unless fallback
- Shadows: Use only defined values (sm, md, lg, xl)

**3. Reuse Components**
- Don't duplicate button styles; create one Button component
- Create a component library (Card, Button, Input, etc.)
- Share spacing/typography across screens
- One source of truth per component

**4. Maintain Information Hierarchy**
- Never make lead scores less prominent than the lead name
- Never hide problem evidence; always show it
- Audit problems must include: Evidence + Impact + Solution
- Pitch must start with "Why This Lead?"

**5. Realistic Mock Data**
- Use realistic business names, websites, review counts
- Create 20-30 complete lead profiles
- Generate credible audit data (load times, mobile scores, etc.)
- Make AI-generated pitches sound natural, not templated

**6. Interactive Behaviors**
- All buttons clickable (even if no backend)
- Keyboard shortcuts work (J/K for nav, Cmd+K for palette)
- Filters update results in real-time
- Detail panel updates on lead selection
- Toasts appear on actions (copy, save, send)

**7. State Management**
- Implement loading states (skeletons, spinners)
- Implement empty states (show message + CTA)
- Implement error states (show reason + retry option)
- Implement selected/active states clearly

**8. Keyboard Navigation**
- Tab through all interactive elements
- Focus ring visible (2px outline)
- Enter/Space activates buttons
- Esc closes modals
- Shortcuts discoverable via Cmd+K

**9. Never Invent Unrelated Features**
- Don't add "trending leads" widget
- Don't add "AI chat assistant" sidebar
- Don't add "live notifications" banner
- Stick to: Dashboard, Find, Results, Detail, Audit, Pitch

**10. Preserve Intended UX**
- Three-column Results layout (don't change to single column)
- Sidebar persistent (don't collapse it)
- Audit: Problem-first (not metrics-first)
- Pitch: Why-first (not just message)

**11. Desktop-First Design**
- Optimize for 1440×900 (primary)
- Test at 1920×1080 (secondary)
- Don't over-optimize for mobile (not in scope)
- Use persistent UI (no hamburger menu)

**12. Ensure Every State Is Designed**
- Test: What happens when there are no results?
- Test: What happens when website is unreachable?
- Test: What happens while search is running?
- Test: What happens after copying pitch?

**13. Visual Consistency**
- All cards use same radius (6px)
- All buttons use same height (40px)
- All text uses defined type scale
- All borders use defined colors
- Spacing multiples of 4px

**14. Ask Before Major Changes**
- If you think the layout should be different: Ask
- If you want to add a feature: Ask
- If design seems unclear: Ask
- Don't assume or improvise architecture

**15. Test Interactions**
- Hover states work (cursor changes, color shifts)
- Click states work (buttons respond)
- Keyboard navigation works (all elements reachable)
- Focus indicators visible (you can tab through)
- Loading states appear (spinners show)

---

## 17. SUCCESS CRITERIA FOR PROTOTYPE

The prototype successfully demonstrates LeadHunter when:

**User Can:**
1. ✓ Understand what LeadHunter does in <10 seconds
2. ✓ Enter a search ("I sell websites for restaurants")
3. ✓ See relevant leads discovered (mocked, but realistic)
4. ✓ Click a lead and see why it's valuable (score + problems)
5. ✓ Run an audit and see detailed analysis
6. ✓ Generate a personalized pitch
7. ✓ Navigate between screens smoothly
8. ✓ Use keyboard shortcuts (Cmd+K, J/K, A, S, etc.)
9. ✓ Experience fast interactions (<100ms perceived)
10. ✓ Get helpful toasts and empty state guidance

**Product Feels:**
- ✓ Professional and serious (not gimmicky)
- ✓ Dense with useful information (not bloated)
- ✓ Keyboard-first and fast
- ✓ Dark, modern workspace
- ✓ Like a specialized tool for power users
- ✓ NOT like a generic SaaS dashboard

**Design Proves:**
- ✓ LeadHunter concept is viable
- ✓ Three-column layout works for lead discovery
- ✓ Audit format (Problem + Evidence + Impact) resonates
- ✓ Pitch generation is valuable
- ✓ Keyboard shortcuts feel natural
- ✓ Users can complete full workflow: Search → Analyze → Pitch

---

## 18. NEXT STEPS (Post-MVP)

Once prototype is validated:

1. **User Testing**
   - Test with 10 sales professionals
   - Measure task completion (find lead → pitch in <3 min)
   - Gather feedback on audit format, pitch quality
   - Iterate based on feedback

2. **Real Data Integration**
   - Wire up lead discovery (Google Places API, Clay integration)
   - Implement live website scraping (Lighthouse API)
   - Build lead persistence (database)
   - Add user authentication

3. **AI Improvements**
   - Improve pitch generation (fine-tune prompts)
   - Add personalization (learn from user edits)
   - Implement real-time intent signals
   - Add competitor tracking

4. **Scaling**
   - Multi-user collaboration
   - Team workspaces
   - CRM integrations (Salesforce, HubSpot)
   - Email sending (Mailchimp, SendGrid)
   - Export (CSV, PDF reports)

5. **Monetization**
   - Define pricing tiers
   - Add usage tracking (leads found, audits, pitches)
   - Implement billing
   - Create free trial flow

---

## 19. VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Sept 2, 2026 | Initial design specification based on UI research |

---

## 20. CONTACT & QUESTIONS

This design is maintained by the product design team.

**For questions:**
- Design direction: Check design principles (section 2)
- Component specs: Check component library (section 6)
- Colors/tokens: Check design tokens (section 11)
- Interactions: Check interaction design (section 10)
- States: Check states section (section 13)

**For clarifications:**
- If you need to deviate from this design, document the decision
- If something is ambiguous, ask before implementing
- If you find an error, suggest improvement

---

**END OF DESIGN SPECIFICATION**

This document is intentionally detailed to eliminate ambiguity and reduce back-and-forth during implementation. The goal is to give an AI coding agent everything needed to build LeadHunter's prototype UI with visual and interaction consistency.

The prototype should feel like a real product: professional, fast, and focused on helping users find and contact potential customers with confidence.