import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { SignaturePadModule } from 'angular2-signaturepad';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


import { AppComponent } from './app.component';
import { ListComponent } from './admin/list/list.component';
import { ParteComponent } from './admin/parte/parte.component';
import { NuevoParteComponent } from './nuevo-parte/nuevo-parte.component';
import { environment } from '../environments/environment';

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
registerLocaleData(localeEsAr, 'es');


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ParteComponent,
    NuevoParteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SignaturePadModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxMaterialTimepickerModule.setLocale('es')
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
