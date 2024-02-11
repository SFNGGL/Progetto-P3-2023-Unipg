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
  constructor(
    private auth: AuthService, private router: Router
  ) {
  }

  player_info : any = this.auth.userEmail;
  car : string = "Car";
  score: number = 0;
  timer : number = 30;

  private save() {
    localStorage.setItem('currentGame', JSON.stringify({
      email: this.player_info,
      car: this.car,
      highscore: this.score
    }))
  }

  ngOnInit(): void {

    if (!this.auth.isLoggedIn) {
      this.router.navigate(['']);
      return;
    }

    let timerInterval: any = undefined;

    const sketch = (s: any) => {
      let coin: Coin;
      let car: Car;

      class Coin {
        x: number;
        y: number;

        constructor(x: number, y: number) {
          this.x = x;
          this.y = y;
        }

        display() {
          s.fill("yellow");
          s.rect(this.x, this.y, 10, 10);
        }
      }

      class Car {
        cColor: string;
        x: number;
        y: number;
        maxX: number;
        maxY: number;
        step: number;
        color: string;
        coins: number;
        xDim: number;
        yDim: number;
        horizontal: boolean;
        move: boolean;
        dX: number;
        dY: number;
        constructor(
          cColor: string,
          x: number,
          y: number,
          maxX: number,
          maxY: number,
          step: number) {
          this.color = cColor;
          this.x = x;
          this.y = y;
          this.maxX = maxX;
          this.maxY = maxY;
          this.step = step;
          this.coins = 0;
          this.xDim = 20;
          this.yDim = 10;
          this.horizontal = true;
          this.move = false;
          this.dX = 0;
          this.dY = 0;
        }

        display() { // method!
          s.fill(this.color);
          if(this.horizontal) {
            this.xDim = 20;
            this.yDim = 10;
          }
          else {
            this.xDim = 10;
            this.yDim = 20;
          }
          s.rect(this.x, this.y, this.xDim, this.yDim);
        }

        up() {
          this.dX = 0;
          this.dY = -1 * this.step;
          this.horizontal = false;
        }

        down() {
          this.dX = 0;
          this.dY = this.step;
          this.horizontal = false;
        }

        left() {
          this.dX = -1 * this.step;
          this.dY = 0;
          this.horizontal = true;
        }

        right() {
          this.dX = this.step;
          this.dY = 0;
          this.horizontal = true;
        }

        update() {
          if (this.move) {
            this.x = (this.x + this.dX) % this.maxX;
            if (this.x < 0) this.x += this.maxX;

            this.y = (this.y + this.dY) % this.maxY;
            if (this.y < 0) this.y += this.maxY;
          }
        }

        start() {
          this.move = true;
        }

        stop() {
          this.move = false;
        }
      }

      s.preload = () => {
        // preload code
      }

      function getRndInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

      function checkCoin() {
        if(collideRectRect(car.x, car.y, car.xDim, car.yDim, coin.x, coin.y, 10, 10)) {
          car.coins++;
          coin = new Coin(getRndInteger(0, 380), getRndInteger(0, 380));
        }
      }

      function collideRectRect(
        x: number,
        y: number,
        w: number,
        h: number,
        x2: number,
        y2: number,
        w2: number,
        h2: number) {
        return (x + w >= x2 &&
            x <= x2 + w2 &&
            y + h >= y2 &&
            y <= y2 + h2);
      };

      s.setup = () => {
        s.createCanvas(400, 400).parent('game');
        coin = new Coin(getRndInteger(0, 380), getRndInteger(0, 380));
        car = new Car("silver", getRndInteger(0, 380), getRndInteger(0, 380), 400, 400, 5);
      }

      s.draw = () => {
        if (this.timer <= 0) {
          s.clear();
          clearInterval(timerInterval);
          this.timer = 30;
          this.router.navigate(['endscreen']);
        }

        s.background("green");
        car.update();
        coin.display();
        car.display();
        checkCoin();
        this.score = car.coins;
        this.save();
      }

      s.keyPressed = () => {
        if (timerInterval == undefined) {
          /* Timer non accuratissimo, per ottenere un risultato migliore usare dei delta. setInterval
           * ripete l'esecuzione della funzione presa come primo argomento ad ogni tick scandito dalla
           * tempistica in millisecondi specificata come secondo argomento */
          timerInterval = setInterval(() => {
            if(this.timer > 0) this.timer--;
          }, 1000);
        }
        if (s.keyIsDown(s.LEFT_ARROW)) {
          car.left();
        } else if (s.keyIsDown(s.RIGHT_ARROW)) {
          car.right();
        } else if (s.keyIsDown(s.UP_ARROW)) {
          car.up();
        } else if (s.keyIsDown(s.DOWN_ARROW)) {
          car.down();
        }
        car.start();
      }

      s.keyReleased = () => {
        car.stop();
      }
    }
    let canvas = new p5(sketch);
  }
}
