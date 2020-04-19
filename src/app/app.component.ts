import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agence';
  stateBuilding = 'A vendre';
  sold = true;

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

  getSoldValue(index){
    if (this.properties[index].sold){
      this.stateBuilding = 'Vendu';
      return 'red';
    }else{
      return 'green';
    }
  }
}
