import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  signInUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
            console.log('connecte');
            resolve(data);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
}
