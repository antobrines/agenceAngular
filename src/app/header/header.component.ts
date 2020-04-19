import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Agence';
  isLoggedIn = false;


  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (userSession) => {
        if (userSession){
          console.log('connecté');
          this.isLoggedIn = true;
        } else {
          console.log('deconnecté');
          this.isLoggedIn = false;
        }
      }
    );
  }

  onSignOut(){
    this.authenticationService.signOutUser();
  }

}
