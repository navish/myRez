import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
    public navCtrl: NavController,
    private iab: InAppBrowser
  ) {}

  launch(url){
    this.iab.create(url)
  }
  
}
