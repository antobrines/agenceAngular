import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  /**
   * Liste des properties
   */
  properties = [];
  /**
   * Abonnement aux properties 
   */
  propertiesSubscription: Subscription;
  /**
   * Ajoute le service des properties
   * @param propertiesService
   */
  constructor(
    private propertiesService: PropertiesService
  ) { }
  /**
   * Récupère toutes les properties de la base de donné.
   */
  ngOnInit() {
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
      }
    );
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }
  /**
   * Permet de savoir si property est vendu ou non 
   * @param index
   */
  getSoldValue(index) {
    if (this.properties[index].sold) {
      return 'red';
    } else {
      return 'green';
    }
  }
  /**
   * Permet de de désabonner lors de la fermeture de la page
   */
  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }

}
