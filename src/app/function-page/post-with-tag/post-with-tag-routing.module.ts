import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostWithTagPage } from './post-with-tag.page';

const routes: Routes = [
  {
    path: '',
    component: PostWithTagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostWithTagPageRoutingModule {}
