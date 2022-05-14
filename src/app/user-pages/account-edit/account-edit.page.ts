import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../../services/api/user.service';
import { TagService } from 'src/app/services/api/tag.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { PostingService } from 'src/app/services/api/posting.service';
import { PictureManageService } from 'src/app/services/api/picture-manage.service';

import { PlanListComponent } from 'src/app/components/subscription/plan-list/plan-list.component';
import { ManageOmiseComponent } from 'src/app/components/subscription/manage-omise/manage-omise.component';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage implements OnInit {

  gender: string;
  picture_url: string;
  firstname: string;
  user_now: string;
  username: string;

  user_id: string;
  interest_list: any[] = [];

  knowtag: any[] = [];

  tempTagSearch: any[] = [];
  searchTagValue: string

  user_omise_id: string

  create_mode:boolean = true
  false_from_backend:boolean = false
  img1:any

  picture_file:File

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
    private tagServ: TagService,
    private alertCtrl: AlertController,
    private postServ: PostingService,
    private popOverCtrl:PopoverController,
    private pictureServ:PictureManageService

  ) { 
    this.userServ.AutoLogout()
    // this.loadAllTag()
    this.user_now = localStorage.getItem('usr_login')
    this.userServ.ReqUserDetail(this.user_now)
      .subscribe((res) => {
        let usr_data = res
        console.log(usr_data)
        this.user_id = usr_data._id
        if (usr_data.gender != undefined){
          this.gender = usr_data.gender
        }
        if (usr_data.profile_pic != undefined){
          this.picture_url = usr_data.profile_pic
        }
        if (usr_data.firstname != undefined){
          this.firstname = usr_data.firstname
        }
        if(usr_data.interests != undefined || usr_data.interests.length !== 0){
          this.interest_list = usr_data.interests
          //this.addTagData(usr_data.interests)
        }

        if (usr_data.creatorMode != undefined){
          this.create_mode = usr_data.creatorMode
          if (usr_data.creatorMode == false){
            this.false_from_backend = true
          }
          console.log('use_backend:'+this.false_from_backend)
        }

        if (usr_data.omise_customer_id != undefined){
          this.user_omise_id = usr_data.omise_customer_id
        }
        else{
          this.user_omise_id = undefined
        }
      })
  }

  ngOnInit() {
  }

  updateAll(){
    let interest_id_list: string[] = []
    for (let item of this.interest_list){
      // console.log(item)
      interest_id_list.push(item)
    }
    console.log(interest_id_list)

    const editForm = new FormGroup({
      gender: new FormControl(this.gender, Validators.required),
      profile_pic: new FormControl(this.picture_url, Validators.required),
      firstname: new FormControl(this.firstname, Validators.required),
      interests: new FormControl(interest_id_list),
      creatorMode: new  FormControl(this.create_mode)
    })

    console.log(editForm.value)
    this.userServ.updateUserData(editForm.value)
      .subscribe((res) => {
        console.log(res)

        this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+this.user_now))
      },
      (err) => {
        console.log(err)
        alert('แก้ไขไม่สำเร็จ')
      })
  }

  revert(){
    this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+this.user_now))
  }

  addTag(input_tag:any){
    if (this.interest_list.includes(input_tag._id)){
      alert('already added interest tag')
    }
    else{
      this.interest_list.push(input_tag._id)
      console.log(this.interest_list)
    }
  }

  removeTag(select_tag:any){
    for( var i = 0; i < this.interest_list.length; i++){ 
                                   
      if ( this.interest_list[i] === select_tag) { 
        this.interest_list.splice(i, 1); 
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
              name : new FormControl(data.tagName),
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
          this.interest_list.push(tag)
        }
      }
    }
  }

  userLogout(){
    this.userServ.ReqLogout() 
    .subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )

    this.ngZone.run(() => this.router.navigateByUrl('/'))
  }

  clearAllPost(){
    this.postServ.DeleteAllPost(this.user_id).subscribe((res) => {
      console.log(res)
      alert('deleted all post')
    })
  }

  deleteAccount(){
    // deletion methods
    console.log('delete user menu: ' + this.user_id)
    this.alertCtrl.create(
      {header: 'คุณแน่ใจแล้วใช่ไหม',
      message: 'การลบบัญชีผู้ใช้ ระบบจะทำการลบข้อมูลทั้งหมดที่เกี่ยวข้องกับบัญชีนี้ และไม่สามารถกู้คืนข้อมูลได้',
      buttons: [
        {
        text: 'ยกเลิก',
        role: 'cancel'
        },{
          text: 'แน่นอน',
          handler: () => {
            this.postServ.DeleteAllPost(this.user_id).subscribe((res) => {
              console.log(res)
              this.userServ.deleteUser()
                .subscribe((res)=> {
                  console.log(res)
                  this.ngZone.run(() => this.router.navigateByUrl('/'))
                })
              
            })
          }
        }
      ]
      }
    ).then(alertEl =>{
      alertEl.present()
    })
  }

  async callPlanList(){

    const popover = await this.popOverCtrl.create({
      component: PlanListComponent,
      dismissOnSelect: true,
      // componentProps: { userId :this.user_id }
      mode: "md",
    });
    await popover.present();
  }

  async callPaymentServ(){

    const popover = await this.popOverCtrl.create({
      component: ManageOmiseComponent,
      dismissOnSelect: true,
      componentProps: { customer : this.user_omise_id },
      mode: "md",
    });
    await popover.present();
  }

  onFileInput(event){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    this.picture_file = file
    console.log(file);
  }

  async uploadFile():Promise<any>{
    let stringname = this.picture_file.name.split(".")
    this.pictureServ.requestProfilePicURL(stringname[1]).subscribe(
      async (res) => {
        let object_upload = res
        let up_url = object_upload.uploadUrl
    
        let upload_res = await fetch(up_url,{
          method: "PUT",
          body: this.picture_file,
              // headers: {'Content-Type':'multipart/form-data'}
          })
        console.log(upload_res)
      },(err) => console.log(err)
    )
    // get url for upload picture
      

          /* this.pictureServ.uploadPicToURL(up_url,picture).subscribe(
            (res) => console.log(res),
            (err) => console.log(err)
          ) */
    // upload picture to AWS
      //this.pictureServ.uploadPicToURL(up_url,picture)

    // send list off key to function
  }


  getUpURL(){
    let stringname = this.picture_file.name.split(".")
    this.pictureServ.requestProfilePicURL(stringname[1]).subscribe(
      (res) => {
        console.log(res)
      },(err) => console.log(err)
    )
  }

}
