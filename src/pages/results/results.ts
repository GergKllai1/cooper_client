import { PerformanceDataProvider } from './../../providers/performance-data/performance-data';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  results = [];

  constructor(private perfomanceData: PerformanceDataProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.perfomanceData
      .getResults()
        .subscribe(data => (this.results = data.entries))
  }

}
