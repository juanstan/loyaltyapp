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
import {History} from '../model/history';


@Injectable({ providedIn: 'root' })
export class HistoryService {
  public user: User;
  public histories: History[];
  public histories$ = new BehaviorSubject<History[]>(null);
  public token: string;
  echo: any = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {

    this.histories$.subscribe(histories => {
      this.histories = histories;
    });

  }


  public get allHistories(): History[] {
    return this.histories;
  }

  public set allHistories(histories) {
    this.histories$.next(histories);
  }

  public getHistoriesObservable(): Observable<History[]> {
    return this.histories$;
  }

  public getHistory(id): History {
    return this.histories?.find(history => history.id === id);
  }

  public requestMyHistory(uuid): Observable<History[]> {
    return this.http.get<{data: any}>(`${environment.apiUrl}/app/customer/${uuid}`).pipe(
      map(data => {
        this.histories = data.data?.customer?.histories;
        debugger;
        return this.histories;
      }),
      catchError((err, caught) => {
        console.log(err);
        return EMPTY;
      })
    );
  }



}
