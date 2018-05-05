import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CoinService } from '../coin.service';
import * as myGlobals from './../global';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

declare var $ : any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [CoinService],
})
export class FooterComponent implements OnInit {

  private toasterService: ToasterService;
  public base_url: any = myGlobals.base_url;

  constructor(toasterService: ToasterService, private coinservice: CoinService, private router: Router, private http: Http) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    
  }
  
}
