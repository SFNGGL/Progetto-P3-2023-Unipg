import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { MenuComponent } from "./components/menu/menu.component";
import { LoginComponent } from "./components/login/login.component";
import { GameComponent } from "./components/game/game.component";
import { EndscreenComponent } from "./components/endscreen/endscreen.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { OptionsComponent } from './components/options/options.component';
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'game', component: GameComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'endscreen', component: EndscreenComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
