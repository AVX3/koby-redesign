// Werkstatt-Terminkalender
(() => {
  'use strict';
  const root = document.getElementById('calendar');
  if (!root) return;

  const SLOTS = ['08:00', '10:00', '13:30', '15:30'];
  const SERVICE_DEFAULT = 'Wartung / Inspektion';
  const DAY_NAMES = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
  const MONTHS = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

  const state = {
    weekOffset: 0,
    service: SERVICE_DEFAULT,
  };

  // Deterministischer "Zufalls"-Wert je Slot → gleiche Belegung bei jedem Aufruf
  const hash = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = ((h << 5) - h + str.charCodeAt(i)) | 0; }
    return Math.abs(h);
  };

  const startOfWeek = (offset = 0) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const day = d.getDay(); // 0=So..6=Sa
    const diff = (day === 0 ? -6 : 1 - day); // auf Montag
    d.setDate(d.getDate() + diff + offset * 7);
    return d;
  };

  const fmtDay = (d) => d.getDate().toString().padStart(2, '0');
  const fmtMonth = (d) => (d.getMonth() + 1).toString().padStart(2, '0');
  const isoDate = (d) => `${d.getFullYear()}-${fmtMonth(d)}-${fmtDay(d)}`;
  const isPast = (d, slot) => {
    const [h, m] = slot.split(':').map(Number);
    const dt = new Date(d);
    dt.setHours(h, m, 0, 0);
    return dt.getTime() < Date.now();
  };
  const isToday = (d) => {
    const t = new Date(); t.setHours(0,0,0,0);
    return d.getTime() === t.getTime();
  };

  const isSlotBooked = (d, slot) => {
    // Deterministisch: ~40 % belegt
    return hash(`${isoDate(d)}_${slot}_${state.service}`) % 10 < 4;
  };

  const render = () => {
    const start = startOfWeek(state.weekOffset);
    const days = [...Array(5)].map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
    const firstDay = days[0];
    const lastDay = days[4];
    const weekLabel = firstDay.getMonth() === lastDay.getMonth()
      ? `${firstDay.getDate()}. – ${lastDay.getDate()}. ${MONTHS[firstDay.getMonth()]} ${firstDay.getFullYear()}`
      : `${firstDay.getDate()}. ${MONTHS[firstDay.getMonth()]} – ${lastDay.getDate()}. ${MONTHS[lastDay.getMonth()]} ${firstDay.getFullYear()}`;

    const availableCount = days.reduce((sum, d) => {
      return sum + SLOTS.filter(s => !isSlotBooked(d, s) && !isPast(d, s)).length;
    }, 0);

    let html = `
      <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-brand-500">Kalenderwoche</p>
          <p class="mt-1 font-display uppercase text-2xl">${weekLabel}</p>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" data-nav="-1" ${state.weekOffset === 0 ? 'disabled' : ''} aria-label="Vorherige Woche" class="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-white/10 bg-ink-800 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button type="button" data-nav="0" class="rounded-lg border border-white/10 bg-ink-800 hover:bg-white/10 h-10 px-4 text-sm font-semibold transition">Heute</button>
          <button type="button" data-nav="+1" ${state.weekOffset >= 3 ? 'disabled' : ''} aria-label="Nächste Woche" class="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-white/10 bg-ink-800 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>

      <div class="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span class="text-neutral-400">Klicken Sie auf einen freien Slot, um ihn anzufragen.</span>
        <span class="text-white font-semibold">${availableCount} freie Slots diese Woche</span>
      </div>

      <div class="grid gap-3 sm:grid-cols-5">
    `;

    days.forEach((d, i) => {
      const today = isToday(d);
      html += `
        <div class="rounded-2xl border ${today ? 'border-brand-500/50 bg-brand-500/5' : 'border-white/10 bg-ink-800'} p-4">
          <p class="text-xs uppercase tracking-widest text-neutral-400">${DAY_NAMES[i]}</p>
          <p class="mt-0.5 font-display text-2xl ${today ? 'text-brand-500' : 'text-white'}">${fmtDay(d)}.${fmtMonth(d)}</p>
          <div class="mt-4 space-y-2">
      `;
      const freeSlots = SLOTS.filter(s => !isPast(d, s) && !isSlotBooked(d, s));
      if (freeSlots.length === 0) {
        html += `<p class="text-xs text-neutral-500 italic pt-1">Keine freien Slots</p>`;
      } else {
        freeSlots.forEach(slot => {
          const href = `kontakt.html?termin=${encodeURIComponent(isoDate(d) + ' ' + slot)}&leistung=${encodeURIComponent(state.service)}#formular`;
          html += `<a href="${href}" class="block rounded-md border border-brand-500/40 bg-brand-500/10 hover:bg-brand-500 hover:text-black text-brand-300 px-2.5 py-1.5 text-xs font-semibold transition">${slot}</a>`;
        });
      }
      html += `</div></div>`;
    });

    html += `</div>`;
    root.innerHTML = html;

    root.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.nav;
        if (val === '0') state.weekOffset = 0;
        else state.weekOffset = Math.max(0, Math.min(3, state.weekOffset + Number(val)));
        render();
      });
    });
  };

  const svc = document.getElementById('cal-service');
  if (svc) svc.addEventListener('change', () => { state.service = svc.value; render(); });

  // Leistungs-Karten → Service im Dropdown vorauswählen
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      const service = card.dataset.service;
      if (!svc || !service) return;
      // Wert nur setzen, wenn er in den Optionen existiert
      const opt = Array.from(svc.options).find(o => o.value === service || o.text === service);
      if (opt) {
        svc.value = opt.value;
        state.service = svc.value;
        render();
        // Kurzer Highlight-Effekt am Dropdown
        svc.classList.add('ring-2', 'ring-brand-500');
        setTimeout(() => svc.classList.remove('ring-2', 'ring-brand-500'), 1500);
      }
    });
  });

  // Falls die Seite mit Hash #kalender geladen wird und ein Service in der URL steht
  const urlParams = new URLSearchParams(location.search);
  const preselect = urlParams.get('leistung');
  if (preselect && svc) {
    const opt = Array.from(svc.options).find(o => o.value === preselect || o.text === preselect);
    if (opt) { svc.value = opt.value; state.service = svc.value; }
  }

  render();
})();
