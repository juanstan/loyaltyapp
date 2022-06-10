import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserData } from './providers/user-data';
import {AccountService} from './providers/account.service';
import {StorageService} from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Account',
      url: '/app/tabs/account',
      icon: 'person'
    },
    {
      title: 'About Marine Tracker',
      url: '/app/tabs/about',
      icon: 'information-circle'
    },
    {
      title: 'Support',
      url: '/support',
      icon: 'help'
    }
  ];
  loggedIn = false;
  dark = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private accountService: AccountService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async checkLoginStatus() {
    await this.storageService.init();
    await this.accountService.init();

    if (!this.accountService.userValue) {
      return this.router.navigateByUrl('/login');
    }

    await this.accountService.loadAllData().subscribe();

    return;

  }

  logout() {
    this.accountService.logout();
  }

}
