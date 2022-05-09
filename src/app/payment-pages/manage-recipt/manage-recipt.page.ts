import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { PaymentsService } from 'src/app/services/api/payments.service';
import { UserService } from 'src/app/services/api/user.service';

import { omiseRecipt } from 'src/app/services/data-model/omise.model';
import { UserDetails } from 'src/app/services/data-model/user.model';


@Component({
  selector: 'app-manage-recipt',
  templateUrl: './manage-recipt.page.html',
  styleUrls: ['./manage-recipt.page.scss'],
})
export class ManageReciptPage implements OnInit {

  recipt_list:any[] = []

  currentUser = localStorage.getItem('usr_login')
  default_acc:string

  constructor(
    private router:Router,
    private ngZone:NgZone,
    private paymentServ:PaymentsService,
    private userServ: UserService,
    private alertCtrl: AlertController
  ) {
    this.userServ.AutoLogout()
    this.userServ.ReqUserDetail(this.currentUser).subscribe(
      (res) => {
        console.log(res)
        if (res.omise_donate_recipient_id != undefined){
          this.default_acc = res.omise_donate_recipient_id
        }
      },(err) => console.log(err)
    )

    this.paymentServ.getCustomerReciptInfo().subscribe(
      (res) => {
        console.log(res.customer.metadata.recipients)
        let recipt_data = res.customer.metadata.recipients
        let recipt_key = Object.keys(recipt_data)
        console.log(recipt_key)
        for (let key of recipt_key){
          this.paymentServ.getRecipientInfo(key).subscribe(
            (res) =>{
              console.log(res.resp)
              this.recipt_list.push(res.resp)
            }
          )
        }
      }
    )
  }

  ngOnInit() {
  }

  async attentionReciptAction(tk_id:string){
    console.log(tk_id)
    const alert = await this.alertCtrl.create({
      header: 'ลบบัญชีนี้ ?',
      buttons: [
        {
        text: 'ยกเลิก',
        role: 'cancel'
        },{
          text: 'ลบ',
          handler: () => {
            this.deleteRecipt(tk_id)
          }
        }
      ]
    });

    await alert.present();

  }

  deleteRecipt(card_tk_id:string){
    console.log(card_tk_id)
    this.paymentServ.deleteRecipient(card_tk_id).subscribe(
      (res) => {
        console.log(res)
        location.reload()
      },(err) => console.log(err)
    )

  }

  setDefaultRecipt(acc_tk_id:string){
    console.log(acc_tk_id)
    let update_data:UserDetails = {omise_donate_recipient_id:acc_tk_id}
    this.userServ.updateUserData(update_data).subscribe(
      (res) => {
        console.log(res)
        location.reload()
      },(err) =>{
        alert('เกิดข้อผิดพลาด โปรดลองใหม่ในภายหลัง')
        console.log(err)
      }
    )
  }

}
