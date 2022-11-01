import { DetailsPage } from './../pages/details/details.page';
import { ModalController, ToastController } from '@ionic/angular';
import { Market } from './../Model/Market';
import { Order } from './../Model/Order';
import { User } from 'src/app/Model/User';
import { DriverService } from './../services/driver.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Model/Product';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
   driver: User ;
   orders: Order []= [] ;
   loaded: boolean = false ;
   products: Product [] = [] ;
   orderList = [] ;
   markets: Market[] = [] ;
   market: Market ;
     constructor(private driverService: DriverService , private toastControl:ToastController , 
      private modalCtrl:ModalController) {
  

  }

  setOrders(){
    this.orderList = [] ;
    this.products = [];
    let state = "" ;

      this.orders.sort((a , b) =>  b.id - a.id) ;
     this.orders.forEach(element => {
     

       if(element.state != 3  ){
        if (element.state === 0 || element.state === 1)   {
         state = ' طلب جديد  ' ;
       }
       else if (element.state === 2 )   {
         state = ' طلب مرفوض ' ;
       }
       else if (element.state === 3 )   {
         state = ' طلب منتهي ' ;
       }
       else if (element.state === 4 )   {
        state = ' قيد التنفيذ  ' ;
      }
      else if (element.state === 5 )   {
        state = 'طلب جاهز   ' ;
      }
      else if (element.state === 6 )   {
        state = 'في الطريق    ' ;
      }
       let total = 0 , net = 0 ;

       if(element.products.length > 0){
        if(  this.markets.filter(c=> c.id == element.products[0].market_id).length > 0){
          this.market = this.markets.filter(c=> c.id == element.products[0].market_id)[0];
        } 
       }
     
        element.products.forEach(ele => {
     
           if(ele.extras.length > 0){
            total += (Number( ele.item.extras.filter(c=>c.id == ele.size)[0].price) * ele.qnt) + Number(  ele.extras.reduce((a , b) =>  Number( a)  + Number(b.price) , 0)) ;
       
           } else {
            total += Number( ele.item.extras.filter(c=>c.id == ele.size)[0].price) * ele.qnt;
           }
           
        });

        net = Number(total) - Number(element.discount) + Number(element.delivery_value);


        const startd = new Date().getDate() ;
        const endd = new Date(element.delivery_date.toString()).getDate() ;

        const starth = new Date().getHours() ;
        const endh = new Date(element.delivery_date.toString()).getHours() ;

        const start = new Date().getMinutes() ;
        const end = new Date(element.delivery_date.toString()).getMinutes() ;
         const ti =   (start - end ) + ((startd -endd ) * 24 * 60 ) + ((starth - endh) *60);
          const timevar = 'منذ' + ' ' + ti + ' ' + 'دقيقة';
       this.orderList .push({order_number: element.id , state: state , total: total , delivery_val: element.delivery_value , 
         discount: element.discount , net: net , state_num: element.state , 
         time: timevar  , market_name: this.market ? this.market.name : '' });
       }
      
       console.log(this.orderList);
  
     });
  }
  
  
  ngOnInit() {
    this.driver = this.driverService.getDriver();
    this.getOrdedrs();

    let interval = setInterval(() =>{
      this.driver = this.driverService.getDriver();
      this.getOrdedrs();
    }, 10000);
  }

  getOrdedrs(){
    this.loaded = false ;
    this.driverService.getMarkets().subscribe(res =>{
      this.markets = res ;
      this.driverService.setMarkets(this.markets);
      this.driverService.GetDriverOrders(this.driver.id).subscribe(res =>{
        this.loaded = true ;
        this.orders = res ;
        console.log(res);
        this.setOrders();
        
       }, err =>{
         this.loaded = true ;
         this.presentToast('  تعذر الاتصال بالخادم' , 'danger' , 3000);
       });
    } , err =>{
      this.loaded = true ;
      this.presentToast('  تعذر الاتصال بالخادم' , 'danger' , 3000);
    });

 
  }
  deliver(id , state){
    this.loaded = false ;
    this.driverService.deliver(state , id).subscribe(res =>{
      this.driver = this.driverService.getDriver();
      this.getOrdedrs();
    } , err =>{
      this.loaded = true ;
      this.presentToast('  تعذر الاتصال بالخادم' , 'danger' , 3000);
    });
  }

  async presentToast(_message: string, mColor: string, mduration: number) {
    const toast = await this.toastControl.create({
      message: _message,
      position: 'bottom',
      color: mColor,
      duration: mduration,
      cssClass: 'toast_css'
    });
    toast.present();
  }


async details(id){
  console.log(id);
  this.driverService.setorder(this.orders.filter(c=> c.id === id)[0]);
  const  modal = await this.modalCtrl.create({
    component: DetailsPage,
    componentProps: {}
  });
  modal.onDidDismiss().then((result) => {
    if(result.data){
    

        console.log(id);
        this.deliver(id , Number(result.data.state));

      
    }
  });
  return await modal.present();
}

}