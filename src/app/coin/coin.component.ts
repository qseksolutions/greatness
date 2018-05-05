import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CoinService } from '../coin.service';
import * as myGlobals from './../global';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { StockChart } from 'angular-highcharts';
import { defer } from 'q';
import { DatePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css'],
  providers: [CoinService, DatePipe],
})
export class CoinComponent implements OnInit {

  private toasterService: ToasterService;

  chart: StockChart;

  constructor(private coinservice: CoinService, private router: Router, toasterService: ToasterService, private http: Http, private titleService: Title, private datePipe: DatePipe, private meta: Meta) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
  }
}
