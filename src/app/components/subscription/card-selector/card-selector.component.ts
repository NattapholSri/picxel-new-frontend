import { Component, NgZone, OnInit,Output,EventEmitter } from '@angular/core';

import { PaymentsService } from 'src/app/services/api/payments.service';


@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.scss'],
})
export class CardSelectorComponent implements OnInit {


  @Output() cardIdExport = new EventEmitter<string>();
  card_list:any[] = []

  constructor(
    private paymentServ:PaymentsService
  ) { 
    this.paymentServ.listCustomerCard().subscribe(
      (res) => {
        console.log(res.list.data)
        this.card_list = res.list.data
      }
    )
  }

  ngOnInit() {}

  sendCardId(event:any){
    console.log(event.detail.value)
    this.cardIdExport.emit(event.detail.value)
  }

}
