import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SharedComponentModule } from '../components/shared-components/shared-component/shared-component.module';

import { HomePageRoutingModule } from './home-routing.module';
import { PostCreateComponent } from '../components/postCRUD/post-create/post-create.component';
import { RandomAllPostComponent } from '../components/random-all-post/random-all-post.component';
import { SmartSearchboxComponent } from '../components/multi-page-use/smart-searchbox/smart-searchbox.component';
import { CommentOnRndPostComponent } from '../components/comment/comment-on-rnd-post/comment-on-rnd-post.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,SharedComponentModule
  ],
  declarations: [HomePage,PostCreateComponent,RandomAllPostComponent,SmartSearchboxComponent,CommentOnRndPostComponent]
})
export class HomePageModule {}
