//Questo servizio è specifico per l'autorizzazione degli utenti


import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin: boolean = false
  isLoggedIn = false
  userEmail: string = ''

  //Inniettiamo il pacchetto nel costruttore
  constructor(
    private fireauth: AngularFireAuth, 
    private db: FirebaseService,
    private router: Router, 
    private firestore: AngularFirestore) { 
    }

  //MetodoLogin
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(async () => {          //Metodo che accede ad un istanza già esistente
      localStorage.setItem('token', 'true')                                          //Crea l'item nello store locale del browser
      this.isLoggedIn = true
      this.userEmail = email                                                          //Salva la mail solo se l'utente è salvato
      if (await this.checkIfAdmin()) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      console.log("Il login è andato a buon fine, email: " + this.userEmail)
      this.router.navigate([''])                                                    //Mi riporta alla home dopo il login
    }, err => {
      alert('Oops! Qualcosa è andato storto!')                                      //Messaggio di errore nel caso di mancato login
      this.router.navigate(['/login'])                                              //Mi riporta alla pagina di login
    })
  }

  //MetodoRegister
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {      //Metodo che crea un nuovo utente
      alert('Registrazione avvenuta con successo!')                                 //Alert di avvenuta creazione
      this.router.navigate(['/login'])                                              //Reindirizzamento alla pagina di login per accedere
    }, err => {
      alert('Oops! Qualcosa è andato storto!')                                      //Messaggio di errore nel caso di mancata registrazione
      this.router.navigate(['/register'])                                           //Mi riporta alla pagina di register
    })
  }

  //MetodoLogOut
  logout() {
    this.fireauth.signOut().then(() => {                                           //Metodo che esce dalla sessione corrente dell'utente
      localStorage.removeItem('token')                                              //Rimuove l'item inserito nel login nel local s. del browser
      this.router.navigate(['/login'])                                              //Riporta alla pagina di login
      this.isLoggedIn = false
      this.isAdmin = false
      this.userEmail = ''
      console.log("Il logout è andato a buon fine, email: " + this.userEmail)
    }, err => {
      alert('Oops! Qualcosa è andato storto!')                                      //Messaggio di errore nel caso di mancato logout
    })
  }


  getUserInfoSave() {
    this.fireauth.authState.subscribe(user => {
      if (user) {
        console.log('Utente autenticato:', user);
        this.saveUserInfo(user)
        // this.user = user
        // Ora si possono salvare queste informazioni nel Firestore se necessario
      } else {
        console.log('Nessun utente autenticato');
        // this.user = null
      }
    });
  }

  saveUserInfo(user: any) {
    const userData = {
      name: user.displayName,
      email: user.email
      // Altre informazioni dell'utente che vengono salvate
    };

    // Crea o aggiorna il documento utente nel Firestore
    this.firestore.collection('users').doc(user.uid).set(userData, { merge: true }) //Grazie a doc() ottengo un riferimento specifico all'interno della raccolta
      .then(async () => {
        console.log('Informazioni utente salvate con successo in Firestore');
      })
      .catch(error => {
        console.error('Errore nel salvataggio delle informazioni utente:', error);
      });
  }

  checkMail(mail : string) {
    if (mail == 'admin@admin.com') {
      return true;
    } else {
      return false;
    }
  }

  // Funzione per verificare se il campo "isAdmin" esiste ed è true
  async checkIfAdmin() {
    return 'fGPqAWaDayRT0qVOazhVU7CEUOE3' === (await this.fireauth.currentUser)!.uid;
  }
}
