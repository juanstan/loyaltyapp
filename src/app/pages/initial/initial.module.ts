import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InitialPage } from './initial';
import { InitialRoutingModule } from './initial-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    InitialRoutingModule,
  ],
  declarations: [
    InitialPage,
  ]
})
export class InitialModule { }
