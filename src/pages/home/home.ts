import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    pushPage: any;
  constructor(public navCtrl: NavController) {
    this.pushPage = AboutPage;
  }
  openAbout(){
    this.navCtrl.push(AboutPage);
  }

}
