import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { PaymentsService } from 'src/app/services/api/payments.service';
import { UserService } from 'src/app/services/api/user.service';

import { omiseRecipt } from 'src/app/services/data-model/omise.model';


@Component({
  selector: 'app-manage-recipt',
  templateUrl: './manage-recipt.page.html',
  styleUrls: ['./manage-recipt.page.scss'],
})
export class ManageReciptPage implements OnInit {

  recipt_list:any[] = []

  constructor(
    private router:Router,
    private ngZone:NgZone,
    private paymentServ:PaymentsService,
    private userServ: UserService,
    private alertCtrl: AlertController
  ) {
    this.userServ.AutoLogout()

    /* this.paymentServ.listCustomerRecipt().subscribe(
      (res) => {
        console.log(res.list.data)
        //this.recipt_list = res.list.data
      }
    ) */
  }

  ngOnInit() {
  }

  async attentionReciptAction(card_tk_id:string){
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
            this.deleteRecipt(card_tk_id)
          }
        }
      ]
    });

    await alert.present();

  }

  deleteRecipt(card_tk_id:string){
    let data: omiseRecipt
    this.paymentServ.updateRecipient(data).subscribe(
      (res) => {
        console.log(res)
        location.reload()
      },(err) => console.log(err)
    )

  }

}
