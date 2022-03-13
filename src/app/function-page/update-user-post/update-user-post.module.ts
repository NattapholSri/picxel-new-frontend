import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUserPostPageRoutingModule } from './update-user-post-routing.module';

import { UpdateUserPostPage } from './update-user-post.page';
import { PostUpdateComponent } from 'src/app/components/postCRUD/post-update/post-update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateUserPostPageRoutingModule
  ],
  declarations: [UpdateUserPostPage,PostUpdateComponent]
})
export class UpdateUserPostPageModule {}
