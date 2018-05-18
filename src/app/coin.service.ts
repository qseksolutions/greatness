import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as myGlobals from './global';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoinService {

  api_url: any = myGlobals.api_url;

  /*************************** Header,Category Page ************************************/
  categorylist: any = myGlobals.categorylist;
  categoryfilter: any = myGlobals.categoryfilter;
  allcoin: any = myGlobals.allcoin;
  coinsearch: any = myGlobals.coinsearch;

  /************************** Home Page ******************************/
  coinglobal: any = myGlobals.coinglobal;
  coinlist: any = myGlobals.coinlist;

  /************************** Advance Page ******************************/
  coinlistfilter: any = myGlobals.coinlistfilter;
  taglist: any = myGlobals.taglist;
  prooflist: any = myGlobals.prooflist;
  organizationlist: any = myGlobals.organizationlist;
  exchangelist: any = myGlobals.exchangelist;

  /************************** Single Page ******************************/
  getsinglecoingraph: any = myGlobals.getsinglecoingraph;
  getsinglecoin: any = myGlobals.getsinglecoin;
  coinceolist: any = myGlobals.coinceolist;
  
  /************************** Single Page ******************************/
  favoritecoinlist: any = myGlobals.favoritecoinlist;

  constructor(private http: Http) {
  }

  /******************************************** Header, Category Page **********************************************/
  getcurrencylist(): Observable<any> {
    return this.http.get("http://54.191.19.11/api/forex.json").map((res: any) => res.json());
  }

  getcategorylist() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.categorylist, options)
      .map((response: Response) => response.json());
  }

  findcoin(coin) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.coinsearch + '?query=' + coin, options)
      .map((response: Response) => response.json());
  }
  
  getallcoin() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.allcoin, options)
      .map((response: Response) => response.json());
  }

  getcategorywisedata(category, page, sorton, sortby) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    const form = new URLSearchParams();
    form.append('slug', category);
    form.append('start', page);
    form.append('sort', sorton);
    form.append('order', sortby);

    return this.http.post(this.api_url + this.categoryfilter, form, options)
      .map((response: Response) => response.json());
  }
  
  /******************************************** Home Page **********************************************/
  getdatafromjson(): Observable<any> {
    return this.http.get("http://54.191.19.11/api/coins.json").map((res: any) => res.json());
  }
  
  getalldatafromjson(): Observable<any> {
    return this.http.get("http://54.191.19.11/api/coins_all.json").map((res: any) => res.json());
  }

  getglobaldata() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.coinglobal, options)
      .map((response: Response) => response.json());
  }
  
  getallcoindata(start, sorton, sortby, category) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.coinlist + '?start=' + start + '&sort=' + sorton + '&order=' + sortby, options)
      .map((response: Response) => response.json());
  }
  
  /******************************************** Advance Page **********************************************/
  getaglist() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.taglist, options)
      .map((response: Response) => response.json());
  }

  getprooflist() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.prooflist, options)
      .map((response: Response) => response.json());
  }

  getorganizationlist() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.organizationlist, options)
      .map((response: Response) => response.json());
  }
  
  getexchangelist() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.exchangelist, options)
      .map((response: Response) => response.json());
  }

  getallcoindatafilter(start, sorton, sortby, category, tag, proof, organization, circulating_supp, max_supp, algo_score, team, theory, technology, traction, tam, token, timing, transformative, marketcap_usd, exchanges, age) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    const form = new URLSearchParams();
    form.append('start', start);
    form.append('sort', sorton);
    form.append('order', sortby);
    if (category != undefined) {
      form.append('cat_id', category);
    }
    if (tag != undefined) {
      form.append('tag_id', tag);
    }
    if (proof != undefined) {
      form.append('proof_type', proof);
    }
    if (organization != undefined) {
      form.append('org_structure', organization);
    }
    if (circulating_supp != undefined) {
      form.append('circulating_supply', circulating_supp);
    }
    if (max_supp != undefined) {
      form.append('max_supply', max_supp);
    }
    if (algo_score != undefined) {
      form.append('algo_score', algo_score);
    }
    if (team != undefined) {
      form.append('team', team);
    }
    if (theory != undefined) {
      form.append('theory', theory);
    }
    if (technology != undefined) {
      form.append('technology', technology);
    }
    if (traction != undefined) {
      form.append('traction', traction);
    }
    if (tam != undefined) {
      form.append('tam', tam);
    }
    if (token != undefined) {
      form.append('token', token);
    }
    if (timing != undefined) {
      form.append('timing', timing);
    }
    if (transformative != undefined) {
      form.append('transformative', transformative);
    }
    if (marketcap_usd != undefined) {
      form.append('marketcap_usd', marketcap_usd);
    }
    if (exchanges != undefined) {
      form.append('exc_id', exchanges);
    }
    if (age != undefined) {
      form.append('age', age);
    }

    return this.http.post(this.api_url + this.coinlistfilter, form, options)
      .map((response: Response) => response.json());
  }

  /******************************************** Single Page **********************************************/
  getsinglecoindatafromjson(coin): Observable<any> {
    return this.http.get("http://54.191.19.11/api/singlecoin/" + coin + ".json").map((res: any) => res.json());
  }

  getcoinceolist(coin) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.api_url + this.coinceolist + '?coin_id=' + coin, options)
      .map((response: Response) => response.json());
  }
  
  getsingledata(coin) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    
    return this.http.get(this.api_url + this.getsinglecoin + '?coin_id=' + coin, options)
    .map((response: Response) => response.json());
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

  /******************************************** Favorite Page **********************************************/
  getfavoritelist(coin, sorton, sortby) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    
    const form = new URLSearchParams();
    form.append('symbol', coin);
    form.append('sort', sorton);
    form.append('order', sortby);

    return this.http.post(this.api_url + this.favoritecoinlist, form, options)
      .map((response: Response) => response.json());
  }
}
