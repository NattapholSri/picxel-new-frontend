import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { PostingService } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss'],
})
export class PostingComponent implements OnInit {

  //postForm: FormGroup;

  text: string;
  pic: string[];
  tag: string[];

  message_to_usr: string;
  message_mode: number = 0;

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private PostServ: PostingService
  ) {/* this.postForm = this.formBulider.group({
    text: [''],
    pic: [''],
    description: ['']
    }) */ 
  }

  ngOnInit() {}

  onSubmit(){

  }

  removePic(select_item:string){
    for( var i = 0; i < this.pic.length; i++){ 
                                   
      if ( this.pic[i] === select_item) { 
        this.pic.splice(i, 1); 
        i--; 
      }
    }
  }

  removeTag(select_tag:string){
    for( var i = 0; i < this.pic.length; i++){ 
                                   
      if ( this.tag[i] === select_tag) { 
        this.tag.splice(i, 1); 
        i--; 
      }
    }

  }

  addPic(input_text:string){
    if (this.pic.includes(input_text)){
      this.message_mode = 1;
    }
    else{
      this.message_mode = 2;
    }
  }

  addTag(){

  }

}
