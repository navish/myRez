import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController
  ){}
  
  user: any = {
    fname : '',
    lname : '',
    username : '',
    email : '',
    password: '',
  };
  forvalidation: any = {
    password : ''
  };
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp(){
    let alert = this.alertCtrl.create({
      title: 'Sign Up !',
      subTitle:  this.user.username + ' You are about to sign up',
      buttons: ['OK']
    });
    alert.present(); 
  }

}
