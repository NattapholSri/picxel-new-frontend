import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUserPostPage } from './update-user-post.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateUserPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateUserPostPageRoutingModule {}
