import { ResultsPage } from './../results/results';
import { PerformanceDataProvider } from './../../providers/performance-data/performance-data';
import { PersonProvider } from './../../providers/person/person';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};
  constructor(public navCtrl: NavController, public person: PersonProvider, 
    private alertCtrl: AlertController, private performanceData: PerformanceDataProvider,
    private modalCtrl:  ModalController) {
    this.user = { distance: 1000, age: 20 };
    }

      calculateOnly() {
      if(this.user.gender) {
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
  showResults() {
    this.modalCtrl.create(ResultsPage).present();
  }

  saveResults() {
    this.performanceData
        .saveData({ performance_data: { data: { message: this.person.assessmentMessage } } })
        .subscribe(data => console.log(data))
  }
}
