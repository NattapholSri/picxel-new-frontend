import { Component, NgZone } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { PostingService,PostData,purchaseData } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { AlertController,ToastController,LoadingController } from '@ionic/angular';

import { PaymentsService } from 'src/app/services/api/payments.service';
import { PictureManageService } from 'src/app/services/api/picture-manage.service';

import { initializeApp } from "firebase/app";
import { getStorage, ref,uploadBytes } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket

// Create a storage reference from our storage service


const firebaseConfig = {
  apiKey: "AIzaSyCUWgMprUGflxVowZHuQ0baVHI4SHejsr0",
  authDomain: "project-y4-c9b6b.firebaseapp.com",
  databaseURL: "https://project-y4-c9b6b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-y4-c9b6b",
  storageBucket: "project-y4-c9b6b.appspot.com",
  messagingSenderId: "609181833694",
  appId: "1:609181833694:web:d610b294193cd39a18e54f",
  measurementId: "G-THXLKCKEMR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);
const storageRef = ref(storage);



@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {

  //postForm: FormGroup;
  post_text: string;
  picture_list: any[] = [];
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

  picture_temp:any
  
  constructor(
    public formBulider: FormBuilder,
    private PostServ: PostingService,
    private alertCtrl: AlertController,
    private tagServ: TagService,
    private paymentServ: PaymentsService,
    private toastCtrl:ToastController,
    private pictureServ:PictureManageService,
    private loadingCtrl:LoadingController,
    private ngZone:NgZone
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

  async onSubmit(){

    await this.loadingCtrl.create({
      message: 'กำลังสร้างโพสต์',
      spinner: "circular"
    }).then((res) => {
      res.present();
    })

    let postTag: string[] = []
    for (let item of this.tags_list){
      // console.log(item)
      postTag.push(item._id)
    }
    console.log(postTag)


    let path_picture_list = await this.uploadFile()

    if (this.buyRequire != true && this.postBuyMode != 2){
      var postForm:PostData = {
        text : this.post_text,
        pics : path_picture_list,
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
        pics : path_picture_list,
        tags : postTag,
        requirePurchase: this.buyRequire,
        purchase: reciptData,
        requireSub : this.subRequire
      }
    }
    
    console.log(postForm)
    this.PostServ.CreatePost(postForm)
    .subscribe(async (res) => {
      await this.loadingCtrl.dismiss().then((res) => {
        console.log('Login Success!', res);
      }).catch((error) => {
        console.log('error', error);
      })


      alert("Posted")
      console.log(res)
      
      //clear Data on Post box
      this.post_text = ''
      this.picture_url = ''
      this.picture_list = []
      this.tags_list = []
      this.tempTagSearch = []
      this.message_mode = 0
      
      this.ngZone.run(() => location.reload())
      //this.router.navigateByUrl('/home')
    },
    async (err) => {
      console.log(err)
      alert('ไม่สามารถสร้างโพสต์ได้ กรุณาลองใหม่')
      await this.loadingCtrl.dismiss().then((res) => {
        console.log('Login Success!', res);
      }).catch((error) => {
        console.log('error', error);
      })
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
        this.localfileinput.splice(i ,1) 
        i--; 
      }
    }
    console.log(this.picture_list)
    console.log(this.localfileinput)
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
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        let pic_temp = event.target.result;
        this.picture_list.push(pic_temp)
        console.log(this.picture_list)
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    this.localfileinput.push(file)
    console.log(file);
    console.log(this.localfileinput)
  }

  async uploadFile():Promise<any>{
    let uploadList:string[] = []
    for(let picture of this.localfileinput){
      let filename:string = picture.name
      let filetype:string = picture.type
      console.log('name:'+filename+' type:'+ filetype)
      let ext:string[] = filename.split(".")
      let new_filename = this.namingForFile(ext[ext.length-1])
      console.log(new_filename)
      let uploadPicRef = ref(storage, 'post-pics/'+ new_filename);

      await uploadBytes(uploadPicRef,picture).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        uploadList.push('post-pics/'+ new_filename)
      }).catch((err)=> console.log(err))

    // send list off key to function
    }
    console.log(uploadList)
    return uploadList
  }
 

  namingForFile(extension?:string){
    let newFilename:string
    let user_post_id:string = localStorage.getItem('current_log_uid')
    let time = new Date()
    newFilename = time.getTime().toString() + "_" + user_post_id  
    if (extension != undefined){
      newFilename = newFilename + "." + extension
    }
    return newFilename
  }
}
