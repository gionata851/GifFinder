import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { QueryService } from '../query.service';
import { Igif, Ipayload } from '../utilities/interfaces';
import { getLocaleFirstDayOfWeek } from '@angular/common';


@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.css']
})

export class ResultsViewComponent implements OnInit {
  //ricezione evento di ricerca
  @Input() riceviSegnaleLancio = new EventEmitter();
  //parola di ricerca passata dal componebnte searchbar
  @Input() searchKeyword: string;
  //le gif ottenute con le api
  gifs: Igif[] | undefined;
  //l'evenntuale gif cliccata di cui vedere il dettaglio
  gifToPass: Igif | undefined;
  //la posizione Y al momento del clic, da ripristinare quando si torna in lista
  scrollYMemory: number;
  //booleano per definire se siamo in dettaglio, inizialmente a false (siamo in lista)
  detailMode: boolean;
  //il result della chiamata alla api
  queryResult: Ipayload | undefined;

  constructor(private qs: QueryService) {
    this.scrollYMemory = 0;
    this.detailMode = false;
    this.gifToPass = undefined
    this.searchKeyword = '';
    this.queryResult = undefined
  }

  //metodo per passare al dettaglio
  showDetail(clickedGif: Igif) {
    //mi ricordo la posizione Y
    this.scrollYMemory = scrollY;
    //valorizzo la gif, che verrà trasmessa al componente di dettaglio, nel template
    this.gifToPass = clickedGif
    //metto detail a true
    this.detailMode = true;
    //il detail a true nasconde la lista e visualizza il dettaglio
  }

  //metodo per tornare in lista
  toListMode() {
    //detail a false
    this.detailMode = false;
    //con questo set timeout, mi assicuro che il componente lista è tornato visibile, e rimetto lo scroll Y memorizzato
    setTimeout(() => {
      scroll(0, this.scrollYMemory);
    }, 500);
  }

  launchSearch() {
    this.detailMode = false;
    scroll(0, 0);
    this.qs.search(this.searchKeyword).subscribe((result: Ipayload) => {
      /*       console.log('Payload:');
            console.log(result); */
      this.queryResult = result;
      if (this.queryResult.data) this.gifs = this.queryResult.data;
      console.log(this.gifs);
    });
  }

  ngOnInit() {

    this.riceviSegnaleLancio.subscribe(() => {
      this.launchSearch();
    })

    //event listener per aggiungere gif quando si arriva alla fine dello scroll
    document.addEventListener('scroll', () => {

      //se le gif sono state caricate
      if (this.gifs && this.gifs.length > 0) {

        //e se ci avvicianiamo ad almeno 100 pixel dalla fine della pagina
        if (scrollY + innerHeight + 100 >= document.documentElement.scrollHeight) {

          //lanciamo la nuova query di ricerca per aggiungere gifs
          this.qs.addToResearh().subscribe((result: Ipayload) => {

            if (result.data && result.data.length > 0) {
              this.gifs = this.gifs?.concat(result.data);
              console.log(this.gifs);
              /* //le nuove gif le mandiamo anche al servizio
              this.qs.updatedquery.emit(result.data); NON PIù*/
            }
          });
        }
      }
    });

  }
}
