import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:
      [
        {
          path: 'home',
          outlet: 'home',
          pathMatch: 'full'
        },
        {
          path: 'home',
          outlet: 'home',
          pathMatch: 'full'
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
