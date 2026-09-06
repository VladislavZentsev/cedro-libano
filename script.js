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

  /* Fisarmonica dei gruppi del menù à la carte: parte aperto solo il
     primo (su qualunque schermo, non solo su mobile come prima —
     41 piatti tutti insieme rendevano il menù troppo lungo da
     scorrere), e aprendone un altro quello aperto prima si richiude
     da solo. Mai più di un gruppo aperto insieme.

     La ricerca (piu' sotto in questo file) non passa da qui: apre i
     gruppi con risultati per conto suo, anche piu' di uno insieme, e
     questo resta corretto — durante una ricerca servono i risultati
     di piu' categorie alla volta. */
  function collegaAccordion() {
    var teste = document.querySelectorAll('.gruppo__testa');
    Array.prototype.forEach.call(teste, function (testa, i) {
      var corpo = document.getElementById(testa.getAttribute('aria-controls'));
      if (i > 0) chiudi(testa, corpo, true);
      testa.addEventListener('click', function () {
        var aperto = testa.getAttribute('aria-expanded') === 'true';
        if (!aperto) {
          Array.prototype.forEach.call(teste, function (altra) {
            if (altra === testa) return;
            chiudi(altra, document.getElementById(altra.getAttribute('aria-controls')), true);
          });
        }
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


  /* --- Le fasce video -----------------------------------
     Vale per qualunque elemento con data-fascia-video, non solo per
     la brace: se domani serve un'altra fascia video da qualche altra
     parte, basta ripetere la stessa struttura e funziona da sola.

     Due cose, legate fra loro:

     1) La fascia cresce man mano che entra, fino alla misura piena
        dove si vede tutto il filmato senza tagli. La crescita segue
        lo scorrimento, ma non torna mai indietro: si tiene il valore
        piu' alto raggiunto, quindi risalendo resta grande. Arrivata
        in fondo si smette di ascoltare lo scorrimento — a quel punto
        non c'e' piu' niente da calcolare.

     2) Il filmato NON parte mentre la fascia e' ancora piccola: fino
        ad allora si vede solo il primo fotogramma (il poster). Parte
        quando la crescita e' finita, cosi' il video si guarda alla
        sua misura piena dall'inizio e non a meta' strada. Poi si
        ferma quando esce dallo schermo e riparte rientrando — niente
        fuoco che consuma processore e batteria mentre si legge il
        menu piu' sotto. */
  /* Quanto e' alta l'intestazione, misurata e non scritta a mano: sul
     telefono e' piu' bassa che sul computer, e se cambiasse in futuro
     questo si aggiusta da solo. Serve alla fascia video per centrare il
     filmato nello spazio che si vede davvero — quello sotto la barra —
     invece che nella finestra intera, dove i primi centimetri stanno
     nascosti sotto la barra stessa.
     Senza JavaScript la misura resta 0 e tutto si comporta come prima. */
  var testata = document.querySelector('.header');
  function misuraTestata() {
    var h = testata ? Math.round(testata.getBoundingClientRect().height) : 0;
    document.documentElement.style.setProperty('--alt-testata', h + 'px');
  }
  if (testata) {
    misuraTestata();
    window.addEventListener('resize', misuraTestata, { passive: true });
  }

  var menoMovimentoFasce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fasceVideo = document.querySelectorAll('[data-fascia-video]');

  /* A che punto della pausa la crescita e' finita. 0.7 = la fascia
     raggiunge la misura piena al 70% della corsa, e il restante 30% e'
     tempo in cui si vede grande, ferma e in movimento prima che la
     pagina riparta. */
  var FINE_CRESCITA = 0.85;

  if (fasceVideo.length && !menoMovimentoFasce) {

    /* Da dove comincia l'aggancio e quanto e' alto: due misure che
       cambiano solo se cambia la finestra, non mentre si scorre. */
    function misuraFascia(voce) {
      var agg = voce.aggancio;
      voce.cima = agg ? (parseFloat(getComputedStyle(agg).top) || 0) : 0;
      voce.altezzaAggancio = agg ? agg.getBoundingClientRect().height : window.innerHeight;
    }

    var daSeguire = [];
    var tutte = [];

    Array.prototype.forEach.call(fasceVideo, function (f) {
      f.style.setProperty('--apertura', '0');
      var voce = {
        elemento: f,
        film: f.querySelector('video'),
        aggancio: f.querySelector('.fascia-video__aggancio'),
        cima: 0,
        altezzaAggancio: 0,
        massimo: 0,
        cresciuta: false,
        dentro: false
      };
      misuraFascia(voce);
      tutte.push(voce);
      daSeguire.push(voce);
    });

    /* Decide se il filmato deve andare: serve che sia finita la
       crescita E che la fascia sia sullo schermo. */
    function regola(voce) {
      if (!voce.film) return;
      if (voce.cresciuta && voce.dentro) { voce.film.play().catch(function () {}); }
      else { voce.film.pause(); }
    }

    if ('IntersectionObserver' in window) {
      var occhio = new IntersectionObserver(function (voci) {
        voci.forEach(function (v) {
          var voce = tutte.filter(function (x) { return x.elemento === v.target; })[0];
          if (!voce) return;
          voce.dentro = v.isIntersecting;
          regola(voce);
        });
      }, { threshold: .3 });
      tutte.forEach(function (voce) { occhio.observe(voce.elemento); });
    } else {
      /* Senza IntersectionObserver non si puo' sapere quando la fascia
         entra ed esce: si da' per buono che sia sullo schermo, cosi' il
         filmato parte comunque a crescita finita. Meglio un video che
         gira anche fuori campo che un video che non parte mai. */
      tutte.forEach(function (voce) { voce.dentro = true; });
    }

    var giaInCoda = false;

    function calcola() {
      giaInCoda = false;
      var schermo = window.innerHeight;

      for (var i = daSeguire.length - 1; i >= 0; i--) {
        var f = daSeguire[i];
        var r = f.elemento.getBoundingClientRect();

        /* La fascia e' alta piu' di uno schermo e il filmato dentro resta
           agganciato in mezzo: la "corsa" e' quell'altezza in piu', ed e'
           il tratto in cui per chi guarda la pagina sembra ferma.

           0 = la fascia ha appena raggiunto il bordo alto dello schermo
           1 = la corsa e' finita e si riparte.

           La crescita pero' si completa prima della fine (FINE_CRESCITA),
           cosi' resta un tratto in cui il filmato si vede grande e fermo
           prima che la pagina prosegua: e' li' che parte, gia' a misura
           piena, come deve. */
        /* Le misure dell'aggancio (da dove comincia e quanto e' alto)
           sono gia' pronte: si calcolano una volta sola e si rifanno
           solo quando la finestra cambia misura. Prima venivano rilette
           a ogni fotogramma di scorrimento, e una di quelle letture era
           getComputedStyle, che costringe il browser a ricalcolare da
           capo lo stile di tutta la pagina: la lettura piu' cara di
           tutto il ciclo, ripetuta 60 volte al secondo. */
        var corsa = r.height - f.altezzaAggancio;
        var quanto = corsa > 0 ? (f.cima - r.top) / (corsa * FINE_CRESCITA) : 1;
        if (quanto < 0) quanto = 0;
        if (quanto > 1) quanto = 1;

        /* Il filmato si prepara appena la fascia comincia a entrare,
           cosi' e' pronto quando servira'. Senza questo, al momento di
           partire dovrebbe ancora cominciare a scaricare. */
        if (r.top < schermo && f.film && f.film.getAttribute('preload') === 'none') {
          f.film.setAttribute('preload', 'metadata');
          f.film.load();
        }

        /* il passo indietro non conta: si tiene il massimo raggiunto */
        if (quanto > f.massimo) {
          f.massimo = quanto;
          f.elemento.style.setProperty('--apertura', quanto.toFixed(3));
        }

        if (f.massimo >= 1) {
          f.elemento.style.setProperty('--apertura', '1');
          f.cresciuta = true;
          regola(f);
          daSeguire.splice(i, 1);
        }
      }

      if (!daSeguire.length) {
        window.removeEventListener('scroll', inCoda);
        window.removeEventListener('resize', alRidimensiona);
      }
    }

    function inCoda() {
      if (giaInCoda) return;
      giaInCoda = true;
      requestAnimationFrame(calcola);
    }

    window.addEventListener('scroll', inCoda, { passive: true });
    /* le misure fisse si rifanno qui, non dentro il ciclo di scorrimento */
    function alRidimensiona() {
      tutte.forEach(misuraFascia);
      inCoda();
    }
    window.addEventListener('resize', alRidimensiona, { passive: true });
    calcola();
  }


  /* Voce di navigazione attiva */
  var sezioni = ['hero', 'menu', 'dove', 'storia', 'foto', 'contatti'];

  function segnaAttiva(riferimento) {
    Array.prototype.forEach.call(document.querySelectorAll('.nav a'), function (a) {
      var qui = a.getAttribute('href') === riferimento;
      a.classList.toggle('nav__attiva', qui);
      /* Non basta il colore: chi usa un lettore di schermo non lo vede.
         aria-current dice a voce quale sezione si sta guardando. */
      if (qui) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    muoviRiflettore();
  }


  /* Riflettore: una barra di luce che scivola sopra la voce attiva e le
     proietta sotto un cono caldo. Non e' la sottolineatura di prima: la
     riga non sta sotto la parola ma sopra, e quello che si vede sotto e'
     luce che sfuma, non un tratto. Si costruisce da JavaScript perche'
     senza JavaScript non avrebbe nulla da seguire. */
  var riflettore = null;
  var vociLuce = [];

  (function preparaRiflettore() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    vociLuce = Array.prototype.filter.call(nav.querySelectorAll('a'), function (a) {
      return !a.classList.contains('bottone');
    });
    if (!vociLuce.length) return;

    riflettore = document.createElement('span');
    riflettore.className = 'nav__riflettore';
    riflettore.setAttribute('aria-hidden', 'true');

    var fascio = document.createElement('span');
    fascio.className = 'nav__fascio';
    riflettore.appendChild(fascio);
    nav.appendChild(riflettore);

    vociLuce.forEach(function (a) {
      a.addEventListener('mouseenter', function () { puntaSu(a); });
      a.addEventListener('focus', function () { puntaSu(a); });
    });
    nav.addEventListener('mouseleave', function () { muoviRiflettore(); });
    nav.addEventListener('focusout', function () { muoviRiflettore(); });

    window.addEventListener('resize', function () { muoviRiflettore(); }, { passive: true });

    /* Al primo giro senza transizione, altrimenti la barra parte da
       sinistra e attraversa il menu davanti agli occhi. */
    riflettore.style.transition = 'none';
    muoviRiflettore();
    void riflettore.offsetWidth;
    riflettore.style.transition = '';
  }());

  function puntaSu(voce) {
    if (!riflettore || !voce) return;
    riflettore.style.width = voce.offsetWidth + 'px';
    riflettore.style.transform = 'translateX(' + voce.offsetLeft + 'px)';
    riflettore.style.opacity = '1';
  }

  function muoviRiflettore() {
    if (!riflettore) return;
    var attiva = null;
    vociLuce.forEach(function (a) {
      if (a.classList.contains('nav__attiva')) attiva = a;
    });
    if (attiva) puntaSu(attiva);
    else riflettore.style.opacity = '0';
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

    sezioni.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });

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
      if (vecchia) vecchia.replaceWith(pic); else lente.appendChild(pic);
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


  /* ---------- il carosello delle recensioni ----------

     Non e' un'animazione CSS ma un contenitore che scorre davvero:
     cosi' sul telefono lo swipe funziona da solo, con l'inerzia del
     sistema operativo, e chi naviga da tastiera puo' scorrerlo con le
     frecce. Il movimento automatico si limita a spingere piano la
     posizione, e si ferma appena qualcuno tocca, passa il mouse o
     mette a fuoco qualcosa dentro.

     Per far girare il nastro senza salti le schede vengono duplicate
     una volta: quando lo scorrimento supera la lunghezza del primo
     gruppo si torna indietro esattamente di quella misura, e il
     fotogramma dopo e' identico a quello prima. Le copie sono
     nascoste ai lettori di schermo, che altrimenti leggerebbero due
     volte le stesse recensioni. */
  Array.prototype.forEach.call(document.querySelectorAll('[data-carosello]'), function (giostra) {
    var pista = giostra.querySelector('[data-pista]');
    if (!pista) return;

    var schede = Array.prototype.slice.call(pista.children);
    if (!schede.length) return;

    var pigro = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* pixel al secondo: piano, per lasciar leggere le recensioni.
       Con data-velocita si cambia passo (le foto vanno un po' piu'
       spedite: non c'e' niente da leggere). */
    var VELOCITA = parseFloat(giostra.getAttribute('data-velocita')) || 26;
    var larghezzaGruppo = 0;
    var posizione = 0;
    var impostato = -1;
    var fermo = false;
    var dentro = !('IntersectionObserver' in window);
    var ultimoIstante = 0;
    var trascina = null;
    var partenzaX = null;

    function misura() {
      var primaCopia = pista.children[schede.length];
      larghezzaGruppo = primaCopia ? primaCopia.offsetLeft - schede[0].offsetLeft : 0;
    }

    /* --- trascinamento col mouse (sul touch scorre gia' da solo) --- */
    var SOGLIA = 6;   /* px oltre i quali e' un trascinamento, non un clic */
    var mosso = false;

    pista.addEventListener('pointerdown', function (e) {
      fermo = true;
      mosso = false;
      partenzaX = e.clientX;
      if (e.pointerType !== 'mouse') return;
      trascina = { x: e.clientX, da: pista.scrollLeft };
      pista.classList.add('carosello__pista--presa');
      pista.setPointerCapture(e.pointerId);
    });
    pista.addEventListener('pointermove', function (e) {
      if (partenzaX != null && Math.abs(e.clientX - partenzaX) > SOGLIA) mosso = true;
      if (!trascina) return;
      e.preventDefault();
      pista.scrollLeft = trascina.da - (e.clientX - trascina.x);
    });
    function lasciaAndare(e) {
      partenzaX = null;
      if (trascina) {
        trascina = null;
        pista.classList.remove('carosello__pista--presa');
        if (e && e.pointerId != null && pista.hasPointerCapture(e.pointerId)) {
          pista.releasePointerCapture(e.pointerId);
        }
      }
      fermo = false;
    }
    pista.addEventListener('pointerup', lasciaAndare);
    pista.addEventListener('pointercancel', function (e) {
      /* il sistema si e' preso il gesto per scorrere: era uno swipe */
      mosso = true;
      lasciaAndare(e);
    });

    /* Chi trascina per scorrere non voleva aprire la foto. Il controllo
       sta in fase di cattura, quindi arriva prima del gestore attaccato
       al pulsante e lo ferma sul nascere. */
    pista.addEventListener('click', function (e) {
      if (!mosso) return;
      e.preventDefault();
      e.stopPropagation();
      mosso = false;
    }, true);

    pista.addEventListener('mouseenter', function () { fermo = true; });
    pista.addEventListener('mouseleave', function () { if (!trascina) fermo = false; });
    pista.addEventListener('focusin', function () { fermo = true; });
    pista.addEventListener('focusout', function () { fermo = false; });

    /* Chi ha chiesto meno animazioni si tiene il nastro fermo e lo
       scorre a mano: nessuna copia, nessun movimento automatico.
       Si esce prima di registrare l'ascolto del ridimensionamento:
       senza nastro in movimento non c'e' niente da rimisurare. */
    if (pigro) return;

    window.addEventListener('resize', misura, { passive: true });

    schede.forEach(function (s) {
      var copia = s.cloneNode(true);
      copia.setAttribute('aria-hidden', 'true');
      pista.appendChild(copia);
    });
    misura();

    /* Il nastro si muove SOLO mentre e' sullo schermo.
       Prima il ciclo girava a 60 fotogrammi al secondo dal caricamento
       della pagina fino alla chiusura della scheda, per tutti e due i
       caroselli, anche mentre si leggeva il menu in cima: lavoro
       continuo per qualcosa che non si vedeva. Ora esce dal ciclo
       appena il carosello lascia lo schermo, e l'osservatore qui sotto
       lo fa ripartire quando rientra. Chi guarda non vede differenza:
       il movimento c'e' esattamente quando c'e' qualcuno a guardarlo. */
    var inMoto = false;
    function avvia() {
      if (inMoto) return;
      inMoto = true;
      /* si riparte senza salto: il tempo passato fuori schermo non
         deve tradursi in uno scatto in avanti al rientro */
      ultimoIstante = 0;
      requestAnimationFrame(passo);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (voci) {
        voci.forEach(function (v) {
          dentro = v.isIntersecting;
          if (dentro) avvia();
        });
      }, { rootMargin: '120px 0px' }).observe(giostra);
    }

    function passo(istante) {
      if (!dentro) { inMoto = false; return; }
      requestAnimationFrame(passo);
      var salto = ultimoIstante ? istante - ultimoIstante : 0;
      ultimoIstante = istante;
      if (!larghezzaGruppo) { misura(); return; }

      /* se lo scorrimento e' cambiato per mano di qualcun altro
         (swipe, rotella, tastiera) si riparte da dove l'ha lasciato */
      if (Math.abs(pista.scrollLeft - impostato) > 1) posizione = pista.scrollLeft;

      if (!fermo && salto > 0 && salto < 200) {
        posizione += VELOCITA * salto / 1000;
      }
      if (posizione >= larghezzaGruppo) posizione -= larghezzaGruppo;
      else if (posizione < 0) posizione += larghezzaGruppo;

      pista.scrollLeft = posizione;
      /* Non si rilegge scrollLeft dopo averlo scritto: quella rilettura
         costringeva il browser a ricalcolare l'impaginazione due volte
         nello stesso fotogramma, per ogni carosello. Il valore appena
         assegnato lo conosciamo gia; il browser puo arrotondarlo di una
         frazione di pixel, ben sotto la soglia di 1px del controllo qui
         sopra. */
      impostato = posizione;
    }
    avvia();
  });



  /* ---------- domande frequenti ----------

     I <details> funzionano gia' da soli: si aprono, si chiudono, si
     raggiungono con Tab. Qui si aggiungono due cose sole:

     1) l'apertura e la chiusura si muovono invece di scattare;
     2) aprendone una si chiude quella rimasta aperta, cosi' l'elenco
        resta corto e non serve scorrere per tornare alle domande.

     L'animazione usa element.animate() e non una transizione CSS:
     piu' in basso in questo foglio c'e' una regola che spegne tutte
     le transizioni per chi chiede meno movimento, e se l'apertura
     dipendesse da quella resterebbe a meta' strada. */
  var domande = document.querySelectorAll('[data-faq]');
  if (domande.length && typeof document.createElement('details').animate === 'function') {
    var pigroFaq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* Curva morbida: parte piano e si posa piano. Quella usata altrove
       sul sito (.22, 1, .36, 1) scatta subito, e su un pannello che si
       apre sotto le dita sembra uno strappo invece di un'apertura. */
    var MOLLA = 'cubic-bezier(.32, .08, .24, 1)';

    /* Le parole vengono separate una volta sola, alla prima apertura:
       nell'HTML resta una frase normale, che si puo' leggere e
       copiare anche se il JavaScript non parte mai. Lo spazio resta
       fuori dai riquadri, altrimenti le righe andrebbero a capo in
       mezzo alle parole. */
    function separaParole(corpo) {
      if (corpo.getAttribute('data-separato')) return;
      var parole = corpo.textContent.split(' ');
      corpo.textContent = '';
      parole.forEach(function (p, i) {
        var s = document.createElement('span');
        s.className = 'faq__parola';
        s.textContent = p;
        corpo.appendChild(s);
        if (i < parole.length - 1) corpo.appendChild(document.createTextNode(' '));
      });
      corpo.setAttribute('data-separato', '1');
    }

    /* Le parole partono invisibili solo finche' la loro animazione le
       sta per far entrare (fill: backwards). Se quell'animazione non
       arrivasse mai in fondo — scheda in secondo piano, movimento
       interrotto — resterebbero invisibili per sempre: per questo
       poco dopo si passa a cancellarle, e cancellare un'animazione
       riporta la parola al suo stato naturale, cioe' visibile. */
    function mostraParole(risposta) {
      var corpo = risposta.querySelector('.faq__corpo');
      if (!corpo) return;
      separaParole(corpo);
      var parole = corpo.querySelectorAll('.faq__parola');
      var mosse = [];
      Array.prototype.forEach.call(parole, function (p, i) {
        mosse.push(p.animate(
          [{ opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0)' }],
          { duration: 420, delay: 60 + i * 30, easing: 'ease-out', fill: 'backwards' }
        ));
      });
      clearTimeout(corpo.reteParole);
      corpo.reteParole = setTimeout(function () {
        mosse.forEach(function (m) { if (m.playState !== 'finished') m.cancel(); });
      }, 60 + parole.length * 30 + 420 + 700);
    }

    function apriFaq(d) {
      var risposta = d.querySelector('.faq__risposta');
      clearTimeout(d.reteChiusura);
      d.inChiusura = false;
      d.open = true;
      if (pigroFaq || !risposta) return;
      var alto = risposta.scrollHeight;
      risposta.animate(
        [{ height: '0px', opacity: 0 }, { height: alto + 'px', opacity: 1 }],
        { duration: 520, easing: MOLLA }
      );
      mostraParole(risposta);
    }

    function chiudiFaq(d) {
      var risposta = d.querySelector('.faq__risposta');
      if (pigroFaq || !risposta) { d.open = false; return; }
      if (d.inChiusura) return;
      d.inChiusura = true;

      var alto = risposta.scrollHeight;
      var mossa = risposta.animate(
        [{ height: alto + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
        { duration: 400, easing: MOLLA }
      );

      /* L'attributo si toglie a movimento finito, altrimenti il
         contenuto sparirebbe prima di essersi richiuso. Ma non ci si
         affida solo a quello: se il movimento non finisce, dopo poco
         si chiude lo stesso, altrimenti la domanda resterebbe aperta
         e non si riuscirebbe piu' a chiuderla. */
      function conclusa() {
        if (!d.inChiusura) return;
        d.inChiusura = false;
        d.open = false;
      }
      mossa.onfinish = conclusa;
      clearTimeout(d.reteChiusura);
      d.reteChiusura = setTimeout(conclusa, 1300);
    }

    Array.prototype.forEach.call(domande, function (d) {
      var testa = d.querySelector('.faq__domanda');
      if (!testa) return;
      testa.addEventListener('click', function (e) {
        e.preventDefault();
        if (d.open) { chiudiFaq(d); return; }
        Array.prototype.forEach.call(domande, function (altra) {
          if (altra !== d && altra.open) chiudiFaq(altra);
        });
        apriFaq(d);
      });
    });
  }

})();
