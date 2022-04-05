import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PlanListComponent } from '../plan-list/plan-list.component';

@NgModule({
  declarations: [PlanListComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports: [PlanListComponent]
})
export class SubscriptModule { }
