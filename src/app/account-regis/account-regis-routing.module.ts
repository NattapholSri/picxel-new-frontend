import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountRegisPage } from './account-regis.page';

const routes: Routes = [
  {
    path: '',
    component: AccountRegisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRegisPageRoutingModule {}
