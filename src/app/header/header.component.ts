import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CoinService } from '../coin.service';
import * as myGlobals from './../global';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { SocialUser } from 'angular4-social-login';
import { defer } from 'q';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

declare var $;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CoinService],
})
export class HeaderComponent implements OnInit {

  private toasterService: ToasterService;
  public base_url: any = myGlobals.base_url;
  currpage : any;
  globaldata: any;
  allcoin: any;
  categorylist: any;
  currencylist: any;
  base_curr: any;
  base_sign: any;
  public model: any;

  constructor(private coinservice: CoinService, private router: Router, toasterService: ToasterService) {
    this.toasterService = toasterService;

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    let curl = window.location.pathname;
    let spliturl = curl.split('/');
    if (spliturl[1] != '') {
      this.currpage = false;
    }
    else {
      this.currpage = true;
    }

  }

  ngOnInit() {
    this.coinservice.getcurrencylist().subscribe(resData => {
      this.currencylist = resData;
      if (this.currencylist.length > 0) {
        $('#sel_curr').select2('destroy');
        setTimeout(() => {
          // localStorage.removeItem('base_curr');
          let base_curr = localStorage.getItem('base_curr');
          console.log(base_curr);
          if (base_curr == null) {
            this.currencylist.map(function (val, key) {
              if (val['CURR'] == 'USD') {
                console.log(val);
                $('#sel_curr').val(val['CURR']);
                localStorage.setItem('base_curr', 'USD');
                localStorage.setItem('base_sign', '$');
                localStorage.setItem('base_price', val['PRICE']);
              }
            });
          } else {
            this.currencylist.map(function (val, key) {
              if (val['CURR'] == base_curr) {
                $('#sel_curr').val(val['CURR']);
              }
            });
          }
          $('#sel_curr').select2();
        }, 2000);
      }
    });

    this.coinservice.getglobaldata().subscribe(resData => {
      if (resData.status === true) {
        this.globaldata = resData.data;
      }
    });
    
    this.coinservice.getcategorylist().subscribe(resData => {
      if (resData.status === true) {
        this.categorylist = resData.data;
      }
    });

    this.coinservice.getallcoin().subscribe(resData => {
      if (resData.status === true) {
        this.allcoin = resData.data;
      }
    });
  }

  ngAfterViewInit() {
    $('#sel_curr').on('change', (e) => {
      let selcurr = $(e.target).val();
      this.currencylist.map(function (val, key) {
        if (val['CURR'] == selcurr) {
          localStorage.setItem('base_curr', val['CURR']);
          localStorage.setItem('base_sign', val['SYMBOL']);
          localStorage.setItem('base_price', val['PRICE']);
          location.reload();
        }
      });
    });
  };

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        // : this.allcoin.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        : this.allcoin.filter((item: any) => {
          return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || item.symbol.toLowerCase().indexOf(term.toLowerCase()) > -1;
        }));

  formattersearch = (x: { name: string, symbol: string }) => x.name + ' (' + x.symbol + ')';

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.router.navigate(['/coins/', this.model.coin_id]);
    }
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
