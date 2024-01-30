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
  
  public info : Score = { // Volendo si potrebbe deserializzare anche nelle funzioni che fanno retrieve
    email: this.game.player_info,
    car: this.game.car,
    highscore: this.game.score
  }
  public scores: any = [];
  public isNewHighscore: boolean = false;

  constructor (
    private auth : AuthService,
    private router : Router,
    private game : GameComponent,
    private db : FirebaseService
  ) {}

  async ngOnInit(): Promise<void> {
    let old_score = await this.db.retrieveScoreByEmail(this.info.email);
    if (old_score === undefined || this.info.highscore > old_score.highscore) {
      this.isNewHighscore = true;
      await this.db.updateHighscore(this.info);
    }

    this.scores = await this.db.retrieveScore();
  }
}