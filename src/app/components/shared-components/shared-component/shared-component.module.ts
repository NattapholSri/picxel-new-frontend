import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CommentMenuComponent } from '../comment-menu/comment-menu.component';



@NgModule({
  declarations: [CommentMenuComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports: [CommentMenuComponent],
})
export class SharedComponentModule { }
