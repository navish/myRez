import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushPage: any;
  username: string;
  email: string;
  constructor(
      private auth: AuthServiceProvider,
      public navCtrl: NavController
    ) {
    this.pushPage = AboutPage;
    let info = this.auth.getUserInfo();
   /* this.username = info['fname'];
    this.email = info['email'];*/
    this.username = 'Nana';
    this.email = 'nana email';


  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot('LoginPage')
    });
  }
  openAbout(){
    this.navCtrl.push(AboutPage);
  }

}
