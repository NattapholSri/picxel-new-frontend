import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { PlanListComponent } from './plan-list/plan-list.component';
import { UserSubscriptComponent } from './user-subscript/user-subscript.component';
import { ManageOmiseComponent } from './manage-omise/manage-omise.component';
import { CardSelectorComponent } from './card-selector/card-selector.component';


@NgModule({
  declarations: [PlanListComponent,UserSubscriptComponent,ManageOmiseComponent,CardSelectorComponent],
  imports: [
    CommonModule,IonicModule,FormsModule
  ],
  exports: [PlanListComponent,UserSubscriptComponent,ManageOmiseComponent,CardSelectorComponent]
})
export class SubscriptModule { }
