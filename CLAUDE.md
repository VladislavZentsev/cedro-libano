# Cedro del Libano — istruzioni per chi lavora su questo sito

@AI-RULES.md

## Cos'è questo progetto

Sito statico di un ristorante libanese nella Darsena di Savona.
HTML, CSS e JavaScript scritti a mano: **nessun framework, nessuna
libreria, nessuna dipendenza esterna a runtime**. È una scelta, non una
mancanza — e va mantenuta.

- `index.html` / `index-en.html` — le due lingue, tenute allineate riga
  per riga. Ogni modifica a una va fatta anche all'altra.
- `style.css` — foglio unico.
- `script.js` — interazioni. `menu.js` — i dati del menù e il loro render.
- `.htaccess` — compressione, cache, intestazioni di sicurezza (CSP).

## Regole di questo progetto

**Niente risorse esterne.** Nessun CDN, nessun Google Fonts, nessun
widget, nessuno script di terze parti. I caratteri sono self-hosted per
il GDPR. La CSP nel `.htaccess` è stretta apposta (`'self'` e basta,
senza `unsafe-inline`): aggiungere una risorsa esterna significa
allentarla, quindi va deciso, non fatto di sfuggita.

**I commenti sono documentazione.** Sono in italiano e spiegano *perché*,
non *cosa*. Chi mette mano al sito dopo non è detto sia un programmatore.
Non vanno tolti per "pulizia" e il codice non va minificato: con brotli
tutto il sito pesa 59 KB, la minificazione guadagnerebbe pochi KB al
prezzo della leggibilità.

**Lo stato di partenza è sempre quello sicuro.** Il CSS non deve mai
lasciare contenuto invisibile in attesa che il JavaScript lo mostri: se
lo script non parte, il testo deve restare leggibile. Le animazioni
aggiungono, non nascondono.

**`prefers-reduced-motion` va rispettato ovunque.** È già gestito in
undici punti fra CSS e JS: ogni effetto nuovo deve prevederlo.

**`_archivio-foto/` non va né sul server né in git.** Contiene oltre
500 MB di sorgenti. È ignorata; sul sito vanno solo le versioni
ottimizzate in `img/`.

**Strumenti temporanei.** `sharp` e `ffmpeg-static` si installano quando
servono e si disinstallano subito dopo: `node_modules/` e `package.json`
non vanno mai committati.

## Verificare prima di dire che è fatto

Il server locale è in `.claude/launch.json` (`node .claude/serve.js`,
porta 8756) e manda le stesse intestazioni del `.htaccess`, CSP compresa.

Attenzione: nel pannello di anteprima `requestAnimationFrame`,
l'IntersectionObserver, le transizioni CSS e gli stili calcolati si
congelano quando la finestra non viene disegnata, e uno screenshot forza
un disegno. Se una misura dà un valore assurdo, forzare prima un
disegno e rileggere — non è (sempre) un bug del sito.
