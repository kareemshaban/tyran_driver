import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DriverService } from './../../services/driver.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User';
import * as localforage from 'localforage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string ;
  password: string ;
  loaded: boolean = true;
  res_any: any ;
  drivers: User[] = [] ;
  driver: User ;



  constructor(private driverService: DriverService , private toastControl:ToastController , private router:Router) { }

  ngOnInit() {
  }
  loginMarket(){
    if(this.username && this.password){
      this.loaded = false ;
      this.driverService.LoginDriver(this.username , this.password).subscribe(res =>{
        console.log(res);
         this.res_any = res ;
         this.drivers = this.res_any ;
         if(this.drivers.length > 0){
           this.driver = this.drivers[0];
           this.driverService.setDriver(this.driver);
            this.storeUser();
         } else {
          this.loaded = true ;
          this.presentToast('لا يمكن تنفيذ طلبك الأن الرجاء التأكد من ان بيانات الدخول صحيحة' , 'danger' , 3000);
         }
      } , err =>{
        console.log(err );
        this.loaded = true ;
        this.presentToast('  برجاء التأكد من ان بيانات الدخول صحيحة' , 'danger' , 3000);
      });
    } else {
      this.presentToast('برجاء ادخال اسم المستخدم وكلمة المرور' , 'danger' , 3000);
    }
  }
  storeUser( ){
    localforage.getItem('driver').then(res => {
      res = this.driver.id ;
      localforage.setItem('driver' , res).then(data => {
       this.loaded = true ;
       this.presentToast('تم تسجيل الدخول بنجاح' , 'success' , 3000);
        this.router.navigateByUrl('');
      });
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
}
