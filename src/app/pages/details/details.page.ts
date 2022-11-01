import { DriverService } from './../../services/driver.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartItem } from 'src/app/Model/CartItem';
import { Market } from 'src/app/Model/Market';
import { Order } from 'src/app/Model/Order';
import { Product } from 'src/app/Model/Product';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  order: Order ;
  items: CartItem [] = [] ;
  products: Product [] = [] ;
  loaded: boolean ;
  list = [] ;
  markets: Market[] = [] ;
  market: Market ;
  baseUrl = 'https://dashboard.tayranapp.com/images/';
  total: number ;
  additionValue: number ;
  delivery_value = 0 ;
  net: number ;
  constructor(private driverService: DriverService , private modalCtrl: ModalController  ) { 

  }

  async close(){
   await this.modalCtrl.dismiss();
  }

  ngOnInit() {
    let cat = '' , size = '' , extras  , add = '' , add_value = 0;
    this.loaded = false ;
    this.items = [] ;
    this.products = [] ;
    this.list = [] ;
    this.total = 0 ;
    this.additionValue = 0 ;
     this.markets = this.driverService.getmarkets();
    this.order = this.driverService.getOrder();
    this.delivery_value = this.order.delivery_value ;
    this.items = this.order.products ;
    if(this.items.length > 0){
      this.market = this.markets.filter(c=> c.id === this.items[0].market_id)[0];
    }
     this.items.forEach(element => {
    

      if(element.extras.length > 0){
        this.additionValue = Number(  element.extras.reduce((a , b) =>  Number( a)  + Number(b.price) , 0)) * element.qnt;
        this.total += (Number( element.item.extras.filter(c=>c.id == element.size)[0].price) * element.qnt) +  this.additionValue  ;
   
       } else {
        this.total += Number( element.item.extras.filter(c=>c.id == element.size)[0].price) * element.qnt;
        this.additionValue  = 0 ;
       }

       if( this.market ){
      if( this.market.departments.filter(c=> c.id == element.item.catId).length > 0  ){
        cat = this.market.departments.filter(c=> c.id == element.item.catId)[0].name ;
      } else {
        cat = '' ;
      }
    } else {
      cat = '' ;
    }
      if(element.item.extras.filter(c=> c.id == element.size).length > 0){
        size = element.item.extras.filter(c=> c.id == element.size)[0].name ;
      }  else {
        size = '' ;
      }
      element.extras.forEach(ex => {
        if(!extras){
          extras = ex.name + ':' + element.qnt * ex.price + 'ج.م' ;
        } else {
          extras +=  '--' +  ex.name  + ':' +  element.qnt * ex.price + 'ج.م';
        }

        
      });
      add =  element.item.extras.filter(c=> c.id == element.addition).length ? 
      element.item.extras.filter(c=> c.id == element.addition)[0].name : '' ;

        this.list.push({catName:cat , name: element.item.name , size: size , extra:  extras , img: element.item.img , 
          price: element.item.extras.filter(c=> c.id == element.size)[0].price  , qnt: element.qnt , add: add  , details: element.details} );
        
          extras = null ;
        this.loaded = true ;
      
     });
    
    console.log(this.list);
    this.net = Number(this.total) + Number(this.delivery_value)  ;
  }
  async dismiss(state){
    await this.modalCtrl.dismiss({state: state});
  }

}
