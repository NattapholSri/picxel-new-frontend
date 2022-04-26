import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { PostingService,PostData,purchaseData } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { AlertController,ToastController } from '@ionic/angular';
import { PaymentsService } from 'src/app/services/api/payments.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss'],
})
export class PostUpdateComponent {

  //postForm: FormGroup;
  postData: any = {}

  post_text: string;
  picture_list: string[] = [];
  tags_list: any[] = [];
  knowtag: any[] = [];

  picture_url: string = '';
  message_mode: number = 0;

  // knowTag: any[] = [];
  tempTagSearch: any[] = [];
  searchTagValue: string

  subRequire:boolean
  buyRequire:boolean
  postBuyMode: number

  recipt_list:any[] = []

  postprice:number
  omise_resp_id:string

  safetyDisbale:boolean = false

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private PostServ: PostingService,
    private alertCtrl: AlertController,
    private tagServ: TagService,
    private paymentServ: PaymentsService,
    private toastCtrl:ToastController
  ) { 
    // this.loadAllTag()
    this.knowtag = JSON.parse(localStorage.getItem('knowtag'))
    this.postData = JSON.parse(localStorage.getItem('selectPost'))
    if (this.postData != undefined || this.postData != {}){
      this.post_text = this.postData.text
      this.picture_list = this.postData.pics
      /* let temp_tag = this.postData.tags
      this.addTagData(temp_tag) */
      this.tags_list = this.postData.tags
      this.subRequire = this.postData.requireSub
      this.buyRequire = this.postData.requirePurchase
      if (this.postData.purchase != undefined){
        this.postprice = this.postData.purchase.price
        this.omise_resp_id =  this.postData.purchase.omise_recipient_id
      }
      if (this.subRequire == undefined){
        this.subRequire = false
      }
      if (this.buyRequire == undefined){
        this.buyRequire = false
      }
      this.synchronizeMode()
    }
    this.paymentServ.getCustomerReciptInfo().subscribe(
      (res) => {
        console.log(res.customer.metadata.recipients)
        let recipt_data = res.customer.metadata.recipients
        let recipt_key = Object.keys(recipt_data)
        if (recipt_key.length === 0){
          this.warningNoRespAccount()
          this.safetyDisbale = true
        }
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

  synchronizeMode(){
    if(this.buyRequire == true){
      this.postBuyMode = 2
    }
    else if(this.subRequire == true){
      this.postBuyMode = 1
    }
    else{
      this.postBuyMode = 0
    }
  }

  onSubmit(){
    console.log(this.tags_list)
    if (this.buyRequire != true && this.postBuyMode != 2){
      var postForm:PostData = {
        text : this.post_text,
        pics : this.picture_list,
        tags : this.tags_list,
        requireSub : this.subRequire,
        requirePurchase: this.buyRequire,
        postId:this.postData._id
      }
    }
    else{
      if (this.postprice >= 25 && this.postprice <= 1000 && this.postprice != undefined  &&
          this.omise_resp_id != undefined && this.omise_resp_id != '' 
        ){
        var reciptData:purchaseData = {price:this.postprice,omise_recipient_id:this.omise_resp_id}
      }
      else{
        alert('error: no post price value or recipt')
        return
      }
      
      var postForm:PostData ={
        text : this.post_text,
        pics : this.picture_list,
        tags : this.tags_list,
        requirePurchase: this.buyRequire,
        purchase: reciptData,
        requireSub : this.subRequire,
        postId: this.postData._id
      }
      console.log(postForm)
      this.PostServ.UpdatePost(postForm)
      .subscribe((res) => {
        alert("Updated")
        console.log(res)
      
        localStorage.removeItem('selectPost')
        history.back()
      },
      (err) => {
        console.log(err)
      })
    }
  }

  removePic(select_item:any){

    for( var i = 0; i < this.picture_list.length; i++){ 
                                   
      if ( this.picture_list[i] === select_item) { 
        this.picture_list.splice(i, 1); 
        i--; 
      }
    }
  }

  removeTag(select_tag:any){
    for( var i = 0; i < this.tags_list.length; i++){ 
                                   
      if ( this.tags_list[i] === select_tag) { 
        this.tags_list.splice(i, 1); 
        i--; 
      }
    }

  }

  addPic(){
    let input_text = this.picture_url
    if (this.picture_list.includes(input_text)){
      this.message_mode = 1;
    }
    else if (input_text == undefined || input_text == ''){
      this.message_mode = 5;
    }
    else{
      this.message_mode = 2;
      this.picture_list.push(input_text)
    }
    console.log(this.picture_list)
  }

  addTag(input_tag:any){
    if (this.tags_list.includes(input_tag._id)){
      this.message_mode = 4;
    }
    else{
      this.tags_list.push(input_tag._id)
      console.log(this.tags_list)
    }
  }

  createNewTag() {
    this.alertCtrl.create(
      {header: 'การสร้าง Tag ใหม่',
      inputs: [
        {
          name: 'tagName',
          type: 'text',
          placeholder: 'ชื่อแท็ก'
        },
        {
          name: 'tagDescribe',
          type: 'text',
          placeholder: 'คำอธิบายแท็ก'
        }
      ],
      buttons: [
        {
        text: 'ยกเลิก',
        role: 'cancel'
        },{
          text: 'สร้าง Tag',
          handler: (data) => {
            console.log( data.tagName+": "+data.tagDescribe)
            
            let tagForm = new FormGroup({
              _id : new FormControl(data.tagName),
              description : new FormControl(data.tagDescribe),
            })
            
            this.tagServ.CreateTag(tagForm.value)
              .subscribe((res)=> console.log(res))
          }
        }
      ]
      }
    ).then(alertEl =>{
      alertEl.present()
    })
  }

  getTagByName(){
    if (this.searchTagValue == undefined){
      this.searchTagValue = ''
    }
    /* if (this.searchTagValue == ''){
      console.log('search tag service has stopped')
      return;
    } */
    this.tempTagSearch = []

    this.tagServ.SearchTag(this.searchTagValue).subscribe((res) => {
      let tagDatabase = res
      this.tempTagSearch = tagDatabase['content']
    })

  }

  loadAllTag(){
    this.tagServ.GetAll().subscribe(
      (res) => {
        localStorage.setItem('knowtag',JSON.stringify(res.content))
      }
    )
  }

  addTagData(tag_id_list:string[]){
    for (let i of tag_id_list){
      for (let tag of this.knowtag){
        if (tag._id == i){
          this.tags_list.push(tag)
        }
      }
    }
  }

  async warningNoRespAccount() {
    const toast = await this.toastCtrl.create({
      message: 'ไม่มีบัญชีรับเงินที่ใช้ได้ กรุณาเพิ่มบัญชีก่อน',
      duration: 5000
    });
    toast.present();
  }

  postModeShifter(){
    if(this.postBuyMode == 1){
      this.subRequire = true
      this.buyRequire = false
    }
    else if (this.postBuyMode == 2){
      this.buyRequire = true
      this.subRequire = false
    }
    else{
      this.subRequire = false
      this.buyRequire = false
    }
  }
  

}
