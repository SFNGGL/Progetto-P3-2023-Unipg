import * as p5 from 'p5';
import "p5/lib/addons/p5.sound"
import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../../servizi/auth.service";
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
@Injectable({ providedIn: 'root' })
export class GameComponent implements OnInit {
  // public functions go here

  constructor(
    private auth: AuthService, private router: Router
  ) {
  }

  player_info : any = this.auth.userEmail;
  car : string = "Car";
  score: number = 0;

  ngOnInit(): void {

    let button_1 : any;
    let button_2 : any;
    let score_display : any;
    let end : boolean = false;

    const sketch = (s: any) => {

      s.preload = () => {
        // preload code
      }

      s.setup = () => {
        s.createCanvas(400, 400);
        button_1 = s.createButton('click me', 'white');
        button_1.position(s.width, s.height - 150);
        button_2 = s.createButton('submit', 'black');
        button_2.position(s.width, s.height - 100);

        button_1.mousePressed(() => {
          if (this.score < 0) {this.score = 0;}
          this.score++;
        })

        button_2.mousePressed(() => {
          alert('Hai totalizzato: ' + this.score);
          // this.router.navigate(['endscreen']);
          end = true;
        })

        score_display = s.createP("Your score is " + this.score);
        score_display.style("background-color", "white");

        button_1.parent("buttons");
        button_2.parent("buttons");
        score_display.parent("score");

      }

      s.draw = () => {
        // gioco
        // a fine mandare dentro endscreen
        // this.router.navigate(['endscreen'])

        if (end) {
          s.clear();
          this.router.navigate(['endscreen']);
        }

        s.background(51);

        s.push();
        
        score_display.html("Your score is" + this.score)

        s.pop();

      }
    }
    let canvas = new p5(sketch)
  }

  // this.car_c.car

}
