import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { LoadingController,AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment'

import { PaymentsService } from 'src/app/services/api/payments.service';
import { UserService } from 'src/app/services/api/user.service';
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

  this_year = new Date().getFullYear()

  
  expiration_month:number = 1
  expiration_year:number = 2022

  input_card_name:string
  input_card_number:string
  input_card_cvc:number
  token_card:string

  constructor(
    private router:Router,
    private ngZone:NgZone,
    public formBulider: FormBuilder,
    private paymentServ:PaymentsService,
    private userServ: UserService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { 
    for (let i = this.this_year; i < this.this_year+15; i++){
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

  async errorAlert() {
    const alert = await this.alertCtrl.create({
      header: 'เกิดข้อผิดพลาด',
      message: 'ไม่สามารถเพิ่มบัตรเครดิตได้ โปรดตรวจสอบข้อมูลที่กรอก แล้วลองใหม่อีกครั้ง',
      buttons: ['OK']
    });

    await alert.present();
  }

  async onSubmit(){
    await this.loadingCtrl.create({
      message: 'กำลังดำเนินการ โปรดรอ',
      spinner: "circular"
    }).then((res) => {
      res.present();
    })


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
      async (statusCode:any, response:any) => {
        if (response.object == "error") {
          // Display an error message.
          let message_text = "SET YOUR SECURITY CODE CHECK FAILED MESSAGE";
          if(response.object == "error") {
            message_text = response.message;
          }
          await this.loadingCtrl.dismiss().then((res) => {
            console.log('Done', res);
          }).catch((error) => {
            console.log('error', error);
          })
          this.errorAlert()
        }
        else{
          console.log(response)
          console.log(response.id)
          this.paymentServ.addCustomerCard(response.id).subscribe(
            async (res) => {
              console.log(res)
              await this.loadingCtrl.dismiss().then((res) => {
                console.log('Done', res);
              }).catch((error) => {
                console.log('error', error);
              })
              alert('add card complete')
              this.ngZone.run(() => history.back())
            },
            async (err) => {
              console.log(err)
              await this.loadingCtrl.dismiss().then((res) => {
                console.log('respond error', res);
              }).catch((error) => {
                console.log('error', error);
              })
            }
          )
        }
      }
    )

  }

}
