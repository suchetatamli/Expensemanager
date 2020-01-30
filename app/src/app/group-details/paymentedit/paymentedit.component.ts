import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router} from "@angular/router";
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-paymentedit',
  templateUrl: './paymentedit.component.html',
  styleUrls: ['./paymentedit.component.scss']
})
export class PaymenteditComponent implements OnInit {
  pay : any = {
		groupId : '',
		description : '',
    category : '',
    shareMembers : [],
    shareUsers : [],
    payDate : new Date(),
    payBy : '',
    amount : '',
    editBy : '',
    paymentId : ''
  }
  
  category : any = [
		'Food',
		'Drink',
		'Hotel',
		'Medical',
		'Entertainment',
		'Parking',
		'Shopping',
		'Toll',
		'Travel',
		'Miscellaneous'
  ];
  groupDetails : object = {
    id : '',
		name : ''
	};
  members : any = [] ;

  constructor(private route: ActivatedRoute, private router : Router, private cService:CommonService) { 
    this.pay.editBy = this.route.snapshot.paramMap.get('payby');
    this.pay.groupId = this.route.snapshot.paramMap.get('groupid');
    this.pay.paymentId = this.route.snapshot.paramMap.get('paymentid');

    this.cService.groupDetails(this.pay.paymentId).subscribe((response: any)=> {
      this.groupDetails  = response.data;
      for(let m of this.groupDetails['members']) {
        this.members.push({
          id : m['user_id'],
          name : m.user.name
        });
      }
    });
  }

  ngOnInit() {
  }

}
