import { Component, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { geo } from '../../helpers/geo';
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
    console.log({ geo })
    this.carregarDadesGeojson();
    // this.initMap();
    // this.getLngLat();
  }

  async carregarDadesGeojson() {
    try {
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

    this.map.addControl(new Mapboxgl.NavigationControl());
    this.map.addControl(new Mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    this.map.on('load', () => {
      console.log('Mapa carregat correctament');
      this.initializeGeojsonSources();
    });



    // this.map.addLayer({
    //   'id': 'districtes-layer',
    //   'type': 'fill',
    //   'source': 'districtes',
    //   'paint': {
    //     'fill-color': '#888',
    //     'fill-opacity': 0.4
    //   }
    // });

    // this.map.on('click', (e) => {
    //   console.log('click')
    //   const features = this.map.queryRenderedFeatures(e.point, {
    //     layers: ['districtes-layer']
    //   });

    //   if (features.length) {
    //     const districte = features?.[0]?.properties?.['codi_districte'];
    //     alert(`Has clicat al districte: ${districte}`);
    //   }
    // });

    // this.map.addLayer({
    //   id: 'districtes-fill',
    //   type: 'fill',
    //   source: 'districtes',
    //   layout: {},
    //   paint: {
    //     'fill-color': [
    //       'match',
    //       ['get', 'codi_districte'],
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

  initializeGeojsonSources() {
    this.map.addSource('districtes', {
      type: 'geojson',
      data: this.districts
    });

    this.map.addLayer({
      'id': 'districtes-layer',
      'type': 'fill',
      'source': 'districtes',
      'paint': {
        'fill-color': [
          'match',
          ['get', 'codi_districte'],
          1, 'red',
          2, 'blue',
          3, 'green',
          4, 'yellow',
          5, 'purple',
          6, 'orange',
          7, 'brown',
          8, 'black',
          9, 'gray',
          10, 'white',
          '#CCCCCC'
        ],
        'fill-opacity': 0.4
      }
    });

  }

  getLngLat() {
    this.map.on('click', (e) => {
      e.preventDefault();
      console.log(e.lngLat);

      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['districtes-layer']
      });
      console.log({ features })
      // this.onCreateMarker(e.lngLat.lng, e.lngLat.lat);
    });
  }

};


