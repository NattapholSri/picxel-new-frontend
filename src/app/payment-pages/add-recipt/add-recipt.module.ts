import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddReciptPageRoutingModule } from './add-recipt-routing.module';

import { AddReciptPage } from './add-recipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddReciptPageRoutingModule
  ],
  declarations: [AddReciptPage]
})
export class AddReciptPageModule {}
