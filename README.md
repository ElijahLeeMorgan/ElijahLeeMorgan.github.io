# ElijahLeeMorgan.github.io

Software engineer portfolio built with vanilla HTML/CSS/JS featuring dynamic GitHub repository integration and dark theme design.

## Stack
- **Frontend**: HTML5, CSS3 (Grid/Flexbox), Vanilla JavaScript
- **Design**: Material Design dark theme, responsive layout
- **Integrations**: GitHub API via [repo-card.js](https://github.com/tarptaeya/repo-card)
- **Deployment**: GitHub Pages

## Quick Start
```bash
# Clone and serve
git clone https://github.com/ElijahLeeMorgan/ElijahLeeMorgan.github.io.git
cd ElijahLeeMorgan.github.io
# Open index.html in browser or use live server
```

## Structure
```
├── index.html           # Main page
├── css/
│   ├── main.css        # Core styles + repo-card overrides
│   ├── icons.css       # SVG icon styles
│   └── accessibility.css
├── components/app.js    # Smooth scrolling + animations
└── assets/             # Icons and images
```

## Features
- Dynamic GitHub repo cards with live API data
- CSS custom properties for easy theming
- Intersection Observer animations
- WCAG 2.1 accessible
- Mobile-first responsive

## Customization
Update `data-repo` attributes in HTML for your repositories:
```html
<div class="repo-card" data-repo="username/repository"></div>
```

Modify theme colors in `css/main.css`:
```css
:root {
  --color-primary: #1976d2;
  --color-surface: #1e1e1e;
  /* ... */
}
```

Live at: [elijahleemorgan.github.io](https://elijahleemorgan.github.io)