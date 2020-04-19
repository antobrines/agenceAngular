import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties = [
    {
      title: 'test',
      category: 'Maison',
      sold: true
    },
    {
      title: 'Grand appartement',
      category: 'Appartement',
      sold: false
    },
    {
      title: 'Grande maison',
      category: 'Maison',
      sold: false
    }
  ];

  constructor() { }

  getProperties() {
    /*return new Promise(
      (resolve, reject) => {
        if (this.properties && this.properties.length > 0){
          resolve(this.properties);
        } else {
          const error = new Error('Propeties does not exist or is empty');
          reject(error);
        }
      }
    );*/
    return new Observable((observer) => {
      if (this.properties && this.properties.length > 0){
        observer.next(this.properties);
        observer.complete();
      } else {
        const error = new Error('Propeties does not exist or is empty');
        observer.error(error);
      }
    });
  }
}
