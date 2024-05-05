import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QueryService } from '../query.service';
import { Ipayload, Igif, IkeyEvent } from '../utilities/interfaces';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  queryResult: Ipayload | undefined;
  gifs: Igif[] | undefined;
  searchKeyword: string = '';

  //l'idea è di far prendere alla results view questo evento per partire con la ricerca
  @Output() emettiSegnaleLancio = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

    //nella init poniamo l'event listener per far funzionare l'invio (che fa la stessa cosa del pulsante Go!)
    document.addEventListener('keypress', (e: IkeyEvent) => {
      if (e.key == 'Enter') {
        this.launchSearchEvent();
      }
    });
  }

  //il pulsante "Go!" (o l'invio) lancia questa funzione
  launchSearchEvent() {
    this.emettiSegnaleLancio.emit();
  }

}


/*cose obsolete/sospese{
 /*   orderByUplTime() {
      this.qs.receivedUplTime.emit(false);
    } */

/*   getFavorites() {
    this.qs.sendingFavs.emit(false);
  } */

/*   orderByRating(){
    console.log('order della searchbar partito');
    this.qs.receivedRating.emit(false);
  }
  //iniziato ma poi mi sono accorto che i rating non sono proprio in ordine alfabetico

}*/
