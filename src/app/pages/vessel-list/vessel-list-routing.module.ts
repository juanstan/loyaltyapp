import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VesselListPage } from './vessel-list';
const routes: Routes = [
  {
    path: '',
    component: VesselListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselListPageRoutingModule {}
