import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router} from "@angular/router";
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  pay : any = {
		groupId : '',
		description : '',
    category : '',
    shareMembers : [],
    shareUsers : [],
    payDate : new Date(),
    payBy : '',
    amount : '',
    addedBy : ''
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
    this.pay.addedBy = this.route.snapshot.paramMap.get('pby');
    this.pay.groupId = this.route.snapshot.paramMap.get('gid');
    
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
  }

  // selectStatus : number =  1;
	// selectAll(select: NgModel, values: any) {
	// 	select.update.emit(values); 	
	// 	this.selectStatus = 1;	    
	// }

	// deselectAll(select: NgModel) {
	// 	select.update.emit([]); 
	// 	this.selectStatus = 0;  
  // }
  
  submitted : boolean = false;
	paySubmit()
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
      //console.log(this.pay);
      this.cService.savePay(this.pay).subscribe((response)=> {
				this.router.navigate(['/group-details/'+this.pay.groupId])
			})
		}
	}
  
}
