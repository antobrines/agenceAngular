import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monAgence';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAYKCG7fAe1jxCIsHaibvP0sqWqdcEz1MU',
      authDomain: 'agence-dd267.firebaseapp.com',
      databaseURL: 'https://agence-dd267.firebaseio.com',
      projectId: 'agence-dd267',
      storageBucket: 'agence-dd267.appspot.com',
      messagingSenderId: '922280746956',
      appId: '1:922280746956:web:00ca3742329fd9a7488769'
    };
    firebase.initializeApp(firebaseConfig);
  }

}
