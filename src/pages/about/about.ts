import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  about: any; 

  constructor(public navCtrl: NavController) {
    this.about = {
      "favorites":
        {
          "food":"None",
          "drink":"Some crispy sparkling juice",
          "fruit":"Definetly Banana",
          "nature_scenery":"Flowing Water"
        },
      "skills":
      [
        "Shouting", 
        "Web Development", 
        "UI / UX", 
        "Technical Writing", 
        "Baby Sitting"
      ]
    };

  }

}
