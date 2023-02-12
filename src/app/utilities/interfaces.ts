//file con le interface utili al progetto

//l'interfaccia payload rappresenta la risposta del server
export interface payload{
  data : gif[],
  meta : {
    status : number,
    msg : string
  },
}

//l'interfaccia gif rappresenta l'oggetto gif contenuto nel payload
export interface gif{
  id : string,
  url : string,
  embed_url : string,
  title : string,
  alt_text : string,
  source_tld : string,
  import_datetime : string,
  trending_datetime : string,
  rating : string,

  images : {
    fixed_height : {
      url : string, //da usare questo come url nel markup, altrimenti si ha errore CORB
      width: string
    },
    original : {
      url : string,
      mp4 : string,
      webp : string,
      width : string,
      height: string
    }
  }

  user : {
    display_name: string,
    avatar_url: string
  }
}
