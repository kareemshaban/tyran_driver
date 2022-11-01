import { DriverService } from './../services/driver.service';
import { User } from 'src/app/Model/User';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  driver: User ;
  constructor(private driverService: DriverService) {
    this.driver = this.driverService.getDriver();

  }

}
