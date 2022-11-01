import { ToastController } from '@ionic/angular';
import { DriverService } from './../../services/driver.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as localforage from 'localforage';
import { User } from 'src/app/Model/User';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  phone: number ;
  res_any: any ;
  drivers: User[] = [] ;
  driver: User ;


  constructor(private router:Router , private driverService: DriverService , private toastControl:ToastController) { }

  ngOnInit() {
    const interval = setInterval(() =>{
      clearInterval(interval);
      localforage
      .getItem('driver')
      .then((res) => {
        console.log(res);
        if (res != null) {
          this.phone = Number(res);
          this.getDriver();
        } else {
          this.router.navigateByUrl('login');
        }
      })
      .catch((err) => {
        this.router.navigateByUrl('login');
      });
    }, 3000);
  }

  getDriver(){
     this.driverService.GetDriver(this.phone).subscribe(res =>{
      console.log(res);
      this.res_any = res ;
      this.drivers = this.res_any ;
      if(this.drivers.length > 0){
        this.driver = this.drivers[0];
        this.driverService.setDriver(this.driver);
        this.router.navigateByUrl('');
      } else {
       this.presentToast('لا يمكن تنفيذ طلبك الأن الرجاء التأكد من ان بيانات الدخول صحيحة' , 'danger' , 3000);
      }
     } , err =>{
      console.log(err );
      this.presentToast('  برجاء التأكد من ان بيانات الدخول صحيحة' , 'danger' , 3000);
     })
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
