import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { ToasterModule } from 'angular2-toaster';
import { HttpClient,HttpClientModule } from "@angular/common/http";
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TimeAgoPipe } from 'time-ago-pipe';

import highstock from 'highcharts/modules/stock.src';
import exporting from 'highcharts/modules/exporting.src';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CoinComponent } from './coin/coin.component';

export function highchartsModules() {
    return [ highstock, exporting ];
}

@NgModule({
  imports:      [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'cryptocurrency/:any',
        component: CoinComponent,
        pathMatch: 'full'
      }
    ]),
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ChartModule,
    ToasterModule,
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CoinComponent,
    TimeAgoPipe
  ],
  providers: [HttpClient,TranslateModule,
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
