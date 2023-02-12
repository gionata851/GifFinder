import { Component,  OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { payload, gif } from '../utilities/interfaces';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  queryResult : payload | undefined;
  gifs : gif[] | undefined;
  searchKeyword : string = '';



  constructor(private qs : QueryService){ }

  ngOnInit(): void {
    //se il servizio ha già gifs ricarico quelle,
    //quindi per prima cosa mi iscrivo agli eventi che mi fanno avere le gifs
    this.qs.sendingGifs.subscribe((receivedGifs : gif[]) => {
      console.log('gifs ricevute dal servizio');
      this.gifs = receivedGifs;
    });
    this.qs.sendingKeyword.subscribe((receivedKeyword : string) =>{
      this.searchKeyword = receivedKeyword;
    });

    //poi chiedo se ci sono gifs
    this.qs.askForGifs.emit(false);

  }

  launchSearch(){
    scroll(0,0);
    this.qs.search(this.searchKeyword).subscribe( (result : payload) => {
      this.queryResult = result;
      if(this.queryResult.data) this.gifs=this.queryResult.data;
      this.qs.insertquery.emit(this.gifs);
    });
  }

  orderByUplTime(){
    this.qs.receivedUplTime.emit(false);
  }

  getFavorites(){
    this.qs.sendingFavs.emit(false);
  }

/*   orderByRating(){
    console.log('order della searchbar partito');
    this.qs.receivedRating.emit(false);
  }
  //iniziato ma poi mi sono accorto che i rating non sono proprio in ordine alfabetico
  */



}
