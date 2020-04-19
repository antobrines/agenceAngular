import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from './../interfaces/property';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];

  propetiesSubject = new Subject<Property[]>();
  constructor() { }

  emitProperties(){
    this.propetiesSubject.next(this.properties);
  }

  saveProperties(){
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties() {
    firebase.database().ref('/properties').on('value', (data) => {
      this.properties = data.val() ? data.val() : [];
      this.emitProperties();
    });
  }

  createProperty(property: Property){
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
  }

  deleteProperty(index) {
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emitProperties();
  }

  updateProperty(property: Property, index){
    this.properties[index] = property;
    this.saveProperties();
    this.emitProperties();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const fileName = uniqueId + file.name;
        const upload = firebase.storage().ref().child('images/properties/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                resolve(downloadUrl);
              }
            );
          }
        );
      }
    );
  }
}
