import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PostCreateComponent } from '../components/postCRUD/post-create/post-create.component';
import { RandomAllPostComponent } from '../components/random-all-post/random-all-post.component';
import { SmartSearchboxComponent } from '../components/multi-page-use/smart-searchbox/smart-searchbox.component';
// import { CommentPostComponent } from '../components/multi-page-use/comment-post/comment-post.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,PostCreateComponent,RandomAllPostComponent,SmartSearchboxComponent,/* CommentPostComponent */]
})
export class HomePageModule {}
