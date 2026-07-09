# Koberstein Automobile · Redesign (Local Prototype)

Lokaler Prototyp einer modernisierten Version von [autohaus-koberstein.de](https://www.autohaus-koberstein.de/).
Statische Website — kein Build-Prozess nötig.

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Zwei-CTA-Layout (Fahrzeuge / Werkstatt) + Angebote + Über-mich-Vorschau |
| `fahrzeug-angebote.html` | Fahrzeug-Katalog mit Filter, Sortierung, Detail-Modal |
| `werkstatt.html` | Werkstatt-Leistungen + interaktiver Terminkalender mit freien Slots |
| `leidenschaft.html` | Hub „Über mich" — Autohandel, Restauration, Motorsport, Oldtimer |
| `kontakt.html` | Kontakt-Formular (mit URL-Vorbelegung für Termin/Fahrzeug) + Google-Maps |
| `impressum.html` | Impressum + Datenschutz |
| `restauration.html`, `motorsport.html`, `oldtimer.html` | Detail-Seiten |
| `autohandel.html` | Redirect auf `leidenschaft.html#autohandel` |

## Lokal ansehen

Einfach `index.html` doppelklicken. Für die Formular-Vorbelegung (Termin/Fahrzeug via URL-Parameter)
und einige moderne Features besser einen lokalen Server nutzen:

```bash
# Python (falls installiert)
python -m http.server 8000

# oder Node
npx serve
```

Dann `http://localhost:8000` öffnen.

## Auf GitHub Pages veröffentlichen

1. Repo auf GitHub anlegen (z. B. `koberstein-redesign`) und diese Dateien pushen:
   ```bash
   git remote add origin https://github.com/<username>/<repo>.git
   git branch -M main
   git push -u origin main
   ```
2. GitHub → Repo → **Settings → Pages**
3. Unter *Build and deployment* → *Source*: **Deploy from a branch**
4. *Branch*: `main`, *Folder*: `/ (root)` → **Save**
5. Nach ~1 Minute ist die Seite unter `https://<username>.github.io/<repo>/` erreichbar

## Tech-Stack

- Reines HTML5 / CSS3 / vanilla JS — kein Framework, kein Build
- **Tailwind CSS** via CDN (`cdn.tailwindcss.com`) mit Custom-Config in `assets/js/tailwind-config.js`
- **Google Fonts** (Inter + Barlow Condensed)
- **Google Maps** (schlüsselfrei, `output=embed`)
- **JSON-LD** Structured Data (`AutomotiveBusiness`)

## Struktur

```
.
├── index.html · fahrzeug-angebote.html · werkstatt.html · ...
├── assets/
│   ├── css/site.css               Gemeinsame Custom-Styles
│   ├── js/
│   │   ├── tailwind-config.js     Brand-Farben & Fonts
│   │   ├── app.js                 Menü + Formular-Validierung + Query-Param-Vorbelegung
│   │   ├── calendar.js            Werkstatt-Terminkalender
│   │   └── vehicles.js            10 Fahrzeuge + Filter + Detail-Modal
│   └── images/
│       ├── logo.gif · center_*.gif · audifelge*.gif
│       ├── content/               Bilder aus dem Original (Autohandel, Restauration …)
│       └── vehicles/              Fahrzeug-Fotos 1_1.jpg – 10_1.jpg
└── _original/                     (gitignore) Original-HTML/CSS zum Vergleich
```

## Hinweise für Produktion

- **Kontaktformular** nutzt aktuell `mailto:` als Fallback. Für echten Versand:
  - GitHub Pages allein reicht nicht (keine Server-Funktionen)
  - Alternativen: PHP-Handler auf bestehendem Webspace, Netlify Forms, Formspree, Web3Forms
- **Tailwind CDN** ist nicht für Produktion optimiert. Für Live-Deployment:
  - Tailwind CLI/PostCSS Build einführen → nur genutzte Klassen bleiben übrig
- **Terminkalender** zeigt derzeit deterministische Beispiel-Slots (Demo).
  Für echte Verfügbarkeit an Backend/Kalender-API (Google Calendar, Cal.com etc.) anbinden.
