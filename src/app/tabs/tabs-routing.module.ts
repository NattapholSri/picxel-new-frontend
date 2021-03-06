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
          children: [
            {
              path: '',
              loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
            }
          ]
          
        },
        {
          path: 'account-detail/:username',
          loadChildren: () => import('../user-pages/account-detail/account-detail.module').then( m => m.AccountDetailPageModule)
        },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
