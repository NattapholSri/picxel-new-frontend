import { Component, NgZone } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { PostingService,PostData,purchaseData } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { AlertController } from '@ionic/angular';

import { PaymentsService } from 'src/app/services/api/payments.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {

  //postForm: FormGroup;

  post_text: string;
  picture_list: string[] = [];
  tags_list: any[] = [];

  picture_url: string = '';

  message_mode: number = 0;

  // knowTag: any[] = [];
  tempTagSearch: any[] = [];
  searchTagValue: string

  subRequire:boolean = false
  buyRequire:boolean = false
  postBuyMode: number = 0

  recipt_list:any[] = []

  postprice:number = 25
  omise_resp_id:string

  safetyDisbale:boolean = false
  localfileinput:any[] = []

  picture_temp
  
  constructor(
    public formBulider: FormBuilder,
    private PostServ: PostingService,
    private alertCtrl: AlertController,
    private tagServ: TagService,
    private paymentServ: PaymentsService,
    private toastCtrl:ToastController
  ) {
    if (localStorage.getItem('current_omise_customer') != undefined) {
      console.log('omise customer found')
      this.paymentServ.getCustomerReciptInfo().subscribe(
      (res) => {
        console.log(res.customer.metadata.recipients)
        let recipt_data = res.customer.metadata.recipients
        let recipt_key = Object.keys(recipt_data)
        if (recipt_key.length === 0){
          this.warningNoRespAccount()
          this.safetyDisbale = true
          console.log('but no omise recipt')
        }
        console.log(recipt_key)
        for (let key of recipt_key){
          this.paymentServ.getRecipientInfo(key).subscribe(
            (res) =>{
              console.log(res.resp)
              let original_text:string = res.resp.bank_account.bank_code
              res.resp.bank_account.bank_code = original_text.toUpperCase()
              this.recipt_list.push(res.resp)
            }
          )
        }
      },(err) => {
        this.warningNoRespAccount()
        this.safetyDisbale = true
      })
    }
    else{
      console.log('no omise id')
      this.warningNoOmiseId()
      this.safetyDisbale = true
    } 
  }

  onSubmit(){
    let postTag: string[] = []
    for (let item of this.tags_list){
      // console.log(item)
      postTag.push(item._id)
    }
    console.log(postTag)
    if (this.buyRequire != true && this.postBuyMode != 2){
      var postForm:PostData = {
        text : this.post_text,
        pics : this.picture_list,
        tags : postTag,
        requireSub : this.subRequire,
        requirePurchase: this.buyRequire
      }
    }
    else{
      console.log('price '+this.postprice )
      console.log('omise_id: '+this.omise_resp_id)
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
        tags : postTag,
        requirePurchase: this.buyRequire,
        purchase: reciptData,
        requireSub : this.subRequire
      }
    }
    
    console.log(postForm)
    this.PostServ.CreatePost(postForm)
    .subscribe((res) => {
      alert("Posted")
      console.log(res)
      
      //clear Data on Post box
      this.post_text = ''
      this.picture_url = ''
      this.picture_list = []
      this.tags_list = []
      this.tempTagSearch = []
      this.message_mode = 0
      
      window.location.reload()
      //this.router.navigateByUrl('/home')
    },
    (err) => {
      console.log(err)
    })
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

  removePic(select_item:any){

    for( var i = 0; i < this.picture_list.length; i++){ 
                                   
      if ( this.picture_list[i] === select_item) { 
        this.picture_list.splice(i, 1); 
        i--; 
      }
    }
  }

  addTag(input_tag:any){
    if (this.tags_list.includes(input_tag)){
      this.message_mode = 4;
    }
    else{
      this.tags_list.push(input_tag)
      console.log(this.tags_list)
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

  async warningNoRespAccount() {
    const toast = await this.toastCtrl.create({
      message: 'ไม่มีบัญชีรับเงินที่ใช้ได้ กรุณาเพิ่มบัญชีก่อน',
      duration: 5000
    });
    toast.present();
  }

  async warningNoOmiseId() {
    const toast = await this.toastCtrl.create({
      message: 'ต้องสมัครใช้บริการ omise ก่อน จึงจะสามารถขายผลงานได้',
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

  bankCodetoUpper(){
    for (let recipient of this.recipt_list){
      let original_text:string = recipient.bank_account.bank_code
      recipient.bank_account.bank_code = original_text.toUpperCase()
    }
  }

  onFileInput(event){
    this.localfileinput.push(event.target.files)
    console.log(this.localfileinput)
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.picture_temp = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file);
  }

  

}
