import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';
import {Vessel} from '../model/vessel';
import {Settings} from '../model/settings';
import * as L from 'leaflet';
import {IconOptions, Map as MyMap} from 'leaflet';
import { Storage } from '@ionic/storage';
import {Marker} from '../model/marker';
import {VesselService} from './vessel.service';

@Injectable({ providedIn: 'root' })
export class MapService {
  public vessels: Vessel[];
  public map$ = new BehaviorSubject<{vessels: Vessel[], vesselSelected: Vessel}>(null);
  myMap: MyMap;
  markers: Marker[] = [];
  mapSubscription: Subscription;
  mapBoxOptions: object = {
    attribution: 'Tracking Marine',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: environment.mapbox.accessToken,
  };
  timeOutUser;
  initialState  = {
    lng: -1.807323,
    lat: 50.253132,
    zoom: 8
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage
  ) {
    this.subscribeMap();

  }

  subscribeMap() {
    this.mapSubscription = this.map$.subscribe((data) => {
      if (this.myMap) {
        data.vessels?.map(vessel => {
          this.updateMap(data.vesselSelected);
          this.setMarker(vessel);
        });
      }
    });
  }

  async getDefaultMapValues(): Promise<void> {
    await this.storage.get('settings').then( (settings: Settings) => {
      const sourceMapBox = settings?.mapBoxTemplate || null;
      this.initialState.lat = settings?.initialLat || this.initialState.lat;
      this.initialState.lng = settings?.initialLng || this.initialState.lng;
      let sourceMapSelected = {};
      switch (sourceMapBox) {
        case 'navigation':
          sourceMapSelected = {
            id: 'mapbox/navigation-day-v1',
          };
          break;
        case 'satellite':
        default: {
          sourceMapSelected = {
            id: 'mapbox/streets-v11',
          };
          break;
        }

      }
      this.mapBoxOptions = {...this.mapBoxOptions, ...sourceMapSelected};
    });
  }

  async initMap(container, initialState = this.initialState)  {
    await this.getDefaultMapValues();
    if (this.myMap) {
      this.myMap.remove();
    }
    initialState = initialState ? initialState : this.initialState;
    this.myMap = new L.Map(container, {zoomControl: false}).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    this.currentUserLocation();

  }

  updateMap(vesselSelected: Vessel) {
    if (vesselSelected?.lat && vesselSelected?.lng) {
      this.myMap.setView([vesselSelected.lat, vesselSelected.lng], this.initialState.zoom);
    }
  }

  currentUserLocation() {
    if (navigator.geolocation) {
      const geoUSerLocation =  () => navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.setMarker({ id: -1, lat: position.coords.latitude, lng: position.coords.longitude }, 'locator');
        }
      });
      geoUSerLocation();
      this.timeOutUser = setInterval(
        geoUSerLocation, 10000);
    }
  }

  drawMap() {
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      this.mapBoxOptions
    ).addTo(this.myMap);
  }

  setMarker(point, type = 'vessel') {
    let marker = this.markers?.find(markerObj => markerObj.id === point?.id);
    if (!marker) {
      marker = {
        id: point.id,
        marker: L.marker([point.lat, point.lng], {
          icon: L.icon(environment.mapbox.icon[type] as IconOptions)
        }).bindPopup(type = 'vessel' ? `This is <a href="app/tabs/vessels/vessel-details/${point.id}">${point.name}` : null)
      };
      this.markers.push(marker);

    } else {
      marker.marker.setLatLng(new L.LatLng(point.lat, point.lng));
    }

    marker.marker.addTo(this.myMap);

  }


}
