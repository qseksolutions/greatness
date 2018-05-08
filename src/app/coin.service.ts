import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as myGlobals from './global';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoinService {

  api_url: any = myGlobals.api_url;

  /************************** Home Page ******************************/
  coinglobal: any = myGlobals.coinglobal;

  /************************** Single Page ******************************/
  getsinglecoingraph: any = myGlobals.getsinglecoingraph;

  constructor(private http: Http) {
  }

  /******************************************** Home Page **********************************************/
  getdatafromjson(): Observable<any> {
    return this.http.get("http://54.191.19.11/api/coins.json").map((res: any) => res.json());
  }

  getglobaldata() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.coinglobal, options)
      .map((response: Response) => response.json());
  }

  /******************************************** Single Page **********************************************/
  getsinglecoindatafromjson(coin): Observable<any> {
    return this.http.get("http://54.191.19.11/api/singlecoin/" + coin + ".json").map((res: any) => res.json());
  }

  signlecoingraph(period, coin) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    const form = new URLSearchParams();
    form.append('period', period);
    form.append('coin', coin);

    return this.http.post(this.api_url + this.getsinglecoingraph, form, options)
      .map((response: Response) => response.json());
  }
}
