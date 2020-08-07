import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  error: string;

  constructor(
    private authService: AuthServiceProvider, 
    private alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {}

  createSuccess = false;
  registerDetails = { fname:'', lname:'', email: '', gender: '', password: '' };
  
  public register() {
    this.authService.signup(this.registerDetails).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }
  /*register(){
    this.authService.signup(this.registerDetails)
    .subscribe(
      data => this.authService.authSuccess(data.id_token),
      err => this.error = err
    );
  }
*/
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
