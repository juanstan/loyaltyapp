import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VesselEditPage } from './vessel-edit';
import { VesselEditPageRoutingModule } from './vessel-edit-routing.module';
import { IonicModule } from '@ionic/angular';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VesselEditPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    VesselEditPage,
  ],
  providers: [
    BarcodeScanner
  ]
})
export class VesselEditModule { }
