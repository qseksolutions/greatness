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
  selector: 'app-advancescanner',
  templateUrl: './advancescanner.component.html',
  styleUrls: ['./advancescanner.component.css'],
  providers: [CoinService, DecimalPipe],
})
export class AdvancescannerComponent implements OnInit {

  private toasterService: ToasterService;
  public base_url: any = myGlobals.base_url;
  chart: Chart;
  coindata: any;
  pagecount: any;
  showloader: any;
  selectcol: any = [];
  tempcolumn: any = [];
  favoritedata: any = [];
  favorites: any = [];
  i: any = 0;
  start: any = 0;
  cuurentpage: any = 0;
  graphLoad: any = 0;
  sorton: any;
  sortby: any;
  base_curr: any;
  base_sign: any;
  base_price: any;
  categorylist: any;
  selcat: any;
  seltag: any;
  taglist: any;
  displaycolumn: any = ['rank', 'name', 'follow', 'price_usd', 'graph_7d', 'mc_usd', 'team', 'theory', 'technology', 'traction', 'tam', 'token', 'timing', 'trasformative', 'gq'];

  constructor(private coinservice: CoinService, private router: Router, toasterService: ToasterService, private title: Title, private meta: Meta, private decimalpipe: DecimalPipe) {
    $('.header_part').show();
    $('.header_part').addClass('collapse');
    $('.header_part').addClass('show');


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

    this.toasterService = toasterService;
    // localStorage.removeItem('columns');
    // localStorage.removeItem('favorites');
    this.sorton = localStorage.getItem('sorton');
    this.sortby = localStorage.getItem('sortby');
    if (this.sorton === null || this.sorton === 'null') {
      localStorage.setItem('sorton', 'rank');
      this.sorton = localStorage.getItem('sorton');
    }
    if (this.sortby === null || this.sortby === 'null') {
      localStorage.setItem('sortby', 'asc');
      this.sortby = localStorage.getItem('sortby');
    }

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

  public loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'assets/js/custom.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  ngOnInit() {
    this.loadScript();
    this.coinservice.getcategorylist().subscribe(resData => {
      if (resData.status === true) {
        this.categorylist = resData.data;
      }
    });
    this.coinservice.getaglist().subscribe(resData => {
      if (resData.status === true) {
        this.taglist = resData.data;
      }
    });
    this.gettabledata(this.start);
    this.cuurentpage = 1;
  }

  ngAfterViewInit() {
    $('#sel_cat').on('change', (e) => {
      let selcurr = $(e.target).val();
      let cat = selcurr.toString();
      this.selcat = cat;
      this.gettabledata(this.start);
    });
    $('#sel_tag').on('change', (e) => {
      let selcurr = $(e.target).val();
      let cat = selcurr.toString();
      this.seltag = cat;
      this.gettabledata(this.start);
    });
  };

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

  gotopage(page: number) {
    let start = page - 1;
    this.start = start * 50;
    this.cuurentpage = page;
    this.gettabledata(this.start);
  }

  orderingColumn(column, order) {
    this.graphLoad = 0;
    this.sorton = localStorage.getItem('sorton');
    this.sortby = localStorage.getItem('sortby');
    if (this.sorton === column) {
      if (this.sortby === 'asc') {
        localStorage.setItem('sortby', 'desc');
      } else {
        localStorage.setItem('sortby', 'asc');
      }
    } else {
      localStorage.setItem('sorton', column);
      localStorage.setItem('sortby', order);
    }
    this.gettabledata(this.start);
  }

  gettabledata(start) {
    this.sorton = localStorage.getItem('sorton');
    this.sortby = localStorage.getItem('sortby');
    this.showloader = true;
    this.coinservice.getallcoindatafilter(start, this.sorton, this.sortby, this.selcat, this.seltag).subscribe(resData => {
      if (resData.status === true) {
        this.showloader = false;
        $('.scrollable-row').css('left', '0');
        this.coindata = resData.data;
        let totalpage = resData.totalCount / 50;
        this.pagecount = Math.ceil(totalpage);
        setTimeout(() => {
          this.graphLoad = 1;
          $('.sparkliness1').sparkline('html', { lineWidth: 1.5, disableInteraction: true, spotColor: false, minSpotColor: false, maxSpotColor: false, width: 150, lineColor: '#00940b', height: 30, fillColor: '#ffffff' });
          $('.sparkliness2').sparkline('html', { lineWidth: 1.5, disableInteraction: true, spotColor: false, minSpotColor: false, maxSpotColor: false, width: 150, lineColor: '#ef0000', height: 30, fillColor: '#ffffff' });

          /**************** scroll script ***************** */
          let maintable = $('.main-table').width();
          let fixedcolumn = $('.fixed-column').width();
          let fixedwidth = maintable - fixedcolumn;
          $('.scroll-viewport').css('width', fixedwidth + 'px');

          $(window).scroll(function () {
            let sticky = $('.header-fix'),
              scroll = $(window).scrollTop();
            let scrolldiv = $('.scrollable-row');
            let mainheight = $('.container-wrapper').height();
            let fixedscroll = mainheight + 78
            if (scroll >= fixedscroll) {
              scrolldiv.addClass('fixed-scroll');
              sticky.addClass('fixed-header');
            }
            else {
              scrolldiv.removeClass('fixed-scroll');
              sticky.removeClass('fixed-header');
            }
          });

          $('.scroll-viewport').on('scroll', function () {
            var left = $(this).scrollLeft();
            var left = left;
            $('.scrollable-row').css('left', -left);
          });
          /**************** scroll script ***************** */
        }, 2000);
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
      if (test == true) {
        return event.target.src = imgurl;
      } else {
        return event.target.src = 'assets/images/currency-25/not-found-25.png';
      }
    });
  }

}
