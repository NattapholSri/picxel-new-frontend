import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PlanListComponent } from '../plan-list/plan-list.component';
import { UserSubscriptComponent } from '../user-subscript/user-subscript.component';

@NgModule({
  declarations: [PlanListComponent,UserSubscriptComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports: [PlanListComponent,UserSubscriptComponent]
})
export class SubscriptModule { }
