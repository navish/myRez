import { Component } from '@angular/core';
import { AlertController, LoadingController, IonicPage, Loading, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { RegisterPage } from "../register/register";
import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  loginCredentials: any = { email: '', password: '' };
  regPage: any;

 
  constructor(
    private alertCtrl: AlertController, 
    private authService: AuthServiceProvider,  
    private loadingCtrl: LoadingController, 
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}
 
  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }
 
  public login() {
    this.showLoading();
    this.authService.login(this.loginCredentials)
      .subscribe(res => {
        let user = this.authService.auth;
        let allowed = user.ses.allowed
        if (allowed) {        
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
 
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
