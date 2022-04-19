import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddReciptPage } from './add-recipt.page';

const routes: Routes = [
  {
    path: '',
    component: AddReciptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddReciptPageRoutingModule {}
