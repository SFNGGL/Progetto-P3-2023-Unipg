import { GameComponent } from '../game/game.component';
import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../../servizi/auth.service";
import { FirebaseService } from "src/app/servizi/firebase.service";
import { Score } from '../../servizi/score.form';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-endscreen',
  templateUrl: './endscreen.component.html',
  styleUrls: ['./endscreen.component.css']
})
export class EndscreenComponent implements OnInit{

  public info : Score = JSON.parse(localStorage.getItem('currentGame')!); // Siamo sicuri che a questo punto dell'esecuzione currentGame sia impostato
  public scores: any = [];
  public isNewHighscore: boolean = false;

  constructor (
    private db : FirebaseService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.scores = await this.db.retrieveScore();

    let old_score = await this.db.retrieveScoreByEmail(this.info.email);
    if (old_score === undefined || this.info.highscore > old_score.highscore) {
      this.isNewHighscore = true;
      await this.db.updateHighscore(this.info);
    }
  }
}