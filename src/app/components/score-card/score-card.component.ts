import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent {
  @Input() email: string;
  @Input() score: string;
  @Input() placement: string;
}
