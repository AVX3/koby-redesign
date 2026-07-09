// Fahrzeug-Datenbank (aus autohaus-koberstein.de übernommen)
window.VEHICLES = [
  {
    id: 1,
    brand: "BMW",
    title: "BMW Z3 Coupe 2.8",
    subtitle: "Leder, Klima, BMW 18 Zoll",
    category: "Coupé",
    price: 10900,
    ez: "11/1998",
    km: 136000,
    kw: 142,
    ps: 193,
    color: "Cosmosschwarz-metallic",
    hu: "02/2013",
    au: "02/2013",
    euro: 4,
    getriebe: "Schaltgetriebe",
    kraftstoff: "Benzin",
    klima: "Klimaanlage",
    doors: "2/3",
    highlights: ["Leder", "18 Zoll LM", "Sitzheizung", "Navi", "Klima", "ESP+ABS"],
    verbrauch: { innerorts: 12.9, ausserorts: 7.4, kombiniert: 9.4 },
    co2: 225,
    description:
      "2. Hand, scheckheftgepflegt, unfallfrei. Bremsbeläge neu, Keilriemen neu, TÜV und AU neu, Kundendienst neu. Pakete: Leder-Ausstattung, Chrome-Line-Interieur, Soundpaket, Edelholz. Technik: 2,8 L Benzinmotor, 193 PS, 5-Gang-Getriebe, Schadstoffklasse D 4, grüne Feinstaubplakette, ABS, ASC+T, Gurtstraffer, Zentralverriegelung mit Funk, 4 Airbags. Innen: Lederausstattung in Nappa/Walnuss, Schalt- und Handbremshebel in Leder, Edelholz, Sportsitze elektrisch verstellbar, Sitzheizung, Klimaanlage, M-Lederlenkrad, Leseleuchten, Seitenairbag vorn, elektrische Fensterheber, Nichtraucherpaket. Media: BMW CD-Radio, HiFi-Lautsprechersystem, Bordcomputer. Außen: BMW 18 Zoll LM-Felgen V-Speiche 72, Nebelscheinwerfer, Außenspiegel elektrisch einstellbar und beheizbar. Ausgestellt in Wieslauftalstraße 143, Schorndorf-Haubersbronn.",
  },
  {
    id: 2,
    brand: "BMW",
    title: "BMW 320d",
    subtitle: "Xenon, Navi Prof., Leder, Panoramadach",
    category: "Limousine",
    price: 9900,
    ez: "05/2006",
    km: 190000,
    kw: 120,
    ps: 163,
    color: "Sparkling Graphite-metallic",
    hu: "06/2013",
    au: "06/2013",
    euro: 4,
    getriebe: "Schaltgetriebe",
    kraftstoff: "Diesel",
    klima: "Klimaautomatik",
    highlights: ["Xenon", "Navi Prof.", "Leder", "Panoramadach", "Klimaautomatik", "ESP+ABS"],
  },
  {
    id: 3,
    brand: "BMW",
    title: "BMW Z3 Coupe 2.8",
    subtitle: "Leder, Klima, BMW 17 Zoll",
    category: "Coupé",
    price: 9900,
    ez: "09/1998",
    km: 142000,
    kw: 142,
    ps: 193,
    color: "Arktissilber-metallic",
    hu: "02/2016",
    au: "02/2016",
    euro: 2,
    getriebe: "Schaltgetriebe",
    kraftstoff: "Benzin",
    klima: "Klimaanlage",
    highlights: ["Leder", "17 Zoll", "Klima", "ESP+ABS"],
  },
  {
    id: 4,
    brand: "BMW",
    title: "BMW Z3 Coupe 2.8",
    subtitle: "Leder, Klima, BMW 19 Zoll",
    category: "Coupé",
    price: 5900,
    ez: "09/1998",
    km: 140000,
    kw: 141,
    ps: 192,
    color: "Schwarz",
    euro: 2,
    getriebe: "Schaltgetriebe",
    kraftstoff: "Benzin",
    klima: "Klimaanlage",
    highlights: ["Leder", "19 Zoll", "Klima", "ESP+ABS"],
  },
  {
    id: 5,
    brand: "Ford",
    title: "Ford S-Max 1.6 EcoBoost",
    subtitle: "Start-Stopp-System, Titanium",
    category: "Van",
    price: 20900,
    ez: "11/2012",
    km: 32000,
    kw: 118,
    ps: 160,
    color: "Silber-metallic",
    hu: "11/2015",
    au: "11/2015",
    euro: 5,
    getriebe: "Schaltgetriebe",
    kraftstoff: "Benzin",
    klima: "Klimaautomatik",
    highlights: ["Titanium", "Start-Stopp", "Klimaautomatik", "ESP+ABS", "Wenig km"],
  },
  {
    id: 6,
    brand: "Mazda",
    title: "Mazda MX-5 1.6i 16V",
    subtitle: "Roadster-Klassiker",
    category: "Cabrio",
    price: 1900,
    ez: "03/2000",
    km: 210000,
    kw: 81,
    ps: 110,
    color: "Rot",
    euro: 2,
    getriebe: "Schaltgetriebe",
    kraftstoff: "Benzin",
    highlights: ["Roadster", "ABS", "Leichtmetallfelgen", "Wegfahrsperre"],
  },
  {
    id: 7,
    brand: "Opel",
    title: "Opel Corsa Advantage",
    subtitle: "ABS / Servo / Schiebedach",
    category: "Kompakt",
    price: 950,
    ez: "01/1998",
    km: 130000,
    kw: 44,
    ps: 60,
    color: "Gold-metallic",
    hu: "07/2015",
    au: "07/2015",
    euro: 3,
    getriebe: "Schaltgetriebe",
    kraftstoff: "Benzin",
    highlights: ["Schiebedach", "Servo", "ABS", "Wegfahrsperre"],
  },
  {
    id: 8,
    brand: "VW",
    title: "VW T5 California Comfortline",
    subtitle: "Sondermodell Sonora",
    category: "Van/Camper",
    price: 28900,
    ez: "09/2007",
    km: 199000,
    kw: 96,
    ps: 131,
    color: "Reflexsilber-metallic",
    hu: "04/2015",
    au: "04/2015",
    euro: 4,
    getriebe: "Schaltgetriebe",
    kraftstoff: "Diesel",
    klima: "Klimaautomatik",
    highlights: ["Sondermodell Sonora", "Klimaautomatik", "ESP+ABS", "Camper-Ausbau"],
  },
  {
    id: 9,
    brand: "VW",
    title: "VW T5 California Comfortline",
    subtitle: "Sondermodell Sonora",
    category: "Van/Camper",
    price: 28900,
    ez: "09/2007",
    km: 199000,
    kw: 96,
    ps: 131,
    color: "Reflexsilber-metallic",
    hu: "09/2015",
    au: "09/2015",
    euro: 4,
    getriebe: "Schaltgetriebe",
    kraftstoff: "Diesel",
    klima: "Klimaautomatik",
    highlights: ["Sondermodell Sonora", "Klimaautomatik", "ESP+ABS", "Camper-Ausbau"],
  },
  {
    id: 10,
    brand: "VW",
    title: "VW T5 California Comfortline",
    subtitle: "Camper-Klassiker",
    category: "Van/Camper",
    price: 26900,
    ez: "07/2006",
    km: 199000,
    kw: 128,
    ps: 174,
    color: "Reflexsilber-metallic",
    hu: "07/2015",
    au: "07/2015",
    euro: 4,
    getriebe: "Schaltgetriebe",
    kraftstoff: "Diesel",
    klima: "Klimaautomatik",
    highlights: ["Comfortline", "Klimaautomatik", "ESP+ABS", "Camper-Ausbau"],
  },
];

(() => {
  'use strict';
  const grid = document.getElementById('vehicle-grid');
  if (!grid) return;

  const state = {
    q: '',
    brand: 'all',
    fuel: 'all',
    priceMax: null,
    sort: 'price-asc',
  };

  const fmtEuro = (n) => new Intl.NumberFormat('de-DE').format(n) + ' €';
  const fmtKm = (n) => new Intl.NumberFormat('de-DE').format(n) + ' km';

  const brandInitials = (b) => (b || '?').substring(0, 3).toUpperCase();

  const brandColor = (b) => {
    const map = { BMW: 'from-sky-500/30', Ford: 'from-blue-500/30', Mazda: 'from-red-500/30', Opel: 'from-amber-500/30', VW: 'from-emerald-500/30' };
    return map[b] || 'from-brand-500/30';
  };

  const imgFor = (v) => `assets/images/vehicles/${v.id}_1.jpg`;

  const chip = (label) =>
    `<span class="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-neutral-300">${label}</span>`;

  const renderCard = (v) => `
    <article class="group rounded-2xl overflow-hidden border border-white/10 bg-ink-800 flex flex-col hover:border-brand-500/60 transition">
      <div class="aspect-[16/10] bg-gradient-to-br ${brandColor(v.brand)} to-ink-900 relative overflow-hidden">
        <img src="${imgFor(v)}" alt="${v.title} ${v.subtitle}" loading="lazy" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-500" onerror="this.style.display='none'" />
        <span class="absolute top-3 left-3 rounded-full bg-brand-500 text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-lg">${v.category}</span>
        <span class="absolute top-3 right-3 rounded-md bg-ink-900/80 backdrop-blur border border-white/10 text-white text-xs px-2 py-1">Nr. ${v.id}</span>
      </div>
      <div class="p-5 flex flex-col flex-1">
        <h3 class="font-display uppercase text-xl leading-tight">${v.title}</h3>
        <p class="mt-1 text-sm text-neutral-400">${v.subtitle}</p>

        <dl class="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
          <div class="flex justify-between border-b border-white/5 pb-1"><dt class="text-neutral-500">EZ</dt><dd class="text-white">${v.ez || '–'}</dd></div>
          <div class="flex justify-between border-b border-white/5 pb-1"><dt class="text-neutral-500">km</dt><dd class="text-white">${new Intl.NumberFormat('de-DE').format(v.km)}</dd></div>
          <div class="flex justify-between border-b border-white/5 pb-1"><dt class="text-neutral-500">Leistung</dt><dd class="text-white">${v.kw} kW${v.ps ? ` / ${v.ps} PS` : ''}</dd></div>
          <div class="flex justify-between border-b border-white/5 pb-1"><dt class="text-neutral-500">Kraftstoff</dt><dd class="text-white">${v.kraftstoff}</dd></div>
        </dl>

        <div class="mt-4 flex flex-wrap gap-1.5">
          ${(v.highlights || []).slice(0, 4).map(chip).join('')}
        </div>

        <div class="mt-auto pt-6 flex items-end justify-between gap-3">
          <p class="font-display text-3xl text-brand-500 leading-none">${fmtEuro(v.price)}</p>
          <button type="button" data-vehicle-id="${v.id}" class="vehicle-detail-btn inline-flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 px-3.5 py-2 text-sm font-semibold transition">
            Details
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </article>
  `;

  const applyFilter = () => {
    const q = state.q.toLowerCase().trim();
    let list = window.VEHICLES.filter(v => {
      if (state.brand !== 'all' && v.brand !== state.brand) return false;
      if (state.fuel !== 'all' && v.kraftstoff !== state.fuel) return false;
      if (state.priceMax && v.price > state.priceMax) return false;
      if (q) {
        const hay = (v.title + ' ' + v.subtitle + ' ' + v.color + ' ' + (v.highlights || []).join(' ')).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const sorters = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'km-asc': (a, b) => a.km - b.km,
      'year-desc': (a, b) => (b.ez || '').localeCompare(a.ez || ''),
    };
    list.sort(sorters[state.sort] || sorters['price-asc']);

    document.getElementById('vehicle-count').textContent = list.length;
    grid.innerHTML = list.length
      ? list.map(renderCard).join('')
      : `<div class="col-span-full rounded-2xl border border-white/10 bg-ink-800 p-10 text-center text-neutral-400">Keine Fahrzeuge passen zu Ihrer Auswahl. <button id="reset-filters" class="text-brand-500 hover:underline">Filter zurücksetzen</button></div>`;

    grid.querySelectorAll('.vehicle-detail-btn').forEach(btn => {
      btn.addEventListener('click', () => openDetail(Number(btn.dataset.vehicleId)));
    });
    const reset = document.getElementById('reset-filters');
    if (reset) reset.addEventListener('click', () => location.reload());
  };

  // Filter-Bindings
  const bind = (id, key, mapper = (x) => x) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => { state[key] = mapper(el.value); applyFilter(); });
  };
  bind('f-q', 'q');
  bind('f-brand', 'brand');
  bind('f-fuel', 'fuel');
  bind('f-price', 'priceMax', (v) => v ? Number(v) : null);
  bind('f-sort', 'sort');

  // Modal
  const dlg = document.getElementById('vehicle-modal');
  const openDetail = (id) => {
    const v = window.VEHICLES.find(x => x.id === id);
    if (!v || !dlg) return;
    const body = dlg.querySelector('#vehicle-modal-body');
    body.innerHTML = `
      <div class="aspect-[16/9] bg-gradient-to-br ${brandColor(v.brand)} to-ink-900 relative overflow-hidden rounded-t-2xl">
        <img src="${imgFor(v)}" alt="${v.title} ${v.subtitle}" class="absolute inset-0 h-full w-full object-cover" onerror="this.style.display='none'" />
      </div>
      <div class="p-6 sm:p-8">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-widest text-brand-500 font-semibold">${v.category} · ${v.brand}</p>
            <h2 class="mt-1 font-display uppercase text-3xl leading-tight">${v.title}</h2>
            <p class="mt-1 text-neutral-400">${v.subtitle}</p>
          </div>
          <p class="font-display text-4xl text-brand-500 leading-none">${fmtEuro(v.price)}</p>
        </div>

        <h3 class="mt-6 font-semibold text-white uppercase tracking-wider text-xs">Fahrzeugdaten</h3>
        <dl class="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          ${[
            ['EZ', v.ez], ['km', fmtKm(v.km)], ['Leistung', `${v.kw} kW${v.ps ? ` / ${v.ps} PS` : ''}`],
            ['Farbe', v.color], ['Getriebe', v.getriebe], ['Kraftstoff', v.kraftstoff],
            v.klima && ['Klima', v.klima],
            ['Euro', v.euro], v.hu && ['HU', v.hu], v.au && ['AU', v.au], v.doors && ['Türen', v.doors],
          ].filter(Boolean).map(([k, val]) => `
            <div class="rounded-lg bg-ink-800 border border-white/5 px-3 py-2">
              <dt class="text-xs text-neutral-500">${k}</dt>
              <dd class="text-white text-sm">${val}</dd>
            </div>
          `).join('')}
        </dl>

        ${v.highlights ? `
          <h3 class="mt-6 font-semibold text-white uppercase tracking-wider text-xs">Highlights</h3>
          <div class="mt-3 flex flex-wrap gap-2">
            ${v.highlights.map(h => `<span class="rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-200 px-3 py-1 text-xs">${h}</span>`).join('')}
          </div>` : ''}

        ${v.verbrauch ? `
          <h3 class="mt-6 font-semibold text-white uppercase tracking-wider text-xs">Verbrauch &amp; Emissionen (Herstellerangaben)</h3>
          <dl class="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div class="rounded-lg bg-ink-800 border border-white/5 px-3 py-2"><dt class="text-xs text-neutral-500">Innerorts</dt><dd class="text-white">${v.verbrauch.innerorts} l/100km</dd></div>
            <div class="rounded-lg bg-ink-800 border border-white/5 px-3 py-2"><dt class="text-xs text-neutral-500">Außerorts</dt><dd class="text-white">${v.verbrauch.ausserorts} l/100km</dd></div>
            <div class="rounded-lg bg-ink-800 border border-white/5 px-3 py-2"><dt class="text-xs text-neutral-500">Kombiniert</dt><dd class="text-white">${v.verbrauch.kombiniert} l/100km</dd></div>
            <div class="rounded-lg bg-ink-800 border border-white/5 px-3 py-2"><dt class="text-xs text-neutral-500">CO₂</dt><dd class="text-white">${v.co2} g/km</dd></div>
          </dl>` : ''}

        ${v.description ? `
          <h3 class="mt-6 font-semibold text-white uppercase tracking-wider text-xs">Beschreibung</h3>
          <p class="mt-3 text-sm text-neutral-300 leading-relaxed whitespace-pre-line">${v.description}</p>` : ''}

        <div class="mt-8 flex flex-wrap gap-3">
          <a href="kontakt.html?fahrzeug=${encodeURIComponent(v.title)}#formular" class="inline-flex items-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-400 text-black px-5 py-2.5 font-bold transition">
            Anfrage senden
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </a>
          <a href="tel:+491776849400" class="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 font-semibold transition">
            0177 6849400 anrufen
          </a>
        </div>

        <p class="mt-6 text-xs text-neutral-500">
          Ausgestellt in der Wieslauftalstraße 143, Schorndorf-Haubersbronn. Bitte vorab telefonisch einen Termin vereinbaren.
          Irrtümer, Ausstattungsirrtümer, Übertragungsfehler und Zwischenverkauf vorbehalten.
        </p>
      </div>
    `;
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  };

  const closeDlg = () => {
    if (!dlg) return;
    if (typeof dlg.close === 'function') dlg.close();
    else dlg.removeAttribute('open');
    document.body.style.overflow = '';
  };

  if (dlg) {
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) closeDlg();
    });
    dlg.querySelector('[data-close-modal]')?.addEventListener('click', closeDlg);
  }

  applyFilter();
})();
