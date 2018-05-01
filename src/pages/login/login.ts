import { Component } from '@angular/core';
import { AlertController, LoadingController, IonicPage, Loading, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { SessionService } from "../../providers/session/session";
import { RegisterPage } from "../register/register";
import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  loginCredentials: any = { username: '', password: '' };
  regPage: any;
  userAppId;  
  error: string;

 
  constructor(
    private alertCtrl: AlertController, 
    private authService: AuthServiceProvider,  
    private loadingCtrl: LoadingController, 
    public navCtrl: NavController,
    public navParams: NavParams,
    private sessionService: SessionService
  ) {}
 
  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }
 
  login(){
    this.showLoading
    this.authService.login(this.loginCredentials)
      .subscribe(
        data => {
          this.authService.authSuccess(data.token)
          this.navCtrl.setRoot(TabsPage)
        },
          err => this.error = err
        )
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
