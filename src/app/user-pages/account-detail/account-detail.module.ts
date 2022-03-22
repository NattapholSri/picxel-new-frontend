import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountDetailPageRoutingModule } from './account-detail-routing.module';

import { AccountDetailPage } from './account-detail.page';
import { PostViewComponent } from 'src/app/components/postCRUD/post-view/post-view.component';
import { CommentPostComponent } from 'src/app/components/multi-page-use/comment-post/comment-post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountDetailPageRoutingModule
  ],
  declarations: [AccountDetailPage,PostViewComponent,CommentPostComponent]
})
export class AccountDetailPageModule {}
