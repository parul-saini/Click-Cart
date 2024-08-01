import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { ForemailComponent } from './foremail/foremail.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterationComponent,
    ResetpassComponent,
    ForemailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right'
      }
    ), // ToastrModule added
    HttpClientModule,
    MatIconModule,

  ],
  providers: [ provideAnimations(), // required animations providers
    provideToastr()],// Toastr providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
