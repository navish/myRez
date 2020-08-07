import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ResListsPage } from '../res-lists/res-lists';
import { SigninPage } from'../signin/signin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  openAbout(){
    this.navCtrl.push(AboutPage);
  }
  openSignUp(){
    this.navCtrl.push(SigninPage);
  }
  resList(){
    this.navCtrl.push(ResListsPage);
  }

}
