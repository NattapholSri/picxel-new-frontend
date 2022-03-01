import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountDetailPageRoutingModule } from './account-detail-routing.module';

import { AccountDetailPage } from './account-detail.page';
import { PostComponent } from 'src/app/components/post/post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountDetailPageRoutingModule
  ],
  declarations: [AccountDetailPage,PostComponent]
})
export class AccountDetailPageModule {}
