import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../../services/api/user.service';
import { TagService } from 'src/app/services/api/tag.service';
import { AlertController } from '@ionic/angular';
import { PostingService } from 'src/app/services/api/posting.service';

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

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
    private tagServ: TagService,
    private alertCtrl: AlertController,
    private postServ: PostingService

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

}
