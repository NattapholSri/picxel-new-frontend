import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPlanPageRoutingModule } from './edit-plan-routing.module';

import { EditPlanPage } from './edit-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPlanPageRoutingModule
  ],
  declarations: [EditPlanPage]
})
export class EditPlanPageModule {}
