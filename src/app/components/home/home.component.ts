import { Component } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../../servizi/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private auth: AuthService, private router: Router) {
  }

  public footer_credits = 'Stefano Gigli - Esame di programmazione 3 - Unipg - 2023'

  isLogin() { return this.auth.isLoggedIn }

  isAdmin() { return this.auth.isAdmin }

  getEMail() { return this.auth.userEmail }

  goToLogin() { this.router.navigate(['login']) }

  game() {
    // if (!this.isLogin()) {
    //   alert("Per favore, eseguire il login")
    //   return
    // }
    this.router.navigate(['game'])
  }

  logout() {
    this.auth.logout()
    this.router.navigate([''])
  }

  endscreen() { this.router.navigate(['endscreen']); }

  register() { this.router.navigate(['register']); }

  options() { this.router.navigate(['options']) }

}
