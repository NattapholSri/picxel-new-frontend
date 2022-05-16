import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenGuard } from './authen.guard';
import { PaymentExistGuard } from './additional-guard/payment-exist.guard';
import { DisableIfLoginGuard } from './additional-guard/disable-if-login.guard';

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
    loadChildren: () => import('./user-pages/account-regis/account-regis.module').then( m => m.AccountRegisPageModule),
    canActivate: [ DisableIfLoginGuard ]
  },
  {
    path: 'account-login',
    loadChildren: () => import('./user-pages/account-login/account-login.module').then( m => m.AccountLoginPageModule),
    canActivate:[DisableIfLoginGuard]
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
    loadChildren: () => import('./function-page/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule),
    canActivate: [ DisableIfLoginGuard ]
  },
  {
    path: 'account-edit',
    loadChildren: () => import('./user-pages/account-edit/account-edit.module').then( m => m.AccountEditPageModule),
    canActivate: [AuthenGuard]
  },
  {
    path: 'update-user-post/:postId',
    loadChildren: () => import('./function-page/update-user-post/update-user-post.module').then( m => m.UpdateUserPostPageModule),
    canActivate: [AuthenGuard]
  },
  {
    path: 'password-change',
    loadChildren: () => import('./user-pages/password-change/password-change.module').then( m => m.PasswordChangePageModule),
    canActivate: [AuthenGuard]
  },
  {
    path: 'create-plan',
    loadChildren: () => import('./function-page/create-plan/create-plan.module').then( m => m.CreatePlanPageModule),
    canActivate: [PaymentExistGuard]
  },
  {
    path: 'edit-plan/:planId',
    loadChildren: () => import('./function-page/edit-plan/edit-plan.module').then( m => m.EditPlanPageModule),
    canActivate: [PaymentExistGuard]
  },
  {
    path: 'chat-page/:messageBoxId',
    loadChildren: () => import('./chat-page/chat-page.module').then( m => m.ChatPagePageModule)
  },
  {
    path: 'add-card',
    loadChildren: () => import('./payment-pages/add-card/add-card.module').then( m => m.AddCardPageModule),
    canActivate: [PaymentExistGuard]
  },
  {
    path: 'view-credit-card/:omiseId',
    loadChildren: () => import('./payment-pages/view-credit-card/view-credit-card.module').then( m => m.ViewCreditCardPageModule),
    canActivate: [PaymentExistGuard]
  },
  {
    path: 'add-recipient',
    loadChildren: () => import('./payment-pages/add-recipt/add-recipt.module').then( m => m.AddReciptPageModule),
    canActivate: [PaymentExistGuard]
  },
  {
    path: 'manage-recipient',
    loadChildren: () => import('./payment-pages/manage-recipt/manage-recipt.module').then( m => m.ManageReciptPageModule),
    canActivate: [PaymentExistGuard]
  },
  {
    path: 'confirm-subscription',
    loadChildren: () => import('./payment-pages/confirm-subscription/confirm-subscription.module').then( m => m.ConfirmSubscriptionPageModule),
    canActivate: [AuthenGuard]
  },
  {
    path: 'post-with-tag/:tagname',
    loadChildren: () => import('./function-page/post-with-tag/post-with-tag.module').then( m => m.PostWithTagPageModule)
  },
  {
    path: 'post-with-id/:postID',
    loadChildren: () => import('./function-page/post-with-id/post-with-id.module').then( m => m.PostWithIdPageModule)
  }










];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
