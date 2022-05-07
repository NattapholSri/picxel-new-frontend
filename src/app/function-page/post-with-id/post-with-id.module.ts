import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostWithIdPageRoutingModule } from './post-with-id-routing.module';

import { PostWithIdPage } from './post-with-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostWithIdPageRoutingModule
  ],
  declarations: [PostWithIdPage]
})
export class PostWithIdPageModule {}
