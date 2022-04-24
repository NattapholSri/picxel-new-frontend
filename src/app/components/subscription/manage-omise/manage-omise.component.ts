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
      location.reload()
    },(err) => console.log(err))
  }

  async manageCard(){
    const alert = await this.alertCtrl.create({
      header: 'ตัวในเลือกการกับบัตรเครดิต',
      buttons: [
        {
        text: 'ปิดเมนู',
        role: 'cancel'
        },{
          text: 'เพิ่มบัตรเครดิต',
          handler: () => {
            this.ngZone.run(() => this.router.navigateByUrl('/add-card'))
          }
        },{
          text: 'จัดการบัตรเครดิต',
          handler: () => {
            this.ngZone.run(() => this.router.navigateByUrl('/view-credit-card/'+this.customer))
          }
        }
      ]
    });

    await alert.present();

  }

  async manageRecipt(){
    const alert = await this.alertCtrl.create({
      header: 'ตัวในเลือกการกับบัตรเครดิต',
      buttons: [
        {
        text: 'ปิดเมนู',
        role: 'cancel'
        },{
          text: 'เพิ่มช่องทางในการรับเงิน',
          handler: () => {
            this.ngZone.run(() => this.router.navigateByUrl('add-recipient'))
          }
        },{
          text: 'จัดการช่องทางในการรับเงิน',
          handler: () => {
            this.ngZone.run(() => this.router.navigateByUrl('manage-recipient'))
          }
        }
      ],
      mode: "md",
    });

    await alert.present();

  }

}
