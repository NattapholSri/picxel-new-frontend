import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CommentMenuComponent } from '../comment-menu/comment-menu.component';
import { PopUserMenuComponent } from '../pop-user-menu/pop-user-menu.component';



@NgModule({
  declarations: [CommentMenuComponent,PopUserMenuComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports: [CommentMenuComponent,PopUserMenuComponent],
})
export class SharedComponentModule { }
