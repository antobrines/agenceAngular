import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

  propetiesSubject = new Subject<any[]>();
  constructor() { }

  emitProperties(){
    this.propetiesSubject.next(this.properties);
  }

  getProperties() {}

  createProperty(property){
    this.properties.push(property);
  }

  deleteProperty(index) {
    this.properties.splice(index, 1);
    this.emitProperties();
  }

  updateProperty(property, index){
    this.properties[index] = property;
    this.emitProperties();
  }
}
