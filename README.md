# Sarah Benali — CV / Portfolio Cinématographique

> Vitrine personnelle animée haute-fidélité conçue selon le **Preset D — « Aura Digitale »** (Vide spatial, Violet Néon, Glow, typographie Sora & Instrument Serif).

---

## ⚡ Caractéristiques & Système de Design

- **Direction Esthétique :** Preset D — « Aura Digitale »
- **Palette :**
  - Vide Spatial : `#0A0A14` (Fond profond)
  - Accent Néon : `#7B61FF` (Violet électrique et lueurs diffuses)
  - Surface Carte : `#12121E` / Hover `#1A1A2E`
  - Fantôme / Texte : `#F0EFF4`
  - Graphite : `#18181B`
- **Typographie :**
  - Titres : **Sora** (tracking serré)
  - Dramatique : **Instrument Serif** (italique haute-couture)
  - Données & Code : **Fira Code** (monospace)
- **Texture Visuelle :**
  - Filtre SVG inline `<feTurbulence>` à 0.05 d'opacité pour un grain cinéma subtil.
  - Rayon de courbure fixe `rounded-[2rem]` à `rounded-[3rem]`.
- **Micro-Interactions & Animations :**
  - Navbar en pilule flottante avec morphing au scroll (verre dépoli / backdrop blur).
  - Boutons magnétiques avec courbe `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
  - Timeline verticale vivante alternée avec points pulsants et slide-in GSAP.
  - Tableau de bord des compétences avec compteurs animés et jauges circulaires SVG (`stroke-dashoffset`).
  - Badge de disponibilité "En ligne" avec pulsation émeraude.

---

## 📁 Structure du Projet

```
GEMINI/
├── index.html               # Point d'entrée Vite
├── index-standalone.html    # Version autonome prête à être ouverte sans serveur (double-clic)
├── package.json             # Dépendances (React 19, GSAP, Tailwind, Lucide)
├── vite.config.js           # Configuration Vite
├── tailwind.config.js       # Tokens de design Aura Digitale
├── postcss.config.js
├── src/
│   ├── main.jsx             # Point de montage React
│   ├── App.jsx              # Application complète 1:1 Pixel Perfect
│   └── index.css            # Styles globaux, bruit, glow & typographies
└── public/
    └── sarah-benali-cv.pdf  # Fichier CV téléchargeable
```

---

## 🚀 Démarrage Rapide

### Option A — Immédiat (Sans rien installer)
Double-cliquez simplement sur le fichier `index-standalone.html` pour ouvrir le portfolio interactif complet directement dans votre navigateur web préféré (Chrome, Edge, Opera, etc.).

### Option B — Mode Développement Vite (React 19)
```bash
npm install
npm run dev
```
Ouvrez ensuite l'URL locale indiquée (ex: `http://localhost:5173`).

### Option C — Build pour Production
```bash
npm run build
```
Les fichiers optimisés seront générés dans le dossier `dist/`, prêts à être déployés sur Vercel, Netlify ou GitHub Pages.
