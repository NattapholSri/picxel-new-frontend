import { Component, OnInit,Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PaymentsService } from 'src/app/services/api/payments.service';
import { buySinglePost } from 'src/app/services/data-model/subscription.model';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-buy-post',
  templateUrl: './buy-post.component.html',
  styleUrls: ['./buy-post.component.scss'],
})
export class BuyPostComponent implements OnInit {

  @Input() post_id:string
  @Input() sell_price:number

  user_card_list:any[] = []
  selected_card:string

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

  ngOnInit() {
    console.log('post ID:'+this.post_id)
    console.log('post sell price:'+this.sell_price)
  }

  onDonate(){
    let purchaseForm:buySinglePost = {
      postId:this.post_id,
      cardId:this.selected_card
    }

    console.log(purchaseForm)

    this.paymentServ.purchasePost(purchaseForm).subscribe(
      async (res) => {
        console.log(res)
        const alert = await this.alertCtrl.create({
          header: 'ซื้อโพสต์สำเร็จ',
          message: 'คุณสามารถดูผลงานที่คุณซื้อได้แล้ว',
          buttons: ['OK']
        });
    
        await alert.present();
        this.DismissClick()


      }, async (err) =>{
        console.log(err)
        const alert = await this.alertCtrl.create({
          header: 'เกิดข้อผิดพลาด',
          message: 'เกิดข้อผิดพลาดการซื้อ',
          buttons: ['OK']
        });
    
        await alert.present();
      }
    )
  }

  async DismissClick() {
    await this.popOverCtrl.dismiss();
  }

}
