import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertiesService } from 'src/app/services/properties.service';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {
  /**
   * Formulaire des propriétés 
   */
  propertiesForm: FormGroup;
  /**
   * Abonnement aux proprétés (RxJs)
   */
  propertiesSubscription: Subscription;
  /**
   * Tableau des propriétés
   */
  properties: Property[] = [];
  /**
   * Sauvegarde de l'index à supprimer
   */
  indexToRemove;
  /**
   * Sauvegarde de l'index à mmodifier
   */
  indexToUpdate;
  /**
   * Permet de savoir si on est en mode édition ou non
   */
  editMode = false;
  /**
   * Permet de savoir si la photo est en train d'être uploader
   */
  photoUploading = false;
  /**
   * Permet de savoir si la photo à été uploader
   */
  photoUploaded = false;
  /**
   * Liste des photos uploader
   */
  photosAdded: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService
  ) { }

  /**
   * Récupère toutes les properties de la base de donné en s'abonnant à l'aide de RxJs
   */
  ngOnInit() {
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe(
      (data: Property[]) => {
        this.properties = data;
      }
    );
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }
  /**
   * Initialise le formulaire des propriété
   */
  initPropertiesForm() {
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: '',
      price: ['', Validators.required],
      sold: ''
    });
  }
  /**
   * Ajoute ou modifie une property
   */
  onSubmitPropertiesForm() {
    const newProperty: Property = this.propertiesForm.value;
    newProperty.sold = this.propertiesForm.get('sold').value ? this.propertiesForm.get('sold').value : false;
    newProperty.photos = this.photosAdded ? this.photosAdded : [];
    if (this.editMode) {
      this.propertiesService.updateProperty(newProperty, this.indexToUpdate);
    } else {
      this.propertiesService.createProperty(newProperty);
    }
    $('#propertiesFormModal').modal('hide');
  }
  /**
   * Permet de reset le formulaire des properties
   */
  resetForm() {
    this.editMode = false;
    this.propertiesForm.reset();
    this.photosAdded = [];
  }
  /**
   * Permet d'initialiser l'index à supprimer lors de la selecter d'une property
   * @param index
   */
  onDeleteProperty(index) {
    $('#deletePropertyModal').modal('show');
    this.indexToRemove = index;
  }
  /**
   * Supprime de la base de donné une property
   */
  onConfirmDeleteProperty() {
    this.properties[this.indexToRemove].photos.forEach(
      (photo) => {
        this.propertiesService.removeFile(photo);
      }
    );
    this.propertiesService.deleteProperty(this.indexToRemove);
    $('#deletePropertyModal').modal('hide');
  }
  /**
   * Permet de savoir si on est en mode édition ou non et si on l'est, cela ajoute directement les valeurs de la bonne preperty
   * @param property
   */
  onEditProperty(property: Property) {
    this.editMode = true;
    $('#propertiesFormModal').modal('show');
    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('rooms').setValue(property.rooms);
    this.propertiesForm.get('description').setValue(property.description ? property.description : '');
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold);
    this.photosAdded = property.photos ? property.photos : [];
    const index = this.properties.findIndex(
      (propertyEl) => {
        if (propertyEl === property) {
          return true;
        }
      }
    );
    this.indexToUpdate = index;
  }
  /**
   * Permet d'ajouter une image lors d'un upload de fichier
   * @param event
   */
  onUploadFile(event) {
    this.photoUploading = true;
    this.propertiesService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photosAdded.push(url);
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false;
        }, 5000);
      }
    );
  }
  /**
   * Supprime une image
   * @param index
   */
  onRemoveAddedPhoto(index) {
    this.propertiesService.removeFile(this.photosAdded[index]);
    this.photosAdded.splice(index, 1);
  }

}
