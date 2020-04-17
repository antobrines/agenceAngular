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

  getSoldValue(){
    if(this.sold){
      this.stateBuilding = 'Vendu';
      return 'red';
    }else{
      return 'green';
    }
  }
}
