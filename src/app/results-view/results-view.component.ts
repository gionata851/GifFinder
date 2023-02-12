import {  Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { QueryService } from '../query.service';
import { gif, payload } from '../utilities/interfaces';


@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.css']
})

export class ResultsViewComponent implements OnInit,OnDestroy{
  @Input() gifs : gif[] | undefined;

  scrollYMemory : number;


  constructor(private qs : QueryService){
    this.scrollYMemory = 0;
  }

  ngOnInit(){
    //event listener per aggiungere gif quando si arriva alla fine dello scroll
    document.addEventListener('scroll', (e) => {
      //per prima cosa, mi segno lo scrollY
      this.scrollYMemory = scrollY;

      //se le gif sono state caricate
      if(this.gifs && this.gifs.length>0){

        //e se ci avvicianiamo ad almeno 100 pixel dalla fine della pagina
        if(scrollY + innerHeight + 100 >= document.documentElement.scrollHeight){

          //lanciamo la nuova query di ricerca per aggiungere gifs
          this.qs.addToResearh().subscribe((result : payload) => {

            if(result.data && result.data.length > 0){
              this.gifs = this.gifs?.concat(result.data);
              //le nuove gif le mandiamo anche al servizio
              this.qs.updatedquery.emit(result.data);
            }
          });
        }
      }
    });



  }

  ngOnDestroy(): void {
    //prima dell'eliminazione del componente, mandiamo lo scroll al servizio
    this.qs.sendingScroll.emit(this.scrollYMemory);

  }


}
