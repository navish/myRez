import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import { AboutPage } from '../about/about';
import { ResListsPage } from '../res-lists/res-lists';
import { SigninPage } from'../signin/signin';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { SessionService } from "../../providers/session/session";
import { UserService } from "../../providers/users-service/user-service";
import { User } from '../../providers/users-service/user';
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  pushPage: any;
  username: string;
  userId: any;
  user: User;
  token: string
  
  constructor(
      private auth: AuthServiceProvider,
      public navCtrl: NavController,
      private sessionService: SessionService,
      private userService: UserService,
      private storage: Storage
      
    ) {
    this.pushPage = AboutPage;
  }

  showUser(){
    this.storage.get('profile').then(val => { this.userId = {'email': val};
      this.userService.getUser(this.userId)
      .subscribe(res => {
        this.user = res[0];
        this.username = this.user.fname;
      })
    })
  }
  isLogged(){
    this.storage.get('token').then(val =>
    {
      if(val == null){
        this.navCtrl.setRoot(LoginPage)
      }
      else {
        this.showUser()
      }
    })
  }

  logout() {
    this.auth.logout()
    this.navCtrl.setRoot(LoginPage)
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

  ngOnInit(){
    this.isLogged()
  }

}
