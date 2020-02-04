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

    this.cService.groupDetails(this.pay.groupId).subscribe((response: any)=> {
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
    this.cService.editGroupExpense(this.pay.paymentId).subscribe((response: any)=> {
      const paymentDetail = response.data;
      if (paymentDetail && this.pay.paymentId!='') {
        this.pay.description = paymentDetail.description;
        this.pay.category = paymentDetail.category;
        this.pay.amount = paymentDetail.amount;
        this.pay.payDate = paymentDetail.paydate;
        this.pay.payBy = paymentDetail.payby;

        for(let m of this.members) {
          const totalSharePerson = paymentDetail.sharewith.split(',');
          var index = totalSharePerson.findIndex((i)=>{
            return i == m['id']
          });
          if (index != -1) {
            this.pay.shareMembers.push(m);
          }
        }
        console.log(this.pay.shareMembers);
      } else {
        this.pay.shareMembers = this.members;
      }
    });
  }

  submitted : boolean = false;
	payUpdate()
	{
    this.submitted = true;
		if(this.pay.description !='' && this.pay.category != '' && this.pay.shareMembers.length >0 && this.pay.payDate !='' && this.pay.amount != '') {
      if (this.pay.payDate != '') {
        this.pay.payDate = this.pay.payDate.toISOString();
      } else {
        delete this.pay.payDate;
      }

      if(this.pay.shareMembers.length >0){
        let members = this.pay.shareMembers;
        members.forEach((el)=>{
          this.pay.shareUsers.push({
            'user_id' : el,
          })
        });
      }
      console.log(this.pay);
      // this.cService.updateGroupExpense(this.pay).subscribe((response)=> {
			// 	this.router.navigate(['/group-details/'+this.pay.groupId])
			// })
		}
  }
  
}
