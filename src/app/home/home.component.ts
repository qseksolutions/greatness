import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CoinService } from '../coin.service';
import * as myGlobals from './../global';
import { defer } from 'q';
import { Observable } from 'rxjs/Observable';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DecimalPipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Chart } from 'angular-highcharts';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CoinService, DecimalPipe],
})
export class HomeComponent implements OnInit {

  private toasterService: ToasterService;
  public base_url: any = myGlobals.base_url;
  chart : any;
  i : 0;
  resonce : any = [];
  chartdata: any = ['10, 5, 15, 16, 24, 20, 30, 32, 33, 35, 33, 40, 71, 78, 39, 66', '5, 10, 15, 20, 25, 30, 35, 40, 60, 10, 50, 40, 80,  10, 100','15, 30, 50, 2, 20, 30, 20, 60, 40, 1, 60, 40, 90'];
  constructor(private coinservice: CoinService, private router: Router, private http: Http, toasterService: ToasterService, private title: Title, private meta: Meta, private decimalpipe: DecimalPipe ) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    for (let data of this.chartdata) {
      this.chart = new Chart({
        chart: {
          type: 'spline',
          margin: [0, 0, 0, 0],
          backgroundColor: 'transparent',
          width: 150,
          height: 25,
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        xAxis: {
          labels: {
            enabled: false
          },
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          title: {
            text: null
          },
          startOnTick: false,
          endOnTick: false,
          tickPositions: [],
        },
        yAxis: {
          endOnTick: false,
          startOnTick: false,
          lineWidth: 0,
          lineColor: 'transparent',
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          tickPositions: []
        },
        legend: {
          enabled: false
        },
        tooltip: {
          shadow: false,
          useHTML: true,
          hideDelay: 0,
          shared: true,
          borderWidth: 1,
          padding: 5,
          backgroundColor: '#ffffff',
          headerFormat: '',
          pointFormat: '<b style="z-index : 999999">${point.y}</b>',
          positioner: function (w, h, point) {
            return { x: point.plotX - w / 2, y: point.plotY - h };
          }
        },
        plotOptions: {
          series: {
            animation: false,
            lineWidth: 2,
            shadow: false,
            color: '#00362d',
            states: {
              hover: {
                lineWidth: 3
              }
            },
            marker: {
              radius: 1,
              states: {
                hover: {
                  radius: 2
                }
              }
            },
          },
          column: {
            negativeColor: '#000000',
            borderColor: '#000000'
          }
        },
        exporting: { enabled: false },
        series: [{
          name: '$',
          data: data,
        }],
      });
      this.resonce[this.i]['customchart'] = this.chart;
      this.i++;
    }
  }
}
