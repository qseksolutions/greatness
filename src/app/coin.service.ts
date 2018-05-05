import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as myGlobals from './global';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoinService {

  api_url: any = myGlobals.api_url;

  coindataapi: any = myGlobals.coindataapi;

  constructor(private http: Http) {
  }

  getdatafromjson(): Observable<any> {
    return this.http.get("http://35.176.71.92/api.greatness/coins.json").map((res: any) => res.json());
  }
  
  getsinglecoindatafromjson(coin): Observable<any> {
    return this.http.get("http://35.176.71.92/api.greatness/singlecoin/" + coin + ".json").map((res: any) => res.json());
  }

  getcoindata() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.coindataapi, options)
      .map((response: Response) => response.json());

  }
}
