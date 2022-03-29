import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { PostingService } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { AlertController } from '@ionic/angular';


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

  constructor(
    public formBulider: FormBuilder,
    
    private PostServ: PostingService,
    private alertCtrl: AlertController,
    private tagServ: TagService
  ) { /* this.tagServ.GetAll().subscribe((res) => {
    let tagDatabase = res
    this.knowTag = tagDatabase['content']
    console.log(this.knowTag)
  })
     */
  }

  onSubmit(){
    let postTag: string[] = []
    for (let item of this.tags_list){
      // console.log(item)
      postTag.push(item._id)
    }
    console.log(postTag)
    let postForm = new FormGroup({
      text : new FormControl(this.post_text),
      pics : new FormControl(this.picture_list),
      tags : new FormControl(postTag),
      requireSub : new FormControl(this.subRequire)
    })
    console.log(postForm.value)
    this.PostServ.CreatePost(postForm.value)
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
    //type 2 

    /* for (let tag of this.knowTag){
      if (tag['name'].toLowerCase().includes(this.searchTagValue.toLowerCase()) 
          || tag['description'].toLowerCase().includes(this.searchTagValue.toLowerCase())){
        this.tempTagSearch.push(tag)
      }
    } */
    // console.log(this.tempTagSearch)
  }

}
