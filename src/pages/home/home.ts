import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { SessionService } from "../../providers/session/session";
import { UserService } from "../../providers/users-service/user-service";
import { User } from '../../providers/users-service/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  pushPage: any;
  username: string;
  email: string;
  userId: string;
  user: User;
  
  constructor(
      private auth: AuthServiceProvider,
      public navCtrl: NavController,
      private sessionService: SessionService,
      private userService: UserService
      
    ) {
    this.pushPage = AboutPage;
    let info = this.auth.getUserInfo();



  }
  showUser(){
    this.userId = this.sessionService.getUserAppId();
    console.log("USer id")
    console.log(this.userId)
    this.userService.getUser(this.userId)
    .subscribe(res => {
      this.user = res[0];
      console.log(res)
      this.username = this.user.fname;
    })
    
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot('LoginPage')
    });
  }
  openAbout(){
    this.navCtrl.push(AboutPage);
  }

  ngOnInit(){
    this.showUser();
  }

}
