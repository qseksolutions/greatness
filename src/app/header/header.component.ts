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

  constructor(private coinservice: CoinService, private router: Router, toasterService: ToasterService) {
    this.toasterService = toasterService;

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
    this.coinservice.getglobaldata().subscribe(resData => {
      // console.log(resData);
      if (resData.status === true) {
        this.globaldata = resData.data;
      }
    });
  }
}
