import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountDetailPageRoutingModule } from './account-detail-routing.module';
import { SharedComponentModule } from 'src/app/components/shared-components/shared-component/shared-component.module';

import { AccountDetailPage } from './account-detail.page';
import { PostViewComponent } from 'src/app/components/postCRUD/post-view/post-view.component';
import { CommentPostComponent } from 'src/app/components/comment/comment-post/comment-post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountDetailPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [AccountDetailPage,PostViewComponent,CommentPostComponent],
})
export class AccountDetailPageModule {}
