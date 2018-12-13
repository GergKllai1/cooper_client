import { PerformanceDataProvider } from './../../providers/performance-data/performance-data';
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
  constructor(public navCtrl: NavController, public person: PersonProvider, 
    private alertCtrl: AlertController, private performanceData: PerformanceDataProvider ) {
    this.user = { distance: 1000, age: 20 };
    }

      calculateOnly(user) {
      if(user.gender === 'male' || user.gender === 'female') {
        this.calculate(user)
      } else {
        let alert = this.alertCtrl.create({
          title: 'Confirm gender',
          message: 'Please confirm gender!',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    }
    calculate(user) {
      this.person.age = user.age;
      this.person.gender = user.gender;

      this.person.doAssessment(user.distance);
      this.performanceData
        .saveData({ performance_data: { data: { message: this.person.assessmentMessage } } })
        .subscribe(data => console.log(data))
  }


}
