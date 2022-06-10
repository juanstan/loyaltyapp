import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VesselDetailPage } from './vessel-detail';

const routes: Routes = [
  {
    path: '',
    component: VesselDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselDetailPageRoutingModule { }
