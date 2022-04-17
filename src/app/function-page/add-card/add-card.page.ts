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

  constructor(
    private router:Router,
    private ngZone:NgZone,
    public formBulider: FormBuilder,
    private paymentServ:PaymentsService,
    private userServ: UserService,
    private subPlanServ: SubscriptPlanService,
  ) { 
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

    let tokenParameters = {
      city: "New York",
      country: "US",
      expiration_month: 2,
      expiration_year: 2022,
      name: "Somchai Prasert",
      number: "4242424242424242",
      phone_number: "0123456789",
      postal_code: 10320,
      security_code: 123,
      state: "NY",
      street1: "476 Fifth Avenue",
    }

    Omise.createToken(
      "card",
      tokenParameters,
      function (statusCode:any, response:any) {
        console.log("it works");
        console.log(response);
      }
    )

  }

}
