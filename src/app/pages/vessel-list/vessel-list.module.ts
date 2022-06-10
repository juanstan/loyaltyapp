import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { VesselListPage } from './vessel-list';
import { VesselListPageRoutingModule } from './vessel-list-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VesselListPageRoutingModule
  ],
  declarations: [VesselListPage],
})
export class VesselListModule {}
