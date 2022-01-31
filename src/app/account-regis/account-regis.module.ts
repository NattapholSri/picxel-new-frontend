import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountRegisPageRoutingModule } from './account-regis-routing.module';

import { AccountRegisPage } from './account-regis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountRegisPageRoutingModule
  ],
  declarations: [AccountRegisPage]
})
export class AccountRegisPageModule {}
