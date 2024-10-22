import { Component, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { geo } from '../../helpers/geo';
import { ApiService } from '../../services/api/api.service';
import { DistrictEndpoint } from '../../models/district.interface';
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
  @Input() lng: number = 2.121007;
  @Input() lat: number = 41.390205;
  @Input() zoom: number = 11.2;

  url: string = 'assets/barcelona_districtes.geojson';
  hoveredDistrictId: string | null = null;
  popup: Mapboxgl.Popup | null = null;
  districts: any;

  http = inject(HttpClient);
  private apiService = inject(ApiService);

  ngOnInit() {
    this.carregarDadesGeojson();
    if (window.innerWidth < 768) {
      this.zoom = 10.3;
      this.lat = 41.340205;
      this.lng = 2.141007;
    } else if (window.innerWidth < 1024) {
      this.zoom = 11.2;
    } else if (window.innerWidth < 1280) {
      this.zoom = 11.3;
    }

  }

  async carregarDadesGeojson() {
    try {
      const response = await firstValueFrom(this.http.get(this.url))
      console.log(response)
      this.districts = {
        ...response,
        features: (response as any).features.map((feature: any) => ({
          ...feature,
          id: feature.properties.codi_districte
        }))
      };
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

    this.popup = new Mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'district-popup'
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



    // this.map.on('mouseenter', 'districtes-layer', () => {
    //   this.map.getCanvas().style.cursor = 'pointer';
    //   // Canvia l'opacitat del districte en hover
    //   this.map.setPaintProperty('districtes-layer', 'fill-opacity', 0.7);
    // });

    // // Torna a l'opacitat inicial quan el ratolí surt del districte
    // this.map.on('mouseleave', 'districtes-layer', () => {
    //   this.map.getCanvas().style.cursor = '';
    //   this.map.setPaintProperty('districtes-layer', 'fill-opacity', 0.4);
    // });


  }

  initializeGeojsonSources() {
    this.map.addSource('districtes', {
      type: 'geojson',
      data: this.districts,
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
          3, '#7eac74',
          4, '#c8ed76',
          5, '#486d70',
          6, 'orange',
          7, 'brown',
          8, 'black',
          9, 'white',
          10, '#463c45',
          '#CCCCCC'
        ],
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.7,
          0.4
        ]
      }
    });

    this.map.addLayer({
      id: 'districtes-borders',
      type: 'line',
      source: 'districtes',
      layout: {},
      paint: {
        'line-color': '#000', // Black color for the borders
        'line-width': 1
      }
    });

    // let hoveredDistrictId: number | null = null;

    // Canvia l'estat de hover mentre el ratolí es mou pel mapa
    this.map.on('mousemove', 'districtes-layer', (e) => {
      if (!e?.features) return;
      if (e?.features?.length > 0) {
        this.map.getCanvas().style.cursor = 'pointer';

        const feature = e.features[0];
        const districtId = feature?.properties?.['codi_districte'];
        const districtName = feature?.properties?.['nom_districte'];

        if (this.popup) {
          this.popup
            .setLngLat(e.lngLat)
            .setHTML(`
              <div class="district-tooltip">
                <h4 class="text-lg font-semibold">${districtName}</h4>
              </div>
            `)
            .addTo(this.map);
        }

        if (this.hoveredDistrictId !== districtId) {
          // Eliminem l'estat hover anterior
          if (this.hoveredDistrictId) {
            this.map.setFeatureState(
              { source: 'districtes', id: this.hoveredDistrictId },
              { hover: false }
            );
          }

          this.hoveredDistrictId = districtId;

          // Establim el nou estat hover
          const id = Number(this.hoveredDistrictId);
          this.map.setFeatureState(
            { source: 'districtes', id: id },
            { hover: true }
          );
        }
      }
    });

    // Restaura l'estat quan el ratolí surt del mapa
    this.map.on('mouseleave', 'districtes-layer', () => {
      this.map.getCanvas().style.cursor = '';

      if (this.hoveredDistrictId !== null) {
        this.map.setFeatureState(
          { source: 'districtes', id: this.hoveredDistrictId },
          { hover: false }
        );
      }
      if (this.popup) {
        this.popup.remove();
      }
      this.hoveredDistrictId = null;
      this.map.getCanvas().style.cursor = '';
    });

  }

  async getLngLat() {
    this.map.on('click', (e) => {
      e.preventDefault();
      console.log(e.lngLat);

      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['districtes-layer'],
      });
      console.log({ features: features?.[0]?.properties?.['codi_districte'] })
      // this.onCreateMarker(e.lngLat.lng, e.lngLat.lat);
      const id = features?.[0]?.properties?.['codi_districte'];
      if (id) {
        this.getDistrictData(id)
      };

    });


  }
  async getDistrictData(id: string) {
    const endpoints: DistrictEndpoint[] = ['digitalGap', 'educationalCenter', 'employmentSituation', 'incomePerPerson'];
    try {
      const response = await Promise.all(endpoints.map(endpoint => firstValueFrom(this.apiService.getDistrict(id, endpoint))));
      console.log({ response })
    } catch (error) {
      console.error(error);
    }
  }
}


