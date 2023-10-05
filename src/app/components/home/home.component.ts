import { Component } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../../servizi/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private auth: AuthService, private router: Router) { }

  public options = [
    'Gioca',
    'Opzioni',
    'Esci'
  ]

  public credits = 'Stefano Gigli - Esame di programmazione 3 - Unipg - 2023'

  isLogin() { return this.auth.isLoggedIn }

  isAdmin() { return this.auth.isAdmin }

  getEMail() { return this.auth.userEmail }

  login() { this.router.navigate(['login']) }

  game() { this.router.navigate(['game']) }

  logout() { this.auth.logout() }

}
