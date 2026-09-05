/* =====================================================================
   Genera i dati strutturati del menù (schema.org) e li scrive dentro
   index.html e index-en.html.

   Perché uno script invece di scriverli a mano: i piatti e i prezzi
   stanno gia' in menu.js. Copiarli a mano nello schema vorrebbe dire
   averli in due posti, e prima o poi i due posti divergono — con il
   rischio peggiore, cioe' Google che mostra un prezzo vecchio.
   Qui lo schema viene ricalcolato dagli stessi dati.

   COME SI USA (solo quando cambia il menù):
       node build/genera-schema.js
   poi ricarica index.html e index-en.html sul server.

   Serve Node.js installato sul computer. Non serve sul server:
   il risultato e' HTML statico.
   ===================================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RADICE = path.join(__dirname, '..');
const SITO = 'https://cedrodellibano-savona.com/';

/* --- 1. leggo i dati eseguendo menu.js in una finestra finta ---------- */

function caricaDati(lang) {
  const codice = fs.readFileSync(path.join(RADICE, 'menu.js'), 'utf8');
  const finta = {
    window: {},
    document: {
      documentElement: { getAttribute: () => lang },
      createElement: () => ({ style: {}, appendChild() {}, setAttribute() {} })
    }
  };
  finta.window.document = finta.document;
  vm.createContext(finta);
  vm.runInContext(codice, finta);
  return finta.window.CDLMenu;
}

/* --- 2. dal prezzo scritto per gli occhi al numero per la macchina ---- */

function numero(prezzo) {
  // '12,00 €' -> '12.00'   |   '25 €' -> '25'
  const m = String(prezzo).replace(/\s/g, '').match(/([\d.,]+)/);
  if (!m) return null;
  return m[1].replace(/\./g, '').replace(',', '.');
}

/* --- 3. costruisco il Menu ------------------------------------------- */

function costruisciMenu(cdl, lang) {
  const T = cdl.parola;
  const d = cdl.dati;

  const sezioni = [];

  // à la carte: un MenuSection per gruppo
  d.CARTE.forEach(function (gruppo) {
    sezioni.push({
      '@type': 'MenuSection',
      name: T(gruppo.title),
      hasMenuItem: gruppo.items.map(function (it) {
        const voce = { '@type': 'MenuItem', name: T(it.n) };
        if (it.d) voce.description = T(it.d);

        const p = numero(it.prices[0].value);
        if (p) {
          voce.offers = { '@type': 'Offer', price: p, priceCurrency: 'EUR' };
        }

        // le etichette che lo standard prevede davvero
        const etichette = (it.t || []).map(function (x) { return x.cls; }).join(' ');
        const restr = [];
        if (etichette.includes('tag--vegan')) restr.push('https://schema.org/VeganDiet');
        if (etichette.includes('tag--veg')) restr.push('https://schema.org/VegetarianDiet');
        if (restr.length) voce.suitableForDiet = restr.length === 1 ? restr[0] : restr;

        return voce;
      })
    });
  });

  // menù fissi: ognuno una voce con il suo prezzo
  sezioni.push({
    '@type': 'MenuSection',
    name: lang === 'en' ? 'Set menus' : 'Menù fissi',
    hasMenuItem: d.FISSI.map(function (c) {
      const voce = { '@type': 'MenuItem', name: T(c.title), description: T(c.kicker) };
      const p = numero(c.price);
      if (p) voce.offers = { '@type': 'Offer', price: p, priceCurrency: 'EUR' };
      const etichette = (c.t || []).map(function (x) { return x.cls; }).join(' ');
      const restr = [];
      if (etichette.includes('tag--vegan')) restr.push('https://schema.org/VeganDiet');
      if (etichette.includes('tag--veg')) restr.push('https://schema.org/VegetarianDiet');
      if (restr.length) voce.suitableForDiet = restr.length === 1 ? restr[0] : restr;
      return voce;
    })
  });

  // vini: prezzo della bottiglia
  sezioni.push({
    '@type': 'MenuSection',
    name: lang === 'en' ? 'Lebanese wines' : 'Vini libanesi',
    hasMenuItem: d.VINI.map(function (w) {
      const voce = {
        '@type': 'MenuItem',
        name: w.cantina + ' — ' + w.name,
        description: T(w.blend)
      };
      const bottiglia = w.prices[0];
      const p = numero(bottiglia.value);
      if (p) voce.offers = { '@type': 'Offer', price: p, priceCurrency: 'EUR' };
      return voce;
    })
  });

  return {
    '@type': 'Menu',
    name: lang === 'en' ? 'Cedro del Libano — menu' : 'Cedro del Libano — il menù',
    inLanguage: lang,
    url: SITO + (lang === 'en' ? 'index-en.html#menu' : '#menu'),
    hasMenuSection: sezioni
  };
}

/* --- 4. servizi del locale, nel campo previsto ------------------------ */

const SERVIZI = {
  it: ['Prenotazione tavoli', 'Consegna a domicilio', 'Posti all\'aperto', 'Wi-Fi',
       'Pagamento con carta', 'Accesso per sedie a rotelle'],
  en: ['Table booking', 'Home delivery', 'Outdoor seating', 'Wi-Fi',
       'Card payment', 'Wheelchair access']
};

/* --- 5. riscrivo il blocco dentro le due pagine ----------------------- */

let totali = 0;

[['index.html', 'it'], ['index-en.html', 'en']].forEach(function (coppia) {
  const file = coppia[0], lang = coppia[1];
  const percorso = path.join(RADICE, file);
  let html = fs.readFileSync(percorso, 'utf8');

  const inizio = html.indexOf('<script type="application/ld+json">');
  const fine = html.indexOf('</script>', inizio);
  if (inizio === -1 || fine === -1) throw new Error('blocco dati strutturati non trovato in ' + file);

  const grezzo = html.slice(inizio + '<script type="application/ld+json">'.length, fine);
  const dati = JSON.parse(grezzo);

  const cdl = caricaDati(lang);
  dati.hasMenu = costruisciMenu(cdl, lang);

  dati.amenityFeature = SERVIZI[lang].map(function (nome) {
    return { '@type': 'LocationFeatureSpecification', name: nome, value: true };
  });

  dati.potentialAction = {
    '@type': 'OrderAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://deliveroo.it/it/menu/savona/savona/cedro',
      inLanguage: 'it',
      actionPlatform: [
        'https://schema.org/DesktopWebPlatform',
        'https://schema.org/IOSPlatform',
        'https://schema.org/AndroidPlatform'
      ]
    },
    deliveryMethod: 'https://schema.org/OnSitePickup'
  };

  const nuovo = '<script type="application/ld+json">\n' + JSON.stringify(dati) + '\n</script>';
  html = html.slice(0, inizio) + nuovo + html.slice(fine + '</script>'.length);
  fs.writeFileSync(percorso, html);

  const voci = dati.hasMenu.hasMenuSection.reduce(function (n, s) { return n + s.hasMenuItem.length; }, 0);
  const peso = Buffer.byteLength(JSON.stringify(dati));
  console.log(file.padEnd(16) + dati.hasMenu.hasMenuSection.length + ' sezioni · ' +
              voci + ' voci · ' + Math.round(peso / 1024) + ' KB di dati strutturati');
  totali += voci;
});

console.log('\nFatto. ' + totali + ' voci di menù dichiarate a Google, in due lingue.');
