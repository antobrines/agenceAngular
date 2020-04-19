import { Component, OnInit } from '@angular/core';
import { PropertiesService } from './../services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties = [];
  
  constructor(private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.propertiesService.getProperties().then(
      (data: any) => {
        console.log(data);
        this.properties = data;
      }
     ).catch (
        (error) => {
          console.error(error);
        }
      );
  }

  getSoldValue(index){
    if (this.properties[index].sold){
      return 'red';
    }else{
      return 'green';
    }
  }
}
