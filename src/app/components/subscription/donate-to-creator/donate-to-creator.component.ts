import { Component, OnInit,Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PaymentsService } from 'src/app/services/api/payments.service';
import { donateForm } from 'src/app/services/data-model/subscription.model';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-donate-to-creator',
  templateUrl: './donate-to-creator.component.html',
  styleUrls: ['./donate-to-creator.component.scss'],
})
export class DonateToCreatorComponent implements OnInit {

  @Input() creator_id:string

  user_card_list:any[] = []
  selected_card:string

  money_amount:number

  constructor(
    private alertCtrl:AlertController,
    private paymentServ: PaymentsService,
    private popOverCtrl:PopoverController
  ) { 
    this.paymentServ.listCustomerCard().subscribe(
      (res) => {
        console.log(res.list.data)
        this.user_card_list = res.list.data
      }
    )
  }

  ngOnInit() {}

  onDonate(){
    if (this.money_amount < 30 || this.money_amount == undefined){
      alert('จำนวนเงินที่จะใช้ในการบริจาคมีน้อยเกินไป (ขั้นต่ำ 30 บาท)')
    }
    else{
      let donation:donateForm = {
        creatorId:this.creator_id,
        cardId:this.selected_card,
        amount:this.money_amount
      }
  
      console.log(donation)
  
      this.paymentServ.donateTo(donation).subscribe(
        async (res) => {
          console.log(res)
          const alert = await this.alertCtrl.create({
            header: 'บริจาคสำเร็จ',
            message: 'เงินของคุณถูกส่งไปไปให้กับผู้สร้างผลงานคนนี้แล้ว',
            buttons: ['OK']
          });
      
          await alert.present();
          this.DismissClick()
  
  
        }, async (err) =>{
          console.log(err)
          const alert = await this.alertCtrl.create({
            header: 'เกิดข้อผิดพลาด',
            message: 'เกิดข้อผิดพลาดกับระบบบริจาค',
            buttons: ['OK']
          });
      
          await alert.present();
        }
      )
    }
    
  }

  async DismissClick() {
    await this.popOverCtrl.dismiss();
  }

}
