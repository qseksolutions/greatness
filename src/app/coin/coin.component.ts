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

declare var $;

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css'],
  providers: [CoinService, DatePipe],
  styles: [ ` .masonry-item { width: 200px; } ` ]
})
export class CoinComponent implements OnInit {

  private toasterService: ToasterService;

  chart: StockChart;
  spiderchart: Chart;
  techchart: StockChart;
  coin : any;
  market_cap: any;
  price_usd: any;
  volume_usd: any;
  base_curr: any;
  base_sign: any;
  base_price: any;
  ceodata: any;
  gitdata: any;
  commitdata: any;
  socialdata: any;


  constructor(private coinservice: CoinService, private router: Router, toasterService: ToasterService, private http: Http, private titleService: Title, private datePipe: DatePipe, private meta: Meta) {
    $('.header_part').hide();
    $('.header_part').removeClass('collapse show');
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip();
    }, 2000);

    this.toasterService = toasterService;

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.base_curr = localStorage.getItem('base_curr');
    this.base_sign = localStorage.getItem('base_sign');
    this.base_price = localStorage.getItem('base_price');
    if (this.base_curr == null) {
      localStorage.setItem('base_curr', 'USD');
      localStorage.setItem('base_sign', '$');
      localStorage.setItem('base_price', '1');
      this.base_curr = localStorage.getItem('base_curr');
      this.base_sign = localStorage.getItem('base_sign');
      this.base_price = localStorage.getItem('base_price');
    }
    localStorage.setItem('sorton', null);
    localStorage.setItem('sortby', null);
  }
  public loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'assets/js/custom.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
  ngOnInit() {
    this.loadScript();
    let curl = window.location.pathname;
    let spliturl = curl.split('/');
    let coin = spliturl[2];
    this.coinservice.getsingledata(coin).subscribe(resData => {
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
          xAxis: {
            categories: ['Team Experience', 'Theoritical Soundness', 'Total Addressable Market', 'Technological Progress', 'Traction', 'Transformative Potential', 'Token Economics', 'Timing'],
            tickmarkPlacement: 'on',
            lineWidth: 0
          },
          yAxis: {
            tickInterval: 1
          },
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
        this.coinservice.coinsociallink(this.coin.symbol).subscribe(resData => {
        // this.coinservice.coinsociallink('DOGE').subscribe(resData => {
          if (resData.status == true) {
            this.socialdata = resData.data;
            if (resData.data.facebook != '') {
              this.socialdata.facebook = JSON.parse(resData.data.facebook)
            }
            if (resData.data.reddit != '') {
              this.socialdata.reddit = JSON.parse(resData.data.reddit)
            }
            if (resData.data.twitter != '') {
              this.socialdata.twitter = JSON.parse(resData.data.twitter)
            }
          }
        });
      }
      else {
        this.coin =  '';
      }
    });
    this.coinservice.getcoinceolist(coin).subscribe(resData => {
      if (resData.status == true) {
        this.ceodata = resData.data;
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
                split: false,
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
          ]
        });
      }
    });
    this.coinservice.getgitdata(coin).subscribe(resData => {
      if (resData.status == true) {
        this.gitdata = resData.data;
        this.commitdata = resData.data.commits_progress;
        let commitarray = this.commitdata.split(',');
        let totalcommit = 0;
        let graphcommit = [];
        let i = 7;
        let j = 7;
        commitarray.map(function (val, key) {
          totalcommit+= parseInt(val);
          if (key == 0) {
            var d = new Date();
            var cdate = d.getTime();

            var d = new Date();
            d.setDate(d.getDate() - 7);
            var week = d.getTime();
          }
          else {
            var d = new Date();
            d.setDate(d.getDate() - i);
            var cdate = d.getTime();

            i = i+7;
            j = j+7;

            var d = new Date();
            d.setDate(d.getDate() - j);
            var week = d.getTime();
          }
          // graphcommit[key] = { '0': parseInt(val), '1': cdate + '-' + week};
          graphcommit[key] = [cdate,parseInt(val)];
        });

        this.gitdata['totalcommit'] = totalcommit;
        this.commitdata = graphcommit;
        this.techchart = new StockChart({
          chart: {
            height: 150,
            backgroundColor: 'transparent'
          },
          title: {
            text: 'Development Activity'
          },
          subtitle: {
            text: ''
          },
          exporting: {
            enabled: false
          },
          rangeSelector: {
            enabled: false
          },
          navigator: {
            enabled: false
          },
          xAxis: {
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            crosshair: {
              zIndex: 22,
              color: '#04b290'
            },
          },
          yAxis: [
            {
              title: {
                text: ''
              },
              labels: {
                enabled: false
              },
              gridLineWidth: 0,
              minorGridLineWidth: 0,
            },
          ],
          credits: {
            enabled: false
          },
          scrollbar: {
            enabled: false
          },
          tooltip: {
            formatter: function () {
              // tslint:disable-next-line:max-line-length
              return '<span style="font-size:11px;font-weight:bold;color:#04B290;margin-bottom:10px;">' + moment.unix(this.x / 1000).startOf('week').format('MMM Do ') + '-' + moment.unix(this.x / 1000).endOf('week').format(' MMM Do YYYY') + '</span><br/><span style="">Commits: <b>' + this.y + '</b></span>';
            },
          },
          series: [
            {
              name: '',
              type: 'area',
              color: '#04b290',
              data: this.commitdata,
              // pointInterval: 7 * 24 * 36e5,
              // pointStart: Date.UTC(2015, 0, 7),
              yAxis: 0,
            },
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
    const imgurl = 'assets/images/currency-50/' + name.toLowerCase() + '.png';
    this.isImage(imgurl).then(function (test) {
      // tslint:disable-next-line:triple-equals
      if (test == true) {
        return event.target.src = imgurl;
      } else {
        return event.target.src = 'assets/images/currency-50/not-found-50.png';
      }
    });
  }
}
