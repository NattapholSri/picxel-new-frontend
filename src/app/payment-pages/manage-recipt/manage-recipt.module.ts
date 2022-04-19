import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageReciptPageRoutingModule } from './manage-recipt-routing.module';

import { ManageReciptPage } from './manage-recipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageReciptPageRoutingModule
  ],
  declarations: [ManageReciptPage]
})
export class ManageReciptPageModule {}
