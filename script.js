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


<<<<<<< HEAD
  /* La firma di Ahmad: il tratto vettoriale si disegna una volta sola
     quando entra nello schermo, come farebbe una penna vera. Di base e'
     gia' tutto disegnato nell'HTML — solo se possiamo animarla lo
     azzeriamo un attimo prima di ridisegnarlo, mai il contrario, cosi
     non dipende dal JavaScript per essere visibile. */
  var firma = document.querySelector('.firma__traccia');
  if (firma && 'IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    firma.classList.add('firma__traccia--pronta');
    var oss = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (!v.isIntersecting) return;
        firma.classList.remove('firma__traccia--pronta');
        firma.classList.add('firma__traccia--scrivi');
        oss.disconnect();
      });
    }, { threshold: .6 });
    oss.observe(firma);
  }


  /* Video della brace: parte solo quando entra nello schermo, si ferma
     quando esce — niente fiamma che brucia CPU e batteria mentre si
     legge il menù più sotto. Chi ha chiesto meno movimento non lo vede
     mai: resta sulla foto (il poster), come vuole il CSS qui sopra. */
  var videoBrace = document.querySelector('.brace-video__filmato');
  if (videoBrace && 'IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    videoBrace.setAttribute('preload', 'metadata');
    new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (v.isIntersecting) { videoBrace.play().catch(function () {}); }
        else { videoBrace.pause(); }
      });
    }, { threshold: .3 }).observe(videoBrace);
  }


  /* Voce di navigazione attiva */
  var sezioni = ['hero', 'menu', 'dove', 'storia', 'foto', 'contatti'];

  function segnaAttiva(riferimento) {
    Array.prototype.forEach.call(document.querySelectorAll('.nav a'), function (a) {
      a.classList.toggle('nav__attiva', a.getAttribute('href') === riferimento);
    });
  }

  if ('IntersectionObserver' in window) {
    /* Cliccando una voce la pagina scorre fino alla sezione, e per
       strada attraversa tutte quelle in mezzo: senza questa pausa la
       voce attiva lampeggerebbe su ognuna prima di fermarsi su quella
       giusta. Quindi al clic si segna subito la voce scelta e si mette
       in pausa l'osservatore finche' lo scorrimento non e' finito. */
    var spiaFerma = false;
    var riprendiSpia = null;

    var spy = new IntersectionObserver(function (entries) {
      if (spiaFerma) return;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        segnaAttiva('#' + e.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

=======
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
>>>>>>> 56df2a74599a61cfcbdb5f6504e4ce58527d08b5
    sezioni.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
<<<<<<< HEAD

    Array.prototype.forEach.call(document.querySelectorAll('.nav a[href^="#"], .nav-mobile a[href^="#"]'), function (a) {
      a.addEventListener('click', function () {
        spiaFerma = true;
        segnaAttiva(a.getAttribute('href'));
        aspettaFermata();
      });
    });

    /* L'osservatore riparte quando la pagina si e' davvero fermata, non
       dopo un tempo deciso a caso: su una pagina lunga lo scorrimento
       puo' durare piu' di un secondo. Dove c'e' "scrollend" lo si usa
       direttamente; altrove si guarda quando lo scorrimento smette di
       cambiare. In ogni caso c'e' un tetto massimo, cosi non puo'
       succedere che resti fermo per sempre. */
    var tettoMassimo = null;
    function aspettaFermata() {
      clearTimeout(riprendiSpia);
      clearTimeout(tettoMassimo);
      tettoMassimo = setTimeout(function () { spiaFerma = false; }, 3000);
    }
    function riparti() {
      clearTimeout(riprendiSpia);
      riprendiSpia = setTimeout(function () {
        clearTimeout(tettoMassimo);
        spiaFerma = false;
      }, 140);
    }
    if ('onscrollend' in window) {
      window.addEventListener('scrollend', riparti);
    } else {
      window.addEventListener('scroll', function () { if (spiaFerma) riparti(); }, { passive: true });
    }
  }


  /* =====================================================
     Fase 1 — i dettagli animati
     Regola valida per tutti e quattro i pezzi qui sotto: se qualcosa
     non c'e (browser vecchio, movimento ridotto, elemento assente) si
     esce e basta. Il sito non dipende da niente di tutto questo.
     ===================================================== */

  var menoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;


  /* --- La luce del cedro sugli occhielli ---------------
     Ogni etichettina si accende quando la raggiungi, una volta sola.
     L'occhiello dell'apertura e escluso: ha gia la sua sequenza, che
     parte al caricamento della pagina e non va disturbata. */
  if ('IntersectionObserver' in window && !menoMovimento) {
    var occhielli = document.querySelectorAll('.sezione .occhiello');
    if (occhielli.length) {
      var luce = new IntersectionObserver(function (voci) {
        voci.forEach(function (v) {
          if (!v.isIntersecting) return;
          v.target.classList.add('occhiello--luce');
          luce.unobserve(v.target);
        });
      }, { threshold: .9 });
      Array.prototype.forEach.call(occhielli, function (o) { luce.observe(o); });
    }
  }


  /* --- Le voci in alto che girano su se stesse ---------------
     Ogni lettera e sdoppiata: una copia sopra e una identica sotto,
     dentro una finestrella che taglia. Col mouse sopra, la coppia
     scorre in alto: la prima copia esce e la seconda entra al suo
     posto. La lettera resta sempre la stessa — non e una decodifica,
     e la stessa lettera che rotola. Le lettere partono una dopo
     l'altra da sinistra, a breve distanza: e quello che fa l'onda.
     Il giro va sempre in avanti e non torna mai indietro: finito lo
     scorrimento, la coppia viene rimessa al punto di partenza senza
     animazione — e invisibile, perche le due copie sono identiche.
     Solo col mouse vero: sul telefono non esiste il passaggio del
     mouse. Il nome letto dai lettori per non vedenti resta fissato
     in aria-label sul link, cosi la lettera doppia non viene letta
     due volte. Se il JavaScript non parte, le coppie restano ferme
     al punto di partenza e la voce si legge normalmente. */
  if (conMouse && !menoMovimento) {
    var GIRO_DURATA = 460;
    var GIRO_PASSO = 42;
    Array.prototype.forEach.call(document.querySelectorAll('.nav a:not(.bottone)'), function (voce) {
      var vero = voce.textContent;
      if (!voce.getAttribute('aria-label')) voce.setAttribute('aria-label', vero.trim());

      voce.textContent = '';
      var giri = [];
      vero.split('').forEach(function (ch) {
        var lettera = document.createElement('span');
        lettera.className = 'lettera';
        var giro = document.createElement('span');
        giro.className = 'lettera__giro';
        var copia = document.createElement('span');
        copia.className = 'lettera__copia';
        copia.textContent = ch === ' ' ? ' ' : ch;
        giro.appendChild(copia);
        giro.appendChild(copia.cloneNode(true));
        lettera.appendChild(giro);
        voce.appendChild(lettera);
        giri.push(giro);
      });

      /* Un giro alla volta: se il mouse ripassa mentre l'onda e ancora
         in corso non si accavalla niente. */
      var inGiro = false;
      var fineGiro = null;

      voce.addEventListener('mouseenter', function () {
        if (inGiro) return;
        inGiro = true;

        giri.forEach(function (g, i) {
          g.style.transition = 'transform ' + GIRO_DURATA + 'ms cubic-bezier(.76, 0, .24, 1) ' + (i * GIRO_PASSO) + 'ms';
          g.style.transform = 'translateY(-50%)';
        });

        clearTimeout(fineGiro);
        fineGiro = setTimeout(function () {
          /* Rimessa a zero senza animazione: la seconda copia sta gia
             dove stava la prima, quindi l'occhio non vede il salto e il
             prossimo passaggio riparte in avanti. */
          giri.forEach(function (g) {
            g.style.transition = 'none';
            g.style.transform = 'translateY(0)';
          });
          void voce.offsetHeight;
          inGiro = false;
        }, GIRO_DURATA + (giri.length - 1) * GIRO_PASSO + 30);
      });
    });
  }


  /* --- Il footer che si rivela -------------------------
     Sale di pochi pixel quando lo raggiungi. Di base e gia visibile:
     lo nascondiamo un attimo prima di farlo salire, mai il contrario. */
  if ('IntersectionObserver' in window && !menoMovimento) {
    var pezziPiede = document.querySelectorAll('.footer__marchio, .footer__dati');
    if (pezziPiede.length) {
      Array.prototype.forEach.call(pezziPiede, function (p) {
        p.classList.add('footer__rivela--pronto');
      });
      var piede = new IntersectionObserver(function (voci) {
        voci.forEach(function (v) {
          if (!v.isIntersecting) return;
          v.target.classList.remove('footer__rivela--pronto');
          v.target.classList.add('footer__rivela--vai');
          piede.unobserve(v.target);
        });
      }, { threshold: .4 });
      Array.prototype.forEach.call(pezziPiede, function (p) { piede.observe(p); });
    }
=======
>>>>>>> 56df2a74599a61cfcbdb5f6504e4ce58527d08b5
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
