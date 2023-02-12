import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from '../query.service';
import { gif } from '../utilities/interfaces';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})


export class detailComponent implements OnInit{

  selectedGif : gif | undefined;
  ngStyleObject : Object | undefined;
  isTrending : boolean;
  isFavorite : boolean;

  constructor(private ar : ActivatedRoute, private qs : QueryService){
    this.selectedGif = undefined;
    this.ngStyleObject = undefined;
    this.isTrending = false;
    this.isFavorite = false;
  }

  ngOnInit(): void {

    this.qs.sendingIsFav.subscribe((b : boolean) => {
      this.isFavorite = true;
    });

    //mi iscrivo all'evento di invio gif cliccata
    this.qs.sendingGif.subscribe((receivedGif : gif)=>{
      this.selectedGif = receivedGif;
      this.ngStyleObject = {
        width : this.selectedGif.images.original.width + 'px',
        height : this.selectedGif.images.original.height + 'px'
      };
      //is trending va a true se è finita nei trending da meno di un anno
      this.isTrending = (new Date()).getTime() -  (new Date(this.selectedGif.trending_datetime)).getTime() < 31536000000;

    });

    //dopodichè chiedo al servizio di mandarmi la gif con id pari al parametro del paramMap
    let id : string = this.ar.snapshot.paramMap.get('id') || '';
    this.qs.receivedId.emit(id);




  }


  sendToFavs(){
    this.qs.receivedFav.emit(this.selectedGif);
    this.isFavorite = true;
  }

}
