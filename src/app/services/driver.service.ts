import { Order } from './../Model/Order';
import { Market } from './../Model/Market';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  baseUrl = 'https://dashboard.tayranapp.com/api/LoginDriver';
  getUrl = 'https://dashboard.tayranapp.com/api/GetDriver/';
  getOrders = 'https://dashboard.tayranapp.com/api/driverOrders/';
  getMarketsUrl = 'https://dashboard.tayranapp.com/api/markets';
  deliverUrl = 'https://dashboard.tayranapp.com/api/deliver';
  

  
  driver: User ;
  markets: Market[] = [] ;
  order: Order ;
  constructor(private http: HttpClient) { }

  setDriver(u: User){
    this.driver = u ;
  }
  getDriver():User{
    return this.driver ;
  }
  setMarkets(u: Market[]){
    this.markets = u ;
  }
  getmarkets():Market[]{
    return this.markets ;
  }
  setorder(o: Order){
     this.order = o ;
  }
  getOrder():Order{
    return this.order ;
  }
  LoginDriver(mail , pass): Observable<any>{
    const postData = {
      email: mail , 
      password: pass
    }
    return this.http.post(this.baseUrl , postData);

  }
  GetDriver(id):Observable<any>{
   return this.http.get(this.getUrl + id);
  }
  GetDriverOrders(id):Observable<any>{
    console.log(this.getOrders + id);
    return this.http.get(this.getOrders + id);
  }
  getMarkets():Observable<any>{
    return this.http.get(this.getMarketsUrl);
  }

  deliver(s , i): Observable<any>{
    const postData = {
      state: s , 
      id: i 
    };
    return this.http.post(this.deliverUrl , postData);
  }
}
