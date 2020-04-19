import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  ngOnInit(): void {
  }

  getSoldValue(index){
    if (this.properties[index].sold){
      return 'red';
    }else{
      return 'green';
    }
  }
}
