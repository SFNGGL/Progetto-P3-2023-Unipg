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
    public db: AngularFirestore
    ) {} //In questo modo possiamo utilizzare il modulo http tramite la variabile.
  
  ngOnInit(): void {
    
  }

  private autolocate(uri: string) {
    return `${FirebaseService.path}${uri}.json`
  }
  
  // Inserimento
  insertScore(body: Score) {
    // return this.http.post(url, body);
    // FirebaseService.id_list.push(body['id'])
    return this.http.post(this.autolocate("punteggio"), body)
  }
  
  // Get
  // per get specifici: url_DB/id_schema.json <---
  retrieveScore(){
    return new Promise<any>((resolve) => {
      this.db.collection(this.scoresCollection)
      .valueChanges()
      .subscribe(score => resolve(score))
    });
  }

  async retrieveScoreByEmail(email: string) {
    return (
      await new Promise<any>((resolve) => {
        this.db.collection(
          this.scoresCollection,
          ref => ref.where('email', '==', email)
            .limit(1)
        )
        .valueChanges()
        .subscribe(score => resolve(score))
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
        .snapshotChanges()
        .subscribe(score => resolve(score))
      })
    )[0].payload.doc.id;
  }

  async getDocByEmail(email: string) {
    let id = await this.retrieveIdByEmail(email);
    return this.db.collection(
      this.scoresCollection,
      ref => ref.where('email', '==', email)
        .limit(1)
      )
      .doc(id)
  }

  // Rimozione singola
  async deleteScoreByEmail(email: string){
    try {
      (await this.getDocByEmail(email)).delete()
    } catch {
      console.log(`Unable to delete score related to ${email}`)
    }
  }

  // Rimozione totale
  async deleteAllScores() {
    let collection = await this.retrieveScore();
    collection.forEach( (element: any) => {
      this.deleteScoreByEmail(element.email); // Un pò inefficiente, ma non ce ne preoccupiamo
    });
  }

  async updateHighscore(newScore: Score) {
    try{
      let doc = await this.getDocByEmail(newScore.email);
      await doc.update(newScore);
    } catch { // Da verificare se esiste una specie di "upsert"
      await this.db.collection(this.scoresCollection).add(newScore);
    }
  }
}