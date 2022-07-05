import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StorePage } from './store';
import { StorePageRoutingModule } from './store-routing.module';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorePageRoutingModule
  ],
  providers: [
    LaunchNavigator
  ],
  declarations: [
    StorePage
  ]
})
export class StoreModule { }
