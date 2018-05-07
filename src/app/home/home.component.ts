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
  chart: Chart;
  coindata : any;
  selectcol : any = [];
  column : any;
  active : any = 1;
  displaycolumn: any = ['rank', 'name', 'follow', 'price_usd', 'graph_7d', 'mc_usd', 'team', 'theory', 'technology', 'traction', 'tam', 'token', 'timing', 'trasformative', 'gq'];
  tempcolumn : any = [];
  newcolumn : any = [];
  i : any = 0;
  
  constructor(private coinservice: CoinService, private router: Router, private http: Http, toasterService: ToasterService, private title: Title, private meta: Meta, private decimalpipe: DecimalPipe ) {
    this.toasterService = toasterService;
    // localStorage.removeItem('columns');
    let columns = localStorage.getItem('columns'); 
    if (columns == null || columns == '') {
      localStorage.setItem('columns', JSON.stringify(this.displaycolumn));
    }
    let selectcolumn = JSON.parse(localStorage.getItem('columns')); 
    let temparraydata = [];
    selectcolumn.map(function (val, k) {
      temparraydata[val] = val;
    });
    this.selectcol = temparraydata;
  }

  addremovecol(column) {
    if (this.tempcolumn.find(item => item == column)){
      let columns = this.tempcolumn;
      columns.map(function (val, k) {
        if (column == val) {
          delete columns[k];
        }
      });
      this.tempcolumn = columns;
    }
    else {
      this.tempcolumn[this.i] = column;
      this.i++;
    }
  }

  savecolumn() {
    let ncolumn = $.grep(this.tempcolumn, function (n) { return (n); });
    this.tempcolumn = [];
    let selcolumn = JSON.parse(localStorage.getItem('columns'));
    let temparray = [];
    selcolumn.map(function (val, k) {
      if (ncolumn.find(item => item == val)) {
        temparray[k] = val;
        delete selcolumn[k];
      }
    });
    let selectcolumn = $.grep(selcolumn, function (n) { return (n); });
    let count = selectcolumn.length - 1;
    ncolumn.map(function (val, k) {
      if (temparray.find(item => item == val)) {
        delete ncolumn[k];
      }
      else {
        count++;
        selectcolumn[count] = val;
      }
    });
    let newcolumn = $.grep(this.tempcolumn, function (n) { return (n); });
    localStorage.setItem('columns', JSON.stringify(selectcolumn));
    let temparraydata = [];
    selectcolumn.map(function (val, k) {
      temparraydata[val] = val;
    });
    this.selectcol = temparraydata;
    $('#customize-table').modal('toggle');
  }

  ngOnInit() {
    this.coinservice.getdatafromjson().subscribe(resData => {
      // console.log(resData);
      if (resData.status === true) {
        this.coindata = resData.data;
      }
    });

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
        data: [10, 5, 15, 16, 24, 20, 30, 32, 33, 35, 33, 40, 71, 78, 39, 66],
      }],
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
    const imgurl = 'assets/currency-25/' + name.toLowerCase() + '.png';
    this.isImage(imgurl).then(function (test) {
      // tslint:disable-next-line:triple-equals
      if (test == true) {
        return event.target.src = imgurl;
      } else {
        return event.target.src = 'assets/currency-25/not-found-25.png';
      }
    });
  }
}
