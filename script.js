/* Cedro del Libano — interazioni */
(function () {
  'use strict';

  /* Le poche frasi che il JavaScript scrive da solo, nelle due lingue. */
  var EN = (document.documentElement.getAttribute('lang') || 'it').slice(0, 2) === 'en';
  var FRASI = EN
    ? { apre: 'Open the navigation menu', chiudi: 'Close the navigation menu',
        apertoOra: 'Open now / closes at ', chiusoApre: 'Closed / opens at ', chiuso: 'Closed' }
    : { apre: 'Apri il menù di navigazione', chiudi: 'Chiudi il menù di navigazione',
        apertoOra: 'Aperto ora / si chiude alle ', chiusoApre: 'Ora chiuso / si apre alle ', chiuso: 'Ora chiuso' };

  var CERCA = EN
    ? { uno: 'dish found', molti: 'dishes found', nessuno: 'No dish matches',
        vuotoTitolo: 'Nothing found for', vuotoAiuto: 'Try a shorter word, or the name of an ingredient.',
        pulisci: 'Clear the search', vir1: '“', vir2: '”',
        altrove: 'Looking for a wine or a set menu? They are on the other two tabs.' }
    : { uno: 'piatto trovato', molti: 'piatti trovati', nessuno: 'Nessun piatto corrisponde a',
        vuotoTitolo: 'Nessun piatto per', vuotoAiuto: 'Prova con una parola più corta, o con il nome di un ingrediente.',
        pulisci: 'Cancella la ricerca', vir1: '«', vir2: '»',
        altrove: 'Cerchi un vino o un menù fisso? Sono nelle altre due linguette.' };

  var pannelli = {
    carte: document.getElementById('pannello-carte'),
    fissi: document.getElementById('pannello-fissi'),
    vini: document.getElementById('pannello-vini')
  };
  var reso = { carte: false, fissi: false, vini: false };
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));

  function rendi(id) {
    if (reso[id]) return;
    if (id === 'carte') window.CDLMenu.renderCarte(pannelli.carte);
    if (id === 'fissi') window.CDLMenu.renderFissi(pannelli.fissi);
    if (id === 'vini') window.CDLMenu.renderVini(pannelli.vini);
    reso[id] = true;
    if (id === 'carte') collegaAccordion();
  }

  function mostra(id, daiFuoco) {
    Object.keys(pannelli).forEach(function (k) {
      pannelli[k].hidden = (k !== id);
    });
    tabs.forEach(function (b) {
      var on = b.getAttribute('data-tab') === id;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.setAttribute('tabindex', on ? '0' : '-1');
      b.classList.toggle('tab--attiva', on);
      if (on && daiFuoco) b.focus();
    });
    var barraCerca = document.querySelector('.cerca');
    if (barraCerca) barraCerca.hidden = (id !== 'carte');
    rendi(id);
  }

  tabs.forEach(function (b, i) {
    b.addEventListener('click', function () { mostra(b.getAttribute('data-tab')); });
    /* frecce sinistra/destra fra le linguette, come si aspetta chi naviga da tastiera */
    b.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (e.key === 'Home') { e.preventDefault(); mostra(tabs[0].getAttribute('data-tab'), true); return; }
      if (e.key === 'End') { e.preventDefault(); mostra(tabs[tabs.length - 1].getAttribute('data-tab'), true); return; }
      if (!d) return;
      e.preventDefault();
      var n = tabs[(i + d + tabs.length) % tabs.length];
      mostra(n.getAttribute('data-tab'), true);
    });
  });

  function collegaAccordion() {
    var teste = document.querySelectorAll('.gruppo__testa');
    Array.prototype.forEach.call(teste, function (testa, i) {
      var corpo = document.getElementById(testa.getAttribute('aria-controls'));
      if (window.matchMedia('(max-width: 1149px)').matches && i > 0) chiudi(testa, corpo, true);
      testa.addEventListener('click', function () {
        var aperto = testa.getAttribute('aria-expanded') === 'true';
        chiudi(testa, corpo, aperto);
      });
    });
  }
  function chiudi(testa, corpo, chiudere) {
    testa.setAttribute('aria-expanded', chiudere ? 'false' : 'true');
    corpo.hidden = !!chiudere;
    testa.classList.toggle('gruppo__testa--chiusa', !!chiudere);
  }

  mostra('carte');

  /* Navigazione mobile */
  var bottone = document.querySelector('.hamburger');
  var navMobile = document.getElementById('nav-mobile');
  if (bottone && navMobile) {
    var apri = function (stato) {
      bottone.setAttribute('aria-expanded', stato ? 'true' : 'false');
      bottone.setAttribute('aria-label', stato ? FRASI.chiudi : FRASI.apre);
      navMobile.hidden = !stato;
    };
    bottone.addEventListener('click', function () {
      apri(bottone.getAttribute('aria-expanded') !== 'true');
    });
    Array.prototype.forEach.call(navMobile.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () { apri(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && bottone.getAttribute('aria-expanded') === 'true') {
        apri(false);
        bottone.focus();
      }
    });
  }


  /* Voce di navigazione attiva */
  var sezioni = ['hero', 'menu', 'dove', 'storia', 'foto', 'contatti'];
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Array.prototype.forEach.call(document.querySelectorAll('.nav a'), function (a) {
          a.classList.toggle('nav__attiva', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sezioni.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* Orario: giorno di oggi + stato "aperto ora / chiuso" nell'apertura
     Gli orari stanno una volta sola nell'HTML: qui vengono letti da lì,
     così se cambi l'orario in index.html non devi toccare il JavaScript. */
  var adesso = new Date();
  var oggi = adesso.getDay();
  var righe = document.querySelectorAll('.orario__riga');
  var rigaOggi = document.querySelector('.orario [data-giorno="' + oggi + '"]');
  if (rigaOggi) rigaOggi.classList.add('orario__oggi');

  function minutiDa(testo) {
    var m = /(\d{1,2}):(\d{2})/.exec(testo);
    return m ? (+m[1]) * 60 + (+m[2]) : null;
  }
  function fasciaDelGiorno(g) {
    var r = document.querySelector('.orario [data-giorno="' + g + '"]');
    if (!r) return null;
    var celle = r.querySelectorAll('span');
    var testo = celle[celle.length - 1].textContent;
    var parti = testo.split(/[–-]/);
    var apre = minutiDa(parti[0]);
    var chiude = minutiDa(parti[1] || '');
    if (apre === null || chiude === null) return null;
    if (chiude <= apre) chiude += 24 * 60; /* mezzanotte = giorno dopo */
    return { apre: apre, chiude: chiude };
  }

  var stato = document.getElementById('stato-apertura');
  if (stato && righe.length) {
    var ora = adesso.getHours() * 60 + adesso.getMinutes();
    var oggiF = fasciaDelGiorno(oggi);
    var ieriF = fasciaDelGiorno((oggi + 6) % 7);
    var aperto = false, chiudeA = null, apreA = null;

    if (oggiF && ora >= oggiF.apre && ora < oggiF.chiude) {
      aperto = true; chiudeA = oggiF.chiude % (24 * 60);
    } else if (ieriF && ieriF.chiude > 24 * 60 && ora < ieriF.chiude - 24 * 60) {
      aperto = true; chiudeA = ieriF.chiude % (24 * 60); /* coda dopo mezzanotte */
    } else if (oggiF && ora < oggiF.apre) {
      apreA = oggiF.apre;
    } else {
      var domaniF = fasciaDelGiorno((oggi + 1) % 7);
      if (domaniF) apreA = domaniF.apre;
    }

    var hhmm = function (m) {
      m = ((m % (24 * 60)) + 24 * 60) % (24 * 60);
      return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2);
    };
    stato.querySelector('.stato__testo').textContent = aperto
      ? FRASI.apertoOra + hhmm(chiudeA)
      : (apreA !== null ? FRASI.chiusoApre + hhmm(apreA) : FRASI.chiuso);
    stato.classList.toggle('stato--aperto', aperto);
    stato.hidden = false;

    /* stessa informazione nella barra fissa del telefono, ma solo
       quando siamo chiusi: a locale aperto non aggiunge niente */
    var strisciaBarra = document.querySelector('.barra-mobile__stato');
    if (strisciaBarra && !aperto) {
      strisciaBarra.textContent = apreA !== null ? FRASI.chiusoApre + hhmm(apreA) : FRASI.chiuso;
      strisciaBarra.hidden = false;
    }
  }


  /* Galleria: apre la foto ingrandita in una finestra <dialog> nativa.
     <dialog> porta con sé la chiusura con Esc, il fuoco intrappolato e il
     ritorno del fuoco al riquadro di partenza: niente da riscrivere a mano.
     La foto grande viene ricostruita ogni volta come <picture>, così anche
     l'ingrandimento sfrutta AVIF e WebP invece di scaricare il JPEG. */
  var lente = document.getElementById('lente');
  if (lente && typeof lente.showModal === 'function') {
    var contenitoreLente = lente;

    function mostraFoto(base, testoAlt) {
      var vecchia = lente.querySelector('.lente__foto, .lente__img');
      var pic = document.createElement('picture');
      pic.className = 'lente__foto';
      ['avif', 'webp'].forEach(function (f) {
        var s = document.createElement('source');
        s.type = 'image/' + f;
        s.srcset = base + '.' + f;
        pic.appendChild(s);
      });
      var im = document.createElement('img');
      im.className = 'lente__img';
      im.src = base + '.jpg';
      im.alt = testoAlt || '';
      pic.appendChild(im);
      if (vecchia) vecchia.replaceWith(pic); else contenitoreLente.appendChild(pic);
    }

    Array.prototype.forEach.call(document.querySelectorAll('.galleria__apri'), function (b) {
      b.addEventListener('click', function () {
        var interna = b.querySelector('img');
        mostraFoto(b.getAttribute('data-piena'), interna ? interna.alt : '');
        lente.showModal();
      });
    });
    lente.querySelector('.lente__chiudi').addEventListener('click', function () { lente.close(); });
    /* clic sullo sfondo scuro = chiudi */
    lente.addEventListener('click', function (e) { if (e.target === lente) lente.close(); });
  }

  /* ===== Ricerca dentro il menù alla carta ==============================
     Filtra i piatti già disegnati nella pagina: nessuna richiesta al
     server, i dati sono tutti qui. Mentre si cerca i gruppi restano
     aperti, altrimenti un risultato potrebbe finire dentro una
     fisarmonica chiusa e sembrare assente. */
  var campo = document.getElementById('cerca-piatti');
  var pannelloCarte = document.getElementById('pannello-carte');

  if (campo && pannelloCarte) {
    var esito = document.getElementById('cerca-esito');
    var pulisci = document.querySelector('.cerca__pulisci');
    var nulla = null;
    var statoPrima = null;

    /* "Wara' enab" si deve trovare scrivendo "wara enab", e "però"
       scrivendo "pero". La sostituzione avviene carattere per carattere
       cosi' la stringa mantiene la stessa lunghezza dell'originale: le
       posizioni trovate qui servono poi a evidenziare nel testo vero. */
    function piatto(txt) {
      return txt.replace(/[\s\S]/g, function (ch) {
        if (ch === "'" || ch === '\u2019') return ' ';
        var d = ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return (d.length === 1 ? d : ch).toLowerCase();
      });
    }

    /* Dalla frase cercata a un'espressione che tollera spazi in piu':
       "wara enab" trova anche "wara  enab" (dove l'apostrofo e' diventato
       spazio) senza che le posizioni si spostino. */
    function espressione(q) {
      var parti = q.split(/\s+/).filter(Boolean).map(function (x) {
        return x.replace(/[.*+?^${}()|[\]\\]/g, function (c) { return "\\" + c; });
      });
      if (!parti.length) return null;
      return new RegExp(parti.join('\\s+'), 'g');
    }

    function evidenzia(el, re) {
      if (el.dataset.originale === undefined) el.dataset.originale = el.textContent;
      var testo = el.dataset.originale;
      if (!re) { el.textContent = testo; return; }
      var piano = piatto(testo);
      var out = '', da = 0, m;
      re.lastIndex = 0;
      while ((m = re.exec(piano)) !== null) {
        if (m[0].length === 0) { re.lastIndex++; continue; }
        out += esc(testo.slice(da, m.index)) +
               '<mark class="cerca-evid">' + esc(testo.slice(m.index, m.index + m[0].length)) + '</mark>';
        da = m.index + m[0].length;
      }
      out += esc(testo.slice(da));
      el.innerHTML = out;
    }
    function esc(x) {
      return x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function filtra() {
      var grezzo = campo.value.trim();
      var q = piatto(grezzo);
      var re = q ? espressione(q) : null;
      var piatti = pannelloCarte.querySelectorAll('.piatto');
      var gruppi = pannelloCarte.querySelectorAll('.gruppo');
      var trovati = 0;

      pulisci.hidden = grezzo === '';

      /* si entra in ricerca: mi ricordo quali gruppi erano chiusi */
      if (q && !statoPrima) {
        statoPrima = [];
        Array.prototype.forEach.call(gruppi, function (g) {
          var testa = g.querySelector('.gruppo__testa');
          statoPrima.push(testa.getAttribute('aria-expanded') === 'true');
        });
      }

      Array.prototype.forEach.call(piatti, function (p) {
        var nome = p.querySelector('.piatto__nome');
        var desc = p.querySelector('.piatto__desc');
        var etichette = p.querySelectorAll('.tag');
        /* si cerca anche fra le etichette: chi scrive "sesamo" vuole
           sapere quali piatti lo contengono, non solo quelli che lo
           nominano nella descrizione */
        var testo = piatto(
          (nome ? nome.textContent : '') + ' ' +
          (desc ? desc.textContent : '') + ' ' +
          Array.prototype.map.call(etichette, function (t) { return t.textContent; }).join(' '));
        var ok = !re || (re.lastIndex = 0, re.test(testo));
        p.hidden = !ok;
        if (ok) trovati++;
        if (nome) evidenzia(nome, ok ? re : null);
        if (desc) evidenzia(desc, ok ? re : null);
        Array.prototype.forEach.call(etichette, function (t) { evidenzia(t, ok ? re : null); });
      });

      /* un gruppo senza risultati sparisce; gli altri restano aperti */
      Array.prototype.forEach.call(gruppi, function (g, i) {
        var vivi = g.querySelectorAll('.piatto:not([hidden])').length;
        g.hidden = q !== '' && vivi === 0;
        var testa = g.querySelector('.gruppo__testa');
        var corpo = document.getElementById(testa.getAttribute('aria-controls'));
        var conta = g.querySelector('.gruppo__conta');
        if (q) {
          testa.setAttribute('aria-expanded', 'true');
          corpo.hidden = false;
          testa.classList.remove('gruppo__testa--chiusa');
          if (conta) conta.textContent = vivi + ' ' + (window.CDLMenu.parola ? window.CDLMenu.parola('piatti') : '');
        } else if (statoPrima) {
          var eraAperto = statoPrima[i];
          testa.setAttribute('aria-expanded', eraAperto ? 'true' : 'false');
          corpo.hidden = !eraAperto;
          testa.classList.toggle('gruppo__testa--chiusa', !eraAperto);
          if (conta) conta.textContent = g.querySelectorAll('.piatto').length + ' ' + (window.CDLMenu.parola ? window.CDLMenu.parola('piatti') : '');
        }
      });

      if (!q) statoPrima = null;

      /* Il messaggio è una frase intera e non sposta il fuoco:
         chi usa un lettore di schermo sente "12 piatti trovati"
         mentre continua a scrivere. */
      if (!q) {
        esito.textContent = '';
        esito.classList.remove('cerca__esito--vuoto');
      } else if (trovati === 0) {
        esito.textContent = CERCA.nessuno + ' ' + CERCA.vir1 + grezzo + CERCA.vir2;
        esito.classList.add('cerca__esito--vuoto');
      } else {
        esito.textContent = trovati + ' ' + (trovati === 1 ? CERCA.uno : CERCA.molti);
        esito.classList.remove('cerca__esito--vuoto');
      }

      /* schermata vuota con una via d'uscita, non un vicolo cieco */
      if (q && trovati === 0) {
        if (!nulla) {
          nulla = document.createElement('p');
          nulla.className = 'cerca-nulla';
          var b = document.createElement('button');
          b.type = 'button';
          b.addEventListener('click', function () { campo.value = ''; filtra(); campo.focus(); });
          nulla.appendChild(document.createElement('span'));
          nulla.appendChild(document.createElement('br'));
          /* la ricerca copre solo la carta: se non trova niente, vale la
             pena ricordare che vini e menu fissi stanno altrove */
          var dritta = document.createElement('small');
          dritta.className = 'cerca-nulla__dritta';
          dritta.textContent = CERCA.altrove;
          nulla.appendChild(dritta);
          nulla.appendChild(document.createElement('br'));
          nulla.appendChild(b);
          pannelloCarte.appendChild(nulla);
        }
        nulla.firstChild.textContent = CERCA.vuotoTitolo + ' ' + CERCA.vir1 + grezzo + CERCA.vir2 + '. ' + CERCA.vuotoAiuto;
        nulla.querySelector('button').textContent = CERCA.pulisci;
        nulla.hidden = false;
      } else if (nulla) {
        nulla.hidden = true;
      }
    }

    campo.addEventListener('input', filtra);
    campo.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && campo.value) { e.preventDefault(); campo.value = ''; filtra(); }
    });
    pulisci.addEventListener('click', function () { campo.value = ''; filtra(); campo.focus(); });

    /* se si torna sulla pagina con del testo già scritto (ricarica) */
    if (campo.value) filtra();
  }
})();
