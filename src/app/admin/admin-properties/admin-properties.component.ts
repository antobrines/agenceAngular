import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertiesService } from './../../services/properties.service';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import { Property } from './../../interfaces/property';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  propertiesForm: FormGroup;
  propertiesSubscription: Subscription;
  properties: Property[] = [];
  indexRemove;
  indexUpdate;
  editMode = false;
  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit() {
    this.initPropertiesForm();
    this.propertiesService.propetiesSubject.subscribe(
      (data: Property[]) => {
        this.properties = data;
      }
    );
    this.propertiesService.emitProperties();
  }

  initPropertiesForm(){
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: '',
      price: ['', Validators.required],
      sold: '',
    });
  }

  onSubmitPropertiesForm(){
    const newProperty: Property = this.propertiesForm.value;
    if (this.editMode){
      this.propertiesService.updateProperty(newProperty, this.indexUpdate);
    } else{
      this.propertiesService.createProperty(newProperty);
    }
    $('#propertiesFormModal').modal('hide');
  }

  resetForm(){
    this.propertiesForm.reset();
    this.editMode = false;
  }

  onDeleteProperty(index){
    $('#deletePropertyModal').modal('show');
    this.indexRemove = index;
    console.log(index);
  }

  onConfirmDeleteProperty(){
    this.propertiesService.deleteProperty(this.indexRemove);
    $('#deletePropertyModal').modal('hide');
  }

  onEditProperty(property: Property){
    this.editMode = true;
    $('#propertiesFormModal').modal('show');
    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('rooms').setValue(property.rooms);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('description').setValue(property.description);
    this.propertiesForm.get('sold').setValue(property.sold);
    const index = this.properties.findIndex(
      (propertyEl) =>  {
        if (propertyEl === property) {
          return true;
        }
      }
    );
    this.indexUpdate = index;
  }
}
