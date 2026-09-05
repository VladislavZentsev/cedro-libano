/* Cedro del Libano — dati e rendering del menù */
(function () {
  'use strict';

  var TAG = {
    sesamo: { label: 'Contiene semi di sesamo', cls: 'tag tag--sesamo' },
    aglio:  { label: 'Senza aglio',             cls: 'tag tag--aglio' },
    vegetariano: { label: 'Vegetariano',        cls: 'tag tag--veg' },
    vegano: { label: 'Vegano',                  cls: 'tag tag--vegan' }
  };
  function t() { return Array.prototype.slice.call(arguments).map(function (k) { return TAG[k]; }); }
  function p(value, label) { return { value: value, label: label || '' }; }

  var CARTE = [
    { title: 'Secondi', items: [
      { n: 'Bocconcini di pollo', d: 'bocconcini di pollo marinato, cotto su spiedo alla brace', t: [], prices: [p('10,00 €')] },
      { n: 'Bocconcini di manzo', d: 'grigliata di bocconcini di manzo, cotto su spiedo alla brace', t: [], prices: [p('12,00 €')] },
      { n: 'Spiedini di manzo', d: 'spiedini di manzo cotti alla brace', t: [], prices: [p('12,00 €')] },
      { n: 'Focaccia alla libanese', d: 'con tritato di manzo, prezzemolo e menta', t: [], prices: [p('8,00 €')] },
      { n: 'Biryani di pollo', d: 'piatto pakistano, solo a pranzo: riso basmati cotto a strati con pollo marinato allo yogurt, cipolle fritte e spezie (garam masala, cardamomo, cannella, curcuma). Servito con salsa allo yogurt, insalata e sottaceti', t: [], prices: [p('12,00 €')] }
    ] },
    { title: 'Specialità — mezze', items: [
      { n: 'Hommos', d: "il piatto per eccellenza della cucina libanese, preparato con ceci e tahina, finito con uno spruzzo di limone e olio d'oliva extra", t: t('sesamo'), prices: [p('8,00 €')] },
      { n: 'Hommos ai pinoli', d: 'hommos finito con pinoli saltati in burro chiarificato', t: t('sesamo'), prices: [p('8,00 €')] },
      { n: 'Hommos al manzo', d: 'hommos finito con manzo e pinoli', t: t('sesamo'), prices: [p('12,00 €')] },
      { n: "Hommos all'agnello", d: 'hommos finito con confit di agnello e pinoli', t: t('sesamo'), prices: [p('11,00 €')] },
      { n: 'Hommos alla barbabietola', d: '', t: t('sesamo'), prices: [p('9,00 €')] },
      { n: 'Hommos di Beirut', d: 'hommos con cetrioli sotto sale e prezzemolo, finito con olio EVO e pinoli', t: t('sesamo'), prices: [p('9,00 €')] },
      { n: 'Baba ghannouj', d: 'melanzane cotte alla brace, miste con peperoni rossi, cipolla verde, prezzemolo e menta', t: [], prices: [p('9,00 €')] },
      { n: 'Mtabbal di melanzane grigliate', d: "melanzane cotte sulla brace, miste con tahina, olio d'oliva extra vergine e melograno fresco", t: [], prices: [p('9,00 €')] },
      { n: 'Mhammara di peperoni', d: 'salsa a base di peperoni rossi, melassa di melograno, cumino, olio EVO e noci', t: [], prices: [p('8,00 €')] },
      { n: 'Patate al coriandolo', d: 'patate saltate con aglio, peperoni e foglie di coriandolo verde', t: [], prices: [p('6,00 €')] },
      { n: 'Falafel', d: 'polpette di ceci, aromatizzate al coriandolo tostato e cumino', t: [], prices: [p('8,00 €')] },
      { n: "Wara' enab", d: 'involtini in foglie di vite farcite con riso, pomodoro, peperoni verdi e menta, con uno spruzzo di limone', t: [], prices: [p('9,00 €')] },
      { n: 'Fattoush', d: 'insalata con verdure fresche, melassa di melograno, pane libanese sbriciolato molto croccante', t: [], prices: [p('8,00 €')] }
    ] },
    { title: 'Bevande', items: [
      { n: 'Acqua naturale 1lt', d: '', t: [], prices: [p('2,50 €')] },
      { n: 'Acqua frizzante 1lt', d: '', t: [], prices: [p('2,50 €')] },
      { n: 'Coca Cola 33cl', d: '', t: [], prices: [p('2,50 €')] },
      { n: 'Coca Cola Zero 33cl', d: '', t: [], prices: [p('2,50 €')] },
      { n: 'Fanta 33cl', d: '', t: [], prices: [p('2,50 €')] },
      { n: 'Sprite 33cl', d: '', t: [], prices: [p('2,50 €')] }
    ] },
    { title: 'Birre', items: [
      { n: 'Almaza Birra Libanese Bionda', d: '4,2% vol. · 33cl', t: [], prices: [p('4,00 €')] },
      { n: 'Ichnusa non filtrata', d: '33cl', t: [], prices: [p('3,50 €')] },
      { n: 'Heineken Bionda', d: '5,0% vol. · 33cl', t: [], prices: [p('3,00 €')] },
      { n: 'Leffe Rouge', d: '6,6% vol. · leggermente speziata, con note di caramello', t: [], prices: [p('6,00 €', '33cl'), p('12,00 €', '75cl')] },
      { n: 'Leffe Blonde', d: '6,6% vol. · gradevole aroma di malto, sentori fruttati, speziati e di cereale', t: [], prices: [p('6,00 €', '33cl'), p('12,00 €', '75cl')] },
      { n: 'Leffe Ambrée', d: "6,6% vol. · aroma speziato con note tostate, luppolate e sentori di scorza d'arancia", t: [], prices: [p('6,00 €', '33cl'), p('12,00 €', '75cl')] },
      { n: 'Birra Nazionale', d: '6,5% vol. · 33cl · note speziate di blanche belga e di lager, nota rinfrescante quasi di champagne', t: [], prices: [p('8,00 €')] },
      { n: 'Blanche De Namur', d: "4,5% vol. · floreale e fruttata, sottili sentori di coriandolo e buccia d'arancia", t: [], prices: [p('7,00 €', '33cl'), p('14,00 €', '75cl')] },
      { n: 'Moretti La Rossa', d: '7,2% vol. · 33cl · morbida e piena, note di caramello e liquirizia', t: [], prices: [p('4,00 €')] },
      { n: 'La Chouffe Blonde', d: "8,0% vol. · 33cl · naso complesso, note di fiori, buccia d'arancia e coriandolo su base maltata", t: [], prices: [p('8,00 €')] }
    ] },
    { title: 'Dolci', items: [
      { n: 'Halawa con cacao in polvere', d: 'dolce morbido a base di tahina, ricoperto di cacao in polvere', t: t('sesamo', 'vegano'), prices: [p('6,00 €')] },
      { n: 'Halawa al pistacchio', d: 'lo stesso dolce di tahina, arricchito con pistacchi', t: t('sesamo', 'vegano'), prices: [p('6,00 €')] },
      { n: 'Baklava', d: 'sfoglie croccanti farcite con frutta secca e miele, profumate all\'acqua di rosa', t: [], prices: [p('6,00 €')] },
      { n: 'Tahina con melassa di carrube', d: 'crema di tahina servita con melassa di carrube e pane libanese fritto', t: t('sesamo', 'vegano'), prices: [p('6,00 €')] },
      { n: 'Assortimento di piccola pasticceria libanese', d: 'selezione di piccoli dolci della tradizione', t: [], prices: [p('6,00 €')] },
      { n: 'Assortimento di dolci vegani', d: 'selezione dei nostri dolci senza ingredienti di origine animale', t: t('vegano'), prices: [p('6,00 €')] },
      { n: 'Degustazione di dolci', d: 'un assaggio di più dolci, servito per la tavola', t: [], prices: [p('10,00 €', 'a persona')] }
    ] }
  ];

  var FISSI = [
    { title: 'Menu Completo', kicker: 'Antipasti, piatto, bevanda e dolce', price: '22 €', priceNote: '', t: [], note: 'Bevanda inclusa nel prezzo.', lines: [
      { k: 'Antipasti — mezze', v: 'Hummus, Baba Ghanoush, Muhammara, Tabbouleh, Foglie di Vite, Rapa Sottaceto, Pane Pita Arabo' },
      { k: 'Piatto principale', v: "Kafta Kebab — spiedini di carne macinata di manzo o vitello alla griglia, con pane pita, insalata fresca e salsa all'aglio" },
      { k: 'Bevanda', v: 'Vino Rosso della Casa oppure bevanda analcolica' },
      { k: 'Dolce', v: 'Baklava Libanese con pistacchio' }
    ] },
    { title: 'Set Menù Classico', kicker: 'Carne alla brace o pesce fresco', price: '25 €', priceNote: 'a persona', t: [], note: 'Bevande escluse: acqua, bibite e vino non inclusi.', lines: [
      { k: 'Un piatto a scelta a persona', v: 'Grigliata mista di carne alla brace oppure pesce fresco alla griglia o alla brace' },
      { k: 'Antipasti inclusi', v: "Hummus, Baba Ghanouj, Tabbouleh, Fattoush, Muhammara, Labneh, Olive miste, Verdure sott'olio, Pita libanese" }
    ] },
    { title: 'Set Menù Vegetariano', kicker: 'La stessa formula, senza carne', price: '25 €', priceNote: 'a persona', t: t('vegetariano'), note: 'Bevande escluse: acqua, bibite e vino non inclusi.', lines: [
      { k: 'Formula', v: 'La stessa struttura del Set Menù Classico, in versione vegetariana' },
      { k: 'Antipasti inclusi', v: "Hummus, Baba Ghanouj, Tabbouleh, Fattoush, Muhammara, Labneh, Olive miste, Verdure sott'olio, Pita libanese" }
    ] },
    { title: 'Set Menù Vegano', kicker: 'La stessa formula, tutto vegetale', price: '25 €', priceNote: 'a persona', t: t('vegano'), note: 'Bevande escluse: acqua, bibite e vino non inclusi.', lines: [
      { k: 'Formula', v: 'La stessa struttura del Set Menù Classico, in versione vegana' },
      { k: 'Antipasti inclusi', v: "Hummus, Baba Ghanouj, Tabbouleh, Fattoush, Muhammara, Olive miste, Verdure sott'olio, Pita libanese" }
    ] },
    { title: 'All You Can Eat', kicker: 'Prezzo fisso, degustazione libera', price: '25 €', priceNote: 'a persona', t: t('vegano', 'vegetariano'), note: 'La formula va ordinata da tutto il tavolo.', lines: [
      { k: 'Come funziona', v: 'Anche in versione vegana o vegetariana. Finito il menù degustazione, senza sprechi si potrà ordinare nuovamente i piatti graditi.' }
    ] },
    { title: 'Menu Six Palt', kicker: 'Tre combinazioni', price: '18 €', priceNote: 'da', t: [], note: '', lines: [], rows: [
      { n: 'Six Palt', p: '20 €' }, { n: 'Six Palt con Pollo', p: '20 €' }, { n: 'Six Palt + Fattoush', p: '18 €' }
    ] },
    { title: 'Combo con Fattoush', kicker: 'Insalata Fattoush + un piatto', price: '12 €', priceNote: 'da', t: t('aglio'), note: 'Hummus Pinoli e Vino è senza aglio.', lines: [], rows: [
      { n: '+ Vite', p: '15 €' }, { n: '+ Hummus Pinoli e Vino', p: '15 €' }, { n: '+ Moutabal', p: '12 €' },
      { n: '+ Babaganoush', p: '12 €' }, { n: '+ Muhammara', p: '12 €' }, { n: '+ Patate', p: '12 €' },
      { n: '+ Falafel', p: '14 €' }, { n: '+ Arais Vegana', p: '18 €' }, { n: '+ Chicken', p: '20 €' }
    ] },
    { title: 'Piatto Kofta', kicker: 'Carne macinata alla griglia', price: '18 €', priceNote: '', t: t('aglio'), note: '', lines: [
      { k: 'Il piatto', v: 'Carne macinata alla griglia con erbe e spezie libanesi' },
      { k: 'Incluso', v: '3 pezzi di Kofta (manzo o vitello), Hummus, Insalata Fattoush, Sottaceti di rapa, Pane Pita' }
    ] },
    { title: 'Menù bimbi', kicker: 'Un piatto a scelta, per i più piccoli', price: '12 €', priceNote: 'a persona', t: [], note: 'Ingredienti e allergeni sono elencati nel menù alla carta.', lines: [], rows: [
      { n: 'Spiedino di carne kafta (manzo)', p: 'con patate e insalata' },
      { n: 'Spiedino di pollo', p: 'con patate e insalata' },
      { n: 'Spiedino di carne di manzo', p: 'con patate e insalata' },
      { n: 'Nuggets di pollo', p: 'con patatine fritte' }
    ] }
  ];

  var VINI = [
    { name: 'Reserve du Couvent 2020', cantina: 'Ksara', type: 'Rosso', img: 'img/vino-1',
      alt: 'Bottiglia di Ksara Reserve du Couvent 2020 con calice',
      blend: 'Syrah 40% · Cabernet Franc 30% · Cabernet Sauvignon 30% — Valle della Bekaa, Libano · 13,5% vol.',
      prices: [p('26 €', 'bottiglia'), p('7 €', 'calice')],
      notes: 'Elegante e complesso, da Château Ksara, la cantina più antica del Libano. Note di frutti rossi e neri, spezie, tabacco e un tocco di rovere.',
      pairing: 'Carni rosse, agnello, selvaggina e formaggi stagionati.', legal: 'Contiene solfiti.' },
    { name: 'Le Prieuré 2020', cantina: 'Ksara', type: 'Rosso', img: 'img/vino-2',
      alt: 'Bottiglia di Ksara Le Prieuré 2020',
      blend: 'Cinsault 30% · Carignan 30% · Mourvèdre 20% · Grenache 20% — Valle di Bekaa, Libano · 13,5% vol.',
      prices: [p('24 €', 'bottiglia'), p('7 €', 'calice')],
      notes: 'Rubino intenso con riflessi violacei, frutti rossi maturi e note di legno. Gusto pieno e vellutato, con finale persistente.',
      pairing: '', legal: 'Contiene solfiti.' },
    { name: 'Blanc Perle 2022', cantina: 'Cave Kouroum', type: 'Bianco', img: 'img/vino-3',
      alt: 'Bottiglia di Cave Kouroum Blanc Perle 2022',
      blend: '100% Chardonnay — prodotto in Libano',
      prices: [p('22 €', 'bottiglia')],
      notes: 'Chardonnay in purezza dal Libano.',
      pairing: '', legal: 'Contiene solfiti (E220). Bevi responsabilmente (18+).' },
    { name: 'Sunset Rosé 2023', cantina: 'Château Ksara', type: 'Rosato', img: 'img/vino-4',
      alt: 'Bottiglia di Château Ksara Sunset Rosé 2023 con calice',
      blend: 'Cabernet Franc · Syrah — Valle della Bekaa, Libano · 13,5% vol.',
      prices: [p('22 €', 'bottiglia'), p('6 €', 'calice')],
      notes: 'Rosa brillante con riflessi ramati. Profumi di fragola, lampone, ciliegia e petali di rosa; al palato fresco e armonioso, con finale fruttato.',
      pairing: 'Mezze, hummus, tabbouleh, carni bianche, pesce e cucina speziata.', legal: 'Contiene solfiti.' },
    { name: 'Blanc de Blancs 2022', cantina: 'Château Ksara', type: 'Bianco', img: 'img/vino-5',
      alt: 'Bottiglia di Château Ksara Blanc de Blancs 2022 con calice',
      blend: 'Sauvignon 50% · Chardonnay 25% · Semillon 25% — Valle della Bekaa, Libano · 13% vol.',
      prices: [p('22 €', 'bottiglia'), p('6 €', 'calice')],
      notes: 'Giallo paglierino con riflessi dorati. Fiori bianchi, agrumi e frutta esotica, con leggere note minerali; fresco ed elegante, di buona acidità.',
      pairing: '', legal: 'Contiene solfiti.' },
    { name: 'Petit Noir 2016', cantina: 'Cave Kouroum', type: 'Rosso', img: 'img/vino-6',
      alt: 'Bottiglia di Cave Kouroum Petit Noir 2016 con calice',
      blend: 'Syrah 30% · Cabernet Sauvignon 20% · Carignan 20% · Grenache 20% · Cinsault 10% — Valle della Bekaa, Libano · 13,5% vol.',
      prices: [p('25 €', 'bottiglia'), p('7 €', 'calice')],
      notes: 'Rosso rubino intenso con riflessi granati. Fragolina di bosco e ciliegia, note speziate e leggeri sentori di legno; morbido, equilibrato e persistente.',
      pairing: '', legal: 'Contiene solfiti.' }
  ];


  /* ===== Traduzione inglese ==========================================
     I dati (prezzi, struttura del menu) stanno una volta sola qui sopra.
     Qui sotto c'e' solo il testo tradotto: la pagina inglese usa lo
     stesso menu.js, quindi un prezzo corretto una volta si aggiorna da
     solo in tutte e due le lingue. Se una frase non e' in questo elenco,
     resta in italiano — e si vede subito, cosi' e' facile accorgersene. */
  var LINGUA = (document.documentElement.getAttribute('lang') || 'it').slice(0, 2);
  var TRAD = {
  "Contiene semi di sesamo": "Contains sesame seeds",
  "Senza aglio": "Garlic free",
  "Vegetariano": "Vegetarian",
  "Vegano": "Vegan",
  "a persona": "per person",
  "bottiglia": "bottle",
  "calice": "glass",
  "da": "from",
  "piatti": "dishes",

  "Secondi": "Mains",
  "Specialità — mezze": "Specialities — mezze",
  "Bevande": "Soft drinks",
  "Birre": "Beers",
  "Dolci": "Desserts",

  "Bocconcini di pollo": "Chicken pieces",
  "bocconcini di pollo marinato, cotto su spiedo alla brace": "marinated chicken, cooked on the skewer over charcoal",
  "Bocconcini di manzo": "Beef pieces",
  "grigliata di bocconcini di manzo, cotto su spiedo alla brace": "grilled beef pieces, cooked on the skewer over charcoal",
  "Spiedini di manzo": "Beef skewers",
  "spiedini di manzo cotti alla brace": "beef skewers cooked over charcoal",
  "Focaccia alla libanese": "Lebanese flatbread",
  "con tritato di manzo, prezzemolo e menta": "with minced beef, parsley and mint",
  "Biryani di pollo": "Chicken biryani",
  "piatto pakistano, solo a pranzo: riso basmati cotto a strati con pollo marinato allo yogurt, cipolle fritte e spezie (garam masala, cardamomo, cannella, curcuma). Servito con salsa allo yogurt, insalata e sottaceti": "Pakistani dish, lunchtime only: basmati rice layered with yoghurt-marinated chicken, fried onions and spices (garam masala, cardamom, cinnamon, turmeric). Served with yoghurt sauce, salad and pickles",

  "Hommos": "Hommos",
  "il piatto per eccellenza della cucina libanese, preparato con ceci e tahina, finito con uno spruzzo di limone e olio d'oliva extra": "the dish Lebanese cooking is built on: chickpeas and tahini, finished with a squeeze of lemon and extra virgin olive oil",
  "Hommos ai pinoli": "Hommos with pine nuts",
  "hommos finito con pinoli saltati in burro chiarificato": "hommos finished with pine nuts sautéed in clarified butter",
  "Hommos al manzo": "Hommos with beef",
  "hommos finito con manzo e pinoli": "hommos finished with beef and pine nuts",
  "Hommos all'agnello": "Hommos with lamb",
  "hommos finito con confit di agnello e pinoli": "hommos finished with lamb confit and pine nuts",
  "Hommos alla barbabietola": "Beetroot hommos",
  "Hommos di Beirut": "Beirut hommos",
  "hommos con cetrioli sotto sale e prezzemolo, finito con olio EVO e pinoli": "hommos with salted cucumbers and parsley, finished with olive oil and pine nuts",
  "Baba ghannouj": "Baba ghannouj",
  "melanzane cotte alla brace, miste con peperoni rossi, cipolla verde, prezzemolo e menta": "charcoal-cooked aubergine with red pepper, spring onion, parsley and mint",
  "Mtabbal di melanzane grigliate": "Mtabbal — grilled aubergine",
  "melanzane cotte sulla brace, miste con tahina, olio d'oliva extra vergine e melograno fresco": "charcoal-cooked aubergine with tahini, extra virgin olive oil and fresh pomegranate",
  "Mhammara di peperoni": "Mhammara — red pepper",
  "salsa a base di peperoni rossi, melassa di melograno, cumino, olio EVO e noci": "red pepper dip with pomegranate molasses, cumin, olive oil and walnuts",
  "Patate al coriandolo": "Coriander potatoes",
  "patate saltate con aglio, peperoni e foglie di coriandolo verde": "potatoes sautéed with garlic, peppers and fresh coriander",
  "Falafel": "Falafel",
  "polpette di ceci, aromatizzate al coriandolo tostato e cumino": "chickpea fritters with toasted coriander and cumin",
  "Wara' enab": "Wara' enab",
  "involtini in foglie di vite farcite con riso, pomodoro, peperoni verdi e menta, con uno spruzzo di limone": "vine leaves rolled around rice, tomato, green pepper and mint, with a squeeze of lemon",
  "Fattoush": "Fattoush",
  "insalata con verdure fresche, melassa di melograno, pane libanese sbriciolato molto croccante": "fresh vegetable salad with pomegranate molasses and crisp shards of Lebanese bread",

  "Acqua naturale 1lt": "Still water 1l",
  "Acqua frizzante 1lt": "Sparkling water 1l",

  "Almaza Birra Libanese Bionda": "Almaza — Lebanese lager",
  "4,2% vol. · 33cl": "4.2% vol. · 33cl",
  "Ichnusa non filtrata": "Ichnusa unfiltered",
  "Heineken Bionda": "Heineken lager",
  "5,0% vol. · 33cl": "5.0% vol. · 33cl",
  "6,6% vol. · leggermente speziata, con note di caramello": "6.6% vol. · lightly spiced, with caramel notes",
  "6,6% vol. · gradevole aroma di malto, sentori fruttati, speziati e di cereale": "6.6% vol. · malty nose, with fruit, spice and cereal",
  "6,6% vol. · aroma speziato con note tostate, luppolate e sentori di scorza d'arancia": "6.6% vol. · spiced and toasty, with hops and orange peel",
  "6,5% vol. · 33cl · note speziate di blanche belga e di lager, nota rinfrescante quasi di champagne": "6.5% vol. · 33cl · Belgian blanche spice over a lager base, almost champagne-like",
  "4,5% vol. · floreale e fruttata, sottili sentori di coriandolo e buccia d'arancia": "4.5% vol. · floral and fruity, with coriander and orange peel",
  "7,2% vol. · 33cl · morbida e piena, note di caramello e liquirizia": "7.2% vol. · 33cl · soft and full, caramel and liquorice",
  "8,0% vol. · 33cl · naso complesso, note di fiori, buccia d'arancia e coriandolo su base maltata": "8.0% vol. · 33cl · complex nose of flowers, orange peel and coriander over malt",

  "Halawa con cacao in polvere": "Halawa with cocoa powder",
  "dolce morbido a base di tahina, ricoperto di cacao in polvere": "soft tahini sweet, dusted with cocoa powder",
  "Halawa al pistacchio": "Pistachio halawa",
  "lo stesso dolce di tahina, arricchito con pistacchi": "the same tahini sweet, enriched with pistachios",
  "Baklava": "Baklava",
  "sfoglie croccanti farcite con frutta secca e miele, profumate all'acqua di rosa": "crisp filo layers with nuts and honey, scented with rose water",
  "Tahina con melassa di carrube": "Tahini with carob molasses",
  "crema di tahina servita con melassa di carrube e pane libanese fritto": "tahini cream served with carob molasses and fried Lebanese bread",
  "Assortimento di piccola pasticceria libanese": "Selection of small Lebanese pastries",
  "selezione di piccoli dolci della tradizione": "a selection of traditional little sweets",
  "Assortimento di dolci vegani": "Selection of vegan sweets",
  "selezione dei nostri dolci senza ingredienti di origine animale": "a selection of our sweets with no animal ingredients",
  "Degustazione di dolci": "Dessert tasting",
  "un assaggio di più dolci, servito per la tavola": "a taste of several sweets, served for the table",

  "Menu Completo": "Full Menu",
  "Antipasti, piatto, bevanda e dolce": "Starters, main, drink and dessert",
  "Bevanda inclusa nel prezzo.": "Drink included in the price.",
  "Antipasti — mezze": "Starters — mezze",
  "Hummus, Baba Ghanoush, Muhammara, Tabbouleh, Foglie di Vite, Rapa Sottaceto, Pane Pita Arabo": "Hummus, Baba Ghanoush, Muhammara, Tabbouleh, Vine Leaves, Pickled Turnip, Pita Bread",
  "Piatto principale": "Main course",
  "Kafta Kebab — spiedini di carne macinata di manzo o vitello alla griglia, con pane pita, insalata fresca e salsa all'aglio": "Kafta Kebab — grilled skewers of minced beef or veal, with pita bread, fresh salad and garlic sauce",
  "Bevanda": "Drink",
  "Vino Rosso della Casa oppure bevanda analcolica": "House red wine or a soft drink",
  "Dolce": "Dessert",
  "Baklava Libanese con pistacchio": "Lebanese baklava with pistachio",
  "Set Menù Classico": "Classic Set Menu",
  "Carne alla brace o pesce fresco": "Charcoal-grilled meat or fresh fish",
  "Bevande escluse: acqua, bibite e vino non inclusi.": "Drinks not included: water, soft drinks and wine are extra.",
  "Un piatto a scelta a persona": "One dish per person, your choice",
  "Grigliata mista di carne alla brace oppure pesce fresco alla griglia o alla brace": "Mixed charcoal grill, or fresh fish grilled or over charcoal",
  "Antipasti inclusi": "Starters included",
  "Hummus, Baba Ghanouj, Tabbouleh, Fattoush, Muhammara, Labneh, Olive miste, Verdure sott'olio, Pita libanese": "Hummus, Baba Ghanouj, Tabbouleh, Fattoush, Muhammara, Labneh, Mixed olives, Vegetables in oil, Lebanese pita",
  "Set Menù Vegetariano": "Vegetarian Set Menu",
  "La stessa formula, senza carne": "The same formula, without meat",
  "Formula": "How it works",
  "La stessa struttura del Set Menù Classico, in versione vegetariana": "The same structure as the Classic Set Menu, in a vegetarian version",
  "Set Menù Vegano": "Vegan Set Menu",
  "La stessa formula, tutto vegetale": "The same formula, entirely plant-based",
  "La stessa struttura del Set Menù Classico, in versione vegana": "The same structure as the Classic Set Menu, in a vegan version",
  "Hummus, Baba Ghanouj, Tabbouleh, Fattoush, Muhammara, Olive miste, Verdure sott'olio, Pita libanese": "Hummus, Baba Ghanouj, Tabbouleh, Fattoush, Muhammara, Mixed olives, Vegetables in oil, Lebanese pita",
  "All You Can Eat": "All You Can Eat",
  "Prezzo fisso, degustazione libera": "Fixed price, keep tasting",
  "La formula va ordinata da tutto il tavolo.": "The whole table has to order this formula.",
  "Come funziona": "How it works",
  "Anche in versione vegana o vegetariana. Finito il menù degustazione, senza sprechi si potrà ordinare nuovamente i piatti graditi.": "Available vegan or vegetarian too. Once the tasting menu is finished you can order again the dishes you liked — without waste.",
  "Menu Six Palt": "Six Palt Menu",
  "Tre combinazioni": "Three combinations",
  "Six Palt con Pollo": "Six Palt with Chicken",
  "Combo con Fattoush": "Fattoush Combo",
  "Insalata Fattoush + un piatto": "Fattoush salad + one dish",
  "Hummus Pinoli e Vino è senza aglio.": "Hummus with pine nuts and wine is garlic free.",
  "+ Vite": "+ Vine leaves",
  "+ Hummus Pinoli e Vino": "+ Hummus, pine nuts and wine",
  "+ Patate": "+ Potatoes",
  "+ Arais Vegana": "+ Vegan Arais",
  "Piatto Kofta": "Kofta Plate",
  "Carne macinata alla griglia": "Grilled minced meat",
  "Il piatto": "The dish",
  "Carne macinata alla griglia con erbe e spezie libanesi": "Grilled minced meat with Lebanese herbs and spices",
  "Incluso": "Included",
  "3 pezzi di Kofta (manzo o vitello), Hummus, Insalata Fattoush, Sottaceti di rapa, Pane Pita": "3 pieces of Kofta (beef or veal), Hummus, Fattoush salad, Pickled turnip, Pita bread",
  "Menù bimbi": "Children's Menu",
  "Un piatto a scelta, per i più piccoli": "One dish to choose, for younger guests",
  "Ingredienti e allergeni sono elencati nel menù alla carta.": "Ingredients and allergens are listed on the à la carte menu.",
  "Spiedino di carne kafta (manzo)": "Kafta beef skewer",
  "Spiedino di pollo": "Chicken skewer",
  "Spiedino di carne di manzo": "Beef skewer",
  "Nuggets di pollo": "Chicken nuggets",
  "con patate e insalata": "with potatoes and salad",
  "con patatine fritte": "with chips",

  "Rosso": "Red",
  "Bianco": "White",
  "Rosato": "Rosé",
  "Syrah 40% · Cabernet Franc 30% · Cabernet Sauvignon 30% — Valle della Bekaa, Libano · 13,5% vol.": "Syrah 40% · Cabernet Franc 30% · Cabernet Sauvignon 30% — Bekaa Valley, Lebanon · 13.5% vol.",
  "Elegante e complesso, da Château Ksara, la cantina più antica del Libano. Note di frutti rossi e neri, spezie, tabacco e un tocco di rovere.": "Elegant and complex, from Château Ksara, the oldest winery in Lebanon. Red and black fruit, spice, tobacco and a touch of oak.",
  "Carni rosse, agnello, selvaggina e formaggi stagionati.": "Red meat, lamb, game and aged cheeses.",
  "Cinsault 30% · Carignan 30% · Mourvèdre 20% · Grenache 20% — Valle di Bekaa, Libano · 13,5% vol.": "Cinsault 30% · Carignan 30% · Mourvèdre 20% · Grenache 20% — Bekaa Valley, Lebanon · 13.5% vol.",
  "Rubino intenso con riflessi violacei, frutti rossi maturi e note di legno. Gusto pieno e vellutato, con finale persistente.": "Deep ruby with violet glints, ripe red fruit and wood. Full and velvety, with a long finish.",
  "100% Chardonnay — prodotto in Libano": "100% Chardonnay — produced in Lebanon",
  "Chardonnay in purezza dal Libano.": "Single-varietal Chardonnay from Lebanon.",
  "Cabernet Franc · Syrah — Valle della Bekaa, Libano · 13,5% vol.": "Cabernet Franc · Syrah — Bekaa Valley, Lebanon · 13.5% vol.",
  "Rosa brillante con riflessi ramati. Profumi di fragola, lampone, ciliegia e petali di rosa; al palato fresco e armonioso, con finale fruttato.": "Bright pink with copper glints. Strawberry, raspberry, cherry and rose petal; fresh and harmonious, with a fruity finish.",
  "Mezze, hummus, tabbouleh, carni bianche, pesce e cucina speziata.": "Mezze, hummus, tabbouleh, white meat, fish and spiced dishes.",
  "Sauvignon 50% · Chardonnay 25% · Semillon 25% — Valle della Bekaa, Libano · 13% vol.": "Sauvignon 50% · Chardonnay 25% · Semillon 25% — Bekaa Valley, Lebanon · 13% vol.",
  "Giallo paglierino con riflessi dorati. Fiori bianchi, agrumi e frutta esotica, con leggere note minerali; fresco ed elegante, di buona acidità.": "Straw yellow with golden glints. White flowers, citrus and tropical fruit over light minerality; fresh and elegant, with good acidity.",
  "Syrah 30% · Cabernet Sauvignon 20% · Carignan 20% · Grenache 20% · Cinsault 10% — Valle della Bekaa, Libano · 13,5% vol.": "Syrah 30% · Cabernet Sauvignon 20% · Carignan 20% · Grenache 20% · Cinsault 10% — Bekaa Valley, Lebanon · 13.5% vol.",
  "Rosso rubino intenso con riflessi granati. Fragolina di bosco e ciliegia, note speziate e leggeri sentori di legno; morbido, equilibrato e persistente.": "Deep ruby with garnet glints. Wild strawberry and cherry, spice and light wood; soft, balanced and persistent.",
  "Contiene solfiti.": "Contains sulphites.",
  "Contiene solfiti (E220). Bevi responsabilmente (18+).": "Contains sulphites (E220). Please drink responsibly (18+).",

  "I menù fissi e le degustazioni si servono in sala. Sono pensati per il tavolo: si assaggia molto, si condivide tutto.": "Set menus and tasting menus are served in the dining room. They are built for the table: you taste a lot, you share everything.",
  "Abbinamenti": "Pairings",
  "Bevi responsabilmente. Vendita di alcolici vietata ai minori di 18 anni.": "Please drink responsibly. Alcohol is not sold to under-18s."
};
  function T(x) {
    if (LINGUA !== 'en' || !x) return x;
    return Object.prototype.hasOwnProperty.call(TRAD, x) ? TRAD[x] : x;
  }

  var SIZES = '(min-width: 1024px) 380px, 100vw';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function tags(list) {
    if (!list || !list.length) return '';
    return '<div class="tags">' + list.map(function (x) {
      return '<span class="' + x.cls + '">' + esc(T(x.label)) + '</span>';
    }).join('') + '</div>';
  }
  function pastiglie(prices) {
    return '<div class="prezzi">' + prices.map(function (x) {
      return '<div class="pastiglia">' + (x.label ? '<span class="pastiglia__lab">' + esc(T(x.label)) + '</span>' : '')
        + '<span class="pastiglia__val">' + esc(x.value) + '</span></div>';
    }).join('') + '</div>';
  }

  function renderCarte(host) {
    host.innerHTML = CARTE.map(function (g, i) {
      var items = g.items.map(function (it) {
        return '<div class="piatto">'
          + '<div class="piatto__testo">'
          + '<p class="piatto__nome">' + esc(T(it.n)) + '</p>'
          + (it.d ? '<p class="piatto__desc">' + esc(T(it.d)) + '</p>' : '')
          + tags(it.t)
          + '</div>' + pastiglie(it.prices) + '</div>';
      }).join('');
      var id = 'gruppo-' + i;
      return '<div class="gruppo">'
        + '<button type="button" class="gruppo__testa" aria-expanded="true" aria-controls="' + id + '">'
        + '<span class="gruppo__titolo">' + esc(T(g.title)) + '</span>'
        + '<span class="gruppo__filo"></span>'
        + '<span class="gruppo__conta">' + g.items.length + ' ' + T('piatti') + '</span>'
        + '<span class="gruppo__freccia" aria-hidden="true">▾</span>'
        + '</button>'
        + '<div class="gruppo__corpo" id="' + id + '">' + items + '</div>'
        + '</div>';
    }).join('');
  }

  function renderFissi(host) {
    host.innerHTML = '<p class="pannello__intro">' + esc(T('I menù fissi e le degustazioni si servono in sala. Sono pensati per il tavolo: si assaggia molto, si condivide tutto.')) + '</p>'
      + '<div class="griglia-carte">' + FISSI.map(function (c) {
        var lines = (c.lines || []).map(function (l) {
          return '<div class="riga-k"><span class="riga-k__k">' + esc(T(l.k)) + '</span><span class="riga-k__v">' + esc(T(l.v)) + '</span></div>';
        }).join('');
        var rows = (c.rows || []).map(function (r) {
          return '<div class="riga-p"><span>' + esc(T(r.n)) + '</span><span class="riga-p__filo"></span><span class="riga-p__prezzo">' + esc(T(r.p)) + '</span></div>';
        }).join('');
        var note = c.note ? '<p class="carta__nota' + (/escluse|not included/.test(c.note + T(c.note)) ? ' carta__nota--attenzione' : '') + '">' + esc(T(c.note)) + '</p>' : '';
        return '<article class="carta">'
          + '<div class="carta__testa"><div><h3>' + esc(T(c.title)) + '</h3><p class="carta__kicker">' + esc(T(c.kicker)) + '</p></div>'
          + '<div class="pastiglia pastiglia--grande"><span class="pastiglia__val">' + esc(c.price) + '</span>'
          + (c.priceNote ? '<span class="pastiglia__lab">' + esc(T(c.priceNote)) + '</span>' : '') + '</div></div>'
          + '<div class="carta__corpo">' + lines + rows + '</div>'
          + tags(c.t) + note + '</article>';
      }).join('') + '</div>';
  }

  function renderVini(host) {
    host.innerHTML = '<div class="griglia-vini">' + VINI.map(function (w) {
      return '<article class="vino">'
        + '<div class="vino__foto"><picture>'
        + '<source type="image/avif" sizes="' + SIZES + '" srcset="' + w.img + '-420.avif 420w, ' + w.img + '-700.avif 700w" />'
        + '<source type="image/webp" sizes="' + SIZES + '" srcset="' + w.img + '-420.webp 420w, ' + w.img + '-700.webp 700w" />'
        + '<img src="' + w.img + '-420.jpg" srcset="' + w.img + '-420.jpg 420w, ' + w.img + '-700.jpg 700w" sizes="' + SIZES + '" width="700" height="525" alt="' + esc(w.alt) + '" loading="lazy" decoding="async" />'
        + '</picture></div>'
        + '<div class="vino__corpo">'
        + '<span class="vino__cantina">' + esc(w.cantina) + ' · ' + esc(T(w.type)) + '</span>'
        + '<h3>' + esc(w.name) + '</h3>'
        + '<span class="vino__blend">' + esc(T(w.blend)) + '</span>'
        + '<div class="vino__prezzi">' + w.prices.map(function (x) {
            return '<div class="vino__prezzo"><span class="pastiglia__lab">' + esc(x.label) + '</span><span class="pastiglia__val">' + esc(x.value) + '</span></div>';
          }).join('') + '</div>'
        + '<p class="vino__note">' + esc(T(w.notes)) + '</p>'
        + (w.pairing ? '<p class="vino__abb"><span>' + esc(T('Abbinamenti')) + '</span><br />' + esc(T(w.pairing)) + '</p>' : '')
        + '<p class="vino__legal">' + esc(T(w.legal)) + '</p>'
        + '</div></article>';
    }).join('')
      + '<p class="vini__disclaimer">' + esc(T('Bevi responsabilmente. Vendita di alcolici vietata ai minori di 18 anni.')) + '</p></div>';
  }

  /* 'parola' serve alla ricerca per contare i piatti nella lingua giusta;
     'dati' serve allo script che genera i dati strutturati per Google,
     cosi' menu e schema non possono mai divergere. */
  window.CDLMenu = {
    renderCarte: renderCarte, renderFissi: renderFissi, renderVini: renderVini,
    parola: T,
    dati: { CARTE: CARTE, FISSI: FISSI, VINI: VINI }
  };
})();
