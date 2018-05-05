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
import { window } from 'rxjs/operator/window';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CoinService],
})
export class HeaderComponent implements OnInit {

  private toasterService: ToasterService;
  public base_url: any = myGlobals.base_url;

  constructor(private coinservice: CoinService, private router: Router, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
  }
}
