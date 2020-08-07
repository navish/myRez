import { Component, ViewChild } from '@angular/core';
import { App, Platform, Nav, IonicPage, NavController, NavParams } from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import { Deeplinks} from '@ionic-native/deeplinks';

import { SignupPage } from'../signup/signup';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  @ViewChild(Nav) navChild:Nav;
  constructor(
    private deeplinks: Deeplinks,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform
  ) {
  }
  user: any = {
    username : '',
    password: '',
  };
  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
  signUp(){
    this.navCtrl.push(SignupPage)
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.deeplinks.routeWithNavController(this.navChild, {
        '/signup':SignupPage,
        '/terms-conditions': SignupPage
       // '/users/:userId': UsersPage
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.warn('Unmatched Route', nomatch);
      });
    })
  }
  
}
