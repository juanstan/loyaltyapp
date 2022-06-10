import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import {SettingsPage} from '../settings/settings';
import {VesselEditPage} from "../vessel-edit/vessel-edit";


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'settings',
        children: [
          {
            path: '',
            component: SettingsPage,
          }/*,
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          }*/
        ]
      },
      {
        path: 'vessel-edit',
        children: [
          {
            path: '',
            component: VesselEditPage,
          }/*,
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          }*/
        ]
      },
      {
        path: 'vessels',
        children: [
          {
            path: '',
            loadChildren: () => import('../vessel-list/vessel-list.module').then(m => m.VesselListModule)
          },
         /* {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          },*/
          {
            path: 'vessel-details/:vesselId',
            loadChildren: () => import('../vessel-detail/vessel-detail.module').then(m => m.VesselDetailModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(m => m.MapModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

