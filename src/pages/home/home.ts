import { PersonProvider } from './../../providers/person/person';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};
  constructor(public navCtrl: NavController, public person: PersonProvider, private alertCtrl: AlertController) {
    this.user = { distance: 1000, age: 20 };
    }

      calculateOnly() {
      if(this.user.gender === 'male' || this.user.gender === 'female') {
        this.calculate()
      } else {
        let alert = this.alertCtrl.create({
          title: 'Confirm gender',
          message: 'Please confirm gender!',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    }
    calculate() {
      this.person.age = this.user.age;
      this.person.gender = this.user.gender;

      this.person.doAssessment(this.user.distance);
  }


}
