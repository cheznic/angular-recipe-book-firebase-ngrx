import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import credentials from '../assets/firebase-credentials';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    const config = {
      apiKey: credentials.apiKey,
      authDomain: credentials.authDomain
    };
    firebase.initializeApp(config);
  }
}
