# Archivio foto — Cedro del Libano

Il magazzino delle immagini sorgente. **Non va mai caricato sul server FTP**:
sul sito finiscono solo le versioni ottimizzate dentro `cedro-del-libano/img/`.
Tre protezioni impediscono che ci finisca per sbaglio — vedi
`NON-CARICARE-SUL-SERVER.md`.

Riordinato il 3 settembre 2026.

---

## Come è organizzato

| Cartella | Cosa contiene | Regola |
|---|---|---|
| `00-selezione-pronte/` | **Le 12 foto scelte, pronte da pubblicare.** Il nome dice dove va ognuna | Da qui si pesca per il passaggio sul sito |
| `01-foto-sito/originali-veri/` | Gli scatti autentici fatti nel locale | **Mai cancellare, mai rigenerare via.** Sono l'unica cosa che nessuna IA può rifare |
| `01-foto-sito/alternative/` | La versione B di ogni coppia | Riserva, finché il passaggio sul sito non è fatto e verificato |
| `01-foto-sito/marchio/` | I tre marchi di riferimento | Servono per i prompt di logo e favicon |
| `02-locandine/` | Le 15 locandine del ristorante | Fonte dei prezzi e dei piatti — è da qui che si controlla il menù |
| `99-backup-img-precedenti/` | Le immagini che c'erano prima del 3 settembre | Rete di sicurezza: si buttano quando il sito nuovo è confermato |
| `99-backup-codice-*/` | Due punti di ritorno del codice | `pre-airules` = prima della revisione; `pre-hero` = quello da cui è ripartita l'apertura |
| `generati/`, `gif/` | Materiale di lavoro delle sessioni | Nessun uso sul sito |
| `_da-cancellare/` | Roba superata | Si può buttare la cartella intera — vedi il suo LEGGIMI |

---

## 00-selezione-pronte — le 12 foto scelte

Il nome prima di `__` è **lo slot sul sito**: `g-*` sono i sei riquadri della
galleria, `vino-*` le sei schede della carta dei vini, `storia` la foto della
sezione "La nostra storia".

| File | Slot sul sito | Da dove viene |
|---|---|---|
| `g-tavolo__tavolo-dallalto.png` | Galleria, "mezze da condividere" | Rigenerata dallo scatto vero, 4:3, colori caldi |
| `g-servizio__tavolo-servito.png` | Galleria, "durante il servizio" | idem |
| `g-mezze__vassoio-mezze.png` | Galleria, "il vassoio delle mezze" | idem — risolve anche la bassa risoluzione dell'originale |
| `g-brace__spiedini-brace.png` | Galleria, "sulla brace" | Generata: sostituisce una foto trovata online che aveva il marchio di un altro |
| `g-sera__sala-sera.jpeg` | Galleria, "la sera" | Scatto vero migliorato |
| `storia__sala-ingresso.png` | Sezione "La nostra storia" | Scatto vero migliorato |
| `vino-1__reserve-du-couvent.png` | Château Ksara Réserve du Couvent 2020 | |
| `vino-2__le-prieure.png` | Château Ksara Le Prieuré 2020 | |
| `vino-3__blanc-perle.png` | Château Ksara Blanc Perle 2022 | |
| `vino-4__sunset-rose.png` | Château Ksara Sunset Rosé 2023 | |
| `vino-5__blanc-de-blancs.png` | Château Ksara Blanc de Blancs 2022 | |
| `vino-6__petit-noir.png` | Cave Kouroum Petit Noir 2016 | |

Le sei bottiglie sono una **serie unica**: stesso fondo, stessa luce, stesso
tipo di composizione. Vanno pubblicate tutte insieme, mai a metà.

**Tutte e 12 sono online dal 3 settembre 2026.** Da ognuna sono stati generati
6 file in `img/` — avif, webp e jpg, in due misure — per un totale di 72 file,
tutti verificati uno per uno.

Lo stesso giorno, più tardi, un primo tentativo per apertura e fascia
menù non è piaciuto ed è stato tornato indietro. Il 4 settembre, con la
regola *migliora, non reinventare*, sono state rifatte bene entrambe:
l'apertura (`hero__mezze-spread.jpeg` + `-mobile.png`, 15 file) e la
fascia del menù (`piatto__kafta-pita.png`, 6 file). **Tutte online.**
Nessuna foto del sito resta da fare.

---

## Cosa manca ancora

Le foto sono complete: nessuno slot del sito è scoperto. Quello che resta
riguarda i video, il marchio e il menù — l'elenco aggiornato sta nel Piano
Foto e Video, sezione "Cosa manca".
