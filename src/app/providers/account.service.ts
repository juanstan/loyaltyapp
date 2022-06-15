import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {catchError, map, switchMap, take} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {User} from '../model/user';
import {LoginResult} from '../model/auth/login-result';
import {StorageService} from '../core/services/storage.service';
import {Observable} from 'rxjs';
import {snapshot} from '../shared/utils/snapshot.util';
import {HistoryService} from './history.service';


@Injectable({ providedIn: 'root' })
export class AccountService {
  public loginObj: LoginResult;
  public user: User;
  public token: string;
  echo: any = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService,
    private historyService: HistoryService
  ) { }

  async init(): Promise<LoginResult> {
    return await this.storageService.get('login').then(
      login => {
        if (!login?.user) {
          return this.logout();
        }
        this.user = login.user;
        return this.loginObj = login;
      }
    );
  }

  public reset() {
    this.loginObj = null;
    this.storageService.clear();
  }

  public get userValue(): User {
    return this.loginObj?.user;
  }

  public set userValue(user: User) {
    this.user = user;
  }

  public get tokenValue(): string {
    return this.loginObj?.token;
  }

  public login(username, password): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${environment.apiUrl}/auth/login`, { email: username, password, locale: 'en', remember: true })
      .pipe(
        map(login => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.loginObj = {token: login.token} ;
          return login;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    return this.http.post(`${environment.apiUrl}/auth/logout`, {}).subscribe(() => {
      this.storageService.remove('login').then(
        () => {
          this.reset();
          return this.router.navigate(['/login']);
        }
      );
    });
  }

  register(user) {
    const obj = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    };
    return this.http.post(`${environment.apiUrl}/auth/register`, obj);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(id, params) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id === this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          this.loginObj.user = user;
          this.storageService.set('login', this.loginObj);
        }
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id === this.userValue.id) {
          this.logout();
        }
        return x;
      }));
  }

  isLoggedIn(): boolean {
    return !!this.tokenValue;
  }

  loadAllData(): Observable<any> {
    return this.http.get<{data: any, status: string}>(`${environment.apiUrl}/auth/user`).pipe(
      switchMap(data => {
        return this.http.post(`${environment.apiUrl}/app/customerbyuser`, {id: data.data.id}).pipe(
          map((user: any) => {
            this.loginObj.user = this.userValue = user;
            this.historyService.allHistories = user.history;
            this.storageService.set('login', this.loginObj);
          })
        );
    }),
    catchError(errorForFirstOrSecondCall => {
      console.error('An error occurred: ', errorForFirstOrSecondCall);
      // if you want to handle this error and return some empty data use:
      throw new Error('Error: ' + errorForFirstOrSecondCall.message);
    }));

  }

}
