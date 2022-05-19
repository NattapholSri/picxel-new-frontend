import { Component,Input,NgZone } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { PostingService,PostData,purchaseData } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { AlertController,ToastController } from '@ionic/angular';
import { PaymentsService } from 'src/app/services/api/payments.service';
import { UserService } from 'src/app/services/api/user.service';

// firebase setup
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

//--------------------------------------------- 

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss'],
})
export class PostUpdateComponent {

  @Input() with_post_id:string

  post_id:string = ''

  //postForm: FormGroup;
  postData: any = {}

  post_text: string;
  picture_list: any[] = [];
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

  old_picture_key:string[] = []
  localfileinput:File[] = []

  constructor(
    public formBulider: FormBuilder,
    private ngZone:NgZone,
    private PostServ: PostingService,
    private alertCtrl: AlertController,
    private tagServ: TagService,
    private paymentServ: PaymentsService,
    private toastCtrl:ToastController,
    private userServ:UserService
  ) { 
    this.userServ.AutoLogout()
    // this.loadAllTag()
    this.knowtag = JSON.parse(localStorage.getItem('knowtag'))
    //this.postData = JSON.parse(localStorage.getItem('selectPost'))

    this.post_id = localStorage.getItem('selectPostId')

    if(localStorage.getItem('selectPostId') != undefined){
      this.post_id = localStorage.getItem('selectPostId')
    }
    else if(this.with_post_id != undefined) {
      this.post_id = this.with_post_id
    }

    this.PostServ.SearchPostById(this.post_id).subscribe(
      (res) =>{
        console.log(res)
        this.postData = res.content
        this.post_text = this.postData.text
        this.picture_list = this.postData.pics
        for (let pic_data of this.picture_list){
          this.old_picture_key.push(pic_data.path)
        }
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
      },
      (err) => console.log(err)
    )

    if (localStorage.getItem('current_omise_customer') != undefined) {
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

  async onSubmit(){
    console.log(this.tags_list)

    let new_file_path:string[] = await this.uploadFile()
    console.log(new_file_path)
    let full_path:string[] = this.old_picture_key.concat(new_file_path)
    console.log('update_pic_list:'+full_path)
    if (full_path.length != this.picture_list.length){
      console.log('picture path arr:' + this.picture_list)
      alert('มีปัญหากับระบบอัพโหลดไฟล์ โปรดลองแก้ไขอีกครั้ง')
      return
    }

    console.log('beginning update')

    if (this.buyRequire != true && this.postBuyMode != 2){
      let postForm:PostData = {
        text : this.post_text,
        pics : full_path,
        tags : this.tags_list,
        requireSub : this.subRequire,
        requirePurchase: this.buyRequire,
        postId:this.postData._id
      }
      console.log(postForm)
      this.PostServ.UpdatePost(postForm)
      .subscribe((res) => {
        alert("Updated")
        console.log(res)
        this.ngZone.run(() => history.back())
      },
      (err) => {
        console.log(err)
      })
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
      
      let postForm:PostData ={
        text : this.post_text,
        pics : full_path,
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
        this.ngZone.run(() => history.back())
      },
      (err) => {
        console.log(err)
      })
    }
  }

  removePic(select_item:any){

    for( var i = 0; i < this.picture_list.length; i++){ 
                                   
      if ( this.picture_list[i] === select_item) { 
        this.picture_list.splice(i, 1)
        if (i >= this.old_picture_key.length){
          console.log('number_of_file_array:' + (i - this.old_picture_key.length))
          this.localfileinput.splice(i - this.old_picture_key.length,1)
          console.log('delete local file:' + this.localfileinput)
        }
        else{
          this.old_picture_key.splice(i, 1)
          console.log('delete post file')
        }
        i--; 
      }
    }
    console.log(this.picture_list)
    console.log(this.old_picture_key)
    console.log(this.localfileinput)
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

  bankCodetoUpper(){
    for (let recipient of this.recipt_list){
      let original_text:string = recipient.bank_account.bank_code
      recipient.bank_account.bank_code = original_text.toUpperCase()
    }
  }
  
  async warningNoOmiseId() {
    const toast = await this.toastCtrl.create({
      message: 'ต้องสมัครใช้บริการ omise ก่อน จึงจะสามารถขายผลงานได้',
      duration: 5000
    });
    toast.present();
  }

  onFileInput(event){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        let pic_temp = event.target.result;
        this.picture_list.push({url:pic_temp})
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

  async uploadFile():Promise<string[]>{
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
