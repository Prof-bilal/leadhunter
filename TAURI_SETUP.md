# Tauri Setup Guide

Complete instructions for building LeadHunter as a native desktop application.

---

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Rust toolchain installed
- [ ] System dependencies installed (Linux only)
- [ ] Tauri CLI installed

---

## Step 1: Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"
```

Verify:
```bash
rustc --version
cargo --version
```

---

## Step 2: Install System Dependencies

### Ubuntu / Debian (22.04+)

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

### Ubuntu 20.04 (older)

```bash
sudo apt update
sudo apt install -y \
  pkg-config \
  libglib2.0-dev \
  libgtk-3-dev \
  libwebkit2gtk-4.0-dev \
  libjavascriptcoregtk-4.0-dev \
  libsoup2.4-dev \
  libssl-dev
```

> Note: If using Ubuntu 20.04, update `src-tauri/tauri.conf.json`:
> Change `"devUrl": "http://localhost:5173"` if needed.

### Fedora 38+

```bash
sudo dnf install -y \
  pkgconf \
  glib2-devel \
  gtk3-devel \
  webkit2gtk4.1-devel \
  libsoup3-devel \
  openssl-devel
```

### Fedora 37 and earlier

```bash
sudo dnf install -y \
  pkgconf \
  glib2-devel \
  gtk3-devel \
  webkit2gtk3.0-devel \
  libsoup-devel \
  openssl-devel
```

### Arch Linux / Manjaro

```bash
sudo pacman -S --needed \
  pkgconf \
  glib2 \
  gtk3 \
  webkit2gtk-4.1 \
  libsoup3 \
  openssl
```

### openSUSE

```bash
sudo zypper install -y \
  pkg-config \
  glib2-devel \
  gtk3-devel \
  webkit2gtk4.1-devel \
  libsoup3-devel \
  openssl-devel
```

### macOS

```bash
# Xcode command line tools
xcode-select --install

# Homebrew dependencies
brew install pkg-config glib gtk+3 webkitgtk libsoup openssl
```

### Windows

Windows requires:

- Microsoft Visual Studio C++ Build Tools
- WebView2 (usually pre-installed on Windows 10/11)

Download Visual Studio Build Tools:
https://visualstudio.microsoft.com/visual-cpp-build-tools/

---

## Step 3: Install Tauri CLI

### Option A: Via npm (recommended)

```bash
npm install -D @tauri-apps/cli
```

### Option B: Via Cargo

```bash
cargo install tauri-cli --version "^2"
```

---

## Step 4: Run Development Build

```bash
# From project root
npm run tauri dev
```

This will:
1. Start Vite dev server
2. Compile the Rust backend
3. Launch the native desktop window

First build takes 2-5 minutes. Subsequent builds are fast.

---

## Step 5: Build Release Binary

```bash
npm run tauri build
```

### Output Locations

| Platform | Output Path |
|----------|-------------|
| Linux | `src-tauri/target/release/bundle/deb/` |
| Linux | `src-tauri/target/release/bundle/appimage/` |
| macOS | `src-tauri/target/release/bundle/dmg/` |
| macOS | `src-tauri/target/release/bundle/macos/` |
| Windows | `src-tauri/target/release/bundle/msi/` |
| Windows | `src-tauri/target/release/bundle/nsis/` |

---

## Step 6: Verify

After building, verify the app launches:

```bash
# Linux
./src-tauri/target/release/leadhunter

# macOS
./src-tauri/target/release/bundle/macos/LeadHunter.app

# Windows
./src-tauri/target/release/bundle/msi/LeadHunter_0.1.0_x64.msi
```

---

## Troubleshooting

### "pkg-config not found"

```bash
sudo apt install pkg-config    # Ubuntu/Debian
sudo dnf install pkgconf       # Fedora
sudo pacman -S pkgconf         # Arch
```

### "cannot find webkit2gtk"

```bash
# Ubuntu 22.04+
sudo apt install libwebkit2gtk-4.1-dev

# Ubuntu 20.04
sudo apt install libwebkit2gtk-4.0-dev
```

### "cannot find libsoup"

```bash
# Ubuntu 22.04+
sudo apt install libsoup-3.0-dev

# Ubuntu 20.04
sudo apt install libsoup2.4-dev
```

### Build fails with link errors

Ensure all system dependencies are installed. Run:

```bash
sudo apt update && sudo apt upgrade
sudo apt install -y pkg-config libglib2.0-dev libgtk-3-dev libwebkit2gtk-4.1-dev libjavascriptcoregtk-4.1-dev libsoup-3.0-dev libssl-dev
```

### Slow first build

The first `tauri dev` or `tauri build` compiles all Rust dependencies. This is normal and takes 2-5 minutes. Subsequent builds use cache.

### Dev server not starting

Check if port 5173 is in use:

```bash
lsof -i :5173
```

Kill existing process or change port in `vite.config.ts`.

---

## Architecture

```
Prototype UI (React)
       ↓
Mock Services (local state)
       ↓
Future: Real API (replace mock services)
       ↓
Tauri Desktop Shell (Rust)
```

Tauri provides:
- Native window management
- System tray integration
- File system access (when needed)
- Native menus (when needed)

The React app handles all UI and prototype state. Tauri is the desktop shell only.

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | (not used in prototype) |
| `TAURI_` prefix | Tauri-specific env vars | - |
