import { Injectable, OnInit, importProvidersFrom } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Score } from "../servizi/score.form";

@Injectable({
  providedIn: 'root'
})

//Servizio Firebase per la comunicazione con il database
export class FirebaseService implements OnInit{

  // Variabile della classe: usa FireBaseService.path_to_DB
  // e NON firebase.path_to_DB o qualcosa del genere
  // Nota: questo url dev'essere SEMPRE completato con
  // '/<nome scheda presente nel db>'.json

  static path_to_DB = 'https://progettoweb3-33de4-default-rtdb.europe-west1.firebasedatabase.app';
  static path = 'https://progettoweb3-33de4-default-rtdb.europe-west1.firebasedatabase.app/'
  static id_list : number[] = [];
  private scoresCollection: string = 'scores';

  constructor(
    private http: HttpClient,
    public db: AngularFirestore // Oggetto utilizzato per effettuare query al firestore
    ) {} //In questo modo possiamo utilizzare il modulo http tramite la variabile.
  
  ngOnInit(): void {
    
  }
  
  /* Restituisce una promise che si risolve con un array di oggetti rappresentanti
   * i punteggi dei vari giocatori registrati */
  retrieveScore(){
    return new Promise<any>((resolve) => {
      this.db.collection(
        this.scoresCollection, // Nome della collezione per la quale si deve effettuare la query
        ref => ref.orderBy('highscore', 'desc') // Ordinamento decrescete in riferimento all'highscore
      )
      .get() // Restituisce un oggetto observable, sul quale è possibile sottoscrivere un metodo che viene eseguito ad ogni aggiornamento dello stesso
      .subscribe(
        score => resolve( // Il metodo sottoscritto risolve la promise con il valore atteso
          /* I dati interessati possono essere ottenuti mediante il metodo `data` dei singoli elementi
           * restituiti in seguito alla query */
          score.docs.map((doc) => doc.data())
        )
      )
    });
  }

  async retrieveScoreByEmail(email: string) {
    return (
      await new Promise<any>((resolve) => {
        this.db.collection(
          this.scoresCollection,
          ref => ref.where('email', '==', email) // Filtraggio effettuato mediante il campo `email` del documento
            .limit(1) // Ci si assicura che venga restituito un solo risultato
        )
        .get()
        .subscribe(
          score => resolve(
            score.docs.map((doc) => doc.data())
          )
        )
      })
    )[0];
  }

  async retrieveIdByEmail(email: string) {
    return (
      await new Promise<any>((resolve) => {
        this.db.collection(
          this.scoresCollection,
          ref => ref.where('email', '==', email)
            .limit(1)
        )
        .get()
        .subscribe(
          score => resolve(
            score.docs.map((doc) => doc.id) // Invece del metodo `data` si usa il campo `id`, che riporta l'id del documento
          )
        )
      })
    )[0];
  }

  async getDocByEmail(email: string) {
    let id = await this.retrieveIdByEmail(email); // Si recupera l'id del documento mediante la mail
    return this.db.collection(
      this.scoresCollection,
      ref => ref.where('email', '==', email)
        .limit(1)
      )
      .doc(id) // Viene restituito il documento relativo alla mail inserita
  }

  // Rimozione singola
  async deleteScoreByEmail(email: string){
    try {
      (await this.getDocByEmail(email)).delete() // Viene restituito un riferimento al documento relativo alla mail e viene chiamato il metodo `delete`
    } catch {
      console.log(`Unable to delete score related to ${email}`)
    }
  }

  // Rimozione totale
  async deleteAllScores() {
    let collection = await this.retrieveScore();
    collection.forEach( (element: any) => {
      this.deleteScoreByEmail(element.email); // Si eliminano tutti gli score memorizzati
    });
  }

  async updateHighscore(newScore: Score) {
    try{ // Si cerca di aggiornare il documento relativo alla mail del giocatore con il nuovo punteggio
      let doc = await this.getDocByEmail(newScore.email);
      await doc.update(newScore);
    } catch { // Se il documento non esiste, questo viene aggiunto alla collezione
      await this.db.collection(this.scoresCollection).add(newScore);
    }
  }
}