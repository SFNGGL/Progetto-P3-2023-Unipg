import { GameComponent } from '../game/game.component';
import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../../servizi/auth.service";
import { FirebaseService } from "src/app/servizi/firebase.service";
import { Score } from '../../servizi/score.form';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-endscreen',
  templateUrl: './endscreen.component.html',
  styleUrls: ['./endscreen.component.css']
})
export class EndscreenComponent implements OnInit{
  
  public info : Score = {
    email: this.game.player_info,
    car: this.game.car,
    highscore: this.game.score
  }
  all_emails : any = [];
  all_players : any = [];

  constructor (
    private auth : AuthService,
    private router : Router,
    private game : GameComponent,
    private db : FirebaseService
  ) {}

  async ngOnInit(): Promise<void> {

    // prendi gli account salvati
    /*this.db.retrieveScore().subscribe((data : any) => {
      Object.keys(data).map((key : any) => {
        this.all_emails.push(data[key]['email']);
        this.all_players[data[key]['email']] = data[key];
      })
      console.log('Emails\n' + this.all_emails);
      console.log('Players\n' + this.all_players);
    })
    // controlla se l'utente e' gia' presente
    // test
    this.auth.userEmail = 'hello@login.com';
    console.log('Email\n' + this.auth.userEmail);
    for (let index = 0; index < this.all_emails.length; index++) {
      const mail = this.all_emails[index];
      if (this.auth.userEmail == mail) {
        // trovato
        console.log(this.auth.userEmail, 'è nel db');
      } else {
        console.log("l'utente ", this.auth.userEmail, " non e' nel db")
      }
    }*/
  }
}