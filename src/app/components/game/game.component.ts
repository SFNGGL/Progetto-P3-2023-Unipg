import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import "p5/lib/addons/p5.sound"
import "p5/lib/addons/p5.dom"

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  // public functions go here
  // 947

  private p5: any;

  ngOnInit(): void {
    this.createCanvas();
  }

  private createCanvas() {
    this.p5 = new p5(this.sketch);
  }

  private sketch(p: any) {
    p.setup = () => {
      p.createCanvas(700, 600);
    };

    p.draw = () => {
      p.background(255);
      p.fill(0);
      p.rect(p.width / 2, p.height / 2, 50, 50);
    };
  }
}
