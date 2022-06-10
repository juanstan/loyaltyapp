import {Component, ChangeDetectorRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {AlertService} from '../../shared/services/alert.service';
import {Interest} from '../../model/interest';
import {VesselService} from '../../providers/vessel.service';
import {Vessel} from '../../model/vessel';
/*import {AgmMap, MapsAPILoader} from '@agm/core';*/


@Component({
  selector: 'page-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class SettingsPage {
  form: FormGroup;
  submitted = false;
  loading = false;
  interests: Interest[];
  // @ViewChild(AgmMap, {static: true}) public agmMap: AgmMap;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private vesselService: VesselService,
    // private mapsAPILoader: MapsAPILoader
  ) {
    this.interests = [
      { name: 'Nautical', value: 'nautical'},
      { name: 'Test', value: 'test' }
    ];
    this.form = this.formBuilder.group({
      initialLat: [''],
      initialLng: [''],
      mapBoxTemplate: ['', Validators.required],
      mode: ['', Validators.required],
      // interest: this.formBuilder.array([])
    });
    this.getCurrentAddress();
    /*this.vesselService.allVessels = [...this.vesselService.vessels, {
      id: 2,
      img: null,
      lat: 50.751325,
      lng: -1.716767,
      name: 'The Pirate Ship',
      updated_at: null,
      created_at: null
    } as Vessel];*/
  }

  onCheckboxChange(e) {
    const interest: FormArray = this.form.get('interest') as FormArray;
    if (e.target.checked && !interest.value.includes(e.target.value)) {
      interest.push(new FormControl(e.target.value));
    } else if (!e.target.checked) {
      let i = 0;
      interest.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          interest.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  ionViewWillEnter() {
    this.storage.get('settings').then(settings => {
      for (const settingKey in settings) {
        if (settings.hasOwnProperty(settingKey)) {
          this.form.controls[settingKey]?.setValue(settings[settingKey]);
        }
      }
    });
  }


  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.storage.set('settings', this.form.value);
  }

  getCurrentAddress() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.form.controls['initialLat']?.setValue(position.coords.latitude);
          this.form.controls['initialLng']?.setValue(position.coords.longitude);
          // this.getAddress = ( this.form.value.latitude, this.form.value.longitude);
          /*this.mapsAPILoader.load().then(() => {
            const geocoder = new google.maps.Geocoder();
            const latlng = {
              lat: this.form.value.latitud,
              lng: this.form.value.longitude
            };
            geocoder.geocode({
              'location': latlng
            }, function(results) {
              if (results[0]) {
                this.currentLocation = results[0].formatted_address;
                console.log(this.assgin);
              } else {
                console.log('Not found');
              }
            });
          });*/
        }
      });
    }
  }
}
