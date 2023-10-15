import * as p5 from 'p5';
import "p5/lib/addons/p5.sound"
import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { VehiclesComponent } from "../vehicles/vehicles.component";
import { FunctionalitiesComponent } from "../functionalities/functionalities.component";
import { EndscreenComponent } from "../endscreen/endscreen.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  // public functions go here
  // 947

  private FRICTION = 0.004;
  private ACCELERATION = 15;
  private GRAVITY = -0.2;
  private CAR_EXP_LATENCY = -150;
  private EXP_LETAL_TIME = 150;
  private SQRT = Math.sqrt(2);
  private TIME = 91;

  img = {};
  sound = {};
  seicento: any;
  courseMap: any = undefined;

  nemici: any;
  cars: any;
  explosions: any;
  bullets: any;
  pgDied = false;
  seicentoLoaded = false;
  dontDraw = false;
  slider: any = null;
  onlyWinOnce = false;
  timer: any;
  vecchiSpawnTimer: any;
  stop: any;

  constructor(
    public car_c: VehiclesComponent,
    public func_c: FunctionalitiesComponent,
    public endscreen: EndscreenComponent
  ) {
    this.img = {};
    this.sound = {};
    this.seicento;
    this.courseMap = undefined;

    this.nemici;
    this.cars;
    this.explosions;
    this.bullets;
    this.pgDied = false;
    this.seicentoLoaded = false;
    this.dontDraw = false;
    this.slider = null;
    this.onlyWinOnce = false;
    this.timer;
    this.vecchiSpawnTimer;
    this.stop;
  }

  ngOnInit(): void {
    const sketch = (s: any) => {

      s.preload = () => {
        // preload code
      }

      s.setup = () => {
        s.createCanvas(400, 400);
      }

      s.draw = () => {
        s.background(51);
        s.rect(100, 100, 100, 100);
      }
    }
    let canvas = new p5(sketch)
  }

  // this.car_c.car

}
