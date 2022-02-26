import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { PostingService } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss'],
})
export class PostingComponent {

  //postForm: FormGroup;

  post_text: string;
  picture_list: string[] = [];
  tags_list: string[] = [];

  picture_url: string = '';

  message_to_usr: string;
  message_mode: number = 0;

  cr_tagName:string;
  cr_tageDescrb:string

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private PostServ: PostingService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private tagServ: TagService
  ) {/* this.postForm = this.formBulider.group({
    text: [''],
    pic: [''],
    description: ['']
    }) */ 
  }

  ngOnInit() {}

  onSubmit(){
    let postForm = new FormGroup({
      text : new FormControl(this.post_text),
      pics : new FormControl(this.picture_list),
      tags : new FormControl(this.tags_list)
    })
    this.PostServ.CreatePost(postForm.value)
    .subscribe((res) => {
      alert("ทำการส่งคำขอรีเซ็ต Password แล้ว")
      console.log(res)
    },
    (err) => {
      console.log(err)
    })
  }

  removePic(select_item:string){



    for( var i = 0; i < this.picture_list.length; i++){ 
                                   
      if ( this.picture_list[i] === select_item) { 
        this.picture_list.splice(i, 1); 
        i--; 
      }
    }
  }

  removeTag(select_tag:string){
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

  addTag(input_text:string){
    if (this.tags_list.includes(input_text)){
      this.message_mode = 4;
    }
    else{
      this.message_mode = 3;
      this.tags_list.push(input_text)
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

}
