import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'account-login',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren: () => import('./user-pages/account-regis/account-regis.module').then( m => m.AccountRegisPageModule)
  },
  {
    path: 'account-login',
    loadChildren: () => import('./user-pages/account-login/account-login.module').then( m => m.AccountLoginPageModule)
  },
  {
    path: 'account-detail/:username',
    loadChildren: () => import('./user-pages/account-detail/account-detail.module').then( m => m.AccountDetailPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'account-edit',
    loadChildren: () => import('./user-pages/account-edit/account-edit.module').then( m => m.AccountEditPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
