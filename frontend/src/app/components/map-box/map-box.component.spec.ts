import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MapBoxComponent } from './map-box.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import * as Mapboxgl from 'mapbox-gl';

describe('MapBoxComponent', () => {
  let component: MapBoxComponent;
  let fixture: ComponentFixture<MapBoxComponent>;
  let httpTestingController: HttpTestingController;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MapBoxComponent, // Standalone component in imports
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBoxComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    debugElement = fixture.debugElement;

    // Mock Mapboxgl.Map to prevent real map initialization
    spyOn(Mapboxgl, 'Map').and.returnValue({
      on: jasmine.createSpy('on'),
      addControl: jasmine.createSpy('addControl'),
      addSource: jasmine.createSpy('addSource'),
      addLayer: jasmine.createSpy('addLayer'),
      queryRenderedFeatures: jasmine.createSpy('queryRenderedFeatures').and.returnValue([])
    } as unknown as Mapboxgl.Map);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies no open requests remain
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  

  

  

  
});
