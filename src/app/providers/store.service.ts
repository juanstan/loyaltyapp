import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {StorageService} from '../core/services/storage.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {EMPTY} from 'rxjs/internal/observable/empty';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Program} from '../model/program';
import {History} from '../model/history';
import {Store} from '../model/store';


@Injectable({ providedIn: 'root' })
export class StoreService {
  public user: User;
  public stores: Store[];
  public stores$ = new BehaviorSubject<Store[]>(null);
  public token: string;
  echo: any = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.stores$.subscribe(stores => {
      this.stores = stores;
    });

  }

  public getProgramObservable(): Observable<Store[]> {
    return this.stores$;

  }

  public requestStores(): Observable<Store[]> {
    return this.http.get<{data: any}>(`${environment.apiUrl}/stores`).pipe(
      map(data => {
        this.stores = data.data;
        return this.stores;
      }),
      catchError((err, caught) => {
        console.log(err);
        return EMPTY;
      })
    );
  }



}
