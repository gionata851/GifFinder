import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Igif } from '../utilities/interfaces';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

//la classe implementa onchanges per tracciare il fatto che la selected gif è cambiata
export class detailComponent implements OnChanges {
  //gif cliccata ricevuta dal componente lista
  @Input() selectedGif: Igif | undefined;
  //oggetto con cui valorizziamo l'ngStyle della gif
  ngStyleObject: Object | undefined;
  //tranding e favorite
  isTrending: boolean;
  isFavorite: boolean;


  @Output() listModeEvent = new EventEmitter();

  constructor() {
    this.selectedGif = undefined;
    this.ngStyleObject = undefined;
    this.isTrending = false;
    this.isFavorite = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //se la gif selezionata non è nulla
    if (this.selectedGif) {
      //valorizzo ngStyle
      this.ngStyleObject = {
        width: this.selectedGif.images.original.width + 'px',
        height: this.selectedGif.images.original.height + 'px'
      };
      //e is trending va a true se è finita nei trending da meno di un anno
      this.isTrending = (new Date()).getTime() - (new Date(this.selectedGif.trending_datetime)).getTime() < 31536000000;
    }
  }

  emitBack() {
    this.listModeEvent.emit();
  }

  openInNewTab(urlToOpen?: string) {
    urlToOpen ? window.open(urlToOpen, "_blank") : "";
  }

  copyToClipboard(textToCopy?: string) {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      alert("copied!");
    }

  }

}

/*cose obsolete o sospese
{
         /*     this.qs.sendingIsFav.subscribe((b: boolean) => {
          this.isFavorite = true;
        }); */

//mi iscrivo all'evento di invio gif cliccata, PROBABILMENTE NON SERVE PIù, COMMENTATO
/*     this.qs.sendingGif.subscribe((receivedGif: gif) => {
 this.selectedGif = receivedGif;
 this.ngStyleObject = {
   width: this.selectedGif.images.original.width + 'px',
   height: this.selectedGif.images.original.height + 'px'
 };


}); */

//dopodichè chiedo al servizio di mandarmi la gif con id pari al parametro del paramMap - IDEM
/*     let id: string = this.ar.snapshot.paramMap.get('id') || '';
    this.qs.receivedId.emit(id);


/*   sendToFavs() {
  this.qs.receivedFav.emit(this.selectedGif);
  this.isFavorite = true;
}

}
*/
