import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { PaymentsService } from 'src/app/services/api/payments.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-view-credit-card',
  templateUrl: './view-credit-card.page.html',
  styleUrls: ['./view-credit-card.page.scss'],
})
export class ViewCreditCardPage implements OnInit {

  card_list:any[] = []

  constructor(
    private router:Router,
    private ngZone:NgZone,
    public formBulider: FormBuilder,
    private paymentServ:PaymentsService,
    private userServ: UserService,
    private alertCtrl: AlertController
  ) {
    this.userServ.AutoLogout()
    /* let user_id = localStorage.getItem('current_log_uid')
    this.userServ.ReqUserDetail(user_id).subscribe((res) => {
        console.log(res)
        this.user_data = res
    }) */

    this.paymentServ.listCustomerCard().subscribe(
      (res) => {
        console.log(res.list.data)
        this.card_list = res.list.data
      }
    )
  }

  ngOnInit() {
  }

  async attentionCardAction(card_tk_id:string){
    console.log(card_tk_id)
    const alert = await this.alertCtrl.create({
      header: 'ลบบัตรเครดิตนี้ ?',
      buttons: [
        {
        text: 'ยกเลิก',
        role: 'cancel'
        },{
          text: 'ลบ',
          handler: () => {
            this.deleteCard(card_tk_id)
          }
        }
      ]
    });

    await alert.present();

  }

  deleteCard(card_tk_id:string){
    this.paymentServ.deleteCustomerCard(card_tk_id).subscribe(
      (res) => {
        console.log(res)
        location.reload()
      },(err) => console.log(err)
    )

  }

  refreshThisPage(event){
    console.log('Begin async operation');

    setTimeout(() => {
      location.reload();
      event.target.complete();
    }, 1000);
  }

}
