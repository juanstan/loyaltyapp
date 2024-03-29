import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {catchError, first, map, switchMap, take} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {User} from '../model/user';
import {LoginResult} from '../model/auth/login-result';
import {StorageService} from '../core/services/storage.service';
import {Observable} from 'rxjs';
import {snapshot} from '../shared/utils/snapshot.util';
import {HistoryService} from './history.service';
import * as moment from 'moment';
import {History} from '../model/history';
import {ProgramService} from './program.service';
import {Program} from '../model/program';


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
    private historyService: HistoryService,
    private programService: ProgramService
  ) {

  }

  async init(): Promise<LoginResult> {
    return await this.storageService.get('login').then(
      login => {
        if (!login?.user) {
          this.logout();
          return null;
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
    this.loginObj.user = user;
  }

  public get tokenValue(): string {
    return this.loginObj?.token;
  }

  public login(username, password): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${environment.apiUrl}/auth/login`, { email: username, password, locale: 'en', remember: true })
      .pipe(
        map(login => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.loginObj = {
            token: login.token,
            last_login: moment().format()
          };
          return this.loginObj;
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
      name: user.first_name + ' ' + user.last_name,
      gender: user.gender,
      email: user.email,
      date_of_birth: user.date_of_birth,
      nationality: user.nationality,
      country_id: +user.country,
      region_id: +user.region,
      city_id: +user.city,
      phone: user.phone,
      password: user.password,
      password_confirmation: user.password_confirmation,
      program_id: environment.program_id,
      created_by: environment.user_id,
      active: 0
    };

    return this.http.post(`${environment.apiUrl}/customer/save`, obj);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(user) {
    const obj = {
      name: user.name,
      gender: user.gender,
      email: user.email,
      date_of_birth: user.date_of_birth,
      nationality: user.nationality,
      country_id: +user.country,
      region_id: +user.region,
      city_id: +user.city,
      phone: user.phone,
      password: user.password,
      password_confirmation: user.password_confirmation,
      program_id: environment.program_id,
      created_by: environment.user_id,
      sendVerification: false,
      active: 0
    };
    return this.http.post(`${environment.apiUrl}/customer/save`, obj);
    /*return this.http.post(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id === this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          this.loginObj.user = user;
          this.storageService.set('login', this.loginObj);
        }
        return x;
      }));*/
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
    return this.http.get<{programID: number}>(`${environment.apiUrl}/app/getprogram/${environment.program}`).pipe(
      switchMap(program => {
        return this.http.get<{data: any, status: string}>(`${environment.apiUrl}/auth/user`).pipe(
          switchMap(dataUser => {
            return this.http.post<User>(`${environment.apiUrl}/app/customerbyuser`, {id: dataUser.data.id}).pipe(
              switchMap(dataCustomer => {
                return this.http.get(`${environment.apiUrl}/app/customer/${dataCustomer.uuid}`).pipe(
                  map((customer: any) => {
                    this.loginObj.user = this.userValue = dataCustomer;
                    // If the user is verified we keep his info
                    if (dataCustomer.email_verified_at) {
                      const programInfo = customer.programs.find(pro => pro.id === program.programID);
                      this.programService.program$.next(programInfo);
                      this.historyService.allHistories = programInfo?.histories;
                      this.storageService.set('program', programInfo);
                      this.storageService.set('login', this.loginObj);
                    }
                    return this.loginObj;
                  })
                );
              })
            );
          })
        );
      }),
    catchError(error => {
      console.error('An error occurred: ', error);
      // if you want to handle this error and return some empty data use:
      throw new Error(error);
    }));

  }

}
