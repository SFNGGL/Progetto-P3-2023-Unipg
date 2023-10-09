import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

// moduli NG
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// custom components
import { GameComponent } from './components/game/game.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { HomeComponent } from './components/home/home.component';
import { FunctionalitiesComponent } from './components/functionalities/functionalities.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from "./components/register/register.component";
import { MenuComponent } from './components/menu/menu.component';
import { EndscreenComponent } from "./components/endscreen/endscreen.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from "./servizi/auth.service";

// import di Angular Fire
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environments";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

// FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';

//Imports di angular material
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from "@angular/material/grid-list";
import { AngularSvgIconModule } from "angular-svg-icon";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { OptionsComponent } from './components/options/options.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    VehiclesComponent,
    HomeComponent,
    FunctionalitiesComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    EndscreenComponent,
    NotFoundComponent,
    OptionsComponent
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {
        appearance: 'outline',
        floatLabel: 'always'
      }
    }
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatGridListModule,
    AngularSvgIconModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    AngularSvgIconModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [AppRoutingModule]
})

export class AppModule { }
