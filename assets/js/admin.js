// Admin-Panel für Fahrzeug-Verwaltung (Demo-Modus mit localStorage)
(() => {
  'use strict';

  const DEMO_PASSWORD = 'demo';
  const AUTH_KEY = 'koberstein_admin_auth';
  const STORAGE_KEY = 'koberstein_vehicles_custom';
  const IMG_STORAGE_KEY = 'koberstein_vehicles_images';

  const loginView = document.getElementById('login-view');
  const adminView = document.getElementById('admin-view');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');

  const listView = document.getElementById('list-view');
  const formView = document.getElementById('form-view');
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
})();
