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
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css'],
  providers: [CoinService, DatePipe],
})
export class CoinComponent implements OnInit {

  private toasterService: ToasterService;
  

  chart: StockChart;
  spiderchart: Chart;
  coin : any;
  market_cap: any;
  price_usd: any;
  volume_usd: any;

  constructor(private coinservice: CoinService, private router: Router, toasterService: ToasterService, private http: Http, private titleService: Title, private datePipe: DatePipe, private meta: Meta) {
    this.toasterService = toasterService;
    localStorage.setItem('sorton', null);
    localStorage.setItem('sortby', null);
  }

  ngOnInit() {
    let curl = window.location.pathname;
    let spliturl = curl.split('/');
    let coin = spliturl[2];
    this.coinservice.getsingledata(coin).subscribe(resData => {
      console.log(resData);
      if (resData.status === true) {
        this.coin = resData.data;
        this.spiderchart = new Chart({
          chart: {
            polar: true,
            type: 'area',
            backgroundColor: 'transparent',
          },
          credits: {
            enabled: false
          },
          title: {
            text: '',
            style: {
              display: 'none'
            }
          },
          exporting: {
            buttons: {
              contextButton: {
                enabled: false
              },
            }
          },
          /* pane: {
            size: '80%'
          }, */
          xAxis: {
            categories: ['Team Experience', 'Theoritical Soundness', 'Total Addressable Market', 'Technological Progress', 'Traction', 'Transformative Potential', 'Token Economics', 'Timing'],
            tickmarkPlacement: 'on',
            lineWidth: 0
          },
          yAxis: {
            tickInterval: 1
          },
          /* tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}"> : <b>{point.y:,.0f}</b></span>'
          }, */
          
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          series: [{
            name: 'Data',
            data: [this.coin.team, this.coin.theory, this.coin.tam, this.coin.technology, this.coin.traction, this.coin.transformative, this.coin.token, this.coin.timing],
            color: '#04b290'
          }]
        });
      }
      else {
        this.coin =  '';
      }
    });
    this.graphone();    
  }

  graphone() {
    const curl = window.location.pathname;
    let spliturl = curl.split('/');
    let coin = spliturl[2];
    this.coinservice.signlecoingraph('year',coin).subscribe(response => {
      if (response.status == true) {
        this.market_cap = response.data.market_cap_by_available_supply;
        this.price_usd = response.data.price_usd;
        this.volume_usd = response.data.volume_usd;
        this.chart = new StockChart({
          title: {
            text: '<span style="text-transform:capitalize;">' + coin + ' Price Chart </span>',
            align: 'left',
            style: {
              display: 'none'
            }
          },
          exporting: {
            buttons: {
              contextButton: {
                enabled: false
              },
              exportButton: {
                enabled: false
              }
            }
          },
          rangeSelector: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          // legend: {
          //   enabled: true,
          //   layout: 'horizontal',
          //   verticalAlign: 'bottom',
          //   itemStyle: {
          //     color: '#00362d',
          //   }
          // },
          xAxis: {
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            crosshair: {
              zIndex: 22,
              color: '#04b290'
            },
          },
          plotOptions: {
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            area : {
              threshold: null,
            },
          },
          yAxis:[
            {
              title: {
                text: "Price in USD",
                style: {
                  color: '#04b290'
                }
              },
            },
            /* {
              title: {
                text: "Market Cap",
                style: {
                  color: '#7cb5ec'
                }
              },
              labels: {
                align: 'left',
                x: 0,
                y: -5
              },
              opposite: false,
            }, */
          ],
          chart: {
            backgroundColor: 'transparent'
          },
          series: [
            {
              name: 'Price in USD',
              type: 'area',
              color: '#04b290',
              data: this.price_usd,
              /* area : {
                threshold: null,
              }, */
              tooltip: {
                shared: false,
                backgroundColor: 'rgba(247,247,247,0.85)',
                borderColor: '#04b290',
                valueDecimals: 2,
                valuePrefix: '$',
                valueSuffix: ''
              },
              fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, 'rgba(44, 191, 162, 1)'],
                  [1, 'rgba(228, 247, 243, 1)']
                ]
              },
              yAxis: 0,
            },
            /* {
              name: 'Market Cap',
              type: 'area',
              color: '#7cb5ec',
              data: this.market_cap,
              tooltip: {
                shared: false,
                backgroundColor: 'rgba(247,247,247,0.85)',
                borderColor: '#7cb5ec',
                valueDecimals: 0,
                valuePrefix: '$',
                valueSuffix: ''
              },
              fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, 'rgba(81, 164, 240, 1)'],
                  [1, 'rgba(226, 239, 251, 1)']
                ]
              },
              yAxis: 1,
            } */
          ]
        });
      }
    });
  }

  isImage(src) {
    const deferred = defer();
    const image = new Image();
    image.onerror = function () {
      deferred.resolve(false);
    };
    image.onload = function () {
      deferred.resolve(true);
    };
    image.src = src;
    return deferred.promise;
  }

  errorHandler(event, name) {
    const imgurl = 'assets/images/currency-25/' + name.toLowerCase() + '.png';
    this.isImage(imgurl).then(function (test) {
      // tslint:disable-next-line:triple-equals
      if (test == true) {
        return event.target.src = imgurl;
      } else {
        return event.target.src = 'assets/images/currency-25/not-found-25.png';
      }
    });
  }
}
