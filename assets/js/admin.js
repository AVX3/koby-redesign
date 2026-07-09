// Admin-Panel für Fahrzeug-Verwaltung (Demo-Modus mit localStorage)
(() => {
  'use strict';

  const DEMO_PASSWORD = 'demo';
  const AUTH_KEY = 'koberstein_admin_auth';
  const STORAGE_KEY = 'koberstein_vehicles_custom';
  const IMG_STORAGE_KEY = 'koberstein_vehicles_images';
  const BLOCKS_KEY = 'koberstein_slot_blocks';
  const APPTS_KEY = 'koberstein_appointments';

  const SLOTS = ['08:00', '10:00', '13:30', '15:30'];
  const DAY_NAMES = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
  const MONTHS = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

  const loginView = document.getElementById('login-view');
  const adminView = document.getElementById('admin-view');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');

  const listView = document.getElementById('list-view');
  const formView = document.getElementById('form-view');
  const apptsView = document.getElementById('appointments-view');
  const adminCalendar = document.getElementById('admin-calendar');
  const inboxList = document.getElementById('inbox-list');
  const pendingBadge = document.getElementById('pending-badge');
  const tbody = document.getElementById('vehicle-tbody');
  const newBtn = document.getElementById('new-vehicle-btn');
  const backBtn = document.getElementById('back-to-list');
  const cancelBtn = document.getElementById('cancel-btn');
  const deleteBtn = document.getElementById('delete-btn');
  const form = document.getElementById('vehicle-form');
  const formTitle = document.getElementById('form-title');
  const totalCount = document.getElementById('vehicle-total');
  const imgInput = document.getElementById('v-image');
  const imgPreview = document.getElementById('v-image-preview');

  let currentEditId = null;
  let currentImageData = null;

  // Statische Fallback-Daten für die Übersicht (nur zur Anzeige, nicht editierbar)
  const STATIC_VEHICLES = [
    { id: 1, title: 'BMW Z3 Coupe 2.8', subtitle: 'Leder, Klima, BMW 18 Zoll', category: 'Coupé', price: 10900, ez: '11/1998', km: 136000, kw: 142, static: true },
    { id: 2, title: 'BMW 320d', subtitle: 'Xenon, Navi Prof., Leder, Panoramadach', category: 'Limousine', price: 9900, ez: '05/2006', km: 190000, kw: 120, static: true },
    { id: 3, title: 'BMW Z3 Coupe 2.8', subtitle: 'Leder, Klima, BMW 17 Zoll', category: 'Coupé', price: 9900, ez: '09/1998', km: 142000, kw: 142, static: true },
    { id: 4, title: 'BMW Z3 Coupe 2.8', subtitle: 'Leder, Klima, BMW 19 Zoll', category: 'Coupé', price: 5900, ez: '09/1998', km: 140000, kw: 141, static: true },
    { id: 5, title: 'Ford S-Max 1.6 EcoBoost', subtitle: 'Start-Stopp, Titanium', category: 'Van', price: 20900, ez: '11/2012', km: 32000, kw: 118, static: true },
    { id: 6, title: 'Mazda MX-5 1.6i 16V', subtitle: 'Roadster-Klassiker', category: 'Cabrio', price: 1900, ez: '03/2000', km: 210000, kw: 81, static: true },
    { id: 7, title: 'Opel Corsa Advantage', subtitle: 'ABS / Servo / Schiebedach', category: 'Kompakt', price: 950, ez: '01/1998', km: 130000, kw: 44, static: true },
    { id: 8, title: 'VW T5 California Comfortline', subtitle: 'Sondermodell Sonora', category: 'Van/Camper', price: 28900, ez: '09/2007', km: 199000, kw: 96, static: true },
    { id: 9, title: 'VW T5 California Comfortline', subtitle: 'Sondermodell Sonora', category: 'Van/Camper', price: 28900, ez: '09/2007', km: 199000, kw: 96, static: true },
    { id: 10, title: 'VW T5 California Comfortline', subtitle: 'Camper-Klassiker', category: 'Van/Camper', price: 26900, ez: '07/2006', km: 199000, kw: 128, static: true },
  ];

  const fmtEuro = (n) => new Intl.NumberFormat('de-DE').format(n) + ' €';
  const fmtKm = (n) => n ? new Intl.NumberFormat('de-DE').format(n) + ' km' : '–';

  // Storage-Layer
  const getCustom = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  };
  const setCustom = (arr) => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  const getImages = () => {
    try { return JSON.parse(localStorage.getItem(IMG_STORAGE_KEY) || '{}'); }
    catch { return {}; }
  };
  const setImages = (obj) => localStorage.setItem(IMG_STORAGE_KEY, JSON.stringify(obj));
  const getBlocks = () => {
    try { return JSON.parse(localStorage.getItem(BLOCKS_KEY) || '[]'); }
    catch { return []; }
  };
  const setBlocks = (arr) => localStorage.setItem(BLOCKS_KEY, JSON.stringify(arr));
  const getAppts = () => {
    try { return JSON.parse(localStorage.getItem(APPTS_KEY) || '[]'); }
    catch { return []; }
  };
  const setAppts = (arr) => localStorage.setItem(APPTS_KEY, JSON.stringify(arr));

  // Auth
  const isAuthed = () => sessionStorage.getItem(AUTH_KEY) === 'true';
  const showAdmin = () => {
    loginView.classList.add('hidden');
    adminView.classList.remove('hidden');
    renderList();
  };
  const showLogin = () => {
    adminView.classList.add('hidden');
    loginView.classList.remove('hidden');
  };

  if (isAuthed()) showAdmin();
  else showLogin();

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = document.getElementById('login-password').value;
    if (pw === DEMO_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      loginError.classList.add('hidden');
      showAdmin();
    } else {
      loginError.classList.remove('hidden');
    }
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_KEY);
    showLogin();
  });

  // List
  const renderList = () => {
    const custom = getCustom();
    const images = getImages();
    const all = [...custom, ...STATIC_VEHICLES];
    totalCount.textContent = all.length;

    tbody.innerHTML = all.map(v => {
      const isStatic = v.static;
      const img = isStatic ? `assets/images/vehicles/${v.id}_1.jpg` : (images[v.id] || null);
      return `
        <tr class="hover:bg-white/[0.02]">
          <td class="px-4 py-3">
            <div class="h-12 w-16 rounded overflow-hidden bg-ink-900 border border-white/5 flex items-center justify-center">
              ${img
                ? `<img src="${img}" alt="" class="h-full w-full object-cover" onerror="this.parentElement.innerHTML='<span class=&quot;text-[10px] text-neutral-600&quot;>kein Bild</span>'" />`
                : `<span class="text-[10px] text-neutral-600">kein Bild</span>`}
            </div>
          </td>
          <td class="px-4 py-3">
            <div class="font-semibold text-white">${escape(v.title)}</div>
            <div class="text-xs text-neutral-400">${escape(v.subtitle || '')}</div>
            <div class="text-[10px] uppercase tracking-widest mt-1 ${isStatic ? 'text-neutral-500' : 'text-brand-500'}">${isStatic ? 'Demo-Datenbank' : 'Eigene Eingabe'}</div>
          </td>
          <td class="px-4 py-3 hidden md:table-cell text-neutral-300">
            <div>${v.ez || '–'}</div>
            <div class="text-xs text-neutral-500">${fmtKm(v.km)}</div>
          </td>
          <td class="px-4 py-3 text-right font-display text-lg text-brand-500 whitespace-nowrap">${fmtEuro(v.price)}</td>
          <td class="px-4 py-3 text-right">
            ${isStatic
              ? `<span class="text-xs text-neutral-500">gesperrt</span>`
              : `<button type="button" data-edit="${v.id}" class="inline-flex items-center gap-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-1.5 text-xs font-semibold">Bearbeiten</button>`}
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => openForm(Number(btn.dataset.edit)));
    });
  };

  const escape = (s) => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Form
  const openForm = (id) => {
    currentEditId = id;
    currentImageData = null;

    if (id) {
      const custom = getCustom();
      const v = custom.find(x => x.id === id);
      if (!v) return;
      formTitle.textContent = 'Fahrzeug bearbeiten';
      deleteBtn.classList.remove('hidden');
      document.getElementById('v-id').value = v.id;
      document.getElementById('v-title').value = v.title || '';
      document.getElementById('v-subtitle').value = v.subtitle || '';
      document.getElementById('v-brand').value = v.brand || '';
      document.getElementById('v-category').value = v.category || 'Limousine';
      document.getElementById('v-price').value = v.price || '';
      document.getElementById('v-ez').value = v.ez || '';
      document.getElementById('v-km').value = v.km || '';
      document.getElementById('v-kw').value = v.kw || '';
      document.getElementById('v-ps').value = v.ps || '';
      document.getElementById('v-fuel').value = v.kraftstoff || 'Benzin';
      document.getElementById('v-transmission').value = v.getriebe || 'Schaltgetriebe';
      document.getElementById('v-euro').value = v.euro || '';
      document.getElementById('v-color').value = v.color || '';
      document.getElementById('v-hu').value = v.hu || '';
      document.getElementById('v-klima').value = v.klima || '';
      document.getElementById('v-highlights').value = (v.highlights || []).join(', ');
      document.getElementById('v-description').value = v.description || '';
      const images = getImages();
      if (images[id]) {
        imgPreview.innerHTML = `<img src="${images[id]}" class="h-full w-full object-cover" />`;
      } else {
        imgPreview.textContent = 'Kein Bild';
      }
    } else {
      formTitle.textContent = 'Neues Fahrzeug';
      deleteBtn.classList.add('hidden');
      form.reset();
      document.getElementById('v-id').value = '';
      imgPreview.textContent = 'Kein Bild';
    }

    listView.classList.add('hidden');
    formView.classList.remove('hidden');
    window.scrollTo(0, 0);
  };

  const closeForm = () => {
    formView.classList.add('hidden');
    listView.classList.remove('hidden');
    renderList();
  };

  newBtn.addEventListener('click', () => openForm(null));
  backBtn.addEventListener('click', closeForm);
  cancelBtn.addEventListener('click', closeForm);

  imgInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Bild ist größer als 5 MB.');
      imgInput.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      currentImageData = reader.result;
      imgPreview.innerHTML = `<img src="${reader.result}" class="h-full w-full object-cover" />`;
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const custom = getCustom();
    const images = getImages();

    const idVal = document.getElementById('v-id').value;
    const id = idVal ? Number(idVal) : (Math.max(0, ...custom.map(v => v.id), 100) + 1);

    const vehicle = {
      id,
      title: document.getElementById('v-title').value.trim(),
      subtitle: document.getElementById('v-subtitle').value.trim(),
      brand: document.getElementById('v-brand').value,
      category: document.getElementById('v-category').value,
      price: Number(document.getElementById('v-price').value) || 0,
      ez: document.getElementById('v-ez').value.trim(),
      km: Number(document.getElementById('v-km').value) || 0,
      kw: Number(document.getElementById('v-kw').value) || 0,
      ps: Number(document.getElementById('v-ps').value) || 0,
      kraftstoff: document.getElementById('v-fuel').value,
      getriebe: document.getElementById('v-transmission').value,
      euro: document.getElementById('v-euro').value ? Number(document.getElementById('v-euro').value) : null,
      color: document.getElementById('v-color').value.trim(),
      hu: document.getElementById('v-hu').value.trim(),
      klima: document.getElementById('v-klima').value,
      highlights: document.getElementById('v-highlights').value.split(',').map(s => s.trim()).filter(Boolean),
      description: document.getElementById('v-description').value.trim(),
    };

    if (!vehicle.title || !vehicle.brand || !vehicle.price) {
      alert('Bitte Titel, Marke und Preis ausfüllen.');
      return;
    }

    const existing = custom.findIndex(v => v.id === id);
    if (existing >= 0) custom[existing] = vehicle;
    else custom.unshift(vehicle);

    setCustom(custom);

    if (currentImageData) {
      images[id] = currentImageData;
      try {
        setImages(images);
      } catch (err) {
        alert('Bilder-Speicher voll (localStorage-Limit). Für die Live-Version kein Problem – die Bilder liegen dann auf dem Server.');
      }
    }

    closeForm();
  });

  deleteBtn.addEventListener('click', () => {
    if (!currentEditId) return;
    if (!confirm('Fahrzeug wirklich löschen?')) return;
    const custom = getCustom().filter(v => v.id !== currentEditId);
    setCustom(custom);
    const images = getImages();
    delete images[currentEditId];
    setImages(images);
    closeForm();
  });

  // =====================================================
  // TERMINE
  // =====================================================

  // Datums-Helper
  const pad = (n) => String(n).padStart(2, '0');
  const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const startOfWeek = (offset = 0) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    d.setDate(d.getDate() + diff + offset * 7);
    return d;
  };
  const isPast = (dateStr, slot) => {
    const [h, m] = slot.split(':').map(Number);
    const dt = new Date(dateStr + 'T00:00:00');
    dt.setHours(h, m, 0, 0);
    return dt.getTime() < Date.now();
  };
  const isToday = (dateStr) => {
    const t = new Date(); t.setHours(0,0,0,0);
    return isoDate(t) === dateStr;
  };

  // Seed-Daten für Demo (nur beim allerersten Aufruf)
  const seedDemo = () => {
    if (localStorage.getItem('koberstein_demo_seeded') === '1') return;

    const monday = startOfWeek(0);
    const day = (offset) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + offset);
      return isoDate(d);
    };
    const nextMonday = startOfWeek(1);
    const day2 = (offset) => {
      const d = new Date(nextMonday);
      d.setDate(nextMonday.getDate() + offset);
      return isoDate(d);
    };

    setBlocks([
      { date: day(0), time: '10:00' },
      { date: day(1), time: '13:30' },
      { date: day(2), time: '15:30' },
      { date: day(3), time: '08:00' },
      { date: day(3), time: '10:00' },
      { date: day2(2), time: '13:30' },
    ]);

    setAppts([
      { id: 1, date: day(4), time: '10:00', service: 'HU-Vorbereitung', name: 'Michael Schneider', email: 'm.schneider@example.de', phone: '0171 1234567', message: 'HU steht Ende des Monats an, brauche kurz einen Check.', status: 'pending', createdAt: Date.now() - 3600e3 },
      { id: 2, date: day2(0), time: '15:30', service: 'Reifenwechsel', name: 'Sabine Krüger', email: 'sk@example.de', phone: '0179 2345678', message: 'Sommerreifen sind schon fällig – bitte einlagern.', status: 'pending', createdAt: Date.now() - 7200e3 },
      { id: 3, date: day2(1), time: '08:00', service: 'Wartung / Inspektion', name: 'Frank Wagner', email: 'wagner@example.de', phone: '0172 3456789', message: 'Kleine Inspektion nach Scheckheft.', status: 'confirmed', createdAt: Date.now() - 86400e3 },
    ]);

    localStorage.setItem('koberstein_demo_seeded', '1');
  };
  seedDemo();

  // Tab-Steuerung
  const tabButtons = document.querySelectorAll('.tab-btn');
  const activateTab = (tab) => {
    tabButtons.forEach(btn => {
      const active = btn.dataset.tab === tab;
      btn.setAttribute('aria-selected', String(active));
      btn.classList.toggle('text-white', active);
      btn.classList.toggle('text-neutral-400', !active);
      btn.querySelector(':scope::after');
      // Underline via ::after ist via Tailwind gesteuert
      btn.style.setProperty('--_ub', active ? '#fd4500' : 'transparent');
      // Wir setzen die Bottom-Border direkt am Button
      btn.style.boxShadow = active ? 'inset 0 -2px 0 0 #fd4500' : 'none';
    });
    // Views togglen
    if (tab === 'vehicles') {
      listView.classList.remove('hidden');
      apptsView.classList.add('hidden');
      formView.classList.add('hidden');
      renderList();
    } else {
      listView.classList.add('hidden');
      formView.classList.add('hidden');
      apptsView.classList.remove('hidden');
      renderAdminCalendar();
      renderInbox();
    }
  };
  tabButtons.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));

  // Kalender im Admin
  let adminWeekOffset = 0;
  const renderAdminCalendar = () => {
    const start = startOfWeek(adminWeekOffset);
    const days = [...Array(5)].map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return { date: isoDate(d), day: d.getDate(), month: d.getMonth() };
    });
    const first = days[0], last = days[4];
    const weekLabel = first.month === last.month
      ? `${first.day}. – ${last.day}. ${MONTHS[first.month]}`
      : `${first.day}. ${MONTHS[first.month]} – ${last.day}. ${MONTHS[last.month]}`;

    const blocks = getBlocks();
    const appts = getAppts();
    const isBlocked = (date, time) => blocks.some(b => b.date === date && b.time === time);
    const confirmedAppt = (date, time) => appts.find(a => a.date === date && a.time === time && a.status === 'confirmed');

    let html = `
      <div class="flex items-center justify-between mb-6">
        <p class="font-display uppercase text-xl">${weekLabel}</p>
        <p class="text-xs text-neutral-500">Klick = sperren / freigeben</p>
      </div>
      <div class="grid gap-3 sm:grid-cols-5">
    `;
    days.forEach((d, i) => {
      const today = isToday(d.date);
      html += `
        <div class="rounded-xl border ${today ? 'border-brand-500/50 bg-brand-500/5' : 'border-white/10 bg-ink-900'} p-3">
          <p class="text-[10px] uppercase tracking-widest text-neutral-400">${DAY_NAMES[i]}</p>
          <p class="mt-0.5 font-display text-xl ${today ? 'text-brand-500' : 'text-white'}">${d.day}.${pad(d.month + 1)}</p>
          <div class="mt-3 space-y-1.5">
      `;
      SLOTS.forEach(slot => {
        const past = isPast(d.date, slot);
        const blocked = isBlocked(d.date, slot);
        const appt = confirmedAppt(d.date, slot);
        if (past) {
          html += `<div class="rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5 text-[11px] text-neutral-600 line-through cursor-not-allowed">${slot}</div>`;
        } else if (appt) {
          html += `<div class="rounded-md border border-blue-500/40 bg-blue-500/15 px-2 py-1.5 text-[11px] text-blue-200 cursor-not-allowed" title="Bestätigter Termin: ${escape(appt.name)}">${slot} · ${escape(appt.name.split(' ')[0])}</div>`;
        } else if (blocked) {
          html += `<button type="button" data-toggle-slot="${d.date}|${slot}" class="w-full text-left rounded-md border border-red-500/40 bg-red-500/15 hover:bg-red-500/25 px-2 py-1.5 text-[11px] text-red-200 font-semibold transition">${slot} · gesperrt</button>`;
        } else {
          html += `<button type="button" data-toggle-slot="${d.date}|${slot}" class="w-full text-left rounded-md border border-brand-500/30 bg-brand-500/5 hover:bg-brand-500/20 px-2 py-1.5 text-[11px] text-brand-200 font-semibold transition">${slot} · frei</button>`;
        }
      });
      html += `</div></div>`;
    });
    html += `</div>`;
    adminCalendar.innerHTML = html;

    adminCalendar.querySelectorAll('[data-toggle-slot]').forEach(btn => {
      btn.addEventListener('click', () => {
        const [date, time] = btn.dataset.toggleSlot.split('|');
        const list = getBlocks();
        const idx = list.findIndex(b => b.date === date && b.time === time);
        if (idx >= 0) list.splice(idx, 1);
        else list.push({ date, time });
        setBlocks(list);
        renderAdminCalendar();
      });
    });
  };

  // Woche navigieren
  document.querySelectorAll('[data-week-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.weekNav;
      if (val === '0') adminWeekOffset = 0;
      else adminWeekOffset = Math.max(0, Math.min(3, adminWeekOffset + Number(val)));
      renderAdminCalendar();
    });
  });

  // Inbox
  let inboxFilter = 'all';
  const renderInbox = () => {
    const list = getAppts().sort((a, b) => b.createdAt - a.createdAt);
    const filtered = list.filter(a => inboxFilter === 'all' ? true : a.status === inboxFilter);

    const pending = list.filter(a => a.status === 'pending').length;
    if (pendingBadge) {
      pendingBadge.textContent = pending;
      pendingBadge.classList.toggle('hidden', pending === 0);
    }

    if (filtered.length === 0) {
      inboxList.innerHTML = `<div class="rounded-2xl border border-white/10 bg-ink-800 p-8 text-center text-neutral-400">Keine Anfragen in dieser Ansicht.</div>`;
      return;
    }

    inboxList.innerHTML = filtered.map(a => {
      const statusLabel = {
        pending: '<span class="rounded-full bg-yellow-500/15 border border-yellow-500/40 text-yellow-300 px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-bold">Ausstehend</span>',
        confirmed: '<span class="rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-bold">Bestätigt</span>',
        declined: '<span class="rounded-full bg-red-500/15 border border-red-500/40 text-red-300 px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-bold">Abgelehnt</span>',
      }[a.status];
      const when = new Date(a.date + 'T' + a.time).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' });
      const buttons = a.status === 'pending'
        ? `<div class="flex gap-2">
            <button type="button" data-appt-action="confirm" data-appt-id="${a.id}" class="rounded-md bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-1.5 text-xs font-bold transition">Bestätigen</button>
            <button type="button" data-appt-action="decline" data-appt-id="${a.id}" class="rounded-md bg-white/10 hover:bg-red-500/25 border border-white/10 hover:border-red-500/40 text-neutral-300 hover:text-red-200 px-3 py-1.5 text-xs font-semibold transition">Ablehnen</button>
           </div>`
        : `<button type="button" data-appt-action="reset" data-appt-id="${a.id}" class="rounded-md bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-semibold transition">Zurücksetzen</button>`;

      return `
        <article class="rounded-2xl border border-white/10 bg-ink-800 p-5">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                ${statusLabel}
                <span class="text-xs text-neutral-500">Anfrage #${a.id}</span>
              </div>
              <h3 class="mt-2 font-display uppercase text-xl">${escape(a.service)}</h3>
              <p class="mt-1 text-sm text-neutral-300">📅 <strong class="text-white">${when}</strong></p>
              <p class="mt-3 text-sm text-neutral-300">
                👤 <strong class="text-white">${escape(a.name)}</strong><br />
                <a href="mailto:${escape(a.email)}" class="text-brand-500 hover:underline">${escape(a.email)}</a>
                ${a.phone ? `· <a href="tel:${escape(a.phone)}" class="text-brand-500 hover:underline">${escape(a.phone)}</a>` : ''}
              </p>
              ${a.message ? `<p class="mt-3 text-sm text-neutral-400 italic bg-ink-900 border border-white/5 rounded-lg px-3 py-2">„${escape(a.message)}"</p>` : ''}
            </div>
            ${buttons}
          </div>
        </article>
      `;
    }).join('');

    inboxList.querySelectorAll('[data-appt-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.apptId);
        const action = btn.dataset.apptAction;
        const list = getAppts();
        const a = list.find(x => x.id === id);
        if (!a) return;
        if (action === 'confirm') a.status = 'confirmed';
        else if (action === 'decline') a.status = 'declined';
        else if (action === 'reset') a.status = 'pending';
        setAppts(list);
        renderInbox();
        renderAdminCalendar();
      });
    });
  };

  document.querySelectorAll('.inbox-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      inboxFilter = btn.dataset.inboxFilter;
      document.querySelectorAll('.inbox-filter').forEach(b => {
        const active = b === btn;
        b.classList.toggle('bg-white/10', active);
        b.classList.toggle('bg-white/5', !active);
        b.classList.toggle('text-white', active);
        b.classList.toggle('text-neutral-400', !active);
      });
      renderInbox();
    });
  });

  // Pending-Badge initial anzeigen (auch wenn Termine-Tab noch nicht offen)
  const updatePendingBadge = () => {
    const pending = getAppts().filter(a => a.status === 'pending').length;
    if (pendingBadge) {
      pendingBadge.textContent = pending;
      pendingBadge.classList.toggle('hidden', pending === 0);
    }
  };
  updatePendingBadge();
})();
