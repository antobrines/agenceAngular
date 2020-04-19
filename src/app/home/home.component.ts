import { Component, OnInit } from '@angular/core';
import { PropertiesService } from './../services/properties.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties = [];
  propertiesSubscription: Subscription;
  constructor(private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.propertiesSubscription = this.propertiesService.propetiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
      }
    );
    this.propertiesService.emitProperties();
  }

  getSoldValue(index){
    if (this.properties[index].sold){
      return 'red';
    }else{
      return 'green';
    }
  }

  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }
}
