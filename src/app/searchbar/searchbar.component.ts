import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QueryService } from '../query.service';
import { Payload, gif, keyEvent } from '../utilities/interfaces';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  queryResult: Payload | undefined;
  gifs: gif[] | undefined;
  searchKeyword: string = '';

  //l'idea è di far prendere alla results vie questo evento per partire con la ricerca
  @Output() emettiSegnaleLancio = new EventEmitter();


  constructor(private qs: QueryService) { }

  ngOnInit(): void {

    document.addEventListener('keypress', (e: keyEvent) => {
      if (e.key == 'Enter') {
        this.launchSearchEvent();
      }
    });


  }

  //il pulsante "Go!" lancia questa funzione
  launchSearchEvent() {
    console.log('launchsearchevent emessa');
    this.emettiSegnaleLancio.emit();
  }

  //funzione per far fare la search al componente results view







}


/*cose obsolete{
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
