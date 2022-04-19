import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageReciptPage } from './manage-recipt.page';

const routes: Routes = [
  {
    path: '',
    component: ManageReciptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageReciptPageRoutingModule {}
