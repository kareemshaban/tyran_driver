import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    StatusBar.setBackgroundColor({color: 'DB4524'});
    this.router.navigateByUrl('splash');
}
}

