import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsPage } from './settings';
import { SettingsPageRoutingModule } from './settings-routing.module';
import {AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SettingsPageRoutingModule,
    SwiperModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbklWdlnxxvJeLQkjEYelVciCT0EUMsv0'
    }),
  ],
  declarations: [SettingsPage],
  entryComponents: [SettingsPage],
  providers: [GoogleMapsAPIWrapper ]
})
export class SettingsModule {}
