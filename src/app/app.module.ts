import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { SignaturePadModule } from 'angular2-signaturepad';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './admin/list/list.component';
import { ParteComponent } from './admin/parte/parte.component';
import { NuevoParteComponent } from './nuevo-parte/nuevo-parte.component';


import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es';
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
    AppRoutingModule,
    SignaturePadModule,
    HttpClientModule,
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
