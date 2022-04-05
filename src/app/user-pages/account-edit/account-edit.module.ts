import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountEditPageRoutingModule } from './account-edit-routing.module';

import { AccountEditPage } from './account-edit.page';
import { SubscriptModule } from 'src/app/components/subscription/subscipt/subscript.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountEditPageRoutingModule,
    SubscriptModule
  ],
  declarations: [AccountEditPage]
})
export class AccountEditPageModule {}
