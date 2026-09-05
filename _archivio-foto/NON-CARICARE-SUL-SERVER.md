# ⚠️ Questa cartella NON va caricata sul server

Sono i **file originali** delle foto e dei video: circa **300 MB**.
Sul sito ci vanno solo le versioni ottimizzate, che stanno in `../img/`.

Quando carichi il sito via FTP, **salta questa cartella** (`_archivio-foto`).
Il resto della cartella `cedro-del-libano` va caricato tutto.

Per sicurezza c'è anche una regola nel `.htaccess` che la rende irraggiungibile
dal web, nel caso venisse caricata per sbaglio.

---

## Cosa c'è dentro

| Cartella | Cosa contiene |
|---|---|
| `00-selezione-pronte/` | **Le 9 foto scelte e già pubblicate sul sito.** Il nome dice dove va ognuna (`storia__`, `g-brace__`, `vino-1__`…) |
| `01-foto-sito/` | Le foto sorgente, comprese le versioni scartate di ogni coppia (riserve) |
| `02-locandine/` | Le 15 locandine promozionali. Non sono foto da pubblicare: contengono i **dati di menù** |
| `generati/` | Immagini generate con l'IA nei vari tentativi |
| `gif/` | I 5 Reel di Instagram convertiti in GIF (213 MB — la parte più pesante) |
| `99-backup-img-precedenti/` | Le immagini del sito **prima** della sostituzione del 2 settembre. Se qualcosa non convince, si ripristina da qui |
| `ELENCO.md` | Il censimento originale dell'archivio |

## Le foto pubblicate sul sito

Il 2 settembre sono state sostituite 9 immagini, tutte in formato 4:3:

| Slot sul sito | File sorgente | Cosa è cambiato |
|---|---|---|
| Sezione "La nostra storia" | `storia__sala-ingresso.png` | Foto rigenerata: più nitida, tonalità ambra, niente LED viola |
| Galleria — brace | `g-brace__spiedini-brace.png` | **Sostituita la foto con la filigrana © thedeliciouscrescent** |
| Galleria — sera | `g-sera__sala-sera.jpeg` | Rigenerata: tolto il dominante viola, luci colorate mantenute |
| Vini 1-6 | `vino-N__*.png/jpeg` | Tutte e sei rifatte: fondo scuro, luce da still-life, formato 4:3 |
