import { Component, OnInit } from '@angular/core';
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
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CoinService, DecimalPipe],
})
export class CategoryComponent implements OnInit {

  private toasterService: ToasterService;
  public base_url: any = myGlobals.base_url;
  chart: Chart;
  coindata: any;
  cuurentpage: any = 0;
  nextpage: any = 0;
  prevpage: any = 0;
  pagecount: any = 0;
  showloader: any;
  categorylist: any;
  categorydata: any;
  totalcategory: any;
  selectcol: any = [];
  tempcolumn: any = [];
  favoritedata: any = [];
  favorites: any = [];
  i: any = 0;
  start: any = 0;
  displaycolumn: any = ['rank', 'name', 'follow', 'price_usd', 'graph_7d', 'mc_usd', 'team', 'theory', 'technology', 'traction', 'tam', 'token', 'timing', 'trasformative', 'gq'];

  constructor(private coinservice: CoinService, private router: Router, toasterService: ToasterService, private title: Title, private meta: Meta, private decimalpipe: DecimalPipe) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.toasterService = toasterService;
    // localStorage.removeItem('columns');
    // localStorage.removeItem('favorites');
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
    let favoritecoin = JSON.parse(localStorage.getItem('favorites'));
    if (favoritecoin != null || favoritecoin == '') {
      let tempfavarray = [];
      favoritecoin.map(function (val, k) {
        tempfavarray[val] = val;
      });
      this.favoritedata = tempfavarray;
    }
  }

  gotocategory(category) {
    this.router.navigate(['/category/', category]);
  }

  addremovecol(column) {
    if (this.tempcolumn.find(item => item == column)) {
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
    let newcolumn = $.grep(selectcolumn, function (n) { return (n); });
    localStorage.setItem('columns', JSON.stringify(newcolumn));
    let temparrays = [];
    newcolumn.map(function (val, k) {
      temparrays[val] = val;
    });
    this.selectcol = temparrays;
    $('#customize-table').modal('toggle');
  }

  resetcolumn() {
    localStorage.setItem('columns', JSON.stringify(this.displaycolumn));
    let selectcolumn = JSON.parse(localStorage.getItem('columns'));
    let newtemparray = [];
    $('input[type="checkbox"]').prop('checked', false);
    selectcolumn.map(function (val, k) {
      $('.check_' + val).prop('checked', true);
      newtemparray[val] = val;
    });
    this.selectcol = newtemparray;
    $('#customize-table').modal('toggle');
  }

  addtofavorite(symbol) {
    let favoritescoin = JSON.parse(localStorage.getItem('favorites'));
    if (favoritescoin != null && favoritescoin.find(item => item == symbol)) {
      favoritescoin.map(function (val, k) {
        if (val == symbol) {
          delete favoritescoin[k];
        }
      });
      let newfavorite = $.grep(favoritescoin, function (n) { return (n); });
      localStorage.setItem('favorites', JSON.stringify(newfavorite));
      $('.img_' + symbol).attr('src', '../../assets/images/crown.svg')
    }
    else {
      if (favoritescoin != null) {
        let count = favoritescoin.length;
        favoritescoin[count] = symbol;
        localStorage.setItem('favorites', JSON.stringify(favoritescoin));
      }
      else {
        this.favorites[this.i] = symbol;
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }
      let tempfavoritescoin = JSON.parse(localStorage.getItem('favorites'));
      $('.img_' + symbol).attr('src', '../../assets/images/crown-fill.svg')
    }
  }

  ngOnInit() {
    this.coinservice.getcategorylist().subscribe(resData => {
      // console.log(resData);
      if (resData.status === true) {
        this.categorylist = resData.data;
        this.totalcategory = resData.data.length;
      }
    });
    this.gettabledata(this.start);
    this.cuurentpage = 1;
  }

  gotonextpage() {
    this.start = this.start + 50;
    this.cuurentpage = this.cuurentpage + 1;
    this.gettabledata(this.start);
  }
  
  gotoprevpage() {
    this.start = this.start - 50;
    this.cuurentpage = this.cuurentpage - 1;
    this.gettabledata(this.start);
  }

  gettabledata(start) {
    this.showloader = true;
    let curl = window.location.pathname;
    let spliturl = curl.split('/');
    let category = spliturl[2];
    this.coinservice.getcategorywisedata(category, start).subscribe(responce => {
      console.log(responce);
      if (responce.status === true) {
        this.showloader = false;
        this.coindata = responce.data;
        setTimeout(() => {
          $('.sparkliness1').sparkline('html', { lineWidth: 2, disableInteraction: true, spotColor: false, minSpotColor: false, maxSpotColor: false, width: 150, lineColor: '#04b290', height: 30, fillColor: '#ffffff' });
        }, 1000);
        let totalpage = responce.totalCount / 50;
        this.pagecount = Math.ceil(totalpage);
        /* this.coinservice.getalldatafromjson().subscribe(resData => {
          this.categorydata = responce.data;
          if (resData.status === true) {
            let temparray = [];
            let j = 0;
            for (let i = 0; i < resData.data.length; i++) {
              if (this.categorydata.find(item => item.coin_id == resData.data[i].coin_id)) {
                temparray[j] = resData.data[i];
                j++;
              }
            }
            if (temparray != null && temparray.length > 0) {
              this.coindata = temparray;
            }
          }
        }); */
      }
      else {
        this.showloader = false;
        this.coindata = '';
      }
    });

    $(document).on('click', '.showmore', function () {
      $('.catlabel').removeClass('hidden');
      $('.showmore').addClass('hidden');
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