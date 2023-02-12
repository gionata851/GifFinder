import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { gif, payload } from './utilities/interfaces'

//questo servizio si occupa dell'interrogazione della API e della comunicazione delle gif tra componenti

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  //la mia key GIPHY
  myApiKey : string = 'C20oRHVX0L4F0ibYRvyyyCKFzR6emGYT';

  //variabile "magazzino" per ricordare l'ultima keyword ricercata
  storedKeyword : string;

  //variabile "magazzino" per non perdere la memoria delle gif cercate
  storedGifs : gif[] | undefined

  //gifs preferite
  favGifs : gif[];

  //contatore per aggiornare correttamente l'offset all'aggiornamento della videata
  n : number;

  //memoria dello scrollY
  scrollYmemory : number;

  //evento per popolare il magazzino gifs
  insertquery = new EventEmitter<gif[]>();
  updatedquery = new EventEmitter<gif[]>();

  //eventi per mandare il magazzino gif, se già presneti, agli altri componenti
  askForGifs = new EventEmitter<boolean>();
  sendingGifs = new EventEmitter<gif[]>();
  sendingKeyword = new EventEmitter<string>();
  sendingScroll = new EventEmitter<number>();

  //eventi per richiedere e comunicare la gif cliccata per attivare la vista detail
  receivedId = new EventEmitter<string>();
  sendingGif = new EventEmitter<gif>();

  //eventi per ordinare per upload time -- ATTENZIONE: deciso di ordinare per import_datetime perchè upload_datetime è dichiarato sul loro sito ma in realtà non è presente negli oggetti gif ottenuti.
  receivedUplTime = new EventEmitter<boolean>();

  //evento per ordinare per rating
  receivedRating = new EventEmitter<boolean>();

  //evento per collezionare i preferiti
  receivedFav = new EventEmitter<gif>();

  //e per visualizzare i preferiti
  sendingFavs = new EventEmitter<boolean>();

  //evento per segnalare che la gif detail è tra i preferiti
  sendingIsFav = new EventEmitter<boolean>();


  //istanziamo il modulo http nel costruttore
  constructor(private http : HttpClient) {
    this.storedGifs = undefined;
    this.storedKeyword = '';
    this.n = 0;
    this.scrollYmemory = 0;
    this.favGifs = [];

    //iscrizione per popolare la variabile magazzino a ogni nuova ricerca
    this.insertquery.subscribe((newgifs : gif[]) => {
      this.storedGifs = newgifs;
    });

    //iscrizione per "aggiornare" la variabile magazzino delle gif con le nuove aggiunte
    this.updatedquery.subscribe((gifs : gif[]) => {
      if(this.storedGifs === undefined) this.storedGifs = [];
      this.storedGifs = this.storedGifs.concat(gifs);
    });

    //iscrizione per mandare i preferiti
    this.sendingFavs.subscribe((b : boolean) => {
      console.log('get fav ricevuto');
      this.storedGifs = this.favGifs;
      console.log('storedgifs: ',this.storedGifs);
      this.sendingGifs.emit(this.storedGifs);
      this.storedKeyword = '';
      this.sendingKeyword.emit(this.storedKeyword);
    });

    //immagazzinamento dello scroll
    this.sendingScroll.subscribe((receivedScroll : number) => {
      this.scrollYmemory = receivedScroll;
    });

    //il componente searchbar mi può chiedere se ci sono gif già caricate, in tal caso gliele mando
    this.askForGifs.subscribe((b : boolean) => {
      if(this.storedGifs && this.storedGifs?.length > 0){
        b = true;
        this.sendingGifs.emit(this.storedGifs);
        this.sendingKeyword.emit(this.storedKeyword);
        setTimeout(() => {
          scroll(0,this.scrollYmemory);
        }, 200);
      }
    });

    //ricezione id e spedizione gif al componente detail
    this.receivedId.subscribe((receivedId : string) => {
      if(this.storedGifs){
        const chosenGif = this.storedGifs.find(gif => gif.id === receivedId);
        if(chosenGif){
          this.sendingGif.emit(chosenGif);
          console.log('favgifsmap: ',this.favGifs.map( g => g.id));
          console.log('chosengif id: ',chosenGif.id);
          if(this.favGifs.map( g => g.id).includes(chosenGif.id) ){
            console.log('è una favorite, evento partito');
            this.sendingIsFav.emit(true);
          }
        }
      }
    });

    //richiesta di ordinamento per upload time
    this.receivedUplTime.subscribe((b : boolean) => {
      this.storedGifs?.sort((a:gif,b:gif) => {
        return new Date(b.import_datetime).getTime() - new Date(a.import_datetime).getTime()
      });
      this.sendingGifs.emit(this.storedGifs);
    });

    //push nei preferiti
    this.receivedFav.subscribe((favgif : gif) => {
      this.favGifs.push(favgif);
    });

      /*this.receivedRating.subscribe((b : boolean) => {
      console.log('ordine di sorting per rating ricevuto dal servizio');
      this.storedGifs?.sort((a:gif,b:gif) => {
        return (a.rating.charCodeAt(0)) - (b.rating.charCodeAt(0));
      });
      this.sendingGifs.emit(this.storedGifs);
    });
    //iniziato ma poi accorto che i rating non sono in ordine alfabetico
    */

  }

  //metodo search per eseguire la chiamata alla API.
  search(keyword : string): Observable<payload>{
    let result : Observable<payload> = this.http.get<payload>(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${this.myApiKey}&limit=20`);
    //mi ricordo della keyword
    this.storedKeyword = keyword;
    //e metto a 4 il contatore
    //perchè a 4? perchè il primo caricamento consiste in 20 gifs (limit=20), mentre l'aggiornamento sarà di 5 in 5
    this.n = 4;
    return result;
  }

  //metodo addToResearch per eseguire l'aggiornamento durante lo scroll
  addToResearh() : Observable<payload>{
    let result : Observable<payload>;
    if(this.storedKeyword !== ''){
      result = this.http.get<payload>(`http://api.giphy.com/v1/gifs/search?q=${this.storedKeyword}&api_key=${this.myApiKey}&offset=${5*this.n}&limit=5`);
      this.n++;
    }
    else{
      result = of();
    }
    return result;
  }


}
