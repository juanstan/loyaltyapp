import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Vessel} from '../model/vessel';
import {MapService} from './map.service';
import { Storage } from '@ionic/storage';

@Injectable({ providedIn: 'root' })
export class VesselService {
  public vessels: Vessel[];
  public vesselSelected: Vessel;
  public vessels$ = new BehaviorSubject<Vessel[]>(null);

  constructor(
    private router: Router,
    private http: HttpClient,
    private mapService: MapService,
    private storageService: Storage
  ) {

    this.vessels$.subscribe(vessels => {
      this.vessels = vessels;
      this.mapService.map$.next({vessels: this.vessels , vesselSelected: this.vesselSelected});
    });

  }

  public get allVessels(): Vessel[] {
    return this.vessels;
  }

  public set allVessels(vessels) {
    this.storageService.set('vessels', this.vessels);
    this.vessels$.next(vessels);
  }

  public getVesselsObservable(): Observable<Vessel[]> {
    return this.vessels$;
  }

  public getVessel(id): Vessel {
    return this.vessels?.find(vessel => vessel.id === id);
  }

  public requestMyVessels(): Observable<Vessel[]> {
    return this.http.get<Vessel[]>(`${environment.apiUrl}/vessels`).pipe(
      map(vessels => vessels)
    );
  }

  public setVesselSelected(vesselID) {
    this.vesselSelected = vesselID ? this.vessels.find(vessel => vessel.id === vesselID) : null;
  }

  public getVesselSelected(): Vessel {
    return this.vesselSelected;
  }


  /*getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }*/

  /*updateVessel(id, params) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id === this.vessels.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          this.loginObj.user = user;
          this.storageService.set('login', this.loginObj);
        }
        return x;
      }));
  }

  deleteVessel(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id === this.userValue.id) {
          this.logout();
        }
        return x;
      }));
  }*/

}
