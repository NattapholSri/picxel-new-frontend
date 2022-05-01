import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostWithTagPageRoutingModule } from './post-with-tag-routing.module';

import { PostWithTagPage } from './post-with-tag.page';

import { SharedComponentModule } from 'src/app/components/shared-components/shared-component/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostWithTagPageRoutingModule,SharedComponentModule
  ],
  declarations: [PostWithTagPage]
})
export class PostWithTagPageModule {}
