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
      this.db.collection('scores')
      .valueChanges()
      .subscribe(score => resolve(score))
    });
  }

  async retrieveScoreByEmail(email: string) {
    return (
      await new Promise<any>((resolve) => {
        this.db.collection(
          'scores',
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
          'scores',
          ref => ref.where('email', '==', email)
            .limit(1)
        )
        .snapshotChanges()
        .subscribe(score => resolve(score))
      })
    )[0].payload.doc.id;
  }

  // Rimozione singola
  async deleteScoreByEmail(email: string){
    let id = await this.retrieveIdByEmail(email);
    this.db.collection(
      'scores',
      ref => ref.where('email', '==', email)
        .limit(1)
      )
      .doc(id)
      .delete();
  }

  // Rimozione totale
  async deleteAllScores() {
    let collection = await this.retrieveScore();
    collection.forEach( (element: any) => {
      this.deleteScoreByEmail(element.email); // Un pò inefficiente, ma non ce ne preoccupiamo
    });
  }

  // Modifica
  // updateMarble(id: number, body: Score){
  //   // return this.http.patch(`${url}/-${id}.json`, body)
  //   return this.http.patch(`${this.autolocate("marmi")}/-${id}.json`, body)
  // }

  // retrievePlayers(){
  //   return this.http.get(this.autolocate("ordini"))
  // }
  // insertOnePlayer(id: string){
  //   return this.http.get(this.autolocate("ordini/"+id))
  // }

  // insertPlayer(body: OrdineDB) {
  //   return this.http.post(this.autolocate("ordini"), body)
  // }

  // deletePlayer(id: string){
  //   return this.http.delete(this.autolocate("ordini/"+id))
  // }

  // deleteAllOrdini(){}

  // updatePlayer(id: string, body: OrdineDB){
  //   return this.http.patch(this.autolocate("ordini/"+id), body)
  // }
}