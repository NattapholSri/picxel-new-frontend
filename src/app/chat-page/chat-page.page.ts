import { Component, OnInit } from '@angular/core';
import { ChatMessageService } from '../services/api/chat-message.service';
import { Router,ActivatedRoute } from '@angular/router';

import { UserService } from '../services/api/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss'],
})
export class ChatPagePage implements OnInit {

  chat_usr_data:any ={} 

  with_id:string
  message_list:any[] = []
  msg_page:number = 1

  constructor(
    private chatMsgServ:ChatMessageService,
    private userServ: UserService,
    private activatedRt: ActivatedRoute,
  ) 
  { 
    this.with_id = this.activatedRt.snapshot.paramMap.get('messageBoxId')
    this.userServ.ReqUserDetail(this.with_id).subscribe((res) => {
      this.chat_usr_data = res
      this.chatMsgServ.withUsrId(this.chat_usr_data._id,this.msg_page).subscribe(
        (res) => {
          console.log(res)
        }, (err) => console.log(err)
      )
    })
    
  }

  ngOnInit() {
  }

  loadOlderMessage(){
    
  }

}
