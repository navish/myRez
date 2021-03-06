import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from "../../providers/users-service/user-service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

  about: any; 
  username: any = {
    "email":"user1@nichoree.com"
  }
  user; any;
  gotUser = false

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
  ) {
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

  
  getUser(): any{
    this.userService.getUser(this.username)
    .subscribe(res => {
      this.user = res[0];
      this.gotUser=true;
      console.log("In about")
      console.log(this.user)
    })

  }

  ngOnInit() {
  }
}
