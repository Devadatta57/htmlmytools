# My Tools & Services (HTML/CSS/JS Application)

A pure HTML5, CSS3, and modern vanilla JavaScript conversion of the My Tools React application. It has zero external framework dependencies and matches the original design, button styling, interactions, responsive behavior, and typography.

---

## 📁 Project Structure

```
mytoolsmobilehtml/
├── index.html                           # Main entry point & Full Single Page Application (all 11 views)
├── farmer.html                          # Standalone Farmer tools page
├── financial-calculators.html           # Standalone Financial Calculators hub page
├── crop-yield-calculators.html          # Standalone Crop & Yield Calculators hub page
├── land-area-calculators.html           # Standalone Land & Area Calculators hub page
├── insurance-subsidy-calculators.html   # Standalone Insurance & Subsidy Calculators hub page
├── weather-tools.html                   # Standalone Weather-based Tools hub page
├── exporter.html                        # Standalone Exporter Calculators page
├── fpo.html                             # Standalone FPO Calculators page
├── msme.html                            # Standalone MSME Calculators page
├── shg.html                             # Standalone SHG Calculators page
├── favicon.svg                          # Vector application favicon
└── assets/
    ├── css/
    │   ├── style.css                    # Unified comprehensive stylesheet (all component & responsive styles)
    │   └── fonts.css                    # Local Google Sans Variable font-face definitions
    ├── js/
    │   └── main.js                      # Vanilla JS router, scroll restoration & back button handler
    ├── fonts/                           # Google Sans Variable WOFF2 font files
    │   ├── google-sans-latin-full-normal.woff2
    │   ├── google-sans-devanagari-full-normal.woff2
    │   └── ... (25 language & symbol subsets)
    └── images/                          # High-resolution optimized WebP images
        ├── home/
        ├── farmer/
        ├── fpo/
        ├── msme/
        ├── shg/
        ├── exporter/
        ├── financial/
        ├── crop-yield/
        ├── land-area/
        ├── insurance-subsidy/
        └── weather/
```

---

## 🚀 How to Run & Use

### Method 1: Direct File Opening (No Server Required)
Simply double-click `index.html` (or any standalone page such as `farmer.html`) to open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari. Everything works offline using the `file://` protocol.

### Method 2: Local HTTP Server (Optional)
You can serve the directory using any static web server:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```
Then visit `http://localhost:8080` in your web browser.

---

## ✨ Features & Architecture

1. **Exact 1:1 Visual & Interactive Fidelity**:
   - All interactive cards, button states, hover micro-interactions, translations, and box-shadows match the React app.
   - Every illustration and icon is rendered as crisp, high-DPI inline vector SVG.
   - All design variables (`--u`, `--fu`, `--cu`, `--pu`, `--mu`, `--su`, `--xu`, `--accent`, `--tint`, etc.) and CSS container queries (`100cqw`) are preserved.

2. **Dual-Mode Architecture (SPA + Multi-Page)**:
   - `index.html` operates as a seamless Single Page Application (SPA). Clicking any tool card immediately switches views with zero page reload, updates the URL hash (`#farmer`, `#financial-calculators`, etc.), updates `document.title`, and restores scroll position.
   - Dedicated standalone pages (`farmer.html`, `fpo.html`, `msme.html`, `shg.html`, `exporter.html`, etc.) are also provided in the root folder for direct file linking, static hosting, or bookmarking.
   - The Back button (`.back-btn`) intelligently restores scroll position when returning to previous pages.

3. **Responsive Mobile & Desktop Design**:
   - Desktop viewports (1920x1080, 1833x908, 1440x900) scale to reference designs.
   - Tablets & mobile phones (iPhone, Android, iPad) adapt automatically via fluid flexbox, grid, clamp typography, and touch-friendly tap targets.
