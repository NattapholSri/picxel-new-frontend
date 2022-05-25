import { Component, Input, NgZone,OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PaymentsService } from 'src/app/services/api/payments.service';
import { UserService } from 'src/app/services/api/user.service';
import { SubscriptPlanService } from 'src/app/services/api/subscript-plan.service';


@Component({
  selector: 'app-manage-omise',
  templateUrl: './manage-omise.component.html',
  styleUrls: ['./manage-omise.component.scss'],
})
export class ManageOmiseComponent implements OnInit {
  @Input() customer:any

  activeAllow:boolean = false

  constructor(
    private userServ: UserService,
    private subPlanServ: SubscriptPlanService,
    private router:Router,
    private ngZone:NgZone,
    private paymentServ:PaymentsService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.activeAllow = this.customer != undefined
    console.log('omise_id ' + this.customer  +' ' + this.activeAllow)
  }


  createOmiseAccount(){
    this.paymentServ.createCustomer().subscribe((res) => {
      console.log('success ' + res)
      alert('เปิดใช้ระบบสำหรับการทำธุรกรรมเสร็จสิ้น ต้องเข้าสู่ระบบอีกครั้งเพื่อใช้งาน')
      this.ngZone.run(() => this.userLogout())
    },(err) => console.log(err))
  }

  manageCard(){
    this.ngZone.run(() => this.router.navigateByUrl('/view-credit-card/'+this.customer))

  }

  manageRecipt(){
    this.ngZone.run(() => this.router.navigateByUrl('manage-recipient'))
  }

  userLogout(){
    this.userServ.ReqLogout() 
    .subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )

    this.ngZone.run(() => this.router.navigateByUrl('/'))
  }

  async createOmiseAlert(){
    const alert = await this.alertCtrl.create({
      header: 'ดำเนินการเปิดบัญชี Omise',
      message: 'เมื่อเปิดบัญชีแล้วจะสามารถ ใช้งานบริการซื้อขายบนแพลตฟอร์มได้ ผ่านผู้ให้บริการ Payment gateway (Omise), ต้องการดำเนินการต่อหรือไม่',
      buttons: [
        {
        text: 'ยกเลิก',
        role: 'cancel'
        },{
          text: 'ตกลงและดำเนินต่อ',
          handler: () => {
            this.createOmiseAccount()
          }
        }
      ]
    });

    await alert.present();

  }

}
