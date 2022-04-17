import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PlanListComponent } from '../plan-list/plan-list.component';
import { UserSubscriptComponent } from '../user-subscript/user-subscript.component';
import { ManageOmiseComponent } from '../manage-omise/manage-omise.component';

@NgModule({
  declarations: [PlanListComponent,UserSubscriptComponent,ManageOmiseComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports: [PlanListComponent,UserSubscriptComponent,ManageOmiseComponent]
})
export class SubscriptModule { }
