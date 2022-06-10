import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VesselDetailPage } from './vessel-detail';
import { VesselDetailPageRoutingModule } from './vessel-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VesselDetailPageRoutingModule
  ],
  declarations: [
    VesselDetailPage,
  ]
})
export class VesselDetailModule { }
