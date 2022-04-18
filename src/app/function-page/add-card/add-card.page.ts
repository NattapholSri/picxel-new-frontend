import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment'

import { PaymentsService } from 'src/app/services/api/payments.service';
import { UserService } from 'src/app/services/api/user.service';
import { SubscriptPlanService } from 'src/app/services/api/subscript-plan.service';
declare var Omise: any;

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {

  omise_public_key = environment.omise_pub_key
  user_data:any = {}

  year_number:number[] = []

  
  expiration_month: 1
  expiration_year: 2022

  input_card_name:string
  input_card_number:string
  input_card_cvc:number

  constructor(
    private router:Router,
    private ngZone:NgZone,
    public formBulider: FormBuilder,
    private paymentServ:PaymentsService,
    private userServ: UserService,
    private subPlanServ: SubscriptPlanService,
  ) { 
    for (let i = 2022; i < 2038; i++){
      this.year_number.push(i)
    }
    this.userServ.AutoLogout()
    let user_id = localStorage.getItem('current_log_uid')
    this.userServ.ReqUserDetail(user_id).subscribe((res) => {
        console.log(res)
        this.user_data = res
    })

  }

  ngOnInit() {
  }

  onSubmit(){
    Omise.setPublicKey(this.omise_public_key)

    let creditCardForm = {
      expiration_month: this.expiration_month,
      expiration_year: this.expiration_year,
      name: this.input_card_name,
      number: this.input_card_number,
      phone_number: this.input_card_cvc,
    }

    Omise.createToken(
      "card",
      creditCardForm,
      function (statusCode:any, response:any) {
        console.log("it works");
        console.log(response);
      }
    )

  }

}
