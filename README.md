# LeadHunter

Desktop-first B2B prospecting workstation that discovers, analyzes, and scores potential customers for sales professionals.

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Rust** (for Tauri desktop build)

### Install Dependencies

```bash
npm install
```

### Run (Web)

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build (Web)

```bash
npm run build
```

Output in `dist/`.

---

## Tauri Desktop Build

### 1. Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"
```

### 2. Install System Dependencies (Linux)

```bash
sudo apt update
sudo apt install -y \
  pkg-config \
  libglib2.0-dev \
  libgtk-3-dev \
  libwebkit2gtk-4.1-dev \
  libjavascriptcoregtk-4.1-dev \
  libsoup-3.0-dev \
  libssl-dev
```

#### Ubuntu/Debian (specific versions)

| Ubuntu Version | WebKit Package |
|----------------|----------------|
| 22.04+ | `libwebkit2gtk-4.1-dev` |
| 20.04 | `libwebkit2gtk-4.0-dev` (update `tauri.conf.json` accordingly) |

#### Fedora/RHEL

```bash
sudo dnf install -y \
  pkg-config \
  glib2-devel \
  gtk3-devel \
  webkit2gtk4.1-devel \
  libsoup3-devel \
  openssl-devel
```

#### Arch Linux

```bash
sudo pacman -S --needed \
  pkgconf \
  glib2 \
  gtk3 \
  webkit2gtk-4.1 \
  libsoup3 \
  openssl
```

#### macOS

```bash
xcode-select --install
brew install pkg-config glib gtk+3 webkitgtk libsoup openssl
```

### 3. Install Tauri CLI

```bash
cargo install tauri-cli --version "^2"
```

Or use npm:

```bash
npm install -D @tauri-apps/cli
```

### 4. Run Desktop App

```bash
npm run tauri dev
```

### 5. Build Desktop App

```bash
npm run tauri build
```

Output binary in `src-tauri/target/release/bundle/`.

---

## Project Structure

```
leadhunter/
├── src/
│   ├── App.tsx                     # Main orchestrator + routing
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Tailwind + design tokens
│   ├── types/index.ts              # TypeScript interfaces
│   ├── data/mockLeads.ts           # 22 realistic mock leads
│   ├── lib/mockServices.ts         # Async mock services
│   ├── hooks/
│   │   ├── useClipboard.ts
│   │   └── useToast.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx         # Persistent 220px sidebar
│   │   │   └── TopBar.tsx          # Top bar with search
│   │   ├── navigation/
│   │   │   └── CommandPalette.tsx  # Cmd+K command palette
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Badge.tsx
│   │       ├── Skeleton.tsx
│   │       └── Toast.tsx
│   └── pages/
│       ├── Dashboard/              # Activity hub
│       ├── FindLeads/              # Search input + targeting
│       ├── Leads/                  # Three-column results
│       ├── LeadProfile/            # Full lead investigation
│       ├── Audit/                  # Problem-first audit
│       ├── SalesPitch/             # AI pitch generation
│       └── Settings/               # App settings
├── src-tauri/
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   └── src/main.rs
├── package.json
├── vite.config.ts
├── tsconfig.app.json
└── Design.md                       # Design specification
```

---

## Features

| Screen | Description |
|--------|-------------|
| **Dashboard** | This-week metrics, high-opportunity leads, campaigns, recent searches |
| **Find Leads** | Natural language input, advanced targeting, simulated search |
| **Lead Results** | Three-column layout: filters / list / detail |
| **Lead Profile** | Opportunity score, problems, strengths, signals |
| **Audit** | Problem > Evidence > Impact > Solution structure |
| **Sales Pitch** | Why This Lead, pain points, generated message |
| **Settings** | Account, appearance, shortcuts, notifications |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/⌘ + K` | Open Command Palette |
| `Ctrl/⌘ + D` | Go to Dashboard |
| `Ctrl/⌘ + F` | Go to Find Leads |
| `Ctrl/⌘ + L` | Go to Leads |
| `J` / `K` | Navigate leads (in Results) |
| `S` | Save lead |
| `D` | Open audit |
| `A` | Add to campaign |
| `Enter` | Execute primary action |
| `Esc` | Close modals |

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Desktop:** Tauri 2
- **Language:** TypeScript 6

## Design System

All tokens follow `Design.md`:

- Dark mode primary (`#0d0e10` background)
- Accent blue (`#3b9eff`)
- Inter font family
- 4px spacing grid
- Minimal border radius (4-8px)
- Restrained shadows

## Mock Data

22 realistic leads across categories:

| Category | Count | Examples |
|----------|-------|---------|
| Restaurant | 3 | Joe's Pizza, Pizza Palace, Spice Garden |
| Fast Food | 1 | Burger House |
| Cafe/Bakery | 2 | Green Leaf Cafe, Sunrise Bakery |
| SaaS/IT | 2 | TechFlow Solutions, DataVault Systems |
| Retail | 2 | Fresh Mart, Style Studio |
| Healthcare | 1 | HealthFirst Clinic |
| Fitness | 1 | FitZone Gym |
| Education | 2 | Bright Stars Academy, Green Valley School |
| Automotive | 1 | AutoCare Workshop |
| Beauty | 1 | Urban Nails |
| Travel/Tourism | 2 | CloudNine Travel, Heritage Tours |
| Home Services | 1 | QuickFix Repairs |
| Music | 1 | Melody Music Academy |
| Laundry | 1 | FreshCo Laundry |
| Jewellery | 1 | Crown Jewellers |

## License

Prototype for evaluation purposes.
