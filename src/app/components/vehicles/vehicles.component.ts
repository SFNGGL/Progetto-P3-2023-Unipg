import * as p5 from 'p5';
import "p5/lib/addons/p5.sound"
import { Component } from '@angular/core';
import { FunctionalitiesComponent } from "../functionalities/functionalities.component";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {

  constructor() { }

  car = class Car {

  }

  wheels = class Wheels {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    a: number;
    angle: number;
    constructor(
      x: number,
      y: number,
      r: number
    ) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.vx = 1;
      this.vy = 1;
      this.a = 0;
      this.angle = 0;
    }
  }

}

