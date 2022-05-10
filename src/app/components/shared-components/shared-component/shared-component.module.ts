import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommentMenuComponent } from '../comment-menu/comment-menu.component';
import { PopUserMenuComponent } from '../pop-user-menu/pop-user-menu.component';
import { SmartSearchboxComponent } from '../../multi-page-use/smart-searchbox/smart-searchbox.component';
import { CategoryPostComponent } from '../category-post/category-post.component';
import { CommentTagPostComponent } from '../../comment/comment-tag-post/comment-tag-post.component';
import { BuyPostComponent } from '../buy-post/buy-post.component';


@NgModule({
  declarations: [
    CommentMenuComponent,
    PopUserMenuComponent,
    SmartSearchboxComponent,
    CategoryPostComponent,
    CommentTagPostComponent,
    BuyPostComponent
  ],
  imports: [
    CommonModule,IonicModule,FormsModule,RouterModule
  ],
  exports: [CommentMenuComponent,PopUserMenuComponent,SmartSearchboxComponent,CategoryPostComponent,CommentTagPostComponent, BuyPostComponent],
})
export class SharedComponentModule { }
