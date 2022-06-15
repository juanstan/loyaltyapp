import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
  styleUrls: ['./store.scss'],
})
export class StorePage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    console.log('test');
  }


}
