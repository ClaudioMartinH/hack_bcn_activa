import { Component, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
// import * as districts from '../../../assets/barcelona_districtes.geojson';
// import * as districts from '../../../assets/barcelona_districtes.geojson';

@Component({
  selector: 'app-map-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-box.component.html',
  styleUrl: './map-box.component.scss'
})
export class MapBoxComponent {
  @ViewChild('mapContainer') map!: Mapboxgl.Map;
  @Input() height: string = '100%';
  @Input() width: string = '100%';
  @Input() lng: number = 2.154007; // Coordenades de Barcelona per defecte
  @Input() lat: number = 41.390205;
  @Input() zoom: number = 10;

  url: string = 'assets/barcelona_districtes.geojson';

  districts: any;

  http = inject(HttpClient);

  ngOnInit() {
    this.carregarDadesGeojson();
    this.initMap();
    this.getLngLat();
  }

  async carregarDadesGeojson() {
    try {
      console.log('entra!!!')
      const response = await firstValueFrom(this.http.get(this.url))
      console.log(response)
      this.districts = response;
      this.initMap();
      this.getLngLat();
    } catch (error) {

      console.log('ERRRORRR!!', error)
    }

  }

  private initMap() {
    this.map = new Mapboxgl.Map({
      container: 'map',
      accessToken: environment.mapboxKey,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lng, this.lat],
      zoom: this.zoom
    });

    // this.map.addSource('districtes', {
    //   type: 'geojson',
    //   data: districts
    // });

    // this.map.addLayer({
    //   id: 'districtes-fill',
    //   type: 'fill',
    //   source: 'districtes',
    //   layout: {},
    //   paint: {
    //     'fill-color': [
    //       'match',
    //       ['get', 'DISTRICT_NAME'],
    //       'Barcelona', 'red',
    //       'Girona', 'blue',
    //       'Lleida', 'green',
    //       'Tarragona', 'yellow',
    //       'Castellón', 'purple',
    //     ],
    //     'fill-opacity': 0.5
    //   }
    // });

    // this.map.addLayer({
    //   id: 'districtes-line',
    //   type: 'line',
    //   source: 'districtes',
    //   layout: {},
    //   paint: {
    //     'line-color': '#000',
    //     'line-width': 2
    //   }
    // });
  }

  getLngLat() {
    this.map.on('click', (e) => {
      e.preventDefault();
      console.log(e.lngLat);
      // this.onCreateMarker(e.lngLat.lng, e.lngLat.lat);
    });
  }

};


