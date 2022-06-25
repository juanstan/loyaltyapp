import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {StoreService} from '../../providers/store.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Store} from '../../model/store';
import {Observable} from 'rxjs/internal/Observable';


@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
  styleUrls: ['./store.scss'],
})
export class StorePage implements OnInit {

  stores$: Observable<Store[]>;

  constructor(
    public router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.stores$ = this.storeService.requestStores();
  }


}
