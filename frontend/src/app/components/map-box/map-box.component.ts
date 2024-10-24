import { Component, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { geo } from '../../helpers/geo';
import { ApiService } from '../../services/api/api.service';
import { DistrictEndpoint } from '../../models/district.interface';
import { DistrictService } from '../../services/state/district.service';
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
  @Input() finalLng: number = 2.121007;
  @Input() finalLat: number = 41.390205;
  @Input() finalZoom: number = 11.2;

  public initialLng: number = 1.520862;
  public initialLat: number = 41.670376;
  public initialZoom: number = 7;

  public url: string = 'assets/barcelona_districtes.geojson';
  public hoveredDistrictId: string | null = null;
  public selectedDistrictId: string | null = null;
  public popup: Mapboxgl.Popup | null = null;
  public districts: any;
  public districtState = inject(DistrictService);

  private http = inject(HttpClient);
  private apiService = inject(ApiService);

  ngOnInit() {
    this.carregarDadesGeojson();
    if (window.innerWidth < 768) {
      this.finalZoom = 10.3;
      this.finalLat = 41.340205;
      this.finalLng = 2.141007;
    } else if (window.innerWidth < 1024) {
      this.finalZoom = 11.2;
    } else if (window.innerWidth < 1280) {
      this.finalZoom = 11.3;
    }

  }

  async carregarDadesGeojson() {
    try {
      const response = await firstValueFrom(this.http.get(this.url))
      this.districts = {
        ...response,
        features: (response as any).features.map((feature: any) => ({
          ...feature,
          id: feature.properties.codi_districte
        }))
      };
      this.initMap();
      await this.getLngLat();
    } catch (error) {

      console.log('Error', error)
    }

  }

  private initMap() {
    this.map = new Mapboxgl.Map({
      container: 'map',
      accessToken: environment.mapboxKey,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.initialLng, this.initialLat],
      zoom: this.initialZoom
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
      this.initializeGeojsonSources();
      setTimeout(() => {
        this.flyToBarcelona();
      }, 1000);
    });

  }

  private flyToBarcelona() {
    this.map.flyTo({
      center: [this.finalLng, this.finalLat],
      zoom: this.finalZoom,
      essential: true,
      duration: 3000,
      easing: (t) => {
        return t * (2 - t);
      }
    });
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
        'line-color': '#000',
        'line-width': 1
      }
    });


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
    this.map.on('click', async (e) => {

      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['districtes-layer'],
      });
      if (features?.length > 0) {
        const clickedFeature = features[0];
        const districId = clickedFeature?.properties?.['codi_districte'];
        if (districId) {
          this.zoomToDistrict(clickedFeature);
          const districts = await this.getDistricts();
          const districtFinded = districts.find((district: any) => {
            return district.district_code === districId
          });
          // await this.getDistrictData(districtFinded?._id);
          // await this.getDistrictData(districId);
          this.districtState.districtCode.set(Number(districId));
        }
      }
    });
  }

  private zoomToDistrict(feature: Mapboxgl.MapboxGeoJSONFeature) {
    const districtId = feature.properties?.['codi_districte'];

    if (this.selectedDistrictId) {
      this.map.setFeatureState(
        { source: 'districtes', id: this.selectedDistrictId },
        { selected: false }
      );
    }

    this.selectedDistrictId = districtId;
    const id = Number(this.selectedDistrictId);
    this.districtState.districtCode.set(id);
    this.map.setFeatureState(
      { source: 'districtes', id },
      { selected: true }
    );

    const bounds = new Mapboxgl.LngLatBounds();

    if (feature.geometry.type === 'Polygon') {
      (feature.geometry.coordinates[0] as [number, number][]).forEach((coord) => {
        bounds.extend(coord as Mapboxgl.LngLatLike);
      });
    } else if (feature.geometry.type === 'MultiPolygon') {
      feature.geometry.coordinates.forEach((polygon) => {
        polygon[0].forEach((coord) => {
          bounds.extend(coord as Mapboxgl.LngLatLike);
        });
      });
    }

    this.map.fitBounds(bounds, {
      padding: 50,
      duration: 1000,
      maxZoom: 14
    });
  }

  resetView() {
    if (this.selectedDistrictId) {
      this.map.setFeatureState(
        { source: 'districtes', id: this.selectedDistrictId },
        { selected: false }
      );
      this.selectedDistrictId = null;
      this.districtState.districtCode.set(null);
    }

    this.map.flyTo({
      center: [this.finalLng, this.finalLat],
      zoom: this.finalZoom,
      duration: 1000
    });
  }

  async getDistricts(): Promise<any> {
    try {
      const response = await firstValueFrom(this.apiService.getDistricts());
      return response;
    } catch (error) {
      console.log('Has some error', error)
    }
  }

  async getDistrictData(id: string) {
    const endpoints: DistrictEndpoint[] = ['digitalGap', 'educationalCenter', 'employmentSituation', 'incomePerPerson'];
    try {
      const requests = endpoints.map(endpoint =>
        firstValueFrom(this.apiService.getDistrict(id, endpoint))
      );
      const responses = await Promise.all(requests);
    } catch (error) {
      console.error(error);
    }
  }
}


