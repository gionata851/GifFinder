//file con le interface utili al progetto

//l'interfaccia Payload rappresenta la risposta del server
export interface Ipayload {
  data: Igif[],
  meta: {
    status: number,
    msg: string
  },
}

//l'interfaccia gif rappresenta l'oggetto gif contenuto nel Payload
export interface Igif {
  id: string,
  url: string,
  embed_url: string,
  title: string,
  alt_text: string,
  source_tld: string,
  import_datetime: string,
  trending_datetime: string,
  rating: string,

  images: {
    fixed_height: {
      url: string, //da usare questo come url nel markup, altrimenti si ha errore CORB
      width: string,
      mp4: string
    },
    fixed_height_small: {
      url: string,
      width: string,
      mp4: string
    },
    downsized: {
      url: string,
      width: string,
      height: string
    },
    original: {
      url: string,
      mp4: string,
      webp: string,
      width: string,
      height: string
    }
  }

  user: {
    display_name: string,
    avatar_url: string,
    profile_url: string
  }
}

export interface IkeyEvent {
  key: string
}
