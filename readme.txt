
Progetto GifFinder

Il progetto è composto da 
- un file 'interface.ts' con le interfacce utili
- un servizio "query service"
- un componente "searchbar"
- un componente "results-view"
- un componente "detail"

Il servizio "query service" contiene i metodi utili a interrogare il server giphy (principalmente due: metodo per la prima query, e metodo per le query di "aggiunta" quando si raggiunge la fine dello sroll verticale). Inoltre contiene vari eventi utili a immagazzinare le gif e a comunicarle ai componenti quando richiesto.
Il componente searchbar contiene la barra di input e il pulsante per lanciare la prima query, oltre che i pulsanti per mettere in ordine di data e consultare i preferiti.
Il componente results-view contiene la flexbox principale che mostra i risultati della ricerca. Nella classe del componente c'è anche l'event listener che permette di eseguire le query di aggiunta.
Quando si clicca su una gif il routing indirizza verso il componente detail, in cui c'è la gif a grandezza originale e i vari dati utili. Inoltre c'è un piccolo segnale verse se la gif è stata "trending" nell'ultimo anno, e infine c'è un pulsante che permette di salvare la gif nei preferiti.

Quando con l'apposito pulsante si torna al componente results-view, il servizio ripropone al componente le gif già caricate e la posizione di scrollY al momento in cui avevamo cliccato.

Purtroppo non sono riuscito a realizzare la funzionalità dei preferiti che vengono mantenuti anche dopo l'aggiornamento della pagina. La mia idea era quella di usare una immagine docker per simulare un database e un piccolo backend. Non sono riuscito con i tempi.

Il codice è provvisto di vari commenti che illustrano più nel dettaglio i vari passaggi.


Per eseguire il progetto, allego lo zip con tutti i file della cartella del progetto angular, ad eccezione di 'node_modules' e '.angular', per motivi di spazio. Di seguito le versioni usate.

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 15.0.5
Node: 18.12.1
Package Manager: npm 9.2.0
OS: win32 x64

Angular: 15.1.4
... animations, cdk, common, compiler, compiler-cli, core, forms
... material, platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1501.5
@angular-devkit/build-angular   15.1.5
@angular-devkit/core            15.1.5
@angular-devkit/schematics      15.0.5
@angular/cli                    15.0.5
@schematics/angular             15.0.5
rxjs                            7.5.7
typescript                      4.8.4


L'unica dipendenza rilevante probabilmente è l'angular material.

A disposizione per chiarimenti e a presto.

