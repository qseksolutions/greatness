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
import { IonRangeSliderModule } from "ng2-ion-range-slider";

import highstock from 'highcharts/modules/stock.src';
import exporting from 'highcharts/modules/exporting.src';
import more from 'highcharts/highcharts-more.src';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CoinComponent } from './coin/coin.component';
import { CategoryComponent } from './category/category.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AdvancescannerComponent } from './advancescanner/advancescanner.component';

export function highchartsModules() {
    return [ highstock, exporting, more ];
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
        path: 'coins/:any',
        component: CoinComponent,
        pathMatch: 'full'
      },
      {
        path: 'category/:any',
        component: CategoryComponent,
        pathMatch: 'full'
      },
      {
        path: 'favorite',
        component: FavoritesComponent,
        pathMatch: 'full'
      },
      {
        path: 'advance-scanner',
        component: AdvancescannerComponent,
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
    IonRangeSliderModule
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CoinComponent,
    TimeAgoPipe,
    CategoryComponent,
    FavoritesComponent,
    AdvancescannerComponent
  ],
  providers: [HttpClient,TranslateModule,
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
