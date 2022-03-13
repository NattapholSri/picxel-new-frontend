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

  post_text: string;
  picture_list: string[] = [];
  tags_list: any[] = [];

  picture_url: string = '';

  // knowTag: any[] = [];
  tempTagSearch: any[] = [];
  searchTagValue: string

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private PostServ: PostingService,
    private alertCtrl: AlertController,
    private tagServ: TagService
  ) { 
  }

}
