import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VesselEditPage } from './vessel-edit';

const routes: Routes = [
  {
    path: '',
    component: VesselEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselEditPageRoutingModule { }
