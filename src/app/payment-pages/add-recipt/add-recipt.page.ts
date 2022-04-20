import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';


import { PaymentsService } from 'src/app/services/api/payments.service';
import { UserService } from 'src/app/services/api/user.service';
import { omiseRecipt } from 'src/app/services/data-model/omise.model';


@Component({
  selector: 'app-add-recipt',
  templateUrl: './add-recipt.page.html',
  styleUrls: ['./add-recipt.page.scss'],
})
export class AddReciptPage implements OnInit {

  user_data:any = {}

  reciptData: omiseRecipt = {
    name: '',
    email: '',
    type: '',
    bank_account: {
      name:'',
      number:'',
      brand:''
    }
  }


  constructor(
    private router:Router,
    private ngZone:NgZone,
    public formBulider: FormBuilder,
    private paymentServ:PaymentsService,
    private userServ: UserService,
    private loadingCtrl: LoadingController
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

  submit(){
    console.log(this.reciptData)
    this.paymentServ.createRecipient(this.reciptData).subscribe(
      (res) => {
        console.log(res)
        alert('add recipt complete')
        this.ngZone.run(() => this.router.navigateByUrl('/account-edit'))
      },(err) => console.log(err)
    )
  }

}
