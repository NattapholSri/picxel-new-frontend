import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { PostingService } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { AlertController } from '@ionic/angular';

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

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private PostServ: PostingService,
    private alertCtrl: AlertController,
    private tagServ: TagService
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
      if (this.subRequire == undefined){
        this.subRequire = false
      }
    }
  }

  onSubmit(){
    /* let postTag: string[] = []
    for (let item of this.tags_list){
      console.log(item)
      postTag.push(item._id)
    } */
    console.log(this.tags_list)
    let postForm = new FormGroup({
      text : new FormControl(this.post_text),
      pics : new FormControl(this.picture_list),
      tags : new FormControl(this.tags_list),
      postId : new FormControl(this.postData._id),
      requireSub : new FormControl(this.subRequire)
    })
    console.log(postForm.value)
    this.PostServ.UpdatePost(postForm.value)
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

  

}
