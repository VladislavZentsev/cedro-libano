# Le 12 foto — pubblicate il 3 settembre 2026

Queste sono le foto **scelte e pubblicate**: il sito le usa tutte. Da ognuna
sono stati generati 6 file in `img/` (avif, webp e jpg, in due misure).
Restano qui come sorgenti a piena risoluzione.

Il nome prima di `__` dice **dove va** la foto.

## Galleria (6 riquadri)

| File | Riquadro | Scelta fra | Perché questa |
|---|---|---|---|
| `g-tavolo__tavolo-dallalto.png` | mezze da condividere | 2 versioni | Luce più direzionale e legno più caldo; l'altra era più piatta |
| `g-servizio__tavolo-servito.png` | durante il servizio | 2 versioni | Tonalità più calde e il braccio in alto a sinistra meno invadente |
| `g-mezze__vassoio-mezze.png` | il vassoio delle mezze | 2 versioni | Il vassoio riempie meglio l'inquadratura e la luce calda in alto è più ampia |
| `g-brace__spiedini-brace.png` | sulla brace | 2 versioni | La brace accesa si vede davvero: racconta il metodo di cottura |
| `g-sera__sala-sera.jpeg` | la sera | 2 versioni | Tavolo e legno riportati sul caldo, luci colorate mantenute |
| `storia__sala-ingresso.png` | (sezione Storia) | 2 versioni | Nessun LED viola acceso, tutto in ambra — coerente col sito |

## Carta dei vini (6 schede)

`vino-1__reserve-du-couvent` · `vino-2__le-prieure` · `vino-3__blanc-perle`
`vino-4__sunset-rose` · `vino-5__blanc-de-blancs` · `vino-6__petit-noir`

Sono una **serie unica**: stesso fondo, stessa luce, stessa composizione.
Sono state pubblicate tutte e sei insieme, come doveva essere.

## Le versioni scartate

Stanno in `../01-foto-sito/alternative/`, con il suffisso `-B`. Il passaggio è
fatto, ma tienile ancora un po': se guardando il sito una scelta non convince,
la riserva è lì e si sostituisce in un minuto.

## Apertura del sito — chiusa

Due tentativi prima di arrivarci. Il primo (rigenerazione libera, "come ti
pare") non piaceva — piatti diversi, disposizione diversa. Il secondo,
con la regola *migliora, non reinventare* applicata alla foto vera
`tavola-mezze.webp`, ha funzionato: `hero__mezze-spread.jpeg` (16:9, per
schermo largo) e `hero__mezze-spread-mobile.png` (4:5, per telefono) sono
**online dal 4 settembre 2026**.

Fra le due versioni verticali generate, scelta quella con le patate a
cubetti (`hero__mezze-spread-mobile.png`): è fedele alla foto vera, che le
ha così. L'altra le aveva trasformate in patate intere — una piccola
infedeltà che il prompt vietava esplicitamente.

Le versioni scartate restano in `../01-foto-sito/alternative/`:
`hero__mezze-spread-A.png`/`-B.png` (il primo tentativo) e
`hero__mezze-spread-mobile-B.png` (le patate intere).

## Fascia del menù — chiusa

Stesso trattamento della foto vera `kafta-pita.webp`: due versioni
generate, entrambe senza cornice, come chiedeva il prompt. Scelta
`piatto__kafta-pita.png` — spazio libero uguale sui due lati, ramo
d'ulivo intero; l'altra aveva il piatto più schiacciato a destra e il
ramo tagliato dal bordo. **Online dal 4 settembre 2026.**

La scartata è in `../01-foto-sito/alternative/piatto__kafta-pita-nuova-B.png`.

## La fascia video della brace — foto allargata a 16:9

Il video generato la prima volta (da `g-brace__spiedini-brace.png`, 4:3) aveva
le bande nere ai lati: il generatore video non allarga davvero la scena, si
limita a incollare la foto stretta dentro una tela più larga. Soluzione in
due passaggi — prima allargare la **foto**, poi animare quella già larga.

Otto tentativi di allargamento (ChatGPT, "Extend"/generico, Firefly con Flux
e con Gemini Flash), tutti a partire dalla stessa foto vera. Scelta
`g-brace__spiedini-brace-16-9.png` (una delle tre di ChatGPT): controllando i
bordi sinistro e destro ingranditi, è l'unica dove la brace resta accesa e
uniforme fino al margine, senza cali di luce né cambi di texture. Le altre
due di ChatGPT erano quasi identiche ma con la carne troppo vicina al bordo
sinistro (una, rischioso per l'effetto di apertura del video) o un angolo
leggermente spento (l'altra). Le due "Extend" avevano una fiammella isolata
senza motivo in alto a destra; le due Firefly cambiavano visibilmente
texture delle braci verso il bordo destro.

Questa foto allargata è il **primo fotogramma** da caricare per generare il
video (vedi il prompt strutturato che hai già). Le sette scartate sono in
`../01-foto-sito/alternative/g-brace__spiedini-brace-16-9-B-*`.

I quattro tentativi di video già generati con Kling/Flow dalla vecchia foto
4:3 (`googleflow_1-4.mp4`) sono stati rimossi: partivano da un fotogramma
ormai superato, rigenerare da capo con la foto 16:9 costa meno che sistemarli.

## Gli originali veri

In `../01-foto-sito/originali-veri/` ci sono gli scatti autentici del locale,
quelli da cui sono nate le versioni migliorate. **Non si cancellano mai**:
sono l'unica cosa che nessuna IA può rifare.
