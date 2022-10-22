import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {StyleClassModule} from 'primeng/styleclass';
import { AppRoutingModule } from './app-routing.module';
import { PrimeNgModule } from './primeModule/prime-ng.module';
import { FirebaseModule } from './fireModule/firebase.module';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from '../app/auth/auth.module';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StyleClassModule,
    PrimeNgModule,
    AppRoutingModule,
    RouterModule,
    PagesModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FirebaseModule,
    provideFunctions(() => getFunctions()),
    AngularFireFunctionsModule 
  ],
  providers: [AuthService,MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
