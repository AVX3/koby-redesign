// Koberstein Automobile – lokale Vorschau
(() => {
  'use strict';

  // Copyright-Jahr
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile Navigation
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('hidden') === false;
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // Kontaktformular – Validierung + mailto-Fallback
  const form = document.getElementById('contact-form');
  if (!form) return;

  // URL-Parameter → Formular vorbelegen (Termin / Leistung / Fahrzeug)
  const params = new URLSearchParams(location.search);
  const termin = params.get('termin');
  const leistung = params.get('leistung');
  const fahrzeug = params.get('fahrzeug');
  const topicEl = document.getElementById('topic');
  const messageEl = document.getElementById('message');

  const scrollToForm = () => {
    const target = document.getElementById('formular');
    if (!target) return;
    // Sticky-Header (h-20 = 80px) berücksichtigen
    const headerOffset = 96;
    const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    // Nach dem nächsten Paint scrollen (nachdem Hint eingefügt wurde)
    requestAnimationFrame(() => {
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Fokus auf das erste leere Feld setzen
      const nameEl = document.getElementById('name');
      if (nameEl && !nameEl.value) setTimeout(() => nameEl.focus({ preventScroll: true }), 500);
    });
  };

  if (termin && topicEl) {
    topicEl.value = 'Werkstatt-Termin';
    if (messageEl) {
      messageEl.value =
        `Ich möchte einen Werkstatt-Termin anfragen:\n\n` +
        `Wunschtermin: ${termin}\n` +
        (leistung ? `Leistung: ${leistung}\n` : '') +
        `\nBitte um kurze Bestätigung. Danke!`;
    }
    const hint = document.createElement('div');
    hint.className = 'rounded-lg bg-brand-500/10 border border-brand-500/30 px-4 py-3 text-sm text-brand-200';
    hint.setAttribute('role', 'status');
    hint.innerHTML = `Termin-Anfrage vorbereitet: <strong>${termin}</strong>${leistung ? ` · ${leistung}` : ''}. Bitte Formular prüfen und absenden.`;
    form.insertBefore(hint, form.firstChild);
    scrollToForm();
  } else if (fahrzeug && topicEl) {
    topicEl.value = 'Fahrzeug-Angebot';
    if (messageEl) {
      messageEl.value = `Interesse am Fahrzeug: ${fahrzeug}\n\nBitte um Kontaktaufnahme für Rückfragen / Besichtigung. Danke!`;
    }
    const hint = document.createElement('div');
    hint.className = 'rounded-lg bg-brand-500/10 border border-brand-500/30 px-4 py-3 text-sm text-brand-200';
    hint.setAttribute('role', 'status');
    hint.innerHTML = `Anfrage vorbereitet für: <strong>${fahrzeug}</strong>. Bitte Formular prüfen und absenden.`;
    form.insertBefore(hint, form.firstChild);
    scrollToForm();
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const showError = (id, msg) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
  };
  const clearError = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = '';
    el.classList.add('hidden');
  };

  ['name', 'email', 'message'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', () => clearError(`err-${id}`));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const topic = (data.get('topic') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    const privacy = form.querySelector('#privacy')?.checked;
    const honeypot = (data.get('website') || '').toString().trim();

    if (honeypot) return; // Bot

    let ok = true;
    if (name.length < 2) { showError('err-name', 'Bitte geben Sie Ihren Namen an.'); ok = false; }
    if (!emailRe.test(email)) { showError('err-email', 'Bitte eine gültige E-Mail-Adresse.'); ok = false; }
    if (message.length < 10) { showError('err-message', 'Bitte formulieren Sie Ihre Nachricht (min. 10 Zeichen).'); ok = false; }
    if (!privacy) { ok = false; alert('Bitte bestätigen Sie die Datenschutzerklärung.'); }
    if (!ok) return;

    const subject = `Anfrage: ${topic || 'Allgemein'} – ${name}`;
    const body =
`Name:    ${name}
E-Mail:  ${email}
Telefon: ${phone || '-'}
Betreff: ${topic}

${message}
`;
    const href = `mailto:info@autohaus-koberstein.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const ok2 = document.getElementById('form-success');
    if (ok2) ok2.classList.remove('hidden');
    window.location.href = href;
  });
})();
